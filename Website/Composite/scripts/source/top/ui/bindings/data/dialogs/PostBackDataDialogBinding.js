PostBackDataDialogBinding.prototype = new DataDialogBinding;
PostBackDataDialogBinding.prototype.constructor = PostBackDataDialogBinding;
PostBackDataDialogBinding.superclass = DataDialogBinding.prototype;

PostBackDataDialogBinding.ACTION_COMMAND = "postbackdialog command";

/**
 * Engineered to carry a single string value.
 */
function PostBackDataDialogBinding () {
    
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
PostBackDataDialogBinding.prototype.onBindingAttach = function () {
	
	PostBackDataDialogBinding.superclass.onBindingAttach.call ( this ); 
	
	Binding.dotnetify ( this );
	
	var self = this;
	this._handler = {
    	handleDialogResponse : function ( response, result ) {
    		if ( response == Dialog.RESPONSE_ACCEPT ) {
    			self._onDialogAccept ( result );
    		} else {
    			self._onDialogCancel ();
    		}
    	}
    }
}

/**
 * @param {WHAT?} result THIS CAN BE A LIST (TREESELECTORS) PLEAR CLEAR THIS UP!
 * @returns
 */
PostBackDataDialogBinding.prototype._onDialogAccept = function ( result ) {
	
	result = new String ( result );
	
	this.dirty ();
	this.setValue(encodeURIComponent(result));
	this.validate(true);
	
	var self = this;
    setTimeout ( function () { // close dialog first!
    	if ( self.ondialogaccept != null ) {
    		self.ondialogaccept ();
    	}
    	self.dispatchAction( PageBinding.ACTION_DOPOSTBACK ); 
	}, 0 );
};

PostBackDataDialogBinding.prototype._onDialogCancel = function () {
	
	if ( this.ondialogcancel != null ) {
		this.ondialogcancel ();
	}
};

/**
 * Get that URL. The URL must follow our plan, which is to have an url 
 * property "hello?hey=" to which we append the VALUE of the control, 
 * "howdy", order to launch the dialog residing on the url "hello?hey=howdy".  
 * @overwrites {DataDialogBinding#getURL}
 */
PostBackDataDialogBinding.prototype.getURL = function () {

	var url = this.getProperty ( "url" );
	var suf = this.getValue(); // encodeURIComponent now on server!
	if (suf == null)
		suf = this.getProperty("defaultValue");
	return new String ( url + suf );
}

/**
 * @overwrites {DataDialogBinding#manifest}
 * @implements {IData}
 */
PostBackDataDialogBinding.prototype.manifest = function () {
	
	var value = this.getValue ();
	if ( value == null ) {
		value = "";
	}
	this.shadowTree.dotnetinput.value = value;
};

/**
 * @implements {IData}
 * @return {string}
 */
PostBackDataDialogBinding.prototype.setValue = function ( value ) {
	
	this.setProperty ( "value", value );
};

/**
 * @overwrites {DataDialogBinding#getValue}
 * @implements {IData}
 * @return {string}
 */
PostBackDataDialogBinding.prototype.getValue = function () {
	
	return this.getProperty ( "value" );
};

/**
 * NOT FOR CLIENTSIDE USE.
 * @overwrites {DataDialogBinding#getResult}
 * @implements {IData}
 */
PostBackDataDialogBinding.prototype.getResult = function () {
	
	return null;
};

/**
 * NOT FOR CLIENTSIDE USE.
 * @overwrites {DataDialogBinding#setResult}
 * @param {String} result
 * @implements {IData}
 */
PostBackDataDialogBinding.prototype.setResult = function ( result ) {};

/**
 * PostBackDataDialogBinding factory.
 * @param {DOMDocument} ownerDocument
 * @return {PostBackDataDialogBinding}
 */
PostBackDataDialogBinding.newInstance = function ( ownerDocument ) {

	var element = DOMUtil.createElementNS ( Constants.NS_UI, "ui:postbackdialog", ownerDocument );
	return UserInterface.registerBinding ( element, PostBackDataDialogBinding );
};