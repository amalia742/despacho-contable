import React, { useState } from "react";
import ClienteForm from "./ClienteForm";
import ClienteFiltro from "./ClienteFiltro";
import { exportarPDF, exportarExcel } from "../utils/exportadores";
import "../styles/ClientePanel.css";

const ClientePanel = () => {
  const [clientes, setClientes] = useState([]);
  const [editarIndex, setEditarIndex] = useState(null);
  const [filtros, setFiltros] = useState({});

  const guardarCliente = (cliente) => {
    if (editarIndex !== null) {
      const copia = [...clientes];
      copia[editarIndex] = cliente;
      setClientes(copia);
      setEditarIndex(null);
    } else {
      setClientes([...clientes, cliente]);
    }
  };

  const eliminarCliente = (index) => {
    if (confirm("¿Eliminar cliente?")) {
      setClientes(clientes.filter((_, i) => i !== index));
    }
  };

  const clientesFiltrados = clientes.filter((c) =>
    (!filtros.nombre || c.nombre.toLowerCase().includes(filtros.nombre.toLowerCase())) &&
    (!filtros.rfc || c.rfc.includes(filtros.rfc)) &&
    (!filtros.estado || c.estado === filtros.estado) &&
    (!filtros.tipoPersona || c.tipoPersona === filtros.tipoPersona)
  );

  return (
    <>
      <ClienteForm
        onGuardar={guardarCliente}
        clienteEditar={editarIndex !== null ? clientes[editarIndex] : null}
      />

      <ClienteFiltro filtros={filtros} setFiltros={setFiltros} />

      <div className="card">
        <h3>Listado de Clientes</h3>

        <div className="acciones">
          <button onClick={() => exportarPDF(clientesFiltrados)}>📄 PDF</button>
          <button onClick={() => exportarExcel(clientesFiltrados)}>📊 Excel</button>
        </div>

        <table>
          <thead>
            <tr>
              <th>Clave</th>
              <th>Nombre</th>
              <th>RFC</th>
              <th>Tipo</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {clientesFiltrados.map((c, i) => (
              <tr key={i}>
                <td>{c.clave}</td>
                <td>{c.nombre}</td>
                <td>{c.rfc}</td>
                <td>{c.tipoPersona}</td>
                <td>{c.estado}</td>
                <td>
                  <button onClick={() => setEditarIndex(i)}>✏️</button>
                  <button onClick={() => eliminarCliente(i)}>🗑️</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ClientePanel;
