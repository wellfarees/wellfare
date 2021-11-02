import { gql } from "apollo-server";
import company from "./company";
import createUser from "./createUser";
import getUser from "./getUser";
import ping from "./ping";

const root = gql`
  type Query {
    root: String
  }

  type Mutation {
    root: String
  }

  type User {
    id: Int!
    config: Configuration!
    configurationId: String!
    records: [Record]!
    information: Information!
    informationId: String!
  }

  type Information {
    dbid: String!
    name: String!
    email: String!
  }

  type Configuration {
    id: String!
    darkMode: Boolean!
    reducedMotion: Boolean!
    fontSize: Int!
  }

  type Record {
    id: String!
    date: Float!
    description: Mood!
    contents: String!
    emoji: Emoji!
    emojiId: String!
  }

  type Emoji {
    id: String!
    emoji: String!
    description: String
    Record: [Record]!
  }

  enum Mood {
    UNEASE
    GRATEFULNESS
  }
`;

export default [root, ping, company, getUser, createUser];
