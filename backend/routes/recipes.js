const RecipesController = require("../controllers/recipes");
const Recipe = require("../models/recipes");
const express = require("express");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const router = express.Router();
const verifyToken = require("../middleware/auth");
const path = require("path");
//Import Multer for update images:
const multer = require("multer");
const { Verify } = require("crypto");

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

// Ruta para obtener recetas por nombre en el input del componente Navbar
router.get("/recipes/:name", verifyToken, async (req, res) => {
  const { name } = req.params; // Access search term from query parameter
  console.log(name);
  try {
    // Buscar recetas que coincidan con el título (title)
    const recipes = await Recipe.find({
      title: { $regex: new RegExp(name, "i") },
    })
      .populate("user", "name email")
      .select("-ingredients");

    // Enviar las recetas como respuesta
    res.status(200).json({ recipes });
  } catch (error) {
    // Manejar el error
    console.error(error);
    res.status(500).json({ error: "Error al obtener las recetas" });
  }
});
//Obtener todas las recetas
router.get("/allRecipes", verifyToken, RecipesController.showAllRecipes);

module.exports = router;
