FieldHelpBinding.prototype = new Binding;
FieldHelpBinding.prototype.constructor = FieldHelpBinding;
FieldHelpBinding.superclass = Binding.prototype;

FieldHelpBinding.INDICATOR_IMAGE = null;

/**
 * @class
 */
function FieldHelpBinding () {

	/**
	 * @type {SystemLogger}
	 */
	this.logger = SystemLogger.getLogger ( "FieldHelpBinding" );
	
	/*
	 * Returnable.
	 */
	return this;
}

/**
 * Identifies binding.
 */
FieldHelpBinding.prototype.toString = function () {

	return "[FieldHelpBinding]";
}

/**
 * @overloads {Binding#onBindingAttach}
 */
FieldHelpBinding.prototype.onBindingAttach = function () {
	
	FieldHelpBinding.superclass.onBindingAttach.call ( this );
	
	this.buildPopupBinding ();
	this.buildPopupButton ();
}

/**
 * @overloads {Binding#onBindingDispose}
 */
FieldHelpBinding.prototype.onBindingDispose = function () {
	
	FieldHelpBinding.superclass.onBindingDispose.call ( this );
	
	var popup = this._fieldHelpPopupBinding;
	if ( popup ) {
		popup.dispose ();
	}
}

/**
 * Build popup.
 */
FieldHelpBinding.prototype.buildPopupBinding = function () {
	
	var popupSetBinding = app.bindingMap.fieldhelpopupset;
	var doc = popupSetBinding.bindingDocument;
	var popupBinding = popupSetBinding.add (
		PopupBinding.newInstance ( doc )
	);
	var bodyBinding = popupBinding.add (
		PopupBodyBinding.newInstance ( doc )
	);
	popupBinding.position = PopupBinding.POSITION_RIGHT;
	popupBinding.attachClassName ( "fieldhelppopup" );
	
	/*
	 * Help can be written inside the tag or supplied in the label attribute.
	 */
	if ( this.bindingElement.hasChildNodes ()) {
		bodyBinding.bindingElement.innerHTML = this.bindingElement.innerHTML;
	} else {
		var label = this.getProperty ( "label" );
		if ( label ) {
			bodyBinding.bindingElement.innerHTML = Resolver.resolve ( label );
		}
	}
	
	this.bindingElement.innerHTML = "";
	this._fieldHelpPopupBinding = popupBinding;
}

/**
 * Build DOM content.
 */
FieldHelpBinding.prototype.buildPopupButton = function () {

	var field = this.getAncestorBindingByLocalName ( "field" );
	
	if ( field ) {
	
		field.attachClassName ( "fieldhelp" );
		
		var button = ClickButtonBinding.newInstance ( this.bindingDocument );
		button.attachClassName ( "fieldhelp" ); 
	 	button.setImage ( FieldHelpBinding.INDICATOR_IMAGE );
	 	this.add ( button );
	 	button.attach ();
	 	
	 	var self = this;
	 	button.oncommand = function () {
			self.attachPopupBinding ();
		}
		
		button.setPopup ( this._fieldHelpPopupBinding );
	 	this._fieldHelpButton = button;
	}
}

/**
 * Attach popup. For faster page load time, the popup bindings 
 * get attached only when user handles the button.
 */
FieldHelpBinding.prototype.attachPopupBinding = function () {

	var popup = this._fieldHelpPopupBinding;
	if ( popup && !popup.isAttached ) {
		popup.attachRecursive ();
	}
}