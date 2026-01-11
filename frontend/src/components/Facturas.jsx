import { useEffect, useState, useCallback, useMemo } from "react";
import axios from "axios";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const API_FACTURAS = "http://localhost:3000/api/facturas";
const API_CLIENTES = "http://localhost:3000/api/clientes";

function Facturas() {
  const [facturas, setFacturas] = useState([]);
  const [clientes, setClientes] = useState([]);

  const [clienteId, setClienteId] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [subtotal, setSubtotal] = useState("");
  const [estado, setEstado] = useState("pendiente");

  const [editandoId, setEditandoId] = useState(null);
  const [busqueda, setBusqueda] = useState("");

  /* ================== CARGAR CLIENTES ================== */
  const cargarClientes = useCallback(async () => {
    try {
      const res = await axios.get(API_CLIENTES);
      setClientes(res.data);
    } catch (error) {
      console.error(error);
    }
  }, []);

  /* ================== CARGAR FACTURAS ================== */
  const cargarFacturas = useCallback(async () => {
    try {
      const res = await axios.get(API_FACTURAS);
      setFacturas(res.data);
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    cargarClientes();
    cargarFacturas();
  }, [cargarClientes, cargarFacturas]);

  /* ================== FOLIO ================== */
  const generarFolio = () => {
    const numero = facturas.length + 1;
    return `FAC-${String(numero).padStart(4, "0")}`;
  };

  /* ================== GUARDAR / ACTUALIZAR ================== */
  const guardarFactura = async (e) => {
    e.preventDefault();

    if (!clienteId || !descripcion || !subtotal) {
      alert("Completa todos los campos");
      return;
    }

    const iva = Number(subtotal) * 0.16;
    const total = Number(subtotal) + iva;

    const data = {
      clienteId: Number(clienteId),
      descripcion,
      subtotal,
      iva,
      total,
      estado,
    };

    try {
      if (editandoId) {
        await axios.put(`${API_FACTURAS}/${editandoId}`, data);
      } else {
        await axios.post(API_FACTURAS, {
          ...data,
          folio: generarFolio(),
        });
      }

      limpiarFormulario();
      cargarFacturas();
    } catch (error) {
      console.error(error);
    }
  };

  /* ================== LIMPIAR ================== */
  const limpiarFormulario = () => {
    setClienteId("");
    setDescripcion("");
    setSubtotal("");
    setEstado("pendiente");
    setEditandoId(null);
  };

  /* ================== EDITAR ================== */
  const editarFactura = (f) => {
    setEditandoId(f.id);
    setClienteId(f.clienteId);
    setDescripcion(f.descripcion);
    setSubtotal(f.subtotal);
    setEstado(f.estado);
  };

  /* ================== ELIMINAR ================== */
  const eliminarFactura = async (id) => {
    if (!window.confirm("¿Eliminar factura?")) return;

    try {
      await axios.delete(`${API_FACTURAS}/${id}`);
      setFacturas(facturas.filter((f) => f.id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  /* ================== FILTRO ================== */
  const facturasFiltradas = useMemo(() => {
    return facturas.filter((f) =>
      f.Cliente?.nombre?.toLowerCase().includes(busqueda.toLowerCase())
    );
  }, [facturas, busqueda]);

  /* ================== PDF INDIVIDUAL ================== */
  const imprimirFactura = (f) => {
    const doc = new jsPDF();

    doc.addImage("/assets/logo.png", "PNG", 10, 10, 30, 30);

    doc.setFontSize(12);
    doc.text(`Factura: ${f.folio}`, 150, 20);
    doc.text(`Cliente: ${f.Cliente?.nombre}`, 10, 50);

    autoTable(doc, {
      startY: 65,
      head: [["Descripción", "Subtotal", "IVA", "Total"]],
      body: [[
        f.descripcion,
        `$${f.subtotal}`,
        `$${f.iva}`,
        `$${f.total}`,
      ]],
    });

    doc.text(
      `Estado: ${f.estado}`,
      10,
      doc.lastAutoTable.finalY + 10
    );

    doc.save(`${f.folio}.pdf`);
  };

  /* ================== PDF POR CLIENTE ================== */
  const imprimirPorCliente = (idCliente) => {
    const lista = facturas.filter((f) => f.clienteId === idCliente);
    if (lista.length === 0) return alert("Sin facturas");

    const cliente = lista[0].Cliente;
    const doc = new jsPDF();

    doc.addImage("/assets/logo.png", "PNG", 10, 10, 30, 30);
    doc.text(`Cliente: ${cliente.nombre}`, 10, 50);

    autoTable(doc, {
      startY: 65,
      head: [["Folio", "Descripción", "Total", "Estado"]],
      body: lista.map((f) => [
        f.folio,
        f.descripcion,
        `$${f.total}`,
        f.estado,
      ]),
    });

    doc.save(`Facturas_${cliente.nombre}.pdf`);
  };

  /* ================== PDF GENERAL ================== */
  const imprimirTodas = () => {
    const doc = new jsPDF();

    autoTable(doc, {
      head: [["Folio", "Cliente", "Total", "Estado"]],
      body: facturas.map((f) => [
        f.folio,
        f.Cliente?.nombre,
        `$${f.total}`,
        f.estado,
      ]),
    });

    doc.save("Facturas.pdf");
  };

  return (
    <div className="container mt-4">
      <h3>Facturas</h3>

      <form className="card card-body mb-4" onSubmit={guardarFactura}>
        <div className="row">
          <div className="col-md-3">
            <label>Cliente</label>
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

          <div className="col-md-3">
            <label>Descripción</label>
            <input
              className="form-control"
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
            />
          </div>

          <div className="col-md-2">
            <label>Subtotal</label>
            <input
              type="number"
              className="form-control"
              value={subtotal}
              onChange={(e) => setSubtotal(e.target.value)}
            />
          </div>

          <div className="col-md-2">
            <label>Estado</label>
            <select
              className="form-select"
              value={estado}
              onChange={(e) => setEstado(e.target.value)}
            >
              <option value="pendiente">Pendiente</option>
              <option value="pagada">Pagada</option>
            </select>
          </div>

          <div className="col-md-2 d-flex align-items-end">
            <button className="btn btn-primary w-100">
              {editandoId ? "Actualizar" : "Guardar"}
            </button>
          </div>
        </div>
      </form>

      <input
        className="form-control mb-3"
        placeholder="Buscar por cliente"
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
      />

      <button className="btn btn-success mb-3" onClick={imprimirTodas}>
        Imprimir todas
      </button>

      <table className="table table-bordered">
        <thead className="table-dark">
          <tr>
            <th>Folio</th>
            <th>Cliente</th>
            <th>Total</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {facturasFiltradas.map((f) => (
            <tr key={f.id}>
              <td>{f.folio}</td>
              <td>{f.Cliente?.nombre}</td>
              <td>${f.total}</td>
              <td>{f.estado}</td>
              <td>
                <button className="btn btn-info btn-sm me-1" onClick={() => imprimirFactura(f)}>PDF</button>
                <button className="btn btn-success btn-sm me-1" onClick={() => imprimirPorCliente(f.clienteId)}>PDF Cliente</button>
                <button className="btn btn-warning btn-sm me-1" onClick={() => editarFactura(f)}>Editar</button>
                <button className="btn btn-danger btn-sm" onClick={() => eliminarFactura(f.id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Facturas;
