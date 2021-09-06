/**
 * This is a way to modularize the server. All modules have juste to extend the Query and Mutations types
 */

import { gql } from "apollo-server";
import company from "./company";
import ping from "./ping";

const root = gql`
  type Query {
    root: String
  }

  type Mutation {
    root: String
  }

  type Configuration {
    id: String!
    darkMode: Boolean!
    reducedMotion: Boolean!
    fontSize: Int!
    User: [User]!
  }

  type Account {
    id: String!
    userId: String!
    providerType: String!
    providerId: String!
    providerAccountId: String!
    refreshToken: String
    accessToken: String
    accessTokenExpires: Float!
    createdAt: Float!
    updatedAt: Float!
    user: User!
  }

  type Session {
    id: String!
    userId: String!
    expires: Float!
    sessionToken: String!
    accessToken: String!
    createdAt: Float!
    updatedAt: Float!
    user: User!
  }

  type User {
    id: String!
    name: String
    email: String
    emailVerified: Float
    image: String
    createdAt: Float!
    updatedAt: Float!
    accounts: [Account]!
    sessions: [Session]!
    configurations: Configuration!
    configurationId: String!
    affirmations: [String]!
    record: [Record]!
    recordId: String!
  }

  type VerificationRequest {
    id: String!
    identifier: String!
    token: String!
    expires: Float!
    createdAt: Float!
    updatedAt: Float!
  }

  type Record {
    id: String!
    date: Float!
    description: String!
    contents: String!
    emoji: Emoji!
    emojiId: String!
    User: [User]!
  }

  type Emoji {
    id: String!
    emoji: String!
    description: String!
    Record: [Record]!
  }
`;

export default [root, ping, company];
