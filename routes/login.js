var express = require("express");
var router = express.Router();

// set dummy store for registerd users
const users = [
  { id: 1, name: "Viorel", password: "secret" },
  { id: 2, name: "Viorel2", password: "secret" },
];

// Set middleware for authenticated user redirect to index
const redirectHome = (req, res, next) => {
  if (req.session.id) {
    res.render("/");
  } else {
    next();
  }
};

/* GET login form. */
router.get("/", redirectHome, function (req, res) {
  res.render("login");
});

/* POST login form data */
router.post("/", function (req, res) {
  const { name, password } = req.body;

  if (name && password) {
    const user = users.find(
      (user) => user.name === name && user.password === password
    );

    if (user) {
      req.session.id = user.id;
      return res.render("index");
    }
  }
  res.redirect("/");
});

module.exports = router;
