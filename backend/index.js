// DEPENDENCES
const connection = require("./database/connection");
const express = require("express");
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
app.use(express.json())

    // Transform info from url to JSON
app.use(express.urlencoded({extended:true}))

// LISTEN SERVER
app.listen(port, () => {
  console.log(
    `Node server do with Express dependence is running at port ${port}`
  );
});
