import UserDoesNotExistsError from "../errors/UserDoesNotExist";
import server from "../server";

export default {
  Query: {
    getUser: async (_: unknown, args: { id: number }) => {
      const data = await server.db.user.findFirst({
        where: {
          id: args.id,
        },
        include: {
          information: true,
          config: true,
          records: true,
        },
      });
      if (!data)
        throw new UserDoesNotExistsError(
          "User does not exist in the database."
        );
      else return data;
    },
  },
};
