import { ApolloError } from "apollo-server-errors";

export default class WrongPasswordError extends ApolloError {
  constructor(message: string) {
    super(message, "5");

    Object.defineProperty(this, "WrongPasswordError", {
      value: "Wrong password",
    });
  }
}
