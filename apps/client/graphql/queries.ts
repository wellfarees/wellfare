import gql from "graphql-tag";
// TODO: add affirmations back into queries, when marcus fixed backend

export const DEVELOPERS_QUERY = gql`
  query data {
    company {
      developers {
        name
        roles
        image
      }
    }
  }
`;

export const LOGIN = gql`
  query Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
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
          pfp
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

export const GET_USER = gql`
  query GetUser {
    getUser {
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
        pfp
      }
      records {
        id
        emoji
        date
      }
    }
  }
`;

export const APPEARANCE_QUERY = gql`
  query GetUser {
    getUser {
      id
      config {
        darkMode
        fontSize
        reducedMotion
      }
      information {
        pfp
        firstName
      }
    }
  }
`;

export const USER_INFORMATION_QUERY = gql`
  query GetUserInfo {
    getUser {
      id
      information {
        firstName
        lastName
        verified
        pfp
        email
      }
      OAuthEmail
    }
  }
`;

export const AFFIRMATIONS_QUERY = gql`
  query GetUserInfo {
    getUser {
      id
      affirmations
      information {
        firstName
        pfp
      }
    }
  }
`;

export const GET_FIRST_NAME = gql`
  query getUserName {
    getUser {
      id
      information {
        id
        firstName
        pfp
      }
    }
  }
`;

export const USER_FEED_QUERY = gql`
  query GetUserFeed {
    getUser {
      id
      lastSubmitted
      information {
        id
        firstName
        pfp
      }
      records {
        date
        emoji
        id
        unease
        gratefulness
        feelings
      }
      recaps {
        id
        records {
          date
        }
      }
    }
  }
`;

export const RECAP_LIST_QUERY = gql`
  query GetRecapList {
    getUser {
      id
      recaps {
        id
        startDate
        endDate
        records {
          emoji
        }
      }
    }
  }
`;

export const GET_RECAP = gql`
  query GetRecap($identifier: Int!) {
    getRecap(identifier: $identifier) {
      id
      startDate
      endDate
      description
      records {
        id
        date
        unease
        gratefulness
        emoji
        feelings
      }
    }
  }
`;

export const GET_RECORD = gql`
  query GetRecord($identifier: Int!) {
    getRecord(identifier: $identifier) {
      id
      date
      unease
      gratefulness
      emoji
      feelings
    }
  }
`;

export const GET_LAST_SUBMITTED = gql`
  query GetLastSubmitted {
    getUser {
      id
      lastSubmitted
    }
  }
`;

export const GET_USER_PROFILE_PICTURE = gql`
  query GetUserProfilePicture {
    getUser {
      information {
        pfp
        firstName
      }
    }
  }
`;

export const VALID_JWT = gql`
  query VerifyJWT($token: String!, $type: String!) {
    verifyJWT(token: $token, type: $type) {
      success
    }
  }
`;

export const GET_GOOGLE_ACCESS_TOKEN = gql`
  query GetAccessToken($code: String!, $service: String!) {
    getAccessToken(code: $code, service: $service) {
      token
    }
  }
`;
