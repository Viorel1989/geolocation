var express = require("express");
var router = express.Router();

// Set middleware for authenticated user redirect to index
const redirectHome = (req, res, next) => {
  if (req.session.userid) {
    res.render("index", { name: req.session.userid });
  } else {
    next();
  }
};

//Define dummy-data users
const name = "Viorel";
const password = "secret";

let session;

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

/* GET login form. */
router.get("/login", redirectHome, function (req, res) {
  res.render("login");
});

/* POST login form data */
router.post("/login", function (req, res) {
  if (req.body.name === name && req.body.password === password) {
    session = req.session;
    session.userid = req.body.name;
    res.render("index", { name: session.userid });
  } else {
    res.render("login");
  }
});

/* Users logout route  */
router.get("/logout", function (req, res) {
  req.session.destroy();
  res.redirect("/");
});

module.exports = router;
