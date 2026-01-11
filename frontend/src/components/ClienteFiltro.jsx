const ClienteFiltro = ({ filtros, setFiltros }) => {
  return (
    <div className="card filtro-card p-3 mb-3 shadow-sm">
      <h5 className="fw-bold mb-3">🔍 Buscar Clientes</h5>

      <div className="row g-3">
        <div className="col-md-3">
          <input
            type="text"
            className="form-control"
            placeholder="Nombre / Razón social"
            value={filtros.nombre || ""}
            onChange={(e) =>
              setFiltros({ ...filtros, nombre: e.target.value })
            }
          />
        </div>

        <div className="col-md-3">
          <input
            type="text"
            className="form-control"
            placeholder="RFC"
            value={filtros.rfc || ""}
            onChange={(e) =>
              setFiltros({ ...filtros, rfc: e.target.value })
            }
          />
        </div>

        <div className="col-md-3">
          <select
            className="form-select"
            value={filtros.estado || ""}
            onChange={(e) =>
              setFiltros({ ...filtros, estado: e.target.value })
            }
          >
            <option value="">Estado</option>
            <option value="activo">Activo</option>
            <option value="inactivo">Inactivo</option>
          </select>
        </div>

        <div className="col-md-3">
          <select
            className="form-select"
            value={filtros.tipoPersona || ""}
            onChange={(e) =>
              setFiltros({ ...filtros, tipoPersona: e.target.value })
            }
          >
            <option value="">Tipo</option>
            <option value="fisica">Física</option>
            <option value="moral">Moral</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default ClienteFiltro;
