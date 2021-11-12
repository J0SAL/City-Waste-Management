const mongoose = require("mongoose");
const { serializeInteger } = require("whatwg-url");

//Connect to the database
mongoose.connect(
  "mongodb+srv://octa-hack:octa-hack@octa-hacks-4.fkdso.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
  (err) => {
    if (err) console.log("DB Connection Error ", err);
    else console.log("DB Connection Succeeded");
  }
);

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
