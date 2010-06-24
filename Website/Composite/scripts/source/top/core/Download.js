/**
 * @class
 * Download stuff.
 */
function _Download () {}

/**
 * Init download. The server must be rigged up to display a download dialog.
 * @param {string} url
 */
_Download.prototype.init = function ( url ) {
	
	var win = top.app.bindingMap.downloadwindow;
	win.setURL ( url );
}

/**
 * The instance that does it.
 */
var Download = new _Download ();