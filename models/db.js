<<<<<<< HEAD
const mongoose = require("mongoose");

//Connect to the database
mongoose.connect(
  "mongodb+srv://octa-hack:octa-hack@octa-hacks-4.fkdso.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
  (err) => {
    if (err) console.log("DB Connection Error ", err);
    else console.log("DB Connection Succeeded");
  }
);
=======
const mongoose = require("mongoose");

//Connect to the database
mongoose.connect(
  "mongodb+srv://octa-hack:octa-hack@octa-hacks-4.fkdso.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
  (err) => {
    if (err) console.log("DB Connection Error ", err);
    else console.log("DB Connection Succeeded");
  }
);
>>>>>>> 3b0d4817aff8bf634af9a31cc4c779e8538181aa
