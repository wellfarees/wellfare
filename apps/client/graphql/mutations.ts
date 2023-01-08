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
      publicAlgoliaKey
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
      id
      email
      verified
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
      id
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

export const RESTORE_EMAIL = gql`
  mutation RestoreEmail($email: String!, $newEmail: String!) {
    restoreEmail(email: $email, newEmail: $newEmail) {
      information {
        firstName
        email
      }
    }
  }
`;

export const UPLOAD_PFP = gql`
  mutation PfpUpload($file: Upload!) {
    pfpUpload(image: $file) {
      location
    }
  }
`;

export const CHANGE_PASSWORD = gql`
  mutation ChangePassword($password: String!, $jwt: String!) {
    changePassword(password: $password, jwt: $jwt) {
      id
    }
  }
`;

export const OAUTH_LOGIN = gql`
  mutation OAuthLogin($service: String!, $token: String!, $type: String!) {
    oAuthLogin(service: $service, token: $token, type: $type) {
      user {
        id
        affirmations
        information {
          pfp
          firstName
          lastName
        }
        config {
          darkMode
          fontSize
          reducedMotion
        }
        OAuthEmail
      }
      publicAlgoliaKey
      oAuthRefresh
    }
  }
`;

export const CHANGE_TO_NATIVE = gql`
  mutation ChangeToNative(
    $service: String!
    $password: String!
    $email: String
    $refresh: String!
  ) {
    changeToNative(
      service: $service
      email: $email
      password: $password
      refresh: $refresh
    ) {
      token
    }
  }
`;

export const ADD_EMAIL_TO_NEWSLETTER = gql`
  mutation addToNewsletter($email: String!) {
    addEmailToNewsletter(email: $email) {
      success
    }
  }
`;

export const UNSCUBSCRIBE = gql`
  mutation Unsubscribe($encodedEmail: String!) {
    unsubscribe(encodedEmail: $encodedEmail) {
      email
    }
  }
`;
