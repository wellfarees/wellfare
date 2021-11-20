import InvalidJWTTokenError from "../errors/InvalidJWTTokenError";
import UserDoesNotExistsError from "../errors/UserDoesNotExist";
import server from "../server";
import { decodedToken } from "../types/jwt";
import msToHours from "../utils/msToHours";
import verifyJWT from "../utils/verifyJWT";

export default {
  Query: {
    getUser: async (_: unknown, args: { token: string }) => {
      const dToken = verifyJWT(args.token, "client");
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

      if (!data.records[0]) return { lastSubmitted: null, user: data };
      else
        return {
          lastSubmitted: Math.abs(
            msToHours(new Date().getTime() - data.records[0].date.getTime())
          ),
          user: data,
        };
    },
  },
};
