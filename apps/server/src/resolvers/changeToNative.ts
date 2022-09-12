import server from "../server";
import verifyJWT from "../utils/verifyJWT";
import { hash } from "bcrypt";
import { login } from "../utils/oauth/login";
import { JwtPayload } from "jsonwebtoken";
import axios from "axios";
import generateJWT from "../utils/generateJWT";
import { sendVerificationEmail } from "../utils/sendVerificationEmail";
import { SIGNIN_METHODS } from "../constants";
import { ApolloError } from "apollo-server-core";

export default {
  Mutation: {
    changeToNative: async (
      _: unknown,
      args: {
        email: string | null;
        password: string;
        service: SIGNIN_METHODS;
        refresh: string;
      }
    ) => {
      switch (args.service) {
        case "google": {
          const endpoint = "https://oauth2.googleapis.com/token";
          const decoded_refresh = verifyJWT(
            args.refresh,
            "client"
          ) as JwtPayload;

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

          //Also gotta exchange for the access token!!
          const credentials = await login(
            args.service,
            refreshed.data.access_token
          );

          const targetUser = await server.db.user.findFirst({
            where: {
              OAuthEmail: credentials.email,
            },
            select: {
              id: true,
              OAuthEmail: true,
              information: {
                select: {
                  firstName: true,
                },
              },
            },
          });

          const newPassword = await hash(args.password, 10);

          let isFinallyVerified: boolean;

          if (targetUser.OAuthEmail !== args.email && args.email !== null) {
            if (!args.password) {
              return new ApolloError(
                "Please, provide a new password.",
                "NO_PASSWORD"
              );
            }

            if (args.password.length < 5) {
              return new ApolloError(
                "Your password has to be at least 5 characters long.",
                "INVALID_PASSWORD"
              );
            }
            const possbileUser = await server.db.user.findFirst({
              where: {
                information: {
                  associatedEmail: args.email,
                },
                AND: {
                  OAuthEmail: null,
                },
              },
            });

            if (possbileUser) {
              return new ApolloError("Email already in use.", "EMAIL_IN_USE");
            }
            await server.db.user.update({
              where: {
                id: targetUser.id,
              },
              data: {
                information: {
                  update: {
                    verified: false,
                    email: args.email,
                    associatedEmail: args.email,
                  },
                },
                OAuthEmail: null,
              },
            });

            await sendVerificationEmail(
              args.email,
              targetUser.information.firstName,
              targetUser.id
            );
          } else {
            const finalUser = await server.db.user.update({
              where: {
                id: targetUser.id,
              },
              data: {
                information: {
                  update: {
                    password: newPassword,
                    associatedEmail: targetUser.OAuthEmail,
                  },
                },
                OAuthEmail: null,
              },
              select: {
                information: {
                  select: {
                    verified: true,
                  },
                },
              },
            });

            isFinallyVerified = finalUser.information.verified;
          }

          return {
            token: generateJWT({ id: targetUser.id }, "client"),
            verified: isFinallyVerified,
          };
        }
      }
    },
  },
};
