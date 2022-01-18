import { gql } from "apollo-server-express";

export default gql`
  extend type Mutation {
    changePassword(jwt: String!, password: String!): User!
  }
`;
