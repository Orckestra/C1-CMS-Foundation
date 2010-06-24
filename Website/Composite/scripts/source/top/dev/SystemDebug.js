/**
 * @class
 * Debug that system.
 */
function _SystemDebug () {}

_SystemDebug.prototype = {
	
	_logger : SystemLogger.getLogger ( "SystemDebug" ),
	_stacklength : parseInt ( 5 ),

	/**
	 * Print sort of a strack trace.
	 * @param {object} args
	 * @param @optional {int} length
	 * @return
	 */
	stack : function ( args, length ) {
		
		this._stackMozilla ( args, length );
		/*
		if ( Client.isMozilla == true ) {
			this._stackMozilla ( args, length );
		} else {
			this._logger.debug ( "TODO!" );
		}
		*/
	},

	/**
	 * Stack Mozilla.
	 * @param {object} args
	 * @param @optional {int} length
	 */
	_stackMozilla : function ( args, length ) {
		
		length = length ? length : this._stacklength;
		if ( Client.isMozilla && args.callee || args.caller ) {
			var caller = Client.isMozilla ? args.callee.caller : args.caller.callee;
			var stack = "";
			
			var i = 0;
			while ( caller != null && i++ < length ) {
				stack += "\n#" + i + "\n";
				stack += caller.toString ();
				caller = caller.caller;
				stack += "\n";
			}
			
			this._logger.error ( stack );
		} else {
			this._logger.error ( "(Error stack unreachable!)" );
		}
	}

}

/*
 * The instance that does it.
 * @type {_SystemDebug}
 */
var SystemDebug = new _SystemDebug;
