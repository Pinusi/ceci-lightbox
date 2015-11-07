'use strict';

/**
 * myCeciLigthbox.
 * Closure in which initialize the main instance of the lightbox
 */

(function(){

	var data,
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
			fn();
		} 
		else 
		{
			document.addEventListener('DOMContentLoaded', function(){
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
		var app = new CeciLigthbox.App( "#cecilightbox" );
	}

	ready(onReady);

}());