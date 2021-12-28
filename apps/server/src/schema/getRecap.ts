import { gql } from "apollo-server-express";

export default gql`
  extend type Query {
    getRecap(identifier: Int!): Recap
  }
`;
