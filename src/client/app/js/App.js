var CeciLigthbox = window.CeciLigthbox || {};

/**
 * App.
 * This is the lightbox object
 * @param _data: image list
 * @param _id: id of the container in html so we can initialize more than one
 */

CeciLigthbox.App = function( _id ){
	
	//variables
	this.scroll_position = 0;

	//dom elements
	this.container = document.querySelector( _id );
	this.content = this.container.querySelector('.container');
	this.open = document.querySelector( "#to-cecilightbox" );
	this.loader = document.querySelector( ".loader" );
	this.close = this.container.querySelector('.close');
	this.left = this.container.querySelector('.left');
	this.right = this.container.querySelector('.right');
	this.info_time = this.container.querySelector('#info .date');
	this.info_user = this.container.querySelector('#info .user');
	this.info_desc = this.container.querySelector('#info .desc');

	//set eventslisteners
	this.attachEvents();

	//data
	this.model = new CeciLigthbox.Model( this );
};

/**
 * attachEvents.
 * attach events
 */

CeciLigthbox.App.prototype.attachEvents = function()
{
	this.open.addEventListener('click', this.handleOpen.bind(this));
	this.container.addEventListener('images-preloaded', this.handleHideSpinner.bind(this));
	this.container.addEventListener('model-ready', this.handleModel.bind(this));
	this.close.addEventListener('click', this.handleClose.bind(this));
	this.left.addEventListener('click', function(){
		this.slide.call(this, false);
	}.bind(this));
	this.right.addEventListener('click', function(){
		this.slide.call(this, true);
	}.bind(this));
};

//HANDLERS

/**
 * handleModel.
 * Model ready function
 */

CeciLigthbox.App.prototype.handleModel = function()
{
	//create images dom
	this.model.data.forEach(function( photo, index ){
		this.publishPhoto( photo, index );
	}.bind(this));

	//preloads them
	this.preloadImages();
};

/**
 * handleHideSpinner.
 * When images are loaded, then remove spinner
 */

CeciLigthbox.App.prototype.handleHideSpinner = function()
{
	if (this.loader.classList)
		this.loader.classList.remove('active');
	else
		this.loader.className = this.loader.className.replace(new RegExp('(^|\\b)' + 'active'.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');

	if (this.open.classList)
		this.open.classList.add('active');
	else
		this.open.className += ' ' + 'active';
};

/**
 * handleOpen.
 * Show lightbox
 */

CeciLigthbox.App.prototype.handleOpen = function()
{
	//update the photo info fo the first one
	this.updateInfo();

	if (this.container.classList)
		this.container.classList.add('active');
	else
		this.container.className += ' ' + 'active';
};

/**
 * handleClose.
 * Hide lightbox
 */

CeciLigthbox.App.prototype.handleClose = function()
{
	if (this.container.classList)
		this.container.classList.remove('active');
	else
		this.container.className = this.container.className.replace(new RegExp('(^|\\b)' + 'active'.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');

	setTimeout(function(){
		//put slide rback to initial point
		this.scroll_position = 0;
		this.content.style.transform = "translate3d(" + this.scroll_position * 100 + "%, 0px, 0px)";
		this.content.style.webkitTransform = "translate3d(" + this.scroll_position * 100 + "%, 0px, 0px)";
	}.bind(this), 500);
};

//OTHER FUNCTIONS

/**
 * preloadImages.
 * Makes sure that when we open the lightbox all images are already preloaded
 */

CeciLigthbox.App.prototype.preloadImages = function()
{
	var numLoaded = 0;

	for( var i = 0; i < this.model.data.length; i ++ ){
		var image = document.createElement('img'); // NOTE should this be scoped?
		image.src = this.model.data[i].images.standard_resolution.url;

		image.onload = function(){
			numLoaded ++;
			if( numLoaded === this.model.data.length ){
				var event = document.createEvent('CustomEvent');
  				event.initCustomEvent('images-preloaded', true, true, {});
  				this.container.dispatchEvent(event);
			}
		}.bind(this);

		image.onerror = function( e ){
			console.log( "can't load this image!" );
		}.bind(this)
	}
}

/**
 * slide.
 * Slide trough the images
 * @param _right: slide right or left?
 */

CeciLigthbox.App.prototype.slide = function( _right )
{
	if( _right )
	{   
		if( this.scroll_position === - ( this.model.data.length - 1 ))
		{
			return;
		}

		this.scroll_position -= 1;
	}
	else
	{
		if( this.scroll_position === 0 )
		{
			return;
		}

		this.scroll_position += 1;
	}

	this.updateInfo();
	this.content.style.transform = "translate3d(" + this.scroll_position * 100 + "%, 0px, 0px)";
	this.content.style.webkitTransform = "translate3d(" + this.scroll_position * 100 + "%, 0px, 0px)";
}

/**
 * updateInfo.
 * Update photo informations
 */

CeciLigthbox.App.prototype.updateInfo = function()
{
	var current_photo = (- this.scroll_position),
		date = this.convertTimestamp(this.model.data[ current_photo ].created_time),
		user = "@" + this.model.data[ current_photo ].user.username,
		desc = this.model.data[ current_photo ].caption ? this.model.data[ current_photo ].caption.text : "";

	this.info_time.innerHTML = date;
	this.info_user.innerHTML = user;
	this.info_desc.innerHTML = desc;
}

/**
 * convertTimestamp.
 * Functions that convert timestamps into time ago
 * @param _timestamp: timestamp to convert
 */

CeciLigthbox.App.prototype.convertTimestamp = function( _timestamp )
{
	var event_date = new Date( _timestamp*1000 );
	var seconds = Math.floor(( new Date() - event_date ) / 1000);
    var interval = Math.floor( seconds / 31536000 );

    if (interval > 1) {
        return interval + " years ago";
    }

    interval = Math.floor(seconds / 2592000);
    if (interval > 1) {
        return interval + " months ago";
    }

    interval = Math.floor(seconds / 86400);
    if (interval > 1) {
        return interval + " days ago";
    }

    interval = Math.floor(seconds / 3600);
    if (interval > 1) {
        return interval + " hours ago";
    }

    interval = Math.floor(seconds / 60);
    if (interval > 1) {
        return interval + " minutes ago";
    }

    return Math.floor(seconds) + " seconds ago";
};

/**
 * publishPhoto.
 * Functions that convert timestamps into time ago
 * @param _photo: photo to publish
 * @param _index: index in array
 */

CeciLigthbox.App.prototype.publishPhoto = function( _photo, _index )
{
	var photo_html = document.createElement('div');

	photo_html.style.transform = "translate3d(" + ( _index * 100 ) + "%, 0px, 0px)";
	photo_html.style.webkitTransform = "translate3d(" + ( _index * 100 ) + "%, 0px, 0px)";
	photo_html.className += ' ' + 'image';
	photo_html.innerHTML = "<img src='" + _photo.images.standard_resolution.url + "' />";

	this.content.appendChild( photo_html );
};