DialogHeadBinding.prototype = new Binding;
DialogHeadBinding.prototype.constructor = DialogHeadBinding;
DialogHeadBinding.superclass = Binding.prototype;

/**
 * @class
 */
function DialogHeadBinding () {

	/**
	 * @type {SystemLogger}
	 */
	this.logger = SystemLogger.getLogger ( "DialogHeadBinding" );
}

/**
 * Identifies binding.
 */
DialogHeadBinding.prototype.toString = function () {

	return "[DialogHeadBinding]";
}

/**
 * DialogHeadBinding factory.
 * @param {DOMDocument} ownerDocument
 * @return {DialogHeadBinding}
 */
DialogHeadBinding.newInstance = function ( ownerDocument ) {

	var element = DOMUtil.createElementNS ( Constants.NS_UI, "ui:dialoghead", ownerDocument );
	return UserInterface.registerBinding ( element, DialogHeadBinding );
}