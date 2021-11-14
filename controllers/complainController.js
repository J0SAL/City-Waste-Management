const mongoose = require("mongoose");
const Complain = mongoose.model("Complaints");
const User = mongoose.model("Users");
const ObjectId = require("mongodb").ObjectId;

//get all Complaints
exports.getAllComplaints = (req, res) => {
  Complain.find({}, function (err, data) {
    if (err) throw err;
    res.send(data);
  });
};

const setComplaintCount = () => {
  let count = 0;
  User.findOne({ _id: ObjectId(process.env.userID) }, function (err, rows) {
    if (err) {
      //console.log(err);
    } else {
      count = rows.complainCount;
      countObj = {
        complainCount: count + 1,
      };
      User.updateOne(
        { _id: ObjectId(process.env.userID) },
        { $set: countObj },
        function (err, data) {
          if (err) {
            //console.log(err);
          }
        }
      );
    }
  });
};

const deleteComplaintCount = () => {
  let count = 0;
  User.findOne({ _id: ObjectId(process.env.userID) }, function (err, rows) {
    if (err) {
      //console.log(err);
    } else {
      count = rows.complainCount;
      countObj = {
        complainCount: count - 1,
      };
      User.updateOne(
        { _id: ObjectId(process.env.userID) },
        { $set: countObj },
        function (err, data) {
          if (err) {
            //console.log(err);
          }
        }
      );
    }
  });
};

//1 register complain
exports.registerComplain = (req, res) => {
  if (
    process.env.userID == undefined ||
    process.env.userName == undefined ||
    process.env.userEmail == undefined
  ) {
    message = "session expired. Log in again";
    res.render("user_login", { message });
  } else {
    const newComplain = new Complain();
    newComplain.userId = process.env.userID;
    newComplain.userName = process.env.userName;
    newComplain.userEmail = process.env.userEmail;
    newComplain.message = req.body.message;
    newComplain.status = "pending";
    newComplain.locality = req.body.locality;
    newComplain.location = req.body.location;
    newComplain.imageUrl = req.body.image;
    newComplain.save((err, data) => {
      if (err) {
        //console.log(err);
      } else {
        setComplaintCount();
        //console.log("Successfully registered complaint");
        //console.log(data);
        res.redirect("/user/view_complaints");
      }
    });
  }
};

//2 delete complain by complain id
exports.deleteComplain = (req, res) => {
  if (
    process.env.userID == undefined ||
    process.env.userName == undefined ||
    process.env.userEmail == undefined
  ) {
    message = "session expired. Log in again";
    res.render("user_login", { message });
  } else {
    // delete the requested item from mongo db
    Complain.deleteOne({ _id: req.params.id }, function (err, data) {
      if (err) {
        //console.log(err);
      } else {
        //console.log(data);
        deleteComplaintCount();
        res.redirect("/user/view_complaints");
      }
    });
  }
};

//3 modify complain by compalain id
exports.updateComplain = (req, res) => {
  //console.log(req.params.status);
  let setstatus = "";
  if (req.params.status == "viewed") {
    setstatus = "User's Complaint has been viewed";
  } else if (req.params.status == "sendcleaning") {
    setstatus = "Cleaning process has been initiated";
  } else if (req.params.status == "reject") {
    setstatus = "User's Complaint has been Rejected";
  }
  let statu = {
    status: setstatus,
  };
  Complain.updateOne(
    { _id: req.params.id },
    { $set: statu },
    function (err, data) {
      if (err) throw err;
      res.redirect("/authority/view_complaints");
    }
  );
};

//4 get complain by user-id
exports.findUserComplain = (req, res) => {
  if (process.env.userID == undefined) {
    message = "Session expired, Please login again";
    res.render("user_login", { message });
  } else {
    //console.log(req.body.id);
    Complain.find(
      { userId: ObjectId(process.env.userID) },
      function (err, rows) {
        if (err) {
          res.render("user_view_complaint");
        } else {
          //console.log(rows);
          res.render("user_view_complaint", { rows });
        }
      }
    );
  }
};

//5 get complain by locality
exports.findLocalityComplain = (req, res) => {
  if (process.env.authorityID == undefined || process.env.area == undefined) {
    message = "Session expired. Log in again";
    res.render("authority_login", { message });
  } else {
    //console.log("Area : ",process.env.area);
    Complain.find({ locality: process.env.area }, function (err, rows) {
      if (err) {
        res.render("authority_view_complaints");
        //console.log(err);
      } else {
        //console.log(rows);
        res.render("authority_view_complaints", { rows });
      }
    });
  }
};
