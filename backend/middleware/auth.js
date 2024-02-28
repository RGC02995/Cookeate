//Importar modulos
const jwt = require("jwt-simple");
const moment = require("moment");
const libjwt = require("../services/jwt");

const express = require('express');
const router = express.Router();

const secret = libjwt.secret;

const auth = (req, res, next) => {
    // Comprobar si me llega la cabecera de autenticación
    if (!req.headers.authorization) {
        return res.status(403).send({
            status: "error",
            message: "La petición no tiene la cabecera de autenticación"
        });
    }

    // Limpiar el token
    const token = req.headers.authorization.replace(/['"]+/g, "");
    console.log('Token antes de la verificación:', token.replace(/['"]+/g, ""));
    // Decodificar token
    try {
        const payload = jwt.decode(token, secret);
        // Comprobar expiración del token
        if (payload.exp <= moment().unix()) {
            return res.status(401).send({
                status: "error",
                message: "Token expirado"
            });
        }

        // Agregar datos de usuario a request
        req.user = payload;

        // Pasar a la ejecución de la acción
        next();
    } catch (error) {
        return res.status(401).send({
            status: "error",
            message: "Token inválido",
            error: error.message // Devolver el mensaje de error
        });
    }
};

module.exports = auth

router.post("/verify-token", auth)