'use strict';

/**
 * myCeciLigthbox.
 * Closure in which initialize the main instance of the lightbox
 */

var myCeciLigthbox = function(){

	var data,
		dom_ready = false,
		CeciLigthbox = window.CeciLigthbox || {};

	/**
	* ready.
	* Dom is ready?
	* @param fn: function to execute when ready
	*/

	var ready = function( fn )
	{
		if (document.readyState != 'loading')
		{
			dom_ready = true;
			fn();
		} 
		else 
		{
			document.addEventListener('DOMContentLoaded', function(){
				dom_ready = true;
				fn();
			});
		}
	}

	/**
	* onReady.
	* DOMReady function
	*/

	var onReady = function()
	{
		if( data && dom_ready )
		{
			var app = new CeciLigthbox.App( data, "#cecilightbox" );
		}
	}

	/**
	* setData.
	* save data from outside given that we are using JSONP
	*/

	var setData = function( _data )
	{
		data = _data;
		onReady();
	}

	ready(onReady);

	return{
	    setData: setData
	}

}();