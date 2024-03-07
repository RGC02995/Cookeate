const RecipesController = require("../controllers/recipes");
const express = require("express");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const router = express.Router();
const verifyToken = require("../middleware/auth");

//Import Multer for update images:
const multer = require("multer");

//CONF UPDATE MULTER
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads/recipes");
  },
  filename: (req, file, cb) => {
    cb(null, "recipes-" + Date.now() + "-" + file.originalname);
  },
});

const uploads = multer({ storage:storage });

//ROUTES

router.post("/save", verifyToken, RecipesController.saveRecipe);
router.post(
  "/uploadImage",
  [verifyToken, uploads.single("file0")],
  RecipesController.uploadImage
);

module.exports = router;
