import { gql } from "apollo-server";

export default gql`
  extend type Mutation {
    addRecord(
      token: String!
      description: Mood!
      contents: String!
      emoji: String!
      emojiDescription: String
    ): [Record]
  }
`;
