import { gql } from "apollo-server-express";

export default gql`
  extend type Mutation {
    addEmailToNewsletter(email: String!): Success
  }
`;
