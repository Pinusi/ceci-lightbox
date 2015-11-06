'use strict';

var myCeciLigthbox = function(){

	var data,
		dom_ready = false,
		CeciLigthbox = window.CeciLigthbox || {};

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

	var onReady = function()
	{
		if( data && dom_ready )
		{
			var app = new CeciLigthbox.App( data, "#cecilightbox" );
		}
	}

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


// https://instagram.com/oauth/authorize/?client_id=b2503ef1859444c882296f70b3f5f513&redirect_uri=http://0.0.0.0:5000/&response_type=token
// 21800513.b2503ef.77323556fe40424088b3a00153d93231