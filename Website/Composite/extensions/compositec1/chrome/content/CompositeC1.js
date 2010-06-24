var CompositeC1 = new function () {
	
	const STATE_START = Components.interfaces.nsIWebProgressListener.STATE_START;
	const STATE_STOP = Components.interfaces.nsIWebProgressListener.STATE_STOP;
	
	var browser = null;
	var isFirstTime = true;
	
	var prefs = Components.classes["@mozilla.org/preferences-service;1"].
		getService(Components.interfaces.nsIPrefBranch);
	
	/**
	 * Wipe all cache.
	 * @param {boolean} isNotify
	 */
	this.clearCache = function ( isNotify ) {
		
		var cache = Components.classes [ "@mozilla.org/network/cache-service;1" ].
    	getService(Components.interfaces.nsICacheService);
	    try {
	    	cache.evictEntries ( Components.interfaces.nsICache.STORE_ANYWHERE );
	    	if ( isNotify ) {
	    		alert ( "Cache has been cleared." );
	    	}
	    } catch ( exception ) {
	    	if ( isNotify ) {
	    		alert ( "Cache could not be cleared!" );
	    	}
	    }
	}
	
	/**
	 * Enable or disable all sorts of cache.
	 * @param {boolean} hasCache
	 */
	this._enableCache = function ( hasCache ) {
		
		prefs.setBoolPref ( "browser.cache.disk.enable", hasCache );
		prefs.setBoolPref ( "browser.cache.memory.enable", hasCache );
		prefs.setIntPref ( "browser.cache.check_doc_frequency", hasCache ? 3 : 1 );
	}
	
	/**
	 * @param {Event} e
	 */
	this.handleEvent = function ( e ) {
	
		switch ( e.type ) {
			
			/*
			 * Fires locally when the XUL main document is loaded. 
			 * Note the we hide the main Prism window!
			 */
			case "load" :
				
				window.removeEventListener ( "load", this, false );
				browser = document.getElementById ( "browser_content" );
				browser.addProgressListener( this,
					Components.interfaces.nsIWebProgress.NOTIFY_STATE_DOCUMENT
				);
				break;
				
			/*
			 * Clear the cache. Fired by content.
			 * @see {_Prism#clearCache}
			 */
			case "contenttochrome-clearcache" :
		        this.clearCache ();
				break;
				
			case "contenttochrome-cache-enable" :
				this._enableCache ( true );
				break;
			
			case "contenttochrome-cache-disable" :
				this._enableCache ( false );
				break;
				
		}
	}
	
	/**
	 * @see {CompositeC1#onLocationChange}
	 */
	this.initialize = function () {
		
		browser.contentWindow.addEventListener ( "contenttochrome-clearcache", this, false );
		browser.contentWindow.addEventListener ( "contenttochrome-cache-enable", this, false );
		browser.contentWindow.addEventListener ( "contenttochrome-cache-disable", this, false );
	}
	
	/**
	 * @implements {nsIWebProgressListener} 
	 */
	this.QueryInterface = function ( aIID ) {
		
		var result = null;
		if ( aIID.equals( Components.interfaces.nsIWebProgressListener ) ||
				aIID.equals ( Components.interfaces.nsISupportsWeakReference ) ||
				aIID.equals ( Components.interfaces.nsISupports )) {
			result = this;
		} else {
			throw Components.results.NS_NOINTERFACE;
		}
		return result;
	}

	/**
	 * @implements {nsIWebProgressListener} 
	 */
	this.onStateChange = function ( aWebProgress, aRequest, aFlag, aStatus ) {
		
		/*
		 * If you use myListener for more than one tab/window, use aWebProgress.DOMWindow 
		 * to obtain the tab/window which triggers the state change
		 */
		if ( aFlag & STATE_START ) {
			// This fires when the load event is initiated
		}
		if ( aFlag & STATE_STOP ) {
			// This fires when the load finishes
		}
		return 0;
	}

	/**
	 * @implements {nsIWebProgressListener} 
	 */
	this.onLocationChange = function ( aProgress, aRequest, aURI ) {
		
		/*
		 * Setup content-to-chrome messaging when the app is operational.
		 */
		var url = aURI.spec;
		//sessionHost = aURI.hostPort;
		
		if ( url.indexOf ( "top.aspx" ) >-1 || url.indexOf ( "updated.aspx" ) >-1 ) {
			
			/*
			 * If developermode, clear the cache on first startup. 
			 * The cache will also be cleared on app reload.
			 */
			if ( isFirstTime == true ) {
				if ( url.indexOf ( "mode=develop" ) >-1 ) {
					this.clearCache ();
				}
			}
			this.initialize ();
			isFirstTime = false;
		}
		
		/*
		 * This fires when the location bar changes; i.e load event is confirmed
		 * or when the user switches tabs. If you use myListener for more than one tab/window,
		 * use aProgress.DOMWindow to obtain the tab/window which triggered the change.
		 */
		return 0;
	}

	// For definitions of the remaining functions see XULPlanet.com
	this.onProgressChange = function() { return 0; }
	this.onStatusChange = function() { return 0; }
	this.onSecurityChange = function() { return 0; }
	this.onLinkIconAvailable = function() { return 0; }
	
	/*
	 * On startup, enable memory and disk cache. Note that an XUL overlay 
	 * has equipped the statusbar menu with an option to clear the cache.
	 */
	this._enableCache ( true );
}

/*
 * Ignite to fire onload.
 */
window.addEventListener ( "load", CompositeC1, false );