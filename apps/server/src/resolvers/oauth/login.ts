import server from "../../server";
import { login } from "../../utils/oauth/login";
import { client } from "../../algolia";
import axios from "axios";
import generateJWT from "../../utils/generateJWT";
import verifyJWT from "../../utils/verifyJWT";
import { JwtPayload } from "jsonwebtoken";
import { ApolloError } from "apollo-server-core";
import { SIGNIN_METHODS } from "../../constants";
import { addToNewsletter } from "../../utils/addToNewsletter";
import { CLIENT_URL } from "../../endpoints";
import { decryptSensitiveData } from "../../utils/decryptSensitiveData";

const endpoint = "https://oauth2.googleapis.com/token";
const getGoogleTokens = async (code: string): Promise<[string, string]> => {
  const opts = {
    grant_type: "authorization_code",
    code: code,
    client_id: process.env.GOOGLE_CLIENT_ID,
    client_secret: process.env.GOOGLE_CLIENT_SECRET,
    redirect_uri: `${CLIENT_URL}/auth/oauth/google`,
  };

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

  return [refresh_token, refreshed.data.access_token];
};

export default {
  Mutation: {
    oAuthLogin: async (
      _: unknown,
      args: {
        service: SIGNIN_METHODS;
        token: string;
        type: "code" | "token";
      }
    ) => {
      try {
        // TODO: only have values of these google tokens when first authorize (afterwards it just messes it up since its encoded refrsh token)
        const initialGoogleTokens =
          args.type == "code"
            ? await getGoogleTokens(args.token)
            : [null, null];
        const initialRefreshToken =
          args.type == "code" ? initialGoogleTokens[0] : args.token;

        let [pureRefreshToken, pureAccessToken] = initialGoogleTokens;

        if (args.type == "token") {
          const decoded = verifyJWT(
            initialRefreshToken,
            "client"
          ) as JwtPayload;
          pureRefreshToken = decoded.id;

          const refresh_opts = {
            client_id: process.env.GOOGLE_CLIENT_ID,
            client_secret: process.env.GOOGLE_CLIENT_SECRET,
            grant_type: "refresh_token",
            refresh_token: pureRefreshToken,
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

          pureAccessToken = refreshed.data.access_token;
        }

        // obtain the actual user information
        const credentials = await login(args.service, pureAccessToken);

        // perform obligotary checks
        // check if user exists with the email
        const possbileUser = await server.db.user.findFirst({
          where: {
            information: {
              associatedEmail: credentials.email,
            },
            AND: {
              OAuthEmail: null,
            },
          },
        });

        if (possbileUser) {
          return new ApolloError(
            "Email used to sign in is not associated with this authentication method.",
            "EMAIL_IN_USE"
          );
        }

        const user = await server.db.user.findFirst({
          where: {
            OAuthEmail: credentials.email,
          },
          include: {
            information: true,
            config: true,
            encryptedAffirmations: true,
            records: {
              include: {
                feelings: true,
                gratefulness: true,
                unease: true,
              },
            },
          },
        });

        const encoded_refresh =
          args.type == "code"
            ? generateJWT({ id: pureRefreshToken }, "client")
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
            },

            include: {
              information: true,
              config: true,
              records: {
                include: {
                  feelings: true,
                  gratefulness: true,
                  unease: true,
                },
              },
              encryptedAffirmations: true,
            },
          });

          // adding to newsletter
          addToNewsletter(userData.information.email, userData.id);

          const publicAlgoliaKey = client.generateSecuredApiKey(
            process.env.ALGOLIA_SEARCH!,
            {
              filters: `visible_by:${userData.id}`,
            }
          );

          return {
            user: await decryptSensitiveData(userData),
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

        return {
          user: await decryptSensitiveData(user),
          publicAlgoliaKey,
          oAuthRefresh: encoded_refresh,
        };
      } catch (e) {
        console.log(e);
        return new ApolloError("oAuth failed", "INVALID_OAUTH");
      }
    },
  },
};
