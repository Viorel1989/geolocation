var express = require("express");
var router = express.Router();

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
  // handle bookmarks using sequelize
  const db = req.app.locals.db;

  db.Bookmark.create({
    userId: req.session.userId,
    name: req.body.bookmarkName,
    address: req.body.address,
  })
    .then((bookmarks) => {
      return res.json({ message: "Successfully added to bookmarks!" });
    })
    .catch((err) => {
      if (err instanceof db.Sequelize.ValidationError) {
        console.log(err);
        return res.json({ message: "Invalid name or address" }, 400);
      } else {
        console.log(err);
        next(err);
      }
    });
});

/* GET user's bookmarks */
router.get("/bookmarks", function (req, res, next) {
  const db = req.app.locals.db;

  // handle user bookmarks using sequelize
  db.Bookmark.findAll({
    where: {
      userId: req.session.userId,
    },
  })
    .then((bookmarks) => {
      return res.json({ bookmarks: bookmarks });
    })
    .catch((err) => {
      console.log(err);
      next(err);
    });
});

/*DELETE a bookmark */
router.delete("/bookmarks/:id", function (req, res, next) {
  const id = req.params.id;
  console.log(id);
  const db = req.app.locals.db;
  db.Bookmark.destroy({
    where: {
      userId: req.session.userId,
      id: id,
    },
  })
    .then(function () {
      return res.json({ ok: "ok" });
    })
    .catch(function (err) {
      if (err instanceof db.Sequelize.DatabaseError) {
        console.log(err);
        next(err);
      } else {
        console.info(`DELETE request failed: ${err.message}`);
        next(err);
      }
    });
});

module.exports = router;
