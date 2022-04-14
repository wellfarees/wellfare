import server from "../../server";
import verifyJWT from "../../utils/verifyJWT";
import { login } from "../../utils/oauth/login";
import { JwtPayload } from "jsonwebtoken";

export default {
  Query: {
    oAuthLogin: async (
      _: unknown,
      args: { service: "google" | "apple"; token: string }
    ) => {
      // decode the token
      const accessToken = (verifyJWT(args.token, "client") as JwtPayload).id;

      // obtain the actual user information
      const credentials = await login(args.service, accessToken);

      // perform obligotary checks

      // check if user exists with the email
      const possbileUser = server.db.user.findFirst({
        where: {
          information: {
            associatedEmail: credentials.email,
          },
          AND: {
            information: {
              NOT: null,
            },
          },
        },
      });

      if (possbileUser) {
        throw new Error(
          "Email used to sign in is not associated with this authentication method."
        );
      }

      const user = server.db.user.findFirst({
        where: {
          OAuthEmail: credentials.email,
        },
      });

      if (!user) {
        throw new Error(
          "User with the email associated with such login method was not found."
        );
      }

      // return the user if eveything's successful
    },
  },
};
