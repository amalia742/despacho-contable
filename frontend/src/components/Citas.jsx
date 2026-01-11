import { useEffect, useState } from "react";
import "./CitasAdmin.css";

function Citas() {
  const [citas, setCitas] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [modal, setModal] = useState(false);
  const [citaEditar, setCitaEditar] = useState(null);
  const [nuevaFecha, setNuevaFecha] = useState("");
  const [nuevaHora, setNuevaHora] = useState("");

  // =========================
  // CARGAR CITAS
  // =========================
  const cargarCitas = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/citas");
      const data = await res.json();
      setCitas(data);
    } catch {
      alert("Error cargando citas");
    }
  };

  useEffect(() => {
    cargarCitas();
  }, []);

  // =========================
  // CONFIRMAR
  // =========================
  const confirmar = async (id) => {
    try {
      const res = await fetch(
        `http://localhost:3000/api/citas/${id}/confirmar`,
        { method: "PUT" }
      );

      if (!res.ok) throw new Error();
      cargarCitas();
    } catch {
      alert("Error al confirmar la cita");
    }
  };

  // =========================
  // CANCELAR
  // =========================
  const cancelar = async (id) => {
    try {
      const res = await fetch(
        `http://localhost:3000/api/citas/${id}/cancelar`,
        { method: "PUT" }
      );

      if (!res.ok) throw new Error();
      cargarCitas();
    } catch {
      alert("Error al cancelar la cita");
    }
  };

  // =========================
  // REAGENDAR
  // =========================
  const reagendar = async () => {
    if (!nuevaFecha || !nuevaHora) {
      alert("Ingresa fecha y hora");
      return;
    }

    try {
      const res = await fetch(
        `http://localhost:3000/api/citas/${citaEditar.id}/reagendar`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            fecha: nuevaFecha,
            hora: nuevaHora,
          }),
        }
      );

      if (!res.ok) throw new Error();

      setModal(false);
      setNuevaFecha("");
      setNuevaHora("");
      setCitaEditar(null);
      cargarCitas();
    } catch {
      alert("Error al reagendar");
    }
  };

  const abrirModal = (cita) => {
    setCitaEditar(cita);
    setModal(true);
  };

  // =========================
  // FILTRO
  // =========================
  const citasFiltradas = citas.filter((c) =>
    `${c.nombre} ${c.correo} ${c.fecha} ${c.estado}`
      .toLowerCase()
      .includes(busqueda.toLowerCase())
  );

  // =========================
  // RENDER
  // =========================
  return (
    <div className="citas-admin">
      <h2>📅 Citas Registradas</h2>

      <input
        type="text"
        placeholder="Buscar cita..."
        className="buscador"
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
      />

      <table className="tabla-citas">
        <thead>
          <tr>
            <th>Cliente</th>
            <th>Correo</th>
            <th>Fecha</th>
            <th>Hora</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>

        <tbody>
          {citasFiltradas.map((cita) => (
            <tr key={cita.id}>
              <td>{cita.nombre}</td>
              <td>{cita.correo}</td>
              <td>{cita.fecha}</td>
              <td>{cita.hora}</td>
              <td>
                <span className={`estado ${cita.estado}`}>
                  {cita.estado}
                </span>
              </td>
              <td className="acciones">
                <button
                  className="btn-confirmar"
                  onClick={() => confirmar(cita.id)}
                >
                  Confirmar
                </button>

                <button
                  className="btn-reagendar"
                  onClick={() => abrirModal(cita)}
                >
                  Reagendar
                </button>

                <button
                  className="btn-cancelar"
                  onClick={() => cancelar(cita.id)}
                >
                  Cancelar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {modal && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Reagendar Cita</h3>

            <label>Nueva fecha</label>
            <input
              type="date"
              value={nuevaFecha}
              onChange={(e) => setNuevaFecha(e.target.value)}
            />

            <label>Nueva hora</label>
            <input
              type="time"
              value={nuevaHora}
              onChange={(e) => setNuevaHora(e.target.value)}
            />

            <button className="btn-guardar" onClick={reagendar}>
              Guardar
            </button>

            <button
              className="btn-cerrar"
              onClick={() => setModal(false)}
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Citas;
