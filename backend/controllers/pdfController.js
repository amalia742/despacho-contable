const PDFDocument = require("pdfkit");
const { Cliente } = require("../models");

exports.clientesPDF = async (req, res) => {
  const clientes = await Cliente.findAll();

  const doc = new PDFDocument();
  res.setHeader("Content-Type", "application/pdf");
  res.setHeader("Content-Disposition", "inline; filename=clientes.pdf");

  doc.pipe(res);

  doc.fontSize(18).text("DESPACHO CONTABLE", { align: "center" });
  doc.moveDown();

  clientes.forEach((c) => {
    doc.fontSize(12).text(
      `${c.nombre} ${c.apellidos} - ${c.correo} - ${c.telefono}`
    );
  });

  doc.end();
};
