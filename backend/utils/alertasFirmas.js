const { Firma, Cliente } = require("../models");
const { Op } = require("sequelize");

module.exports = async function alertasFirmas() {
  try {
    const hoy = new Date();

    // 1 mes antes
    const alertaFecha = new Date();
    alertaFecha.setDate(alertaFecha.getDate() + 30);

    const firmas = await Firma.findAll({
      include: [{ model: Cliente }],
    });

    for (const firma of firmas) {
      const inicio = new Date(firma.fecha_inicio);

      // 📌 Vigencia SAT = 4 años
      const vencimiento = new Date(inicio);
      vencimiento.setFullYear(vencimiento.getFullYear() + 4);

      let nuevoEstado = "Vigente";

      if (vencimiento < hoy) {
        nuevoEstado = "Vencida";
      } else if (vencimiento <= alertaFecha) {
        nuevoEstado = "Por vencer";

        // 🔔 AQUÍ VA LA NOTIFICACIÓN
        console.log(
          `⚠️ ALERTA: La e.firma del cliente ${firma.Cliente.nombre} (${firma.Cliente.correo}) vence el ${vencimiento.toISOString().slice(0, 10)}`
        );
      }

      // 🔄 Actualizar estado solo si cambió
      if (firma.estado !== nuevoEstado) {
        firma.estado = nuevoEstado;
        firma.fecha_caducidad = vencimiento;
        await firma.save();
      }
    }

    console.log("✔ Verificación diaria de e.firmas completada");
  } catch (error) {
    console.error("❌ Error en alertasFirmas:", error);
  }
};
