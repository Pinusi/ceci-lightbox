var CeciLigthbox = window.CeciLigthbox || {};

CeciLigthbox.App = function( _data, _id ){
	
	this.scroll_position = 0;

	this.container = document.querySelector( _id );
	this.content = this.container.querySelector('.container');
	this.open = document.querySelector( "#to-cecilightbox" );
	this.close = this.container.querySelector('.close');
	this.left = this.container.querySelector('.left');
	this.right = this.container.querySelector('.right');
	this.info_time = this.container.querySelector('#info .date');
	this.info_user = this.container.querySelector('#info .user');
	this.info_desc = this.container.querySelector('#info .desc');

	console.log( _data );
	this.photos = _data.data;

	this.photos.forEach(function( photo, index ){
		this.publishPhoto( photo, index );
	}.bind(this));

	this.updateInfo();

	this.attachEvents();
};

CeciLigthbox.App.prototype.attachEvents = function()
{
	this.open.addEventListener('click', this.handleOpen.bind(this));
	this.close.addEventListener('click', this.handleClose.bind(this));
	this.left.addEventListener('click', function(){
		this.slide.call(this, false);
	}.bind(this));
	this.right.addEventListener('click', function(){
		this.slide.call(this, true);
	}.bind(this));
};

CeciLigthbox.App.prototype.handleOpen = function()
{
	if (this.container.classList)
		this.container.classList.add('active');
	else
		this.container.className += ' ' + 'active';
};

CeciLigthbox.App.prototype.handleClose = function()
{
	if (this.container.classList)
		this.container.classList.remove('active');
	else
		this.container.className = this.container.className.replace(new RegExp('(^|\\b)' + 'active'.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
};

CeciLigthbox.App.prototype.slide = function( _right )
{
	if( _right )
	{   
		if( this.scroll_position === - ( this.photos.length - 1 ))
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

CeciLigthbox.App.prototype.updateInfo = function()
{
	var current_photo = (- this.scroll_position),
		date = this.convertTimestamp(this.photos[ current_photo ].created_time),
		user = "@" + this.photos[ current_photo ].user.username,
		desc = this.photos[ current_photo ].caption ? this.photos[ current_photo ].caption.text : "";

	this.info_time.innerHTML = date;
	this.info_user.innerHTML = user;
	this.info_desc.innerHTML = desc;
}

CeciLigthbox.App.prototype.convertTimestamp = function( _timestamp )
{
	var event_date = new Date(_timestamp*1000);
	var seconds = Math.floor((new Date() - event_date) / 1000);
    var interval = Math.floor(seconds / 31536000);

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

CeciLigthbox.App.prototype.publishPhoto = function( _photo, _index )
{
	var photo_html = document.createElement('div');

	photo_html.style.transform = "translate3d(" + (_index*100) + "%, 0px, 0px)";
	photo_html.style.webkitTransform = "translate3d(" + (_index*100) + "%, 0px, 0px)";
	photo_html.className += ' ' + 'image';
	photo_html.innerHTML = "<img src='" + _photo.images.standard_resolution.url + "' />";

	this.content.appendChild( photo_html );
};