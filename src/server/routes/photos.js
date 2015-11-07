
/**
 * Module dependencies.
 * @private
 */

var express = require('express');
var router = express.Router();
var Photos = require('../models/photos');
var Q = require('q');

var photos = new Photos();

/**
 * Module exports.
 * @public
 */

module.exports = router;

/**
 * Extending the router for the route /comments
 */

router.get('/', function( req, res ) 
{
	getPhotosHandler( req, res );
});

var getPhotosHandler = function( _req, _res )
{
	photos.getPhotos()
		.then(function( _page ){
			if( _page.length === 0 )
			{
				_res.status(404).send({ error: "No photo found" });
			}
			else
			{
		  		_res.json( _page );
		  	}
		});
}