//Import dependences
require("dotenv").config();
const User = require("../models/user");
const bcrypt = require("bcrypt");
// const jwt = require("../services/jwt");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const user = require("../models/user");

//METHODS

//Method POST for register
//Rute /register
const register = async (req, res) => {
  //Obtein params from the body
  let params = req.body;
  //Check that the parameters are arriving correctly from the body

  if (!params.name || !params.nick || !params.email || !params.password) {
    return res
      .status(400)
      .send({ status: "error", message: "No data to be sent" });
  }

  // We check that the user exist in db
  const exist = await User.find({
    $or: [
      { email: params.email.toLowerCase() },
      { nick: params.nick.toLowerCase() },
    ],
  });

  //If exist = true send a response 400

  if (exist.length > 0) {
    return res.status(400).send({
      status: "error",
      message: "User exists, register with other email or nick",
    });
  }

  //We need encrypt with bcrypt the password with hash

  params.password = await bcrypt.hash(params.password, 10);
  let pwd = params.password;

  //Create a new User with a new User model with params of the body
  const userCreated = new User(params);

  //Save userCreated

  try {
    await userCreated.save();
    return res.status(200).send({
      status: "success",
      message: "User is registered successfully",
    });
  } catch (error) {
    return res.status(400).send({
      status: "error",
      message: "User can't register",
    });
  }
};

//Method POST for login
//Rute /login
const login = async (req, res) => {
  //Get all params of the body
  let params = req.body;
  //Check the params from the body
  if (!params.email || !params.password) {
    return res
      .status(500)
      .send({ status: "error", message: "No se ha recibido ningún parámetro" });
  }

  try {
    //We going to find in a database ONE user with the same params that the body
    const user = await User.findOne({ email: params.email });
    if (!user) {
      return res.status(400).send({
        status: "error",
        message: "Have not a same user",
      });
    }

    //Compare passwords with bcrypt
    const pwd = await bcrypt.compareSync(params.password, user.password);

    if (!pwd) {
      return res
        .status(404)
        .json({ status: "error", message: "Not found the same password" });
    }

    //Create a token when user has login
    // const token = jwt.createToken(user);
    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "60m" }
    );
    return res.status(200).json({
      status: "success",
      message: "User is logged",
      token,
    });
    const userId = localStorage.getItem("id");
  } catch (error) {
    return res.status(500).json({ status: "error", message: "Failed Login" });
  }
};

//Method POST for uploadImage
//Rute /uploadImage
const uploadImage = async (req, res) => {
  try {
    // Check if req.file is available
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    // Get the user ID from the request token
    const userId = req.user.id; // Assuming the authenticated user ID is available in req.user
    // Get the filename of the uploaded image
    const filename = req.file.filename; // Assuming multer adds 'filename' property to req.file
    // Update the user document in the database with the image filename
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { img: filename },
      { new: true }
    );

    // If user not found
    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    // Send success response with updated user data
    res.status(200).json({
      status: "success",
      message: "image has been uploaded",
      updatedUser,
    });
  } catch (error) {
    console.error("Error uploading image:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

//Method get for uploadImage
//Rute /getImage
const getImage = (req, res) => {
  try {
    const imageName = req.params.imageName; // Obtener el nombre de la imagen de los parámetros de la URL
    const imagePath = path.join(__dirname, "../uploads/", imageName); // Ruta completa de la imagen

    // Verificar si el archivo existe
    if (!fs.existsSync(imagePath)) {
      return res.status(400).json({ message: "Image not found" });
    }

    // Leer la imagen y enviarla como respuesta
    const imageStream = fs.createReadStream(imagePath);
    imageStream.pipe(res);
  } catch (error) {
    console.error("Error:", error);
    return res
      .status(500)
      .json({ message: "Error retrieving image", error: error.message });
  }
};

//Method GET for obtein profile
//Rute /profile/:id
const profile = async (req, res) => {
  try {
    // Obtener el usuario actual basado en la información del token
    const userId = req.user.id;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).send({
        status: "error",
        message: "Usuario no encontrado",
      });
    }

    // Devolver la información del perfil del usuario
    return res.status(200).send({
      status: "success",
      user: {
        id: user.id,
        name: user.name,
        bio: user.bio,
        nick: user.nick,
        email: user.email,
        image: user.image,
        created_date: user.created_date,
        // Otros campos del usuario que desees incluir en el perfil
      },
    });
  } catch (error) {
    return res.status(500).send({
      status: "error",
      message: "Error al obtener el perfil del usuario",
      error: error.message,
    });
  }
};
//Method PUT to change email
// Endpoint: /change-email
const changeEmail = async (req, res) => {
  try {
    // Obtener el usuario actual basado en la información del token
    const userId = req.user.id;
    const user = await User.findById(userId);
    console.log(`Este es el user: ${user}`);
    if (!user) {
      return res.status(404).json({
        status: "error",
        message: "No se ha encontrado el usuario",
      });
    }

    // Obtener el nuevo email
    const newEmail = req.body.email;

    console.log(`Este es el nuevo email:${newEmail}`);

    // Actualizar el email por el nuevo y gaurdarlo
    user.email = newEmail;
    await user.save();

    return res.status(200).json({
      status: "success",
      message: "Dirección de correo electrónico actualizada correctamente",
      user: user,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: "error",
      message: "Error interno del servidor",
    });
  }
};
//Method DELETE to delete account
// Endpoint: /delete-user
const deleteAccount = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findByIdAndDelete(userId);

    if (!user) {
      return res.status(404).json({
        status: "error",
        message: "No se ha encontrado el usuario para eliminar",
      });
    }

    return res.status(200).json({
      status: "success",
      message:
        "La cuenta ha sido eliminada correctamente. Esperamos verle pronto.",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: "error",
      message: "Error interno del servidor al intentar eliminar la cuenta",
    });
  }
};
//Method PUT to change email
// Endpoint: /change-password
const changePassword = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        status: "error",
        message: "No se ha encontrado el usuario",
      });
    }

    // Extraigo los parametros oldPassword y newpassword que vienen desde body
    const { oldPassword, newPassword } = req.body;

    //  verifico con la funcion comparePassword de bcrypt la vieja contraseña
    const isPasswordValid = await user.comparePassword(oldPassword);

    if (!isPasswordValid) {
      return res.status(400).json({
        status: "error",
        message: "La contraseña actual no es válida",
      });
    }

    // Sustituyo la contraseña que habia por la nueva contraseña que viene por el body
    user.password = newPassword;
    await user.save();

    return res.status(200).json({
      status: "success",
      message: "Contraseña actualizada correctamente",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: "error",
      message: "Error interno del servidor al intentar cambiar la contraseña",
    });
  }
};

module.exports = {
  register,
  login,
  uploadImage,
  getImage,
  profile,
  changeEmail,
  deleteAccount,
  changePassword,
};
