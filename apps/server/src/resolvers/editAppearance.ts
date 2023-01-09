import InvalidJWTTokenError from "../errors/InvalidJWTTokenError";
import NoTokenInHeaderError from "../errors/NoTokenInHeaderError";
import server from "../server";
import { decodedToken } from "../types/jwt";
import { decryptSensitiveData } from "../utils/decryptSensitiveData";
import verifyJWT from "../utils/verifyJWT";

export default {
  Mutation: {
    editAppearance: async (
      _: unknown,
      args: {
        darkMode?: boolean;
        reducedMotion?: boolean;
        fontSize?: number;
      },
      headers: { token?: string }
    ) => {
      try {
        if (!headers.token)
          return new NoTokenInHeaderError(
            "No token was found in the header. Please provide in Authorization header."
          );
        const dToken = verifyJWT(headers.token, "client");
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

        const id = (dToken as decodedToken).id;

        const user = await server.db.user.update({
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
          },
        });

        return await decryptSensitiveData(user);
      } catch (e) {
        console.log(e);
      }
    },
  },
};
