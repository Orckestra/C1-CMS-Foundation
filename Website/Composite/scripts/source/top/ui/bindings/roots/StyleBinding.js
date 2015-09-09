StyleBinding.prototype = new Binding;
StyleBinding.prototype.constructor = StyleBinding;
StyleBinding.superclass = Binding.prototype;


/**
 * @class
 */
function StyleBinding() {

	/**
	 * @type {SystemLogger}
	 */
	this.logger = SystemLogger.getLogger("StyleBinding");

	/**
	 * @type {HtmlElement}
	 */
	this.style = null;

	/**
	 * @type {string}
	 */
	this.href = null;

	/*
	 * Returnable.
	 */
	return this;
}

/**
 * Identifies binding.
 */
StyleBinding.prototype.toString = function () {

	return "[StyleBinding]";
}

/**
 * Notice that the binding disposes as soon as it attaches.
 * @overloads {Binding#onBindingAttach}
 */
StyleBinding.prototype.onBindingAttach = function () {

	StyleBinding.superclass.onBindingAttach.call(this);

	console.log("StyleBinding.prototype.onBindingAttach");

	this.href = this.getProperty("link");
	this.style = document.createElement('link');
	this.style.rel = 'stylesheet';
	this.style.type = 'text/css';
	this.style.href = Resolver.resolve(this.href);
	this.bindingDocument.getElementsByTagName('head')[0].appendChild(this.style);
}

/**
 * Handle element update.
 * @implements {IUpdateHandler}
 * @overwrites {Binding#handleElement}
 * @param {Element} element
 * @return {boolean}
 */
StyleBinding.prototype.handleElement = function (element) {

	return true;
}

/**
 * Update element.
 * @implements {IUpdateHandler}
 * @overwrites {Binding#updateElement}
 * @param {Element} element
 * @return {boolean}
 */
StyleBinding.prototype.updateElement = function (element) {

	var href = element.getAttribute("link");

	if (this.href != href && this.style) {
		this.href = href;
		this.style.href = Resolver.resolve(this.href);
	}
	return true;
};

/**
 * @overloads {Binding#onBindingDispose}
 */
StyleBinding.prototype.onBindingDispose = function () {

	StyleBinding.superclass.onBindingDispose.call(this);

	if (this.style && this.style.parentNode) {
		this.style.parentNode.removeChild(this.style);
	}
	this.href = null;
	this.style = null;
}