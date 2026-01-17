import nodemailer from "nodemailer";
import { env } from "@config/env";

type EmailOptions = {
  to: string;
  subject: string;
  html: string;
};

export const sendEmail = async ({ to, subject, html }: EmailOptions) => {
  const transporter = nodemailer.createTransport({
    host: env.SMTP_HOST,
    port: Number(env.SMTP_PORT),
    auth: {
      user: env.SMTP_USER,
      pass: env.SMTP_PASS,
    },
  });

  await transporter.sendMail({
    from: `"Student LMS" <${env.SMTP_USER}>`,
    to,
    subject,
    html,
  });
};
