TheatreBinding.prototype = new Binding;
TheatreBinding.prototype.constructor = TheatreBinding;
TheatreBinding.superclass = Binding.prototype;

TheatreBinding.CLASSNAME_INITIALIZED = "initialized";

/**
 * @class
 * The TheatreBinding currently handles only one scenario: The server offline show.
 */
function TheatreBinding () {
	
	/**
	 * @type {boolean}
	 */
	this._isPlaying = false;
	
	/**
	 * Don't use fade while the browser is negoatiating a HTTP connection.
	 * @type {boolean}
	 */
	this._isFading = false;
	
	/**
	 * @type {HTMLCanvasElement}
	 */
	this._canvas = null;
	
	/*
	 * Returnable 
	 */
	return this;
}

/**
 * Identifies binding
 * @return {string}
 */
TheatreBinding.prototype.toString = function () {
	
	return "[TheatreBinding]";
}

/**
 * @overloads {Binding#onBindingAttach}
 */
TheatreBinding.prototype.onBindingAttach = function () {
	
	TheatreBinding.superclass.onBindingAttach.call ( this );
	
	this._canvas = document.createElement ( "canvas" );
	if ( Client.isExplorer ) {
		this._canvas.style.filter = "progid:DXImageTransform.Microsoft.Fade(duration=30) progid:DXImageTransform.Microsoft.Alpha(opacity=50)";
	}
	this.bindingElement.appendChild ( this._canvas );
}

/**
 * Play.
 */
TheatreBinding.prototype.play = function ( isFading ) {
	
	this._isFading = isFading == true;
	
	if ( !this._isPlaying ) {
		Application.lock ( this );
		this.show ();
		this._isPlaying = true;
		if ( this._isFading ) {
			this._fade ();
		}
	}
}

TheatreBinding.prototype._fade = function () {
	
	if ( Client.isMozilla ) {
		
		var context = this._canvas.getContext ( "2d" );
		var alpha = parseInt ( 0 );

		TheatreBinding._interval = top.setInterval ( function () {
			if ( alpha < 0.5 ) {
				context.fillStyle = "rgba(0,0,0," + new String ( alpha ) + ")";
				context.clearRect ( 0, 0, 300, 150 );
				context.fillRect ( 0, 0, 300, 150 );
				alpha += 0.002;
			} else {
				top.clearInterval ( TheatreBinding._interval );
				TheatreBinding._interval = null;
			}
		}, 50 );
	} else {
		this._canvas.filters [ 0 ].Apply ();
		this._canvas.style.backgroundColor = "black";
		this._canvas.filters [ 0 ].Play ();
	}
}

/**
 * Stop.
 */
TheatreBinding.prototype.stop = function () {
	
	if ( this._isPlaying ) {
		
		if ( this._isFading ) {
			if ( TheatreBinding._interval != null ) {
				top.clearInterval ( TheatreBinding._interval );
			}
			if ( Client.isExplorer ) {
				this._canvas.style.backgroundColor = "transparent";
			} else {
				var context = this._canvas.getContext ( "2d" );
				context.clearRect ( 0, 0, 300, 150 );
			}
		}
		
		Application.unlock ( this, true ); // boolean arg because Explorer may stay locked...
		this.hide ();
		this._isPlaying = false;
	}
}