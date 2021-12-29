import UserExistsError from "../errors/UserExists";
import server from "../server";
import { hash } from "bcrypt";
import generateJWT from "../utils/generateJWT";
import IsNotFullNameError from "../errors/IsNotFullName";
import { client } from "../algolia";
import { sendVerificationEmai } from "../utils/sendVerificationEmail";

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
          },
        });

        const publicAlgoliaKey = client.generateSecuredApiKey(
          process.env.ALGOLIA_SEARCH!,
          {
            filters: `visible_by=${userData.id}`,
          }
        );

        const jwt = generateJWT({ id: userData.id }, "client");
        await sendVerificationEmai(
          userData.information.email,
          userData.information.firstName,
          userData.id
        );

        return { jwt, user: userData, publicAlgoliaKey };
      }
    },
  },
};
