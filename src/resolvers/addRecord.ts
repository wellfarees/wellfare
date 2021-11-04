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
        description: "UNEASE" | "GRATEFULNESS";
        contents: string;
        emoji: string;
        emojiDescription?: string;
      }
    ) => {
      const dToken = verifyJWT(args.token);
      if (!dToken) throw new InvalidJWTTokenError("JWT token is invalid.");

      const id = Number((dToken as decodedToken).id);
      let emoji = args.emoji;
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
                emoji: {
                  create: {
                    emoji,
                    description: args.emojiDescription,
                  },
                },
                description: args.description,
                contents: args.contents,
              },
            ],
          },
        },
        select: {
          records: {
            include: {
              emoji: true,
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
