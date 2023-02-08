import { PrismaClient, Prisma } from "@prisma/client";
import { ApolloServer } from "apollo-server-express";
import resolvers from "./resolvers";
import typeDefs from "./schema";
import mail, { MailService } from "@sendgrid/mail";
import { CronJob } from "cron";
import { resolve } from "path";
import { sync } from "glob";
import { Cron } from "./types/cron";
import express from "express";
import http from "http";
import { ApolloServerPluginDrainHttpServer } from "apollo-server-core";
import { graphqlUploadExpress } from "graphql-upload";
import { login } from "./utils/oauth/login";
import verifyJWT from "./utils/verifyJWT";
import { JwtPayload } from "jsonwebtoken";
import axios from "axios";
import { SIGNIN_METHODS } from "./constants";
import cors from "cors";
import { GraphQLResponse } from "apollo-server-core";
import generateJWT from "./utils/generateJWT";

const app = express();

app.use(
  cors({
    origin: ["https://www.wellfare.space", "http://localhost:3000"],
  })
);

app.use(async (req, res, next) => {
  const auth = req.headers.authorization;
  if (!auth || auth.split("").length < 2) {
    next();
    return;
  }

  const [type, token] = auth.split(" ") as [SIGNIN_METHODS, string];

  if (token == "null") {
    next();
    return;
  }

  if (type == "native") {
    req.headers.authorization = token;
    next();
    return;
  }

  const endpoint = "https://oauth2.googleapis.com/token";
  const decoded_refresh = verifyJWT(token, "client") as JwtPayload;

  const refresh_opts = {
    client_id: process.env.GOOGLE_CLIENT_ID,
    client_secret: process.env.GOOGLE_CLIENT_SECRET,
    grant_type: "refresh_token",
    refresh_token: decoded_refresh.id,
  };

  try {
    const refreshed = await axios.post(
      endpoint,
      new URLSearchParams(refresh_opts as unknown as URLSearchParams),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    //Also gotta exchange for the access token!!
    const credentials = await login(type, refreshed.data.access_token);

    const user = await server.db.user.findFirst({
      where: {
        OAuthEmail: credentials.email,
      },
    });

    if (!user) {
      next();
      return;
    }

    if (user) {
      const nativeJWT = generateJWT({ id: user.id }, "client");
      req.headers.authorization = nativeJWT;
    }
    next();
  } catch (e) {
    next();
  }
});

app.use(
  graphqlUploadExpress({
    maxFileSize: 10000000,
    maxFiles: 10,
  })
);

const httpServer = http.createServer(app);

class Server extends ApolloServer {
  public readonly db: PrismaClient<
    Prisma.PrismaClientOptions,
    never,
    Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined
  >;
  public readonly mail: MailService;

  constructor() {
    super({
      resolvers,
      typeDefs,
      csrfPrevention: true,
      formatResponse: (
        response: GraphQLResponse | null
        // requestContext: GraphQLRequestContext<any>
      ) => {
        // if (requestContext.response && requestContext.response.http) {
        //   requestContext.response.http.headers.set(
        //     "Access-Control-Allow-Origin",
        //     "https://www.wellfare.space"
        //   );
        // }
        return response as GraphQLResponse;
      },
      context: async ({ req }) => {
        if (req.body.operationName === "addToNewsletter")
          return { ipv6: req.ip };

        return { token: req.headers.authorization };
      },

      plugins: [
        ApolloServerPluginDrainHttpServer({
          httpServer,
        }),
      ],
    });

    this.db = new PrismaClient();

    this.mail = mail;
    this.mail.setApiKey(process.env.SENDGRID_API_KEY!);
    this.initCron();
  }

  async listen() {
    await this.start();
    this.applyMiddleware({
      app,
      path: "/",
      cors: false,
    });
    const port = process.env.PORT || 4000;
    await new Promise<void>((resolve) => app.listen(port, resolve));
    return port;
  }

  async initCron() {
    try {
      const commandFiles = sync(resolve(__dirname + "/cron/*"));
      commandFiles.forEach(async (file) => {
        if (/\.(j|t)s$/iu.test(file)) {
          // eslint-disable-next-line @typescript-eslint/no-var-requires
          const File = require(file).default;
          if (File && File.prototype instanceof Cron) {
            const cj: Cron = new File();
            const job = new CronJob(cj.interval, cj.exec);
            job.start();
          }
        }
      });

      // eslint-disable-next-line no-console
      console.log(
        `[Success] Successfully registered ${commandFiles.length} cron jobs.`
      );
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log("[Error] Error while registering cron jobs:");
      // eslint-disable-next-line no-console
      console.log(e);
    }
  }
}

const server = new Server();

export default server;
