import InvalidJWTTokenError from "../errors/InvalidJWTTokenError";
import server from "../server";
import { decodedToken } from "../types/jwt";
import verifyJWT from "../utils/verifyJWT";

export default {
  Mutation: {
    addAffirmations: async (
      _: unknown,
      args: { token: string; affirmations: string[] }
    ) => {
      const dToken = verifyJWT(args.token, "client");
      if (!dToken) throw new InvalidJWTTokenError("JWT token is invalid.");

      const id = Number((dToken as decodedToken).id);

      return await server.db.user.update({
        where: {
          id,
        },
        data: {
          affirmations: {
            push: args.affirmations,
          },
        },
        include: {
          config: true,
          information: true,
          records: true,
        },
      });
    },
  },
};
