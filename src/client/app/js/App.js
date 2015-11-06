var CeciLigthbox = window.CeciLigthbox || {};

CeciLigthbox.App = function( _data, _id ){
	
	this.scroll_position = 0;

	this.container = document.querySelector( _id );
	this.content = this.container.querySelector('.container');
	this.open = document.querySelector( "#to-cecilightbox" );
	this.close = this.container.querySelector('.close');
	this.left = this.container.querySelector('.left');
	this.right = this.container.querySelector('.right');

	console.log( _data );
	this.photos = _data.data;

	this.photos.forEach(function( photo, index ){
		this.publishPhoto( photo, index );
	}.bind(this));

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
		if( this.scroll_position === -100 * ( this.photos.length - 1 ))
		{
			return;
		}

		this.scroll_position -= 100;
	}
	else
	{
		if( this.scroll_position === 0 )
		{
			return;
		}

		this.scroll_position += 100;
	}

	this.content.style.transform = "translate3d(" + this.scroll_position + "%, 0px, 0px)";
}

CeciLigthbox.App.prototype.publishPhoto = function( _photo, _index )
{
	var photo_html = document.createElement('div');

	photo_html.style.transform = "translate3d(" + (_index*100) + "%, 0px, 0px)";
	photo_html.className += ' ' + 'image';
	photo_html.innerHTML = "<img src='" + _photo.images.standard_resolution.url + "' />";

	this.content.appendChild( photo_html );
};