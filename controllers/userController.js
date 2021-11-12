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

exports.registerUser = (req, res) => {
  const newUser = new User(req.body);
  newUser.save((err, data) => {
    if (err) throw err;
    res.json(data);
  });
};

//for login
exports.loginUser = (req, res) => {
  User.findOne({ email: req.body.email }, function (err, data) {
    if (err) throw err;
    if (data) {
      if (data.password === req.body.password) {
        process.env["userID"] = data._id;
        res.send(data);
      } else {
        res.send("Invalid Password");
      }
    } else {
      res.send("Invalid Email");
    }
  });
};

// find user
exports.findUser = (req, res) => {
  if (process.env.userID == undefined) {
    message = "session expired. Log in again";
    res.render("user_login", { message });
  }
  //   console.log("obj id in env ", process.env.userID);
  User.findOne({ _id: ObjectId(process.env.userID) }, function (err, data) {
    if (err) throw err;
    // console.log(data);
    res.send(data);
  });
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
