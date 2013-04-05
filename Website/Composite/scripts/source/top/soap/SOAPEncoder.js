/**
 * @class
 * @param {WSDLParser} wsdl
 * @param {string} operationName
 */

function SOAPEncoder ( wsdl, operation ) {
	
	/**
	 * @type {SystemLogger}
	 */
	this.logger = SystemLogger.getLogger ( "SOAPEncoder" );
	
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
	 * @type {string} 
	 * @private
	 */
	this._namespace = wsdl.getTargetNamespace ();
}

/**
 * @param {List} args
 * @return {SOAPMessage}
 */
SOAPEncoder.prototype.encode = function ( args ) {
	
	var message		= SOAPRequest.newInstance ( this._namespace, this._operation );
	var root 		= this._appendElement ( message.body, this._operation );
	var schema 		= this._wsdl.getSchema ();
	var schemaType 	= schema.lookup ( this._operation );
	var definitions	= schemaType.getListedDefinitions ();
	
	while ( definitions.hasNext ()) {
		var def = definitions.getNext ();
		var elm = this._appendElement ( root, def.name );
		var val = args.getNext ();
		this._resolve ( elm, def, val );
	}
	return message;
}

/**
 * @param {DOMElement} element
 * @param {SchemaDefinition} definition
 * @param {object} value
 */
SOAPEncoder.prototype._resolve = function ( element, definition, value ) {

	var schema = this._wsdl.getSchema ();
	
	if ( definition.isSimpleValue ) {
		this._appendText ( element, value, definition.type == "string" );
	} else {
	
		var schemaType 	= schema.lookup ( definition.type );
		if ( schemaType instanceof SchemaSimpleType ) {
			alert ( "SOAPEncoder: SchemaSimpleType support not implemented!" );
		} else {
			var defs = schemaType.getListedDefinitions ();
			if ( schemaType.isArray ) {
				var entries = new List ( value );
				var def = defs.getNext ();
				while ( entries.hasNext ()) {
					var elm = this._appendElement ( element, def.name );
					var val = entries.getNext ();
					this._resolve ( elm, def, val );
				}
			} else {

			    if (typeof value === "undefined") {
			        this.logger.error("SOAPEncoder: value is undefined");
			    } else {
			        while (defs.hasNext()) {

			            try {
			                var def = defs.getNext();
			                var elm = this._appendElement(element, def.name);

			                var val = value[def.name];
			                this._resolve(elm, def, val);
			            } catch(exception) {

			                // This can happen when opening dataitems in particular.
			                // Apparently, we recieve no OpenIcon but attempt to send it back...
			                this.logger.error("Mysterius malfunction in " + this._operation + ":\n\n" + def.name + ": " + value);
			            }
			        }
			    }
			}
		}
	}
}

/**
 * @param {DOMNode} node
 * @return {DOMElement}
 */
SOAPEncoder.prototype._appendElement = function ( node, name ) {
	
	var child = DOMUtil.createElementNS ( 
		this._namespace, name, node.ownerDocument 
	);
	node.appendChild ( child );
	return child;
}

/**
 * Text stripped according to http://www.w3.org/TR/REC-xml/#charsets because 
 * delicious Office applications may throw in all sorts of illegal characters. 
 * @param {DOMElement} element
 * @param {object} value
 * @param {boolean} isString - not really used...
 */
SOAPEncoder.prototype._appendText = function ( element, value, isString ) {
	
	if ( value != null ) {
		
		value = new String ( value );
		var safe = new String ( "" );
		var chars = value.split ( "" );
		var wasDeleted = false;
		var i = 0, c;
		
		while ( c = chars [ i++ ]) {
			
			var isAbort = true;
			var code = c.charCodeAt ( 0 );
			
			// case 0x10 :
			// case 0x13 :
			
			switch ( code ) {
				case 0x9 :
				case 0xA :
				case 0xD :
					isAbort = false;
					break;
				default :
					if (
						( code >= 0x20 && code <= 0xD7FF ) ||
						( code >= 0xE000 && code  <= 0xFFFD ) || 
						( code >= 0x10000 && code <= 0x10FFFF )
					) {
						isAbort = false;
					}
					break;
			}
			if ( !isAbort ) {
				safe += c;
			} else {
				wasDeleted = true;
			}			
		}
		
		if ( wasDeleted ) {
			this.logger.debug ( "Illegal XML character(s) was deleted from the string: " + value )
		}
		
		element.appendChild ( element.ownerDocument.createTextNode ( safe ));
	}
}