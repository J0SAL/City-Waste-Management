const mongoose = require("mongoose");
const Complain = mongoose.model("Complaints");
const ObjectId = require("mongodb").ObjectId;

//get all Complaints
exports.getAllComplaints = (req, res) => {
  Complain.find({}, function (err, data) {
    if (err) throw err;
    res.send(data);
  });
};

//1 register complain
exports.registerComplain = (req, res) => {
  const newComplain = new Complain(req.body);
  newComplain.save((err, data) => {
    if (err) throw err;
    res.json(data);
  });
};

//2 delete complain by complain id
exports.deleteComplain = (req, res) => {
  // delete the requested item from mongo db
  Complain.deleteOne({ _id: req.params.id }, function (err, data) {
    if (err) throw err;
    res.json(data);
  });
};

//3 modify complain by compalain id
exports.updateComplain = (req, res) => {
  Complain.updateOne(
    { _id: req.params.id },
    { $set: req.body },
    function (err, data) {
      if (err) throw err;
      res.json(data); //acknowledgement
    }
  );
};

//4 get complain by user-id
exports.findUserComplain = (req, res) => {
  console.log(req.body.id);
  Complain.find({ userId: ObjectId(req.params.id) }, function (err, data) {
    if (err) throw err;
    res.send(data);
  });
};

//5 get complain by locality
exports.findLocalityComplain = (req, res) => {
  Complain.find({ locality: req.params.locality }, function (err, data) {
    if (err) throw err;
    res.send(data);
  });
};
