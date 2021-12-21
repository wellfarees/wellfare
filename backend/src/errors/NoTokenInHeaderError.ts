import { ApolloError } from "apollo-server-errors";

export default class NoTokenInHeaderError extends ApolloError {
  constructor(message: string) {
    super(message, "8");

    Object.defineProperty(this, "NoTokenInHeader", {
      value:
        "No token was found in the header. Please provide in Authorization header.",
    });
  }
}
