const express = require("express");
const router = express.Router();

const userController = require("../controllers/userController");

//route for going to homepage of the website
router.get("/", (req, res) => {
  //   res.render("mainhome");
  res.render("user_dashboard");
});

//route to go to authority login page
router.get("/login_authority", (req, res) => {
  res.render("authority_login");
});

//route to go to user register page
router.get("/user_register", (req, res) => {
  res.render("user_register");
});

//route to go to authority register page
router.get("/authority_register", (req, res) => {
  res.render("authority_register");
});

//route to go to user login page
router.get("/login_user", (req, res) => {
  res.render("user_login");
});

router.post("/auth/user_register", userController.registerUser);
router.post("/auth/user/login", userController.loginUser);
router.get("/auth/user/dashboard", userController.findUser);
module.exports = router;
