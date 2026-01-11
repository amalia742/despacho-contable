import React, { useState } from "react";
import "../App.css";
import logo from "../assets/logo.png";
import Login from "./Login";

const Home = ({ abrirCita }) => {
  const [mostrarLogin, setMostrarLogin] = useState(false);

  const abrirLogin = () => setMostrarLogin(true);
  const cerrarLogin = () => setMostrarLogin(false);

  return (
    <div className="home-container">

      {/* ENCABEZADO */}
      <header className="header">
        <h1 className="header-title">
          DESPACHO AUDITORIA Y CONSULTORIA SANCHEZ GUTIERREZ
        </h1>
        <img src={logo} alt="logo" className="header-logo" />
      </header>

      {/* MODAL LOGIN */}
      {mostrarLogin && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="modal-close" onClick={cerrarLogin}>
              ✖
            </button>
            <Login />
          </div>
        </div>
      )}

      {/* CONTENIDO PRINCIPAL */}
      <div className="home-content">

        {/* COLUMNA IZQUIERDA */}
        <div className="left-box">
          <h2 className="section-title">Acerca de la Empresa</h2>
          <p className="section-text">
            Somos un despacho profesional dedicado a brindar servicios contables,
            fiscales y administrativos con responsabilidad, ética y confianza.
          </p>

          <h2 className="section-title">Misión</h2>
          <p className="section-text">
            Ofrecer soluciones contables que permitan a nuestros clientes mantener
            estabilidad financiera y crecimiento empresarial.
          </p>

          <h2 className="section-title">Visión</h2>
          <p className="section-text">
            Ser el despacho contable líder en el país, reconocido por la calidad y
            profesionalismo de nuestros servicios.
          </p>

          <h2 className="section-title">Ubicación</h2>

          <iframe
            src="https://www.google.com/maps?q=Av.+Insurgentes+Nte.+900,+Cuauhtémoc,+07780,+CDMX,+MX&output=embed"
            width="100%"
            height="320"
            style={{
              border: "0",
              borderRadius: "15px",
              marginTop: "10px",
              boxShadow: "0px 3px 10px rgba(0,0,0,0.15)",
            }}
            allowFullScreen=""
            loading="lazy"
          ></iframe>
        </div>

        {/* COLUMNA DERECHA */}
        <div className="right-box">
          <h2 className="welcome-title">BIENVENIDO A TU DESPACHO</h2>
          <p className="welcome-sub">“Servicios Contables Profesionales”</p>

          {/* BOTÓN LOGIN */}
          <button className="btn-admin" onClick={abrirLogin}>
            Ingresar
          </button>

          <div className="divider"></div>

          <p className="client-text">¿Eres cliente? Agenda una cita:</p>

          {/* BOTÓN AGENDAR CITA */}
          <button className="btn-cita" onClick={abrirCita}>
            Agendar Cita
          </button>

          <h3 className="social-title">Redes Sociales</h3>
        </div>

        {/* BOTÓN FLOTANTE LOGIN - ahora más pequeño y profesional */}
        <button className="floating-login-btn" onClick={abrirLogin}>
          🔐
        </button>

        {/* BOTÓN FLOTANTE CITA */}
        <button className="floating-cita-btn" onClick={abrirCita}>
          📅
        </button>

      </div>
    </div>
  );
};

export default Home;
