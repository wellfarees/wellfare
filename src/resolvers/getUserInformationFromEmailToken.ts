import InvalidJWTTokenError from "../errors/InvalidJWTTokenError";
import UserDoesNotExistsError from "../errors/UserDoesNotExist";
import server from "../server";
import { decodedToken } from "../types/jwt";
import verifyJWT from "../utils/verifyJWT";

export default {
  Query: {
    getUserInformationFromEmailToken: async (
      _: null,
      args: {
        token: string;
      }
    ) => {
      const dToken = verifyJWT(args.token, "verification");
      if (!dToken) throw new InvalidJWTTokenError("JWT token is invalid.");
      const id = Number((dToken as decodedToken).id);

      const data = await server.db.user.findFirst({
        where: {
          id,
        },
        include: {
          config: true,
          information: true,
          recaps: true,
          records: true,
        },
      });

      if (!data)
        throw new UserDoesNotExistsError("User does not exist in database.");

      return data;
    },
  },
};
