import { compare } from "bcrypt";
import UserDoesNotExistsError from "../errors/UserDoesNotExist";
import WrongPasswordError from "../errors/WrongPasswordError";
import server from "../server";
import generateJWT from "../utils/generateJWT";
import { client } from "../algolia";

export default {
  Query: {
    login: async (_: unknown, args: { email: string; password: string }) => {
      const userData = await server.db.user.findFirst({
        where: {
          information: {
            associatedEmail: args.email,
          },
        },
        include: {
          config: true,
          information: true,
          records: true,
        },
      });

      if (!userData)
        throw new UserDoesNotExistsError(
          "User does not exist in the database."
        );

      if (userData.information.reconfirmationNeeded)
        throw new Error("Confirm your current email before signing in.");

      if (!userData.information.email) throw new Error("Account suspended.");

      if (!(await compare(args.password, userData.information.password)))
        throw new WrongPasswordError("Wrong password.");

      const publicAlgoliaKey = client.generateSecuredApiKey(
        process.env.ALGOLIA_SEARCH!,
        {
          filters: `visible_by:"${userData.id}"`,
        }
      );

      return {
        jwt: generateJWT(
          {
            id: userData.id,
          },
          "client"
        ),
        user: userData,
        publicAlgoliaKey,
      };
    },
  },
};
