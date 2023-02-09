import gql from "graphql-tag";
// TODO: add affirmations back into queries, when marcus fixed backend

export const DEVELOPERS_QUERY = gql`
  query data {
    company {
      developers {
        name
        roles
        image
        url
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
          id
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
        id
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
  query GetUserAppearance {
    getUser {
      id
      config {
        darkMode
        fontSize
        reducedMotion
      }
      information {
        id
        pfp
        firstName
      }
      affirmations
    }
  }
`;

export const USER_INFORMATION_QUERY = gql`
  query GetUserInfo {
    getUser {
      id
      information {
        id
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
  query GetUserAffirmations {
    getUser {
      id
      affirmations
      information {
        id
        firstName
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
      }
    }
  }
`;

export const GET_RECORDS = gql`
  query getRecords {
    getUser {
      id
      records {
        id
        unease
        gratefulness
        feelings
        date
        emoji
      }
    }
  }
`;

export const USER_FEED_QUERY = gql`
  query GetUserFeed {
    getUser {
      id
      lastSubmitted
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
          id
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
      id
      information {
        id
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

export const GET_SEARCH_HITS = gql`
  query GetSearchHits($query: String!) {
    getSearchHits(query: $query) {
      records {
        id
        date
        unease
        gratefulness
        emoji
        feelings
        recapId
      }
    }
  }
`;
