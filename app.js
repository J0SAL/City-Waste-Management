const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");
const app = express();

require("./models/db");
// const userController = require("./controllers/userController");
// const authController = require("./controllers/authController");
// const authorityController = require("./controllers/authorityController");

dotenv.config({
  path: "./.env",
});

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//public directory for assets
const publicDirectory = path.join(__dirname, "./public");
app.use(express.static(publicDirectory));

//set handlebars as the view engine
app.set("view engine", "hbs");

//define Routes

//pages for user and authority routes
app.use("/", require("./routes/pages"));

//auth for login and register routes
app.use("/auth", require("./routes/auth"));

// userController(app);
// authController(app);
// authorityController(app);

app.listen(process.env.PORT || 5000, () => {
  console.log("Listening on port 5000");
});
