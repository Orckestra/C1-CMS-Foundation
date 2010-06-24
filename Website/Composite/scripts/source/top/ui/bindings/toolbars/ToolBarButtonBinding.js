ToolBarButtonBinding.prototype = new ButtonBinding;
ToolBarButtonBinding.prototype.constructor = ToolBarButtonBinding;
ToolBarButtonBinding.superclass = ButtonBinding.prototype;

/**
 * @class
 */
function ToolBarButtonBinding () {
	
	/**
	 * @type {SystemLogger}
	 */
	this.logger = SystemLogger.getLogger ( "ToolBarButtonBinding" );
}

/**
 * Identifies binding.
 */
ToolBarButtonBinding.prototype.toString = function () {

	return "[ToolBarButtonBinding]";
}

/**
 * ToolBarButtonBinding factory.
 * @param {DOMDocument} ownerDocument
 * @return {ToolBarButtonBinding}
 */
ToolBarButtonBinding.newInstance = function ( ownerDocument ) {

	var element = DOMUtil.createElementNS ( Constants.NS_UI, "ui:toolbarbutton", ownerDocument );
	return UserInterface.registerBinding ( element, ToolBarButtonBinding );
}