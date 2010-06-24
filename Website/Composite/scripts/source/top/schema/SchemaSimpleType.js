SchemaSimpleType.prototype = new SchemaType;
SchemaSimpleType.prototype.constructor = SchemaSimpleType;
SchemaSimpleType.superclass = SchemaType.prototype;

/**
 * @class
 * @param {Schema} schema
 * @param {DOMElement} element
 * @throws Schema.notSupportedException 
 */
function SchemaSimpleType ( schema, element ) {
	
	/**
	 * @type {string}
	 */
	this.restrictionType = null;
	
	this._parse ( schema, element );
}

/**
 * TODO: Investigate what needs to be supported here besides enumerations.
 * @param {Schema} schema
 * @param {DOMElement} element
 * @throws Schema.notSupportedException 
 */
SchemaSimpleType.prototype._parse = function ( schema, element ) {
	
	var restriction = schema.resolve ( "s:restriction", element );
	if ( restriction ) {
		this.restrictionType = restriction.getAttribute ( "base" ).split ( ":" )[ 1 ];	
	} else {
		throw Schema.notSupportedException;
	}
}