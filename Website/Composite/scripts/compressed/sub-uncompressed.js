/*
 * ----------------------------------------------------------------------------
 * "THE BEER-WARE LICENSE" (Revised):
 * Composite.NET wrote this file. As long as you retain this notice 
 * you can do whatever you want with this stuff. If we meet some day, 
 * and you think this stuff is worth it, you can buy us a beer in return.
 * ----------------------------------------------------------------------------
 */

/**
 * This fellow will manage form request and server response to produce an AJAH-style 
 * webpage interface. The form is posted without reloading the page, the response is 
 * compared to the previous response and differing sections will be updated on the page. 
 * This has been coded as a newable class to maximize visibility in your JS-aware IDE, 
 * but there should in fact be only one instance running; it is declared near the end 
 * of this file (scroll down) and accessed through instance variable "UpdateManager".
 */
function _UpdateManager () { // notice the underscore!
	
	var instance = null;
	if ( !window.UpdateManager ) {
		this._construct ();
		instance = this;
	}
	return instance;
}

_UpdateManager.prototype = {
	
	/** 
	 * Version string.
	 * @type {string}
	 */
	version : "0.1",
		
	/**
	 * Attach this classname to any form on the page to make it postback without page refresh.
	 * @type {string}
	 */
	CLASSNAME_FORM : "updateform",

	/**
	 * Attach this classname to one or more elements to make them update without page refresh.
	 * @type {string} 
	 */
	CLASSNAME_ZONE : "updatezone",
	
	/**
	 * Considered experimental until further notice: Attach this classname to block updates!
	 * @type {string}
	 */
	CLASSNAME_GONE : "updategone",
	
	/**
	 * This event is dispatched from the documentElement BEFORE any new request to the 
	 * server is made. The event is fired regardless of whether or not the page is 
	 * actually being updated. Note the the event is also fired once for each page 
	 * update, though not with the documentElement as target. Note that we use  
	 * the same event name because IE handles a limited list of available names. 
	 * @see {Update#EVENT_BEFOREUPDATE}
	 * @type {string}
	 */
	EVENT_BEFOREUPDATE : "beforeupdate",
	
	/**
	 * This event is dispatched from the documentElement AFTER any new request to the 
	 * server has been handled. The event is fired regardless of whether or not the 
	 * page was actually updated. Note the the event is also fired once for each 
	 * page update, though not with the documentElement as target
	 * @see {Update#EVENT_AFTERUPDATE}
	 * @type {string}
	 */
	EVENT_AFTERUPDATE : "afterupdate",
	
	/**
	 * Fires when an error occurs - one that is recognized by the code, that is. 
	 * If you intercept this DOM event, you can ask for the error message as a 
	 * property of the UpdateManager.
	 * @see {UpdateManager#error}
	 * @see {UpdateManager#errormessage}
	 * @type {string}
	 */
	EVENT_ERRORUPDATE : "errorupdate",
	
	/**
	 * If this property is specified by serverside magic, we can avoid rendering the page  
	 * twice. Note that the page may be rendered twice by the server, not on the client.
	 * @type {string}
	 */
	xhtml : null,
	
	/**
	 * An summary is collected here during the update phase. 
	 * @type {string}
	 */
	summary : null,
	
	/**
	 * Flip this property to enable normal form post.
	 * @type {boolean}
	 */
	isEnabled : true,
	
	/**
	 * You should set this to true while developing. This will allow  
	 * the UpdateManager to inform you about possible execution errors.  
	 * @type {boolean}
	 */
	isDebugging : false,
	
	/**
	 * True while posting request or parsing response. While true, all further postback is disabled.
	 * TODO: Disabling further postback, is this a good idea?
	 * @type {boolean}
	 */
	isUpdating : false,
	
	/**
	 * Are elements candidates for "soft" attribute update? When true, elements may have 
	 * their attributes updated WITHOUT replacing the original element with a new one - 
	 * though if something in the descendant DOM tree changed, replacement may still occur. 
	 * 1) The element must have an id attribute specified for this to work. 
	 * @type {boolean}
	 */
	hasSoftAttributes : false,
	
	/**
	 * Are elements candidates for "soft" insertion or deletion? Instead of simly replacing 
	 * the parent, child elements may by be appended or removed using delicate DOM methods. 
	 * Switching the ordinal position of elements is NOT supported, only insert and delete, 
	 * since movement of existing elements is destructive the "hard" way. Requirements are: 
	 * 1) All children must be Element nodes (or whitespace text).
	 * 2) All children must have an id attribute specified.
	 * @type {boolean}hasSoftChildren
	 */
	hasSoftSiblings : false,
	
	/**
	 * The latest response string sent from server (before it is  
	 * converted into DOM). This can be analyzed in case of errors.
	 * @see {UpdateAssistant#getXMLHttpRequest}
	 * @type {string}
	 */
	pendingResponse : null,
	
	/**
	 * This holds the latest document DOM as it was sent 
	 * from the server. It is updated on each request.
	 * @type {DOMDocument}
	 */
	currentDOM : null,
	
	/**
	 * Holds the latest error message string, if any. 
	 * @see {UpdateManager#error}
	 * @type {string}
	 */
	errormessage : null,
	
	/**
	 * The assistant performs the stuff we don't want to focus on here.  
	 * @type {UpdateAssistant}
	 */
	_assistant : null,
	
	/**
	 * Objects with two props: ID of Element to delete, Element to insert instead.
	 * @type {Array<Update>}
	 */
	_updates : null,
	
	/**
	 * Keep track of ReplaceUpdate element IDs to minimize crawling efforts.
	 * @type {HasMap<boolean>}
	 */
	_replaced : null,
	
	/**
	 * NET special: These form element will be updated on each  
	 * request, although it is possible not needed for all of them.
	 * @type {Array<String>}
	 */
	_dotnetnames : [ 
	                 "__VIEWSTATE", 
	                 "__EVENTVALIDATION", 
	                 "__EVENTTARGET", 
	                 "__EVENTARGUMENT",
	                 "__LASTFOCUS" ],
	
	/**
	 * List of plugins should be assembled on startup (before window.onload)
	 * @type {Array<object>}
	 */
	plugins : [],
	
	/**
	 * Identification.
	 * @return {string}
	 */
	toString : function () {
		
		return "[object UpdateManager]";
	},
	
	/**
	 * Constructor action: Confirming well-formed markup.
	 */
	_construct : function ( xhtml ) {
		
		var root = document.documentElement;
		var xmlns = root.namespaceURI;
		if ( xmlns == null ) {
			xmlns = new String ( root.getAttribute ( "xmlns" ));
		}
		if ( xmlns == "http://www.w3.org/1999/xhtml" ) {
			this._addListener ( window, "load" );
			this._addListener ( window, "unload" );
		} else {
			this.error ( "Not an XHTML document!" );
		}
	},
	
	/**
	 * Invoked once, on window load. If the xhtml property is specified,  
	 * we can now parse it into a DOM document. Otherwise we request it.
	 */
	_setup : function () {
		
		if ( this.isEnabled ) {
			this.isEnabled = this.setupForms ();
			if ( this.isEnabled ) {
				if ( this.xhtml != null ) {
					if ( typeof this.xhtml == "string" ) {
						var markup = decodeURIComponent ( this.xhtml );
						this.currentDOM = UpdateAssistant.parse ( markup );
					} else {
						throw new TypeError ();
					}
				} else {
					var _this = this;
					UpdateAssistant.getXMLHttpRequest ( "get", window.location.toString (), {
						handleResponse : function ( dom ) {
							_this.currentDOM = dom;
						}
					}).send ( null );
				}
			}
		}
	},
	
	/**
	 * Setup all forms on window load. Also invoked after some 
	 * page updates, since the update may have replaced a form.
	 * @see {Update#_afterUpdate}
	 * @return {boolean} True when forms were setup
	 */
	setupForms : function () {
		
		var hasSetup = false;
		Array.forEach ( document.forms, function ( form ) {
			if ( form.className.indexOf ( this.CLASSNAME_FORM ) >-1 ) {
				if ( !form.__isSetup ) {
					this._setupForm ( form );
					form.__isSetup = true;
				}
				hasSetup = true;
			}
		}, this );
		return hasSetup;
	},
	
	/**
	 * Intercepting form submit.
	 * @param {HTMLFormElement} form
	 */
	_setupForm : function ( form ) {
		
		var _this = this;
		this._addListener( form, "submit" );
		
		form.__submit = form.submit;
		form.submit = function () {
			if ( _this.isEnabled ) {
				_this._submit ( form );
			} else {
				form.__submit ();
			}
			return false;
		};
	},
	
	/**
	 * Add event listener.
	 * @param {object} target
	 * @param {string} type
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
				if ( this.isEnabled ) {
					this._setup ();
				}
				break;
				
			case "unload" :
				this.isEnabled = false;
				break;
				
			case "submit" :
				if ( this.isEnabled ) {
					if ( document.all ) {
						e.returnValue = false;
					} else {
						e.preventDefault ();
					}
					var form = e.target ? e.target : e.srcElement;
					this._submit ( form );
				}
				break;
		}
	},
	
	/**
	 * Submit form. Note that we block further postback until response is handled.
	 * @param {HTMLFormElement} form
	 */
	_submit : function ( form ) {
		
		if ( !this.isUpdating ) {
			this.isUpdating = true; // reversed in method handleResponse below
			UpdateAssistant.dispatchEvent ( document.documentElement, this.EVENT_BEFOREUPDATE );
			this._postRequest ( form );
		}
	},
	
	/** 
	 * Update the page.
	 * @param {Document} dom
	 */
	handleResponse : function ( dom ) {
		
		if ( this.isEnabled ) { // the window might have been unloaded while response was pending
		
			this.summary = new String ( "" );
			this.errors = new String ( "" );
			
			if ( dom != null ) {
				
				// isolate update zones
				var newzones = UpdateAssistant.getUpdateZones ( dom ); 
				var oldzones = UpdateAssistant.getUpdateZones ( this.currentDOM );
					
				// clear old updates
				this._updates = [];
				this._replaced = {};
				
				// collect updates
				newzones.forEach ( function ( newzone, index ) {
					var oldzone = oldzones [ index ];
					this._crawl ( newzone, oldzone );
				}, this );
				
				// apply updates
				this._updates.forEach ( function ( update, index ) {
					update.update ();
					update.dispose ();
				}, this );
				
				// NET specials
				this._dotnetnames.forEach ( function ( name ) {
					this._fixdotnet ( dom, name );
				}, this );
				
				// prepare next update
				this.currentDOM = dom;
			}
		}
		
		// request end stuff
		this.isUpdating = false;
		UpdateAssistant.dispatchEvent ( document.documentElement, this.EVENT_AFTERUPDATE );
	},
	
	/**
	 * Don't update the page. But we may still need to tell the world... 
	 */
	handleSimilarResponse : function () {
		
		UpdateAssistant.dispatchEvent ( document.documentElement, this.EVENT_AFTERUPDATE );
	},
	
	/**
	 * Crawl elements.
	 * @param {Element} newnode
	 * @param {Element} oldnode
	 * @param {Element} element While iterating, this elements has the last specified ID. 
	 * @param {string} id The ID of aforementioned element.
	 * @return {boolean}
	 */
	_crawl : function ( newnode, oldnode, element, id ) {
		
		var result = true;
		
		var classname = oldnode.getAttribute ( "class" );
		if ( classname == null || classname.indexOf ( this.CLASSNAME_GONE ) == -1 ) {
			if ( oldnode.nodeType == Node.ELEMENT_NODE ) {
				var oldid = oldnode.getAttribute ( "id" );
				if ( oldid != null ) {
					element = newnode;
					id = oldid;
				}
			}
			if ( result = this._check ( newnode, oldnode, element, id )) {
				var child1 = newnode.firstChild;
				var child2 = oldnode.firstChild;
				while ( child1 != null && child2 != null && !this._replaced [ id ]) {
					switch ( child1.nodeType ) {
						case Node.TEXT_NODE :
							result = this._check ( child1, child2, element, id );
							break;
						case Node.DOCUMENT_NODE :
						case Node.ELEMENT_NODE :
							result = this._crawl ( child1, child2, element, id );
							break;
					}
					if ( this._replaced [ id ]) {
						result = false;
					} else {
						child1 = child1.nextSibling;
						child2 = child2.nextSibling;
					}
				}
			}
		}
		return result;
	},
	
	/**
	 * Are two nodes similar? If not, push new update to this._updates.
	 * @param {Node} newnode
	 * @param {Node} oldnode
	 * @param {Element} element
	 * @param {string} id
	 * @return {boolean}
	 */
	_check : function ( newnode, oldnode, element, id ) {
		
		var result = true;
		var plugin = null;
		var isSoftUpdate = false;
		var isPluginUpdate = false;
		
		if (( newnode != null && oldnode == null ) || ( newnode == null && oldnode != null )) {  
			result = false;
		} else if ( result = newnode.nodeType == oldnode.nodeType ) {
			switch ( oldnode.nodeType ) {
				case Node.ELEMENT_NODE :
					if ( newnode.namespaceURI != oldnode.namespaceURI || newnode.nodeName != oldnode.nodeName ) {
						result = false;
					} else if ( result = ( newnode.nodeName == oldnode.nodeName )) {
						var oldid = oldnode.getAttribute ( "id" );
						var newid = newnode.getAttribute ( "id" );
						if ( oldid != null && newid != null ) {
							if ( oldid != newid ) {
								result = false;
							} else if (( plugin = this._getPlugin ( newnode, oldnode )) != null ) {
								if ( plugin.updateElement ( newnode, oldnode )) {
									isPluginUpdate = true; // dont replace (but maybe plugin did)
									result = false; // stop crawling
								}
							}
						}
						if ( result ) {
							if ( result = this._checkAttributes ( newnode, oldnode )) {
								if ( this.hasSoftSiblings && this._hasSoftChildren ( newnode ) && this._hasSoftChildren ( oldnode )) {
									if ( this._validateSoftChildren ( newnode, oldnode )) {
										this._updateSoftChildren ( newnode, oldnode );
										isSoftUpdate = true; // dont replace
									}
									result = false; // stop crawling - but continue in _updateSoftChildren
								} else {
									result = newnode.childNodes.length == oldnode.childNodes.length;
								}
							}
						}
					}
					break;
				case Node.TEXT_NODE :
					/*
					 * Trimming is needed because serverside scripting      
					 * may spontaneously insert whitespace text. oh Lord.
					 */
					if ( newnode.data.trim () != oldnode.data.trim ()) {
						result = false;
					}
					break;
			}
		}
		
		// when in doubt, the default action is to simply replace...
		if ( result == false && !isSoftUpdate && !isPluginUpdate ) {
			if ( id != null && element != null ) {
				this.addUpdate ( 
					new ReplaceUpdate ( id, element )
				);
			}
		}
		return result;
	},
	
	/**
	 * Are attributes similar? If property hasSoftAttributes is on, this may result 
	 * in a "soft" update of element attributes (tree structure is not modified).
	 * @param {Element} newnode
	 * @param {Element} oldnode
	 * @return {boolean} When false, replace "hard" and stop iteration.
	 */
	_checkAttributes : function ( newnode, oldnode ) {
		
		var result = true;
		var changed = false;
		
		var atts1 = newnode.attributes;
		var atts2 = oldnode.attributes;
		
		if ( atts1.length != atts2.length ) {
			changed = true;
		} else {
			changed = !Array.every ( atts1, function ( att1, i ) {
				var att2 = atts2.item ( i );
				return att1.nodeName == att2.nodeName && att1.nodeValue == att2.nodeValue;
			});
		}
		if ( changed ) {
			var newid = newnode.getAttribute ( "id" );
			var oldid = oldnode.getAttribute ( "id" );	
			if ( this.hasSoftAttributes && newid != null && newid == oldid ) {
				this.addUpdate ( 
					new AttributesUpdate ( oldid, newnode, oldnode )
				);
			} else {
				result = false; // addUpdate ReplaceUpdate!
			}
		}
	
		return result;
	},
	
	/**
	 * Are element children candidates for "soft" sibling updates?
	 * 1) All children must be of element nodetype (or whitespace textnodes).
	 * 2) All children must have an ID attribute specified.
	 * @param {Element} element
	 * @return {boolean}
	 */
	_hasSoftChildren : function ( element ) {
		
		var result = true;
		if ( element.hasChildNodes ()) {
			result = Array.every ( element.childNodes, function ( node ) {
				var res = true;
				switch ( node.nodeType ) {
					case Node.TEXT_NODE :
						res = !/[^\t\n\r ]/.test ( node.nodeValue );
						break;
					case Node.ELEMENT_NODE :
						res = node.getAttribute ( "id" ) != null;
						break;
				}
				return res;
			});
		}
		return result;
	},
	
	/**
	 * "Soft" siblings can be INSERTED and DELETED. Changing the ordinal position of  
	 * existing elements is NOT supported, since this is destructive the "hard" way 
	 * (moving eg. an iframe using DOM method insertBefore would reload the iframe). 
	 * This method will verify that new elements retain their relative positioning. 
	 * @param {Element} newnode
	 * @param {Element} oldnode
	 * @return {boolean}
	 */
	_validateSoftChildren : function ( newnode, oldnode ) {
		
		var result = true ;
		var prevold = -1;
		var prevnew = -1;
		var newindex = -1;
		
		var news = this._toMap ( newnode.childNodes, true );
		var olds = this._toMap ( oldnode.childNodes, true );
		
		for ( var id in olds ) {
			if ( result ) {
				var oldindex = olds [ id ];
				result = oldindex >= prevold;
				if ( news [ id ] != null ) {
					newindex = news [ id ];
					result = newindex >= prevnew;
				}
			}
			prevold = oldindex;
			if ( newindex >-1 ) {
				prevnew = newindex;
			}
		}
		
		return result;
	},
	
	/**
	 * @param {Element} newnode
	 * @param {Element} oldnode
	 * @return {boolean}
	 */
	_updateSoftChildren : function ( newnode, oldnode ) {
		
		var news = this._toMap ( newnode.childNodes );
		var olds = this._toMap ( oldnode.childNodes );
		
		for ( var id in olds ) {
			if ( news [ id ] == null ) {
				this.addUpdate (
					new SiblingUpdate ( Update.TYPE_REMOVE, id, null, null ) 
				);
			} else {
				this._crawl ( news [ id ], olds [ id ]); // crawling continued here!
			}
		}
		var previd = null;
		for ( id in news ) {
			if ( olds [ id ] == null ) {
				var xmlelement = news [ id ];
				if ( previd == null ) { // TODO: refactor this tedious fork
					var parentid = oldnode.getAttribute ( "id" );
					this.addUpdate (
						new SiblingUpdate ( Update.TYPE_INSERT, parentid, xmlelement, true ) 
					);
				} else {
					this.addUpdate (
						new SiblingUpdate ( Update.TYPE_INSERT, previd, xmlelement, false ) 
					);
				}
			}
			previd = id;
		}
	},
	
	/**
	 * Add update.
	 * @param {Update} update
	 */
	addUpdate : function ( update ) {
		
		this._updates.push ( update );
		if ( update instanceof ReplaceUpdate ) {
			this._replaced [ update.id ] = true;
		}
	},
	
	/**
	 * @param {Element} element
	 * @param {Element} oldelement
	 * @return {object}
	 */
	_getPlugin : function ( element, oldelement ) {
		
		var result = null;
		this.plugins.every ( function ( plugin ) {
			if ( plugin.handleElement ( element, oldelement )) {
				result = plugin;
			}
			return result == null;
		});
		return result;
	},
	
	/**
	 * Convert an nodelist into an ID-to-element or ID-to-index hashmap.
	 * @param {NodeList<Node>} nodes
	 * @return {object<String><Element>}
	 */
	_toMap : function ( nodes, isIndex ) {
		
		var result = {};
		Array.forEach ( nodes, function ( node, index ) {
			if ( node.nodeType == Node.ELEMENT_NODE ) {
				result [ node.getAttribute ( "id" )] = isIndex ? index : node;
			}
		});
		return result;
	},
	
	/**
	 * Harvest form elements.
	 * @param {HTMLFormElement} form
	 * @return {string}
	 */
	_getPost : function ( form ) {
		
		var result = new String ( "" );
		
		if ( form != null ) {
			var last = "";
			Array.forEach ( form.elements, function ( element ) {
				
				var name = element.name;
				var value = encodeURIComponent ( element.value );
				
				switch ( element.type ) {
						
					case "button" :
					case "submit" :
						var active = UpdateAssistant.getActiveElement ();
						if ( element == active && name!= "" ) {
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
						
					case "text":
					case "hidden":
					case "password":
					case "textarea":
					case "select-one" :
						result += name + "=" + value + "&";
						break;
				}
			});
		}
		
		return result.substr ( 0, result.length - 1 );
	},
	
	/**
	 * Post form data and parse document response.
	 * @param {HTMLFormElement} form
	 */
	_postRequest : function ( form ) {
		
		// collect post data
		var method = form.method != "" ? form.method : "get";
		var action = form.action != "" ? form.action : window.location.toString ();
		var format = this._getPost ( form );
		
		if ( method == "get" ) {
			if ( action.indexOf ( "?" ) >-1 ) {
				action = action + "&" + format;
			} else {
				action + "?" + format;
			}
		}
		
		// invoke request
		var _this = this;
		var request = UpdateAssistant.getXMLHttpRequest ( method, action, this );
		if ( method == "post" ) {
			request.setRequestHeader ( "Content-Type", "application/x-www-form-urlencoded" );
		}
		
		request.send ( method == "post" ? format : null );
	},
	
	/**
	 * ASP.NET requires viewstate and eventvalidation to be updated on each  
	 * page update, even though they may not be placed inside an updatezone.
	 * @param {Document} dom  
	 * @param {string} id
	 */
	_fixdotnet : function ( dom, id ) {
		
		var input = document.getElementById ( id );
		if ( input != null ) {
			var nextinput = UpdateAssistant.getElementById ( dom, id );
			if ( nextinput != null ) {
				var value = nextinput.getAttribute ( "value" );
				if ( value !== input.value ) {
					input.value = value;
				}
			}
		}
	},
	
	/** 
	 * Debug something. Does nothing by default, but while developing 
	 * you can yield an alert by flipping the isDebugging property.
	 * @param {string} out
	 */
	debug : function ( out ) {
		
		if ( this.isDebugging ) {
			alert ( "UpdateManager dysfunction. \n\n" + out );
		}
	},
	
	/** 
	 * Debug something that went wrong. You can tap into  
	 * the dispatched DOM event in order to handle the error.
	 * @param {string} out
	 */
	error : function ( out ) {

		this.errorsmessage = out;
		UpdateAssistant.dispatchEvent ( document.documentElement, UpdateManager.EVENT_ERRORUPDATE );
		this.debug ( out );
	},
	
	/**
	 * Append update info to the "summary" property.  
	 * @param {string} string This should be a one-liner.
	 */
	report : function ( string ) {
		
		this.summary += string + "\n";
	}
};

/*
 * The single working instance is declared here. Notice no _underscore!
 */
var UpdateManager = new _UpdateManager ();

/*
 * ----------------------------------------------------------------------------
 * "THE BEER-WARE LICENSE" (Revised):
 * Composite.NET wrote this file. As long as you retain this notice 
 * you can do whatever you want with this stuff. If we meet some day, 
 * and you think this stuff is worth it, you can buy us a beer in return.
 * ----------------------------------------------------------------------------
 */

/**
 * This fellow has nifty utility functions that may come in handy for the UpdateManager.  
 * This has been coded as a newable class to maximize visibility in your JS-aware IDE, 
 * but there should in fact be only one instance running: It is declared near the end 
 * of this file (scroll down) and accessed through instance variable "UpdateAssistant".
 */
function _UpdateAssistant () {
	
	var instance = null;
	if ( !window.UpdateAssistant ) {
		this._construct ();
		instance = this;
	}
	return instance;
}

_UpdateAssistant.prototype = {
	
	/**
	 * XML serializer.
	 * @type {XMLSerializer}
	 */
	_serializer : 
		window.XMLSerializer != null ? 
		new XMLSerializer () : 
		null,
	
	/**
	 * DOM parser.
	 * @type {DOMParser}
	 */
	_parser : 
		window.DOMParser != null ? 
		new DOMParser () : 
		null,
		
	/**
	 * Used to emulating document.activeElement for non-supporting browsers. 
	 * @type {Element}
	 */
	_activeElement : null,
		
	/**
	 * Constructor action. Tuning the DOM and JS engines while 
	 * patching sketchy WebKit implementation of activeElement. 
	 */
	_construct : function () {
		
		// DOM Node interface
		if ( !window.Node ) {
			window.Node = { ELEMENT_NODE : 1, TEXT_NODE : 3, DOCUMENT_NODE : 9 };
		}
		
		// Array.every
		if ( !Array.every ) {
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
								break;
							}
						}
					}
				}
				return result;
			};
		}
		
		// Array.prototype.every
		if ( !Array.prototype.every ) {
			Array.prototype.every = function ( fun ) {
				var thisp = arguments [ 1 ];
				return Array.every ( this, fun, thisp );
			}; 
		}
		
		// Array.forEeach
		if ( !Array.forEach ) {
			Array.forEach = function ( array, fun ) {
				var len = array.length >>> 0;
				if ( typeof fun != "function" ) {
					throw new TypeError ();
				} else {
					var thisp = arguments [ 2 ];
					for ( var i = 0; i < len; i++ ) {
						if ( typeof array [ i ] != "undefined" ) {
							fun.call ( thisp, array [ i ], i, array );
						}
					}
				}
			};
		}
		
		// Array.prototype.forEeach
		if ( !Array.prototype.forEach ) {
			Array.prototype.forEach = function ( fun ) {
				var thisp = arguments [ 1 ];
				Array.forEach ( this, fun, thisp );
			}; 
		}
		
		// String.prototype.trip
		if ( !String.prototype.trim ) {
			String.prototype.trim = function () {
				return this.replace ( /^\s*/, "" ).replace ( /\s*$/, "" );
			};
		}
		
		// tracking active element for current Webkit and old Firefox versions. 
		// mousedown is needed becuase WebKit buttons are bugged and do not focus.
		if ( document.addEventListener != null ) {
			document.addEventListener ( "focus", this, false );
			document.addEventListener ( "blur", this, false );
			document.addEventListener ( "mousedown", this, false );
		}
	},
	
	/**
	 * Tracking and hacking the active element; retrieved using method getActiveElement.
	 * @param {Event} e
	 */
	handleEvent : function ( e ) {
		
		switch ( e.type ) {
			case "focus" :
			case "mousedown" :
				this._activeElement = e.target;
				break;
			case "blur" :
				if ( this._activeElement == e.target ) {
					this._activeElement = null;
				}
				break;
		}
	},
	
	/**
	 * Build a XMLHttpRequest.
	 * TODO: This is used in multiple scenarios, but hacked to fit one in particular.
	 * @param {String} method
	 * @param {String} target
	 * @param {object} handler
	 * @return {XMLHttpRequest}
	 */
	getXMLHttpRequest : function ( method, target, handler ) {
		
		var request = window.XMLHttpRequest ? new XMLHttpRequest () : new ActiveXObject ( "Msxml2.XMLHTTP.3.0" );
		
		if ( request != null ) {
			request.open ( method, target, ( handler != null ? true : false ));	
			if ( handler != null ) {
				function action () {
					if ( request.readyState == 4 ) {
						var text = request.responseText;
						UpdateManager.pendingResponse = text;	
						var dom = UpdateAssistant.parse ( text );
						if ( dom != null ) {
							handler.handleResponse ( dom );
						}
					}
				}
				/*
				 * TODO: Does IE9 beta entere first case? 
				 * And if yes - does this work?
				 */
				if ( request.addEventListener != null ) {
					request.addEventListener ( "readystatechange", {
						handleEvent : function () {
							action ();
						}
					}, false );
				} else {
					request.onreadystatechange = action;
				}
			}
		}
		return request;
	},
	
	/**
	 * Dispatch bubbling DOM event. Note that IE does not accept  
	 * document nodes or window objects as targets for the event.
	 * @param {Element} element
	 * @param {String} name
	 * @return {boolean} Returns false if event was canceled
	 */
	dispatchEvent : function ( element, name ) {
		
		var result = true;
		if ( element.fireEvent != null ) {
			result = element.fireEvent ( "on" + name );
		} else {
			var event = document.createEvent ( "UIEvents" );
			event.initEvent ( name, true, true );
			result = element.dispatchEvent ( event );
		}
		return result;
	},
	
	/**
	 * Locate update zones in given document context.
	 * @param {Document} dom
	 * @return {Array<Element>}
	 */
	getUpdateZones : function ( dom ) {
		
		var xpath = "//*[@id and contains(@class,'updatezone')]";
		var result = []; 
		var search = null;
		var element = null;
		
		if ( window.XPathResult != null ) {
			var type = XPathResult.ORDERED_NODE_ITERATOR_TYPE;
			search = dom.evaluate ( xpath, dom, null, type, null );
			while (( element = search.iterateNext ()) != null ) {
				result.push ( element );
			}
		} else {
			search = dom.documentElement.selectNodes ( xpath );
			Array.forEach ( search, function ( element ) {
				result.push ( element );
			});
		}
		return result;
	},
	
	/**
	 * Get element by ID in given document context.
	 * @param {Document} dom
	 * @param {String} id
	 * @return {Element}
	 */
	getElementById : function ( dom, id ) {
		
		var xpath = "//*[@id='" + id + "']";
		var search = null;
		var result = null;
		
		if ( window.XPathResult != null ) {
			var type = XPathResult.FIRST_ORDERED_NODE_TYPE;
			search = dom.evaluate ( xpath, dom, null, type, null );
			result = search.singleNodeValue;
		} else {
			result = dom.documentElement.selectNodes ( xpath )[ 0 ];
		}
		return result;
	},
	
	/**
	 * Collect all id attributes used in a document so that  
	 * we can check for multiple occurances of the same id. 
	 * @param {Document} dom
	 * @return {Array<String>}
	 */
	_getIds : function ( dom ) {
		
		var xpath = "//*[@id]";
		var search = null;
		var result = [];
		
		if ( window.XPathResult != null ) {
			var type = XPathResult.ORDERED_NODE_ITERATOR_TYPE;
			search = dom.evaluate ( xpath, dom, null, type, null );
			while (( element = search.iterateNext ()) != null ) {
				result.push ( element.getAttribute ( "id" ));
			}
		} else {
			search = dom.documentElement.selectNodes ( xpath );
			Array.forEach ( search, function ( element ) {
				result.push ( element.getAttribute ( "id" ));
			});
		}
		return result;
	},
	
	/**
	 * Transform an "abstract" XML DOM element into a HTML element. 
	 * Method document.importNode can not be used in Firefox, it 
	 * will break stuff such as the document.forms object.
	 * @param {Element} element
	 */
	toHTMLElement : function ( element ) {
		
		var markup = this.serialize ( element );
		var temp = document.createElement ( "temp" );
		temp.innerHTML = markup;
		return temp.firstChild;
	},
	
	/**
	 * Patching a bug or questionable feature in Webkit where document   
	 * activeElement is only supported for input and textarea elements. 
	 * bugs.webkit.org/show_bug.cgi?id=28630 
	 * bugs.webkit.org/show_bug.cgi?id=22261
	 * @return {Element}
	 */
	getActiveElement : function () {
		
		var result = document.activeElement;
		if ( result == null || result == document.body ) {
			result = this._activeElement; 
		}
		return result;
	},
	
	/**
	 * Serialize DOM intro XML string.
	 * @param {Element} element
	 * @return {String}
	 */
	serialize : function ( element ) {
		
		/*
		 * Note to C1 developers: This method gets the  
		 * overwrite treatment in DocumentUpdatePlugin.js!
		 */
		var result = null;
		if ( this._serializer != null ) {
			result = this._serializer.serializeToString ( element );
		} else {
			result = element.xml;
		}
		return result;
	},
	
	/**
	 * This is never used by the UpdateManager itself, but plugins may 
	 * use this service to see if any two XML elements are different.
	 * @param {Element} newelement
	 * @param {Element} oldelement
	 * @return {boolean}
	 */
	hasDifferences : function ( newelement, oldelement ) {
		
		var s1 = null;
		var s2 = null;
		if ( this._serializer != null ) {
			s1 = this._serializer.serializeToString ( newelement );
			s2 = this._serializer.serializeToString ( oldelement );
		} else {
			s1 = newelement.xml;
			s2 = oldelement.xml;
		}
		return s1 != s2;
	},
	
	/**
	 * Parse XML string into DOM document.
	 * @param {String} markup
	 * @return {Document}
	 */
	parse : function ( markup ) {
	
		var result = null;
		if ( this._parser != null ) {
			result = this._parser.parseFromString ( markup, "text/xml" );
		} else {
			result = new ActiveXObject ( "Msxml2.DOMDocument.3.0" );
			result.setProperty ( "SelectionLanguage", "XPath" );
			result.loadXML ( markup );
		}
		return this._validate ( result );
	},
	
	/**
	 * Validate document and return it. UpdateManager.isDebugging can be  
	 * set to true in order to get notified about these possible errors:  
	 * 1) The XHTML is not well-formed
	 * 2) There are multiple elements with the same id
	 * @param {Document} dom
	 * @return {Document}
	 */
	_validate : function ( dom ) {
		
		var out = null;
		if ( dom.parseError != null && dom.parseError.errorCode != 0 ) {
			out = dom.parseError.reason;
		} else {
			var error = dom.getElementsByTagName ( "parsererror" ).item ( 0 );
			if ( error != null ) {
				out = error.textContent.
					replace ( /\^/g, "" ).
					replace ( /\-/g, "" );
			}
		}
		if ( out == null ) {
			var has = {}, ids = this._getIds ( dom );
			ids.every ( function ( id ) {
				var result = !has [ id ];
				has [ id ] = true;
				if ( !result ) {
					out = "Element \"" + id + "\" encountered twice.";
				}
				return result;
			});
		}
		if ( out != null ) {
			UpdateManager.error ( out );
			dom = null;
		}
		return dom;
	}
};

