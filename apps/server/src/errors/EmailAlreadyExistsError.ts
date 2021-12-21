import { ApolloError } from "apollo-server-errors";

export default class EmailAlreadyExistsError extends ApolloError {
  constructor(message: string) {
    super(message, "8");

    Object.defineProperty(this, "EmailAlreadyExistsError", {
      value: "The email is already registered.",
    });
  }
}
