/*
 * ----------------------------------------------------------------------------
 * "THE BEER-WARE LICENSE" (Revision 45):
 * Composite.NET wrote this file. As long as you retain this notice 
 * you can do whatever you want with this stuff. If we meet some day, 
 * and you think this stuff is worth it, you can buy us a beer in return.
 * ----------------------------------------------------------------------------
 */

_UpdateManager.CLASSNAME_FORM = "updateform";
_UpdateManager.CLASSNAME_ZONE = "updatezone";
_UpdateManager.EVENT_BEFOREUPDATE = "beforeupdate";
_UpdateManager.EVENT_AFTERUPDATE  = "afterupdate";
// dataavailable

/**
 * Accessed through instance variable "UpdateManager".  
 */
function _UpdateManager () {
	
	this._construct ();
}

_UpdateManager.prototype = {
	
	/**
	 * @type {String}
	 */
	version : "0.1",
	
	/**
	 * @type {boolean}
	 */
	isEnabled : true,
	
	/**
	 * @type {DOMDocument}
	 */
	_old : null,
	
	/**
	 * @type {DOMDocument}
	 */
	_new : null,
	
	/**
	 * @type {Array<string><string>}
	 */
	_updates : null,
	
	/**
	 * Identification.
	 * @return {String}
	 */
	toString : function () {
		
		return "UpdateManager";
	},
	
	/**
	 * Constructor action, confirming well-formed markup.
	 */
	_construct : function () {
		
		var root = document.documentElement;
		var name = root.namespaceURI;
		if ( name == null ) {
			name = new String ( root.getAttribute ( "xmlns" ));
		}
		if ( name == "http://www.w3.org/1999/xhtml" ) {
			this._addListener ( window, "load" );
			if ( !Array.every ) {
				this._patch ();
			}
		}
	},
	
	/**
	 * Infiltrate form postback.
	 */
	_init : function () {
		
		this._old = null; // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
		Array.every ( document.forms, function ( form ) {
			if ( form.className.indexOf ( _UpdateManager.CLASSNAME_FORM ) >-1 ) {
				this._setup ( form );
			}
			return true;
		}, this );
	},
	
	/**
	 * Pseudoimplement Array.every for IE.
	 */
	_patch : function () {
		
		Array.every = function ( array, fun ) {
			var result = true;
			var len = array.length >>> 0;
			if ( typeof fun != "function" ) {
				throw new TypeError ();
			} else {
				var thisp = arguments [ 2 ];
				for ( var i = 0; i < len; i++ ) {
					if ( typeof array [ i ] != "undefined" ) {
						if ( !fun.call ( thisp, array [ i ], i, array )) {
							result = false;
						}
					}
				}
			}
			return result;
		};
	},
	
	/**
	 * Add event listener.
	 * @param {object} target
	 * @param {String} type
	 * @param {object} handler
	 */
	_addListener : function ( target, type ) {
		
		if ( target.addEventListener != null ) {
			target.addEventListener ( type, this, false );
		} else {
			var _this = this;
			target.attachEvent ( "on" + type, function () {
				_this.handleEvent ( window.event );
			});
		}
	},
	
	/**
	 * DOM event listener.
	 * @param {Event} e
	 */
	handleEvent : function ( e ) {
		
		switch ( e.type ) {
			
			case "load" :
				this._init ();
				break;
				
			case "submit" :
				if ( this.isEnabled ) {
					var form = e.target ? e.target : e.srcElement;
					this._submit ( form );
					if ( e.preventDefault != null ) {
						e.preventDefault ();
					} else {
						e.returnValue = false;
					}
				}
				break;
		}
	},
	
	/**
	 * Intercepting form submit.
	 * @param {HTMLFormElement} form
	 */
	_setup : function ( form ) {
		
		var _this = this;
		this._addListener( form, "submit" );
		
		form.__submit = form.submit;
		form.submit = function () {
			if ( _this.isEnabled ) {
				_this._submit ( form );
			} else {
				form.__submit ();
			}
		};
	},
	
	/**
	 * Handle form submit.
	 * @param {HTMLFormElement} form
	 */
	_submit : function ( form ) {
		
		this._update ( this._post ( form ));
	},
	
	/**
	 * Post form and return response document.
	 * @param {HTMLFormElement} form
	 * @return {DOMDocument}
	 */
	_post : function ( form ) {
		
		var result = null;
		var method = form.method != "" ? form.method : "get";
		var target = form.target != "" ? form.target : window.location.toString ();
		var format = this._getPost ( form );
		
		if ( method == "get" ) {
			if ( target.indexOf ( "?" ) >-1 ) {
				target = target + "&" + format;
			} else {
				target + "?" + format;
			}
		}
		
		var request = new XMLHttpRequest ();
		request.open ( method, target, false );
		request.send ( method == "post" ? format : null );
		
		var response = request.responseXML;
		if ( response != null && response.documentElement.namespaceURI == "http://www.w3.org/1999/xhtml" ) {
			result = response;
		} else {
			try {
				document.open ();
				document.write ( request.responseText );
				document.close ();
			} catch ( mimeTypeException ) {}
		}
		return result;
	},
	
	/** 
	 * @param {DOMDocument} dom
	 */
	_update : function ( dom ) {
		
		alert ( new XMLSerializer ().serializeToString ( dom ));
	},
	
	/**
	 * Crawl elements.
	 * @param {Element} node1 New node
	 * @param {Element} node2 Old node
	 * @param {String} arg
	 * @return
	 */
	_crawl : function ( node1, node2, id ) {
		
		if ( node2.nodeType == Node.ELEMENT_NODE ) {
			var eid = node2.getAttribute ( "id" ); 
			if ( eid != null ) {
				id = eid;
			}
		}
		if ( result = this._check ( node1, node2, id )) {
			var child1 = node1.firstChild;
			var child2 = node2.firstChild;	
			while ( child1 != null && child2 != null ) {
				switch ( node2.nodeType ) {
					case Node.TEXT_NODE :
						result = this._check ( child1, child2, id );
						break;
					case Node.ELEMENT_NODE :
						result = this._crawl ( child1, child2, id );
						break;
				}
				child1 = child1.nextSibling;
				child2 = child2.nextSibling;
			}
		}
		return result;
	},
	
	/**
	 * Are two node similar?
	 * @param {Node} node1
	 * @param {Node} node2
	 * @param {String} id
	 * @return {boolean}
	 */
	_check : function ( node1, node2, id ) {
		
		var result = true;
		if (( node1 != null && node2 == null ) || ( node1 == null && node2 != null )) {  
			result = false;
		} else if ( result = node1.nodeType == node2.nodeType ) {
			switch ( node2.nodeType ) {
				case Node.ELEMENT_NODE :
					if ( node1.childNodes.length != node2.childNodes.length ||
							node1.namespaceURI != node2.namespaceURI ||
							node1.nodeName != node2.nodeName ) {
						result = false;
					} else {
						var atts1 = node1.attributes;
						var atts2 = node2.attributes;
						if ( atts1.length != atts2.length ) {
							result = false;
						} else {
							result = Array.every ( atts1, function ( att1, i ) {
								var att2 = atts2.item ( i );
								return att1.nodeName == att2.nodeName && att1.nodeValue == att2.nodeValue;
							});
						}
					}
					break;
				case Node.TEXT_NODE :
					if ( node1.nodeValue != node2.nodeValue ) {
						result = false;
					}
					break;
			}
		}
		if ( !result && id != null ) {
			this._updates.push ( id );
		}
		return result;
	},
	
	/**
	 * Harvest form elements.
	 * @param {HTMLFormElement} form
	 * @return {String}
	 */
	_getPost : function ( form ) {
		
		var result = new String ( "" );
		
		if ( form != null ) {
			var last = "";
			Array.every ( form.elements, function ( element ) {
				
				var name = element.name;
				var value = encodeURIComponent ( element.value );
				
				switch ( element.type ) {
					
					case "text":
					case "hidden":
					case "password":
					case "textarea":
					case "select-one" :
						result += name + "=" + value + "&";
						break;
						
					case "button" :
					case "submit" :
						if ( document.activeElement == element && name!= "" ) {
							result += name + "=" + value + "&";
						}
						break;
						
					case "radio":
						if ( element.checked ) {
							result += name + "=" + value + "&";
						}
						break;
						
					case "checkbox":
						if ( element.checked ) {
							if ( element.name == last ) {
								if ( result.lastIndexOf ( "&" ) == result.length - 1 ) {
									result = result.substr ( 0, result.length - 1 );
								}
								result += "," + value;
							}
							else {
								result += name + "=" + element.value;
							}
							last = name;
							result += "&"; 
						}
						break;
				}
				return true;
			});
		}
		
		return result.substr ( 0, result.length - 1 );
	}

	/**
	 * @param {String} url
	 * @return {DOMDocument}
	 *
	_getDOM : function ( url ) {
		
		var request = new XMLHttpRequest ();
		request.open ( "get", url, false );
		request.send ( null );
		return request.responseXML;
	}
	*/
};

