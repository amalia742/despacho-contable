import jsPDF from "jspdf";
import "jspdf-autotable";
import * as XLSX from "xlsx";

export const exportarPDF = (clientes) => {
  const doc = new jsPDF();

  doc.setFontSize(14);
  doc.text("DESPACHO CONTABLE XYZ", 14, 15);
  doc.setFontSize(10);
  doc.text("RFC: XAXX010101000", 14, 22);
  doc.text("Reporte de Clientes", 14, 30);

  doc.autoTable({
    startY: 35,
    head: [["Clave", "Nombre", "RFC", "Tipo", "Estado"]],
    body: clientes.map(c => [
      c.clave,
      c.nombre,
      c.rfc,
      c.tipoPersona,
      c.estado
    ])
  });

  doc.save("clientes.pdf");
};

export const exportarExcel = (clientes) => {
  const ws = XLSX.utils.json_to_sheet(clientes);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Clientes");
  XLSX.writeFile(wb, "clientes.xlsx");
};
