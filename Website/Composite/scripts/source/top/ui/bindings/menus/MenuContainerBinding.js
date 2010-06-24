MenuContainerBinding.prototype = new Binding;
MenuContainerBinding.prototype.constructor = MenuContainerBinding;
MenuContainerBinding.superclass = Binding.prototype;

/**
 * @implements {IMenuContainer}
 */
function MenuContainerBinding () {
	
	/**
	 * @type {SystemLogger}
	 */
	this.logger = SystemLogger.getLogger ( "MenuContainerBinding" );
	
	/**
	 * @type {boolean}
	 * @private
	 */
	this._isOpen = false;
	
	/**
	 * @type {MenuBinding} 
	 * @private
	 */
	this._openElement = null;
	
	/**
	 * @type {MenuContainerBinding}
	 * @private
	 */
	this.menuContainerBinding = null;
	
	/**
	 * @type {MenuPopupBinding}
	 * @private
	 */
	this.menuPopupBinding = null;
}

/**
 * Identifies binding.
 */
MenuContainerBinding.prototype.toString = function () {

	return "[MenuContainerBinding]";
}

/**
 * Is open?
 * @param {Binding} object TODO: update documentation around here!
 * @return {boolean}
 */
MenuContainerBinding.prototype.isOpen = function ( object ) {

	var result = null;
	if ( !object ) {
		result = this._isOpen;
	} else {
		result = ( object == this._openElement );
	}
	return result;
}

/**
 * @param {Binding} binding Ehm, this could actually also be a boolean value of false...
 */
MenuContainerBinding.prototype.setOpenElement = function ( binding ) {
	
	if ( binding ) {
		if ( this._openElement ) {
			this._openElement.hide ();
		}
		this._openElement = binding;
		this._isOpen = true;
	} else {
		this._openElement = null;
		this._isOpen = false;
	}
}

/**
 * Locating ancestor MenuContainerBinding.
 * @return {MenuContainerBinding}
 */
MenuContainerBinding.prototype.getMenuContainerBinding = function () {
	
	if ( !this.menuContainerBinding ) {
		this.menuContainerBinding = this.getAncestorBindingByType ( MenuContainerBinding );
	}
	return this.menuContainerBinding;
}

/**
 * Locating child MenuPopupBinding. Code allows for the menupopup to be replaced runtime.
 * @return {MenuPopupBinding}
 */
MenuContainerBinding.prototype.getMenuPopupBinding = function () {
	
	var menuPopup = this.getChildBindingByLocalName ( "menupopup" );
	if ( menuPopup && menuPopup != this.menuPopupBinding ) {
		this.menuPopupBinding = menuPopup;
		this.menuPopupBinding.addActionListener ( PopupBinding.ACTION_HIDE, this );
	}
	return this.menuPopupBinding;
}

/**
 * Show.
 * @overwrites {Binding#show}
 */
MenuContainerBinding.prototype.show = function () {
	
	var container = this.getMenuContainerBinding ();
	container.setOpenElement ( this );
	
	var popup = this.getMenuPopupBinding ();
	popup.snapTo ( this.bindingElement );
	popup.show ();
}

/**
 * Hide.
 * @overwrites {Binding#hide}
 */
MenuContainerBinding.prototype.hide = function () {
	
	this.reset ();
	this.getMenuPopupBinding ().hide ();
	if ( this._isOpen ) {
		this._openElement.hide ();
	}
}

/**
 * Reset visual appearance when menus are closed. Subclasses should define this method.
 */
MenuContainerBinding.prototype.reset = Binding.ABSTRACT_METHOD;

/**
 * @implements {IActionListener}
 * @overloads {Binding#handleAction}
 * @param {Action} action
 */
MenuContainerBinding.prototype.handleAction = function ( action ) {
	
	MenuContainerBinding.superclass.handleAction.call ( this, action );
	
	if ( action.type == PopupBinding.ACTION_HIDE ) {
		var container = this.getMenuContainerBinding ();
		container.setOpenElement ( false );
		this.reset ();
		action.consume ();
	}
}