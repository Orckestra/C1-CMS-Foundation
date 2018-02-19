/**
 * Logging SOAP? This has NO EFFECT in operational mode (only in developer mode)!
 * @type {boolean}
 */
WebServiceProxy.isLoggingEnabled = true;

/**
 * Flip this when webservice requests should return instances 
 * of DOMDocument instead of javascript objects. 
 * Remember to flip it back again!
 * @type {boolean}
 */
WebServiceProxy.isDOMResult = false;

/**
 * If set to true, the WebServiceProxy will display a special dialog on soap faults.
 * Whenever you adjust this property, remember to reset the value to true.
 * TODO: come up with some sort of SOAPFaultHandler to provide in webservice calls?
 * @type {boolean}
 */
WebServiceProxy.isFaultHandler = true;

/**
 * @class
 */
function WebServiceProxy () {
	
	this.logger = SystemLogger.getLogger ( "WebServiceProxy" );
}

/**
 * Create webservice proxy.
 * @param {string} url
 * @return {WebServiceProxy}
 */
WebServiceProxy.createProxy = function ( url ) {
	
	var wsdl = new WebServiceResolver ( url );
	var proxy = new WebServiceProxy ();
	
	var operations 	= wsdl.getOperations ();	
	operations.each ( function ( operation ) {
		proxy[operation.name] = WebServiceProxy.createProxyOperation(operation);
	});
	
	return proxy;
}

/** 
 * Logging SOAP in developermode.
 * @param {WebServiceOperation} operation
 * @param {SOAPMessage} soapMessage
 */
WebServiceProxy.prototype._log = function ( operation, soapMessage ) {
	
	if ( WebServiceProxy.isLoggingEnabled && Application.isDeveloperMode && soapMessage ) {
		var log = soapMessage instanceof SOAPRequest ? "SOAPRequest for " : "SOAPResponse from "; 
		log += operation.address + ": " + operation.name + "\n\n";
		log += DOMSerializer.serialize ( soapMessage.document, true )
		this.logger.fine ( log );
	}
}

/**
 * @param {WebServiceOperation} operation
 * @return {function}
 */
WebServiceProxy.createProxyOperation = function (operation) {

	/*
	* Method returns a function which in turn returns:
	* On request success, an {Object} or a {DOMDocument}.
	* On request error, a {SOAPFault}.
	*/
	return function () {
		var parameters = new List(arguments);
		var result = null;
		if (typeof (parameters.getLast()) == "function") {
			var onresponse = parameters.extractLast();
			var request = operation.encoder.encode(
				parameters
			);
			this._log(operation, request);
			var self = this;
			var response = request.asyncInvoke(operation.address, function (response) {
				self._log(operation, response);
				var soapFault = null;
				if (response) {
					if (response.fault) {
						soapFault = SOAPFault.newInstance(operation, response.fault);
					} else {
						if (WebServiceProxy.isDOMResult) {
							result = response.document;
						} else {
							result = operation.decoder.decode(response);
						}
					}
				}
				request.dispose();
				onresponse(result, soapFault);
			});
		} else {
			var request = operation.encoder.encode(
				new List(arguments)
			);
			this._log(operation, request);
			var response = request.invoke(operation.address);
			this._log(operation, response);

			if (response) {
				if (response.fault) {
					result = SOAPFault.newInstance(operation, response.fault);
					if (WebServiceProxy.isFaultHandler) {
						WebServiceProxy.handleFault(result, request, response);
					}
				} else {
					if (WebServiceProxy.isDOMResult) {
						result = response.document;
					} else {
						result = operation.decoder.decode(response);
					}
				}
			}
			request.dispose();
			return result;
		}
	}
}

/**
 * Handle SOAP fault.
 * @param {SOAPFault} soapFault
 * @param {SOAPRequest} soapRequest
 * @param {SOAPRequestResponse} soapResponse
 */
WebServiceProxy.handleFault = function ( soapFault, soapRequest, soapResponse ) {
	
	try {
		Dialog.invokeModal ( 
			Dialog.URL_SERVICEFAULT,
			null, 
			{
				soapFault 		: soapFault,
				soapRequest 	: soapRequest,
				soapResponse 	: soapResponse
			}
		);
	} catch ( exception ) {
		alert ( 
			soapFault.getFaultString ()
		);
	}
}