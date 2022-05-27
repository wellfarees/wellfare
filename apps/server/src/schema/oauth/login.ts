import { gql } from "apollo-server-express";

export default gql`
  extend type Mutation {
    oAuthLogin(service: String!, token: String!, type: String!): oAuthUser
  }
`;
