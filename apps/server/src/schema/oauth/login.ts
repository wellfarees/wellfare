import { gql } from "apollo-server-express";

export default gql`
  extend type Query {
    oAuthLogin(service: String!, token: String!): User!
  }
`;
