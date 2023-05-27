import { decrypt } from "../utils/crypto";
import { client } from "../algolia";
import verifyJWT from "../utils/verifyJWT";

import { decodedToken } from "../types/jwt";

import InvalidJWTTokenError from "../errors/InvalidJWTTokenError";
import NoTokenInHeaderError from "../errors/NoTokenInHeaderError";

interface EncryptedData {
  iv: string;
  content: string;
}

interface AlgoliaRecord {
  feelings: EncryptedData;
  unease: EncryptedData;
  gratefulness: EncryptedData;
  emoji: string;
}

export default {
  Query: {
    getSearchHits: async (
      _: unknown,
      args: { query: string },
      headers: { token: string }
    ) => {
      // Contributions branch exclusive [CBE]
      if (process.env.ALGOLIA_APP == "DEV") {
        return {
          records: [],
        };
      }

      if (!headers.token)
        return new NoTokenInHeaderError(
          "No token was found in the header. Please provide in Authorization header."
        );

      const dToken = verifyJWT(headers.token, "client") as decodedToken;
      if (!dToken) throw new InvalidJWTTokenError("JWT token is invalid.");

      const index = client.initIndex("records");

      const resHits: {
        feelings: string;
        unease: string;
        gratefulness: string;
        emoji: string;
      }[] = [];

      const res = await index.search<{
        visible_by: string;
        record: AlgoliaRecord;
      }>("", {
        hitsPerPage: 1000,
        filters: `visible_by:${dToken.id}`,
      });

      for (const hit of res.hits) {
        if (!hit.record.feelings.iv) continue;
        const feelings = decrypt(hit.record.feelings);
        const unease = decrypt(hit.record.unease);
        const gratefulness = decrypt(hit.record.gratefulness);
        const resultingString = feelings.concat(unease).concat(gratefulness);

        if (resultingString.includes(args.query)) {
          resHits.push({
            ...hit.record,
            feelings,
            unease,
            gratefulness,
            emoji: hit.record.emoji,
          });
        }
      }

      return { records: resHits };
    },
  },
};