/*
 * The single working instance is declared here!
 */
var UpdateAssistant = new _UpdateAssistant ();

/*
 * ----------------------------------------------------------------------------
 * "THE BEER-WARE LICENSE" (Revised):
 * Composite.NET wrote this file. As long as you retain this notice 
 * you can do whatever you want with this stuff. If we meet some day, 
 * and you think this stuff is worth it, you can buy us a beer in return.
 * ----------------------------------------------------------------------------
 */

/* 
 * A plugin may be registered like this - note the optional compact syntax: 
 * 
 * UpdateManager.plugins.push ({
 * 		handleElement : function ( element ) { return true; },
 * 		updateElement : function ( element ) { return false; }
 * });
 */

/**
 * Handle input and textarea elements (with an ID attribute specified). 
 * The plugin is registered with the UpdateManager in the end of this file. 
 */
function UpdatePlugin () {
		
	/**
	 * Handle element? Return true to invoke method updateElement below.
	 * @param {Element} element Remember, this is an XML element, not HTML
	 * @param {Element} oldelement
	 * @return {boolean} 
	 */
	this.handleElement = function ( element, oldelement ) {
		
		var result = false;
		
		switch ( element.nodeName.toLowerCase ()) {
			
			case "input" :
			case "textarea" :
				
				/*
				 * By default, we handle any input element with a given ID. 
				 * Special input IDs are better left to the UpdateManager.
				 * We have ASP.NET hardcoded into this stuff, so you may 
				 * choose to adapt the setup to any preferred framework.
				 */
				switch ( element.getAttribute ( "id" )) {
					case "__EVENTTARGET" :
					case "__EVENTARGUMENT" :
					case "__VIEWSTATE" :
					case "__EVENTVALIDATION" :
						result = false;
						break;
				}
				break;
		}
		return result;
	};
	
	/**
	 * Update element. Return true if the UpdateManager should stop 
	 * crawling the DOM subtree in search for further updates.
	 * @param {Element} element
	 * @param {Element} oldelement
	 * @return {boolean} True to stop crawling
	 */
	this.updateElement = function ( element, oldelement ) {
		
		/*
		 * Compare the server XML response to the actual HTML input 
		 * field values on page. If the server sends another value, 
		 * we assume that it REALLY wants to update fields values.
		 */
		var id = element.getAttribute ( "id" );
		var input = document.getElementById ( id );
		if ( input != null ) {
			var value = null;
			switch ( input.nodeName.toLowerCase ()) {
				case "input" :
					value = element.getAttribute ( "value" );
					break;
				case "textarea" :
					value = element.textContent ? element.textContent : element.text;
					break;
			}
			
			/*
			 * Fallback value.
			 */
			if ( value == null ) {
				value = "";
			}
			
			/*
			 * TODO: Other attributes could have been  
			 * updated, they are now skipped completely!!!
			 */
			if ( value != input.value ) {
				input.value = value; 
				UpdateManager.report ( "Property [value] updated on field \"" + id  + "\"" );
			}
		}
		
		/*
		 * Return true to stop crawling (no need for input and textarea). 
		 * False will come in handy if you choose to do a ReplaceUpdate...
		 */
		return true;
	};
};

