PathBinding.prototype = new Binding;
PathBinding.prototype.constructor = PathBinding;
PathBinding.superclass = Binding.prototype;

PathBinding.ACTION_COMMAND = "pathcommand";


/**
 * @class
 */
function PathBinding() {

	/**
	 * @type {SystemLogger}
	 */
	this.logger = SystemLogger.getLogger("PathBinding");

	/*
	 * Returnable.
	 */
	return this;
}

/**
 * Identifies binding.
 */
PathBinding.prototype.toString = function () {

	return "[PathBinding]";
}

/**
 * @overloads {Binding#onBindingRegister}
 */
PathBinding.prototype.onBindingRegister = function () {

	PathBinding.superclass.onBindingRegister.call(this);

}

/**
 * @overloads {Binding#onBindingAttach}
 */
PathBinding.prototype.onBindingAttach = function () {

	PathBinding.superclass.onBindingAttach.call(this);

}


/**
 * ToolBarBodyBinding factory.
 * @param {DOMDocument} ownerDocument
 * @return {ToolBarBodyBinding}
 */
PathBinding.newInstance = function (ownerDocument) {

	var element = DOMUtil.createElementNS(Constants.NS_UI, "ui:path", ownerDocument);
	return UserInterface.registerBinding(element, PathBinding);
}
