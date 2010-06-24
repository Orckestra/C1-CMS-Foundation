/**
 * @type {string}
 */
ViewDefinition.DEFAULT_URL = "${root}/blank.aspx";

/**
 * Clone a ViewDefinition, assigning a new handle.
 * @param {String} handle
 * @param {String} newhandle
 * @return {ViewDefinition}
 */
ViewDefinition.clone = function ( handle, newhandle ) {
	
	var result = null;
	var proto = ViewDefinitions [ handle ];
	
	if ( proto.isMutable ) {
		
		var impl = null;
		if ( proto instanceof DialogViewDefinition ) {
			impl = DialogViewDefinition;
		} else {
			impl = HostedViewDefinition;
		}
		if ( newhandle != null && impl != null ) {
			var def = new impl ();
			for ( var prop in proto ) {
				def [ prop ] = proto [ prop ];
			}
			def.handle = newhandle;
			result = def;
		} else {
			throw "Cannot clone without newhandle";
		}
	} else {
		throw "Cannot clone non-mutable definition";
	}
	return result;
}

/**
 * @class
 * Don't construct this fellow manually, please subclass first.
 */
function ViewDefinition () {}

ViewDefinition.prototype = {
	
	/**
	 * The URL to display.
	 * @type {string}
	 */
	url : ViewDefinition.DEFAULT_URL,
	
	/**
	 * Served to PageBinding.
	 * @see {PageBinding#setPageArgument}
	 * @type {object}
	 */
	argument : null,
	
	/**
	 * Backend handle (ElementKey).
	 * @type {string}
	 */
	handle : null,
	
	/**
	 * May associate the definition to a tree item.
	 * @type {string}
	 */
	entityToken : null,
	
	/**
	 * Backend flowhandle.
	 * @type {string}
	 */
	flowHandle : null,
	
	/**
	 * The label.
	 * @type {string}
	 */
	label : null,
	
	/**
	 * The image URL.
	 * @type {string}
	 */
	image : null,
	
	/**
	 * The tooltip.
	 * @type {string}
	 */
	toolTip : null
}