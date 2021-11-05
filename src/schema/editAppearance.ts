import { gql } from "apollo-server";

export default gql`
  extend type Mutation {
    editAppearance(
      token: String!
      darkMode: Boolean
      reducedMotion: Boolean
      fontSize: Int
    ): User!
  }
`;
