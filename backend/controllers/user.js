//Import dependences
const User = require("../models/user")
const bcrypt = require("bcrypt")
//METHODS

//Method for register in Cookeate
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
    ]
  })

  //If exist = true send a response 200

  if(exist.length > 0) {
    return res.status(200).send({
      status:"success",
      message:"User exists, register with other email or nick"
    })
  }


  //We need encrypt with bcrypt the password with hash

  params.password = await bcrypt.hash(params.password, 10)
  let pwd = params.password
  console.log(pwd);

  //Create a new User with a new User model with params of the body
  const userCreated = new User(params)

  //Save userCreated

  try {
    await userCreated.save()
    return res.status(200).send({
      status:"success",
      message:"User is registered successfully"
    })
  } catch (error) {
    return res.status(400).send({
      status:"error",
      message:"User can't register"
    })
  }
 



};

module.exports = {
    register
}