import gql from "graphql-tag";

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
