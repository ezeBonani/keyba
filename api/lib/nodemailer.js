import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true, // Use `true` for port 465, `false` for all other ports
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS,
  },
});

transporter.verify().then(() => {
  console.log("Listo para mandar correos");
});

export default transporter;
