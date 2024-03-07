//Importar modulos
require('dotenv').config();

const verifyToken = (req, res, next) => {
    // Obtener el token del encabezado de autorización
    const bearerHeader = req.headers['authorization'];
    if (typeof bearerHeader !== 'undefined') {
      const bearerToken = bearerHeader.split(' ')[1]; // Extraer el token de 'Bearer <token>'
      req.token = bearerToken; // Añadir el token a la solicitud
      next();
    } else {
      // Si no hay token, devolver un error 403 (Prohibido)
      res.sendStatus(403);
    }
  }

module.exports = verifyToken