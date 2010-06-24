MenuPopupBinding.prototype = new PopupBinding;
MenuPopupBinding.prototype.constructor = MenuPopupBinding;
MenuPopupBinding.superclass = PopupBinding.prototype;

function MenuPopupBinding () {

	/**
	 * @type {SystemLogger}
	 */
	this.logger = SystemLogger.getLogger ( "MenuPopupBinding" );
	
	/*
	 * Returnable.
	 */
	return this;
}

/**
 * Identifies binding.
 */
MenuPopupBinding.prototype.toString = function () {

	return "[MenuPopupBinding]";
}

/**
 * Menupopups are always positioned in a local coordinate space.
 * @overwrites {PopupBinding#_getElementPosition}.
 * @param {DOMElement} element
 * @return {Point}
 */
MenuPopupBinding.prototype._getElementPosition = function ( element ) {

	return new Point ( element.offsetLeft, 0 );
}

/**
 * MenuPopupBinding factory.
 * @param {DOMDocument} ownerDocument
 * @return {MenuPopupBinding}
 */
MenuPopupBinding.newInstance = function ( ownerDocument ) {

	var element = DOMUtil.createElementNS ( Constants.NS_UI, "ui:menupopup", ownerDocument );
	return UserInterface.registerBinding ( element, MenuPopupBinding );
}