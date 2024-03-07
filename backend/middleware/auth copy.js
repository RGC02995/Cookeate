//Importar modulos
// const jwt = require("jwt-simple");
require('dotenv').config();
const express = require('express');
const jwt = require("jsonwebtoken");
// const moment = require("moment");
// const libjwt = require("../services/jwt");
const router = express.Router();

// const secret = libjwt.secret;

const auth = (req, res, next) => {
    const token = req.headers.authorization;
    // const token = req.header("auth-token");
    if(!token){
        return res.status(403).send({
            message: "La petición no tiene la cabecera de autenticación"
        });
    }
    try{
        const parts = token.split(' ');

        if (parts.length !== 2) {
            return res.status(500).send({
                message: "Token no válido 1"
            });
        }
        const tokenWithoutBearer = parts[1];
        
        jwt.verify(tokenWithoutBearer, process.env.JWT_SECRET, (err, decoded) => {
            console.log(err);
            console.log(decoded);
            if (err!==null) {
                return res.status(500).json({ message: 'Token inválido' });
            }
            req.userId = decoded.id;
            next()
        });
        // console.log(verified);
        // req.user = verified;
        // next();
    }catch(error){
        return res.status(500).json({
            message: "Token no válido 2"
        });
    }
    // jwt.verify(token, secret, (err, decoded) => {
    //     console.log(token);
    //     console.log(secret);
    //     console.log(decoded);
    //     if(err){
    //         return res.status(500).send({
    //             message: "Token no válido"
    //         });
    //     }
    //     req.id = decoded.id;
    //     next();
    // })

    // // Comprobar si me llega la cabecera de autenticación
    // if (!req.headers.authorization) {
    //     return res.status(403).send({
    //         status: "error",
    //         message: "La petición no tiene la cabecera de autenticación"
    //     });
    // }

    // // Limpiar el token
    // const token = req.headers.authorization.replace(/['"]+/g, "");
    // console.log('Token antes de la verificación:', token.replace(/['"]+/g, ""));
    // // Decodificar token
    // try {
    //     const payload = jwt.decode(token, secret);
    //     // Comprobar expiración del token
    //     if (payload.exp <= moment().unix()) {
    //         return res.status(401).send({
    //             status: "error",
    //             message: "Token expirado"
    //         });
    //     }

    //     // Agregar datos de usuario a request
    //     req.user = payload;

    //     // Pasar a la ejecución de la acción
    //     next();
    // } catch (error) {
    //     return res.status(401).send({
    //         status: "error",
    //         message: "Token inválido",
    //         error: error.message // Devolver el mensaje de error
    //     });
    // }
};
router.post("/verify-token", auth, (req, res) => {
    res.status(200).json({
        status:'ok',
        message:'Muy ok',
        tokenWithoutBearer,
        token
    })
})

module.exports = auth