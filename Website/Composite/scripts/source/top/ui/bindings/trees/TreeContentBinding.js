TreeContentBinding.prototype = new Binding;
TreeContentBinding.prototype.constructor = TreeContentBinding;
TreeContentBinding.superclass = Binding.prototype;

/**
 * @class
 */
function TreeContentBinding () {
	
	/**
	 * @type {SystemLogger}
	 */
	this.logger = SystemLogger.getLogger ( "TreeContentBinding" );
	
	/*
	 * Returnable.
	 */
	return this;
}

/**
 * Identifies binding.
 */
TreeContentBinding.prototype.toString = function () {

	return "[TreeContentBinding]";
}

/**
 * TreeContentBinding factory.
 * @param {DOMDocument} ownerDocument
 * @return {TreeContentBinding}
 */
TreeContentBinding.newInstance = function ( ownerDocument ) {

	var element = DOMUtil.createElementNS ( Constants.NS_UI, "ui:treecontent", ownerDocument );
	return UserInterface.registerBinding ( element, TreeContentBinding );
}