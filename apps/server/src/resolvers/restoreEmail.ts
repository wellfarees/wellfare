import server from "../server";
import { sendVerificationEmail } from "../utils/email/sendVerificationEmail";

export default {
  Mutation: {
    restoreEmail: async (
      _: unknown,
      args: { email: string; newEmail: string }
    ) => {
      const data = await server.db.user.findFirst({
        where: {
          information: {
            associatedEmail: args.email,
            AND: {
              email: null,
            },
          },
        },
        include: {
          information: true,
        },
      });

      const profileInUse = await server.db.user.findFirst({
        where: {
          information: {
            email: args.newEmail,
          },
        },
      });

      if (!data)
        throw new Error(
          "No suspended user account with this email has been found."
        );

      if (profileInUse)
        throw new Error(
          "The desired email is already in use by another account."
        );

      await sendVerificationEmail(
        args.newEmail,
        data.information.firstName,
        data.id
      );

      return await server.db.user.update({
        where: {
          id: data.id,
        },
        data: {
          information: {
            update: {
              email: args.newEmail,
              associatedEmail: args.newEmail,
              reconfirmationNeeded: true,
            },
          },
        },
        include: {
          information: true,
        },
      });
    },
  },
};
