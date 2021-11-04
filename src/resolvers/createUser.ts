import UserExistsError from "../errors/UserExists";
import server from "../server";
import { hash } from "bcrypt";
import generateJWT from "../utils/generateJWT";
import IsNotFullNameError from "../errors/IsNotFullName";

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
        const nameArray = args.name.split(" ");
        if (!nameArray[1])
          throw new IsNotFullNameError("Name provided is not a full name.");
        const lastName = nameArray.pop()!;
        const firstName = nameArray.join(" ");
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
                lastName,
                firstName,
                email: args.email,
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

        const jwt = generateJWT({ id: userData.id });
        return { jwt, user: userData };
      }
    },
  },
};
