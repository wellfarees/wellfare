import server from "../server";
import { hash } from "bcrypt";

import { client } from "../algolia";
import { sendVerificationEmail } from "../utils/email/sendVerificationEmail";
import { addToNewsletter } from "../utils/addToNewsletter";
import generateJWT from "../utils/generateJWT";

import UserExistsError from "../errors/UserExists";
import IsNotFullNameError from "../errors/IsNotFullName";

export default {
  Mutation: {
    createUser: async (
      _: unknown,
      args: {
        name: string;
        email: string;
        password: string;
      }
    ) => {
      const data = await server.db.user.findFirst({
        where: {
          information: {
            email: args.email,
          },
        },
      });

      if (data) throw new UserExistsError("Email already exists in database.");
      else {
        const nameArray = args.name.split(" ");
        if (!nameArray[1])
          throw new IsNotFullNameError("Name provided is not a full name.");
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        const lastName = nameArray.pop()!;
        const firstName = nameArray.join(" ");
        const password = await hash(args.password, 10);

        const userData = await server.db.user.create({
          data: {
            information: {
              create: {
                lastName,
                firstName,
                email: args.email,
                associatedEmail: args.email,
                password,
                emailsUsed: {
                  create: {
                    address: args.email,
                    set: new Date(),
                  },
                },
              },
            },
            config: {
              create: {},
            },
            recaps: undefined,
          },
          include: {
            information: true,
            config: true,
            records: true,
            recaps: true,
          },
        });

        // adding to newsletter
        addToNewsletter(userData.information.email as string, userData.id);

        const publicAlgoliaKey = client.generateSecuredApiKey(
          process.env.ALGOLIA_SEARCH!,
          {
            filters: `visible_by=${userData.id}`,
          }
        );

        const jwt = generateJWT({ id: userData.id }, "client");

        await sendVerificationEmail(
          userData.information.email as string,
          userData.information.firstName,
          userData.id
        );

        return { jwt, user: userData, publicAlgoliaKey };
      }
    },
  },
};
