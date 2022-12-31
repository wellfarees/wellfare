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
          "No token was found in the header. Please provide an authorization header."
        );
      const dToken = verifyJWT(headers.token, "client");
      if (!dToken) throw new InvalidJWTTokenError("JWT token is invalid.");

      const id = (dToken as decodedToken).id;
      const emoji = args.emoji;
      if (emoji && !isEmoji(emoji)) {
        throw new InvalidEmojiError(
          "Emoji argument response does not contain pure emojis."
        );
      }

      const recordBase = {
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
            create: [recordBase],
          },
        },
        select: {
          records: {
            include: {
              User: {
                include: {
                  records: true,
                },
              },
              Recap: {
                select: {
                  id: true,
                },
              },
            },
          },
        },
      });

      const today = new Date();
      today.setHours(0, 0, 0);

      const currentRecord = await server.db.record.findFirst({
        where: {
          userId: id,
          AND: {
            date: {
              gte: today,
            },
          },
        },
        select: {
          id: true,
          Recap: {
            select: {
              id: true,
            },
          },
        },
      });

      const algoliaRecordInfo = {
        ...recordBase,
        id: currentRecord.id,
        date: Date.now(),
        repcapId: currentRecord.Recap ? currentRecord.Recap.id : null,
      };

      if (!data)
        throw new UserDoesNotExistsError(
          "User does not exist in the database."
        );

      const index = client.initIndex("records");

      const algoliaRecord = {
        record: algoliaRecordInfo,
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
