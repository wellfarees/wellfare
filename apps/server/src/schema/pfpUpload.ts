import { gql } from "apollo-server-express";

export default gql`
  extend type Mutation {
    pfpUpload(image: Upload!): Location!
  }
`;
