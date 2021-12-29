import { hash, compare } from "bcrypt";
import InvalidJWTTokenError from "../errors/InvalidJWTTokenError";
import NoTokenInHeaderError from "../errors/NoTokenInHeaderError";
import UserDoesNotExistsError from "../errors/UserDoesNotExist";
import WrongPasswordError from "../errors/WrongPasswordError";
import server from "../server";
import { decodedToken } from "../types/jwt";
import verifyJWT from "../utils/verifyJWT";
import { sendVerificationEmai } from "../utils/sendVerificationEmail";

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
      const id = Number((dToken as decodedToken).id);

      const data = await server.db.user.findFirst({
        where: {
          id,
        },
        select: {
          information: {
            select: {
              password: true,
              email: true,
            },
          },
          emailLastUpdated: true,
        },
      });

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
        await sendVerificationEmai(updateData.email, updateData.firstName, id);
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
                verified: updateData.email === data.information.email,
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
