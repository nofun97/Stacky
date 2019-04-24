require("dotenv").config();
var cors = require("cors");
var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var path = require("path");

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const PORT = process.env.PORT || 5000;

// Database setup (uncomment when database cluster has been made and .env DB value has been assigned)
require("./models/db.js");
var routes = require("./routes/routes");

app.use("/api", routes);

//Static file declaration
app.use(express.static(path.join(__dirname, "../client/build")));

//build mode
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

app.listen(PORT, function() {
  console.log(`Express listening on port ${PORT}`);
});
