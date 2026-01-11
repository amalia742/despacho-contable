export default function ClienteForm({ cliente, setCliente, onGuardar }) {
  if (!cliente) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCliente({
      ...cliente,
      [name]: value,
    });
  };

  return (
    <div className="container-fluid">
      <h5 className="fw-bold text-primary mb-3">Registrar / Editar Cliente</h5>

      <div className="row g-3">
        {/* CLAVE */}
        <div className="col-md-4">
          <label className="form-label">Clave</label>
          <input
            type="text"
            className="form-control"
            name="clave"
            value={cliente.clave || ""}
            onChange={handleChange}
          />
        </div>

        {/* NOMBRE */}
        <div className="col-md-8">
          <label className="form-label">Nombre / Razón Social</label>
          <input
            type="text"
            className="form-control"
            name="nombre"
            value={cliente.nombre || ""}
            onChange={handleChange}
            required
          />
        </div>

        {/* RFC */}
        <div className="col-md-4">
          <label className="form-label">RFC</label>
          <input
            type="text"
            className="form-control"
            name="rfc"
            value={cliente.rfc || ""}
            onChange={handleChange}
          />
        </div>

        {/* CURP */}
        <div className="col-md-4">
          <label className="form-label">CURP</label>
          <input
            type="text"
            className="form-control"
            name="curp"
            value={cliente.curp || ""}
            onChange={handleChange}
          />
        </div>

        {/* TIPO PERSONA */}
        <div className="col-md-4">
          <label className="form-label">Tipo de Persona</label>
          <select
            className="form-select"
            name="tipoPersona"
            value={cliente.tipoPersona || "fisica"}
            onChange={handleChange}
          >
            <option value="fisica">Física</option>
            <option value="moral">Moral</option>
          </select>
        </div>

        {/* CORREO */}
        <div className="col-md-6">
          <label className="form-label">Correo</label>
          <input
            type="email"
            className="form-control"
            name="correo"
            value={cliente.correo || ""}
            onChange={handleChange}
          />
        </div>

        {/* TELÉFONO */}
        <div className="col-md-6">
          <label className="form-label">Teléfono</label>
          <input
            type="text"
            className="form-control"
            name="telefono"
            value={cliente.telefono || ""}
            onChange={handleChange}
          />
        </div>

        {/* DIRECCIÓN */}
        <div className="col-md-12">
          <label className="form-label">Dirección</label>
          <textarea
            className="form-control"
            rows="2"
            name="direccion"
            value={cliente.direccion || ""}
            onChange={handleChange}
          />
        </div>

        {/* ESTADO */}
        <div className="col-md-4">
          <label className="form-label">Estado</label>
          <select
            className="form-select"
            name="estado"
            value={cliente.estado || "activo"}
            onChange={handleChange}
          >
            <option value="activo">Activo</option>
            <option value="inactivo">Inactivo</option>
          </select>
        </div>
      </div>

      {/* BOTÓN */}
      <div className="d-flex justify-content-end mt-4">
        <button className="btn btn-success px-4" onClick={onGuardar}>
          💾 Guardar Cliente
        </button>
      </div>
    </div>
  );
}
