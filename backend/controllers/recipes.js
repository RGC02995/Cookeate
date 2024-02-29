const Recipes = require("../models/recipes")

const saveRecipe = async (req, res) => {
    try {
      const params = req.body;
  
      if (!params.title && !params.food && !params.guide) {
        return res.status(400).send({
          status: "error",
          message: "All fields are required.",
        });
      }
    
      let newRecipe = new Recipes(params);
      newRecipe.user = req.user.id; 
  
      
      const recipedSaved = await newRecipe.save();
  
      if (!recipedSaved) {
        return res.status(400).send({
          status: "error",
          message: "Error guardando la receta",
        });
      }
  
      return res.status(200).send({
        message: "Receta publicada.",
        recipedSaved,
      });
    } catch (error) {
      return res.status(500).send({
        status: "error",
        message: "Error en la petición",
        error: error.message,
      });
    }
  };

  const uploadImage = async (req, res) => {
    try {
        // Check if the file exists
        if (!req.file) {
            return res.status(404).send({
                status: "error",
                message: "File not uploaded",
            });
        }

        // Obtain file name.
        let image = req.file.filename;

        // Obtain file extension
        const imageSplit = image.split(".");
        const extension = imageSplit[1].toLowerCase();

        // Check file extension and remove if it's not correct (png, jpg, jpeg, gif)
        if (
            extension !== "png" &&
            extension !== "jpg" &&
            extension !== "jpeg" &&
            extension !== "gif"
        ) {
            // Delete incorrect file before uploading
            const filePath = req.file.path;
            fs.unlinkSync(filePath);

            return res.status(400).send({
                status: "error",
                message: "Invalid extension",
            });
        }

        // Save file (if it is correct)
        const recipeId = req.user.id; // Assuming req.user.id is the recipe ID
        const recipeUpdated = await Recipes.findOneAndUpdate(
            { _id: recipeId },
            { images: req.file.filename },
            { new: true } // new: true to return the updated recipe
        );

        if (!recipeUpdated) {
            return res.status(404).send({
                status: "error",
                message: "Recipe not found",
            });
        }

        // RETURN RESPONSE
        return res.status(200).send({
            status: "success",
            recipe: recipeUpdated,
            file: req.file,
            files: req.files,
        });
    } catch (error) {
        return res.status(500).send({
            status: "error",
            message: "Error in the upload process",
            error: error.message,
        });
    }
};


  module.exports = {
    saveRecipe,
    uploadImage
  }