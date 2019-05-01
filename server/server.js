require("dotenv").config();
var cors = require("cors");
var express = require("express");
var session = require("express-session");
var app = express();
var bodyParser = require("body-parser");
var path = require("path");
var passport = require("passport");

app.use(cors());
app.use(require("morgan")("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  session({
    secret: "stacky",
    cookie: { maxAge: 60000 },
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());

const PORT = process.env.PORT || 5000;

// Database setup (uncomment when database cluster has been made and .env DB value has been assigned)
require("./models/db.js");
require("./config/passport.js");
require("./config/pagination.js");
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

app.use(function(err, req, res, next) {
  res.redirect("/");
});
