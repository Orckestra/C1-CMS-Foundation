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
	
	/*
	 * The bindingElement has to be displayed for 
	 * ActionScript to initialize properly. But 
	 * Explorer shows a "flash loading" indicator, 
	 * so it was moved off-screen with CSS.
	 */
	var self = this;
	function init () {
		self.hide ();
		self.bindingElement.style.top = "0";
		self.bindingElement.style.left = "0";
	}
	
	/*
	 * Bypass silly security warnings in Explorer by injecting markup. 
	 * Mozilla, on the other hand, seems to require onload markup in 
	 * order to enable scripting (this may be a cache issue, though). 
	 * Remember that the markup string is mirrored in file "top.aspx".
	 * UPDATE: This whole setup doesn't work in Firefox 3.0! Cannot 
	 * scan Flash object for externalInterface methods!
	 * TODO: Replace all this with canvas and stuff!
	 */
	if ( Client.isExplorer && Client.hasFlash ) {
		
		var html = '';
		html += '<object id="offlineflash" type="application/x-shockwave-flash" data="flash/CompositeMasterBlock2.swf" height="100%" width="100%">';
		html += '<param name="movie" value="flash/CompositeMasterBlock2.swf"/>';
		html += '<param name="scale" value="exactfit"/>';
		html += '<param name="wmode" value="transparent"/>';
		html += '<param name="allowScriptAccess" value="always"/>';
		html += '</object>';
		
		/*
		 * This gets broadcasted by the Flash movie.
		 */
		var self = this;
		EventBroadcaster.subscribe ( BroadcastMessages.OFFLINE_FLASH_INITIALIZED, {
			handleBroadcast : function () {
				init ();
			}
		})
		
		/*
		 * Injecting markup.
		 */
		var div = this.bindingDocument.getElementById ( "offlinemovie" );
		div.innerHTML = html;
		
	} else {
		init ();
	}
}

/**
 * Play.
 */
TheatreBinding.prototype.play = function () {
	
	if ( !this._isPlaying ) {
		Application.lock ( this );
		this.show ();
		this._fadeInFlash ();
		this._isPlaying = true;
	}
}

/**
 * Fade in Flash.
 */
TheatreBinding.prototype._fadeInFlash = function () {
	
	if ( Client.isExplorer && Client.hasFlash ) {
		var flash = this.bindingDocument.getElementById ( "offlineflash" ); 
		if ( typeof flash.fadeIn != Types.UNDEFINED ) {
			flash.fadeIn ();
		} else {
			this.logger.error ( "Flash object could not be scripted!" );
		}
	}
}

/**
 * Stop.
 */
TheatreBinding.prototype.stop = function () {
	
	if ( this._isPlaying == true ) {
		Application.unlock ( this, true ); // boolean arg because Explorer may stay locked...
		this.hide ();
		this._isPlaying = false;
	}
}