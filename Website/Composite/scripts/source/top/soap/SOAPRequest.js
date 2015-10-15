SOAPRequest.prototype = new SOAPMessage;
SOAPRequest.prototype.constructor = SOAPRequest;
SOAPRequest.superclass = SOAPMessage.prototype;

/**
 * @type {XPathResolver}
 */
SOAPRequest.resolver = new XPathResolver ();
SOAPRequest.resolver.setNamespacePrefixResolver ({
	"soap" : Constants.NS_ENVELOPE,
	"xhtml" : Constants.NS_XHTML
});

/**
 * SOAPRequest factory method. Making sure that 
 * we instantiate only a single XPathResolver.
 * @param {string} namespace
 * @param {string} operation
 * @return {SOAPRequest}
 */
SOAPRequest.newInstance = function ( namespace, operation ) {
	
	var action			= namespace + "/" + operation;
	var request			= new SOAPRequest ( action );
	var resolver		= SOAPRequest.resolver;
	
	request.document	= Templates.getTemplateDocument ( "soapenvelope.xml" );
	request.envelope	= resolver.resolve ( "soap:Envelope", request.document );
	request.header		= resolver.resolve ( "soap:Header", request.envelope );
	request.body		= resolver.resolve ( "soap:Body", request.envelope );
	
	return request;
}

/**
 * Parse response.
 * @param {XMLHttpRequest} request
 * @return
 */
SOAPRequest._parseResponse = function ( request ) {
	
	var result = null;
	var isOffLine = false;
	var doc = request.responseXML;
	
	/*
	 * XML was returned.
	 */
	if ( doc != null && doc.documentElement != null ) {
		switch ( doc.documentElement.namespaceURI ) {
		
			/*
			 * Case SOAP - request success!
			 */
			case Constants.NS_ENVELOPE :
				result = SOAPRequestResponse.newInstance ( 
					request.responseXML 
				);
				if ( Application.isOffLine ) {
					EventBroadcaster.broadcast ( BroadcastMessages.SERVER_ONLINE );
				}
				break;
			
			/*
			 * Case XHTML. Probably the server went offline.
			 * Only Mozilla will intercept this; Explorer 
			 * sees only text garbage in this case, see below.
			 */
			case Constants.NS_XHTML :
				if ( !Application.isOffLine ) {
					var body = SOAPRequest.resolver.resolve ( 
						"xhtml:html/xhtml:body", 
						request.responseXML 
					);
					if ( body && body.getAttribute ( "id" ) == "offline" ) {
						isOffLine = true;
					}
				}
				break;
				
			case Constants.NS_DOMPARSEERROR :
				var cry = DOMSerializer.serialize ( doc );
				SystemLogger.getLogger ( "SOAPRequest._parseResponse (static)" ).error ( cry );
				if ( Application.isDeveloperMode ) {
					alert ( "SOAPRequest parseerror! \n\n" + cry );
				}
				break;
				
			default :
				if ( Application.isDeveloperMode ) {
					alert ( "SOAPRequest: " + doc.documentElement.namespaceURI )
				}
				break;
		}
		
	/*
	 * Garbage was returned.
	 */
	} else {
		
		/*
		 * Analyze garbage - is it the offline page?
		 */
		if ( !Application.isOffLine && !Application.isLoggedOut ) {
			var text = request.responseText;
			if (request.status == 503 || text.indexOf("id=\"offline\"") > -1) {
			    isOffLine = true;
			} else if (request.status == 403) {
				if (Application.isLoggedIn) {
					Application.isLoggedIn = false;
					var title = "Warning";
					var text = "You have been logged out";
					Dialog.warning(title, text, Dialog.BUTTONS_ACCEPT, {
						handleDialogResponse: function (response) {
							//if (response == Dialog.RESPONSE_ACCEPT) {
								window.location.reload();
							//}
						}
					});
				}
			} else {
				var cry = "Invalid SOAP response: \n\n" + request.responseText;
				SystemLogger.getLogger ( "SOAPRequest._parseResponse (static)" ).error ( cry );
				if ( Application.isDeveloperMode ) {
					alert ( "Invalid SOAP response" );
					window.open ( "about:blank" ).document.write ( request.responseText );
				}
			}
		}
	}
	
	/*
	 * Broadcast intercepted by MessageQueue and Application.
	 */
	if ( isOffLine == true ) {
		EventBroadcaster.broadcast ( BroadcastMessages.SERVER_OFFLINE );
	}
	
	return result;
}


/**
 * @class
 * @param {string} action
 * Please use factory method!
 */
function SOAPRequest ( action ) {
	
	/**
	 * @type {SystemLogger}
	 */
	this.logger = SystemLogger.getLogger ( "SOAPRequest" );
	
	/** 
	 * @type {String} 
	 */
	this.action = action;
	
	/*
	 * Returnable.
	 */
	return this;
}

/**
 * Invoke request.
 * @param {string} url
 * @return {SOAPRequestResponse}
 */
SOAPRequest.prototype.invoke = function ( url ) {
	
	var request = DOMUtil.getXMLHTTPRequest ();
	var response = null;
	
	request.open ( "post", url,  false );
	request.setRequestHeader ( "Content-Type", "text/xml; charset=UTF-8" );
	request.setRequestHeader ( "SOAPAction", this.action );
	
	try {
		request.send ( this.document );
		response = SOAPRequest._parseResponse ( request );
	} catch ( exception ) {
		var error = "Dysfuntion in SOAP invoke: " + url;
		if ( this.document != null ) {
			error += "\n" + DOMSerializer.serialize ( this.document, true );
		}
		this.logger.error ( error );
		throw exception;
	}
	
	request = null;
	return response;
}

/**
* Invoke request.
* @param {string} url
* @return {SOAPRequestResponse}
*/
SOAPRequest.prototype.asyncInvoke = function (url, onresponse) {

	var request = DOMUtil.getXMLHTTPRequest();

	request.open("post", url, true);
	request.setRequestHeader("Content-Type", "text/xml; charset=UTF-8");
	request.setRequestHeader("SOAPAction", this.action);

	request.onreadystatechange = function () {
		if (request.readyState == 4) {
			var response = SOAPRequest._parseResponse(request);
			onresponse(response);
			request = null;
		}
	}

	request.send(this.document);
}

/**
 * Each request wraps a full DOM document. 
 * No time to wait for the garbage collector.
 */
SOAPRequest.prototype.dispose = function () {
	
	for ( var property in this ) {
		this [ property ] = null;
	}
}