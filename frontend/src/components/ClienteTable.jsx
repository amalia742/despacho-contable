import React from "react";

export default function ClienteTable({ clientes, onEdit, onDelete }) {
  return (
    <div className="table-responsive">
      <table className="table table-striped table-hover">
        <thead>
          <tr>
            <th>#</th>
            <th>Nombre</th>
            <th>Apellidos</th>
            <th>Correo</th>
            <th>Teléfono</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {clientes.length === 0 ? (
            <tr>
              <td colSpan="6" className="text-center">No hay clientes</td>
            </tr>
          ) : (
            clientes.map((c, i) => (
              <tr key={c.id}>
                <td>{i + 1}</td>
                <td>{c.nombre}</td>
                <td>{c.apellidos}</td>
                <td>{c.correo}</td>
                <td>{c.telefono || "-"}</td>
                <td>
                  <button
                    className="btn btn-sm btn-primary me-2"
                    onClick={() => onEdit(c)}
                  >
                    Editar
                  </button>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => onDelete(c)}
                  >
                    Borrar
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
