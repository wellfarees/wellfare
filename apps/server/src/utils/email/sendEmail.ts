import server from "../../server";

import generateJWT from "../generateJWT";
import { inline } from "css-inline";

import { CLIENT_URL } from "../../constants";
import { welcomeEmail, newsletterEmail, resetPasswordEmail } from "./templates";

interface EmailOptions {
  type: "verification" | "newsletter" | "password";
  username?: string;
  link?: string;
}

export const sendEmail = async (
  email: string,
  options: EmailOptions
): Promise<void> => {
  const encodedEmail = generateJWT({ id: email }, "client");
  const unsubEmail = `${CLIENT_URL}/auth/unsub?token=${encodedEmail}`;

  const { type, username, link } = options;

  let content = "";
  let subject = "";

  switch (type) {
    case "verification":
      if (!username || !link) {
        throw new Error(
          "All necessary information not provided, the email has not been sent."
        );
      }

      content = welcomeEmail(username, link, unsubEmail);
      subject = "Verify your email";
      break;
    case "newsletter":
      content = newsletterEmail(unsubEmail);
      subject = "You have been added to Wellfare newsletter.";
      break;
    case "password":
      if (!link) {
        throw new Error(
          "All necessary information not provided, the email has not been sent."
        );
      }

      content = resetPasswordEmail(email, link, unsubEmail);
      subject = "Password reset";
  }

  await server.mail.send({
    from: process.env.EMAIL_ADDRESS!,
    to: email,
    subject,
    html: inline(content, {
      remove_style_tags: true,
    }),
  });
};
