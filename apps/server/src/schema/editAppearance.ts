import { gql } from "apollo-server-express";

export default gql`
  extend type Mutation {
    editAppearance(
      darkMode: Boolean
      reducedMotion: Boolean
      fontSize: Int
    ): User!
  }
`;
