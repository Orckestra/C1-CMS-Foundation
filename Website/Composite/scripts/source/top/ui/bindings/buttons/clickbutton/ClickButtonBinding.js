ClickButtonBinding.prototype = new ButtonBinding;
ClickButtonBinding.prototype.constructor = ClickButtonBinding;
ClickButtonBinding.superclass = ButtonBinding.prototype;

/**
 * @class
 */
function ClickButtonBinding () {

	/**
	 * @type {SystemLogger}
	 */
	this.logger = SystemLogger.getLogger ( "ClickButtonBinding" );
}

/**
 * Identifies binding.
 */
ClickButtonBinding.prototype.toString = function () {

	return "[ClickButtonBinding]";
}

/**
 * ClickButtonBinding factory.
 * @param {DOMDocument} ownerDocument
 * @return {ClickButtonBinding}
 */
ClickButtonBinding.newInstance = function ( ownerDocument ) {

	var element = DOMUtil.createElementNS ( Constants.NS_UI, "ui:clickbutton", ownerDocument );
	return UserInterface.registerBinding ( element, ClickButtonBinding );
}