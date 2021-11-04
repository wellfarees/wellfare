import { gql } from "apollo-server";

export default gql`
  extend type Mutation {
    addAffirmations(token: String!, affirmations: [String]!): User!
  }
`;
