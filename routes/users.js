var express = require("express");
var session = require("express-session");
var router = express.Router();

// Set middleware for authenticated user redirect to index
const redirectHome = (req, res, next) => {
  if (req.session.userid) {
    res.render("index");
  } else {
    next();
  }
};

//Define dummy-data users
const users = [
  { id: 1, name: "Viorel", password: "secret" },
  { id: 2, name: "Viorel2", password: "secret" },
];

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
  const { name, password } = req.body;

  if (name && password) {
    const user = users.find(
      (user) => user.name === name && user.password === password
    );

    if (user) {
      req.session.userid = user.id;
      return res.render("index", { user: user.name });
    }
  }
  res.redirect("/");
});

/* Users logout route  */
router.get("/logout", function (req, res) {
  req.session.destroy();
  res.redirect("/");
});

module.exports = router;
