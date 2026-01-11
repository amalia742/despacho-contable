import React from "react";
import { Card, Row, Col, ProgressBar } from "react-bootstrap";

export default function ContadorDashboard() {
  return (
    <div className="container-fluid p-4">
      <h2 className="fw-bold mb-4">Dashboard del Contador</h2>

      {/* CARDS SUPERIORES */}
      <Row className="mb-4">
        <Col md={3}>
          <Card className="shadow-sm">
            <Card.Body>
              <h5 className="fw-bold">Clientes</h5>
              <h2 className="text-primary">124</h2>
              <p className="text-muted">Registrados este mes</p>
            </Card.Body>
          </Card>
        </Col>

        <Col md={3}>
          <Card className="shadow-sm">
            <Card.Body>
              <h5 className="fw-bold">Facturas</h5>
              <h2 className="text-success">87</h2>
              <p className="text-muted">Emitidas esta semana</p>
            </Card.Body>
          </Card>
        </Col>

        <Col md={3}>
          <Card className="shadow-sm">
            <Card.Body>
              <h5 className="fw-bold">Tareas</h5>
              <h2 className="text-warning">32</h2>
              <p className="text-muted">Pendientes por atender</p>
            </Card.Body>
          </Card>
        </Col>

        <Col md={3}>
          <Card className="shadow-sm">
            <Card.Body>
              <h5 className="fw-bold">Empleados</h5>
              <h2 className="text-danger">14</h2>
              <p className="text-muted">Activos actualmente</p>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* GRAFICA (FAKE) */}
      <Row className="mb-4">
        <Col md={8}>
          <Card className="shadow-sm">
            <Card.Body>
              <h5 className="fw-bold mb-3">Actividad Semanal</h5>
              <div
                style={{
                  background: "#e9ecef",
                  borderRadius: "8px",
                  height: "220px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#6c757d",
                }}
              >
                (Aquí irá la gráfica real más adelante)
              </div>
            </Card.Body>
          </Card>
        </Col>

        {/* ACTIVIDADES */}
        <Col md={4}>
          <Card className="shadow-sm">
            <Card.Body>
              <h5 className="fw-bold mb-3">Últimas Actividades</h5>

              <ul className="list-group small">
                <li className="list-group-item">✔ Factura #112 creada</li>
                <li className="list-group-item">✔ Cliente “Fernando” actualizado</li>
                <li className="list-group-item">✔ Nueva tarea asignada</li>
                <li className="list-group-item">✔ Reporte generado</li>
                <li className="list-group-item text-muted">(Datos demostrativos)</li>
              </ul>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* BARRAS DE PROGRESO */}
      <Card className="shadow-sm">
        <Card.Body>
          <h5 className="fw-bold mb-3">Progreso de Tareas</h5>

          <p>Contabilidad General</p>
          <ProgressBar now={60} className="mb-3" />

          <p>Declaraciones</p>
          <ProgressBar variant="success" now={40} className="mb-3" />

          <p>Nómina Mensual</p>
          <ProgressBar variant="danger" now={80} className="mb-3" />
        </Card.Body>
      </Card>
    </div>
  );
}

