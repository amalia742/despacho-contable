import React from "react";

export default function AdminDashboard() {
  return (
    <div style={{ padding: "25px" }}>
      <h1>📊 Dashboard General</h1>
      <p>Bienvenido al panel principal del despacho contable.</p>

      <div style={{
        display: "flex",
        gap: "20px",
        marginTop: "20px",
        flexWrap: "wrap"
      }}>
        
        <div className="card">
          <h3>Clientes Registrados</h3>
          <p>120</p>
        </div>

        <div className="card">
          <h3>Facturas Emitidas</h3>
          <p>78</p>
        </div>

        <div className="card">
          <h3>Tareas Pendientes</h3>
          <p>15</p>
        </div>

      </div>
    </div>
  );
}
