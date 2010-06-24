DialogTitleBarBodyBinding.prototype = new Binding;
DialogTitleBarBodyBinding.prototype.constructor = DialogTitleBarBodyBinding;
DialogTitleBarBodyBinding.superclass = Binding.prototype;

/**
 * @class
 */
function DialogTitleBarBodyBinding () {

	/**
	 * @type {SystemLogger}
	 */
	this.logger = SystemLogger.getLogger ( "DialogTitleBarBodyBinding" );
}

/**
 * Identifies binding.
 */
DialogTitleBarBodyBinding.prototype.toString = function () {

	return "[DialogTitleBarBodyBinding]";
}

/**
 * Attach clear-float classname.
 */
DialogTitleBarBodyBinding.prototype.onBindingRegister = function () {

	DialogTitleBarBodyBinding.superclass.onBindingRegister.call ( this );
	this.attachClassName ( Binding.CLASSNAME_CLEARFLOAT );
}


/**
 * DialogTitleBarBodyBinding factory.
 * @param {DOMDocument} ownerDocument
 * @return {DialogTitleBarBodyBinding}
 */
DialogTitleBarBodyBinding.newInstance = function ( ownerDocument ) {

	var element = DOMUtil.createElementNS ( Constants.NS_UI, "ui:titlebarbody", ownerDocument );
	return UserInterface.registerBinding ( element, DialogTitleBarBodyBinding );
}