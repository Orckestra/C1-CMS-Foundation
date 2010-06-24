ContentErrorDialogPageBinding.prototype = new DialogPageBinding;
ContentErrorDialogPageBinding.prototype.constructor = ContentErrorDialogPageBinding;
ContentErrorDialogPageBinding.superclass = DialogPageBinding.prototype;

/**
 * @class
 */
function ContentErrorDialogPageBinding () {
	
	/**
	 * @type {SystemLogger}
	 */
	this.logger = SystemLogger.getLogger ( "ContentErrorDialogPageBinding" );
	
	/**
	 * Supplied as page argument.
	 * @type {SOAPFault}
	 */
	this._soapFault = null;
}

/**
 * Identifies binding.
 */
ContentErrorDialogPageBinding.prototype.toString = function () {

	return "[ContentErrorDialogPageBinding]";
}

/**
 * @param {SOAPFault} soapFault
 */
ContentErrorDialogPageBinding.prototype.setPageArgument = function ( soapFault ) {
	
	ContentErrorDialogPageBinding.superclass.setPageArgument.call ( this, soapFault );
	
	this._soapFault = soapFault;
}

/**
 * @param {SOAPFault} soapFault
 */
ContentErrorDialogPageBinding.prototype.onBeforePageInitialize = function ( soapFault ) {
	
	var string = this._soapFault.getFaultString ();
	var key = "Failed to parse html:\n\n";
	var error = null;
	
	/*
	 * Parse the HTMLTidy error message and extract the relevant part.
	 */
	if ( string.indexOf ( key ) >-1 ) {
		try {
			var split = string.split ( key )[ 1 ];
			error = split.split ( "\n" )[ 0 ];
			error = error.replace ( " - Error:", ":" );
		} catch ( exception ) {
			error = "Unknown error.";
			this.logger.error ( "Error could not be parsed!" );
		}
	} else {
		error = "Unknown error.";
	}
	
	this.bindingDocument.getElementById ( "error" ).firstChild.data = error;
	ContentErrorDialogPageBinding.superclass.onBeforePageInitialize.call ( this );
}

/**
 * Force-unlock application interface. This is 
 * needed when a switch to Preview tab was made 
 * using invalid markup.
 * @overloads {PageBinding#onAfterPageInitialize}
 */
ContentErrorDialogPageBinding.prototype.onAfterPageInitialize = function () {

	ContentErrorDialogPageBinding.superclass.onAfterPageInitialize.call ( this );
	if ( Application.isLocked ) {
		Application.unlock ( this, true );
	}
}