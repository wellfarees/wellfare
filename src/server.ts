import { PrismaClient, Prisma } from "@prisma/client";
import { ApolloServer } from "apollo-server";
import resolvers from "./resolvers";
import typeDefs from "./schema";
import mail, { MailService } from "@sendgrid/mail";

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
    });

    this.db = new PrismaClient();
    this.mail = mail;
    this.mail.setApiKey(process.env.SENDGRID_API_KEY!);
  }
}

const server = new Server();

export default server;
