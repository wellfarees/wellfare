import { gql } from "apollo-server";

export default gql`
  extend type Mutation {
    addAffirmations(affirmations: String!): User!
  }
`;
