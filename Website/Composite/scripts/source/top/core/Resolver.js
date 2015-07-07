/**
 * @class
 * Resolving dollar dollar super syntax.
 */
function _Resolver () {}

_Resolver.prototype = {
	
	_logger : SystemLogger.getLogger ( "Resolver" ),
	
	/**
	 * Resolve that string.
	 * @param {string} string
	 * @return {string}
	 */
 	resolve : function ( string ) {
		
		if ( typeof string != Types.UNDEFINED ) {
			
			// could be interpretated as a number by Javascript.
			string = String ( string );
		
			// TODO: refactor these - introduce generalized prefix such as "shortcut:root" or something.
			string = string.replace ( "${root}", Constants.APPROOT );
			string = string.replace ( "${skin}", Constants.SKINROOT );
			string = string.replace ( "${tiny}", Constants.TINYROOT );
			
			// ${icon:Composite.Icons,fister-loeg-sovs(32)}
			
			if ( string.indexOf ( "${icon:" ) >-1 ) {
				string = this._resolveImage ( string );
			}
			else if (string.indexOf("${class:") > -1) {
				string = this._resolveClasses(string);
			}
			else if ( string.indexOf ( "${string:" ) >-1 ) {
				string = this._resolveString ( string );
			}
		}
		return string;
	},
	
	/**
	 * Substitue string of type "loading {0} to {1} and {2}" with array entries.
	 * @param {string} string
	 * @param {array} vars
	 * @return {string}
	 */
	resolveVars : function ( string, vars ) {
		
		var i = 0;
		while ( i < vars.length ) {
			string = string.replace ( "{" + i + "}", vars [ i ]);
			i++;
		}
		return string;
	},
	
	/**
	 * Resolve string of syntax ${string:ProviderName:ResourceName} 
	 * where ProviderName is optional and will default.
	 * @param {string} string
	 * @return {string}
	 */
	_resolveString : function ( string ) {
		
		var result = null;
		var provider = null;
		var key = string.split ( "${string:" )[ 1 ].split ( "}" )[ 0 ];
		
		if ( key.indexOf ( ":" ) >-1 ) {
			provider = key.split ( ":" ) [ 0 ];
			key = key.split ( ":" ) [ 1 ];
		} else {
			provider = StringBundle.UI;
		}
		result = StringBundle.getString ( provider, key );
		if ( !result ) {
			result = "(?)";
		}
		return result;
	},
	
	/**
	 * Resolve image of syntax ${icon:ProviderName:ResourceName(size)}
	 * where ProviderName and size are optional and will default.
	 * Example: "${icon:previous(large)}"
	 * @param {string} string
	 * @return {string}
	 */
	_resolveImage: function (string) {

		var result = null;
		var provider = null;
		var resource = null;
		var size = null;

		resource = string.split("${icon:")[1].split("}")[0];

		if (resource.indexOf(":") > -1) {
			provider = resource.split(":")[0];
			resource = resource.split(":")[1];
		} else {
			provider = ImageProvider.UI;
		}
		if (resource.indexOf("(") > -1) {
			size = resource.split("(")[1].split(")")[0];
			resource = resource.split("(")[0];
		}

		result = ImageProvider.getImageURL({
			ResourceNamespace: provider,
			ResourceName: resource
		}, size);

		return result;
	},

	/**
	 * Resolve class of syntax ${class:class1 class2 ...}
	 * where ProviderName and size are optional and will default.
	 * Example: "${class:class1 class2}"
	 * @param {string} string
	 * @return {string}
	 */
	_resolveClasses : function ( string ) {
		
		var result = {};
		resource = string.split("${class:")[1].split("}")[0];
		result.classes = resource;
		return result;
	}
}

/**
 * The instance that does it.
 */
var Resolver = new _Resolver ();