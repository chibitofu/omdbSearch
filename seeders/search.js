var express = require('express');
var bodyParser = require('body-parser');
var request = require('request');
var router = express.Router();

router.get('/search', function(req, res){
  res.render('search');
});

module.exports = router;
