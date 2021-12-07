import { gql } from "graphql-tag";
export const CREATE_USER = gql`
  mutation CreateUser($email: String!, $name: String!, $password: String!) {
    createUser(email: $email, name: $name, password: $password) {
      jwt
      user {
        id
        config {
          darkMode
          fontSize
          reducedMotion
        }
        information {
          email
          firstName
          lastName
        }
        records {
          id
          emoji
          date
        }
      }
    }
  }
`;

export const EDIT_USER_CONFIG = gql`
  mutation EditUserConfig(
    $darkMode: Boolean
    $reducedMotion: Boolean
    $fontSize: Int
  ) {
    editAppearance(
      darkMode: $darkMode
      reducedMotion: $reducedMotion
      fontSize: $fontSize
    ) {
      config {
        darkMode
        fontSize
        reducedMotion
      }
    }
  }
`;

// TODO: Implement passwords
export const EDIT_USER_INFORMATION = gql`
  mutation EditInformation(
    $firstName: String
    $lastName: String
    $email: String
    $changePassword: ChangePassword
  ) {
    editInformation(
      firstName: $firstName
      lastName: $lastName
      email: $email
      changePassword: $changePassword
    ) {
      dbid
    }
  }
`;

export const EDIT_AFFIRMATIONS = gql`
  mutation AddAffirmations($affirmations: String!) {
    addAffirmations(affirmations: $affirmations) {
      id
    }
  }
`;

export const VERIFY_USER = gql`
  mutation VerifyUser($token: String!) {
    verifyUser(token: $token) {
      firstName
      email
      verified
    }
  }
`;

// TODO: remove contents argument
export const ADD_RECORD = gql`
  mutation AddRecord(
    $unease: String!
    $gratefulness: String!
    $emoji: String!
    $feelings: String!
  ) {
    addRecord(
      unease: $unease
      gratefulness: $gratefulness
      emoji: $emoji
      feelings: $feelings
    ) {
      id
    }
  }
`;

export const SEND_RESET_PASSWORD = gql`
  mutation ResetPassword($email: String!) {
    resetPassword(email: $email) {
      success
    }
  }
`;

export const RESEND_VERIFICATION = gql`
  mutation ResendVerification($token: String!) {
    resendVerificationEmail(token: $token) {
      success
    }
  }
`;
