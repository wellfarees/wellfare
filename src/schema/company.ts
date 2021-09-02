import { gql } from "apollo-server";

export default gql`
  type Person {
    name: String!
    roles: [String]!
    image: String!
  }

  type Roles {
    developers: [Person]!
  }

  extend type Query {
    company: Roles
  }
`;
