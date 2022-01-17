import { gql } from "apollo-server-express";

export default gql`
  extend type Mutation {
    restoreEmail(email: String!, newEmail: String!): User
  }
`;
