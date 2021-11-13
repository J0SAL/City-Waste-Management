const mongoose = require("mongoose");
const Authority = mongoose.model("Authorities");
const ObjectId = require("mongodb").ObjectId;

//get all Authorities
exports.getAllAuthorities = (req, res) => {
  Authority.find({}, (err, data) => {
    if (err) throw err;
    res.send(data);
  });
};

//register Authority
exports.registerAuthority = (req, res) => {
  const newAuthority = new Authority(req.body);
  newAuthority.save((err, data) => {
    if (err) throw err;
    res.json(data);
  });
};

//for login
exports.loginAuthority = (req, res) => {
  Authority.findOne({ email: req.body.email }, function (err, data) {
    if (err) throw err;
    if (data) {
      if (data.password === req.body.password) {
        process.env["authorityID"] = data._id;
        res.send(data);
      } else {
        res.send("Invalid Password");
      }
    } else {
      res.send("Invalid Email");
    }
  });
};

// find Authority
exports.findAuthority = (req, res) => {
  if (process.env.authorityID == undefined) {
    message = "session expired. Log in again";
    res.send({
      mess: message,
    });
    // res.render("authority_login", { message });
  } else {
    //   console.log("obj id in env ", process.env.authorityID);
    Authority.findOne(
      { _id: ObjectId(process.env.authorityID) },
      function (err, data) {
        if (err) throw err;
        // console.log(data);
        res.send(data);
      }
    );
  }
};
//updating authority data
//send only the data to be updated in key-value
exports.updateAuthority = (req, res) => {
  Authority.updateOne(
    { _id: req.params.id },
    { $set: req.body },
    function (err, data) {
      if (err) throw err;
      res.json(data); //acknowledgement
    }
  );
};

//deleting a Authority
//required id
exports.deleteAuhtority = (req, res) => {
  // delete the requested item from mongo db
  Authority.deleteOne({ _id: req.params.id }, function (err, data) {
    if (err) throw err;
    res.json(data);
  });
};
