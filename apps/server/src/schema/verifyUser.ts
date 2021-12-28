import { gql } from "apollo-server-express";

export default gql`
  extend type Mutation {
    verifyUser(token: String!): Information
  }
`;
