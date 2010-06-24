CheckBoxGroupBinding.prototype = new Binding;
CheckBoxGroupBinding.prototype.constructor = CheckBoxGroupBinding;
CheckBoxGroupBinding.superclass = Binding.prototype;

/**
 * @class
 */
function CheckBoxGroupBinding () {

	/**
	 * @type {SystemLogger}
	 */
	this.logger = SystemLogger.getLogger ( "CheckBoxGroupBinding" );
	
	/**
	 * @type {boolean}
	 */
	this.isRequired = false;
	
	/**
	 * @type {boolean}
	 */
	this.isValid = true;
}

/**
 * Identifies binding.
 */
CheckBoxGroupBinding.prototype.toString = function () {
	
	return "[CheckBoxGroupBinding]";
}

/**
 * Identifies binding.
 */
CheckBoxGroupBinding.prototype.onBindingAttach = function () {
	
	CheckBoxGroupBinding.superclass.onBindingAttach.call ( this );
	this.isRequired = this.getProperty ( "required" ) == true;
}

/**
 * @return {boolean}
 */
CheckBoxGroupBinding.prototype.validate = function () {
	
	var result = true;
	if ( this.isRequired ) {
		var checkboxes = this.getDescendantBindingsByLocalName ( "checkbox" );
		if ( checkboxes.hasEntries ()) {
			result = false;
			while ( checkboxes.hasNext () && !result ) {
				if ( checkboxes.getNext ().isChecked ) {
					result = true;
				}
			}
		}
		if ( result == false ) {
			this._showWarning ( true );
			this.dispatchAction ( Binding.ACTION_INVALID );
			this.addActionListener ( CheckBoxBinding.ACTION_COMMAND );
		}
	}
	return result;
}

/**
 * Show or hide warning.
 * @param {boolean} isShow
 */
CheckBoxGroupBinding.prototype._showWarning = function ( isShow ) {
	
	if ( isShow ) {
		if ( !this._labelBinding ) {
			var labelBinding = LabelBinding.newInstance ( this.bindingDocument );
			labelBinding.attachClassName ( "invalid" );
			labelBinding.setImage ( "${icon:error}" );
			labelBinding.setLabel ( "Selection required" );
			this._labelBinding = this.addFirst ( labelBinding );
			this._labelBinding.attach ();
		}
	} else if ( this._labelBinding ) {
		this._labelBinding.dispose ();
		this._labelBinding = null;
	}
}

/**
 * @implements {IActionListener}
 * @overloads {Binding#handleAction}
 * @param {Action} action
 */
CheckBoxGroupBinding.prototype.handleAction = function ( action ) {
	
	CheckBoxGroupBinding.superclass.handleAction.call ( this, action );
	
	switch ( action.type ) {
		case CheckBoxBinding.ACTION_COMMAND :
			this._showWarning ( false );
			this.dispatchAction ( Binding.ACTION_VALID );
			this.removeActionListener ( CheckBoxBinding.ACTION_COMMAND );
			break;
	}
}

/**
 * CheckBoxGroupBinding factory.
 * @param {DOMDocument} ownerDocument
 * @return {CheckBoxGroupBinding}
 */
CheckBoxGroupBinding.newInstance = function ( ownerDocument ) {

	var element = DOMUtil.createElementNS ( Constants.NS_UI, "ui:checkboxgroup", ownerDocument );
	return UserInterface.registerBinding ( element, CheckBoxGroupBinding );
}