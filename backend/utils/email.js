const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const enviarCorreo = async ({ to, subject, html }) => {
  await transporter.sendMail({
    from: `"Despacho Contable" <${process.env.EMAIL_USER}>`,
    to,
    subject,
    html,
  });
};

module.exports = { enviarCorreo };
