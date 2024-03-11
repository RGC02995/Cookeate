//Importar modulos
const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  // Obtener el token del encabezado de autorización
  const bearerHeader = req.headers["authorization"];

  if (typeof bearerHeader !== "undefined") {
    try {
      const bearerToken = bearerHeader.split(" ")[1]; // Extraer el token de 'Bearer <token>'
      const decodedToken = jwt.verify(bearerToken, process.env.JWT_SECRET); // Verificar y decodificar el token

      req.token = bearerToken; // Añadir el token a la solicitud
      req.user = decodedToken; // Añadir el usuario decodificado a la solicitud
      next();
    } catch (error) {
      console.error("Error al verificar el token:", error.message);
      res.sendStatus(403); // Si hay un error al verificar el token, devolver un error 403 (Prohibido)
    }
  } else {
    // Si no hay token, devolver un error 403 (Prohibido)
    res.sendStatus(403);
  }
};

module.exports = verifyToken;
