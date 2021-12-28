import { gql } from "apollo-server-express";

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
