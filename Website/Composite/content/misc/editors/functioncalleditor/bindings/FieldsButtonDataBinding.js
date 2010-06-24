FieldsButtonDataBinding.prototype = new DataBinding;
FieldsButtonDataBinding.prototype.constructor = FieldsButtonDataBinding;
FieldsButtonDataBinding.superclass = DataBinding.prototype;

/**
 * @class
 */
function FieldsButtonDataBinding () {

	/**
	 * @type {SystemLogger}
	 */
	this.logger = SystemLogger.getLogger ( "FieldsButtonDataBinding" );
	
	/*
	 * Returnable.
	 */
	return this;
}

/**
 * Identifies binding.
 */
FieldsButtonDataBinding.prototype.toString = function () {

	return "[FieldsButtonDataBinding]";
}

/**
 * @overloads {DataBinding#onBindingRegister}
 */
FieldsButtonDataBinding.prototype.onBindingRegister = function () {
	
	FieldsButtonDataBinding.superclass.onBindingRegister.call ( this );
	
	this.propertyMethodMap [ "image" ] = function ( image ) {
		var button = this._buttonBinding;
		if ( button != null ) { 
			if ( button.imageProfile != null ) {
				button.imageProfile.setDefaultImage ( image ); // DAMMIT!!!
			}
			button.setImage ( image );
		}
	} 
	
	this.propertyMethodMap [ "label" ] = function ( label ) {
		var button = this._buttonBinding;
		if ( button != null ) {
			button.setLabel ( label );
		}
	}
	
	this.propertyMethodMap [ "tooltip" ] = function ( tooltip ) {
		var button = this._buttonBinding;
		if ( button != null ) {
			button.setToolTip ( tooltip );
		}
	}
	
	this.propertyMethodMap [ "isdisabled" ] = function ( isDisabled ) {
		var button = this._buttonBinding;
		if ( button != null ) {
			button.setDisabled ( isDisabled );
		}
	}
}

/**
 * @overloads {DataBinding#onBindingAttach}
 */
FieldsButtonDataBinding.prototype.onBindingAttach = function () {
	
	FieldsButtonDataBinding.superclass.onBindingAttach.call ( this );
	
	var button = this.add ( ClickButtonBinding.newInstance ( this.bindingDocument ));
	
	button.isFocusable = false;
	button.setProperty ( "image", this.getProperty ( "image" ));
	button.setProperty ( "label", this.getProperty ( "label" ));
	
	var isDisabled = this.getProperty ( "isdisabled" );
	if ( isDisabled ) {
		button.setProperty ( "isdisabled", true );
		this.isFocusable = false;
	}
	
	button.attach ();
	this._buttonBinding = button;
	this.addActionListener ( ButtonBinding.ACTION_COMMAND );
	
	// garbage going on here!
	var callbackid = this.getProperty ( "callbackid" );
	if ( callbackid != null ) {
		Binding.dotnetify ( this ); 
	}
}

/**
 * @implements {IActionListener}
 * @overloads {Binding#handleAction}
 * @param {Action} action
 */
FieldsButtonDataBinding.prototype.handleAction = function ( action ) {
	
	FieldsButtonDataBinding.superclass.handleAction.call ( this, action );
	
	switch ( action.type ) {
		case ButtonBinding.ACTION_COMMAND :
			this.focus ();
			this.dispatchAction ( PageBinding.ACTION_DOPOSTBACK );
			break;
	}
}

//ABSTRACT METHODS ............................................................

/**
 * Validate.
 * @implements {IData}
 * @return {boolean}
 */
FieldsButtonDataBinding.prototype.validate = function () {
	
	return true;
};

/**
 * Manifest. This will write form elements into page DOM 
 * so that the server recieves something on form submit.
 * @implements {IData}
 */
FieldsButtonDataBinding.prototype.manifest = function () {};

/**
 * Get value. This is intended for serversice processing.
 * @implements {IData}
 * @return {string}
 */
FieldsButtonDataBinding.prototype.getValue = function () {};

/**
 * Set value.
 * @implements {IData}
 * @param {string} value
 */
FieldsButtonDataBinding.prototype.setValue = function () {};

/**
 * Get result. This is intended for clientside processing.
 * @implements {IData}
 * @return {object}
 */
FieldsButtonDataBinding.prototype.getResult = function () {};

/**
 * Set result.
 * @implements {IData}
 * @param {object} value
 */
FieldsButtonDataBinding.prototype.setResult = function () {};