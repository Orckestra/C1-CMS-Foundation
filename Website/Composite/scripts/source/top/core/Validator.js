function _Validator () {}

_Validator.prototype = {
		
	/**
	 * Validate.
	 * @param {String} string
	 * @param {String} key
	 * @param {boolean} isInformed
	 * @returns {boolean}
	 */
	validate : function ( string, key, isInformed ) {
	
		var result = true;
		var response = SourceValidationService.ValidateSource ( string, key );
		if ( response != "True" ) {
			if ( isInformed == true ) {
				this._dialog ( response );
			}
			result = false;
		}
		return result;
	},

	/**
	 * Validate by presenting a dialog in case of non-validating input.
	 * @param {String} string
	 * @param {String} key
	 * @param {boolean} isInformed
	 * @returns {boolean}
	 */
	validateInformed : function ( string, key ) {
		
		return this.validate ( string, key, true );
	},
	
	/**
	 * In case of non-validating source, present a clarifying dialog. 
	 * @param {String} string
	 */
	_dialog : function ( string ) {
		
		/*
		 * Timeout allows any previous method to returnvalue first.
		 */
		setTimeout ( function () {
			Dialog.error ( "Source Invalid", string );
		}, 0 );
	}
};

var Validator = new _Validator ();