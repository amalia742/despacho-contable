import React, { useState } from "react";
import "../App.css";
import API from "../api";

const ClienteAgendar = ({ cerrarModal }) => {
  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [fecha, setFecha] = useState("");
  const [hora, setHora] = useState("");

  // ✅ VALIDADOR DE HORARIO
  const esHorarioValido = (fecha, hora) => {
    const date = new Date(fecha);
    const day = date.getDay(); // 0 = domingo, 6 = sábado
    const [h] = hora.split(":").map(Number);

    // ❌ Domingo
    if (day === 0) return false;

    // ✅ Sábado
    if (day === 6) {
      return h >= 8 && h < 13;
    }

    // ✅ Lunes a Viernes
    if (day >= 1 && day <= 5) {
      if (h === 13) return false; // hora de comida
      return h >= 8 && h < 16;
    }

    return false;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 🔒 Validación antes de enviar
    if (!esHorarioValido(fecha, hora)) {
      alert(
        "Horario no permitido:\n\n" +
        "• Lunes a Viernes: 8:00 a 16:00 (excepto 1:00 pm)\n" +
        "• Sábados: 8:00 a 13:00\n" +
        "• Domingos no se agendan citas"
      );
      return;
    }

    try {
      await API.post("/citas", {
        nombre,
        correo,
        fecha,
        hora,
      });

      alert("Cita agendada correctamente!");
      cerrarModal();
    } catch (error) {
      console.error(error);
      alert("Error al agendar la cita. Intenta de nuevo.");
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="modal-close" onClick={cerrarModal}>✖</button>
        <h2>Agendar Cita</h2>

        <form className="form-cita" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Nombre completo"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
          />

          <input
            type="email"
            placeholder="Correo electrónico"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
            required
          />

          <input
            type="date"
            value={fecha}
            onChange={(e) => setFecha(e.target.value)}
            required
          />

          <input
            type="time"
            value={hora}
            onChange={(e) => setHora(e.target.value)}
            required
            min="08:00"
            max="16:00"
          />

          <button type="submit" className="btn-submit-cita">
            Agendar
          </button>
        </form>
      </div>
    </div>
  );
};

export default ClienteAgendar;
