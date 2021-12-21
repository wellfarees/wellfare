import { gql } from "apollo-server";

export default gql`
  extend type Mutation {
    createUser(name: String!, email: String!, password: String!): JWTUser
  }
`;
