import { gql } from "apollo-server-express";

export default gql`
  extend type Query {
    verifyJWT(token: String!, type: String!): Success!
  }
`;
