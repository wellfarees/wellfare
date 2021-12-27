import { gql } from "apollo-server";

export default gql`
  extend type Query {
    getRecap(identifier: Int!): Recap
  }
`;
