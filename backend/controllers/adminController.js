const bcrypt = require("bcrypt");
const Admin = require("../models/Admin");

exports.loginAdmin = async (req, res) => {
  try {
    const { correo, password } = req.body;

    if (!correo || !password) {
      return res.status(400).json({ message: "Datos incompletos" });
    }

    const admin = await Admin.findOne({ where: { correo } });

    if (!admin) {
      return res.status(401).json({ message: "Correo o contraseña incorrectos" });
    }

    const passwordValida = await bcrypt.compare(password, admin.password);

    if (!passwordValida) {
      return res.status(401).json({ message: "Correo o contraseña incorrectos" });
    }

    res.json({
      message: "Login correcto",
      rol: "admin",
      usuario: {
        id: admin.id,
        correo: admin.correo
      }
    });

  } catch (error) {
    console.error("ERROR LOGIN:", error);
    res.status(500).json({ message: "Error del servidor" });
  }
};
