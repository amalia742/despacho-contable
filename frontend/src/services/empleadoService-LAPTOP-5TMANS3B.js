const API_URL = "http://localhost:3000/api/empleados";

/* ===============================
   OBTENER EMPLEADOS
================================ */
export const obtenerEmpleados = async () => {
  const resp = await fetch(API_URL);

  if (!resp.ok) {
    throw new Error("Error en el servidor");
  }

  return await resp.json();
};

/* ===============================
   CREAR EMPLEADO
================================ */
export const crearEmpleado = async (data) => {
  const resp = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!resp.ok) {
    const text = await resp.text();
    console.error("Respuesta backend:", text);
    throw new Error("Error creando empleado");
  }

  return await resp.json();
};

/* ===============================
   ACTUALIZAR EMPLEADO
================================ */
export const actualizarEmpleado = async (id, data) => {
  const resp = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!resp.ok) {
    throw new Error("Error actualizando empleado");
  }

  return await resp.json();
};

/* ===============================
   ELIMINAR EMPLEADO
================================ */
export const eliminarEmpleado = async (id) => {
  const resp = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });

  if (!resp.ok) {
    throw new Error("Error eliminando empleado");
  }

  return await resp.json();
};
