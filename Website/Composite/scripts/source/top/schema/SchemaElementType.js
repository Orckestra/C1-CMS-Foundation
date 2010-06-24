SchemaElementType.prototype = new SchemaType;
SchemaElementType.prototype.constructor = SchemaElementType;
SchemaElementType.superclass = SchemaType.prototype;

/**
 * @param {Schema} schema
 * @param {DOMElement} element
 */
function SchemaElementType ( schema, element ) {
	
	/**
	 * @type {SystemLogger}
	 */
	this.logger = SystemLogger.getLogger ( "SchemaElementType" );
	
	/** 
	 * @type {List} 
	 * @private
	 */
	this._definitions = new List ();
	this._parseListedDefinitions ( schema, element );
}

/**
 * @param {Schema} schema
 * @param {DOMElement} element
 * @throws Schema.notSupportedException 
 * @private
 */
SchemaElementType.prototype._parseListedDefinitions = function ( schema, element ) {

	var els = schema.resolveAll ( "s:complexType/s:sequence/s:element", element );
	
	if ( els.hasEntries ()) {
		while ( els.hasNext ()) {
			this._definitions.add ( 
				new SchemaDefinition ( els.getNext ())
			);
		}
	} else {
		this.logger.warn ( "SchemaElementType: Unparsed SchemaDefinition encountered." );
		throw Schema.notSupportedException;
	}
}

/** 
 * @return {List} 
 */
SchemaElementType.prototype.getListedDefinitions = function () {

	return this._definitions.copy ();
}