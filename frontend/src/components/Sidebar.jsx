import React from 'react';
import { NavLink } from 'react-router-dom';

export default function Sidebar() {
  return (
    <div className="bg-dark text-white vh-100" style={{ width: 250 }}>
      <div className="p-3 text-center border-bottom">
        <img src="/logo.png" alt="logo" style={{ width: 90 }} />
        <div className="mt-2 fw-bold">Despacho Contable</div>
      </div>

      <nav className="nav flex-column p-2">
        <NavLink to="/dashboard" className="nav-link text-white"> <i className="bi bi-speedometer2 me-2"></i> Dashboard</NavLink>
        <NavLink to="/clientes" className="nav-link text-white"> <i className="bi bi-people me-2"></i> Clientes</NavLink>
        <NavLink to="/facturas" className="nav-link text-white"> <i className="bi bi-receipt me-2"></i> Facturas</NavLink>
        <NavLink to="/tareas" className="nav-link text-white"> <i className="bi bi-list-task me-2"></i> Tareas</NavLink>
        <NavLink to="/empleados" className="nav-link text-white"> <i className="bi bi-briefcase me-2"></i> Empleados</NavLink>
        <NavLink to="/perfil" className="nav-link text-white"> <i className="bi bi-person-circle me-2"></i> Mi Perfil</NavLink>
        <NavLink to="/reportes" className="nav-link text-white"> <i className="bi bi-bar-chart-line me-2"></i> Reportes</NavLink>
      </nav>
    </div>
  );
}
