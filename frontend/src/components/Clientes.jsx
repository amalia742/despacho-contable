import { useEffect, useState } from "react";
import axios from "axios";
import ClienteFiltro from "./ClienteFiltro";
import ClienteForm from "./ClienteForm";

const API_URL = "http://localhost:3000/api/clientes";

export default function Clientes() {
  const [clientes, setClientes] = useState([]);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [clienteActual, setClienteActual] = useState(null);

  const [filtros, setFiltros] = useState({
    nombre: "",
    rfc: "",
    estado: "",
    tipoPersona: "",
  });

  // 🔹 Cargar clientes
  useEffect(() => {
    axios
      .get(API_URL)
      .then((res) => setClientes(res.data))
      .catch((err) => console.error(err));
  }, []);

  // ✅ BLOQUEAR SCROLL CUANDO EL MODAL ESTÁ ABIERTO
  useEffect(() => {
    if (mostrarModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [mostrarModal]);

  // 🔹 Filtrado
  const clientesFiltrados = clientes.filter((c) => {
    return (
      (!filtros.nombre ||
        c.nombre.toLowerCase().includes(filtros.nombre.toLowerCase())) &&
      (!filtros.rfc ||
        c.rfc?.toLowerCase().includes(filtros.rfc.toLowerCase())) &&
      (!filtros.estado || c.estado === filtros.estado) &&
      (!filtros.tipoPersona || c.tipoPersona === filtros.tipoPersona)
    );
  });

  // 🔹 Guardar cliente
  const guardarCliente = async () => {
    try {
      if (clienteActual.id) {
        await axios.put(`${API_URL}/${clienteActual.id}`, clienteActual);
      } else {
        await axios.post(API_URL, clienteActual);
      }

      const res = await axios.get(API_URL);
      setClientes(res.data);
      setMostrarModal(false);
      setClienteActual(null);
    } catch (error) {
      console.error(error);
    }
  };

  // 🔹 Eliminar cliente
  const eliminarCliente = async (id) => {
    if (!window.confirm("¿Eliminar cliente?")) return;

    await axios.delete(`${API_URL}/${id}`);
    const res = await axios.get(API_URL);
    setClientes(res.data);
  };

  return (
    <div className="container-fluid mt-3">
      <h4 className="fw-bold mb-3">Clientes</h4>

      {/* 🔍 FILTROS */}
      <ClienteFiltro filtros={filtros} setFiltros={setFiltros} />

      {/* ➕ AGREGAR */}
      <button
        className="btn btn-primary mb-3"
        onClick={() => {
          setClienteActual({
            clave: "",
            nombre: "",
            rfc: "",
            curp: "",
            tipoPersona: "fisica",
            correo: "",
            telefono: "",
            direccion: "",
            estado: "activo",
          });
          setMostrarModal(true);
        }}
      >
        ➕ Agregar Cliente
      </button>

      {/* 📋 TABLA */}
      <div className="table-responsive">
        <table className="table table-bordered table-hover align-middle">
          <thead className="table-dark text-center">
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>RFC</th>
              <th>Tipo</th>
              <th>Correo</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {clientesFiltrados.length === 0 ? (
              <tr>
                <td colSpan="7" className="text-center text-muted">
                  Sin registros
                </td>
              </tr>
            ) : (
              clientesFiltrados.map((c) => (
                <tr key={c.id}>
                  <td className="text-center">{c.id}</td>
                  <td>{c.nombre}</td>
                  <td>{c.rfc}</td>
                  <td>{c.tipoPersona}</td>
                  <td>{c.correo}</td>
                  <td className="text-center">
                    <span
                      className={`badge ${
                        c.estado === "activo"
                          ? "bg-success"
                          : "bg-danger"
                      }`}
                    >
                      {c.estado}
                    </span>
                  </td>
                  <td className="text-center">
                    <button
                      className="btn btn-warning btn-sm me-2"
                      onClick={() => {
                        setClienteActual(c);
                        setMostrarModal(true);
                      }}
                    >
                      Editar
                    </button>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => eliminarCliente(c.id)}
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* 🪟 MODAL A PANTALLA COMPLETA */}
      {mostrarModal && (
        <div
          className="modal show d-block"
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.6)",
            zIndex: 99999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            className="modal-dialog"
            style={{
              width: "100%",
              maxWidth: "1100px",
              margin: 0,
            }}
          >
            <div
              className="modal-content"
              style={{
                maxHeight: "90vh",
                overflow: "hidden",
              }}
            >
              <div className="modal-header">
                <h5 className="modal-title">Cliente</h5>
                <button
                  className="btn-close"
                  onClick={() => setMostrarModal(false)}
                />
              </div>

              <div
                className="modal-body"
                style={{
                  overflowY: "auto",
                  maxHeight: "calc(90vh - 120px)",
                }}
              >
                <ClienteForm
                  cliente={clienteActual}
                  setCliente={setClienteActual}
                  onGuardar={guardarCliente}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
