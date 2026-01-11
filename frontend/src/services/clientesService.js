import axios from "axios";

export const obtenerClientes = () => axios.get("/api/clientes");
export const crearCliente = (cliente) => axios.post("/api/clientes", cliente);
export const actualizarCliente = (id, cliente) => axios.put(`/api/clientes/${id}`, cliente);
export const eliminarCliente = (id) => axios.delete(`/api/clientes/${id}`);
