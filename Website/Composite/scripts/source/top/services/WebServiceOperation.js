/**
 * @class
 * @param {string} name
 * @param {string} address
 * @param {SOAPEncoder} encoder
 * @param {SOAPDecoder} decoder
 */
function WebServiceOperation ( name, address, encoder, decoder ) {
	
	this.name		= name;
	this.address	= address;
	this.encoder 	= encoder;
	this.decoder 	= decoder;
}

WebServiceOperation.prototype = {
	
	name : null,
	address : null,
	encoder : null,
	decoder : null
}