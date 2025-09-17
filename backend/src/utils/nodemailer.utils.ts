import nodemailer from "nodemailer";
import CustomError from "../middlewares/error-handler.middleware";

//creating transporter:

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: Number(process.env.SMTP_PORT) === 465 ? true : false,
  service: process.env.SMTP_SERVICE,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
});

type mailOption = {
  to: string;
  subject: string;
  html: string;
  cc?: string | string[] | null;
  bcc?: string | string[] | null;
  attachments?: [] | null;
};

export const sendEmail = async ({
  to,
  subject,
  html,
  cc = null,
  bcc = null,
  attachments = null,
}: mailOption) => {
  try {
    console.log(process.env.SMTP_HOST);
    console.log(process.env.SMTP_USER);
    console.log(process.env.SMTP_SERVICE);
    console.log(process.env.SMTP_PORT);
    // Callback style
    transporter.verify((error, success) => {
      if (error) {
        console.error(error);
      } else {
        console.log("Server is ready to take our messages");
      }
    });
    let message: Record<string, any> = {
      from: `MERN Kart <${process.env.SMTP_USER}>`,
      to,
      subject,
      html,
    };

    if (cc) {
      message["cc"] = cc;
    }

    if (bcc) {
      message["bcc"] = bcc;
    }

    if (attachments) {
      message["attachments"] = attachments;
    }

    await transporter.sendMail(message);
  } catch (err) {
    console.log(err);
    throw new CustomError("Error sending email", 500);
  }
};
