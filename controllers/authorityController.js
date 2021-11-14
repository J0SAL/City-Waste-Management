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
  if (req.body.password != req.body.confirmpassword) {
    message = "Password and confirm password doesnt match";
    res.render("authority_register", { message });
  } else {
    const newAuthority = new Authority();
    newAuthority.fullName = req.body.fullname;
    newAuthority.email = req.body.email;
    newAuthority.password = req.body.password;
    newAuthority.registeredArea = req.body.locality;
    newAuthority.save((err, data) => {
      if (err) throw err;
      else {
        message = "Register Successfull, please login";
        res.render("authority_login", { message });
      }
    });
  }
};

//for login
exports.loginAuthority = (req, res) => {
  Authority.findOne({ email: req.body.email }, function (err, data) {
    if (err) {
      message = "Authority cannot be found";
      res.render("authority_login", { message });
    }
    if (data) {
      if (data.password === req.body.password) {
        process.env["authorityID"] = data._id;
        process.env["area"] = data.registeredArea;
        res.redirect("/authority/dashboard");
      } else {
        message = "Incorrect Password";
        res.render("authority_login", { message });
      }
    } else {
      message = "Authority cannot be found";
      res.render("authority_login", { message });
    }
  });
};

// find Authority
exports.findAuthority = (req, res) => {
  if (process.env.authorityID == undefined || process.env.area == undefined) {
    message = "Session expired. Log in again";
    res.render("authority_login", { message });
  } else {
    Authority.findOne(
      { _id: ObjectId(process.env.authorityID) },
      function (err, rows) {
        if (err) {
          // console.log(err);
        } else {
          // console.log(rows);
          res.render("authority_dashboard", { rows });
        }
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
