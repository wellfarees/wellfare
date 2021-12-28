import InvalidJWTTokenError from "../errors/InvalidJWTTokenError";
import NoTokenInHeaderError from "../errors/NoTokenInHeaderError";
import UserDoesNotExistsError from "../errors/UserDoesNotExist";
import server from "../server";
import { decodedToken } from "../types/jwt";
import verifyJWT from "../utils/verifyJWT";
import differenceInHours from "date-fns/differenceInHours";

export default {
  Query: {
    getUser: async (_: unknown, _args: null, headers: { token?: string }) => {
      if (!headers.token)
        return new NoTokenInHeaderError(
          "No token was found in the header. Please provide in Authorization header."
        );
      const dToken = verifyJWT(headers.token, "client");
      if (!dToken) throw new InvalidJWTTokenError("JWT token is invalid.");

      const id = Number((dToken as decodedToken).id);

      const data = await server.db.user.findFirst({
        where: {
          id,
        },
        include: {
          information: true,
          config: true,
          recaps: {
            include: {
              records: true,
            },
          },
          records: {
            orderBy: {
              date: "desc",
            },
          },
        },
      });
      if (!data)
        throw new UserDoesNotExistsError(
          "User does not exist in the database."
        );

      if (!data.records[0]) return { ...data, lastSubmitted: null };
      else
        return {
          ...data,
          // +2 for GMT+2 timezone but it's weird behavior that timezones are not already determined automatically
          lastSubmitted:
            differenceInHours(new Date(), data.records[0].date) + 2,
        };
    },
  },
};
