var express = require("express");
const axios = require("axios").default;
var router = express.Router();

// Set middleware for unregistered users
const redirectLogin = (req, res, next) => {
  if (!req.session.userid) {
    res.render("login");
  } else {
    next();
  }
};

/* GET home page. */
router.get("/", redirectLogin, function (req, res, next) {
  res.render("index", { name: req.session.userid });
});

router.post("/", function (req, res, next) {
  const address = req.body.address;
  console.log(address);

  if (address === "") {
    res.render("index", { address: address });
  } else {
    console.log("Call Geoapify");

    axios
      .get("https://api.geoapify.com/v1/geocode/search", {
        params: {
          text: address,
          apiKey: process.env.GEOAPIFY_API_KEY,
        },
      })
      .then(function (response) {
        console.log(response);
        let result = [];

        response.data.features.forEach(function (feature) {
          const text = `${feature.properties.address_line1}, ${feature.properties.city}, ${feature.properties.state}, ${feature.properties.country}`;
          result.push(text);
        });

        if (req.xhr) {
          res.json({ address: address, result: result });
        } else {
          res.render("index", { address: address, result: result });
        }
      })
      .catch(function (error) {
        console.error(`Geoapify error: ${JSON.stringify(error.response.data)}`);

        if (req.xhr) {
          res.status(502).json({});
        } else {
          res.render("index", { address: address, err: Error });
        }
      });
  }
});

module.exports = router;
