var express = require('express');
var bodyParser = require('body-parser');
var request = require('request');
var router = express.Router();

router.get('/', function(req, res){
  res.render('index');
});

router.get('/search', function(req, res){
  var query = req.query.q;

  request('http://www.omdbapi.com/?s=' + query, function(err, response, body){
    var json = JSON.parse(body);
    if(!err && json.Search){
      res.render('search', {movie: json.Search, q: query});
    } else {
      request('http://www.omdbapi.com/?s=dragon+ball', function(err, response, body){
      var notFound = JSON.parse(body);
      res.render('search', {movie: notFound.Search, q: query});
      });
    }

  });
});

router.get('/movies/:id', function(req, res){
  var movieIndex = req.params.id;
  request('http://www.omdbapi.com/?i=' + movieIndex + '&plot=full' + '&tomatoes=true', function(err, response, body){
    var json = JSON.parse(body);
    res.render('movies', {movie: json});
  });
});

module.exports = router;
