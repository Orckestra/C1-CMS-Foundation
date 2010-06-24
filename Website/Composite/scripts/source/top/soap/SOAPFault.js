/**
 * @class
 * Please use factory method below.
 * @param {string} operationName
 * @param {string} operationAddress
 * @param {string} faultString
 */
function SOAPFault ( operationName, operationAddress, faultString ) {
	
	this._operationName = operationName;
	this._operationAddress = operationAddress;
	this._faultString = faultString;
}

/**
 * Get operation name.
 * @return {string}
 */
SOAPFault.prototype.getOperationName = function () {
	
	return this._operationName;
}

/**
 * Get operation address.
 * @return {string}
 */
SOAPFault.prototype.getOperationAddress = function () {
	
	return this._operationAddress;
}

/**
 * Get fault string.
 * @return {string}
 */
SOAPFault.prototype.getFaultString = function () {

	return this._faultString;
}

/**
 * SOAPFault factory.
 * @param {WebServiceOperation} operation
 * @param {object} fault
 */
SOAPFault.newInstance = function ( operation, fault ) {
	
	return new SOAPFault ( 
		operation.name, 
		operation.address, 
		fault.faultString 
	);
}