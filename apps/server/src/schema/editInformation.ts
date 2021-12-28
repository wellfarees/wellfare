import { gql } from "apollo-server-express";

export default gql`
  extend type Mutation {
    editInformation(
      firstName: String
      lastName: String
      email: String
      changePassword: ChangePassword
      pfp: String
    ): Information
  }
`;
