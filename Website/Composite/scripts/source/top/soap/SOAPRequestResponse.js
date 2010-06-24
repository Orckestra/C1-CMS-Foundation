SOAPRequestResponse.prototype = new SOAPMessage;
SOAPRequestResponse.prototype.constructor = SOAPRequestResponse;
SOAPRequestResponse.superclass = SOAPMessage.prototype;

/**
 * @class
 * Please use static factory method, see below. The word "SOAPResponse" is reserved 
 * for a Mozilla native javascript object, unfortunately we cannot use it.
 * TODO: Soap has been discontinued in Firefox 3.0, so maybe we can use it soon...
 */
function SOAPRequestResponse () {}

/**
 * @type {SystemLogger}
 */
SOAPRequestResponse.logger = SystemLogger.getLogger ( "SOAPRequestResponse" );

/**
 * @type {XPathResolver}
 */
SOAPRequestResponse.resolver = new XPathResolver ();
SOAPRequestResponse.resolver.setNamespacePrefixResolver ({
	"soap" : Constants.NS_ENVELOPE
});

/**
 * @param {DOMDocument} doc
 */
SOAPRequestResponse.newInstance = function ( doc ) {
	
	var response = null;
	
	if ( doc && doc.documentElement ) {
	
		response = new SOAPRequestResponse ();
		var resolver = SOAPRequestResponse.resolver;
		
		response.document	= doc;
		response.envelope	= resolver.resolve ( "soap:Envelope", response.document );
		response.header		= resolver.resolve ( "soap:Header", response.envelope );
		response.body		= resolver.resolve ( "soap:Body", response.envelope );
		
		var fault = resolver.resolve ( "soap:Fault", response.body );
		if ( fault ) {
			SOAPRequestResponse.logger.fatal ( 
				DOMSerializer.serialize ( fault, true )
			);
			response.fault = {
				element 			: fault,
				faultNamespaceURI	: fault.namespaceURI,
				faultCode		 	: DOMUtil.getTextContent ( resolver.resolve ( "faultcode", fault )),
				faultString		 	: DOMUtil.getTextContent ( resolver.resolve ( "faultstring", fault )),
				detail				: fault.getElementsByTagName ( "detail" ).item ( 0 )
			}
		}
	}
	return response;
}