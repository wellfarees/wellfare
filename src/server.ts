import { PrismaClient, Prisma } from "@prisma/client";
import { ApolloServer } from "apollo-server";
import resolvers from "./resolvers";
import typeDefs from "./schema";

class Server extends ApolloServer {
  public readonly db: PrismaClient<
    Prisma.PrismaClientOptions,
    never,
    Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined
  >;

  constructor() {
    super({
      resolvers,
      typeDefs,
    });

    this.db = new PrismaClient();
  }
}

const server = new Server();

export default server;
