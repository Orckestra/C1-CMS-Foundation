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
	 * Service URL.
	 */
	SERVICE_URL : "services/Icon/GetIcon.ashx",
	
	/**
	 * Default icon provider.
	 */
	UI : "Composite.Icons",
	
	/**
	 * @param {object} object
	 */
	getImageURL : function ( object, size ) {
	
		var result = null;
		var url = Constants.APPROOT + "/" + this.SERVICE_URL + "?resourceName=${name}&resourceNamespace=${hash}&size=${size}";
		var hash = object.ResourceNamespace;
		var name = object.ResourceName;
		size = size ? size : "DEFAULT";
		
		if ( name != null && hash != null ) {
			result = url
				.replace ( "${name}", name )
				.replace ( "${hash}", hash )
				.replace ( "${size}", size );
			if ( size == "DEFAULT" ) {
				result = result.split ( "&size=DEFAULT" )[ 0 ];
			}
		} else {
			throw "Could not compute image URL.";
		}
		return result;
	}
}

/**
 * The instance that does it.
 */
var ImageProvider = new _ImageProvider ();