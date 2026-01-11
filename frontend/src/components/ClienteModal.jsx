import React, { useState, useEffect } from "react";

export default function ClienteModal({ visible, onClose, onSave, initial }) {
  const [form, setForm] = useState({
    nombre: "",
    apellidos: "",
    correo: "",
    telefono: "",
  });

  useEffect(() => {
    // Defer setting state to avoid synchronous setState within the effect,
    // which can cause cascading renders.
    const apply = () => {
      if (initial) {
        setForm({
          nombre: initial.nombre || "",
          apellidos: initial.apellidos || "",
          correo: initial.correo || "",
          telefono: initial.telefono || "",
        });
      } else {
        setForm({
          nombre: "",
          apellidos: "",
          correo: "",
          telefono: "",
        });
      }
    };

    const rafId = requestAnimationFrame(apply);
    return () => cancelAnimationFrame(rafId);
  }, [initial, visible]);

  const handleChange = (e) =>
    setForm((s) => ({ ...s, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    // validaciones simples
    if (!form.nombre || !form.apellidos || !form.correo) {
      return alert("Nombre, apellidos y correo son obligatorios.");
    }
    onSave(form);
  };

  if (!visible) return null;

  return (
    <div className="modal-backdrop" style={backdropStyle}>
      <div className="modal-dialog" style={dialogStyle}>
        <div className="modal-content p-3">
          <div className="modal-header">
            <h5 className="modal-title">{initial ? "Editar Cliente" : "Agregar Cliente"}</h5>
            <button className="btn-close" onClick={onClose} />
          </div>

          <form onSubmit={handleSubmit}>
            <div className="modal-body">
              <div className="mb-2">
                <label className="form-label">Nombre</label>
                <input name="nombre" value={form.nombre} onChange={handleChange} className="form-control" />
              </div>

              <div className="mb-2">
                <label className="form-label">Apellidos</label>
                <input name="apellidos" value={form.apellidos} onChange={handleChange} className="form-control" />
              </div>

              <div className="mb-2">
                <label className="form-label">Correo</label>
                <input name="correo" value={form.correo} onChange={handleChange} className="form-control" type="email" />
              </div>

              <div className="mb-2">
                <label className="form-label">Teléfono</label>
                <input name="telefono" value={form.telefono} onChange={handleChange} className="form-control" />
              </div>
            </div>

            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={onClose}>Cancelar</button>
              <button type="submit" className="btn btn-primary">{initial ? "Guardar cambios" : "Crear"}</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

// estilos inline mínimos (puedes moverlos a CSS)
const backdropStyle = {
  position: "fixed",
  inset: 0,
  background: "rgba(0,0,0,0.4)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 2000,
};

const dialogStyle = {
  width: "680px",
  maxWidth: "95%",
  borderRadius: "8px",
  background: "#fff",
};
