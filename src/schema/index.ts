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
import verifyUser from "./verifyUser";
import resendVerificationEmail from "./resendVerificationEmail";
import resetPassword from "./resetPassword";
import addEmailToNewsletter from "./addEmailToNewsletter";
import getUserInformationFromEmailToken from "./getUserInformationFromEmailToken";

const root = gql`
  # Base types
  type Query {
    root: String
  }

  type Mutation {
    root: String
  }

  # User types
  type JWTUser {
    user: User!
    jwt: String!
    publicAlgoliaKey: String!
  }

  type lastSubmittedUser {
    lastSubmitted: Float
    id: Int!
    config: Configuration!
    configurationId: String!
    records: [Record]!
    information: Information!
    informationId: String!
    affirmations: String
    recaps: Recap!
    lastIndex: Int
  }

  # Database types
  type User {
    id: Int!
    config: Configuration!
    configurationId: String!
    records: [Record]!
    information: Information!
    informationId: String!
    affirmations: String
    recaps: Recap!
    lastIndex: Int
  }

  type Information {
    dbid: String!
    firstName: String!
    lastName: String!
    email: String!
    password: String!
    verified: Boolean!
    pfp: String
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
    unease: String!
    gratefulness: String!
    emoji: String!
    feelings: String!
    User: User!
    userId: Int!
  }

  type Emoji {
    id: String!
    emoji: String!
    description: String
    Record: [Record]!
  }

  type Recap {
    id: Int!
    startDate: Float!
    endDate: Float!
    description: String!
    records: [Record]!
    User: User
    userId: Int
  }

  # Input fields
  input ChangePassword {
    current: String!
    new: String!
  }

  # Response types
  type Success {
    success: Boolean!
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
  verifyUser,
  resendVerificationEmail,
  resetPassword,
  addEmailToNewsletter,
  getUserInformationFromEmailToken,
];
