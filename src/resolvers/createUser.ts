import UserExistsError from "../errors/UserExists";
import server from "../server";
import { hash } from "bcrypt";
import generateJWT from "../utils/generateJWT";
import IsNotFullNameError from "../errors/IsNotFullName";
import generateVerificationJWT from "../utils/generateVerificationJWT";

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

        const jwt = generateJWT({ id: userData.id });
        const verificationJWT = generateVerificationJWT({ id: userData.id });
        server.mail.send({
          from: process.env.EMAIL_ADDRESS!,
          to: args.email,
          subject: "Verify your email",
          html: `Hi ${firstName}, thanks for signing up for Wellfare! Click here to start using Wellfare.
          <br /> <br />
          If you cannot click on the URL, please manually paste this into your browser: https://wellfare.vercel.app/verify?token=${verificationJWT}.
          <br /> <br />
          Thanks,
          <br />
          Wellfare`,
        });
        return { jwt, user: userData };
      }
    },
  },
};
