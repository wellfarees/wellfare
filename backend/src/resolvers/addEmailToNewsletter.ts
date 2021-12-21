import EmailAlreadyExistsError from "../errors/EmailAlreadyExistsError";
import server from "../server";

export default {
  Mutation: {
    addEmailToNewsletter: async (_: unknown, args: { email: string }) => {
      const exists = await server.db.newsletter.findFirst({
        where: {
          email: args.email,
        },
      });
      if (exists)
        throw new EmailAlreadyExistsError(
          "Email is already added to newsletter."
        );

      try {
        await server.db.newsletter.create({
          data: {
            email: args.email,
          },
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
