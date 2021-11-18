var express = require("express");
const user = require("../db/models/user");
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

  // handle user login using sequelize
  const db = req.app.locals.db;

  db.User.findOne({
    where: {
      email: req.body.email
    }
  })
  .then(user => {
    if (user.password === req.body.password) {
      res.send("It's alive"); 
    } else {
      res.send("Sorry bro...");
    }
  })

  .catch((err) => {
    console.log(err);
    res.render("login");
  })

  //initialize session
//   if (req.body.name === name && req.body.password === password) {
//     session = req.session;
//     session.userid = req.body.name;
//     return res.redirect("/");
//   } else {
//     res.render("login");
//   }
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
