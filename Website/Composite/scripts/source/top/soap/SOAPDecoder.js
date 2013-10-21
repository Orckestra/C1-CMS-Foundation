/**
 * @class
 * @param {WSDLParser} wsdl
 * @param {string} operationName
 */

function SOAPDecoder ( wsdl, operation ) {
	
	/** 
	 * @type {WSDLParser} 
	 * @private
	 */
	this._wsdl = wsdl;
	
	/** 
	 * @type {string} 
	 * @private
	 */
	this._operation = operation;
	
	/** 
	 * @type {XpathResolver} 
	 * @private
	 */
	this._resolver = new XPathResolver ();
	this._resolver.setNamespacePrefixResolver ({
		"result" : wsdl.getTargetNamespace ()
	});
}

/**
 * @param {string} xpath
 * @param {DOMNode} node
 * @return {DOMElement)
 */
SOAPDecoder.prototype.resolve = function ( xpath, node ) {
	return this._resolver.resolve ( "result:" + xpath, node );
}

/**
 * @param {string} xpath
 * @param {DOMNode} node
 * @return {List)
 */
SOAPDecoder.prototype.resolveAll = function ( xpath, node ) {
	return this._resolver.resolveAll ( "result:" + xpath, node );
}

/**
 * We assume the webservice to follow this convention: If a request element is 
 * called "GetSomething", the result element will be wrapped in two elements 
 * called "GetSomethingResponse" and "GetSomethingResult". This is always the 
 * case for NET services, but it is possible to  extract this information from 
 * the WSDL.
 * @param {SOAPRequestResponse} soapResponse
 * @return {object}
 */
SOAPDecoder.prototype.decode = function ( soapResponse ) {

	var result	= null;
	var schema	= this._wsdl.getSchema ();
	
	// find the "response" element
	var id = this._operation + "Response";
	var responseElm = this.resolve ( id, soapResponse.body ); 
	
	// lookup the matching schema entity
	var schemaType = schema.lookup ( id );
	var definitions = schemaType.getListedDefinitions ();
	
	while ( !result && definitions.hasNext ()) {
	
		// find the "result" element and lookup the matching definition
		var def = definitions.getNext ();
		var elm = this.resolve(def.name, responseElm);
		
		if ( def.type == SchemaDefinition.TYPE_XML_DOCUMENT ) {
			result = DOMUtil.getDOMDocument ();
			var e = elm.getElementsByTagName ( "*" ).item ( 0 );
			//if ( typeof result.importNode != Types.UNDEFINED ) { // case for Moz and IE7
				result.appendChild ( 
					result.importNode ( e, true )
				);
			//} else { // case for IE6
			//	result.loadXML ( 
			//		DOMSerializer.serialize ( e )
			//	);
			//}
		} else { // start recursive process, following same pattern
			result = this._compute ( elm, def );
		}
	}
	return result;
}

/**
 * @param {DOMElement} element
 * @param {SchemaDefinition} definition
 */
SOAPDecoder.prototype._compute = function ( element, definition ) {

	var result = null;
	var schema = this._wsdl.getSchema ();

	if ( definition.isSimpleValue ) {
		result = this._getSimpleValue ( element, definition.type );
	} else {
		var schemaType = schema.lookup ( definition.type );
		if ( schemaType instanceof SchemaSimpleType ) {
			result = this._getSimpleValue ( element, schemaType.restrictionType );
		} else {
			var defs = schemaType.getListedDefinitions ();
			if ( schemaType.isArray ) {
				result = [];
				var def = defs.getNext ();
				var elms = this.resolveAll ( def.type, element );
				while ( elms.hasNext ()) {
					var elm = elms.getNext ();
					result.push (
						 this._compute ( elm, def )
					);
				}
			} else {
			    
			    if (element == null) {
			        result = null;
			    } else {
				    result = {};
				    defs.reset();
			    
				    while ( defs.hasNext ()) {
					    var def = defs.getNext ();
					    var elm = this.resolve ( def.name, element );
					    if ( elm ) {
						    result [ def.name ] = this._compute ( elm, def );
					    } else if ( def.isRequired ) {
						    throw new Error ( "SOAPDecoder: invalid SOAP response." );
					    }
				    }
				}
			}
		}
	}
	return result;
}

/**
 * @param {DOMElement} element
 * @param {string} type
 * @return {object}
 */
SOAPDecoder.prototype._getSimpleValue = function ( element, type ) {

	var result = null;
	
	if (element !=null && element.firstChild && element.firstChild.nodeType == Node.TEXT_NODE ) {
		
		/*
		 * Mozilla will split a 4K+ texnode into multiple smaller 
		 * textnodes. This will reassemble them into a single node.
		 */
		if ( Client.isMozilla && element.childNodes.length > 1 ) {
			element.normalize ();
		}
		
		result = element.firstChild.data;
		
		switch ( type ) {
			case Schema.types.STRING :
				result = result;
				break;
			case Schema.types.INT :
			case Schema.types.FLOAT :
			case Schema.types.DOUBLE :
				result = Number ( result );
				break;
			case Schema.types.BOOLEAN :
				result = result == "true";
				break;
			default :
				throw ( "SOAPDecoder: schema type \"" + type + "\" not handled." );
				break;
		}
	}
	
	return result;
}