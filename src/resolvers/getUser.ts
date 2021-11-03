import InvalidJWTTokenError from "../errors/InvalidJWTTokenError";
import UserDoesNotExistsError from "../errors/UserDoesNotExist";
import server from "../server";
import { decodedToken } from "../types/jwt";
import verifyJWT from "../utils/verifyJWT";

export default {
  Query: {
    getUser: async (_: unknown, args: { token: string }) => {
      const dToken = verifyJWT(args.token);
      if (!dToken) throw new InvalidJWTTokenError("JWT token is invalid.");

      const id = dToken as decodedToken;

      const data = await server.db.user.findFirst({
        where: {
          id: Number(id.id),
        },
        include: {
          information: true,
          config: true,
          records: true,
        },
      });
      if (!data)
        throw new UserDoesNotExistsError(
          "User does not exist in the database."
        );
      else return data;
    },
  },
};
