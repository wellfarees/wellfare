import { gql } from "apollo-server";
import addRecord from "./addRecord";
import login from "./login";
import company from "./company";
import createUser from "./createUser";
import getUser from "./getUser";
import ping from "./ping";
import addAffirmations from "./addAffirmations";
import editAppearance from "./editAppearance";
import editInformation from "./editInformation";

const root = gql`
  # Base types
  type Query {
    root: String
  }

  type Mutation {
    root: String
  }

  # Database types
  type JWTUser {
    user: User!
    jwt: String!
  }

  type User {
    id: Int!
    config: Configuration!
    configurationId: String!
    records: [Record]!
    information: Information!
    informationId: String!
    affirmations: [String]!
  }

  type Information {
    dbid: String!
    firstName: String!
    lastName: String!
    email: String!
    password: String!
    User: [User]!
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
    User: User!
    userId: Int!
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

  # Input fields
  input ChangePassword {
    current: String!
    new: String!
  }
`;

export default [
  root,
  ping,
  company,
  getUser,
  createUser,
  login,
  addRecord,
  addAffirmations,
  editAppearance,
  editInformation,
];
