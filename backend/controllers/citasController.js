const { enviarCorreo } = require("../utils/email");
const { Cita } = require("../models");

// ============================
// OBTENER TODAS LAS CITAS
// ============================
exports.getCitas = async (req, res) => {
  try {
    const citas = await Cita.findAll();
    res.json(citas);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener citas" });
  }
};

// ============================
// VALIDAR HORARIO PERMITIDO
// ============================
const esHorarioValido = (fecha, hora) => {
  const date = new Date(fecha);
  const day = date.getDay(); // 0 domingo, 6 sábado
  const [h] = hora.split(":").map(Number);

  // ❌ Domingo
  if (day === 0) return false;

  // ✅ Sábado
  if (day === 6) {
    return h >= 8 && h < 13;
  }

  // ✅ Lunes a Viernes
  if (day >= 1 && day <= 5) {
    if (h === 13) return false; // comida
    return h >= 8 && h < 16;
  }

  return false;
};

// ============================
// CUPOS POR DÍA
// ============================
const cuposPorDia = (fecha) => {
  const day = new Date(fecha).getDay();

  if (day === 0) return 0; // domingo
  if (day === 6) return 5; // sábado
  return 7;               // lunes a viernes
};

// ============================
// CREAR CITA
// ============================
exports.crearCita = async (req, res) => {
  try {
    const { nombre, correo, fecha, hora } = req.body;

    // 🔒 Validar horario permitido
    if (!esHorarioValido(fecha, hora)) {
      return res.status(400).json({
        error: "Horario no permitido",
      });
    }

    // 🔒 Validar día lleno
    const totalCitasDelDia = await Cita.count({
      where: { fecha },
    });

    if (totalCitasDelDia >= cuposPorDia(fecha)) {
      return res.status(400).json({
        error: "Día no disponible",
      });
    }

    // 🔒 Validar horario ocupado
    const citaExistente = await Cita.findOne({
      where: { fecha, hora },
    });

    if (citaExistente) {
      return res.status(400).json({
        error: "Horario no disponible",
      });
    }

    const nuevaCita = await Cita.create({
      nombre,
      correo,
      fecha,
      hora,
      estado: "pendiente",
    });

    res.status(201).json(nuevaCita);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al crear la cita" });
  }
};

// ============================
// OBTENER HORAS OCUPADAS POR FECHA
// ============================
exports.obtenerCitasPorFecha = async (req, res) => {
  try {
    const { fecha } = req.params;

    const citas = await Cita.findAll({
      where: { fecha },
      attributes: ["hora"],
    });

    res.json(citas);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener citas" });
  }
};

// ============================
// CONFIRMAR CITA
// ============================
exports.confirmarCita = async (req, res) => {
  try {
    const { id } = req.params;

    await Cita.update(
      { estado: "confirmada" },
      { where: { id } }
    );

    res.json({ mensaje: "Cita confirmada" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al confirmar" });
  }
};

// ============================
// CANCELAR CITA
// ============================
exports.cancelarCita = async (req, res) => {
  try {
    const { id } = req.params;

    await Cita.update(
      { estado: "cancelada" },
      { where: { id } }
    );

    res.json({ mensaje: "Cita cancelada" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al cancelar" });
  }
};

// ============================
// REAGENDAR CITA
// ============================
exports.reagendarCita = async (req, res) => {
  try {
    const { id } = req.params;
    const { fecha, hora } = req.body;

    // 🔒 Validar horario
    if (!esHorarioValido(fecha, hora)) {
      return res.status(400).json({
        error: "Horario no permitido",
      });
    }

    // 🔒 Validar día lleno
    const totalCitasDelDia = await Cita.count({
      where: { fecha },
    });

    if (totalCitasDelDia >= cuposPorDia(fecha)) {
      return res.status(400).json({
        error: "Día no disponible",
      });
    }

    // 🔒 Validar horario ocupado
    const ocupada = await Cita.findOne({
      where: { fecha, hora },
    });

    if (ocupada) {
      return res.status(400).json({
        error: "Horario no disponible",
      });
    }

    await Cita.update(
      { fecha, hora },
      { where: { id } }
    );

    res.json({ mensaje: "Cita reagendada" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al reagendar" });
  }
};
