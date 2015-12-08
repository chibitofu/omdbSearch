var express = require('express');
var bodyParser = require('body-parser');
var request = require('request');
var router = express.Router();
var db = require('../models');

router.get('/favorites', function(req, res){
  res.render('favorites.ejs');
});

module.exports = router;
