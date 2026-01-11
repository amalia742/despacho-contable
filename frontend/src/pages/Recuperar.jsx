import React, { useState } from 'react';
import api from '../services/api'; 
import '../App.css';

export default function Recuperar() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState(null);

  const enviar = async (e) => {
    e.preventDefault();
    setStatus(null);
    try {
      await api.post('/auth/forgot-password', { email });
      setStatus({ ok: true, msg: 'Código enviado. Revisa tu correo.' });
    } catch (err) {
      const msg = err?.response?.data?.error || 'Error al enviar código';
      setStatus({ ok: false, msg });
    }
  };

  return (
    <div className="login-page d-flex justify-content-center align-items-center">
      <div className="card shadow p-4" style={{ width: 380 }}>
        <div className="text-center mb-3"><img src="/logo.png" alt="logo" style={{ width: 90 }} /></div>
        <h4 className="fw-bold text-center mb-3">Recuperar Contraseña</h4>

        {status && <div className={`alert ${status.ok ? 'alert-success' : 'alert-danger'}`}>{status.msg}</div>}

        <form onSubmit={enviar}>
          <div className="mb-3">
            <label className="form-label">Correo</label>
            <input type="email" className="form-control" value={email} onChange={e=>setEmail(e.target.value)} required />
          </div>
          <button className="btn btn-primary w-100">Enviar código</button>
        </form>

        <div className="text-center mt-3"><a href="/login">← Volver al login</a></div>
      </div>
    </div>
  );
}

