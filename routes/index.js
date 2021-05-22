var express = require('express');
const axios = require('axios').default;
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.post('/', function(req, res, next) {
  const address = req.body.address;
  
  if (address === "") {
    res.render('index', { address: address} );
  } else {
    console.log("Call Geoapify");

    axios.get('https://api.geoapify.com/v1/geocode/search', {
      params: {
        text: address,
        apiKey: process.env.GEOAPIFY_API_KEY
      }
    })
    .then(function (response) {
      let result = [];

      response.data.features.forEach(function(feature) {
        const text = `${feature.properties.address_line1}, ${feature.properties.city}, ${feature.properties.state}, ${feature.properties.country}`;
        result.push(text);
      });

      res.render('index', { address: address, result: result} );
    })
    .catch(function (error) {
      console.error(`Geoapify error: ${error.response.data}`);
      res.render('index', { address: address} );  
    })
  }
});

//create form processing route
router.post('/formProcess',function(req,res,next){
  //fetch address from form.js and assign it to a variable
  let address = req.body.address;

  //keep form validation on server
  if(address === ""){
    res.render('index', {address: address} );
  }
  else {
    //send request to geoapify and store response to variable
    let axiosRequest = axios.get('https://api.geoapify.com/v1/geocode/search', {
      node params: {
         text: address,
         apiKey: process.env.GEOAPIFY_API_KEY
       }
     })
  
  .then(function (response){
  //validate axios request and send server error to browser if no valid respose
  
  if(axiosRequest === ""){
    console.log(`Server Error: ${error.response.data}`);
  }
  .catch(function (error) {
    console.error(`Geoapify error: ${error.response.data}`);
    res.render('index', { address: address} );  
  })
}
});

module.exports = router;
