import server from "../server";

import { sendEmail } from "../utils/email/sendEmail";
import generateJWT from "../utils/generateJWT";

import { CLIENT_URL } from "../constants";

import UserDoesNotExistsError from "../errors/UserDoesNotExist";

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
      const verificationURL = `${CLIENT_URL}auth/passwordreset?token=${verificationJWT}`;
      await sendEmail(args.email, { type: "password", link: verificationURL });

      return data;
    },
  },
};
