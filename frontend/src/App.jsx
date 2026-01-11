import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import ClienteAgendar from "./pages/ClienteAgendar";
import HomeAdmin from "./pages/HomeAdmin";
import Citas from "./components/Citas";

function App() {
  const [mostrarCita, setMostrarCita] = useState(false);

  const abrirCita = () => setMostrarCita(true);
  const cerrarCita = () => setMostrarCita(false);

  return (
    <Router>

      {/* ⛔ NAV QUITADO — SOLO SE OCULTÓ EL MENÚ (Inicio / Citas / Admin) */}
      {/* Si quieres también quitar "Despacho Contable", dímelo y lo elimino */}
      {/* 
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container">
          <Link className="navbar-brand" to="/">Despacho Contable</Link>
          <div className="collapse navbar-collapse">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link" to="/">Inicio</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/citas">Citas</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/admin">Admin</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      */}

      {/* Rutas */}
      <Routes>
        <Route path="/" element={<Home abrirCita={abrirCita} />} />
        <Route path="/citas" element={<Citas />} />
        <Route path="/admin" element={<HomeAdmin />} />
      </Routes>

      {/* Modal de agendar cita */}
      {mostrarCita && <ClienteAgendar cerrarModal={cerrarCita} />}

    </Router>
  );
}

export default App;
