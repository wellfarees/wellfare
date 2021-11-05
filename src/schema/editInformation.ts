import { gql } from "apollo-server";

export default gql`
  extend type Mutation {
    editInformation(
      token: String!
      firstName: String
      lastName: String
      email: String
      changePassword: ChangePassword
    ): Information
  }
`;
