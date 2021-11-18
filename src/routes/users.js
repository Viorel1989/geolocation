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

  // handle user login using sequelize
  const db = req.app.locals.db;

  db.User.findOne({
    where: {
      email: req.body.email
    }
  })
  .then(user => {
    console.log(req.body.password);
    if (bcrypt.compareSync(req.body.password,user.password)) {
      session = req.session;
      session.userid = req.body.email;
      return res.redirect("/"); 
    } else {
      res.render("login");
    }
  })

  .catch((err) => {
    console.log(err);
    res.render("login");
  })

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
