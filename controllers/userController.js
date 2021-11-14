//used for user management requests
const mongoose = require("mongoose");
const User = mongoose.model("Users");
const ObjectId = require("mongodb").ObjectId;

//get all users
exports.getAllUsers = (req, res) => {
  User.find({}, function (err, data) {
    //{}- fetch everything
    if (err) throw err;
    res.send(data);
  });
};

//register User
exports.registerUser = (req, res) => {
  if (req.body.password != req.body.confirmpassword) {
    message = "Password and confirm password doesnt match";
    res.render("user_register", { message });
  } else {
    const newUser = new User();
    newUser.fullName = req.body.fullname;
    newUser.password = req.body.password;
    newUser.email = req.body.email;
    newUser.locality = req.body.locality;
    newUser.complainCount = 0;

    newUser.save((err, data) => {
      if (err) throw err;
      else {
        message = "Register Successfull, please login";
        res.render("user_login", { message });
      }
    });
  }
};

//for login
exports.loginUser = (req, res) => {
  // //console.log(req.body);
  // res.render("user_login");
  User.findOne({ email: req.body.email }, (err, data) => {
    if (err) {
      message = "User cannobe be found";
      res.render("user_login", { message });
    } else {
      if (data) {
        if (data.password === req.body.password) {
          process.env["userID"] = data._id;
          process.env["userName"] = data.fullName;
          process.env["userEmail"] = data.userEmail;
          res.redirect("/user/dashboard");
        } else {
          message = "User cannobe be found";
          res.render("user_login", { message });
        }
      } else {
        message = "User cannobe be found";
        res.render("user_login", { message });
      }
    }
  });
};

// find user
exports.findUser = (req, res) => {
  if (
    process.env.userID == undefined ||
    process.env.userName == undefined ||
    process.env.userEmail == undefined
  ) {
    message = "session expired. Log in again";
    res.render("user_login", { message });
  } else {
    //   //console.log("obj id in env ", process.env.userID);
    User.findOne({ _id: ObjectId(process.env.userID) }, function (err, rows) {
      if (err) {
        //console.log(err);
      } else {
        //console.log(rows);
        res.render("user_dashboard", { rows });
      }
    });
  }
};
//updating user data
//send only the data to be updated in key-value
exports.updateUser = (req, res) => {
  User.updateOne(
    { _id: req.params.id },
    { $set: req.body },
    function (err, data) {
      if (err) throw err;
      res.json(data); //acknowledgement
    }
  );
};

//deleting a user
//required id
exports.deleteUser = (req, res) => {
  // delete the requested item from mongo db
  User.deleteOne({ _id: req.params.id }, function (err, data) {
    if (err) throw err;
    res.json(data);
  });
};
/*
module.exports = (app) => {
  app.get("/users", getAllUsers);
  app.post("/", registerUser);
  app.get("/:id", findUser);
  app.put("/:id", updateUser);
  app.delete("/:id", deleteUser);
};
*/
