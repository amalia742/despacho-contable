import React from 'react';

export default function Header({ title }) {
  const user = JSON.parse(localStorage.getItem('user') || 'null');

  return (
    <div className="d-flex justify-content-between align-items-center p-3 border-bottom">
      <h4 className="mb-0">{title}</h4>
      <div className="d-flex align-items-center">
        <div className="me-3 text-muted">Hola, {user?.nombre || 'Usuario'}</div>
        <button className="btn btn-outline-secondary btn-sm" onClick={() => { localStorage.clear(); location.href='/'; }}>Salir</button>
      </div>
    </div>
  );
}

