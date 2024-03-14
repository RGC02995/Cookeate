const fs = require("fs");
const Recipes = require("../models/recipes");

const saveRecipeWithImage = async (req, res) => {
  try {
    const params = req.body;
    console.log(params.food); // For debugging purposes

    if (!params.title || !params.food || !params.guide) {
      return res.status(400).send({
        status: "error",
        message: "All fields are required.",
      });
    }

    // Validate image file (optional, based on your requirements)
    if (req.file) {
      const allowedExtensions = ["png", "jpg", "jpeg", "webp"];
      const extension = req.file.originalname.split(".").pop().toLowerCase();
      if (!allowedExtensions.includes(extension)) {
        fs.unlinkSync(req.file.path); // Remove invalid file
        return res.status(400).send({
          status: "error",
          message: "Invalid file extension.",
        });
      }
    }

    // Convert params.food to an array (assuming it's a comma-separated string)
    const foodArray = params.food.split(",");

    // Trim leading/trailing whitespaces from each ingredient
    const trimmedFoodArray = foodArray.map((ingredient) => ingredient.trim());

    let newRecipe = new Recipes({
      ...params, // Include all other properties from params
      food: trimmedFoodArray, // Use the converted food array
    });
    newRecipe.user = req.user.id;

    const recipeSaved = await newRecipe.save();

    if (!recipeSaved) {
      return res.status(400).send({
        status: "error",
        message: "Error saving recipe",
      });
    }

    // Handle image upload, if any
    if (req.file) {
      const imageFilename = req.file.filename;
      const recipeId = recipeSaved._id;

      // Update recipe with image path
      const recipeUpdated = await Recipes.findOneAndUpdate(
        { _id: recipeId },
        { images: imageFilename },
        { new: true } // true to return the updated recipe
      );

      if (!recipeUpdated) {
        return res.status(500).send({
          status: "error",
          message: "Recipe not found",
        });
      }

      return res.status(200).send({
        status: "success",
        message: "Recipe and image uploaded successfully",
        recipe: recipeUpdated,
        file: req.file,
      });
    } else {
      // Recipe saved without image
      return res.status(200).send({
        status: "success",
        message: "Recipe saved successfully",
        recipe: recipeSaved,
      });
    }
  } catch (error) {
    console.error(error.message);
    return res.status(500).send({
      status: "error",
      message: "Error in the request",
    });
  }
};
const userRecipes = async (req, res) => {
  try {
    const userId = req.user.id; // Obtener el ID del usuario de los parámetros de ruta

    // Busca todas las recetas creadas por el usuario con el ID proporcionado
    const recipes = await Recipes.find({ user: userId });

    // Devuelve las recetas encontradas como respuesta
    return res.status(200).json({
      status: "success",
      message: "Recipes retrieved successfully",
      recipes: recipes,
    });
  } catch (error) {
    console.error("Error al obtener las recetas del usuario:", error);
    return res.status(500).json({
      status: "error",
      message: "Internal server error",
    });
  }
};
module.exports = {
  saveRecipeWithImage,
  userRecipes,
};
