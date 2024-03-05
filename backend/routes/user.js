//Import Dependences
const express = require("express");
const router = express.Router();
const UserController = require("../controllers/user");
const check = require("../middleware/auth");

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
router.get("/profile/:id", check, UserController.profile)
router.post(
  "/uploadImage",
  [ check,uploads.single("file0")],
  UserController.uploadImage
);
router.put("/change-email", check, UserController.changeEmail)
router.put("/change-password", check, UserController.changePassword)
router.delete("/delete-user", check, UserController.deleteAccount)

module.exports = router;
