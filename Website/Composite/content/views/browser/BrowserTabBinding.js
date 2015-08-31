BrowserTabBinding.prototype = new TabBinding;
BrowserTabBinding.prototype.constructor = BrowserTabBinding;
BrowserTabBinding.superclass = TabBinding.prototype;

BrowserTabBinding.ACTIONVENT_CLOSE = "browsertabclose";
BrowserTabBinding.IMG_CLOSE_DEFAULT = Resolver.resolve ( "${root}/skins/system/tabboxes/tab-close-default.png" );
BrowserTabBinding.IMG_CLOSE_HOVER = Resolver.resolve ( "${root}/skins/system/tabboxes/tab-close-hover.png" );

/**
 * @class
 */
function BrowserTabBinding () {

	/**
	 * @type {SystemLogger}
	 */
	this.logger = SystemLogger.getLogger ( "BrowserTabBinding" );
	
	/*
	 * Returnable.
	 */
	return this;
}

/**
 * Identifies binding.
 */
BrowserTabBinding.prototype.toString = function () {

	return "[BrowserTabBinding]";
}

/**
 * BrowserTabBinding factory.
 * @param {DOMDocument} ownerDocument
 * @return {BrowserTabBinding}
 */
BrowserTabBinding.newInstance = function(ownerDocument) {

	var element = DOMUtil.createElementNS(Constants.NS_UI, "ui:tab", ownerDocument);
	return UserInterface.registerBinding(element, BrowserTabBinding);
};