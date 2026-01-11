import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./HomeAdmin.css";
import logo from "../assets/logo.png";
import Swal from "sweetalert2";

// 🔹 Componentes
import Empleados from "../components/Empleados";
import Clientes from "../components/Clientes";
import Facturas from "../components/Facturas";
import Tareas from "../components/Tareas";
import Dashboard from "../components/Dashboard";
import Citas from "../components/Citas";
import FirmasElectronicas from "../components/FirmasElectronicas"; // ✅ NUEVO

const HomeAdmin = () => {
  const [opcionActiva, setOpcionActiva] = useState("");
  const [vista, setVista] = useState("");

  const manejarClickMenu = (opcion) => {
    setOpcionActiva(opcion);
    setVista(opcion);
  };

  const handleLogout = () => {
    Swal.fire({
      title: "¿Cerrar sesión?",
      text: "¿Seguro que quieres cerrar tu sesión?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Sí, cerrar",
      cancelButtonText: "Cancelar"
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem("tokenAdmin");
        Swal.fire({
          title: "Sesión cerrada",
          text: "Has salido correctamente.",
          icon: "success",
          timer: 1300,
          showConfirmButton: false
        });
        setTimeout(() => {
          window.location.href = "/";
        }, 1300);
      }
    });
  };

  return (
    <div className="home-admin-container">

      {/* ------ BARRA SUPERIOR ------ */}
      <div className="top-bar d-flex align-items-center justify-content-between px-4">
        <div className="logo-box d-flex align-items-center justify-content-center">
          <img src={logo} alt="Logo" className="logo-img" />
        </div>

        <h3 className="text-white fw-light text-center flex-grow-1">
          Auditoría y Consultoría Sánchez
        </h3>

        <div className="d-flex align-items-center gap-3">
          <span className="text-white fw-bold">BIENVENIDO ADMIN</span>
          <div className="admin-avatar"></div>
        </div>
      </div>

      {/* ------ MENÚ SECUNDARIO ------ */}
      <div className="menu-bar d-flex align-items-center justify-content-between px-4">
        <h6 className="fw-light text-white">MENU DE OPCIONES</h6>
        <button className="btn btn-outline-light btn-sm" onClick={handleLogout}>
          Cerrar sesión
        </button>
      </div>

      {/* ------ OPCIONES DEL MENÚ ------ */}
      <div className="options-menu d-flex justify-content-around text-white fw-semibold">
        <span
          className={opcionActiva === "empleados" ? "active" : ""}
          onClick={() => manejarClickMenu("empleados")}
        >
          Empleados
        </span>

        <span
          className={opcionActiva === "clientes" ? "active" : ""}
          onClick={() => manejarClickMenu("clientes")}
        >
          Clientes
        </span>

        <span
          className={opcionActiva === "firmas" ? "active" : ""}
          onClick={() => manejarClickMenu("firmas")}
        >
          Firmas electronicas
        </span>

        <span
          className={opcionActiva === "facturas" ? "active" : ""}
          onClick={() => manejarClickMenu("facturas")}
        >
          Facturas
        </span>

        <span
          className={opcionActiva === "tareas" ? "active" : ""}
          onClick={() => manejarClickMenu("tareas")}
        >
          Tareas
        </span>

        <span
          className={opcionActiva === "dashboard" ? "active" : ""}
          onClick={() => manejarClickMenu("dashboard")}
        >
          Dashboard
        </span>

        <span
          className={opcionActiva === "citas" ? "active" : ""}
          onClick={() => manejarClickMenu("citas")}
        >
          Citas
        </span>
      </div>

      {/* ------ CONTENIDO ------ */}
      <div className="content-area p-4">
        {vista === "empleados" && <Empleados />}
        {vista === "clientes" && <Clientes />}
        {vista === "firmas" && <FirmasElectronicas />}
        {vista === "facturas" && <Facturas />}
        {vista === "tareas" && <Tareas />}
        {vista === "dashboard" && <Dashboard />}
        {vista === "citas" && <Citas />}
      </div>

    </div>
  );
};

export default HomeAdmin;
