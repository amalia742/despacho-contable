import React, { useState } from 'react';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';
import '../App.css';

export default function VerificarCodigo() {
  const [email, setEmail] = useState('');
  const [token, setToken] = useState('');
  const [error, setError] = useState(null);
  const nav = useNavigate();

  const verificar = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      const r = await api.post('/auth/verify-token', { email, token });
      if (r.data.valid) {
        // redirige a restablecer con token y email en query
        nav(`/restablecer/${token}?email=${encodeURIComponent(email)}`);
      } else {
        setError('Código inválido');
      }
    } catch (err) {
      setError(err?.response?.data?.error || 'Error verificando código');
    }
  };

  return (
    <div className="login-page d-flex justify-content-center align-items-center">
      <div className="card shadow p-4" style={{ width: 380 }}>
        <h4 className="text-center mb-3">Verificar código</h4>
        {error && <div className="alert alert-danger">{error}</div>}
        <form onSubmit={verificar}>
          <div className="mb-3">
            <label className="form-label">Correo</label>
            <input type="email" className="form-control" value={email} onChange={e=>setEmail(e.target.value)} required />
          </div>
          <div className="mb-3">
            <label className="form-label">Código (6 dígitos)</label>
            <input type="text" className="form-control" value={token} onChange={e=>setToken(e.target.value)} required />
          </div>
          <button className="btn btn-primary w-100">Verificar</button>
        </form>
        <div className="text-center mt-3"><a href="/recuperar">Enviar código</a></div>
      </div>
    </div>
  );
}
