import UserExistsError from "../errors/UserExists";
import server from "../server";
import { hash } from "bcrypt";
import generateJWT from "../utils/generateJWT";
import IsNotFullNameError from "../errors/IsNotFullName";
import { CLIENT_URL } from "../endpoints";
import { client } from "../algolia";

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
                password,
              },
            },
            config: {
              create: {},
            },
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
        const verificationJWT = generateJWT(
          { id: userData.id },
          "verification"
        );
        const verificationURL = `${CLIENT_URL}auth/verify?token=${verificationJWT}`;

        server.mail.send({
          from: process.env.EMAIL_ADDRESS!,
          to: args.email,
          subject: "Verify your email",
          html: `Hi ${firstName}, thanks for signing up for Wellfare! <a href="${verificationURL}">Click here</a> to start using Wellfare.
          <br /> <br />
          If you cannot click on the URL, please manually paste this into your browser: ${verificationURL}.
          <br /> <br />
          Thanks,
          <br />
          Wellfare`,
        });
        return { jwt, user: userData, publicAlgoliaKey };
      }
    },
  },
};
