
/**
 * Module dependencies.
 * @private
 */

var express = require('express');
var bodyParser = require('body-parser');
var index = require('./routes/index');

/**
 * Module variables.
 * @private
 */

 var app = express();

/**
 * Module exports.
 * @public
 */

module.exports = app;


/**
 * Extending the app for the parsing json
 */

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

/**
 * Importing base route
 */

app.use('/', index);