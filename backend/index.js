// DEPENDENCES
const connection = require("./database/connection");
const express = require("express");
const path = require("path");
const cors = require("cors");
// CONNECT WITH DATABASE COOKEATE IN MONGODB
connection();

// CONNECT WITH NODE SERVER
const app = express();

// SELECT THE PORT WE ARE USE
const port = 5000;

// CONNECT WITH FRONTEND
app.use(cors());

// PASS THE BODY INFORMATION TO JSON FORMAT

// Transform info from body to JSON
app.use(express.json());

// Transform info from url to JSON
app.use(express.urlencoded({ extended: true }));

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

//Load config routes
const userRoutes = require("./routes/user");
app.use("/api/user", userRoutes); // Is the end porint to access at Methods of User
const recipeRoute = require("./routes/recipes");
app.use("/api/recipes", recipeRoute);
// const tokenRoute = require ("./middleware/auth")
// app.use("/token", tokenRoute) // Is the end porint to access at Methods of token

// LISTEN SERVER
app.listen(port, () => {
  console.log(
    `Node server do with Express dependence is running at port ${port}`
  );
});
