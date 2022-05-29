import { gql } from "apollo-server-express";

export default gql`
  extend type Mutation {
    changeToNative(
      email: String
      password: String!
      service: String!
      refresh: String!
    ): ChangeToNative
  }
`;
