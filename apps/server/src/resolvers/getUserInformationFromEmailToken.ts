import server from "../server";

import verifyJWT from "../utils/verifyJWT";
import { decryptSensitiveData } from "../utils/decryptSensitiveData";

import { decodedToken } from "../types/jwt";

import InvalidJWTTokenError from "../errors/InvalidJWTTokenError";

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
      const id = (dToken as decodedToken).id;

      const user = await server.db.user.findFirst({
        where: { id },
      });
      const decrypted = await decryptSensitiveData(user);

      return decrypted;
    },
  },
};
