const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");
const app = express();

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

app.listen(5000, () => {
  console.log("Listening on port 5000");
});
