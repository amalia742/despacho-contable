const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "pabloamalia053@gmail.com",
    pass: "AEIOU123"
  },
});

async function enviarCorreo(destinatario, asunto, mensajeHTML) {
  try {
    await transporter.sendMail({
      from: '"Despacho Contable" <pabloamalia053@gmail.com>',
      to: destinatario,
      subject: asunto,
      html: mensajeHTML,
    });
  } catch (err) {
    console.error("❌ Error al enviar correo:", err);
  }
}

module.exports = enviarCorreo;
