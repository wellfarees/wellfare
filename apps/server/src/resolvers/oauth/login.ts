import server from "../../server";
import { login } from "../../utils/oauth/login";
import { client } from "../../algolia";
import axios from "axios";
import generateJWT from "../../utils/generateJWT";
import verifyJWT from "../../utils/verifyJWT";
import { JwtPayload } from "jsonwebtoken";
const endpoint = "https://oauth2.googleapis.com/token";
const getGoogleAccessToken = async (code: string): Promise<string> => {
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

    const refresh_token = res.data.refresh_token;
    const refresh_opts = {
      client_id: process.env.GOOGLE_CLIENT_ID,
      client_secret: process.env.GOOGLE_CLIENT_SECRET,
      grant_type: "refresh_token",
      refresh_token: refresh_token,
    };

    const refreshed = await axios.post(
      endpoint,
      new URLSearchParams(refresh_opts),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    return refreshed.data.access_token;
  } catch (e) {
    throw new Error(e.response.data.error);
  }
};

export default {
  Mutation: {
    oAuthLogin: async (
      _: unknown,
      args: {
        service: "google" | "apple";
        token: string;
        type: "code" | "token";
      }
    ) => {
      let pureToken =
        args.type == "code"
          ? await getGoogleAccessToken(args.token)
          : args.token;

      if (args.type == "token") {
        const decoded_refresh = verifyJWT(pureToken, "client") as JwtPayload;
        console.log(decoded_refresh);
        const refresh_opts = {
          client_id: process.env.GOOGLE_CLIENT_ID,
          client_secret: process.env.GOOGLE_CLIENT_SECRET,
          grant_type: "refresh_token",
          refresh_token: decoded_refresh.id,
        };

        const refreshed = await axios.post(
          endpoint,
          new URLSearchParams(refresh_opts),
          {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
          }
        );

        pureToken = refreshed.data.access_token;

        // console.log(pureTokenk);
      }

      // obtain the actual user information
      const credentials = await login(args.service, pureToken);

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

      const encoded_refresh =
        args.type == "code"
          ? generateJWT({ id: pureToken }, "client")
          : args.token;

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
            //TODO: Replace with an actual token
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

        return {
          user: userData,
          publicAlgoliaKey,
          oAuthRefresh: encoded_refresh,
        };
      }

      const publicAlgoliaKey = client.generateSecuredApiKey(
        process.env.ALGOLIA_SEARCH!,
        {
          filters: `visible_by:${user.id}`,
        }
      );

      return { user, publicAlgoliaKey, oAuthRefresh: encoded_refresh };
    },
  },
};
