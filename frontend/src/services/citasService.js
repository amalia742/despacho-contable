import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:3000/api/citas",
  headers: { "Content-Type": "application/json" },
  timeout: 10000,
});

export const obtenerCitas = () => API.get("/").then(r => r.data);
export const crearCita = (payload) => API.post("/", payload).then(r => r.data);
export const actualizarCita = (id, cambios) => API.patch(`/${id}`, cambios).then(r => r.data);
export const confirmarCita = (id) => API.put(`/confirmar/${id}`).then(r => r.data);
export const cancelarCita = (id) => API.put(`/cancelar/${id}`).then(r => r.data);
export const reagendarCita = (id, nuevaFecha, nuevaHora) => API.put(`/reagendar/${id}`, { nuevaFecha, nuevaHora }).then(r => r.data);
export const eliminarCita = (id) => API.delete(`/${id}`).then(r => r.data);

export default API;

