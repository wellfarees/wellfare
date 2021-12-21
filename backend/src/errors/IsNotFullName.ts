import { ApolloError } from "apollo-server-errors";

export default class IsNotFullNameError extends ApolloError {
  constructor(message: string) {
    super(message, "6");

    Object.defineProperty(this, "IsNotFullNameError", {
      value: "Provided string is not a full name.",
    });
  }
}
