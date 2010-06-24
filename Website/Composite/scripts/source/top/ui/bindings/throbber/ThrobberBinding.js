ThrobberBinding.prototype = new Binding;
ThrobberBinding.prototype.constructor = ThrobberBinding;
ThrobberBinding.superclass = Binding.prototype;

ThrobberBinding.URL_DEFAULT = Resolver.resolve ( "${skin}/throbber/throbber.gif" );
ThrobberBinding.URL_ACTIVATE = Resolver.resolve ( "${skin}/throbber/throbber_activate.gif" );
ThrobberBinding.URL_DEACTIVATE = Resolver.resolve ( "${skin}/throbber/throbber_deactivate.gif" );

/**
 * Throbber!
 * @class
 */
function ThrobberBinding () {

	/**
	 * @type {SystemLogger}
	 */
	this.logger = SystemLogger.getLogger ( "ThrobberBinding" );
	
	/**
	 * @type {boolean}
	 */
	this._isPlaying = false;
	
	/*
	 * Returnable.
	 */
	return this;
}

/**
 * Identifies binding.
 */
ThrobberBinding.prototype.toString = function () {
	
	return "[ThrobberBinding]";
}

/**
 * @overloads {Binding#onBindingRegister}
 */
ThrobberBinding.prototype.onBindingRegister = function () {
	
	ThrobberBinding.superclass.onBindingRegister.call ( this );
	
	this._setImage ( ThrobberBinding.URL_DEFAULT );
	
	if ( Application.hasStartPage && Application.hasExternalConnection ) {
	
		this.subscribe ( BroadcastMessages.COMPOSITE_START );
		this.subscribe ( BroadcastMessages.COMPOSITE_STOP );
		this.subscribe ( BroadcastMessages.START_COMPOSITE );
		
		this.bindingElement.title = " Composite Start ";
		this.attachClassName ( "active" );
		this.addEventListener ( DOMEvents.CLICK, {
			handleEvent : function () {
				EventBroadcaster.broadcast ( BroadcastMessages.START_COMPOSITE );
			}
		});
	}
}

/**
 * @implements {IBroadcastListener}
 * @param {string} broadcast
 * @param {object} arg
 */
ThrobberBinding.prototype.handleBroadcast = function ( broadcast, arg ) {
	
	ThrobberBinding.superclass.handleBroadcast.call ( this, broadcast, arg );
	
	switch ( broadcast ) {
		case BroadcastMessages.COMPOSITE_START :
		case BroadcastMessages.START_COMPOSITE :
			this.hide ();
		 	break;
		case BroadcastMessages.COMPOSITE_STOP :
			this.show ();
			break;
	}
}

/**
 * Play.
 */
ThrobberBinding.prototype.play = function () {
	
	if ( !this._isPlaying ) {
		this._setImage ( ThrobberBinding.URL_ACTIVATE );
		this._isPlaying = true;
	}
}

/**
 * Stop.
 */
ThrobberBinding.prototype.stop = function () {

	if ( this._isPlaying == true ) {
		this._setImage ( ThrobberBinding.URL_DEACTIVATE ? ThrobberBinding.URL_DEACTIVATE : ThrobberBinding.URL_DEFAULT );
		this._isPlaying = false;
	}
}

/**
 * Hide.
 * @overwrites {Binding#hide}
 */
ThrobberBinding.prototype.hide = function () {

	if ( this.isVisible == true ) {
		this.bindingElement.style.visibility = "hidden";
		this.isVisible = false;
	}
}

/**
 * Show.
 * @overwrites {Binding#show}
 */
ThrobberBinding.prototype.show = function () {
	
	if ( !this.isVisible ) {
		this.bindingElement.style.visibility = "visible";
		this.isVisible = true;
	}
}

/**
 * Set image.
 * @param {string} url
 */
ThrobberBinding.prototype._setImage = function ( url ) {
	
	this.bindingElement.style.backgroundImage = 'url("' + url + '")';
}