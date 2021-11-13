const express = require("express");
const router = express.Router();

const userController = require("../controllers/userController");
const authorityController = require("../controllers/authorityController");
const complainController = require("../controllers/complainController");

//route for going to homepage of the website
router.get("/", (req, res) => {
  res.render("mainhome");
});

router.get("/about", (req, res) => {
  res.render("about");
});

router.get("/contact", (req, res) => {
  res.render("contact");
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

router.get("/user/file_complaint", (req, res) => {
  if (
    process.env.userID == undefined ||
    process.env.userName == undefined ||
    process.env.userEmail == undefined
  ) {
    message = "session expired. Log in again";
    res.render("user_login", { message });
  } else {
    res.render("user_file_complaint");
  }
});

router.post("/auth/user_register", userController.registerUser);
router.post("/auth/user/login", userController.loginUser);
router.get("/user/dashboard", userController.findUser);

//Testing
/* Authorities */

// register authorities
router.post("/auth/authority_register", authorityController.registerAuthority);
//get all authorities
router.get("/Authorities", authorityController.getAllAuthorities);
// get authority by id--
router.get("/authority/dashboard", authorityController.findAuthority);
// login authorities by email - password
router.post("/auth/authority/login", authorityController.loginAuthority);
// update authority by id
router.put("/Authority/:id", authorityController.updateAuthority);
// delete authority by id
router.delete("/Authority/:id", authorityController.deleteAuhtority);

/* Complains */
router.get("/Complaints", complainController.getAllComplaints);
router.get("/user/view_complaints", complainController.findUserComplain);
router.get(
  "/authority/view_complaints",
  complainController.findLocalityComplain
);
router.post("/user/file_complaint/submit", complainController.registerComplain);
router.get(
  "/user/view_complaint/delete/:id",
  complainController.deleteComplain
);
router.get(
  "/authority/view_complaint/:status/:id",
  complainController.updateComplain
);

module.exports = router;
