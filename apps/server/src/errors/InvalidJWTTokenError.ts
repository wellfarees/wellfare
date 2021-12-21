import { ApolloError } from "apollo-server-errors";

export default class InvalidJWTTokenError extends ApolloError {
  constructor(message: string) {
    super(message, "3");

    Object.defineProperty(this, "InvalidJWTTokenError", {
      value: "Invalid JWT token.",
    });
  }
}
