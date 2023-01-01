import EmailAlreadyExistsError from "../errors/EmailAlreadyExistsError";
import server from "../server";
import differenceInHours from "date-fns/differenceInHours";
import { ApolloError } from "apollo-server-core";
import { sendEmail } from "../utils/email/sendEmail";

export default {
  Mutation: {
    addEmailToNewsletter: async (
      _: unknown,
      args: { email: string },
      headers: { ipv6: string }
    ) => {
      const { ipv6 } = headers;
      const IPUser = await server.db.newsletterIPUsers.findFirst({
        where: {
          ipv6,
        },
      });

      if (!IPUser) {
        await server.db.newsletterIPUsers.create({
          data: {
            ipv6,
            subRecords: [new Date()],
          },
        });
      } else {
        const subsPerIP = IPUser.subRecords.length;
        const rateLimit = parseInt(
          process.env.SUB_RATELIMIT_PER_24HRS as string
        );
        const latestIPSub = IPUser.subRecords[subsPerIP - 1];

        if (subsPerIP >= rateLimit) {
          const lastViableIPSub = IPUser.subRecords[rateLimit - 1];
          if (differenceInHours(lastViableIPSub, latestIPSub) < 24) {
            return new ApolloError(
              "You have reached limit of emails to add to the newsletter for the moment."
            );
          }
        }

        await server.db.newsletterIPUsers.update({
          where: {
            id: IPUser.id,
          },
          data: {
            subRecords: {
              push: new Date(),
            },
          },
        });
      }

      const exists = await server.db.newsletterUser.findFirst({
        where: {
          email: args.email,
        },
      });

      if (exists)
        throw new EmailAlreadyExistsError(
          "Email is already added to newsletter."
        );

      try {
        await server.db.newsletterUser.create({
          data: {
            email: args.email,
          },
        });

        await sendEmail(args.email, { type: "newsletter" });

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
