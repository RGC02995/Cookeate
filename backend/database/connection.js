const mongoose = require("mongoose");

const connection = async() => {
  try {
    await mongoose.connect("mongodb://localhost:27017/cookeate");
    console.log("Is connected with database cookeate");
  } catch (error) {
    throw new Error("The conection with database cookeate is failed");
  }
};

module.exports = connection;
