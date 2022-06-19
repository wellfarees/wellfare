import generateJWT from "./generateJWT";
import { CLIENT_URL } from "../endpoints";
import { sendEmail } from "./sendEmail";

export const sendVerificationEmail = async (
  email: string,
  name: string,
  id: string
): Promise<void> => {
  const verificationJWT = generateJWT({ id }, "verification");
  const verificationURL = `${CLIENT_URL}auth/verify?token=${verificationJWT}`;

  const content = `Hi ${name}, here is your verification email! <a href="${verificationURL}">Click here</a> to verify your account.
          <br /> <br />
          If you cannot click on the URL, please manually paste this into your browser: ${verificationURL}. </br>`;

  await sendEmail(email, content);
};
