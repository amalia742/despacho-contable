import React from "react";

export default function Perfil() {
  return (
    <div style={{ padding: 20 }}>
      <h1>🙋 Perfil del Contador</h1>

      <div className="card">
        <h2>Juan Contador</h2>
        <p>Email: contador@mail.com</p>
        <p>Especialidad: Declaraciones SAT</p>
        <button className="btn-primary">Editar Perfil</button>
      </div>
    </div>
  );
}
