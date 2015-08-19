BrowserTabBoxBinding.prototype = new TabBoxBinding;
BrowserTabBoxBinding.prototype.constructor = BrowserTabBoxBinding;
BrowserTabBoxBinding.superclass = TabBoxBinding.prototype;


/**
 * @class
 */
function BrowserTabBoxBinding () {

	/**
	 * @type {SystemLogger}
	 */
	this.logger = SystemLogger.getLogger ( "BrowserTabBoxBinding" );

	/**
	 * @type {TabBinding}
	 */
	this._browserTabBinding = null;
	

	/**
	 * @type {TabBinding}
	 */
	this._genericViewTabBinding = null;
	/*
	 * Returnable.
	 */
	return this;
}

/**
 * Identifies binding.
 */
BrowserTabBoxBinding.prototype.toString = function () {

	return "[BrowserTabBoxBinding]";
}



/**
 * Show URL.
 * @param {string} url.
 */
BrowserTabBoxBinding.prototype.setURL = function ( url ) {
	
	var tab = this.getBrowserTabBinding();
	this.select(tab);
	//tab.select();
	var win = tab.browserwindow;
	win.setURL(url);

}

/**
 * obsolute
 * Show URL.
 * @param @optional {string} url
 */
BrowserTabBoxBinding.prototype.newURL = BrowserTabBoxBinding.prototype.setURL;

/**
 * Get BrowserTabBinding
 * @param {string} url.
 */
BrowserTabBoxBinding.prototype.getBrowserTabBinding = function () {

	if (!this._browserTabBinding) {
		this._browserTabBinding = BrowserTabBinding.newInstance ( this.bindingDocument );
		var win = WindowBinding.newInstance(this.bindingDocument);
		win.setProperty("native", "true");
		this._browserTabBinding.browserwindow = win;
		this.appendTabByBindings ( this._browserTabBinding, win );
	}
	//hide tabs buttons
	this.getTabsBinding().hide();
	return this._browserTabBinding;
}

/**
 * Get BrowserTabBinding
 * @param {string} url.
 */
BrowserTabBoxBinding.prototype.getGeneticViewTabBinding = function () {

	if (!this._genericViewTabBinding) {
		this._genericViewTabBinding = TabBinding.newInstance(this.bindingDocument);

		var tree = GenericViewBinding.newInstance(this.bindingDocument);
		this.appendTabByBindings(this._genericViewTabBinding, tree);
		this._genericViewTabBinding.tree = tree;
	}
	//hide tabs buttons
	this.getTabsBinding().hide();
	return this._genericViewTabBinding;
}

/**
 * Get URL from selected tab.
 * @return {string}
 */
BrowserTabBoxBinding.prototype.getLocation = function () {
	
	var tab = this.getBrowserTabBinding();
	var win = tab.browserwindow;
	return new String ( win.getContentDocument ().location );
}


/**
 * Get currently active browser window.
 * @return {DOMDocument}
 */
BrowserTabBoxBinding.prototype.getBrowserWindow = function () {

	var tab = this.getBrowserTabBinding();
	var win = tab.browserwindow;
	return win;
}


/**
 * Get currently active document.
 * @return {DOMDocument}
 */
BrowserTabBoxBinding.prototype.getContentDocument = function () {

	var tab = this.getBrowserTabBinding();
	var win = tab.browserwindow;
	return win.getContentDocument ();
}

/**
 * Get currently active window.
 * @return {DOMDocumentView}
 */
BrowserTabBoxBinding.prototype.getContentWindow = function () {

	var tab = this.getBrowserTabBinding();
	var win = tab.browserwindow;
	return win.getContentWindow ();
}

/**
 * Get currently active frame.
 * @return {DOMDocumentView}
 */
BrowserTabBoxBinding.prototype.getFrameElement = function () {

	var tab = this.getBrowserTabBinding();
	var win = tab.browserwindow;
	return win.getFrameElement();
}