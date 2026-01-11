import axios from "../api/axios";

export const obtenerFirmas = () => axios.get("/api/firmas");
export const crearFirma = (data) => axios.post("/api/firmas", data);
export const actualizarFirma = (id, data) =>
  axios.put(`/api/firmas/${id}`, data);
export const eliminarFirma = (id) =>
  axios.delete(`/api/firmas/${id}`);
