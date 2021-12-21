import { PrismaClient, Prisma } from "@prisma/client";
import { ApolloServer } from "apollo-server";
import resolvers from "./resolvers";
import typeDefs from "./schema";
import mail, { MailService } from "@sendgrid/mail";
import { CronJob } from "cron";
import { resolve } from "path";
import { sync } from "glob";
import { Cron } from "./types/cron";
import * as dotenv from "dotenv";

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
    });

    dotenv.config();
    this.db = new PrismaClient();
    this.mail = mail;
    this.mail.setApiKey(process.env.SENDGRID_API_KEY!);
    this.initCron();
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
            new CronJob(cj.interval, cj.exec);
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
