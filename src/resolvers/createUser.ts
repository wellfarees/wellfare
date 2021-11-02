import UserExistsError from "../errors/UserExists";
import server from "../server";

export default {
  Mutation: {
    createUser: async (
      _: any,
      args: {
        name: string;
        email: string;
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
        return await server.db.user.create({
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
      }
    },
  },
};
