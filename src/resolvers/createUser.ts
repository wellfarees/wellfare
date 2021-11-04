import UserExistsError from "../errors/UserExists";
import server from "../server";
import { hash } from "bcrypt";
import generateJWT from "../utils/generateJWT";

export default {
  Mutation: {
    createUser: async (
      _: unknown,
      args: {
        name: string;
        email: string;
        password: string;
        darkMode?: boolean;
        reducedMotion?: boolean;
        fontSize?: number;
      }
    ) => {
      const data = await server.db.user.findFirst({
        where: {
          information: {
            email: args.email,
          },
        },
      });

      if (data) throw new UserExistsError("Email already exists in database.");
      else {
        const password = await hash(args.password, 10);

        const userData = await server.db.user.create({
          data: {
            config: {
              create: {
                darkMode: args.darkMode,
                reducedMotion: args.reducedMotion,
                fontSize: args.fontSize,
              },
            },
            information: {
              create: {
                name: args.name,
                email: args.email,
                password,
              },
            },
            affirmations: [],
          },

          include: {
            information: true,
            config: true,
            records: true,
          },
        });

        const jwt = generateJWT({ id: userData.id });
        return { jwt, user: userData };
      }
    },
  },
};
