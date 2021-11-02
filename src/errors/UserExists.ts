import { ApolloError } from "apollo-server-errors";

export default class UserExistsError extends ApolloError {
  constructor(message: string) {
    super(message, "1");

    Object.defineProperty(this, "UserExistsError", {
      value: "User already exists in database",
    });
  }
}
