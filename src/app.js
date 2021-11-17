var createError = require("http-errors");
var express = require("express");
var path = require("path");
var sessions = require("express-session");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
require("dotenv").config();

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

//initiate db connection with sequelize
app.locals.db = require('./db/models');

//test connection
app.locals.db.sequelize.authenticate().then(() => {
  console.log("Connecation established succesfully.");
}).catch(err => {
  console.error("Unable to connect to database:", err)
});

const SESS_LIFETIME = 1000 * 60 * 60 * 2;

app.use(
  sessions({
    name: "sid",
    resave: false,
    saveUninitialized: false,
    secret: "secret",
    cookie: {
      maxAge: SESS_LIFETIME,
    },
  })
);

app.use(function (req, res, next) {
  if (!req.session.userid && req.path !== "/users/login" && req.path !== "/users/register") {
    return res.redirect("/users/login");
  } else if (req.session.userid && req.path === "/users/login") {
    return res.redirect("/");
  }
  next();
});

app.use("/", indexRouter);
app.use("/users", usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
