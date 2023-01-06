import { PrismaClient, Prisma } from "@prisma/client";
import { ApolloServer } from "apollo-server-express";
import resolvers from "./resolvers";
import typeDefs from "./schema";
import { MailService } from "@sendgrid/mail";
import express from "express";
import http from "http";
import { ApolloServerPluginDrainHttpServer } from "apollo-server-core";
import { graphqlUploadExpress } from "graphql-upload";
import cors from "cors";
import { GraphQLResponse } from "apollo-server-core";

const app = express();

app.use(
  cors({
    origin: ["https://www.wellfare.space", "http://localhost:3000"],
  })
);

app.use(async (req, res, next) => {
  res.sendStatus(503);
  next();
  return;
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
      formatResponse: (response: GraphQLResponse | null) => {
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
}

const server = new Server();

export default server;
