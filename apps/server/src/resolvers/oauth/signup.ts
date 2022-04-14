// import verifyJWT from "../../utils/verifyJWT";

export default {
  Mutation: {
    oAuthSignup: async (
      _: unknown,
      args: { service: "google" | "apple"; token: string }
    ) => {
      // if already registred - use the LOGIN function
      // else call oauth SIGNUP function
      // return the user
    },
  },
};
