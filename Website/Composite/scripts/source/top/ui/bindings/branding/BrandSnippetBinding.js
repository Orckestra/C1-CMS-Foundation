BrandSnippetBinding.prototype = new Binding;
BrandSnippetBinding.prototype.constructor = BrandSnippetBinding;
BrandSnippetBinding.superclass = Binding.prototype;

BrandSnippetBinding.SHIPPET_URL = "${root}/content/branding/{0}.inc?" + Application.CONSOLE_ID;
BrandSnippetBinding.SHIPPETBRANDED_URL = "${root}/content/branding/{0}-branded.inc?" + Application.CONSOLE_ID;

/**
 * @type {String}
 */
BrandSnippetBinding.SnippetName = null;

/**
 * Indicate that loading starterd
 * @type {bool}
 */
BrandSnippetBinding.snippetLoading = false;

/**
 * @type {bool}
 */
BrandSnippetBinding.snippetLoaded = false;

/**
 * Load SVG images
 */
BrandSnippetBinding.snippetLoad = function (binding) {

	function onsnippetload() {
		var request = this;
		if (request.responseText) {
			BrandSnippetBinding.snippetLoading = false;
			binding.bindingElement.innerHTML = request.responseText;
		} else {
			request.open('GET', Resolver.resolve(binding.getSnippetUrl()));
			request.send();
		}
	}

		BrandSnippetBinding.snippetLoading = true;
		var request = new XMLHttpRequest();
		request.onload = onsnippetload;
		request.open('GET', Resolver.resolve(binding.getSnippetBrandedUrl()));
		request.send();

}

/**
 * @class
 */
function BrandSnippetBinding() {

	/**
	 * @type {SystemLogger}
	 */
	this.logger = SystemLogger.getLogger("BrandSnippetBinding");

	/*
	 * Returnable.
	 */
	return this;
}

/**
 * Identifies binding.
 */
BrandSnippetBinding.prototype.toString = function () {

	return "[BrandSnippetBinding]";
}


/**
 * @overloads {Binding#onBindingRegister}
 */
BrandSnippetBinding.prototype.onBindingRegister = function () {

	BrandSnippetBinding.superclass.onBindingRegister.call(this);
	BrandSnippetBinding.snippetLoad(this);
}

/**
 * @overloads {Binding#onBindingAttach}
 */
BrandSnippetBinding.prototype.onBindingAttach = function () {

	BrandSnippetBinding.superclass.onBindingAttach.call(this);
}
/**
 * @return {string}
 */
BrandSnippetBinding.prototype.getSnippetBrandedUrl = function () {

	return BrandSnippetBinding.SHIPPETBRANDED_URL.replace("{0}", this.getProperty("snippetname"));
}

/**
 * @return {string}
 */
BrandSnippetBinding.prototype.getSnippetUrl = function () {

	return BrandSnippetBinding.SHIPPET_URL.replace("{0}", this.getProperty("snippetname"));
}

/**
 * BrandSnippetBinding factory.
 * @param {DOMDocument} ownerDocument
 * @return {BrandSnippetBinding}
 */
BrandSnippetBinding.newInstance = function (ownerDocument) {

	var element = DOMUtil.createElementNS(Constants.NS_UI, "ui:brandsnippet", ownerDocument);
	return UserInterface.registerBinding(element, BrandSnippetBinding);
}