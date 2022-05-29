import server from "../server";
import verifyJWT from "../utils/verifyJWT";
import { hash } from "bcrypt";
import { login } from "../utils/oauth/login";
import { JwtPayload } from "jsonwebtoken";
import axios from "axios";
import generateJWT from "../utils/generateJWT";
import { sendVerificationEmai } from "../utils/sendVerificationEmail";

export default {
  Mutation: {
    changeToNative: async (
      _: unknown,
      args: {
        email: string | null;
        password: string;
        service: "google" | "apple";
        refresh: string;
      }
    ): Promise<{ token: string; verified: boolean }> => {
      switch (args.service) {
        case "google":
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
            new URLSearchParams(refresh_opts as any),
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

          if (targetUser.OAuthEmail !== args.email && args.email !== null) {
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
              },
            });

            await sendVerificationEmai(
              args.email,
              targetUser.information.firstName,
              targetUser.id
            );
          }

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

          return {
            token: generateJWT({ id: targetUser.id }, "client"),
            verified: finalUser.information.verified,
          };
      }
    },
  },
};
