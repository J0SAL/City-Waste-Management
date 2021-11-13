const express = require("express");
const router = express.Router();

const userController = require("../controllers/userController");
const authorityController = require("../controllers/authorityController");
const complainController = require("../controllers/complainController");

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

//Testing
/* Authorities */

// register authorities
router.post("/Authorities", authorityController.registerAuthority);
//get all authorities
router.get("/Authorities", authorityController.getAllAuthorities);
// get authority by id--
router.get("/Authority/id", authorityController.findAuthority);
// login authorities by email - password
router.post("/loginAuthority", authorityController.loginAuthority);
// update authority by id
router.put("/Authority/:id", authorityController.updateAuthority);
// delete authority by id
router.delete("/Authority/:id", authorityController.deleteAuhtority);

/* Complains */
router.get("/Complaints", complainController.getAllComplaints);
router.get("/ComplaintsID/:id", complainController.findUserComplain); //->not working
router.get(
  "/ComplaintsLocality/:locality",
  complainController.findLocalityComplain
);
router.post("/Complaints", complainController.registerComplain);
router.delete("/Complaints/:id", complainController.deleteComplain);
router.put("/Complain/:id", complainController.updateComplain);

module.exports = router;
