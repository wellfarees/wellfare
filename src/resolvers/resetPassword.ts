import UserDoesNotExistsError from "../errors/UserDoesNotExist";
import server from "../server";
import generateJWT from "../utils/generateJWT";
import { CLIENT_URL } from "../endpoints";

export default {
  Mutation: {
    resetPassword: async (_: unknown, args: { email: string }) => {
      const data = await server.db.user.findFirst({
        where: {
          information: {
            email: args.email,
          },
        },
        include: { config: true, information: true, records: true },
      });

      if (!data)
        throw new UserDoesNotExistsError(
          "User does not exist in the database."
        );

      const verificationJWT = generateJWT({ id: data.id }, "password");
      const verificationURL = `${CLIENT_URL}passwordreset?token=${verificationJWT}`;
      try {
        await server.mail.send({
          from: process.env.EMAIL_ADDRESS!,
          to: data.information.email,
          subject: "Verify your email",
          html: `Hi ${data.information.firstName}, here's your password reset link! <a href='${verificationURL}'>Click here</a> to reset your password.
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