/**
 * Register plugin.
 */
UpdateManager.plugins.push ( new UpdatePlugin ());


/*
 * ----------------------------------------------------------------------------
 * "THE BEER-WARE LICENSE" (Revised):
 * Composite.NET wrote this file. As long as you retain this notice 
 * you can do whatever you want with this stuff. If we meet some day, 
 * and you think this stuff is worth it, you can buy us a beer in return.
 * ----------------------------------------------------------------------------
 */

/**
 * Default replacement update with which a section of the  
 * DOM subtree is simply replaced with something new. 
 * {@see ReplaceUpdate}
 * @type {String}
 */
Update.TYPE_REPLACE = "replace";

/**
 * Optional attribute update. Using this, elements may have their 
 * attributes updated without replacing the element DOM branch. 
 * The element must have a id attribute specified for this to work. 
 * {@see UpdateManager#hasSoftAttributes}
 * {@see AttributesUpdate}
 * @type {String}
 */
Update.TYPE_ATTRIBUTES = "attributes";

/**
 * Optional removal update: Removes a child without replacing the parent. 
 * Child siblings must all be elements and they must all have an id specified.
 * {@see UpdateManager#hasSoftSiblings}
 * {@see SiblingUpdate}
 * @type {String}
 */
Update.TYPE_REMOVE = "remove";

