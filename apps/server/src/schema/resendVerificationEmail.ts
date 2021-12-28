import { gql } from "apollo-server-express";

export default gql`
  extend type Mutation {
    resendVerificationEmail(token: String!): Success!
  }
`;
