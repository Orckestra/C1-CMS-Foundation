FieldDataBinding.prototype = new Binding;
FieldDataBinding.prototype.constructor = FieldDataBinding;
FieldDataBinding.superclass = Binding.prototype;

/**
 * @class
 * This doesn't really do anything. But it's nice to have...
 */
function FieldDataBinding () {
	
	/**
	 * @type {SystemLogger}
	 */
	this.logger = SystemLogger.getLogger ( "FieldDataBinding" );
	
	/*
	 * Returnable.
	 */
	return this;
}

/**
 * Identifies binding.
 */
FieldDataBinding.prototype.toString = function () {

	return "[FieldDataBinding]";
}

/**
 * FieldDataBinding factory.
 * @param {DOMDocument} ownerDocument
 * @return {FieldDataBinding}
 */
FieldDataBinding.newInstance = function ( ownerDocument ) {

	var element = DOMUtil.createElementNS ( Constants.NS_UI, "ui:fielddata", ownerDocument );
	return UserInterface.registerBinding ( element, FieldDataBinding );
}