/**
 * Optional insertion update: Inserts a child without replacing the parent.
 * Child siblings must all be elements and they must all have an id specified.
 * {@see UpdateManager#hasSoftSiblings}
 * {@see SiblingUpdate}
 * @type {String}
 */
Update.TYPE_INSERT = "insert";

/**
 * This event is dispatched before an update. Event target depends on update type: 
 *   "replace" - event target is about to be deleted.
 *   "attributes" - event target is going to have attributes updated.
 *   "remove" - event target is about to be deleted.
 *   "insert" - event target is the PARENT node of an expected child.
 * @see {Update#_beforeUpdate}
 * @type {String}
 */
Update.EVENT_BEFOREUPDATE = "beforeupdate";

/**
 * This event is dispatched after an update. Event target depends on update type:
 *   "replace" - event target was just inserted.
 *   "attributes" - event target just had some attributes updated.
 *   "remove" - event target is the PARENT node of a deleted child.
 *   "insert" - event target was just inserted. 
 * @see {Update#_afterUpdate}
 * @type {String}
 */
Update.EVENT_AFTERUPDATE  = "afterupdate";

/**
 * The action is all about the subclasses.
 * @see {ReplaceUpdate}
 * @see {AttributesUpdate}
 * @see {SiblingUpdate}
 */
function Update () {
	
	return this;
}

Update.prototype = {
	
	/**
	 * Update type.
	 * @type {String}
	 */
	type : null,
	
	/**
	 * Identifies each unique Update instance.
	 * @see {UpdateManager#getUpdate}
	 * @type {String}
	 */
	key : null,
	
	/**
	 * Id of the current page element that is about to be updated.
	 * @type {String}
	 */
	id : null,
	
	/**
	 * The (XML) element used to replace or otherwise update the current element. 
	 * @type {Element}
	 */
	element : null,
	
	/**
	 * The update method performs the actual update. Count on methods  
	 * _beforeUpdate and _afterUpdate to be invoked at this pount.
	 */
	update : function () {},

	/**
	 * Better not keep references to any DOM element around here.
	 */
	dispose : function () {
		
		this.element = null;
	},
	
	/**
	 * When something changed, dispatch pre-update event. 
	 * The __updateType expando property can be used to act on this. 
	 * @param {Element} element
	 * @return {boolean}
	 */
	_beforeUpdate : function ( element ) {
		
		var result = true;
		if ( element != null ) {
			element.__updateType = this.type;
			result = UpdateAssistant.dispatchEvent ( element, Update.EVENT_BEFOREUPDATE );
		}
		return result;
	},
	
	/**
	 * When something changed, dispatch post-update event. 
	 * The __updateType expando property can be used to act on this.
	 * @param {Element} element
	 * @return {boolean}
	 */
	_afterUpdate : function ( element ) {
		
		var result = true;
		if ( element != null ) {
			element.__updateType = this.type;
			result = UpdateAssistant.dispatchEvent ( element, Update.EVENT_AFTERUPDATE );
		}
		return result;
	}
};

/*
 * ----------------------------------------------------------------------------
 * "THE BEER-WARE LICENSE" (Revised):
 * Composite.NET wrote this file. As long as you retain this notice 
 * you can do whatever you want with this stuff. If we meet some day, 
 * and you think this stuff is worth it, you can buy us a beer in return.
 * ----------------------------------------------------------------------------
 */

ReplaceUpdate.prototype = new Update ();
ReplaceUpdate.superclass = Update.prototype;

/**
 * Simple update.
 * @param {String} id
 * @param {Element} element
 */
function ReplaceUpdate ( id, element ) {
	
	this.type = Update.TYPE_REPLACE;
	this.id = id;
	this.element = element;
	return this;
}

/**
 * Replace current element with new element.
 */
ReplaceUpdate.prototype.update = function () {
	
	var target, container, update = UpdateAssistant.toHTMLElement ( this.element );
	
	if (( target = document.getElementById ( this.id )) != null ) {
		if (( container = target.parentNode ) != null ) {
			if ( this._beforeUpdate ( target )) {
				container.replaceChild ( update, target );	
				this._afterUpdate ( update );
			}
		}
	} else {
		UpdateManager.error ( "Element null point: " + this.id );
	}
};

/**
 * @param {Element} element
 * @return {boolean}
 */
ReplaceUpdate.prototype._afterUpdate = function ( element ) {
	
	var result = ReplaceUpdate.superclass._afterUpdate.call ( this, element );
	UpdateManager.report ( "Replaced element id=\"" + this.id + "\"" );
	if ( element.nodeName == "form" || element.getElementsByTagName ( "form" ).item ( 0 ) != null ) {
		UpdateManager.setupForms ();
	}
	return result;
}

/*
 * ----------------------------------------------------------------------------
 * "THE BEER-WARE LICENSE" (Revised):
 * Composite.NET wrote this file. As long as you retain this notice 
 * you can do whatever you want with this stuff. If we meet some day, 
 * and you think this stuff is worth it, you can buy us a beer in return.
 * ----------------------------------------------------------------------------
 */

SiblingUpdate.prototype = new Update ();
SiblingUpdate.superclass = Update.prototype;

/**
 * Sibling update.
 * @param {String} type
 * @param {String} id
 * @param {Element} element
 * @return
 */
function SiblingUpdate ( type, id, element, isFirst ) {
	
	this.type = type;
	this.id = id;
	this.element = element;
	this.isFirst = isFirst;
	return this;
}

/**
 * Update by either inserting or removing an element.
 */
SiblingUpdate.prototype.update = function () {
		
	var element = document.getElementById ( this.id );
	
	switch ( this.type ) {
		case Update.TYPE_REMOVE :
			this._remove ( element );
			break;		
		case Update.TYPE_INSERT :
			this._insert ( this.element, element );
			break;
	}
};

/**
 * Remove element.
 * @param {Element} element
 * @return
 */
SiblingUpdate.prototype._remove = function ( element ) {
	
	var parent = element.parentNode;
	if ( parent != null ) {
		if ( this._beforeUpdate ( element )) {
			parent.removeChild ( element );
			this._afterUpdate ( parent );
		}
	}
};

/**
 * Insert new element after existing element.
 * @param {Element} element The new (XML) element
 * @param {Element} otherelement An existing (HTML) element
 * @return
 */
SiblingUpdate.prototype._insert = function ( element, otherelement ) {
	
	var update = UpdateAssistant.toHTMLElement ( element );
	
	if ( this.isFirst ) {
		var parent = otherelement;
		if ( parent != null ) {
			if ( this._beforeUpdate ( parent )) {
				parent.insertBefore ( update, parent.firstChild );
				this._afterUpdate ( update );
			}
		}
	} else {
		var parent = otherelement.parentNode;
		if ( parent != null ) {
			if ( this._beforeUpdate ( parent )) {
				parent.insertBefore ( update, otherelement.nextSibling );
				this._afterUpdate ( update );
			}
		}
	}
};

