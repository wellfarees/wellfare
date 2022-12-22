import generateJWT from "../generateJWT";
import { CLIENT_URL } from "../../endpoints";
import { sendEmail } from "./sendEmail";

export const sendVerificationEmail = async (
  email: string,
  name: string,
  id: string
): Promise<void> => {
  const verificationJWT = generateJWT({ id }, "verification");
  const verificationURL = `${CLIENT_URL}/auth/verify?token=${verificationJWT}`;

  await sendEmail(email, {
    type: "verification",
    link: verificationURL,
    username: name,
  });
};
