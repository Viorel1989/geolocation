var express = require("express");
const user = require("../db/models/user");
var router = express.Router();
const bcrypt = require("bcrypt");
const bookmarks = require("../db/models/bookmarks");

let session;

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

/* GET login form. */
router.get("/login", function (req, res, next) {
  res.render("login", {
    loginError: req.flash("error").length > 0 ? true : false,
  });
});

/* POST login form data */
router.post("/login", function (req, res, next) {
  const db = req.app.locals.db;

  // handle user login using sequelize
  db.User.findOne({
    where: {
      email: req.body.email,
    },
  })
    .then((user) => {
      if (user !== null && user.validPassword(req.body.password) === true) {
        req.session.userId = user.id;
        req.session.name = user.name;
        return res.redirect("/");
      } else {
        req.flash("error", "loginError");
        return res.redirect("/users/login");
      }
    })
    .catch((err) => {
      console.log(err);
      next(err);
    });
});

/* GET registration form. */
router.get("/register", function (req, res) {
  res.render("register", {
    registerError: req.flash("error").length > 0 ? true : false,
  });
});

router.post("/register", function (req, res, next) {
  const db = req.app.locals.db;

  db.User.create({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: req.body.password,
  })
    .then((user) => {
      //after validating register show a firendly message on browser
      return res.redirect("/users/login");
    })
    .catch((err) => {
      if (err instanceof db.Sequelize.DatabaseError) {
        console.log(err);
        next(err);
      } else {
        console.log(err, typeof err);
        req.flash("error", "registerError");
        return res.redirect("/users/register");
      }
    });
});

/* Users logout route  */
router.get("/logout", function (req, res) {
  req.session.destroy();
  return res.redirect("/");
});

/* GET profile form. */
router.get("/profile", function (req, res, next) {
  const db = req.app.locals.db;

  // handle user login using sequelize
  db.User.findOne({
    where: {
      id: req.session.userId,
    },
  })
    .then((user) => {
      res.render("profile", {
        profileSuccess: req.flash("success").length > 0 ? true : false,
        profileError: req.flash("error").length > 0 ? true : false,
        firstName: user.firstName,
        lastName: user.lastName,
      });
    })
    .catch((err) => {
      console.log(err);
      next(err);
    });
});

router.post("/profile", function (req, res, next) {
  const db = req.app.locals.db;

  db.User.findOne({
    where: {
      id: req.session.userId,
    },
  })
    .then((user) => {
      const data = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
      };

      if (req.body.newPassword) {
        if (user.validPassword(req.body.oldPassword) === true) {
          data["password"] = req.body.newPassword;
        } else {
          req.flash("error", "profileError");
          return res.redirect("/users/profile");
        }
      }

      user
        .update(data)
        .then(() => {
          req.flash("success", "profileSuccess");
          return res.redirect("/users/profile");
        })
        .catch((err) => {
          if (err instanceof db.Sequelize.DatabaseError) {
            console.log(err);
            next(err);
          } else {
            console.log(err);
            req.flash("error", "profileError");
            return res.redirect("/users/profile");
          }
        });
    })
    .catch((err) => {
      console.log(err);
      next(err);
    });
});

/* POST bookmark form data */
router.post("/bookmarks", function (req, res, next) {
  let address = req.body.address;
  console.log(address);

  const db = req.app.locals.db;

  // handle bookmarks using sequelize
  db.bookmarks
    .findOrCreate({
      where: {
        address: address,
      },
      defaults: {
        userId: req.session.userId,
        name: req.session.name,
      },
    })
    .then(([bookmarks, created]) => {
      console.log(created);
      if (created) {
        return res.json({ message: "Succesfully added to bookmarks!" });
      } else {
        return res.json({ message: "Already bookmarked this address" });
      }
    })
    .catch((err) => {
      console.log(err);
      next(err);
    });
});

module.exports = router;
