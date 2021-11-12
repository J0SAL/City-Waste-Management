const mongoose = require("mongoose");
const Authority = mongoose.model("Authorities");
const ObjectId = require("mongodb").ObjectId;

exports.registerAuthority = (req, res) => {
  const newAuthority = new Authority(req.body);
  newAuthority.save((err, data) => {
    if (err) throw err;
    //env-> {data._id}
    res.json(data);
  });
};

//for login
exports.findAuthority = (req, res) => {
  Authority.find({ _id: ObjectId(req.params.id) }, function (err, data) {
    if (err) throw err;
    //get password {data.password}
    res.send(data);
  });
};
