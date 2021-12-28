import { gql } from "apollo-server-express";

export default gql`
  extend type Mutation {
    createUser(name: String!, email: String!, password: String!): JWTUser
  }
`;
