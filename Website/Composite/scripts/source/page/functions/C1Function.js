/*
 * ----------------------------------------------------------------------------
 * "THE BEER-WARE LICENSE" (Revised):
 * Composite.NET wrote this file. As long as you retain this notice 
 * you can do whatever you want with this stuff. If we meet some day, 
 * and you think this stuff is worth it, you can buy us a beer in return.
 * ----------------------------------------------------------------------------
 */
 

/*

Basic usage:

	new C1Function ( "Composite.Pages.SitemapXml" ).addParam ( "scope", "all" ).invokeAsync ( "text/xml", function ( func ) {
		alert ( func.toString ()) // check our request 
		alert ( func.result ); // XML document
	});
	
Alternative usage:

	var handler = {
		handleFunction : function ( func ) {
			if ( funk.key == "MY KEY" ) {
				alert ( func.result ); // Javascript object
			}
		}
	}

	var func = new C1Function ( "Composite.Pages.SitemapXml" );
	func.addParam ( "scope", "all" );
	func.addParam ( "depth", "8" );
	func.setKey ( "MY KEY" );
	func.invokeAsync ( "application/json", handler );

*/


C1Function.URL = window.location.toString (); // TODO: Service URL here! 
C1Function.NS = "http://www.composite.net/ns/function/1.0";

C1Function.XML = "text/xml";
C1Function.TEXT = "text/plain";
C1Function.JSON = "application/json";

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
	 * On an async callback, this may be used 
	 * to identify the executing C1Function.
	 * TODO: Dispose C1Function when not set! 
	 * @type {String}
	 */
	key : null,
		
	/**
	 * The function name, eg. "Composite.Constant.String"
	 * @type {String}
	 */
	name : null,
	
	/**
	 * TODO: Set this on invoke!
	 * @type {String}
	 */
	type : C1Function.XML,
	
	/**
	 * Store the server response after this C1Function is invoked.
	 * If you want to know the request, use the toString () method.
	 * @type {object}
	 */
	result : null,
	
	/**
	 * @type {Array<string><C1FunctionParam}
	 */
	params : null,
	
	/**
	 * Identify this C1Function.
	 * @param {String} key
	 * @return {C1Function}
	 */
	setKey : function ( key ) {
		
		this.key = key;
		return this;
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
	 * @param {String} tabs
	 * @return {String}
	 */
	toString : function ( tabs ) {
		
		var ns = "";
		if ( tabs == null ) {
			ns = " xmlns:f=\"" + C1Function.NS + "\" ";
			tabs = "";
		}
		
		var string = tabs + "<f:function name=\"" + this.name + "\"" + ns;
		
		if ( this.params.length > 0 ) {
			string += ">";
			var i = 0, param;
			while (( param = this.params [ i++ ]) != null ) {
				string += "\n" + param.toString ( tabs + "\t" );
			}
			string += "\n" + tabs + "</f:function>";
		} else {
			string += "/>";
		}
		
		return string;
	},
	
	/**
	 * Parse from form markup string <f:function name="..."/>
	 * TODO: validate input + error handling
	 * @param string
	 * @returns
	 */
	fromString : function ( string ) {
		
		this.fromDocument ( this._parseToDocument ( string ));
	},
	
	/**
	 * Parse to XML document.
	 * TODO: IE support here.
	 * @return {Document}
	 */
	toDocument : function () {
		
		return this._parseToDocument ( this.toString ());
	},
	
	/**
	 * Parse from XML document.
	 * @param {Document} doc
	 * @returns
	 */
	fromDocument : function ( doc ) {
		
		// TODO: Implement this!
	},
	
	/**
	 * Invoke request sync (blocking).
	 * @param {string} type
	 * @param {object} callback
	 */
	invoke : function ( type, callback ) {
		
		this._request ( this.toString (), false, type, callback );
	},
	
	/**
	 * Invoke request async.
	 * @param {string} type
	 * @param {object} callback
	 */
	invokeAsync : function ( type, callback ) {
		
		this._request ( this.toString (), true, type, callback );
	},
	
	
	// PRIVATE ..........................................................................
	
	/**
	 * Constructor action.
	 * @param {String} name
	 */
	_construct : function ( name ) {
	
		this.key = "c1function:" + new String ( Math.random ()).slice ( 2 ); 
		this.name = name;
		this.params = [];
	},
	
	/**
	 * Parse string to XML document.
	 * TODO: IE support here.
	 * @return {Document}
	 */
	_parseToDocument : function ( string ) {
		
		return new DOMParser ().parseFromString ( 
			string, 
			C1Function.XML 
		);
	},
	
	/**
	 * Build and send a XMLHttpRequest.
	 * @param {String} string
	 * @param {boolean} isAsync
	 * @param {string} type
	 * @param {object} callback
	 */
	_request : function ( string, isAsync, type, callback ) {
		
		switch ( type ) {
		
			case C1Function.XML :
			case C1Function.TEXT :
			case C1Function.JSON :
			
				var _this = this;
				var request = new XMLHttpRequest ();
				
				request.open ( "post", C1Function.URL, isAsync );
				request.setRequestHeader ( "X-C1Function-Type", type );
				request.overrideMimeType ( type );
				request.send ( string );
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
			case C1Function.XML :
				result = request.responseXML;
				break;
			case C1Function.TEXT :
				result = request.responseText;
				break;
			case C1Function.JSON :
				result = JSON.parse ( request.responseText );
				break;
		}
		
		this.result = result;
		if ( callback != null ) {
			if ( callback instanceof Function ) {
				callback.apply ( null, [ this ]);
			} else if ( typeof callback.handleFunction === "function" ) {
				callback.handleFunction ( this );
			}
		}
	}
}