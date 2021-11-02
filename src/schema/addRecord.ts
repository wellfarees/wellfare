import { gql } from "apollo-server";

export default gql`
  extend type Mutation {
    addRecord(
      id: String!
      description: String!
      contents: String!
      emoji: Emoji!
    ): Record
  }
`;
