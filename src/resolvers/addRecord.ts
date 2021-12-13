import InvalidEmojiError from "../errors/InvalidEmojiError";
import InvalidJWTTokenError from "../errors/InvalidJWTTokenError";
import UserDoesNotExistsError from "../errors/UserDoesNotExist";
import server from "../server";
import { decodedToken } from "../types/jwt";
import isEmoji from "../utils/isEmoji";
import verifyJWT from "../utils/verifyJWT";
import NoTokenInHeaderError from "../errors/NoTokenInHeaderError";
import { client } from "../algolia";

export default {
  Mutation: {
    addRecord: async (
      _: unknown,
      args: {
        unease: string;
        gratefulness: string;
        emoji: string;
        feelings: string;
      },
      headers: { token?: string }
    ) => {
      if (!headers.token)
        return new NoTokenInHeaderError(
          "No token was found in the header. Please provide in Authorization header."
        );
      const dToken = verifyJWT(headers.token, "client");
      if (!dToken) throw new InvalidJWTTokenError("JWT token is invalid.");

      const id = Number((dToken as decodedToken).id);
      const emoji = args.emoji;
      if (emoji && !isEmoji(emoji)) {
        throw new InvalidEmojiError(
          "Emoji argument response does not contain pure emojis."
        );
      }

      const newRecord = {
        feelings: args.feelings,
        emoji,
        unease: args.unease,
        gratefulness: args.gratefulness,
      };

      const data = await server.db.user.update({
        where: {
          id,
        },
        data: {
          records: {
            create: [newRecord],
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

      if (!data)
        throw new UserDoesNotExistsError(
          "User does not exist in the database."
        );

      const index = client.initIndex("records");

      const algoliaRecord = {
        record: newRecord,
        visible_by: id,
      };

      index.setSettings({
        attributesForFaceting: ["filterOnly(visible_by)"],
        unretrievableAttributes: ["visible_by"],
      });

      index.saveObject(algoliaRecord, {
        autoGenerateObjectIDIfNotExist: true,
      });

      return data.records;
    },
  },
};
