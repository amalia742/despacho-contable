const URL = "http://localhost:3000/api/clientes";

export const obtenerClientes = async () => {
  const res = await fetch(URL);
  return res.json();
};

export const crearCliente = async (cliente) => {
  const res = await fetch(URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(cliente)
  });
  return res.json();
};

export const actualizarCliente = async (id, cliente) => {
  await fetch(`${URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(cliente)
  });
};

export const eliminarCliente = async (id) => {
  await fetch(`${URL}/${id}`, {
    method: "DELETE"
  });
};
