/**
 * This is a way to modularize the server. All modules have juste to extend the Query and Mutations types
 */

import { gql } from "apollo-server";
import company from "./company";
import ping from "./ping";

const root = gql`
  type Query {
    root: String
  }
  type Mutation {
    root: String
  }
`;

export default [root, ping, company];