/**
 * 
 */
window.UpdateManager = new _UpdateManager ();


/*
/*
 * Update elements. 
 *
var elements = this._responseResolver.resolveAll ( "//*[@id and @updated='true']", dom );
while ( elements.hasNext ()) {
	
	var element	= elements.getNext ();
	var markup	= Client.isExplorer ? DOMSerializer.serialize ( element ) : element.innerHTML;
	var target	= this.bindingDocument.getElementById ( element.getAttribute ( "id" ));
	var parent	= target.parentNode;
	
	this.bindingWindow.DocumentManager.detachBindings ( target, false );
	if ( Client.isMozilla ) {
		element = this.bindingDocument.importNode ( element, true );
	} else {
		var temp = this.bindingDocument.createElement ( "temp" );
		temp.innerHTML = markup;
		element = temp.firstChild;
	}	
	parent.replaceChild ( element, target );
	this.bindingWindow.DocumentManager.attachBindings ( element );
	
	var binding = UserInterface.getBinding ( element );
	if ( binding != null ) {
		binding.dispatchAction ( Binding.ACTION_UPDATED );
	}
}

/*
 * Update viewstate.
 *
var input = this._responseResolver.resolve ( "//*[name()='input' and @name='__VIEWSTATE']", dom );
if ( input != null ) {
	this.bindingDocument.forms [ 0 ].elements [ "__VIEWSTATE" ].value = input.getAttribute ( "value" );
}

/*
 * Update event validation.
 *
input = this._responseResolver.resolve ( "//*[name()='input' and @name='__EVENTVALIDATION']", dom );
if ( input != null ) {
	this.bindingDocument.forms [ 0 ].elements [ "__EVENTVALIDATION" ].value = input.getAttribute ( "value" );
}
*/