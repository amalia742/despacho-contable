import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Login() {
  const navigate = useNavigate();
  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await axios.post("http://localhost:3000/auth/login", {
        correo,
        password,
      });

      // Guardar token y rol
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("rol", res.data.rol);

      // Entrar al panel
      navigate("/admin");
    } catch {
      setError("Correo o contraseña incorrectos");
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-3 text-center">Ingresar</h2>

      <form onSubmit={handleSubmit} className="card p-4 shadow">
        <input
          type="email"
          placeholder="Correo"
          className="form-control mb-3"
          value={correo}
          onChange={(e) => setCorreo(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Contraseña"
          className="form-control mb-3"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {error && (
          <div className="alert alert-danger text-center">
            {error}
          </div>
        )}

        <button type="submit" className="btn btn-primary w-100">
          Ingresar
        </button>
      </form>
    </div>
  );
}
