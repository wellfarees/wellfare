import InvalidJWTTokenError from "../errors/InvalidJWTTokenError";
import NoTokenInHeaderError from "../errors/NoTokenInHeaderError";
import UserDoesNotExistsError from "../errors/UserDoesNotExist";
import { decodedToken } from "../types/jwt";
import verifyJWT from "../utils/verifyJWT";
import differenceInHours from "date-fns/differenceInHours";
import { decryptSensitiveData } from "../utils/decryptSensitiveData";
import server from "../server";

export default {
  Query: {
    getUser: async (_: unknown, _args: null, headers: { token?: string }) => {
      if (!headers.token)
        throw new NoTokenInHeaderError(
          "No token was found in the header. Please provide in Authorization header."
        );

      const dToken = verifyJWT(headers.token, "client");

      if (!dToken) throw new InvalidJWTTokenError("JWT token is invalid.");

      const id = (dToken as decodedToken).id;

      const data = await server.db.user.findFirst({
        where: {
          id,
        },
        include: {
          config: true,
          information: true,
          records: {
            include: {
              feelings: true,
              gratefulness: true,
              unease: true,
            },
          },
          encryptedAffirmations: true,
        },
      });

      if (!data)
        throw new UserDoesNotExistsError(
          "User does not exist in the database."
        );

      const decryptedData = await decryptSensitiveData(data);

      if (!data.records[0]) return { ...decryptedData, lastSubmitted: null };
      else
        return {
          ...decryptedData,
          lastSubmitted: differenceInHours(new Date(), data.records[0].date),
        };
    },
  },
};
