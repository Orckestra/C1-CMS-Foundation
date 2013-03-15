/**
 * @class
 * @see {Options}
 */
window.Preferences = new function () {
	
	var logger = SystemLogger.getLogger ( "Preferences" );
	
	/*
	 * Preferrably using defined constants to avoid spelling mistakes.
	 */
	this.LOGIN = "login";
	
	/* 
	 * Default preferences.
	 */
	var preferences = {
		"login" : true
	};
	
	/* 
	 * Fetch preferences on startup.
	 */
	EventBroadcaster.subscribe ( BroadcastMessages.LOCALSTORE_INITIALIZED, {
		handleBroadcast : function () {
			if ( LocalStore.isEnabled ) {
				var store = LocalStore.getProperty ( LocalStore.PREFERENCES );
				if ( store ) {
					for ( var key in store ) { // "overloading" not replacing!
						preferences [ key ] = store [ key ];
					}
					debug ( true );
				} else {
					debug ( false );
				}
			} else {
				debug ( false );
			}
		}
	});
	
	/* 
	 * Store preferences on shutdown.
	 */
	EventBroadcaster.subscribe ( BroadcastMessages.APPLICATION_SHUTDOWN, {
		handleBroadcast : function () {
			if ( LocalStore.isEnabled ) {
				LocalStore.setProperty ( 
					LocalStore.PREFERENCES,
					preferences
				);
			}
		}
	});
	
	/**
	 * Get preference.
	 * @param {string} key
	 * @return {object}
	 */
	this.getPref = function ( key ) {
		
		var result = null;
		if ( key ) {
			result = preferences [ key ];
		} else {
			throw "No such preference.";
		}
		return result;
	}
	
	/**
	 * Set preference.
	 * @param {string} key
	 * @param {object} value
	 */
	this.setPref = function ( key, value ) {
		
		if ( key ) {
			preferences [ key ] = value;
		} else {
			throw "No such preference.";
		}
	}
	
	/**
	 * Logging preferences on startup.
	 * @param {boolean} hasStoredPreferences 
	 */
	function debug ( hasStoredPreferences ) {
		
		var output = hasStoredPreferences ? 
			"Persisted preferences" : 
			"No persisted preferences. Using defaults";
			
		output += ":\n";
		for ( var key in preferences ) {
			var pref = preferences [ key ];
			output += "\n\t" + 
				key + ": " + 
				pref + " [" + 
				typeof pref + "]";
		}
		logger.fine ( output );
	}
}