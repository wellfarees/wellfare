import { gql } from "apollo-server-express";

export default gql`
  extend type Query {
    getSearchHits(query: String!): Hits
  }
`;
