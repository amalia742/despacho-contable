import { useEffect, useState, useCallback, useMemo } from "react";
import axios from "axios";

const API_FIRMAS = "http://localhost:3000/api/firmas";
const API_CLIENTES = "http://localhost:3000/api/clientes";

function FirmasElectronicas() {
  const [firmas, setFirmas] = useState([]);
  const [clientes, setClientes] = useState([]);

  const [clienteId, setClienteId] = useState("");
  const [fechaInicio, setFechaInicio] = useState("");
  const [fechaCaducidad, setFechaCaducidad] = useState("");
  const [observaciones, setObservaciones] = useState("");

  const [editandoId, setEditandoId] = useState(null);
  const [cargando, setCargando] = useState(false);

  const [busqueda, setBusqueda] = useState("");
  const [filtroEstado, setFiltroEstado] = useState("todas");

  /* ================== ESTADO FIRMA ================== */
  const obtenerEstado = (fechaCaducidad) => {
    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);

    const caduca = new Date(fechaCaducidad);
    caduca.setHours(0, 0, 0, 0);

    const diffDias = Math.floor(
      (caduca.getTime() - hoy.getTime()) / (1000 * 60 * 60 * 24)
    );

    if (diffDias < 0) return "vencida";
    if (diffDias <= 30) return "por vencer";
    return "vigente";
  };

  const claseEstado = (estado) => {
    if (estado === "vencida") return "table-danger";
    if (estado === "por vencer") return "table-warning";
    return "table-success";
  };

  /* ================== CARGAR FIRMAS ================== */
  const recargarFirmas = useCallback(async () => {
    try {
      const res = await axios.get(API_FIRMAS);
      setFirmas(res.data);
    } catch (error) {
      console.error("Error al cargar firmas", error);
    }
  }, []);

  /* ================== CARGAR CLIENTES ================== */
  const cargarClientes = useCallback(async () => {
    try {
      const res = await axios.get(API_CLIENTES);
      setClientes(res.data);
    } catch (error) {
      console.error("Error al cargar clientes", error);
    }
  }, []);

  useEffect(() => {
    recargarFirmas();
    cargarClientes();
  }, [recargarFirmas, cargarClientes]);

  /* ================== ALERTA ================== */
  useEffect(() => {
    const porVencer = firmas.filter(
      (f) => obtenerEstado(f.fechaCaducidad) === "por vencer"
    );

    if (porVencer.length > 0) {
      alert(`⚠️ Tienes ${porVencer.length} firma(s) por vencer en menos de 30 días`);
    }
  }, [firmas]);

  /* ================== GUARDAR ================== */
  const guardarFirma = async (e) => {
    e.preventDefault();

    if (!clienteId || !fechaInicio || !fechaCaducidad) {
      alert("Completa los campos obligatorios");
      return;
    }

    const data = {
      clienteId,
      fechaInicio,
      fechaCaducidad,
      observaciones,
    };

    try {
      setCargando(true);

      if (editandoId) {
        await axios.put(`${API_FIRMAS}/${editandoId}`, data);
      } else {
        await axios.post(API_FIRMAS, data);
      }

      limpiarFormulario();
      recargarFirmas();
    } catch (error) {
      console.error("Error al guardar firma", error);
    } finally {
      setCargando(false);
    }
  };

  /* ================== LIMPIAR ================== */
  const limpiarFormulario = () => {
    setClienteId("");
    setFechaInicio("");
    setFechaCaducidad("");
    setObservaciones("");
    setEditandoId(null);
  };

  /* ================== ELIMINAR ================== */
  const eliminarFirma = async (id) => {
    if (!window.confirm("¿Eliminar esta firma?")) return;

    try {
      await axios.delete(`${API_FIRMAS}/${id}`);
      recargarFirmas();
    } catch (error) {
      console.error("Error al eliminar firma", error);
    }
  };

  /* ================== FILTROS ================== */
  const firmasFiltradas = useMemo(() => {
    return firmas.filter((f) => {
      const estado = obtenerEstado(f.fechaCaducidad);
      const nombre = f.Cliente?.nombre?.toLowerCase() || "";

      if (filtroEstado !== "todas" && estado !== filtroEstado) return false;
      if (busqueda && !nombre.includes(busqueda.toLowerCase())) return false;

      return true;
    });
  }, [firmas, busqueda, filtroEstado]);

  return (
    <div className="container mt-4">
      <h3 className="mb-3">Firmas Electrónicas</h3>

      {/* ================== FORMULARIO ================== */}
      <form onSubmit={guardarFirma} className="card card-body mb-4">
        <div className="row">
          <div className="col-md-3 mb-3">
            <label className="form-label">Cliente</label>
            <select
              className="form-select"
              value={clienteId}
              onChange={(e) => setClienteId(e.target.value)}
            >
              <option value="">Seleccione cliente</option>
              {clientes.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.nombre}
                </option>
              ))}
            </select>
          </div>

          <div className="col-md-3 mb-3">
            <label className="form-label">Fecha inicio</label>
            <input
              type="date"
              className="form-control"
              value={fechaInicio}
              onChange={(e) => setFechaInicio(e.target.value)}
            />
          </div>

          <div className="col-md-3 mb-3">
            <label className="form-label">Fecha caducidad</label>
            <input
              type="date"
              className="form-control"
              value={fechaCaducidad}
              onChange={(e) => setFechaCaducidad(e.target.value)}
            />
          </div>

          <div className="col-md-3 mb-3">
            <label className="form-label">Observaciones</label>
            <input
              type="text"
              className="form-control"
              value={observaciones}
              onChange={(e) => setObservaciones(e.target.value)}
            />
          </div>
        </div>

        <div className="text-end">
          <button
            type="button"
            className="btn btn-secondary me-2"
            onClick={limpiarFormulario}
          >
            Cancelar
          </button>
          <button className="btn btn-primary" disabled={cargando}>
            {editandoId ? "Actualizar" : "Guardar"}
          </button>
        </div>
      </form>

      {/* ================== FILTROS ================== */}
      <div className="row mb-3">
        <div className="col-md-4">
          <input
            className="form-control"
            placeholder="Buscar por cliente"
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
          />
        </div>
        <div className="col-md-3">
          <select
            className="form-select"
            value={filtroEstado}
            onChange={(e) => setFiltroEstado(e.target.value)}
          >
            <option value="todas">Todas</option>
            <option value="vigente">Vigentes</option>
            <option value="por vencer">Por vencer</option>
            <option value="vencida">Vencidas</option>
          </select>
        </div>
      </div>

      {/* ================== TABLA ================== */}
      <table className="table table-bordered table-striped">
        <thead className="table-dark">
          <tr>
            <th>Cliente</th>
            <th>Inicio</th>
            <th>Caducidad</th>
            <th>Correo</th>
            <th>Teléfono</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {firmasFiltradas.length === 0 ? (
            <tr>
              <td colSpan="7" className="text-center">
                No hay firmas
              </td>
            </tr>
          ) : (
            firmasFiltradas.map((f) => {
              const estado = obtenerEstado(f.fechaCaducidad);
              return (
                <tr key={f.id} className={claseEstado(estado)}>
                  <td>{f.Cliente?.nombre}</td>
                  <td>{f.fechaInicio}</td>
                  <td>{f.fechaCaducidad}</td>
                  <td>{f.Cliente?.correo}</td>
                  <td>{f.Cliente?.telefono}</td>
                  <td className="fw-bold text-uppercase">{estado}</td>
                  <td>
                    <button
                      className="btn btn-warning btn-sm me-1"
                      onClick={() => {
                        setEditandoId(f.id);
                        setClienteId(f.clienteId);
                        setFechaInicio(f.fechaInicio);
                        setFechaCaducidad(f.fechaCaducidad);
                        setObservaciones(f.observaciones || "");
                      }}
                    >
                      Editar
                    </button>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => eliminarFirma(f.id)}
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
}

export default FirmasElectronicas;
