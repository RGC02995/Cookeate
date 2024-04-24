require("dotenv").config();
const jwt = require("jsonwebtoken");

const refreshToken = (user) => {
  try {
    // Verificar si existe el secreto en las variables de entorno
    if (!process.env.JWT_REFRESH_SECRET) {
      throw new Error("JWT_REFRESH_SECRET not found in environment variables.");
    }

    // Define el secreto para firmar el token
    const secretKey = process.env.JWT_REFRESH_SECRET;

    // Define la información del usuario a incluir en el payload
    const userData = {
      userId: user.userId,
      username: user.name,
      email: user.email,
    };

    // Define el tiempo de expiración en segundos (por ejemplo, 1 hora = 3600 segundos)
    const expiresIn = 3600;

    // Crea el payload (el encabezado se incluirá más tarde)
    const payload = {
      ...userData,
      type: "refresh", // Marcarlo como un token de actualización
    };

    // Genera el token de actualización
    const refreshToken = jwt.sign(payload, secretKey, { expiresIn });
    console.log("Generated refresh token:", refreshToken);
    return refreshToken; // Devuelve el token generado
  } catch (error) {
    console.error("Error generating refresh token:", error.message);
    return null; // En caso de error, devuelve null
  }
};

module.exports = {
  refreshToken,
};
