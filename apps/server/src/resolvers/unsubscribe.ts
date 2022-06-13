import { ApolloError } from "apollo-server-core";
import { JwtPayload } from "jsonwebtoken";
import verifyJWT from "../utils/verifyJWT";
import server from "../server";

export default {
  Mutation: {
    unsubscribe: async (_: unknown, args: { encodedEmail: string }) => {
      const email = (verifyJWT(args.encodedEmail, "client") as JwtPayload).id;

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

      const reggedAndSubbed = await server.db.newsletterUser.findFirst({
        where: {
          relationId: potentiallyReggedUser.id,
        },
      });

      if (subbedUser) {
        // plain, unregistred user
        await server.db.newsletterUser.delete({
          where: {
            id: subbedUser.id,
          },
        });
      } else if (reggedAndSubbed) {
        // registed user & email in the user database
        await server.db.newsletterUser.delete({
          where: {
            id: reggedAndSubbed.id,
          },
        });
      } else {
        return new ApolloError(
          `User with email ${email} has not subscribed to the newsletter.`
        );
      }

      return {
        email,
      };
    },
  },
};
