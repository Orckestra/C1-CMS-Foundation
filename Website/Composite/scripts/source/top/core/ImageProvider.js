/**
 * @class
 * Image provider.
 */
function _ImageProvider () {}

_ImageProvider.prototype = {

	/**
	 * @type {SystemLogger}
	 */
	_logger : SystemLogger.getLogger ( "ImageProvider" ),

	/**
	 * Default icon provider.
	 */
	UI : "Composite.Icons",
	
	/**
	 * @param {object} object
	 */
	getImageURL: function (object, size) {
		if (typeof object === "string") {
			return object;
		} else if (object.ResourceName) {
			return object.ResourceName;
		} else {
			return "";
		}
	}
}

/**
 * The instance that does it.
 */
var ImageProvider = new _ImageProvider ();