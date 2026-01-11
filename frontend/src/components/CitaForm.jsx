import React, { useState } from "react";
import "../App.css";

const CitaForm = ({ cerrar }) => {
  const [cliente, setCliente] = useState("");
  const [fecha, setFecha] = useState("");
  const [hora, setHora] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [mensaje, setMensaje] = useState("");

  const enviarCita = async (e) => {
    e.preventDefault();

    if (!cliente || !fecha || !hora) {
      setMensaje("Por favor llena todos los campos obligatorios.");
      return;
    }

    try {
      const res = await fetch("http://localhost:3000/api/citas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          cliente,
          fecha,
          hora,
          descripcion,
        }),
      });

      const data = await res.json();

      if (data.ok) {
        setMensaje("Cita agendada correctamente.");
        setCliente("");
        setFecha("");
        setHora("");
        setDescripcion("");
      } else {
        setMensaje("Hubo un error al agendar la cita.");
      }
    } catch (error) {
      console.error(error);
      setMensaje("Error de conexión con el servidor: " + (error.message || error));
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-container">

        <button className="close-button" onClick={cerrar}>X</button>

        <h2 className="modal-title">Agendar Cita</h2>

        <form onSubmit={enviarCita} className="modal-form">

          <label>Nombre del Cliente *</label>
          <input
            type="text"
            className="input-field"
            value={cliente}
            onChange={(e) => setCliente(e.target.value)}
          />

          <label>Fecha *</label>
          <input
            type="date"
            className="input-field"
            value={fecha}
            onChange={(e) => setFecha(e.target.value)}
          />

          <label>Hora *</label>
          <input
            type="time"
            className="input-field"
            value={hora}
            onChange={(e) => setHora(e.target.value)}
          />

          <label>Descripción</label>
          <textarea
            className="input-field"
            rows="3"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
          ></textarea>

          {mensaje && <p className="mensaje">{mensaje}</p>}

          <button className="modal-btn" type="submit">
            Guardar Cita
          </button>
        </form>
      </div>
    </div>
  );
};

export default CitaForm;
