import { gql } from "apollo-server-express";

export default gql`
  extend type Query {
    getRecord(identifier: Int!): Record
  }
`;
