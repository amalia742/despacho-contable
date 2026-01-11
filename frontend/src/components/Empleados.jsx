import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import "jspdf-autotable";
import jsPDF from "jspdf";
import * as XLSX from "xlsx";

import {
  obtenerEmpleados,
  crearEmpleado,
  actualizarEmpleado,
  eliminarEmpleado,
} from "../services/empleadoService";

const Empleados = () => {
  const [empleados, setEmpleados] = useState([]);
  const [busqueda, setBusqueda] = useState("");

  // PAGINACIÓN
  const [paginaActual, setPaginaActual] = useState(1);
  const filasPorPagina = 5;

  const [formData, setFormData] = useState({
    nombre: "",
    correo: "",
    telefono: "",
    direccion: "",
    cargo: "",
    fechaIngreso: "",
    password: "",
  });

  const [modoEdicion, setModoEdicion] = useState(false);
  const [idEditando, setIdEditando] = useState(null);

  const cargarEmpleados = async () => {
    try {
      const data = await obtenerEmpleados();
      setEmpleados(Array.isArray(data) ? data : []);
    } catch (error) {
      console.log("Error cargando empleados:", error);
    }
  };

  useEffect(() => {
    let mounted = true;

    const fetchEmpleados = async () => {
      try {
        const data = await obtenerEmpleados();
        if (mounted) {
          setEmpleados(Array.isArray(data) ? data : []);
        }
      } catch (error) {
        console.log("Error cargando empleados:", error);
      }
    };

    fetchEmpleados();

    return () => {
      mounted = false;
    };
  }, []);

  const manejarCambio = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const guardarEmpleado = async (e) => {
    e.preventDefault();

    if (!formData.nombre || !formData.correo || !formData.cargo || !formData.password) {
      Swal.fire("Campos incompletos", "Llena los campos obligatorios", "warning");
      return;
    }

    try {
      if (modoEdicion) {
        await actualizarEmpleado(idEditando, formData);
        Swal.fire("Actualizado", "Empleado actualizado correctamente", "success");
      } else {
        await crearEmpleado(formData);
        Swal.fire("Registrado", "Empleado creado exitosamente", "success");
      }

      setModoEdicion(false);
      setIdEditando(null);

      setFormData({
        nombre: "",
        correo: "",
        telefono: "",
        direccion: "",
        cargo: "",
        fechaIngreso: "",
        password: "",
      });

      cargarEmpleados();
    } catch (error) {
      console.log(error);
    }
  };

  const editarEmp = (emp) => {
    setModoEdicion(true);
    setIdEditando(emp.id);

    setFormData({
      nombre: emp.nombre,
      correo: emp.correo,
      telefono: emp.telefono || "",
      direccion: emp.direccion || "",
      cargo: emp.cargo,
      fechaIngreso: emp.fechaIngreso || "",
      password: "",
    });
  };

  const borrarEmp = (id) => {
    Swal.fire({
      title: "¿Eliminar empleado?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Eliminar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await eliminarEmpleado(id);
        cargarEmpleados();
      }
    });
  };

  // FILTRO
  const empleadosFiltrados = empleados.filter((emp) =>
    `${emp.nombre} ${emp.correo} ${emp.cargo}`
      .toLowerCase()
      .includes(busqueda.toLowerCase())
  );

  // PAGINACIÓN REAL
  const indiceInicial = (paginaActual - 1) * filasPorPagina;
  const indiceFinal = indiceInicial + filasPorPagina;

  const empleadosPagina = empleadosFiltrados.slice(indiceInicial, indiceFinal);
  const totalPaginas = Math.ceil(empleadosFiltrados.length / filasPorPagina);

  // EXPORTAR PDF  
  const exportarPDF = () => {
    const doc = new jsPDF();

    doc.text("Lista de Empleados", 14, 10);
    doc.autoTable({
      startY: 20,
      head: [["Nombre", "Cargo", "Correo", "Telefono", "Direccion", "Fecha Ingreso"]],
      body: empleadosFiltrados.map((e) => [
        e.nombre,
        e.cargo,
        e.correo,
        e.telefono,
        e.direccion,
        e.fechaIngreso,
      ]),
    });

    doc.save("empleados.pdf");
  };

  // EXPORTAR EXCEL
  const exportarExcel = () => {
    const hoja = XLSX.utils.json_to_sheet(empleadosFiltrados);
    const libro = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(libro, hoja, "Empleados");
    XLSX.writeFile(libro, "empleados.xlsx");
  };

  return (
    <div className="container mt-4">
      <h3 className="text-primary">Gestión de Empleados</h3>

      {/* BUSCADOR */}
      <input
        type="text"
        className="form-control mb-3"
        placeholder="Buscar por nombre, correo o cargo..."
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
      />

      {/* BOTONES EXPORTAR */}
      <div className="mb-3">
        <button className="btn btn-success me-2" onClick={exportarExcel}>
          Exportar Excel
        </button>
        <button className="btn btn-danger" onClick={exportarPDF}>
          Exportar PDF
        </button>
      </div>

      {/* FORMULARIO */}
      <form className="card p-3 mb-4" onSubmit={guardarEmpleado}>
        <h5>{modoEdicion ? "Editar empleado" : "Registrar empleado"}</h5>

        <input className="form-control mt-2" placeholder="Nombre" name="nombre" value={formData.nombre} onChange={manejarCambio} />
        <input className="form-control mt-2" placeholder="Correo" name="correo" value={formData.correo} onChange={manejarCambio} />
        <input className="form-control mt-2" placeholder="Teléfono" name="telefono" value={formData.telefono} onChange={manejarCambio} />
        <input className="form-control mt-2" placeholder="Dirección" name="direccion" value={formData.direccion} onChange={manejarCambio} />
        <input className="form-control mt-2" placeholder="Cargo" name="cargo" value={formData.cargo} onChange={manejarCambio} />
        <input className="form-control mt-2" type="date" name="fechaIngreso" value={formData.fechaIngreso} onChange={manejarCambio} />
        <input className="form-control mt-2" placeholder="Contraseña" name="password" value={formData.password} onChange={manejarCambio} />

        <button className="btn btn-primary mt-3">
          {modoEdicion ? "Actualizar" : "Registrar"}
        </button>
      </form>

      {/* TABLA */}
      <table className="table table-bordered">
        <thead className="table-dark">
          <tr>
            <th>Nombre</th>
            <th>Cargo</th>
            <th>Correo</th>
            <th>Teléfono</th>
            <th>Dirección</th>
            <th>Fecha Ingreso</th>
            <th>Acciones</th>
          </tr>
        </thead>

        <tbody>
          {empleadosPagina.length === 0 ? (
            <tr>
              <td colSpan="7" className="text-center">
                No hay resultados.
              </td>
            </tr>
          ) : (
            empleadosPagina.map((emp) => (
              <tr key={emp.id}>
                <td>{emp.nombre}</td>
                <td>{emp.cargo}</td>
                <td>{emp.correo}</td>
                <td>{emp.telefono}</td>
                <td>{emp.direccion}</td>
                <td>{emp.fechaIngreso}</td>

                <td>
                  <button className="btn btn-warning btn-sm me-2" onClick={() => editarEmp(emp)}>
                    Editar
                  </button>
                  <button className="btn btn-danger btn-sm" onClick={() => borrarEmp(emp.id)}>
                    Eliminar
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* PAGINACIÓN */}
      <div className="d-flex justify-content-center mt-3">
        <button
          className="btn btn-secondary me-2"
          onClick={() => setPaginaActual((p) => Math.max(1, p - 1))}
        >
          ◀
        </button>

        <span className="mt-2">
          Página {paginaActual} de {totalPaginas}
        </span>

        <button
          className="btn btn-secondary ms-2"
          onClick={() => setPaginaActual((p) => Math.min(totalPaginas, p + 1))}
        >
          ▶
        </button>
      </div>
    </div>
  );
};

export default Empleados;
