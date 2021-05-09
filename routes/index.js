var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.post('/', function(req, res, next) {
  const address = req.body.address;
  res.render('index', { address: address });
});

module.exports = router;
