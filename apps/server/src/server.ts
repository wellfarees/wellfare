import { PrismaClient, Prisma } from "@prisma/client";
import { ApolloServer } from "apollo-server-express";
import resolvers from "./resolvers";
import typeDefs from "./schema";
import mail, { MailService } from "@sendgrid/mail";
import { CronJob } from "cron";
import { resolve } from "path";
import { sync } from "glob";
import { Cron } from "./types/cron";
import * as dotenv from "dotenv";
import express from "express";
import http from "http";
import { ApolloServerPluginDrainHttpServer } from "apollo-server-core";

const app = express();
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
      context: ({ req }) => ({
        token: req.headers.authorization,
      }),
      plugins: [
        ApolloServerPluginDrainHttpServer({
          httpServer,
        }),
      ],
    });

    dotenv.config();
    this.db = new PrismaClient();
    this.mail = mail;
    this.mail.setApiKey(process.env.SENDGRID_API_KEY!);
    this.initCron();
  }

  async listen() {
    await this.start();
    this.applyMiddleware({ app, path: "/" });
    await new Promise<void>((resolve) =>
      httpServer.listen({ port: 4000 }, resolve)
    );
    return `http://localhost:4000${server.graphqlPath}`;
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
      console.log("[Success] Successfully registered cron jobs.");
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
