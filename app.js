const express = require("express");
const app = express();

require("./models/db");

// listen to port
app.listen(3000);
console.log("You are listening to post 3000");
