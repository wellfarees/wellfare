import { gql } from "apollo-server-express";

export default gql`
  extend type Mutation {
    addRecord(
      unease: String!
      gratefulness: String!
      emoji: String!
      feelings: String!
    ): [Record]
  }
`;
