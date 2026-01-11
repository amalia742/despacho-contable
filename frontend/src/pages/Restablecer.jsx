import React, { useState } from "react";
import { useParams } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../App.css";

function Restablecer() {
  const { token: _token } = useParams(); // Token enviado desde el backend (prefixed with _ to avoid unused-var lint error)

  const [pass1, setPass1] = useState("");
  const [pass2, setPass2] = useState("");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleReset = (e) => {
    e.preventDefault();
    setError("");

    if (pass1 !== pass2) {
      setError("Las contraseñas no coinciden.");
      return;
    }

    if (pass1.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres.");
      return;
    }

    // Aquí se enviaría al backend
    // fetch(`http://TU-SERVIDOR/api/reset/${token}`, {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify({ nueva: pass1 })
    // });

    setSuccess(true);
  };

  return (
    <div className="login-page d-flex justify-content-center align-items-center">

      <div className="card shadow p-4" style={{ width: "380px" }}>
        <div className="text-center mb-3">
          <img src="/logo.png" alt="Logo" style={{ width: "90px" }} />
        </div>

        <h4 className="fw-bold text-center mb-3">Restablecer Contraseña</h4>

        {!success ? (
          <>
            <p className="text-secondary text-center mb-4">
              Ingresa tu nueva contraseña para continuar.
            </p>

            {error && (
              <div className="alert alert-danger text-center py-2">{error}</div>
            )}

            <form onSubmit={handleReset}>
              <div className="mb-3">
                <label className="form-label">Nueva contraseña</label>
                <input
                  type="password"
                  className="form-control"
                  placeholder="••••••••"
                  value={pass1}
                  onChange={(e) => setPass1(e.target.value)}
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Repetir contraseña</label>
                <input
                  type="password"
                  className="form-control"
                  placeholder="••••••••"
                  value={pass2}
                  onChange={(e) => setPass2(e.target.value)}
                />
              </div>

              <button className="btn btn-primary w-100 py-2">Cambiar contraseña</button>
            </form>
          </>
        ) : (
          <div className="alert alert-success text-center">
            ✔ Contraseña actualizada correctamente.
            <br />
            <a href="/login" className="fw-bold d-block mt-3">Iniciar sesión</a>
          </div>
        )}
      </div>
    </div>
  );
}

export default Restablecer;
