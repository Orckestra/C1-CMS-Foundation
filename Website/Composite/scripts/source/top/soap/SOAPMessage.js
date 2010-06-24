/**
 * @class
 */
function SOAPMessage () {}

SOAPMessage.prototype = {
	
	/** @type {DOMDocument} */
	document : null,
		
	/** @type {DOMElement} */
	envelope : null,
		
	/** @type {DOMElement} */
	header : null,
		
	/** @type {DOMElement} */
	body : null,
		
	/** @type {DOMElement} */
	fault : null
} 
	