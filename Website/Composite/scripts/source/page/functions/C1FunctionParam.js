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
	 * Parse to string.
	 * @param {String} tabs
	 * @return {String}
	 */
	toString : function ( tabs ) {
		
		var ns = "";
		if ( tabs == null ) {
			ns = " xmlns:f=\"" + C1Function.NS + "\"";
			tabs = "";
		}
		
		var string = tabs + "<f:param name=\"" + this.name + "\"" + ns;
		if ( this.value instanceof C1Function ) {
			string += ">\n" + this.value.toString ( tabs + "\t" ) + "\n" + tabs + "</f:param>";
		} else {
			string += " value=\"" + new String ( this.value ) + "\"/>";
		}
		return string;
		
	}
}