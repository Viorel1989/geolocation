var express = require("express");
var router = express.Router();

//Define dummy-data users
const name = "Viorel";
const password = "secret";

let session;

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

/* GET login form. */
router.get("/login", function (req, res) {
  res.render("login");
});

/* POST login form data */
router.post("/login", function (req, res) {
  if (req.body.name === name && req.body.password === password) {
    session = req.session;
    session.userid = req.body.name;
    return res.redirect("/");
  } else {
    res.render("login");
  }
});

/* Users logout route  */
router.get("/logout", function (req, res) {
  req.session.destroy();
  return res.redirect("/");
});

module.exports = router;
