import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      // 🔴 LOGIN ADMIN (NO SE TOCA)
      const response = await axios.post(
        "http://localhost:3000/api/admin/login",
        { correo, password }
      );

      localStorage.setItem("token", response.data.token);
      localStorage.setItem("rol", "admin");
      localStorage.setItem("usuario", JSON.stringify(response.data.admin));

      navigate("/admin");
    } catch {
      try {
        // ✅ LOGIN EMPLEADO
        const responseEmpleado = await axios.post(
          "http://localhost:3000/api/empleados/login",
          { correo, password }
        );

        localStorage.setItem("token", responseEmpleado.data.token);
        localStorage.setItem("rol", "empleado");
        localStorage.setItem(
          "usuario",
          JSON.stringify(responseEmpleado.data.empleado)
        );

        navigate("/admin");
      } catch (errorEmpleado) {
        setError(
          errorEmpleado.response?.data?.message ||
            "Credenciales incorrectas"
        );
      }
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Correo"
          value={correo}
          onChange={(e) => setCorreo(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit">Ingresar</button>
      </form>
    </div>
  );
};

export default Login;
