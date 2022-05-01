import server from "../../server";
import verifyJWT from "../../utils/verifyJWT";
import { login } from "../../utils/oauth/login";
import { JwtPayload } from "jsonwebtoken";
import { client } from "../../algolia";

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
      const possbileUser = await server.db.user.findFirst({
        where: {
          information: {
            associatedEmail: credentials.email,
          },
          AND: {
            information: {
              isNot: null,
            },
          },
        },
      });

      if (possbileUser) {
        throw new Error(
          "Email used to sign in is not associated with this authentication method."
        );
      }

      const user = await server.db.user.findFirst({
        where: {
          OAuthEmail: credentials.email,
        },
        include: {
          information: true,
          config: true,
        },
      });

      console.log(user);

      if (!user) {
        const userData = await server.db.user.create({
          data: {
            information: {
              create: {
                lastName: credentials.lastName,
                firstName: credentials.firstName,
                email: credentials.email,
                associatedEmail: null,
                verified: true,
                pfp: credentials.pfp,
              },
            },
            OAuthEmail: credentials.email,
            config: {
              create: {
                darkMode: false,
                fontSize: 14,
                reducedMotion: false,
              },
            },
            recaps: undefined,
          },

          include: {
            information: true,
            config: true,
            records: true,
          },
        });

        const publicAlgoliaKey = client.generateSecuredApiKey(
          process.env.ALGOLIA_SEARCH!,
          {
            filters: `visible_by:${userData.id}`,
          }
        );

        return { user: userData, publicAlgoliaKey };
      }

      const publicAlgoliaKey = client.generateSecuredApiKey(
        process.env.ALGOLIA_SEARCH!,
        {
          filters: `visible_by:${user.id}`,
        }
      );

      return { user, publicAlgoliaKey };
    },
  },
};
