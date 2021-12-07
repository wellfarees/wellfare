import InvalidJWTTokenError from "../errors/InvalidJWTTokenError";
import UserDoesNotExistsError from "../errors/UserDoesNotExist";
import server from "../server";
import { decodedToken } from "../types/jwt";
import generateJWT from "../utils/generateJWT";
import verifyJWT from "../utils/verifyJWT";
import { CLIENT_URL } from "../endpoints";

export default {
  Mutation: {
    resendVerificationEmail: async (_: unknown, args: { token: string }) => {
      const dToken = verifyJWT(args.token, "client");
      if (!dToken) throw new InvalidJWTTokenError("JWT token is invalid.");
      const id = Number((dToken as decodedToken).id);

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

      const verificationJWT = generateJWT({ id }, "verification");
      const verificationURL = `${CLIENT_URL}auth/verify?token=${verificationJWT}`;

      try {
        await server.mail.send({
          from: process.env.EMAIL_ADDRESS!,
          to: data.information.email,
          subject: "Verify your email",
          html: `Hi ${data.information.firstName}, here's your verification email! <a href="${verificationURL}">Click here</a> to verify your account.
          <br /> <br />
          If you cannot click on the URL, please manually paste this into your browser: ${verificationURL}.
          <br /> <br />
          Thanks,
          <br />
          Wellfare`,
        });

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
