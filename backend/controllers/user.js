//Import dependences
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("../services/jwt");
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
  console.log(pwd);

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
        .send({ status: "error", message: "Not found the same password" });
    }

    //Create a token when user has login

    const token = jwt.createToken(user);

    return res.status(200).send({
      status: "success",
      message: "User is logged",
      user: {
        id: user._id,
        name: user.name,
        nick: user.nick,
        image: user.image,
      },
      token,
    });
  } catch (error) {
    return res.status(500).send({ status: "error", message: "Failed Login" });
  }
};

//Method POST for uploadImage
//Rute /uploadImage
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

    //Obtain file extension
    const imageSplit = image.split(".");
    const extension = imageSplit[1].toLowerCase();

    //Check file extension and remove is it no correct (png, jpg, jpeg, gif)
    if (
      extension !== "png" &&
      extension !== "jpg" &&
      extension !== "jpeg" &&
      extension !== "gif"
    ) {
      //Delete incorrect file
      const filePath = req.file.path;
      fs.unlinkSync(filePath); // Elimina antes de subir

      return res.status(400).send({
        status: "error",
        message: "Invalid extension",
      });
    }

    //Save file (if it is correct)
    const userUpdated = await User.findByIdAndUpdate(
      { _id: req.user.id },
      { image: req.file.filename },
      { new: true } // new: true para devolver el nuevo usuario
    );

    if (!userUpdated) {
      return res.status(500).send({
        status: "error",
        message: "Error saving image",
      });
    }

    //RETURN RESPONSE
    return res.status(200).send({
      status: "success",
      user: userUpdated,
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
  register,
  login,
  uploadImage
};