/**
 * @param {Element} element
 */
SiblingUpdate.prototype._beforeUpdate = function ( element ) {
	
	var result = SiblingUpdate.superclass._beforeUpdate.call ( this, element );
	if ( this.type == Update.TYPE_REMOVE ) {
		UpdateManager.report ( "Removed element id=\"" + element.id + "\"" );
	}
	return result;
};

/**
 * @param {Element} element
 */
SiblingUpdate.prototype._afterUpdate = function ( element ) {
	
	var result = true;
	if ( element != null ) {
		result = SiblingUpdate.superclass._afterUpdate.call ( this, element );
		if ( this.type == Update.TYPE_INSERT ) {
			UpdateManager.report ( "Inserted element id=\"" + element.id + "\"" );
			if ( element.nodeName == "form" || element.getElementsByTagName ( "form" ).item ( 0 ) != null ) {
				UpdateManager.setupForms ();
			}
		}
	}
	return result;
};

/*
 * ----------------------------------------------------------------------------
 * "THE BEER-WARE LICENSE" (Revised):
 * Composite.NET wrote this file. As long as you retain this notice 
 * you can do whatever you want with this stuff. If we meet some day, 
 * and you think this stuff is worth it, you can buy us a beer in return.
 * ----------------------------------------------------------------------------
 */

AttributesUpdate.prototype = new Update ();
AttributesUpdate.superclass = Update.prototype;

/**
 * @type {Element}  
 */
AttributesUpdate.prototype.currentElement = null;

/**
 * Remember: The before and after element MUST have same id for this to work.
 * @param {String} type
 * @param {String} id
 * @param {Element} element
 * @return
 */
function AttributesUpdate ( id, element, oldelement ) {
	
	this.type = type = Update.TYPE_ATTRIBUTES;
	this.id = id;
	this.element = element;
	this.currentElement = oldelement;
	this._summary = [];
	return this;
}

/**
 * Update attributes.
 */
AttributesUpdate.prototype.update = function () {
	
	var element = document.getElementById ( this.id );
	if ( this._beforeUpdate ( element )) {
		this._updateAttributes ( element );
		this._afterUpdate ( element );
	}
};

/**
 * Performs the actual attribute synchronization.
 */
AttributesUpdate.prototype._updateAttributes = function ( element ) {
	
	// add and update attributes
	Array.forEach ( this.element.attributes, function ( newatt ) {
		var oldatt = this.currentElement.getAttribute ( newatt.nodeName );
		if ( oldatt == null || oldatt != newatt.nodeValue ) {
			this._setAttribute ( element, newatt.nodeName, newatt.nodeValue );
			this._summary.push ( "@" + newatt.nodeName );
		}
	}, this );
	
	// delete attributes
	Array.forEach ( this.currentElement.attributes, function ( oldatt ) {
		if ( this.element.getAttribute ( oldatt.nodeName ) == null ) {
			this._setAttribute ( element, oldatt.nodeName, null );
			this._summary.push ( "@" + oldatt.nodeName );
		}
	}, this );
};

/**
 * Set element attribute. For Internet Explorer, this may not be as simple as it sounds. 
 * @param {Element} element
 * @param {String} name
 * @param {String} value
 * @return
 */
AttributesUpdate.prototype._setAttribute = function ( element, name, value ) {
	
	
	if ( element == null ) {
		// id_FlowUI$Document$DocumentBody$TabPanels_lazybindingactivated2
		alert ( this.id + ": " + document.getElementById ( this.id )+ "\n\n" + name + "=" + value )
		SystemLogger.getLogger ( "AttributesUpdate" ).fine ( document.body.innerHTML )
	}
	
	
	var isDel = ( value == null );
	
	if ( isDel ) {
		element.removeAttribute ( name );
	} else {
		element.setAttribute ( name, value );
	}
	
	if ( document.all != null ) { // TODO: Think of more properties on the IE handicap list?
		if ( isDel ) {
			value = "";
		}
		switch ( name.toLowerCase ()) {
			
			/*
			 * Since matching IDs is a prerequisite for this to   
			 * happen, we don't need to hack support for ID updates.
			 */
			
			case "class" :
				element.className = value;
				break;
			case "disabled" :
				element.disabled = !isDel;
				break;
			case "checked" :
				element.checked = !isDel;
				break;
			case "readonly" :
				element.readOnly = !isDel;
				break;
		}
	}
};

/**
 * @overloads {Update#_afterUpdate}
 * @param {Element} element
 */
AttributesUpdate.prototype._afterUpdate = function ( element ) {
	
	AttributesUpdate.superclass._afterUpdate.call ( this, element );
	UpdateManager.report ( "Attributes updated on element id=\"" + this.id + "\": " + this._summary.toString ());
}

/**
 * Better not keep a reference to any DOM element around here.
 * @overloads {Update#dispose}
 */
AttributesUpdate.prototype.dispose = function () {
	
	Update.prototype.dispose.call ( this );
	this.currentElement = null;
};

/*
 * Pseudoimplement DOM2 Node interface.
 */
if ( !window.Node ) {
	window.Node = {
		ELEMENT_NODE				: 1,
		ATTRIBUTE_NODE				: 2,
		TEXT_NODE					: 3,
		CDATA_SECTION_NODE			: 4,
		ENTITY_REFERENCE_NODE		: 5,
		ENTITY_NODE					: 6,
		PROCESSING_INSTRUCTION_NODE	: 7,
		COMMENT_NODE				: 8,
		DOCUMENT_NODE				: 9,
		DOCUMENT_TYPE_NODE			: 10,
		DOCUMENT_FRAGMENT_NODE		: 11,
		NOTATION_NODE				: 12
	};
}

/*
 * Clone Java Swing KeyEvent interface.
 * TODO: investigate ALT and INSERT.
 */
window.KeyEventCodes = {
	
	VK_BACK						: 8,
	VK_TAB						: 9,
	VK_ENTER					: 13,
	VK_SHIFT					: 16,
	VK_CONTROL					: 17,
	VK_ALT						: null,
	VK_ESCAPE					: 27,
	VK_SPACE					: 32,
	VK_PAGE_UP					: 33,
	VK_PAGE_DOWN				: 34,
	VK_END						: 35,
	VK_HOME						: 36,
	VK_LEFT						: 37,
	VK_UP						: 38,
	VK_RIGHT					: 39,
	VK_DOWN						: 40,
	VK_INSERT					: null,
	VK_DELETE					: 127,
	VK_PLUS						: 187,
	VK_MINUS					: 189,
	VK_NUMPLUS					: 107,
	VK_NUMMINUS					: 109,
	VK_F1						: 112
};

/**
 * Global pointer to the root application window object. 
 * Please don't use too many of these global variables! 
 * @type {DOMDocumentView>
 */
if ( window == top ) {
	window.app = this;
} else {
	window.app = top.app;
}

/**
 * All bindings with a specified ID will be mapped here. 
 * @see {Binding#_updateBindingMap}
 * @type {HashMap<string><Binding>
 */
window.bindingMap = {};

/** 
 * @see {Application#framework}
 * @type {StandardEventHandler}
 */
window.standardEventHandler = null;

/*
 * Localize top level objects. From this point on, top level 
 * objects may be addressed without the "top" notation. This  
 * requires that the object is named identically to the file 
 * that loads it (Java convention). See ScriptLoaderControl.
 */
if ( window != window.top ) {
	
	top.Application.declareTopLocal ( window );
}

/*
 * Uncomment this to hunt down stray alerts.
 * 
new function () {
	var oldalert = window.alert;
	window.alert = function ( string ) {
		SystemLogger.getLogger ( "window.alert" ).debug ( string );
		oldalert ( string );
		SystemDebug.stack ( arguments );
	}
}
*/

/**
 * Accessed through instance variable "WindowManager" declared below.
 */
function _WindowManager () {
	
	this._construct ( KeyMaster.getUniqueKey ());
}

