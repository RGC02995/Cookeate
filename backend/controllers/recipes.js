const Recipes = require("../models/recipes");

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
      status: "success",
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
    console.log(req.file);
    // Verificar si el archivo existe
    if (!req.file) {
      return res.status(500).send({
        status: "error",
        message: "File not uploaded",
      });
    }

    // Obtener el nombre del archivo
    const image = req.file.filename;
    console.log(image);
    // Obtener la extensión del archivo
    const extension = image.split(".").pop().toLowerCase();

    // Verificar la extensión del archivo (png, jpg, jpeg, gif)
    const validExtensions = ["png", "jpg", "jpeg", "webp"];
    if (!validExtensions.includes(extension)) {
      // Eliminar el archivo incorrecto antes de cargarlo
      const filePath = req.file.path;
      fs.unlinkSync(filePath);

      return res.status(400).send({
        status: "error",
        message: "Invalid extension",
      });
    }

    // Guardar el archivo (si es correcto)
    const recipeId = req.user.id;
    const recipeUpdated = await Recipes.findOneAndUpdate(
      { _id: recipeId },
      { images: req.file.filename },
      { new: true } // true para devolver la receta actualizada
    );

    if (!recipeUpdated) {
      return res.status(500).send({
        status: "error",
        message: "Recipe not found",
      });
    }

    // RESPUESTA EXITOSA
    return res.status(200).send({
      status: "success",
      recipe: recipeUpdated,
      file: req.file,
    });
  } catch (error) {
    // Manejar errores específicos
    if (error) {
      return res.status(500).send({
        status: "error",
        message: "File not found",
        error: error.message,
      });
    }

    // Otros errores
    return res.status(500).send({
      status: "error",
      message: "Error in the upload process",
      error: error.message,
    });
  }
};

module.exports = {
  saveRecipe,
  uploadImage,
};
