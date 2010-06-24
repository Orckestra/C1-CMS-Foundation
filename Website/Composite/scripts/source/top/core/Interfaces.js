/**
 * @class
 * Primitively checks an object instance for an interface implementation. 
 * TODO: build up some sort of status repport for debugging.
 */
function _Interfaces () {
	
	/**
	 * This logger could probably report a detailed result.
	 * @type {SystemLogger}
	 */
	var logger = SystemLogger.getLogger ( "Interfaces" );
	
	/**
	 * Is interface implemented by instance object?
	 * @param {object} interfais (not using reserved keyword here)
	 * @param {object} instance
	 * @param {object} isLogging
	 * @return {boolean}
	 */
	this.isImplemented = function ( interfais, instance, isLogging ) {
		
		var isImplemented = true;
		for ( var property in interfais ) {
			if ( typeof instance [ property ] == Types.UNDEFINED ) {
				isImplemented = false;
			} else if ( typeof interfais [ property ] != typeof instance [ property ]) {
				isImplemented = false;
			}
			if ( !isImplemented ) {
				break;
			}
		}
		if ( !isImplemented ) {
			if ( isLogging ) {
				logger.fine ( instance + " invalid. Interface check abandoned at: " + property );
			}
		}
		return isImplemented;
	}
}

var Interfaces = new _Interfaces;