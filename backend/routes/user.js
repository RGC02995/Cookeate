//Import Dependences
const express = require("express");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const router = express.Router();
const UserController = require("../controllers/user");
const verifyToken = require("../middleware/auth");

//Import Multer for update images:
const multer = require("multer");

//CONF UPDATE MULTER
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads/avatars");
  },
  filename: (req, file, cb) => {
    cb(null, "avatar " + Date.now + "-" + file.originalname);
  },
});

const uploads = multer({ storage });

//ROUTES

router.post("/register", UserController.register);
router.post("/login", UserController.login);
router.post("/verify-token", verifyToken, (req, res) => {
  // Verificar el token
  jwt.verify(req.token, process.env.JWT_SECRET, (err, authData) => {
    if (err) {
      // Si el token no es válido, devolver un error 403 (Prohibido)
      res.json({
        message: "No token",
      });
    } else {
      // Si el token es válido, devolver un mensaje con los datos autenticados
      res.json({
        message: "Token verificado correctamente",
        authData,
        token: req.token,
      });
    }
  });
});
router.get("/profile/:id", verifyToken, UserController.profile);
router.get("/getImage/:imageName", verifyToken, UserController.getImage);
router.post(
  "/uploadImage",
  [verifyToken, uploads.single("file0")],
  UserController.uploadImage
);
router.put("/change-email", verifyToken, UserController.changeEmail);
router.put("/change-password", verifyToken, UserController.changePassword);
router.delete("/delete-user", verifyToken, UserController.deleteAccount);

module.exports = router;
