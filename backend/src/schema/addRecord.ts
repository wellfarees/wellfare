import { gql } from "apollo-server";

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
