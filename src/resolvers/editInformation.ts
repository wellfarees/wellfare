import { hash } from "bcrypt";
import InvalidJWTTokenError from "../errors/InvalidJWTTokenError";
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
        token: string;
        firstName?: string;
        lastName?: string;
        email?: string;
        changePassword?: { current: string; new: string };
      }
    ) => {
      const updateData: {
        firstName?: string;
        lastName?: string;
        email?: string;
        password?: string;
      } = {};
      if (args.firstName) updateData.firstName = args.firstName;
      if (args.lastName) updateData.lastName = args.lastName;
      if (args.email) updateData.email = args.email;
      if (args.changePassword)
        updateData.password = await hash(args.changePassword.new, 10);

      const dToken = verifyJWT(args.token, "client");
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
        if (data.information.password !== args.changePassword.current)
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
