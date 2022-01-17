import { gql } from "apollo-server-express";
import addRecord from "./addRecord";
import login from "./login";
import company from "./company";
import createUser from "./createUser";
import getUser from "./getUser";
import getRecap from "./getRecap";
import getRecord from "./getRecord";
import ping from "./ping";
import addAffirmations from "./addAffirmations";
import editAppearance from "./editAppearance";
import editInformation from "./editInformation";
import verifyUser from "./verifyUser";
import resendVerificationEmail from "./resendVerificationEmail";
import resetPassword from "./resetPassword";
import restoreEmail from "./restoreEmail";
import pfpUpload from "./pfpUpload";
import addEmailToNewsletter from "./addEmailToNewsletter";
import getUserInformationFromEmailToken from "./getUserInformationFromEmailToken";

const root = gql`
  # Base types
  scalar Upload

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
    recaps: [Recap!]
    lastIndex: Int
    emailLastUpdated: Float!
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
    emailLastUpdated: Float!
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
    Recap: Recap
    recapId: Int
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
  getRecap,
  createUser,
  login,
  addRecord,
  getRecord,
  addAffirmations,
  editAppearance,
  editInformation,
  verifyUser,
  resendVerificationEmail,
  resetPassword,
  restoreEmail,
  pfpUpload,
  addEmailToNewsletter,
  getUserInformationFromEmailToken,
];
