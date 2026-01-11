import React from 'react';
import Sidebar from './Sidebar';

export default function AppLayout({ children }) {
  return (
    <div className="d-flex">
      <Sidebar />
      <div className="flex-grow-1" style={{ minHeight: '100vh', background: '#f7f9fc' }}>
        {children}
      </div>
    </div>
  );
}
