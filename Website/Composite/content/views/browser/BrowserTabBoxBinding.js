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
 * Open new tab (and show the URL). 
 * TODO: If URL is already displayed, find the tab and focus it instead?
 * @param @optional {string} url
 */
BrowserTabBoxBinding.prototype.newURL = function ( url ) {
	
	var tab = BrowserTabBinding.newInstance ( this.bindingDocument );
	var win = WindowBinding.newInstance ( this.bindingDocument );
	tab.browserwindow = win;
	this.appendTabByBindings ( tab, win );
	if ( url != null ) {
		this.setURL ( url );
	}
}

/**
 * Show URL in selected tab.
 * @param {string} url.
 */
BrowserTabBoxBinding.prototype.setURL = function ( url ) {
	
	var tab = this.getSelectedTabBinding ();
	var win = tab.browserwindow;
	win.setURL ( url );
}

/**
 * Get URL from selected tab.
 * @return {string}
 */
BrowserTabBoxBinding.prototype.getLocation = function () {
	
	var tab = this.getSelectedTabBinding ();
	var win = tab.browserwindow;
	return new String ( win.getContentDocument ().location );
}

/**
 * Get currently active document.
 * @return {DOMDocument}
 */
BrowserTabBoxBinding.prototype.getContentDocument = function () {

	var tab = this.getSelectedTabBinding ();
	var win = tab.browserwindow;
	return win.getContentDocument ();
}

/**
 * Get currently active window.
 * @return {DOMDocumentView}
 */
BrowserTabBoxBinding.prototype.getContentWindow = function () {

	var tab = this.getSelectedTabBinding ();
	var win = tab.browserwindow;
	return win.getContentWindow ();
}