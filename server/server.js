require('dotenv').config();
var express = require("express");
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const PORT = process.env.PORT || 3000; 

// Database setup (uncomment when database cluster has been made and .env DB value has been assigned)
require("./models/db.js");

var routes = require("./routes/routes");

app.use("/", routes);

app.listen(PORT, function() {
  console.log(`Express listening on port ${PORT}`);
});
