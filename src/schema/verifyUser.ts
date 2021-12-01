import { gql } from "apollo-server";

export default gql`
  extend type Mutation {
    verifyUser(token: String!): Information
  }
`;
