import React, { useState } from "react";

export default function Facturas() {
  const [facturas] = useState([
    { id: 1, folio: "FAC-1001", cliente: "Juan Pérez", total: 3500 },
    { id: 2, folio: "FAC-1002", cliente: "Ana López", total: 5200 }
  ]);

  return (
    <div style={{ padding: 20 }}>
      <h1>📄 Facturas</h1>

      <button className="btn-primary">+ Crear Factura</button>

      <table className="tabla">
        <thead>
          <tr>
            <th>Folio</th>
            <th>Cliente</th>
            <th>Total</th>
            <th>Acciones</th>
          </tr>
        </thead>

        <tbody>
          {facturas.map(f => (
            <tr key={f.id}>
              <td>{f.folio}</td>
              <td>{f.cliente}</td>
              <td>${f.total}</td>
              <td>
                <button className="btn-secondary">Ver</button>
                <button className="btn-danger">Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
