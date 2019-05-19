require("dotenv").config();
var cors = require("cors");
var express = require("express");
var session = require("express-session");
var app = express();
var bodyParser = require("body-parser");
var path = require("path");
var passport = require("passport");
var MemoryStore = require('memorystore')(session)

app.use(cors({ credentials: true, origin: "http://localhost:3000" }));

app.use(require("morgan")("dev"));
app.use(express.static("public"));
app.use(
  session({
    secret: "stacky-chan", //pick a random string to make the hash that is generated secure
    resave: false, //required
    saveUninitialized: false, //required
    store: new MemoryStore({
      checkPeriod: 86400000
    }), 
    cookie: {
      maxAge: Date.now() + (30 * 86400 * 1000)
    },
  })
);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
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
