var express = require('express');
var app = express();
var ejsLayouts = require('express-ejs-layouts');
var bodyParser = require('body-parser');
var request = require('request');
var homeController = require('./controllers/index');
var db = require('./models');

//Middleware//
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/views') );
app.use(ejsLayouts);
app.use(bodyParser.urlencoded({extended:false} ) );
app.use('/', homeController);


// app.listen(3000);
app.listen(process.env.PORT||3000);
