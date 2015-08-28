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
 * @implements {IActionListener}
 * @overloads {Binding#handleAction}
 * @param {Action} action
 */
BrowserPathBinding.prototype.handleAction = function (action) {

	BrowserPathBinding.superclass.handleAction.call(this, action);

	//switch (action.type) {
	//	case Binding.ACTION_UPDATED:
	//		this.isFit = false;
	//		break;
	//}
}