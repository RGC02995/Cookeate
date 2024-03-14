const fs = require("fs");
const Recipes = require("../models/recipes");

const saveRecipeWithImage = async (req, res) => {
  try {
    const params = req.body;

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

    let newRecipe = new Recipes(params);
    newRecipe.user = req.user.id;

    const recipedSaved = await newRecipe.save();

    if (!recipedSaved) {
      return res.status(400).send({
        status: "error",
        message: "Error saving recipe",
      });
    }

    if (req.file) {
      // Update recipe with image path
      const recipeId = recipedSaved._id;
      const recipeUpdated = await Recipes.findOneAndUpdate(
        { _id: recipeId },
        { images: req.file.filename },
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
        recipe: recipedSaved,
      });
    }
  } catch (error) {
    console.error(error.message); // Log the entire error message
    return res.status(500).send({
      status: "error",
      message: "Error in the request",
    });
  }
};

module.exports = {
  saveRecipeWithImage,
};
