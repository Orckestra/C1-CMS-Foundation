DialogBorderBinding.prototype = new Binding;
DialogBorderBinding.prototype.constructor = DialogBorderBinding;
DialogBorderBinding.superclass = Binding.prototype;

DialogBorderBinding.TYPE_NORTH	= "n";
DialogBorderBinding.TYPE_SOUTH 	= "s";
DialogBorderBinding.TYPE_EAST 	= "e";
DialogBorderBinding.TYPE_WEST 	= "w";
DialogBorderBinding.DIMENSION 	= 4;

/**
 * @class
 */
function DialogBorderBinding () {

	/**
	 * @type {SystemLogger}
	 */
	this.logger = SystemLogger.getLogger ( "DialogBorderBinding" );
	
	/**
	 * Overwrites super property.
	 * @type {boolean}
	 */
	this.isDraggable = true;
	
	/**
	 * This property is set by the containing {@link DialogBinding}.
	 * @type {string}
	 * @private
	 */
	this._type = null;
}

/**
 * Identifies binding.
 */
DialogBorderBinding.prototype.toString = function () {

	return "[DialogBorderBinding]";
}

/**
 * @param {string} type
 */
DialogBorderBinding.prototype.setType = function ( type ) {
 
	this.attachClassName ( type );
	this._type = type;
}

/**
 * @return {string}
 */
DialogBorderBinding.prototype.getType = function () {

	return this._type;
}

/**
 * DialogBorderBinding factory.
 * @param {DOMDocument} ownerDocument
 * @return {DialogBorderBinding}
 */
DialogBorderBinding.newInstance = function ( ownerDocument ) {
	var element = DOMUtil.createElementNS ( Constants.NS_UI, "ui:dialogborder", ownerDocument );
	return UserInterface.registerBinding ( element, DialogBorderBinding );
}