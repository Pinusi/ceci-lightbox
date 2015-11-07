
/**
 * Module dependencies.
 * @private
 */

var express = require('express');
var router = express.Router();

/**
 * Module exports.
 * @public
 */

module.exports = router;

/**
 * Importing other routes
 */

router.use('/api/photos', require('./photos'));

/**
 * Extending the router for the route /
 */
 
router.get('/', function( req, res ){});