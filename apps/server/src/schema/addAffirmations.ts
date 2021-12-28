import { gql } from "apollo-server-express";

export default gql`
  extend type Mutation {
    addAffirmations(affirmations: String!): User!
  }
`;
