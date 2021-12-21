import { ApolloError } from "apollo-server-errors";

export default class UserDoesNotExistsError extends ApolloError {
  constructor(message: string) {
    super(message, "2");

    Object.defineProperty(this, "UserDoesNotExistError", {
      value: "User does not exists in database",
    });
  }
}
