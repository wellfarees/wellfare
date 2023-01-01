import InvalidJWTTokenError from "../errors/InvalidJWTTokenError";
import UserDoesNotExistsError from "../errors/UserDoesNotExist";
import server from "../server";
import { decodedToken } from "../types/jwt";
import verifyJWT from "../utils/verifyJWT";
import { sendVerificationEmail } from "../utils/email/sendVerificationEmail";

export default {
  Mutation: {
    resendVerificationEmail: async (_: unknown, args: { token: string }) => {
      const dToken = verifyJWT(args.token, "client");
      if (!dToken) throw new InvalidJWTTokenError("JWT token is invalid.");
      const id = (dToken as decodedToken).id;

      const data = await server.db.user.findFirst({
        where: { id },
        select: {
          information: true,
        },
      });

      if (!data)
        throw new UserDoesNotExistsError(
          "User does not exist in the database."
        );

      try {
        await sendVerificationEmail(
          data.information.email,
          data.information.firstName,
          id
        );

        return {
          success: true,
        };
      } catch {
        return {
          success: false,
        };
      }
    },
  },
};
