import nodemailer from "nodemailer";
import hbs from "nodemailer-express-handlebars";
import path from "path";

interface ISendMailForgotPasswordData {
  token: string;
  email: string;
}

const transporter = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  secure: false,
  auth: {
    user: "0bb400a0b90f7f",
    pass: "9529d5019b6a44",
  },
});

transporter.use(
  "compile",
  hbs({
    viewEngine: {
      defaultLayout: undefined,
      partialsDir: path.resolve("./src/utils/mail"),
    },
    viewPath: path.resolve("./src/utils/mail"),
    extName: ".html",
  })
);

async function sendMailForgotPassword({
  email,
  token,
}: ISendMailForgotPasswordData) {
  await transporter.sendMail({
    from: "DT Money | Forgot Password",
    to: email,
    subject: "Forgot Password",
    template: "forgotPassword",
    context: { token },
  });
}

export { sendMailForgotPassword };
