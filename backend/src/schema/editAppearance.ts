import { gql } from "apollo-server";

export default gql`
  extend type Mutation {
    editAppearance(
      darkMode: Boolean
      reducedMotion: Boolean
      fontSize: Int
    ): User!
  }
`;
