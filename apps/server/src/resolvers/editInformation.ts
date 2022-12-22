import { hash, compare } from "bcrypt";
import InvalidJWTTokenError from "../errors/InvalidJWTTokenError";
import NoTokenInHeaderError from "../errors/NoTokenInHeaderError";
import UserDoesNotExistsError from "../errors/UserDoesNotExist";
import WrongPasswordError from "../errors/WrongPasswordError";
import server from "../server";
import { decodedToken } from "../types/jwt";
import verifyJWT from "../utils/verifyJWT";
import { sendVerificationEmail } from "../utils/email/sendVerificationEmail";
import { countRecentEmailsChanged } from "../utils/countRecentEmailsChanged";
import { getDeprecatedIds } from "../utils/getDeprecatedIds";

const EMAIL_RATE_LIMIT = parseInt(process.env.EMAIL_RATELIMIT_PER_24HRS!);

export default {
  Mutation: {
    editInformation: async (
      _: unknown,
      args: {
        firstName?: string;
        lastName?: string;
        email?: string;
        changePassword?: { current: string; new: string };
        pfp?: string;
      },
      headers: { token?: string }
    ) => {
      if (!headers.token)
        return new NoTokenInHeaderError(
          "No token was found in the header. Please provide in Authorization header."
        );
      const updateData: {
        firstName?: string;
        lastName?: string;
        email?: string;
        password?: string;
        pfp?: string;
      } = {};
      if (args.firstName) updateData.firstName = args.firstName;
      if (args.lastName) updateData.lastName = args.lastName;
      if (args.pfp) updateData.pfp = args.pfp;

      const dToken = verifyJWT(headers.token, "client");
      if (!dToken) throw new InvalidJWTTokenError("JWT token is invalid.");
      const id = (dToken as decodedToken).id;

      const data = await server.db.user.findFirst({
        where: {
          id,
        },
        select: {
          information: {
            select: {
              password: true,
              email: true,
              emailsUsed: true,
              verified: true,
            },
          },
          emailLastUpdated: true,
        },
      });

      const inUse = await server.db.user.findFirst({
        where: {
          information: {
            associatedEmail: args.email,
          },
          AND: {
            NOT: {
              id,
            },
          },
        },
      });

      if (inUse !== null) {
        throw new Error("Email already in use.");
      }

      const currentEmailsUsed = data.information.emailsUsed;
      const recentEmailsChanged = countRecentEmailsChanged(currentEmailsUsed);

      if (
        recentEmailsChanged >= EMAIL_RATE_LIMIT &&
        args.email !== data.information.email
      ) {
        throw new Error(
          "Too many emails have been changed in the past 24 hours."
        );
      }

      const deprecatedIds = getDeprecatedIds(currentEmailsUsed);

      const currentEmail = args.email && data.information.email;

      const emailLastUpdated =
        currentEmail === data.information.email
          ? data.emailLastUpdated
          : new Date();

      updateData.email = args.email;

      if (!data)
        throw new UserDoesNotExistsError("User does not exist in database.");

      if (!args.changePassword) updateData.password = data.information.password;

      if (args.changePassword) {
        const passwordsMatch = await compare(
          args.changePassword.current,
          data.information.password
        );

        if (!passwordsMatch)
          throw new WrongPasswordError("Current password is incorrect.");

        updateData.password = await hash(args.changePassword.new, 10);
      }

      if (updateData.email !== data.information.email) {
        await sendVerificationEmail(updateData.email, updateData.firstName, id);
      }

      return (
        await server.db.user.update({
          where: {
            id,
          },
          data: {
            information: {
              update: {
                ...updateData,
                verified:
                  args.email === data.information.email
                    ? data.information.verified
                    : false,
                emailsUsed:
                  args.email == data.information.email || inUse !== null
                    ? {
                        deleteMany: {
                          id: {
                            in: deprecatedIds,
                          },
                        },
                      }
                    : {
                        create: {
                          address: args.email,
                          set: new Date(),
                        },
                        deleteMany: {
                          id: {
                            in: deprecatedIds,
                          },
                        },
                      },
              },
            },
            emailLastUpdated,
          },
          select: {
            information: {
              include: {
                User: {
                  include: {
                    records: true,
                    config: true,
                    information: true,
                  },
                },
              },
            },
          },
        })
      ).information;
    },
  },
};
