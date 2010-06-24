/**
 * @class
 */
function _Audio () {
	this._construct ();
}

_Audio.prototype = {
	
	SPLASH : "${root}/audio/splash.mp3",
	LOGIN : "${root}/audio/login.mp3",
	FATAL : "${root}/audio/fatal.mp3",
	
	/** 
 	 * @type {SystemLogger}
 	 */
 	_logger : SystemLogger.getLogger ( "Audio" ),
 	
 	 /**
 	 * This would be the Flash object tag.
 	 * @type {DOMElement}
 	 */
 	_audio : null,
 	
 	/**
 	 * @type {boolean}
 	 */
 	isInitialized : false,
 	
 	/**
 	 * @type {boolean}
 	 */
 	isEnabled : false,
 	
 	/**
 	 * Construct.
 	 */
 	_construct : function () {
		
		/*
		 * If no Flash is installed, initialize when kikstart is fired.
		 * @see {KickStart}
		 */
		if ( !Client.hasFlash ) {
			EventBroadcaster.subscribe ( BroadcastMessages.APPLICATION_KICKSTART, {
				handleBroadcast : function () {
					Audio.initialize ( null );
				}
			});
		}
	},
 	
 	/**
	 * @param {DOMElement} flashElement
	 */
	initialize : function ( flashElement ) {
		
		if ( !this.isInitialized ) {
			this.isInitialized = true;
			if ( flashElement ) {
	 			this._audio = flashElement;
	 			this.isEnabled = true;
	 		}
	 		EventBroadcaster.broadcast ( 
	 			BroadcastMessages.AUDIO_INITIALIZED 
	 		);
	 	}
 	},
 	
 	
	
	/**
	 * Play sound from url.
	 * @param {string} url
	 * @return {boolean}
	 */
	play : function ( url ) {
		
		var result = false;
		if ( this.isEnabled && Preferences.getPref ( "audio" )) {
			this._audio.fromURL ( 
				Resolver.resolve ( url )
			);
			result = true;
		}
		return result;
	}
}
var Audio = new _Audio ();