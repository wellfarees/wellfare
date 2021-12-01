import InvalidJWTTokenError from "../errors/InvalidJWTTokenError";
import UserAlreadyVerifiedError from "../errors/UserAlreadyVerified";
import UserDoesNotExistsError from "../errors/UserDoesNotExist";
import server from "../server";
import { decodedToken } from "../types/jwt";
import verifyJWT from "../utils/verifyJWT";

export default {
  Mutation: {
    verifyUser: async (_: unknown, args: { token: string }) => {
      const dToken = verifyJWT(args.token, "verification");
      if (!dToken) throw new InvalidJWTTokenError("JWT token is invalid.");
      const id = Number((dToken as decodedToken).id);

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