_WindowManager.prototype = {
		
	/*
	 * TODO: These are not really constants any more.
	 */
	WINDOW_LOADED_BROADCAST		: null,
	WINDOW_UNLOADED_BROADCAST	: null,
	WINDOW_EVALUATED_BROADCAST	: null,
	WINDOW_RESIZED_BROADCAST 	: null,
	
	/**
	 * @type {boolean}
	 */
	isWindowLoaded : false,
	
	_logger						: SystemLogger.getLogger ( "WindowManager [" + document.title + "]" ),
	_ondomstatements 			: new List (),
	_onloadstatements 			: new List (),
	_onresizestatements 		: new List (),
	
	_currentDimensions			: null,
	_newDimensions				: null,
	_broadcastTimeout			: null,
	_isHorizontalResize 		: false,
	_isVerticalResize 			: false,
	_broadcastTimeout			: null,
	
	/**
	 * Using unique key to compute various other keys.
	 * @param {string} string
	 * @return {string} 
	 */
	_compute : function ( string, key ) {
	
		return string.replace ( "${windowkey}", document.location + ":" + key );
	},
	
	/**
	 * Constructor action.
	 */
	_construct : function ( key ) {
		
		/*
		 * Define broadcast "constants".
		 */
		this.WINDOW_LOADED_BROADCAST	= this._compute ( BroadcastMessages.$WINKEY_LOADED, key );
		this.WINDOW_UNLOADED_BROADCAST	= this._compute ( BroadcastMessages.$WINKEY_UNLOADED, key );
		this.WINDOW_EVALUATED_BROADCAST	= this._compute ( BroadcastMessages.$WINKEY_EVALUATED, key );
		this.WINDOW_RESIZED_BROADCAST 	= this._compute ( BroadcastMessages.$WINKEY_RESIZED, key );
		
		/*
		 * Action on load and unload.
		 */
		DOMEvents.addEventListener ( window, DOMEvents.DOM, this );
		DOMEvents.addEventListener ( window, DOMEvents.LOAD, this );
		DOMEvents.addEventListener ( window, DOMEvents.UNLOAD, this );
	},
	
	/**
	 * Implements {IEventListener}
	 * @param {Event} e
	 */
	handleEvent : function ( e ) {
	
		switch ( e.type ) {
			
			case DOMEvents.DOM :
				this.onDOMContentLoaded ();
				break;
		
			case DOMEvents.LOAD :
				
				/*
				 * Can this happen twice? 
				 * Maybe descendant frames loading?
				 */
				if ( !this.isWindowLoaded ) {
					
					this.isWindowLoaded = true;
					
					/*
					 * Intercepted by DocumentManager. Register and attach Bindings.
					 */
					EventBroadcaster.broadcast ( this.WINDOW_LOADED_BROADCAST, this );
					
					while ( this._onloadstatements.hasNext ()) {
						this._onloadstatements.getNext ().fireOnLoad ();
					}
					
					/*
					 * Setup resize and unload events.
					 */
					this._currentDimensions = this.getWindowDimensions ();
					DOMEvents.addEventListener ( window, DOMEvents.RESIZE, this );
					EventBroadcaster.broadcast ( this.WINDOW_EVALUATED_BROADCAST, this );
					DOMEvents.removeEventListener ( window, DOMEvents.LOAD, this );
					DOMEvents.stopPropagation ( e );
				}
				break;
				
			case DOMEvents.RESIZE :
			
				/*
				 * Handling the top browser window will consume the mousedown event.
				 * Let's fire a global broadcast to close open menus and stuff.
				 */
				if ( window == top ) {
					EventBroadcaster.broadcast ( BroadcastMessages.MOUSEEVENT_MOUSEDOWN, document.body );
				}
				
				/*
				 * These statements will be executed RIGHT NOW. As of Firefox 3.6, 
				 * this implies that both browsers will fire them a million times 
				 * while resizing.
				 */
				this._onresizestatements.reset ();
				while ( this._onresizestatements.hasNext ()) {
					this._onresizestatements.getNext ().fireOnResize ();
				}
				
				/*
				 * EventBroadcasts are executed after a short timeout. 
				 * The timeout cancels itself on each resize event. 
				 * This will make sure that onresize methods aren't 
				 * executed a million times when user resizes window.
				 */
				this._newDimensions = WindowManager.getWindowDimensions ();
				var isHorizontalResize = this._newDimensions.w != this._currentDimensions.w;
				var isVerticalResize = this._newDimensions.h != this._currentDimensions.h;
				
				if ( isHorizontalResize || isVerticalResize ) {
					if ( this._broadcastTimeout != null ) {
						clearTimeout ( this._broadcastTimeout );
						this._broadcastTimeout = null;
					}
					var self = this;
					this._broadcastTimeout = setTimeout ( function () { 
						self._broadcastResizeEvent ();
					}, 250 );
				}
				break;
				
			case DOMEvents.UNLOAD :
			
				/*
				 * Currently not intercepted by nothing.
				 */
				EventBroadcaster.broadcast ( this.WINDOW_UNLOADED_BROADCAST );
				break;
		}
	},
	
	/**
	 * Broadcast resize event globally. 
	 */
	_broadcastResizeEvent : function () {
		
		clearTimeout ( this._broadcastTimeout );
		this._broadcastTimeout = null;
		EventBroadcaster.broadcast ( this.WINDOW_RESIZED_BROADCAST );
		this._currentDimensions = this._newDimensions;
	},
	
	/**
	 * Add DOMContentLoaded observer.
	 * @param {IDOMHandler} onDomHandler
	 */
	fireOnDOM : function ( onDomHandler ) {
		
		if ( Interfaces.isImplemented ( IDOMHandler, onDomHandler, true )) {
			this._ondomstatements.add ( onDomHandler );
		}
	},
	
	/**
	 * Add onload observer.
	 * @param {ILoadHandler} onLoadHandler
	 */
	fireOnLoad : function ( onLoadHandler ) {
		
		if ( Interfaces.isImplemented ( ILoadHandler, onLoadHandler, true )) {
			this._onloadstatements.add ( onLoadHandler );
		}
	},
	
	/**
	 * Add onresize observer.
	 * @param {IResizeHandler} onResizeHandler
	 */
	fireOnResize : function ( onResizeHandler ) {
		
		if ( Interfaces.isImplemented ( IResizeHandler, onResizeHandler, true )) {
			this._onresizestatements.add ( onResizeHandler );
		}
	},
	
	/**
	 * Note that in IE, this method will be invoked by the WindowAsssitant.
	 * TODO: Will IE9 support DOMContentLoaded event?
	 */
	onDOMContentLoaded : function () {
		
		while ( this._ondomstatements.hasNext ()) {
			this._ondomstatements.getNext ().fireOnDOM ();
		}
	},
	
	/**
	 * @return {Dimension}
	 */
	getWindowDimensions : function () {
	
		return new Dimension (
			Client.isMozilla ? window.innerWidth : document.body.clientWidth,
			Client.isMozilla ? window.innerHeight : document.body.clientHeight
		);
	},
	
	/*
	 * In Mozilla strict error parsing mode, eval must be performed locally  
	 * not to fire a warning. You cannot invoke "anotherWindow.eval(xxx)" ...
	 * http://groups.google.com/group/jquery-en/browse_thread/thread/9e6ed95bce10e2a4
	 * bug #359159 
	 */
	evaluate : function ( string ) {
		return eval ( string );
	}
}

/**
 * The instance that does it.
 * @type {_WindowManager}
 */
var WindowManager = new _WindowManager ();

/**
 * Assist the WindowManager in evaluation of the DOMContentLoaded event in  
 * Internet Explorer. This script is loaded with "defer" attribute, you see.
 */
new function WindowAssistant () {
	
	/*
	 * TODO: Will IE9 support DOMContentLoaded event?
	 */
	if ( Client.isExplorer ) {
		WindowManager.onDOMContentLoaded ();
	}
};


/**
 * Integrate the UpdateManager framework with the amazing world of Bindings.
 * Accessed through instance variable "DocumentManager" declared below.
 */
function _DocumentUpdatePlugin () {
	
	if ( window.UpdateManager != null ) {
		UpdateManager.plugins.push ( this );
		this._setup ();
	}
}

_DocumentUpdatePlugin.prototype = {
		
	/**
	 * Identification.
	 * @return {String}
	 */
	toString : function () {
		
		return "[DocumentUpdatePlugin]";
	},
	
	/**
	 * @type {SystemLogger}
	 */
	_logger : SystemLogger.getLogger ( "DocumentUpdatePlugin [" + document.title + "]" ),
	
	/**
	 * True while UpdateManager is in action.
	 * @type {boolean}
	 */
	_isUpdating : false,
	
	/**
	 * Used to delegate element updates of type "attribute" to the associated binding. 
	 * In other words, let the binding know that the elements attributes were updated. 
	 * Remember that this must be wired up using the bindings "propertyMethodMap" thingy.
	 * @type {Map<String><String>}
	 */
	_attributesbuffer : null,
	
	/**
	 * Instead of attaching bindings on sight - when new elements are inserted - we 
	 * collect elements in a buffer and attach bindings them in the final phase. 
	 * This way, newly attached bindings may be fully aware of document structure. 
	 * Note: Updated attributes are evaluated "on sight", should this be changed?
	 * @type {List<Element>}
	 */
	_elementsbuffer : null,
	
	/**
	 * Debug DOM before and after? This throws out a pretty 
	 * verbose log statement, so let's not keep it enabled.
	 */
	isDebugging : Application.isDeveloperMode, // Application.isDeveloperMode
	
	/**
	 * Store before-DOM serialization here so that we   
	 * may debug before and after in a single output.
	 * @type {String}
	 */
	_oldDOM : null,
	
	/**
	 * Refocus last focused binding after replace.
	 * @type {String}
	 */
	_focusID : null,
		
	/**
	 * UpdateManager configuration and modification.
	 */
	_setup : function () {
	
		/*
		 * Prepare UpdatManager for hard work.
		 */
		UpdateManager.isDebugging = Application.isDeveloperMode;
		UpdateManager.hasSoftAttributes = true;
		UpdateManager.hasSoftSiblings = true;
		
		/*
		 * Setup update listeners and handle potential errors.
		 */
		DOMEvents.addEventListener ( document, DOMEvents.BEFOREUPDATE, this );
		DOMEvents.addEventListener ( document, DOMEvents.AFTERUPDATE, this );
		DOMEvents.addEventListener ( document, DOMEvents.ERRORUPDATE, this );
		DOMEvents.addEventListener ( window, DOMEvents.UNLOAD, this );
		
		/*
		 * This evil hackery fixes the glitch where a the Gecko serializer 
		 * would mess up the prefixes on HTML and UI elements. Since these 
		 * elements reside in the same namespace, Gecko is perfectly 
		 * entitled to do so. Unfortunately, it is also perfectly entitled  
		 * to ignore the evil hack presented below, but it does seem to work.
		 * TODO: Verify this after https://bugzilla.mozilla.org/show_bug.cgi?id=368437
		 */
		if ( Client.isMozilla ) {
			UpdateAssistant.serialize = function ( element ) {
				element = element.cloneNode ( true ); // don't modify UpdateManager.currentDOM!
				element.setAttributeNS ( Constants.NS_NS, "xmlns", Constants.NS_XHTML );
				element.setAttributeNS ( Constants.NS_NS, "xmlns:ui", Constants.NS_UI );
				return this._serializer.serializeToString ( element );
			};
		}
	
	},
	
	/**
	 * @implements {IEventListener}
	 * @param {Event} e
	 */
	handleEvent : function ( e ) {
		
		var target = DOMEvents.getTarget ( e );
		
		switch ( e.type ) {
		
			case DOMEvents.BEFOREUPDATE :
				this._beforeUpdate ( target );
				break;
				
			case DOMEvents.AFTERUPDATE :
				this._afterUpdate ( target );
				break;
				
			case DOMEvents.ERRORUPDATE :
				this._errorUpdate ();
				break;
				
			case DOMEvents.UNLOAD :
				if ( Application.hasLock ( this )) {
					Application.unlock ( this );
				}
				break;
		}
	},
	
	/**
	 * Invoked before an update AND before any updates. 
	 * @param {Element} target 
	 */
	_beforeUpdate : function ( target ) {
		
		var isBeginUpdate = ( target == document.documentElement );
		
		if ( isBeginUpdate ) {
			
			this._elementsbuffer = new List ();
			
			this._isUpdating = true;
			Application.lock ( this ); // TODO: doesn't work in IE
			
			// notify containing page 
			// TODO: nice method to locate the page!
			var root = UserInterface.getBinding ( document.body );
			if ( root != null ) {
				var page = root.getDescendantBindingByType ( PageBinding );
				if ( page != null ) {
					page.onBeforeUpdates ();
				}
			}
			
			var binding = FocusBinding.focusedBinding;
			if ( binding != null ) {
				this._focusID = binding.getID ();
			}
			
			if ( this.isDebugging ) {
				this._oldDOM = DOMSerializer.serialize ( UpdateManager.currentDOM, true );
			}
			
		} else {
			
			switch ( target.__updateType ) {
				case Update.TYPE_REPLACE :
				case Update.TYPE_REMOVE :
					DocumentManager.detachBindings ( target );
					break;
				case Update.TYPE_ATTRIBUTES :
					this._backupattributes ( target, false );
					break;
			}
		}
	},
	
	/**
	 * Invoked after an update AND after all updates. 
	 * @param {Element} target 
	 */
	_afterUpdate : function ( target ) {
		
		var isFinishedUpdate = ( target == document.documentElement );
		
		if ( isFinishedUpdate ) {
			 			
			/*
			 * Register and attach new bindings.
			 */
			var buffer = this._elementsbuffer;
			
			if ( buffer.hasEntries ()) {
				buffer.each ( function ( element ) {
					DocumentManager.attachBindings ( element );
				});
			}
			
			/*
			 * Unlock UI.
			 */
			this._isUpdating = false;
			Application.unlock ( this );
			
			// notify containing page 
			// TODO: nice method to locate the page!
			var root = UserInterface.getBinding ( document.body );
			if ( root != null ) {
				var page = root.getDescendantBindingByType ( PageBinding );
				if ( page != null ) {
					page.onAfterUpdates ();
				}
			}
			
			var binding = FocusBinding.focusedBinding;
			if ( binding == null ) {
				var element = document.getElementById ( this._focusID );
				if ( element != null ) {
					var binding = UserInterface.getBinding ( element );
					if ( binding != null ) {
						binding.focus ();
					}
				}
			}
			this._focusID = null;
			
			// debug before and after DOM
			if ( UpdateManager.summary != "" ) {
				if ( this.isDebugging ) {
					var newDOM = DOMSerializer.serialize ( UpdateManager.currentDOM, true );
					var debug = "NEW DOM: " + document.title + "\n\n" + newDOM + "\n\n";
					debug += "OLD DOM: " + document.title + "\n\n" + this._oldDOM;
					this._logger.debug ( debug );
					this._oldDOM = null;
				}
				this._logger.fine ( UpdateManager.summary );
			}
			
		} else {
			
			switch ( target.__updateType ) {
				case Update.TYPE_REPLACE :
				case Update.TYPE_INSERT :
					// DocumentManager.attachBindings ( target );
					this._elementsbuffer.add ( target );
					break;
				case Update.TYPE_ATTRIBUTES :
					this._backupattributes ( target, true );
					break;
			}
			
			/*
			 * Dispatch updated status from nearest Binding.
			 * TODO: Stamp the __updateType for any reason?
			 */
			switch ( target.id ) {
				
				case "__VIEWSTATE" :
				case "__EVENTTARGET" :
				case "__EVENTARGUMENT" :
				case "__EVENTVALIDATION" :
				case "__LASTFOCUS" :
				case "__REQUEST" :
				case "__RESPONSE" :
				case "__CONSOLEID" :
					break;
					
				default :
					
					/*
					 * Note that the Binding.ACTION_UPDATED action is not   
					 * always targetted at the binding that got updated; 
					 * but it will let a dialog know that layout was changed...
					 */
					var binding = UserInterface.getBinding ( target );
					while ( binding == null && target != null ) {
						binding = UserInterface.getBinding ( target );
						target = target.parentNode;
					}
					if ( binding != null ) {
						binding.dispatchAction ( Binding.ACTION_UPDATED );
					}
					break;
			}
		}
	},
	
	/**
	 * Update error!
	 */
	_errorUpdate : function () {
		
		Application.unlock ( this );
		var cry = "UpdateManager dysfunction:\n\n" + UpdateManager.errorsmessage;
		this._logger.error ( cry + "\n\n" + UpdateManager.pendingResponse );
		if ( Application.isDeveloperMode ) {
			alert ( cry );
		}
	},
	
	/**
	 * Backup attributes for comparison with updated attributes.
	 * @param {Element} element
	 * @param {boolean} isRestore
	 */
	_backupattributes : function ( element, isRestore ) {
		
		var binding = UserInterface.getBinding ( element );
		if ( binding != null ) {
			
			if ( isRestore ) {
				
				var buffer = this._attributesbuffer;
				var map = new Map (); 
				
				buffer.each ( function ( name, old ) {
					var now = element.getAttribute ( name );
					if ( now != null ) {
						if ( now != old ) {
							map.set ( name, Types.castFromString ( now ));
						}
					} else {
						map.set ( name, null );
					}
				});
				new List ( element.attributes ).each ( function ( att ) {
					if ( att.specified ) {
						if ( !buffer.has ( att.nodeName )) {
							map.set ( att.nodeName, Types.castFromString ( att.nodeValue ));
						}
					}
				});
				map.each ( function ( name, value ) {
					var method = binding.propertyMethodMap [ name ];
					if ( method != null ) {
						method.call ( binding, value );
					}
				});
				
			} else {
				
				var map = new Map ();
				new List ( element.attributes ).each ( function ( att ) {
					if ( att.specified ) {
						map.set ( att.nodeName, att.nodeValue );
					}
				});
				this._attributesbuffer = map;
			}
		}
	},
	
	
	// UPDATEPLUGIN METHODS ..............................................
	
	/**
	 * Handle element?
	 * @implements {IUpdateHandler}
	 * @param {Element} newelement
	 * @param {Element} oldelement
	 * @return {boolean}
	 */
	handleElement : function ( newelement, oldelement ) {
		
		// since we know that the element has a specied ID...
		var binding = window.bindingMap [ newelement.getAttribute ( "id" )];
		if ( binding != null ) {
			return binding.handleElement ( newelement, oldelement );
		}
	},
	
	/**
	 * Update element.
	 *	@implements {IUpdateHandler}
	 * @param {Element} newelement
	 * @param {Element} oldelement
	 * @return {boolean}
	 */
	updateElement : function ( newelement, oldelement ) {
		
		var binding = window.bindingMap [ newelement.getAttribute ( "id" )];
		if ( binding != null ) {
			return binding.updateElement ( newelement, oldelement );
		}
	}
}

