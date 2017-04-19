ComboBoxBinding.prototype = new Binding;
ComboBoxBinding.prototype.constructor = ComboBoxBinding;
ComboBoxBinding.superclass = Binding.prototype;

/**
* @class
* Here's a weird binding that will replace itself with a text node!
*/
function ComboBoxBinding() {

	/**
	* @type {SystemLogger}
	*/
	this.logger = SystemLogger.getLogger("ComboBoxBinding");

	/*
	* Returnable.
	*/
	return this;
}

/**
* Identifies binding.
*/
ComboBoxBinding.prototype.toString = function () {

	return "[ComboBoxBinding]";
}

/**
* ComboBoxBinding factory.
* @param {DOMDocument} ownerDocument
* @return {ComboBoxBinding}
*/
ComboBoxBinding.newInstance = function (ownerDocument) {

	var element = DOMUtil.createElementNS(Constants.NS_UI, "ui:combobox", ownerDocument);
	return UserInterface.registerBinding(element, ComboBoxBinding);
}