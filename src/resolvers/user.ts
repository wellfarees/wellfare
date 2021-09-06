import server from "../server";

export default {
  Query: {
    user: async (token: string) => {
      return await server.db.account.findFirst({
        where: {
          accessToken: token,
        },
      });
    },
  },
};
