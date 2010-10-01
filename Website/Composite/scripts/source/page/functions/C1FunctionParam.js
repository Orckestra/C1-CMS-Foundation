/**
 * @param {String} name
 * @param {Object} value
 * @return {C1FunctionParam}
 */
function C1FunctionParam ( name, value ) {
	
	this._construct ( name, value );
	return this;
}

C1FunctionParam.prototype = {
	
	/**
	 * @type {String} name
	 */
	name : null,
	
	/**
	 * @type {object} value
	 */
	value : null,
	
	/**
	 * @param {String} name
	 * @param {Object} value
	 */
	_construct : function ( name, value ) {
	
		this.name = name;
		this.value = value;
	},
	
	/**
	 * Serialize param.
	 * @return {String}
	 */
	toString : function () {
		
		var string = '<f:param name="' + this.name + '" xmlns:f="' + C1Function.NS + '"';
		
		if ( this.value instanceof C1Function ) {
			string += '>' + this.value.toString () + '</f:param>';
		} else {
			string += ' value="' + new String ( this.value ) + '"/>';
		}
		return string;
		
	}
}