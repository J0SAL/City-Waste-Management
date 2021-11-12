const mongoose = require("mongoose");

//Connect to the database
mongoose.connect(
  "mongodb+srv://octa-hack:octa-hack@octa-hacks-4.fkdso.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
  (err) => {
    if (err) console.log("DB Connection Error ", err);
    else console.log("DB Connection Succeeded");
  }
);