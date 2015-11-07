
/**
 * Module dependencies.
 * @private
 */

var https = require("https");
var Q = require('q');

/**
 * Module variables.
 * @private
 */

var token = "21800513.b2503ef.77323556fe40424088b3a00153d93231";

function InstagramConnection()
{ 
	this.url = "https://api.instagram.com/v1/media/popular?access_token=" + token + "&max_tag_id=1111589106282081438";
};

InstagramConnection.prototype.getData = function()
{
	var deferred = Q.defer()

	https.get( this.url, function ( _response ) 
	{
	    // data is streamed in chunks from the server
	    // so we have to handle the "data" event    
	    var buffer = "", 
	        data,
	        route;

	    _response.on("data", function ( chunk ) {
	        buffer += chunk;
	    }); 

	    _response.on("end", function ( err ) {
	        // finished transferring data
	        data = JSON.parse(buffer);
	        deferred.resolve( data )
	    }); 
	});

	return deferred.promise;
};

/**
 * Singleton connection
 */

var connection = new InstagramConnection();

/**
 * Module exports. (in this case as it is a variable and not a function declaration must be put after)
 * @public
 */

module.exports = connection;