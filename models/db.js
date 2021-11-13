const mongoose = require("mongoose");
require("dotenv").config();
//Connect to the database
mongoose.connect(process.env.DB_CONN, (err) => {
  if (err) console.log("DB Connection Error ", err);
  else console.log("DB Connection Succeeded");
});

//Create schema - this is like a blueprint
const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: "This field is required.",
    },
    password: {
      type: String,
      required: "This field is required.",
    },
    email: {
      type: String,
    },
    locality: {
      type: String,
    },
    complainCount: {
      type: Number,
    },
  },
  { versionKey: false }
);

const authoritySchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: "This field is required.",
    },
    password: {
      type: String,
      required: "This field is required.",
    },
    email: {
      type: String,
    },
    registeredArea: {
      type: String,
    },
  },
  { versionKey: false }
);

const complainSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
    },
    userName: {
      type: String,
    },
    message: {
      type: String,
    },
    status: {
      type: String,
    },
    userEmail: {
      type: String,
    },
    locality: {
      type: String,
    },
    location: {
      // detailed
      type: String,
    },
    imageUrl: {
      type: String,
    },
  },
  { versionKey: false }
);

mongoose.model("Users", userSchema);
mongoose.model("Authorities", authoritySchema);
mongoose.model("Complaints", complainSchema);
