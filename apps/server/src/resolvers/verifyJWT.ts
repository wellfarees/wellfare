import verifyJWT from "../utils/verifyJWT";

export default {
  Query: {
    verifyJWT: async (
      _: unknown,
      args: { token: string; type: "verification" | "client" | "password" }
    ) => {
      const res = verifyJWT(args.token, args.type);

      return {
        success: res !== null,
      };
    },
  },
};
