import { ApolloError } from "apollo-server-errors";

export default class InvalidEmojiError extends ApolloError {
  constructor(message: string) {
    super(message, "4");

    Object.defineProperty(this, "InvalidEmojiError", {
      value: "String does not contain pure emojis.",
    });
  }
}
