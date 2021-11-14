import InvalidEmojiError from "../errors/InvalidEmojiError";
import InvalidJWTTokenError from "../errors/InvalidJWTTokenError";
import server from "../server";
import { decodedToken } from "../types/jwt";
import isEmoji from "../utils/isEmoji";
import verifyJWT from "../utils/verifyJWT";

export default {
  Mutation: {
    addRecord: async (
      _: unknown,
      args: {
        token: string;
        unease: string;
        gratefulness: string;
        contents: string;
        emoji: string;
        feelings: string;
      }
    ) => {
      const dToken = verifyJWT(args.token, "client");
      if (!dToken) throw new InvalidJWTTokenError("JWT token is invalid.");

      const id = Number((dToken as decodedToken).id);
      const emoji = args.emoji;
      if (emoji && !isEmoji(emoji)) {
        throw new InvalidEmojiError(
          "Emoji argument response does not contain pure emojis."
        );
      }

      const data = await server.db.user.update({
        where: {
          id,
        },
        data: {
          records: {
            create: [
              {
                feelings: args.feelings,
                emoji,
                unease: args.unease,
                gratefulness: args.gratefulness,
                contents: args.contents,
              },
            ],
          },
        },
        select: {
          records: {
            include: {
              User: {
                include: {
                  config: true,
                  information: true,
                  records: true,
                },
              },
            },
          },
        },
      });

      return data.records;
    },
  },
};
