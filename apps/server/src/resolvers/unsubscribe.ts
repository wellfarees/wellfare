import server from "../server";

import verifyJWT from "../utils/verifyJWT";

import { JwtPayload } from "jsonwebtoken";

import { ApolloError } from "apollo-server-core";

export default {
  Mutation: {
    unsubscribe: async (_: unknown, args: { encodedEmail: string }) => {
      const email = (verifyJWT(args.encodedEmail, "client") as JwtPayload).id;

      try {
        const subbedUser = await server.db.newsletterUser.findFirst({
          where: {
            email,
          },
        });

        const potentiallyReggedUser = await server.db.user.findFirst({
          where: {
            information: {
              email,
            },
          },
        });

        if (subbedUser) {
          // plain, unregistred user
          await server.db.newsletterUser.delete({
            where: {
              id: subbedUser.id,
            },
          });
        } else if (potentiallyReggedUser) {
          // registed user & email in the user database
          const reggedAndSubbed = await server.db.newsletterUser.findFirst({
            where: {
              relationId: potentiallyReggedUser.id,
            },
          });

          if (reggedAndSubbed) {
            await server.db.newsletterUser.delete({
              where: {
                id: reggedAndSubbed.id,
              },
            });
          }
        } else {
          return new ApolloError(
            `User with email ${email} has not subscribed to the newsletter.`
          );
        }
      } catch (e) {
        console.log(e);
      }

      return {
        email,
      };
    },
  },
};
