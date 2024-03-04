//Import Dependences
const express = require("express");
const router = express.Router();
const RecipesController = require("../controllers/recipes");
const auth = require("../middleware/auth");

//Import Multer for update images:
const multer = require("multer");

//CONF UPDATE MULTER
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads/recipes");
  },
  filename: (req, file, cb) => {
    cb(null, "recipes " + Date.now + "-" + file.originalname);
  },
});

const uploads = multer({ storage });

//ROUTES

router.post("/save", auth, RecipesController.saveRecipe);
router.post(
  "/uploadImage",
  [ auth , uploads.single("file0")],
  RecipesController.uploadImage
);


module.exports = router;
