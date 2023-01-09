import server from "../server";
import verifyJWT from "../utils/verifyJWT";
import { decodedToken } from "../types/jwt";
import { hash } from "bcrypt";
import { decryptSensitiveData } from "../utils/decryptSensitiveData";

export default {
  Mutation: {
    changePassword: async (
      _: unknown,
      args: { jwt: string; password: string }
    ) => {
      const dToken = verifyJWT(args.jwt, "password");

      const id = (dToken as decodedToken).id;
      const newPassword = await hash(args.password, 10);
      const user = await server.db.user.update({
        where: {
          id,
        },
        data: {
          information: {
            update: {
              password: newPassword,
            },
          },
        },
      });

      return await decryptSensitiveData(user);
    },
  },
};
