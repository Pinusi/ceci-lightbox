var CeciLigthbox = window.CeciLigthbox || {};

/**
 * Model.
 * Data Model
 * @app: the app that owns this model
 */

CeciLigthbox.Model = function( _app ){

	this.app = _app;
	this.data_url = "http://0.0.0.0:5455/api/photos"; //to test in ie with virtualbox change this to localmachine address

	//get the data from server
	this.getData();
};

/**
 * getData.
 * Connector
 */

CeciLigthbox.Model.prototype.getData = function(){
	
	var request = new XMLHttpRequest();
	request.open('GET', this.data_url, true);

	request.onload = function() {
		if (request.status >= 200 && request.status < 400) {
			// Success!
			this.data = JSON.parse( request.responseText );

			var event = document.createEvent('CustomEvent');
  			event.initCustomEvent('model-ready', true, true, {});
  			this.app.container.dispatchEvent(event);
		} 
		else {
			// We reached our target server, but it returned an error
		}
	}.bind(this);

	request.onerror = function( err ) {
		// There was a connection error of some sort
		console.log( err );
	};

	request.send();

};