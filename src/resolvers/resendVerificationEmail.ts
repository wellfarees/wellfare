import InvalidJWTTokenError from "../errors/InvalidJWTTokenError";
import NoTokenInHeaderError from "../errors/NoTokenInHeaderError";
import UserDoesNotExistsError from "../errors/UserDoesNotExist";
import server from "../server";
import { decodedToken } from "../types/jwt";
import generateJWT from "../utils/generateJWT";
import verifyJWT from "../utils/verifyJWT";

export default {
  Mutation: {
    resendVerificationEmail: async (
      _: unknown,
      _args: null,
      headers: { token?: string }
    ) => {
      if (!headers.token)
        return new NoTokenInHeaderError(
          "No token was found in the header. Please provide in Authorization header."
        );
      const dToken = verifyJWT(headers.token, "verification");
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
      try {
        await server.mail.send({
          from: process.env.EMAIL_ADDRESS!,
          to: data.information.email,
          subject: "Verify your email",
          html: `Hi ${data.information.firstName}, here's your verification email! <a href="https://wellfare.vercel.app/auth/verify?token=${verificationJWT}">Click here</a> to reset it..
          <br /> <br />
          If you cannot click on the URL, please manually paste this into your browser: https://wellfare.vercel.app/auth/verify?token=${verificationJWT}.
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
