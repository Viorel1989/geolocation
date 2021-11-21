var express = require("express");
const user = require("../db/models/user");
var router = express.Router();
const bcrypt = require("bcrypt");

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
  const db = req.app.locals.db;

  // handle user login using sequelize
  db.User.findOne({
    where: {
      email: req.body.email
    }
  })
  .then(user => {
    if (user !== null && user.validPassword(req.body.password) === true) {
      req.session.userId = user.id;
      return res.redirect("/"); 
    } else {
      return res.redirect("users/login");
    }
  })
  .catch((err) => {
    console.log(err);
    next(error);
  });
 });

/* GET registration form. */
router.get("/register", function (req, res) {
  res.render("register");
});

/* Users logout route  */
router.get("/logout", function (req, res) {
  req.session.destroy();
  return res.redirect("/");
});

module.exports = router;
