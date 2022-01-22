import InvalidJWTTokenError from "../errors/InvalidJWTTokenError";
import NoTokenInHeaderError from "../errors/NoTokenInHeaderError";
import UserDoesNotExistsError from "../errors/UserDoesNotExist";
import server from "../server";
import { decodedToken } from "../types/jwt";
import verifyJWT from "../utils/verifyJWT";

export default {
  Query: {
    getRecord: async (
      _: unknown,
      args: { identifier: number },
      headers: { token?: string }
    ) => {
      if (!headers.token)
        return new NoTokenInHeaderError(
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
          records: {
            where: {
              id: args.identifier,
            },
          },
        },
      });

      if (!data)
        throw new UserDoesNotExistsError(
          "User does not exist in the database."
        );

      return data.records[0];
    },
  },
};
