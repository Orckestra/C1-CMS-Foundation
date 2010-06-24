PopupBodyBinding.prototype = new Binding;
PopupBodyBinding.prototype.constructor = PopupBodyBinding;
PopupBodyBinding.superclass = Binding.prototype;

/**
 * @class
 */
function PopupBodyBinding () {

	/**
	 * @type {SystemLogger}
	 */
	this.logger = SystemLogger.getLogger ( "PopupBodyBinding" );
}

/**
 * Identifies binding.
 */
PopupBodyBinding.prototype.toString = function () {

	return "[PopupBodyBinding]";
}

/**
 * Emulates basic CSS support in Explorer. Invoked by the containing {@link PopupBinding}.
 * @param {Dimension} dim
 */
PopupBodyBinding.prototype.setDimension = function ( dim ) {
	
	this.getBindingElement ().style.width = new String ( dim.w ) + "px";
}

/**
 * PopupBodyBinding factory.
 * @param {DOMDocument} ownerDocument
 * @return {PopupBodyBinding}
 */
PopupBodyBinding.newInstance = function ( ownerDocument ) {

	var element = DOMUtil.createElementNS ( Constants.NS_UI, "ui:popupbody", ownerDocument );
	return UserInterface.registerBinding ( element, PopupBodyBinding );
}