/**
 * @class
 * Allows basic communication between C1 and the Prism host. 
 * The C1 CMS extension must be installed in Prism.
 */
function _Prism () {}
_Prism.prototype = {
		
	/**
	 * @type {SystemLogger}
	 */
	_logger : SystemLogger.getLogger ( "Prism" ),
	
	/**
	 * This will clear the cache (in Prism only).
	 */
	clearCache : function () {
	
		this._logger.fine ( "Clearing the cache" );
		this._dispatchToPrism ( "contenttochrome-clearcache" );
	},
	
	/**
	 * This will disable forced cache in Prism. Forced. 
	 * cache is a setup were files are NEVER checked 
	 * for newer versions on server unless expired.
	 */
	disableCache : function () {
		
		this._logger.fine ( "Disabling cache" );
		this._dispatchToPrism ( "contenttochrome-cache-disable" );
	},
	
	/**
	 * This will enable forced cache in Prism (see note above).
	 */
	enableCache : function () {
		
		this._logger.fine ( "Enabling cache" );
		this._dispatchToPrism ( "contenttochrome-cache-enable" );
	},
	
	/**
	 * Dispatch event to Prism host.
	 * @param {string} type
	 */
	_dispatchToPrism : function ( type ) {
		
		if ( Client.isPrism ) {
			var event = document.createEvent ( "Events" );
			event.initEvent ( type, true, true );
			window.dispatchEvent ( event );
		} else {
			this._logger.warn ( "Prism methods should only be invoked in Prism! (" + type + ")" );
		}
	}
}

/**
 * The instance that does it.
 * @type {_Chrome}
 */
var Prism = new _Prism ();