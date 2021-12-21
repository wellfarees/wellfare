import InvalidJWTTokenError from "../errors/InvalidJWTTokenError";
import NoTokenInHeaderError from "../errors/NoTokenInHeaderError";
import UserDoesNotExistsError from "../errors/UserDoesNotExist";
import server from "../server";
import { decodedToken } from "../types/jwt";
import msToHours from "../utils/msToHours";
import verifyJWT from "../utils/verifyJWT";

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
          lastSubmitted: Math.abs(
            msToHours(new Date().getTime() - data.records[0].date.getTime())
          ),
        };
    },
  },
};
