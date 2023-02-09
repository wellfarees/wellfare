import generateJWT from "../generateJWT";

import { sendEmail } from "./sendEmail";

import { CLIENT_URL } from "../../constants";

export const sendVerificationEmail = async (
  email: string,
  name: string,
  id: string
): Promise<void> => {
  const verificationJWT = generateJWT({ id }, "verification");
  const verificationURL = `${CLIENT_URL}/auth/verify?token=${verificationJWT}`;
  try {
    await sendEmail(email, {
      type: "verification",
      link: verificationURL,
      username: name,
    });
  } catch (e) {
    console.log(e);
  }
};
