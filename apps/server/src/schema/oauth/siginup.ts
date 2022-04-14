import { gql } from "apollo-server-express";

export default gql`
  extend type Mutation {
    oAuthSignup(service: String!, token: String!): User!
  }
`;
