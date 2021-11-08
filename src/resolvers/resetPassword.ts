import UserDoesNotExistsError from "../errors/UserDoesNotExist";
import server from "../server";
import generateJWT from "../utils/generateJWT";

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
      try {
        await server.mail.send({
          from: process.env.EMAIL_ADDRESS!,
          to: data.information.email,
          subject: "Verify your email",
          html: `Hi ${data.information.firstName}, here's your password reset link! <a href="https://wellfare.vercel.app/resetpassword?token=${verificationJWT}">Click here</a> to start using Wellfare.
            <br /> <br />
            If you cannot click on the URL, please manually paste this into your browser: https://wellfare.vercel.app/resetpassword?token=${verificationJWT}.
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
