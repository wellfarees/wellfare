import { URLSearchParams } from "url";

export default {
  Query: {
    ping: () => {
      const rootUrl = "https://accounts.google.com/o/oauth2/v2/auth";
      const options = {
        redirect_uri: "http://localhost:3000/auth/oauth/google",
        client_id: process.env.GOOGLE_CLIENT_ID,
        access_type: "offline",
        response_type: "code",
        prompt: "consent",
        scope: [
          "https://www.googleapis.com/auth/userinfo.profile",
          "https://www.googleapis.com/auth/userinfo.email",
        ].join(" "),
      };

      const params = new URLSearchParams(options);

      return `${rootUrl}?${params}`;
    },
  },
};
