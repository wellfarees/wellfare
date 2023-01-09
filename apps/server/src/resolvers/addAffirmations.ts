import InvalidJWTTokenError from "../errors/InvalidJWTTokenError";
import NoTokenInHeaderError from "../errors/NoTokenInHeaderError";
import server from "../server";
import { decodedToken } from "../types/jwt";
import verifyJWT from "../utils/verifyJWT";
import { decryptSensitiveData } from "../utils/decryptSensitiveData";
import { encrypt } from "../utils/crypto";
import { User, EncryptedAffirmations } from "@prisma/client";

export default {
  Mutation: {
    addAffirmations: async (
      _: unknown,
      args: { affirmations: string },
      headers: { token?: string }
    ) => {
      if (!headers.token)
        return new NoTokenInHeaderError(
          "No token was found in the header. Please provide in Authorization header."
        );
      const dToken = verifyJWT(headers.token, "client");
      if (!dToken) throw new InvalidJWTTokenError("JWT token is invalid.");

      const id = (dToken as decodedToken).id;

      const user = await server.db.user.findFirst({
        where: {
          id,
        },
        include: {
          encryptedAffirmations: true,
        },
      });

      let finalUser: User & {
        encryptedAffirmations: EncryptedAffirmations;
      };

      if (user.encryptedAffirmations) {
        finalUser = await server.db.user.update({
          where: {
            id,
          },
          data: {
            encryptedAffirmations: {
              update: encrypt(args.affirmations),
            },
          },
          include: {
            encryptedAffirmations: true,
          },
        });
      } else {
        finalUser = await server.db.user.update({
          where: {
            id,
          },
          data: {
            encryptedAffirmations: {
              create: encrypt(args.affirmations),
            },
          },
          include: {
            encryptedAffirmations: true,
          },
        });
      }

      return await decryptSensitiveData(finalUser);
    },
  },
};
