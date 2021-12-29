import server from "../server";
import generateJWT from "./generateJWT";
import { CLIENT_URL } from "../endpoints";

export const sendVerificationEmai = async (
  email: string,
  name: string,
  id: number
): Promise<void> => {
  const verificationJWT = generateJWT({ id }, "verification");
  const verificationURL = `${CLIENT_URL}auth/verify?token=${verificationJWT}`;

  await server.mail.send({
    from: process.env.EMAIL_ADDRESS!,
    to: email,
    subject: "Verify your email",
    html: `Hi ${name}, here's your verification email! <a href="${verificationURL}">Click here</a> to verify your account.
          <br /> <br />
          If you cannot click on the URL, please manually paste this into your browser: ${verificationURL}.
          <br /> <br />
          Thanks,
          <br />
          Wellfare`,
  });
};
