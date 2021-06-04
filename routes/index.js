var express = require("express");
const axios = require("axios").default;
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index");
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
        console.error(`Geoapify error: ${error.response.data}`);

        if (req.xhr){
          res.json("index", { address: address });
        } else {
          res.render("index", { address: address });
        }
      });
  }
});

// router.post("/ajaxPost",function(req,res,next){
//   const formAddress = req.body.address;
//   console.log(formAddress);

//   if (address === "") {
//     res.render('index', { address: address} );
//   } else {
//     console.log("Call Geoapify");

//     axios.get('https://api.geoapify.com/v1/geocode/search', {
//       params: {
//         text: formAddress,
//         apiKey: process.env.GEOAPIFY_API_KEY
//       }
//     })
//     .then(function (response) {
//       console.log(response);
//       let result = response;

//     })
//     .catch(function (error) {
//       console.error(`Geoapify error: ${error.response.data}`);
//       res.render('index', { address: address} );
//     })
//   }
// });
module.exports = router;
