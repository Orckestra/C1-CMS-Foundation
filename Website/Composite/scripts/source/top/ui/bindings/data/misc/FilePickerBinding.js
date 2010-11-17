FilePickerBinding.prototype = new DataBinding;
FilePickerBinding.prototype.constructor = FilePickerBinding;
FilePickerBinding.superclass = DataBinding.prototype;


/**
 * @class
 * @implements {IData}
 */
function FilePickerBinding () {

	/**
	 * @type {SystemLogger}
	 */
	this.logger = SystemLogger.getLogger ( "FilePickerBinding" );
	
	/**
	 * @type {boolean}
	 */
	this.isReadOnly = true;
	
	/**
	 * @type {boolean}
	 */
	this._isValid = true;
	
	/*
	 * Returnable.
	 */
	return this;
}

/**
 * Identifies binding.
 */
FilePickerBinding.prototype.toString = function () {

	return "[FilePickerBinding]";
}

/**
 * @overloads {DataBinding#onBindingAttach}
 * @return
 */
FilePickerBinding.prototype.onBindingAttach = function () {
	
	FilePickerBinding.superclass.onBindingAttach.call ( this );
	
	var real = this.getDescendantElementsByLocalName ( "input" ).getLast ();
	var fake = this.getDescendantBindingByLocalName( "datainput" );
	
	fake.isFocusable = false;
	
	var self = this;
	real.onchange = function () {
		var val = this.value;
		if ( val.indexOf ( "/" ) >-1 ) { // unix maybe?
			val = val.substring ( val.lastIndexOf ( "/" ) + 1 );
		} else if ( val.indexOf ( "\\" ) >-1 ) { // windows
				val = val.substring ( val.lastIndexOf ( "\\" ) + 1 );
		}
		fake.setValue ( val );
		self.dirty ();
		if ( !self._isValid ) {
			self.validate ();
		}
	}
}

// IMPLEMENT IDATA .............................................................

/**
 * Validate.
 * @implements {IData}
 * @return {boolean}
 */
FilePickerBinding.prototype.validate = function () {
	
	var result = true;
	if ( this.getProperty ( "required" )) {
		var fake = this.getDescendantBindingByLocalName( "datainput" );
		result = fake.getValue () != "";
	}
	if ( !result && this._isValid ) {
		this._isValid = false;
		this.dispatchAction ( Binding.ACTION_INVALID );
	} else if ( result && !this._isValid ) {
		this.dispatchAction ( Binding.ACTION_VALID );
	}	
	return result;
}

/**
 * Focus.
 * @overloads {DataBinding#focus}
 */
FilePickerBinding.prototype.focus = function () {
	
	FilePickerBinding.superclass.focus.call ( this );
	
	if ( this.isFocused ) {
		var fake = this.getDescendantBindingByLocalName ( "datainput" );
		if ( fake != null ) {
			fake.attachClassName ( DataBinding.CLASSNAME_FOCUSED );
		}
	}
}

/**
 * Blur.
 * @overloads {DataBinding#focus}
 */
FilePickerBinding.prototype.blur = function () {
	
	FilePickerBinding.superclass.blur.call ( this );

	if ( !this.isFocused ) {
		var fake = this.getDescendantBindingByLocalName ( "datainput" );
		if ( fake != null ) { // how could it be? A mystery...
			fake.detachClassName ( DataBinding.CLASSNAME_FOCUSED );
		}
	}
}

/**
 * Manifest. This will write form elements into page DOM 
 * so that the server recieves something on form submit.
 * @implements {IData}
 */
FilePickerBinding.prototype.manifest = function () {
	
	// do nothing
}

/**
 * Get value. This is intended for serversice processing.
 * @implements {IData}
 * @return {string}
 */
FilePickerBinding.prototype.getValue = function () {
	
	// do nothing - highly specialized setup
}

/**
 * Set value.
 * @implements {IData}
 * @param {string} value
 */
FilePickerBinding.prototype.setValue = function () {
	
	// do nothing
}

/**
 * Get result. This is intended for clientside processing.
 * @implements {IData}
 * @return {object}
 */
FilePickerBinding.prototype.getResult = function () {
	
	// do nothing
}

/**
 * Set result.
 * @implements {IData}
 * @param {object} value
 */
FilePickerBinding.prototype.setResult = function () {
	
	// do nothing
}