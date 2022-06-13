import server from "../server";
import generateJWT from "./generateJWT";
import { CLIENT_URL } from "../endpoints";

export const sendEmail = async (email: string, body: string): Promise<void> => {
  const encodedEmail = generateJWT({ id: email }, "client");
  const unsubEmail = `${CLIENT_URL}/auth/unsub?token=${encodedEmail}`;

  const footerHTML = `If you no longer want to receive advertising email from us, click on <a href="${unsubEmail}">${unsubEmail}</a>`;
  const content = `
    ${body}
    Thanks, Wellfare
    </hr>
    ${footerHTML}
  `;

  await server.mail.send({
    from: process.env.EMAIL_ADDRESS!,
    to: email,
    subject: "Verify your email",
    html: content,
  });
};
