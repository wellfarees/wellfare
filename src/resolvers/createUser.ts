import UserExistsError from "../errors/UserExists";
import server from "../server";
import { hash } from "bcrypt";
import { sign } from "jsonwebtoken";

export default {
  Mutation: {
    createUser: async (
      _: unknown,
      args: {
        name: string;
        email: string;
        password?: string;
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
              },
            },
          },

          include: {
            information: true,
            config: true,
            records: true,
          },
        });

        const jwt = sign({ id: userData.id }, process.env.JWT_SECRET_KEY!);
        if (!args.password) return { jwt, user: userData };
        else {
          const password = await hash(args.password, 10);
          const updatedData = await server.db.user.update({
            where: {
              id: userData.id,
            },
            data: {
              information: {
                update: {
                  password,
                },
              },
            },
            include: {
              information: true,
              config: true,
              records: true,
            },
          });

          return { jwt, user: updatedData };
        }
      }
    },
  },
};
