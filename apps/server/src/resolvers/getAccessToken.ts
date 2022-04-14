import axios from "axios";
import { URLSearchParams } from "url";
import generateJWT from "../utils/generateJWT";

export default {
  Query: {
    getAccessToken: async (
      _: unknown,
      args: { code: string; service: "apple" | "google" }
    ) => {
      const getGoogleAccessToken = async (code: string): Promise<string> => {
        const endpoint = "https://oauth2.googleapis.com/token";
        const opts = {
          grant_type: "authorization_code",
          code: code,
          client_id: process.env.GOOGLE_CLIENT_ID,
          client_secret: process.env.GOOGLE_CLIENT_SECRET,
          redirect_uri: "http://localhost:3000/auth/oauth/google",
        };

        try {
          const res = await axios.post(endpoint, new URLSearchParams(opts), {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
          });

          const token = res.data.access_token;
          return generateJWT({ id: token as string }, "client");
        } catch (e) {
          throw new Error(e.response.data.error);
        }
      };

      switch (args.service) {
        case "google":
          return {
            token: getGoogleAccessToken(args.code),
          };
      }
    },
  },
};
