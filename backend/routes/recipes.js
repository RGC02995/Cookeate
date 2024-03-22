const RecipesController = require("../controllers/recipes");
const express = require("express");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const router = express.Router();
const verifyToken = require("../middleware/auth");
const path = require("path");

//Import Multer for update images:
const multer = require("multer");

//CONF UPDATE MULTER
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads/recipes");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + file.originalname);
  },
});

const uploads = multer({ storage: storage });

//ROUTES

router.post(
  "/save",
  verifyToken,
  uploads.single("image"),
  RecipesController.saveRecipeWithImage,
  (req, res) => {
    const file = req.file;
    const data = req.body;
    console.log({ data, file });
    return res.status(200).send(`File upload success!`);
  }
);

router.get("/userRecipes/:userId", verifyToken, RecipesController.userRecipes);
router.get(
  "/get-recipe/:recipeId",
  verifyToken,
  RecipesController.getRecipeById
);
router.get("/latestRecipes", RecipesController.getLastestRecipes);

module.exports = router;
