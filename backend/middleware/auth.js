const jwt = require("jsonwebtoken");

module.exports = (rolesPermitidos = []) => {
  return (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "No autorizado" });
    }

    try {
      const decoded = jwt.verify(token, "secreto123");

      if (!rolesPermitidos.includes(decoded.rol)) {
        return res.status(403).json({ message: "Acceso denegado" });
      }

      req.user = decoded;
      next();
    } catch (err) {
      return res.status(401).json({ message: "Token inválido" });
    }
  };
};
