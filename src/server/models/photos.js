
/**
 * Module dependencies.
 * @private
 */

var InstagramConnection = require("../middlewares/instagramconnector");
var Q = require('q');

/**
 * Module exports.
 * @public
 */

module.exports = Photos;

function Photos()
{ 
	//get the full list
	// this.data = [];
};

/**
 * getIdeas.
 * get a list of ideas sorted and paginated
 * @params: idea_per_page, page, sorting
 */

Photos.prototype.getPhotos = function()
{
	var deferred = Q.defer();

	//update and paginate
	InstagramConnection.getData()
		.then(function( _photo ){

			//solve the promise
			deferred.resolve( _photo.data );

		}.bind(this));

	return deferred.promise;
};

