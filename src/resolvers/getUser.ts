import server from "../server";

export default {
  Query: {
    getUser: async (_: unknown, args: { id: number }) => {
      return await server.db.user.findFirst({
        where: {
          id: args.id,
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
