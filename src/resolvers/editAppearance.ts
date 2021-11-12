import InvalidJWTTokenError from "../errors/InvalidJWTTokenError";
import server from "../server";
import { decodedToken } from "../types/jwt";
import verifyJWT from "../utils/verifyJWT";

export default {
  Mutation: {
    editAppearance: async (
      _: unknown,
      args: {
        token: string;
        darkMode?: boolean;
        reducedMotion?: boolean;
        fontSize?: number;
      }
    ) => {
      const dToken = verifyJWT(args.token, "client");
      if (!dToken) throw new InvalidJWTTokenError("JWT token is invalid.");
      const updateData: {
        darkMode?: boolean;
        reducedMotion?: boolean;
        fontSize?: number;
      } = {};
      if (args.darkMode !== undefined) updateData.darkMode = args.darkMode;
      if (args.reducedMotion !== undefined)
        updateData.reducedMotion = args.reducedMotion;
      if (args.fontSize) updateData.fontSize = args.fontSize;

      const id = Number((dToken as decodedToken).id);

      return await server.db.user.update({
        where: {
          id,
        },
        data: {
          config: {
            update: updateData,
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
