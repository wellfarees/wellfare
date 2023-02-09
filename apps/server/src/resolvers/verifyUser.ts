import server from "../server";

import verifyJWT from "../utils/verifyJWT";

import { decodedToken } from "../types/jwt";

import InvalidJWTTokenError from "../errors/InvalidJWTTokenError";
import UserAlreadyVerifiedError from "../errors/UserAlreadyVerified";
import UserDoesNotExistsError from "../errors/UserDoesNotExist";

export default {
  Mutation: {
    verifyUser: async (_: unknown, args: { token: string }) => {
      const dToken = verifyJWT(args.token, "verification");
      if (!dToken) throw new InvalidJWTTokenError("JWT token is invalid.");
      const id = (dToken as decodedToken).id;

      const data = await server.db.user.findFirst({
        where: {
          id,
        },
        select: {
          information: {
            select: {
              verified: true,
            },
          },
        },
      });

      if (!data)
        throw new UserDoesNotExistsError("User does not exist in database.");

      if (data.information.verified)
        throw new UserAlreadyVerifiedError("User is already verified.");

      return (
        await server.db.user.update({
          where: {
            id,
          },
          data: {
            information: {
              update: {
                verified: true,
                reconfirmationNeeded: false,
              },
            },
          },
          select: {
            information: {
              include: {
                User: {
                  include: {
                    records: true,
                    config: true,
                    information: true,
                  },
                },
              },
            },
          },
        })
      ).information;
    },
  },
};
