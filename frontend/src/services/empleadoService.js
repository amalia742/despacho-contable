const API_URL = "http://localhost:3000/api/empleados";

export async function obtenerEmpleados() {
  try {
    const res = await fetch(API_URL);
    if (!res.ok) throw new Error("Error en el servidor");
    return await res.json();
  } catch (error) {
    console.log("Error obteniendo empleados:", error);
    return [];
  }
}

export async function crearEmpleado(data) {
  try {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    return await res.json();
  } catch (error) {
    console.log("Error creando empleado:", error);
  }
}

export async function actualizarEmpleado(id, data) {
  try {
    const res = await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    return await res.json();
  } catch (error) {
    console.log("Error actualizando empleado:", error);
  }
}

export async function eliminarEmpleado(id) {
  try {
    const res = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    });

    return await res.json();
  } catch (error) {
    console.log("Error eliminando empleado:", error);
  }
}
