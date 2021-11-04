import { hash } from "bcrypt";
import UserDoesNotExistsError from "../errors/UserDoesNotExist";
import server from "../server";
import generateJWT from "../utils/generateJWT";

export default {
  Query: {
    login: async (_: unknown, args: { email: string; password: string }) => {
      const userData = await server.db.user.findFirst({
        where: {
          information: {
            email: args.email,
            password: await hash(args.password, 10),
          },
        },
      });

      if (!userData)
        throw new UserDoesNotExistsError(
          "User does not exist in the database."
        );
      else
        return generateJWT({
          id: userData.id,
        });
    },
  },
};
