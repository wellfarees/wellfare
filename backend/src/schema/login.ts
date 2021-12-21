import { gql } from "apollo-server";

export default gql`
  extend type Query {
    login(email: String!, password: String!): JWTUser
  }
`;
