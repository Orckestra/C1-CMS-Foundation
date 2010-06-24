ImageBoxBinding.prototype = new Binding;
ImageBoxBinding.prototype.constructor = ImageBoxBinding;
ImageBoxBinding.superclass = Binding.prototype;

ImageBoxBinding.ACTION_INITIALIZED = "imagebox initialized";

/**
 * @class
 */
function ImageBoxBinding () {

	/**
	 * @type {SystemLogger}
	 */
	this.logger = SystemLogger.getLogger ( "ImageBoxBinding" );
	
	/**
	 * Flipped once in a while (see method deinitialize).
	 * @type {boolean}
	 */
	this._isImageBoxBindingInitialized = false;
	 
	/**
	 * Flipped on startup.
	 */
	this._isFirstLoad = true;
	
	/**
	 * @type {BindingBoxObject}
	 */
	this.boxObject = null;
	
	/**
	 * @type {DOMElement}
	 */
	this._img = null;
	
	/**
	 * @type {object}
	 */
	this.geometry = {
		w : null,
		h : null,
		x : null,
		y : null
	}
	
	/**
	 * @type {string}
	 */
	this._fixurl = null;
}

/**
 * Identifies binding.
 */
ImageBoxBinding.prototype.toString = function () {
	
	return "[ImageBoxBinding]";
}

/**
 * 
 */
ImageBoxBinding.prototype.onBindingRegister = function () {
	
	ImageBoxBinding.superclass.onBindingRegister.call ( this );
	
	this._img = document.getElementById ( "image" );
	var self = this;
	this._img.onload = function () {
		self._initialize ();
	}
	this.refresh ();
}

/**
 * Initialize when image loads.
 */
ImageBoxBinding.prototype._initialize = function () {
	
	if ( this._img.src != this._fixurl ) {
	
		this.setW ( this._img.width );
		this.setH ( this._img.height );
		this.setX ( 0 );
		this.setY ( 0 );
		
		if ( !this._isImageBoxBindingInitialized ) {
			this.attachClassName ( "initialized" );
			this.dispatchAction ( ImageBoxBinding.ACTION_INITIALIZED );
			this._isImageBoxBindingInitialized = true;
		}
		
		this._fixurl = this._img.src;
	}
	
	/*
	 * Image was hidden by CSS while initializing. 
	 * On first image loaded, a timeout makes 
	 * sure that editing stage is fully rendered.
	 */
	var img = this._img;
	if ( this._isFirstLoad ) {
		this._isFirstLoad = false;
		setTimeout ( function () {	
			img.style.visibility = "visible";
		}, 500 );
	} else {
		img.style.visibility = "visible";
	}
}

ImageBoxBinding.prototype.getImageSource = function () {
	
	return this._img.src;
}

/**
 * Setup re-initialization after image scaling.
 */
ImageBoxBinding.prototype.deInitialize = function () {

	this._isImageBoxBindingInitialized = false;
	this.detachClassName ( "initialized" );
}

/**
 * Refresh image.
 */
ImageBoxBinding.prototype.refresh = function () {
	
	this._img.style.visibility = "hidden"; // flipped by method _initialize
	this._img.src = ImageEditorActions.getURL ();
}

/**
 * Repaint.
 */
ImageBoxBinding.prototype.repaint = function () {
	
	this.setW ( this.geometry.w );
	this.setH ( this.geometry.h );
	this.setX ( this.geometry.x );
	this.setY ( this.geometry.y );
}

/**
 * Set width.
 * @param {int} w
 */
ImageBoxBinding.prototype.setW = function ( w ) {
	
	this.bindingElement.style.width = new String ( w * ImageEditor.scale ) + "px";
	this.geometry.w = w;
}

/**
 * Set height.
 * @param {int} h
 */
ImageBoxBinding.prototype.setH = function ( h ) {
	
	this.bindingElement.style.height = new String ( h * ImageEditor.scale ) + "px";
	this.geometry.h = h;
}

/**
 * Set x.
 * @param {int} x
 */
ImageBoxBinding.prototype.setX = function ( x ) {
	
	x = Math.round ( x );
	var def = - 0.5 * this.geometry.w * ImageEditor.scale;
	this.bindingElement.style.marginLeft = def + x + "px";
	this.geometry.x = x;
}

/**
 * Set y.
 * @param {int} y
 */
ImageBoxBinding.prototype.setY = function ( y ) {
	
	y = Math.round ( y );
	var def = - 0.5 * this.geometry.h * ImageEditor.scale;
	this.bindingElement.style.marginTop = def + y + "px";
	this.geometry.y = y;
}