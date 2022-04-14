import { gql } from "apollo-server-express";

export default gql`
  extend type Query {
    getAccessToken(code: String!, service: String!): Token
  }
`;
