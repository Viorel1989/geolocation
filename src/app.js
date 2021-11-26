var createError = require("http-errors");
var express = require("express");
var path = require("path");
var sessions = require("express-session");
const redis = require("redis");
const connectRedis = require("connect-redis");
var flash = require("express-flash");
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

// redis session store setup

app.locals.redis = redis.createClient({
  url: process.env.REDIS_URL,
  legacyMode: true,
});

app.locals.redis.on("error", function (err) {
  throw err;
});

let RedisStore = connectRedis(sessions);

app.use(
  sessions({
    store: new RedisStore({ client: app.locals.redis }),
    resave: false,
    saveUninitialized: false,
    secret: process.env.SESSION_SECRET,
    cookie: {
      secure: false,
    },
  })
);

app.use(flash());

app.use(function (req, res, next) {
  if (
    !req.session.userId &&
    req.path !== "/users/login" &&
    req.path !== "/users/register"
  ) {
    return res.redirect("/users/login");
  } else if (req.session.userId && req.path === "/users/login") {
    return res.redirect("/");
  }
  app.locals.userId = req.session.userId;
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
  res.locals.message =
    req.app.get("env") === "development"
      ? err.message
      : "Internal Server Error";
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
