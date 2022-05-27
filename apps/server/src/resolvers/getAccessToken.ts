// import axios from "axios";
// import { URLSearchParams } from "url";
// import generateJWT from "../utils/generateJWT";
// import { login } from "../utils/oauth/login";
// import server from "../server";

export default {
  Query: {
    getAccessToken: async (
      _: unknown,
      args: { code: string; service: "apple" | "google" }
    ) => {},
  },
};
