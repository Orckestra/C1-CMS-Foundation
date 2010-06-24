/**
 * @class
 * @param {HashMap<string><BindingImplementation>} map
 */
function UserInterfaceMapping ( map ) {

	/**
	 * @type {SystemLogger}
	 */
	this.logger = SystemLogger.getLogger ( "UserInterfaceMapping" );
	
	/**
	 * @type {HashMap<string><BindingImplementation>}
	 */
	this.map = map;
}

/**
 * Merge with another mapping.
 * @param {UserInterfaceMapping} mapping
 */
UserInterfaceMapping.prototype.merge = function ( mapping ) {
	
	for ( var nodename in mapping.map ) {
		this.map [ nodename ] = mapping.getBindingImplementation ( nodename );
	}
}

/**
 * Get binding implementation for a given element.
 * @param {DOMElement} element
 * @return {BindingImplementation}
 */
UserInterfaceMapping.prototype.getBindingImplementation = function ( element ) {
	
	var result = null;
	var name = element.nodeName;
	
	if ( Client.isExplorer ) {
		var small = name.toLowerCase ();
		if ( name == small ) {
			name = "ui:" + name;
		} else {
			name = small;
		}
	}
	
	if ( this.map [ name ]) {
		result = this.map [ name ];
	}
	return result;
}