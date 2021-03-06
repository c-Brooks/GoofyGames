"use strict";

require('dotenv').config();

const PORT          = process.env.PORT || 8080;
const ENV           = process.env.ENV || "development";
const express       = require("express");
const bodyParser    = require("body-parser");
const cookieParser  = require('cookie-parser');
const sass          = require("node-sass-middleware");
const app           = express();

const knexConfig  = require("./knexfile");
const knex        = require("knex")(knexConfig[ENV]);
const morgan      = require('morgan');
const knexLogger  = require('knex-logger');

// Seperated Routes for each Resource
// Cookie Parser must be defined router
app.use(cookieParser());
const usersRoutes     = require("./routes/users");
const loginRoutes     = require("./routes/login");
const logoutRoutes    = require("./routes/logout");
const rankingsRoutes  = require("./routes/rankings");
const matchesRoutes   = require("./routes/matches");


// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));

// Log knex SQL queries to STDOUT as well
// app.use(knexLogger(knex));

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/styles", sass({
  src: __dirname + "/styles",
  dest: __dirname + "/public/styles",
  debug: true,
  outputStyle: 'expanded'
}));
app.use('/images', express.static(__dirname + "/public"));
app.use(express.static("public"));

// Mount all resource routes
app.use("/users",    usersRoutes(knex));
app.use("/login",    loginRoutes(knex));
app.use("/logout",   logoutRoutes(knex));
app.use("/rankings", rankingsRoutes(knex));
app.use("/matches",  matchesRoutes(knex));


// Home page
app.get("/", (req, res) => {
  var templateVars = { title: 'Login', my_id: req.cookies['user_id'] }
  if (req.cookies.user_id === undefined) {
    res.render("index", templateVars);
  } else {
    res.redirect('/matches', 302);
  }
});

app.listen(PORT, () => {
  console.log("Example app listening on port " + PORT);
});


