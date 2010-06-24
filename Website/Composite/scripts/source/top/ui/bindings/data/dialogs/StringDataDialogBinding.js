StringDataDialogBinding.prototype = new DataDialogBinding;
StringDataDialogBinding.prototype.constructor = StringDataDialogBinding;
StringDataDialogBinding.superclass = DataDialogBinding.prototype;

/**
 * Engineered to carry a single string value.
 * @deprecated
 */
function StringDataDialogBinding () {
    
    /**
     * @type {DOMElement}
     */
    this.input = null;
    
    /*
     * Returnable.
     */
    return this;
}

/**
 * Overloads {@link Binding#onBindingAttach}
 */
StringDataDialogBinding.prototype.onBindingAttach = function () {
	
	StringDataDialogBinding.superclass.onBindingAttach.call ( this ); 
	
	this.input = this.getChildElementsByLocalName ( "input" ).getFirst ();
	
	// alert ( "DEPRECATED: " + this.toString () + ": " + input.name );
	
	if ( this.input != null ) {
		
		/**
		 * Special label setup.
		 */
	    this._setLabelSpeialSetup ();
	    
	    /*
	     * Construct a custom dialog handler. Cannot be done in constructor 
	     * (as first implemented) because we need to subclass.
	     */
	    var self = this;
	    
	    /**
	     * @overwrites {DataDialogBinding#_handler}
		 * @type {IDialogResponseHandler}
		 */
	    this._handler = {
	    	handleDialogResponse : function ( response, result ) {
	    		if ( response == Dialog.RESPONSE_ACCEPT ) {
	    			self._onDialogAccept ( result );
	    		} else {
	    			self._onDialogCancel ();
	    		}
	    	}
	    }
	} else {
		throw "Missing input element!";
	}
}

/**
 * @param {WHAT?} result THIS CAN BE A LIST (TREESELECTORS) PLEAR CLEAR THIS UP!
 * @returns
 */
StringDataDialogBinding.prototype._onDialogAccept = function ( result ) {
	
	result = new String ( result );
	if ( this.input.value != result ) {
		this.dispatchAction( Binding.ACTION_DIRTY );
	}
	this.input.value = result; // SHOULD THIS BE result.getFirst () ???
	this._setLabelSpeialSetup ();
	if ( this.getCallBackID () != null ) {
		var self = this;
	    setTimeout ( function () {
	    	self.dispatchAction( PageBinding.ACTION_DOPOSTBACK );
		}, 0 );
	}
};

StringDataDialogBinding.prototype._onDialogCancel = function () {};

/**
 * Get that URL. This is highly specialized for backend purposes. 
 * URL parameters have been embedded in the hidden input element.
 * @overwrites {DataDialogBinding#getURL}
 */
StringDataDialogBinding.prototype.getURL = function () {

	var url = this.getProperty ( "url" );
	var suf = encodeURIComponent ( this.input.value );
	return new String ( url + suf );
}

/**
 * @overwrites {DataDialogBinding#manifest}
 * @implements {IData}
 */
StringDataDialogBinding.prototype.manifest = function () {
	
	// do nothing
};

/**
 * @implements {IData}
 * @return {string}
 */
StringDataDialogBinding.prototype.setValue = function ( value ) {
	
	this.input.value = value;
};

/**
 * @overwrites {DataDialogBinding#getValue}
 * @implements {IData}
 * @return {string}
 */
StringDataDialogBinding.prototype.getValue = function () {
	
	return this.input.value;
};

/**
 * Special label setup.
 */
StringDataDialogBinding.prototype._setLabelSpeialSetup = function () {

    if ( this.input.value == "" && this.getProperty ( "label-onempty" ) ) {
        this._buttonBinding.setLabel ( this.getProperty ( "label-onempty" ) );
    } else {
        this._buttonBinding.setLabel ( this.getProperty ( "label" ) );
    }
};