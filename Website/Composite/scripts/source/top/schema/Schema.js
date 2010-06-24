Schema.prototype = new XPathResolver;
Schema.prototype.constructor = Schema;
Schema.superclass = XPathResolver.prototype;

/**
 * @type {HashMap<string><string>}
 */
Schema.types = {
	STRING	: "string",
	INT		: "int",
	FLOAT	: "float",
	DOUBLE	: "double",
	BOOLEAN	: "boolean"
}

/**
 * @type {Error}
 */
Schema.notSupportedException = new Error ( 
	"Schema: Schema structure not supported!"
);

/**
 * @class
 * @param {DOMElement} element
 */
function Schema ( element ) {
	
	/**
	 * @type {SystemLogger}
	 */
	this.logger = SystemLogger.getLogger ( "Schema" );
	
	/**
	 * @type {HashMap<string><object>)
	 */
	this._map = this._parseSchema ( element );
}

/**
 * @param {DOMElement} element
 * @return {HashMmap<string><object>}
 */
Schema.prototype._parseSchema = function ( element ) {
	
	this.setNamespacePrefixResolver ({
		"wsdl"	: Constants.NS_WSDL,
		"soap"	: Constants.NS_SOAP,
		"s" 	: Constants.NS_SCHEMA
	});
	
	var result = {};
	var entry = null;
	var rules = this.resolveAll ( "s:*[@name]", element );
	
	while ( rules.hasNext ()) {	
		var rule = rules.getNext ();
		switch ( DOMUtil.getLocalName ( rule )) {
			case "element" :
				entry = new SchemaElementType ( this, rule );
				break;
			case "complexType" :
				entry = new SchemaComplexType ( this, rule );
				break;
			case "simpleType" :
				entry = new SchemaSimpleType ( this, rule );
				break;
		}
		result [ rule.getAttribute ( "name" )] = entry;
	};
	
	return result;
}

/**
 * @param {string} name
 * @return {SchemaType}
 */
Schema.prototype.lookup = function ( name ) {
	
	return this._map [ name ];
}
