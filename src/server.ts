import { ApolloServer } from "apollo-server";
import resolvers from "./resolvers";
import typeDefs from "./schema";

const server = new ApolloServer({ resolvers, typeDefs });

export default server;
