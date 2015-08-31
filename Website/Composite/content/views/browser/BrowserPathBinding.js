BrowserPathBinding.prototype = new Binding;
BrowserPathBinding.prototype.constructor = BrowserPathBinding;
BrowserPathBinding.superclass = Binding.prototype;


/**
 * @class
 */
function BrowserPathBinding() {

	/**
	 * @type {SystemLogger}
	 */
	this.logger = SystemLogger.getLogger("BrowserPathBinding");

	/*
	 * Returnable.
	 */
	return this;
}

/**
 * Identifies binding.
 */
BrowserPathBinding.prototype.toString = function () {

	return "[BrowserPathBinding]";
}

/**
 * @overloads {Binding#onBindingRegister}
 */
BrowserPathBinding.prototype.onBindingRegister = function () {

	BrowserPathBinding.superclass.onBindingRegister.call(this);

}

/**
 * @overloads {Binding#onBindingAttach}
 */
BrowserPathBinding.prototype.onBindingAttach = function () {

	BrowserPathBinding.superclass.onBindingAttach.call(this);

}


/**
 * ToolBarBodyBinding factory.
 * @param {DOMDocument} ownerDocument
 * @return {ToolBarBodyBinding}
 */
BrowserPathBinding.newInstance = function (ownerDocument) {

	var element = DOMUtil.createElementNS(Constants.NS_UI, "ui:path", ownerDocument);
	return UserInterface.registerBinding(element, BrowserPathBinding);
}
