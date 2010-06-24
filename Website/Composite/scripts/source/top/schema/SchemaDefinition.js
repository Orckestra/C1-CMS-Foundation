/**
 * TODO: place this around here?
 */
SchemaDefinition.TYPE_XML_DOCUMENT = "xmldocument";


/**
 * @class
 * @param {DOMElement} element
 */
function SchemaDefinition ( element ) {

	/**
	 * @type {SystemLogger}
	 */
	this.logger = SystemLogger.getLogger ( "SchemaDefinition" );

	/** 
	 * @type {boolean} 
	 */
	this.isRequired	= null;
	
	/** 
	 * @type {string} 
	 */
	this.type = null;
	
	/*
	 * Populate me! 
	 */
	this._parse ( element );
}

/**
 * @param {DOMElement} element
 * @private
 */
SchemaDefinition.prototype._parse = function ( element ) {
	
	var min 	= element.getAttribute ( "minOccurs" );
	var max 	= element.getAttribute ( "maxOccurs" );
	var type	= element.getAttribute ( "type" );
	
	this.name = element.getAttribute ( "name" );
	this.isRequired	= min != "0";
	
	if ( type ) {
	
		var split	= type.split ( ":" );
		var sort	= split [ 0 ];
		var typedef	= split [ 1 ];
		
		this.isSimpleValue  = sort != "tns";
		this.type 			= typedef;	
	
		//alert ( "OK\n" + DOMSerializer.serialize ( element, true ));
	
	} else {
		
		/* 
		 * TODO: rewrite to xpath, fetch a resolver somehow...
		 */
		var elm = element.getElementsByTagName ( "*" ).item ( 0 );
		if ( elm && DOMUtil.getLocalName ( elm ) == "complexType" && elm.getAttribute ( "mixed" ) == "true" ) {
			elm = elm.getElementsByTagName ( "*" ).item ( 0 );
			if ( elm && DOMUtil.getLocalName ( elm ) == "sequence" ) {
				elm = elm.getElementsByTagName ( "*" ).item ( 0 );
				if ( DOMUtil.getLocalName ( elm ) == "any" ) {
					this.type = SchemaDefinition.TYPE_XML_DOCUMENT;
				}
			}
		}
	}
}