/**
 * The instance that does it.
 * @type {_DocumentUpdatePlugin}
 */
var DocumentUpdatePlugin = new _DocumentUpdatePlugin ();

DocumentCrawler.prototype = new ElementCrawler;
DocumentCrawler.prototype.constructor = DocumentCrawler;
DocumentCrawler.superclass = ElementCrawler.prototype;

DocumentCrawler.ID = "documentcrawler";
DocumentCrawler.MODE_REGISTER = "register";
DocumentCrawler.MODE_ATTACH = "attach";
DocumentCrawler.MODE_DETACH = "detach";

/**
 * @class
 * This be the crawler that attaches and detaches bindings. When a binding has 
 * the DocumentCrawler.ID included in it's "crawlerFilters" property, it means 
 * that the binding is not supposed to have descendant bindings (or that the  
 * binding will handle descendant bindings registration and attachment itself).
 */
function DocumentCrawler () {
	
	this.mode = DocumentCrawler.MODE_REGISTER;
	this.id = DocumentCrawler.ID;
	this._construct ();
	return this;
}

/**
 * @overloads {Crawler#_construct} 
 */
DocumentCrawler.prototype._construct = function () {
	
	DocumentCrawler.superclass._construct.call ( this );
	
	var self = this;
	this.addFilter ( function ( element, list ) {
		
		var binding = UserInterface.getBinding ( element );
		var result = null;
		
		switch ( self.mode ) {
			
			case DocumentCrawler.MODE_REGISTER :
				if ( binding == null ) {
					UserInterface.registerBinding ( element );
				}
				break;
				
			case DocumentCrawler.MODE_ATTACH :
				if ( binding != null ) {
					if ( !binding.isAttached ) {
						list.add ( binding );
					}
					if ( binding.isLazy == true ) {
						result = NodeCrawler.SKIP_CHILDREN;
					}
				}
				break;
				
			case DocumentCrawler.MODE_DETACH :
				if ( binding != null ) {
					list.add ( binding );
				}
				break;
		}
		return result;
	});
}

/**
 * Accessed through instance variable "DocumentManager" declared below.
 */
function _DocumentManager () {
	
	this._construct ();
}

_DocumentManager.prototype = {
	
	_logger	: SystemLogger.getLogger ( "DocumentManager [" + document.title + "]" ),
	_maxIndex : -1, // MOVE THIS!
	
	/**
	 * Exposes special binding associations for the {@link UserInterface}.
	 * @type {UserInterfaceMapping} 
	 */
	customUserInterfaceMapping : null,
	
	/**
	 * Determines whether or not document text is selectable.
	 * @type {boolean}
	 */
	isDocumentSelectable : false,
	
	/**
	 * Determines whether or not to display the browsers own contextmenu on rightclick.
	 * Note that the contextmenu will *not* be disabled for textareas and inputfields.
	 * @type {boolean}
	 */
	hasNativeContextMenu : false,
	
	/**
	 * Constructor action.
	 */
	_construct : function () {
	
		/*
		 * Setup standard framework event listeners.
		 * Intercepting mousedown, mousemov, mouseup, keydown, keyup.
		 */
		Application.framework ( document );
		
		/*
		 * Initializing when window is fully loaded.
		 * 1) Setup textcontent selection.
		 * 2) Setup contextmenu handling
		 * 3) Resolve custom bindings
		 * 4) Resolve lazy bindings
		 * 5) Attach bindings.
		 */
		EventBroadcaster.subscribe ( WindowManager.WINDOW_LOADED_BROADCAST, this );
		
		/*
		 * For explorer, disable audible clicks when navigating dummy hypertext links.
		 */
		if ( Client.isExplorer ) {
			DOMEvents.addEventListener ( document, DOMEvents.CLICK, this );
		}
		
	},
	
	/**
	 * @implements {IBroadcastListener}
	 * @param {String} broadcast
	 * @param {Object} arg
	 */
	handleBroadcast : function ( broadcast, arg ) {
		
		if ( !this.isDocumentSelectable ) {
			this._makeDocumentUnselectable ();
		}
		if ( !this.hasNativeContextMenu ) {
			DOMEvents.addEventListener ( document, DOMEvents.CONTEXTMENU, this );
		}
		if ( !Application.isMalFunctional ) {
			this._resolveCustomBindingMappings ();
			this.attachBindings ( document.documentElement);
		}
	},
	
	/**
	 * @implements {IEventListener}
	 * @param {Event} e
	 */
	handleEvent : function ( e ) {
		
		var target = DOMEvents.getTarget ( e );
		
		switch ( e.type ) {
				
			case DOMEvents.SELECTSTART :
			case DOMEvents.CONTEXTMENU :
				if ( !this._isTextInputElement ( target )) {
					DOMEvents.preventDefault ( e );
				}
				break;

			case DOMEvents.CLICK :
				if ( Client.isExplorer ) {
					if ( target.href && target.href.indexOf ( Constants.DUMMY_LINK ) >-1 ) {
						DOMEvents.preventDefault ( e );
					}
				}
				break;
		}
	},
	
	
	/** 
	 * Resolve custom bindingmappings scoped for this window. 
	 * This is done here, not in a ordinary Binding, because 
	 * we need this stuff to be evaluated max pronto up front.
	 */
	_resolveCustomBindingMappings : function () {
		
		var bindingset = DOMUtil.getElementsByTagName ( document.documentElement, "bindingmappingset" ).item ( 0 );
		if ( bindingset != null ) {
			var map = {};
			var mappings = DOMUtil.getElementsByTagName ( bindingset, "bindingmapping" );
			new List ( mappings ).each (
				function ( mapping ) {
					var element = mapping.getAttribute ( "element" );
					var binding = mapping.getAttribute ( "binding" );
					map [ element ] = eval ( binding );
				}
			);
			this.setCustomUserInterfaceMapping (
				new UserInterfaceMapping ( map )
			);
		}
	},
	
	/**
	 * Register custom bindingmapping. This will merge with any previously registerd mapping.
	 * @param {UserInterfaceMapping} mapping
	 */
	setCustomUserInterfaceMapping : function ( mapping ) {
		
		if ( this.customUserInterfaceMapping == null ) {
			this.customUserInterfaceMapping = mapping;
		} else {
			this.customUserInterfaceMapping.merge ( mapping );
		}
	},
	
	/**
	 * Register bindings on and within a given container.
	 * @param {DOMElement} element
	 */
	_registerBindings : function ( element ) {
		
		var crawler = new DocumentCrawler ();
		crawler.mode = DocumentCrawler.MODE_REGISTER;
		crawler.crawl ( element );
		crawler.dispose ();
	},
	
	/**
	 * Attach bindings on and within a given container.
	 * @param {DOMElement} container
	 */
	_attachBindings : function ( container ) {
		
		var crawler = new DocumentCrawler ();
		crawler.mode = DocumentCrawler.MODE_ATTACH;
		
		var list = new List ();
		crawler.crawl ( container, list );
		
		/*
		 * Because bindings may modify DOM structure upon 
		 * attachment (confusing the crawler), we collect them 
		 * all in a list before we invoke the onBindingAttach.
		 */
		var wasDataBinding = false;
		while ( list.hasNext ()) {
			var binding = list.getNext ();
			if ( !binding.isAttached ) {
				binding.onBindingAttach ();
				if ( !binding.memberDependencies ) {
					binding.onBindingInitialize ();
				}
				if ( Interfaces.isImplemented ( IData, binding )) {
					wasDataBinding = true;
				}
			}
		}
		
		/*
		 * TODO: NOT ON DISPOSE PAGE!
		 * Update the focus list. Technically, the binding itself 
		 * should dispatch this (root may be located to high in the tree), 
		 * but this will stress up on bulk attachment via UpdateManager.  
		 */
		if ( wasDataBinding ) {
			var root = UserInterface.getBinding ( document.body );
			if ( root != null ) {
				setTimeout ( function () {
					if ( Binding.exists ( root )) {
						root.dispatchAction ( FocusBinding.ACTION_UPDATE );
					}
				}, 250 );
			}
		}
		
		crawler.dispose ();
		list.dispose ();
	},

	/** 
	 * Attach bindings on and within a given element.
	 * @param {DOMElement} element
	 * @param {boolean} isTiming
	 */
	attachBindings : function ( element ) {
		
		this._registerBindings ( element );
		this._attachBindings ( element );
	},

	/** 
	 * Detach bindings within and on a given element.
	 * @param {DOMElement} element
	 * @param {boolean} isElemnentSafe If true, only element descendants will detach.
	 */
	detachBindings : function ( element, isElementSafe ) {
	
		var crawler = new DocumentCrawler ();
		crawler.mode = DocumentCrawler.MODE_DETACH;
		
		var list = new List ();
		crawler.crawl ( element, list );
		
		/*
		 * Preserve binding on container element?
		 */
		if ( isElementSafe == true ) {
			list.extractFirst ();
		}
		
		/*
		 * Reverse collection, disposing bindings from deepest position in DOM tree.
		 * This way, bindings will still have access to parent bindings when disposed. 
		 * Please not that we only nuke the Binding objects here, not the DOMElements, 
		 * as designated by the boolean argument passed to Binding#dispose.
		 */
		var wasDataBinding = false;
		list.reverse ().each ( function ( binding ) {
			if ( Interfaces.isImplemented ( IData, binding )) {
				wasDataBinding = true;
			}
			binding.dispose ( true );
		});
		
		/*
		 * TODO: NOT ON DISPOSE PAGE!
		 * Update the focus list. Technically, the binding itself 
		 * should dispatch this (root may be located to high in the tree), 
		 * but this will stress up on bulk detachment via UpdateManager.  
		 */
		if ( wasDataBinding ) {
			var root = UserInterface.getBinding ( document.body );
			if ( root != null ) {
				setTimeout ( function () {
					if ( Binding.exists ( root )) {
						root.dispatchAction ( FocusBinding.ACTION_UPDATE );
					}
				}, 250 );
			}
		}
		
		/*
		 * Cleanup.
		 */
		crawler.dispose ();
		list.dispose ();
	},
	
	/**
	 * Detach all bindings in document. Invoked when disposing the containing WindowBinding. 
	 * Local instances of WindowBinding will detach their bindings recursively, chain reaction.
	 * @see {WindowBinding#onBindingDispose}
	 */
	detachAllBindings : function () {
		
		this.detachBindings ( document.documentElement);
	},
	
	/**
	 * Scann all z-index values and compute a new, highest value. 
	 * Elements are actually only scanned when first called;
	 * henceforth the value is simply incremented.
	 * TODO: deprecate?
	 * @return {int}
	 */
	computeMaxIndex : function () {
		
		if ( this._maxIndex == -1 ) {
			this._maxIndex = DOMUtil.getMaxIndex ( document );
		}
		return this._maxIndex ++;
	},
	
	/**
	 * Test whether or not an element is an interactive text input field.
	 * TODO: optimize
	 * @param {DOMElement} element
	 * @return {boolean}
	 */
	_isTextInputElement : function ( element ) {
	
		return ( /textarea|input/.test ( 
			DOMUtil.getLocalName ( element )
		));
	},
	
	/*
	 * Prevent non-relevant GUI elements from being selected with the mouse.
	 */
	_makeDocumentUnselectable : function () {
	
		if ( Client.isExplorer ) {
			
			DOMEvents.addEventListener ( document, DOMEvents.SELECTSTART, this );
			
		} else {
			// Ideally, we would say: document.body.style.MozUserSelect = "none";
			// But if we disable user-selection on root element, a bug 
			// prevents descendant nodes from being selected (bug 203291).
			// Instead, all ui:label elements have been made unselectable via CSS.
		}
	}
}

