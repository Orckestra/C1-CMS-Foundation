var CompositeC1 = new function () {
	
	const STATE_START = Components.interfaces.nsIWebProgressListener.STATE_START;
	const STATE_STOP = Components.interfaces.nsIWebProgressListener.STATE_STOP;
	
	var browser = null;
	var appwin = null;
	var isFirstTime = true;
	
	/*
	 * Compute whether or not we can hide the browser on startup. The entry in  
	 * globalStorage is filed when the show-browser event is first intercepted, 
	 * so the browser may not be hidden on very first run. 
	 */
	var sessionHost = null;
	var uri = window.WebAppProperties.uri;
	sessionHost = uri.split ( "//" )[ 1 ].split ( "/" )[ 0 ];
	var isBrowserHideable = window.globalStorage [ sessionHost ].isPrismBrowserHideable == "true";
	
	/*
	 * Read the default cache setting. 
	 * This is most likey set to 2.
	 */ 
	var prefs = Components.classes["@mozilla.org/preferences-service;1"].
		getService(Components.interfaces.nsIPrefBranch);
	var defaultCache = parseInt ( prefs.getIntPref ( "browser.cache.check_doc_frequency" ));
	
	/*
	 * Clear the cache!
	 * @param {boolean} isNotify
	 */
	this.clearCache = function ( isNotify ) {
		
		var cache = Components.classes [ "@mozilla.org/network/cache-service;1" ].
    	getService(Components.interfaces.nsICacheService);
	    try {
	    	cache.evictEntries ( Components.interfaces.nsICache.STORE_ANYWHERE );
	    	if ( isNotify ) {
	    		alert ( "The cache has been cleared.\nPress Ctrl+R to reload." );
	    	}
	    } catch ( exception ) {
	    	if ( isNotify ) {
	    		alert ( "Cache could not be cleared!" );
	    	}
	    }
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
				if ( isBrowserHideable == true ) {
					browser.style.visibility = "hidden";
				}
				break;
			
			/*
			 * The main window has been hidden to avoid the "splash of white" 
			 * on startup. This may be changed if future versions of Prism 
			 * standardize the splash screen...
			 */
			case "contenttochrome-presentable" :
				
				/*
				 * If chaos ensues, we can kill the splash screen hack by 
				 * setting the isPrismBrowserHideable entry to "false". 
				 */
				if ( window.globalStorage [ sessionHost ].isPrismBrowserHideable == null ) {
					window.globalStorage [ sessionHost ].isPrismBrowserHideable = "true";
				}
				browser = document.getElementById ( "browser_content" );
				if ( browser.style.visibility != "visible" ) {
					browser.style.visibility = "visible";
				}
				break;
				
			/*
			 * Clear the cache. Fired by content.
			 * @see {_Chrome#clearCache}
			 */
			case "contenttochrome-clearcache" :
		        this.clearCache ();
				break;
		}
	}
	
	/**
	 * @see {CompositeC1#onLocationChange}
	 */
	this.initialize = function () {
		
		browser.contentWindow.addEventListener ( "contenttochrome-presentable", this, false );
		browser.contentWindow.addEventListener ( "contenttochrome-clearcache", this, false );
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
		 * Setup content-to-chrome messaging 
		 * when the app is operational.
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
	this.onProgressChange = function() {return 0;}
	this.onStatusChange = function() {return 0;}
	this.onSecurityChange = function() {return 0;}
	this.onLinkIconAvailable = function() {return 0;}
}

/*
 * Ignite to fire onload.
 */
window.addEventListener ( "load", CompositeC1, false );