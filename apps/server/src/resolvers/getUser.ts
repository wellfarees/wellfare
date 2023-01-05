import InvalidJWTTokenError from "../errors/InvalidJWTTokenError";
import NoTokenInHeaderError from "../errors/NoTokenInHeaderError";
import UserDoesNotExistsError from "../errors/UserDoesNotExist";
import { decodedToken } from "../types/jwt";
import verifyJWT from "../utils/verifyJWT";
import differenceInHours from "date-fns/differenceInHours";
import { decryptSensitiveData } from "../utils/decryptSensitiveData";

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

      const data = await decryptSensitiveData(id, {
        config: true,
        information: true,
        records: true,
      });

      if (!data)
        throw new UserDoesNotExistsError(
          "User does not exist in the database."
        );

      const decrypted = await decryptSensitiveData(id);

      if (!data.records[0]) return { ...data, lastSubmitted: null };
      else
        return {
          ...decrypted,
          lastSubmitted: differenceInHours(new Date(), data.records[0].date),
        };
    },
  },
};
