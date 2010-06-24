DockControlBinding.prototype = new ControlBinding;
DockControlBinding.prototype.constructor = DockControlBinding;
DockControlBinding.superclass = ControlBinding.prototype;

/**
 * @class
 */
function DockControlBinding () {

	/**
	 * @type {SystemLogger}
	 */
	this.logger = SystemLogger.getLogger ( "DockControlBinding" );
}

/**
 * Identifies binding.
 */
DockControlBinding.prototype.toString = function () {

	return "[DockControlBinding]";
}

/**
 * @overloads {Binding#onBindingRegister}
 */
DockControlBinding.prototype.onBindingRegister = function () {

	DockControlBinding.superclass.onBindingRegister.call ( this );
	this.setImageProfile ( DockControlImageProfile );
}


/**
 * ControlBinding factory.
 * @param {DOMDocument} ownerDocument
 * @return {MYBinding}
 */
DockControlBinding.newInstance = function ( ownerDocument ) {

	var element = DOMUtil.createElementNS ( Constants.NS_UI, "ui:toolbarbutton", ownerDocument );
	return UserInterface.registerBinding ( element, DockControlBinding );
}