import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./HomeAdmin.css";
import logo from "../assets/logo.png";
import Swal from "sweetalert2";

// Componentes
import Empleados from "../components/Empleados";
import Clientes from "../components/Clientes";
import Facturas from "../components/Facturas";
import Tareas from "../components/Tareas";
import Dashboard from "../components/Dashboard";
import Citas from "../components/Citas";
import FirmasElectronicas from "../components/FirmasElectronicas";

const HomeAdmin = () => {
  const [opcionActiva, setOpcionActiva] = useState("");
  const [vista, setVista] = useState("");

  // ✅ LEER ROL (SIN useEffect, SIN setState)
  const rol = localStorage.getItem("rol"); // "admin" o "empleado"

  const manejarClickMenu = (opcion) => {
    setOpcionActiva(opcion);
    setVista(opcion);
  };

  const handleLogout = () => {
    Swal.fire({
      title: "¿Cerrar sesión?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, cerrar",
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.clear();
        window.location.href = "/";
      }
    });
  };

  return (
    <div className="home-admin-container">
      {/* BARRA SUPERIOR */}
      <div className="top-bar d-flex align-items-center justify-content-between px-4">
        <div className="logo-box">
          <img src={logo} alt="Logo" className="logo-img" />
        </div>

        <h3 className="text-white flex-grow-1 text-center">
          Auditoría y Consultoría Sánchez
        </h3>

        <span className="text-white fw-bold">
          BIENVENIDO {rol?.toUpperCase()}
        </span>
      </div>

      {/* MENU */}
      <div className="menu-bar px-4">
        <button className="btn btn-outline-light btn-sm" onClick={handleLogout}>
          Cerrar sesión
        </button>
      </div>

      {/* OPCIONES */}
      <div className="options-menu d-flex justify-content-around text-white fw-semibold">
        {/* SOLO ADMIN */}
        {rol === "admin" && (
          <span onClick={() => manejarClickMenu("empleados")}>
            Empleados
          </span>
        )}

        {/* ADMIN + EMPLEADO */}
        <span onClick={() => manejarClickMenu("clientes")}>Clientes</span>
        <span onClick={() => manejarClickMenu("firmas")}>Firmas</span>
        <span onClick={() => manejarClickMenu("facturas")}>Facturas</span>

        {/* SOLO ADMIN */}
        {rol === "admin" && (
          <>
            <span onClick={() => manejarClickMenu("tareas")}>Tareas</span>
            <span onClick={() => manejarClickMenu("dashboard")}>Dashboard</span>
            <span onClick={() => manejarClickMenu("citas")}>Citas</span>
          </>
        )}
      </div>

      {/* CONTENIDO */}
      <div className="content-area p-4">
        {vista === "empleados" && rol === "admin" && <Empleados />}
        {vista === "clientes" && <Clientes />}
        {vista === "firmas" && <FirmasElectronicas />}
        {vista === "facturas" && <Facturas />}
        {vista === "tareas" && rol === "admin" && <Tareas />}
        {vista === "dashboard" && rol === "admin" && <Dashboard />}
        {vista === "citas" && rol === "admin" && <Citas />}
      </div>
    </div>
  );
};

export default HomeAdmin;
