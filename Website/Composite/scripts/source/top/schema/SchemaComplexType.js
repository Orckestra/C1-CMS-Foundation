SchemaComplexType.prototype = new SchemaType;
SchemaComplexType.prototype.constructor = SchemaComplexType;
SchemaComplexType.superclass = SchemaType.prototype;

/**
 * @param {Schema} schema
 * @param {DOMElement} element
 */
function SchemaComplexType ( schema, element ) {
	
	/** 
	 * @type {List} 
	 * @private
	 */
	this._definitions = new List ();
	this._parseListedDefinitions ( schema, element );
	
	/**
	 * TODO: Use schema structure instead of name? This could be very MS specific...
	 * @type {boolean}
	 */
	this.isArray = element.getAttribute ( "name" ).indexOf ( "ArrayOf" ) >-1;
}

/**
 * @param {Schema} schema
 * @param {DOMElement} element
 * @throws Schema.notSupportedException 
 * @private
 */
SchemaComplexType.prototype._parseListedDefinitions = function ( schema, element ) {

	var els = schema.resolveAll ( "s:sequence/s:element", element );
	
	if ( els.hasEntries ()) {
		while ( els.hasNext ()) {
			var el = els.getNext ();
			this._definitions.add ( 
				new SchemaDefinition ( el )
			);
			
			/*
			var name = el.getAttribute ( "name" );
			this [ name ] = new SchemaDefinition ( el );
			alert ( el.nodeName + ": " + name );
			*/
		}
	} else throw Schema.notSupportedException;	
}

/** 
 * @return {List} 
 */
SchemaComplexType.prototype.getListedDefinitions = function () {

	return this._definitions.copy ();
}