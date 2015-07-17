DialogControlBinding.prototype = new ControlBinding;
DialogControlBinding.prototype.constructor = DialogControlBinding;
DialogControlBinding.superclass = ControlBinding.prototype;

DialogControlBinding.CLASSNAME = "dialogcontrol";

/**
 * @class
 */
function DialogControlBinding () {

	/**
	 * @type {SystemLogger}
	 */
	this.logger = SystemLogger.getLogger ( "DialogControlBinding" );
	
	/**
	 * @type {boolean}
	 */
	this.isGhostable = true;
}

/**
 * Identifies binding.
 */
DialogControlBinding.prototype.toString = function () {

	return "[DialogControlBinding]";
}

/**
 * @overloads {Binding#onBindingRegister}
 */
DialogControlBinding.prototype.onBindingRegister = function () {

	DialogControlBinding.superclass.onBindingRegister.call ( this );
	this.attachClassName ( DialogControlBinding.CLASSNAME );
}

/**
 * ControlBinding factory.
 * @param {DOMDocument} ownerDocument
 * @return {DialogControlBinding}
 */
DialogControlBinding.newInstance = function ( ownerDocument ) {

	var element = DOMUtil.createElementNS ( Constants.NS_UI, "ui:control", ownerDocument );
	return UserInterface.registerBinding ( element, DialogControlBinding );
}