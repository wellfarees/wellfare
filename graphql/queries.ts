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
        email
        verified
      }
    }
  }
`;

export const AFFIRMATIONS_QUERY = gql`
  query GetUserInfo {
    getUser {
      id
    }
  }
`;

export const GET_FIRST_NAME = gql`
  query getUser {
    id
    information {
      firstName
    }
  }
`;

export const GET_BASE_INFORMATION = gql`
  query GetUser {
    getUser {
      information {
        firstName
        email
      }
      id
    }
  }
`;
