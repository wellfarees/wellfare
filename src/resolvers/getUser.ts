import server from "../server";

export default {
  Query: {
    getUser: async (_: any, args: { email: string }) => {
      return await server.db.user.findFirst({
        where: {
          information: {
            email: args.email,
          },
        },
        include: {
          information: true,
          config: true,
          records: true,
        },
      });
    },
  },
};
