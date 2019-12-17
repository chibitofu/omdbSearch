var express = require('express');
var bodyParser = require('body-parser');
var request = require('request');
var router = express.Router();
var db = require('../models');
var apiKey = process.env.APIKEY;

router.get('/', function(req, res){
  res.render('index');
});

router.get('/favorites', function(req, res){
  db.favorites.findAll().then(function(info){
      res.render('favorites', {info: info});
  });
});

router.get('/search', function(req, res){
  var query = req.query.q;

  request('http://www.omdbapi.com/?s=' + query + "&apikey=" + apiKey, function(err, response, body){
    var json = JSON.parse(body);
    if(!err && json.Search){
      res.render('search', {movie: json.Search, q: query});
    } else {
      request('http://www.omdbapi.com/?s=dragon+ball' + "&apikey=" + apiKey, function(err, response, body){
      var notFound = JSON.parse(body);
      res.render('search', {movie: notFound.Search, q: query});
      });
    }
  });
});

router.get('/movies/:id', function(req, res){
  var movieIndex = req.params.id;
  request('http://www.omdbapi.com/?i=' + movieIndex + '&plot=full' + '&tomatoes=true' + "&apikey=" + apiKey, function(err, response, body){
    var json = JSON.parse(body);
    res.render('movies', {movie: json});
  });
});

router.post('/favorites', function(req, res){
  var id = req.body.id;
  request('http://www.omdbapi.com/?i=' + id + "&apikey=" + apiKey, function(err, response, body){
    var json = JSON.parse(body);
    var newFavorite = {
      imdbid: json.imdbID,
      title: json.Title,
      year: parseInt(json.Year),
      poster: json.Poster
    };
    db.favorites.create(newFavorite).then(function(url){
      res.redirect('favorites');
    });
  });
});

router.delete('/favorites', function(req, res) {
  var id = parseInt(req.body.id);
  db.favorites.find({where: {id: id}}).then(function(id){
    id.destroy().then(function(u){
      res.send('success');
    });
  });
});

module.exports = router;
