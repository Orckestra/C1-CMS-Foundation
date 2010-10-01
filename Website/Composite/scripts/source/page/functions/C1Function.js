C1Function.URL = window.location.toString ();
C1Function.NS = "http://www.composite.net/ns/function/1.0";

C1Function.TYPE_XML = "text/xml";
C1Function.TYPE_TEXT = "text/plain";
C1Function.TYPE_JSON = "application/json";

/**
 * @param {String} name
 * @returns {C1Function}
 */
function C1Function ( name ) {
	
	this._construct ( name )
	return this;
}

C1Function.prototype = {
	
	/**
	 * The function name, eg. "Composite.Constant.String"
	 * @type {String}
	 */
	name : null,
	/**
	 * @type {object}
	 */
	result : null,
	
	/**
	 * @type {Array<string><C1FunctionParam}
	 */
	params : null,
	
	/**
	 * Constructor action isolated for potential subclasses to overload.
	 * @param {String} name
	 */
	_construct : function ( name ) {
	
		this.params = [];
		this.name = name;
	},
	
	/**
	 * Add function param.
	 * @param {string} name
	 * @param {object} value
	 * @return {C1Function}
	 */
	addParam : function ( name, value ) {
	
		this.params.push ( 
			new C1FunctionParam ( name, value )
		);
		return this;
	},

	/**
	 * Parse to string.
	 * @return {String}
	 */
	toString : function () {
		
		var string = '<f:function name="' + this.name + '" xmlns:f="' + C1Function.NS + '" ';
		
		if ( this.params.length > 0 ) {
			string += ">";
			var i = 0, param;
			while (( param = this.params [ i++ ]) != null ) {
				string += param.toString ();
			}
			string += "</f:function>";
		} else {
			string += "/>";
		}
		
		return string;
	},
	
	/**
	 * Parse to XML document.
	 * @return {Document}
	 */
	toDocument : function () {
		
		return new DOMParser ().parseFromString ( 
			this.toString (), 
			C1Function.TYPE_XML 
		);
	},
	
	/**
	 * Invoke request async.
	 * @param {string} type
	 * @param {object} callback
	 */
	invoke : function ( type, callback ) {
		
		alert ( this.toString ())
		
		this._request ( this.toDocument (), true, type, callback );
	},
	
	/**
	 * Invoke request sync.
	 * @param {string} type
	 * @param {object} callback
	 */
	invokeBlocking : function ( callback ) {
		
		this._request ( this.toDocument (), false, type, callback );
	},
	
	/**
	 * Build and send a XMLHttpRequest.
	 * @param {Document} doc
	 * @param {boolean} isAsync
	 * @param {string} type
	 * @param {object} callback
	 */
	_request : function ( doc, isAsync, type, callback ) {
		
		switch ( type ) {
		
			case C1Function.TYPE_XML :
			case C1Function.TYPE_TEXT :
			case C1Function.TYPE_JSON :
			
				var _this = this;
				var request = new XMLHttpRequest ();
				
				request.open ( "post", C1Function.URL, isAsync );
				request.setRequestHeader ( "X-C1Function-Type", type );
				request.overrideMimeType ( type );
				request.send ( doc );
				if ( isAsync ) {
					request.onreadystatechange = function  () {
						if  ( this.readyState == 4 ) {
							_this._reply ( this, type, callback );
						}
					}
				} else {
					this._reply ( request, type, callback );
				}
				break;
				
			default :
				
				throw "Unknown C1Function type";
				break;
		}
	},
	
	/**
	 * Return function result.
	 * @type {XMLHttpRequest} request
	 * @param {String} type
	 * @param {object} callback
	 */
	_reply : function ( request, type, callback ) {
		
		var result = null;
		switch ( type ) {
			case C1Function.TYPE_XML :
				result = request.responseXML;
				break;
			case C1Function.TYPE_TEXT :
				result = request.responseText;
				break;
			case C1Function.TYPE_JSON :
				result = JSON.parse ( request.responseText );
				break;
		}
		
		this.result = result;
		if ( callback != null ) {
			if ( callback instanceof Function ) {
				callback.apply ( null, [ result ]);
			} else if ( typeof callback.handleC1FunctionResult == "function" ) {
				callback.handleC1FunctionResult ( result );
			}
		}
	}
}