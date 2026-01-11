import React, { useState } from "react";

export default function Tareas() {
  const [tareas, setTareas] = useState([
    { id: 1, titulo: "Declaración mensual", estado: "Pendiente" },
    { id: 2, titulo: "Factura cliente VIP", estado: "En proceso" }
  ]);

  const addTarea = () => {
    setTareas(prev => [
      ...prev,
      { id: Date.now(), titulo: "Nueva tarea", estado: "Pendiente" }
    ]);
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>📝 Tareas</h1>

      <button className="btn-primary" onClick={addTarea}>+ Nueva Tarea</button>

      <ul className="tarea-lista">
        {tareas.map(t => (
          <li key={t.id} className="tarea-item">
            <strong>{t.titulo}</strong>
            <span>{t.estado}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
