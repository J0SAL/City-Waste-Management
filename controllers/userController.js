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
    //env-> {data._id}
    res.json(data);
  });
};

//for login
exports.findUser = (req, res) => {
  User.find({ _id: ObjectId(req.params.id) }, function (err, data) {
    if (err) throw err;
    //get password {data.password}
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

// module.exports = (app) => {
//   app.get("/users", getAllUsers);
//   app.post("/", registerUser);
//   app.get("/:id", findUser);
//   app.put("/:id", updateUser);
//   app.delete("/:id", deleteUser);
// };