/**
 * The instance that does it.
 * @type {_DocumentManager}
 */
var DocumentManager = new _DocumentManager ();

/**
 * Accessed through instance variable "WindowManager" declared below.
 */
function _DataManager () {}
_DataManager.prototype = {
	
	/**
	 * Flip to enable Ajax style postback and update.
	 * @type {boolean}
	 */
	isPostBackFun : false,
	
	/**
	 * @type {SystemLogger}
	 */
	_logger : SystemLogger.getLogger ( "DataManager [" + document.title + "]" ),
	
	/**
	 * @type {HashMap<string><IData>}
	 */
	_dataBindings : {},
	
	/**
	 * This dirty flag will be falsed by a "persist" or "save" postMessage. 
	 * If true, something was changed in this document since last postMessage.
	 * @see {PageBinding#postMessage}  
	 * @type {boolean}
	 */
	isDirty : false,
	
	/**
	 * Make binding AND DataManager dirty. 
	 * 1) The binding will remain dirty until "save" is successful (note success!) 
	 * 2) DataManager is dirty until a "save" or "persist" postMessage is attempted. 
	 * @param {DataBinding} binding
	 * @return {boolen} True if the binding switched to dirty
	 */
	dirty : function ( binding ) {
		
		this.isDirty = true;
		
		var result = false;
		if ( binding != null && !binding.isDirty ) {	
			binding.isDirty = true;
			binding.dispatchAction ( Binding.ACTION_DIRTY );
			result = true;
		}
		
		return result;
	},
	
	/**
	 * Make binding clean.
	 * @param {DataBinding} binding
	 */
	clean : function ( binding ) {
		
		if ( binding.isDirty ) {
			binding.isDirty = false;
		}
	},
	
	/**
	 * Register DataBinding. Remember that this will only happen 
	 * automatically if and when the DataBinding has a name property.
	 * @param {string} name
	 * @param {DataBinding} binding
	 */
	registerDataBinding : function ( name, binding ) {
		
		if ( Interfaces.isImplemented ( IData, binding, true )) {
			if ( this._dataBindings [ name ] != null ) {
				throw "no proper support for checkbox multiple values! " + name ;
			} else {
				this._dataBindings [ name ] = binding;
			}
		} else {
			throw "Invalid DataBinding: " + binding;
		}
	},
	
	/**
	 * Unregister DataBinding.
	 * @param {string} name
	 */
	unRegisterDataBinding : function ( name ) {
		
		if ( this._dataBindings [ name ] != null ) {
			delete this._dataBindings [ name ];
		}
	},
	
	/**
	 * Get DataBinding by name.
	 * @return {DataBinding}
	 */
	getDataBinding : function ( name ) {
		
		var result = null;
		if ( this._dataBindings [ name ] != null ) {
			result = this._dataBindings [ name ];
		}
		return result;
	},
	
	/**
	 * Get list of all DataBindings - possibly even from descendant windows.
	 * @param {boolean} isTraverse
	 * @return {List<DataBinding>}
	 */
	getAllDataBindings : function ( isTraverse ) {
		
		var list = new List ();
		for ( var name in this._dataBindings ) {
			var binding = this._dataBindings [ name ];
			list.add ( binding );
			if ( isTraverse && binding instanceof WindowBinding ) {
				var manager = binding.getContentWindow ().DataManager;
				if ( manager != null ) {
					list.merge ( manager.getAllDataBindings ());
				}
			}
		}
		return list;
	},
	
	/**
	 * Has DataBindings?
	 * @return {boolean}
	 */
	hasDataBindings : function () {
		
		var result = false;
		for ( var name in this._dataBindings ) {
			result = true;
			break;
		}
		return result;
	},
	
	/**
	 * Populate DataBindings.
	 * @param {DataBindingMap} map
	 */
	populateDataBindings : function ( map ) {
		
		if ( map instanceof DataBindingMap ) {
			map.each ( function ( name, value ) {
				var dataBinding = this._dataBindings [ name ];
				if ( dataBinding != null ) {
					switch ( map.type ) {
						case DataBindingMap.TYPE_RESULT :
							try {
								dataBinding.setResult ( value );
							} catch ( exception ) {
								if ( Application.isDeveloperMode ) {
									alert ( dataBinding );
								}
								throw exception;
							}
							break;
						case DataBindingMap.TYPE_VALUE :
							throw "Not implemented!";
					}
				}
			});
		}
	},
	
	/**
	 * Collect all DataBinding values in a single name-value hashmap.
	 * @return {HashMap<string><string>}
	 */
	getDataBindingValueMap : function () {
		
		var result = new DataBindingMap ();
		result.type = DataBindingMap.TYPE_VALUE;
		
		for ( var name in this._dataBindings ) {
			var dataBinding = this._dataBindings [ name ];
			if ( dataBinding instanceof DataDialogBinding ) {
				throw "DataDialogBinding valuemap not supported!";
			}
			result [ name ] = dataBinding.getValue ();
		}
		return result;
	},
	
	/**
	 * Collect and combine all DataBinding results in a single DataBindingMap.
	 * Notice that we call the getResult method instead of getValue. The "value"
	 * is for the serverside while the "result" is automatically typecasted 
	 * for clientside handling and/or can be set to complex objects.
	 * @return {DataBindingMap} 
	 */
	getDataBindingResultMap : function () {
		
		var result = new DataBindingMap ();
		result.type = DataBindingMap.TYPE_RESULT;
		
		for ( var name in this._dataBindings ) {
			var binding = this._dataBindings [ name ];
			var res = binding.getResult ();
			if ( res instanceof DataBindingMap ) {
				res.each ( function ( name, value ) {
					result.set ( name, value );
				});
			} else {
				result.set ( name, res );
			}
		}
		return result;
	},
	
	/**
	 * Harvest form elements to produce a humongous querystring. This will collect  
	 * all form elements, not just those produced by the DataBinding manifest method.
	 */
	getPostBackString : function () {
		
		var result = "";
		var form = document.forms [ 0 ];
		
		if ( form != null ) {
			var lastname = "";
			new List ( form.elements ).each ( function ( element ) {
				
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
						
					case "submit" :
						if ( document.activeElement == element ) { // or what?
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
							if ( element.name == lastname ) {
								if ( result.lastIndexOf ( "&" ) == result.length - 1 ) {
									result = result.substr ( 0, result.length - 1 );
								}
								result += "," + value;
							}
							else {
								result += name + "=" + element.value;
							}
							lastname = name;
							result += "&";
						}
						break;
						
				}
			});
		}
		
		return result.substr ( 0, result.length - 1 ); // trailing "&"
	}
}

/**
 * The instance that does it.
 * @type {_DataManager}
 */
var DataManager = new _DataManager ();

