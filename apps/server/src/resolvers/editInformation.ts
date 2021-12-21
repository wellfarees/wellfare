import { hash, compare } from "bcrypt";
import InvalidJWTTokenError from "../errors/InvalidJWTTokenError";
import NoTokenInHeaderError from "../errors/NoTokenInHeaderError";
import UserDoesNotExistsError from "../errors/UserDoesNotExist";
import WrongPasswordError from "../errors/WrongPasswordError";
import server from "../server";
import { decodedToken } from "../types/jwt";
import verifyJWT from "../utils/verifyJWT";

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
        emailLastUpdated?: Date;
      } = {};
      if (args.firstName) updateData.firstName = args.firstName;
      if (args.lastName) updateData.lastName = args.lastName;
      if (args.email) {
        updateData.email = args.email;
        updateData.emailLastUpdated = new Date();
      }
      if (args.changePassword)
        updateData.password = await hash(args.changePassword.new, 10);
      if (args.pfp) updateData.email = args.pfp;

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
            },
          },
        },
      });

      if (!data)
        throw new UserDoesNotExistsError("User does not exist in database.");

      if (args.changePassword) {
        const passwordsMatch = await compare(
          args.changePassword.current,
          data.information.password
        );

        if (!passwordsMatch)
          throw new WrongPasswordError("Current password is incorrect.");
      }

      return (
        await server.db.user.update({
          where: {
            id,
          },
          data: {
            information: {
              update: updateData,
            },
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