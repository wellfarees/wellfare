import { ApolloError } from "apollo-server-errors";

export default class UserAlreadyVerifiedError extends ApolloError {
  constructor(message: string) {
    super(message, "7");

    Object.defineProperty(this, "UserAlreadyVerifiedError", {
      value: "The user is already verified.",
    });
  }
}
