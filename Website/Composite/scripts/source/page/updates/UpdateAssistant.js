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
	_serializer:
		window.XMLSerializer != null ?
		new XMLSerializer() :
		null,

	/**
	* DOM parser.
	* @type {DOMParser}
	*/
	_parser:
		(window.DOMParser != null && window.XPathResult != null) ?
		new DOMParser() :
		null,

	/**
	* Used to emulating document.activeElement for non-supporting browsers. 
	* @type {Element}
	*/
	_activeElement: null,

	/**
	* Constructor action. Tuning the DOM and JS engines while 
	* patching sketchy WebKit implementation of activeElement. 
	*/
	_construct: function () {

		// DOM Node interface
		if (!window.Node) {
			window.Node = { ELEMENT_NODE: 1, TEXT_NODE: 3, DOCUMENT_NODE: 9 };
		}

		// Array.every
		if (!Array.every) {
			Array.every = function (array, fun) {
				var result = true;
				var len = array.length >>> 0;
				if (typeof fun != "function") {
					throw new TypeError();
				} else {
					var thisp = arguments[2];
					for (var i = 0; i < len; i++) {
						if (typeof array[i] != "undefined") {
							if (!fun.call(thisp, array[i], i, array)) {
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
		if (!Array.prototype.every) {
			Array.prototype.every = function (fun) {
				var thisp = arguments[1];
				return Array.every(this, fun, thisp);
			};
		}

		// Array.forEeach
		if (!Array.forEach) {
			Array.forEach = function (array, fun) {
				var len = array.length >>> 0;
				if (typeof fun != "function") {
					throw new TypeError();
				} else {
					var thisp = arguments[2];
					for (var i = 0; i < len; i++) {
						if (typeof array[i] != "undefined") {
							fun.call(thisp, array[i], i, array);
						}
					}
				}
			};
		}

		// Array.prototype.forEeach
		if (!Array.prototype.forEach) {
			Array.prototype.forEach = function (fun) {
				var thisp = arguments[1];
				Array.forEach(this, fun, thisp);
			};
		}

		// String.prototype.trip
		if (!String.prototype.trim) {
			String.prototype.trim = function () {
				return this.replace(/^\s*/, "").replace(/\s*$/, "");
			};
		}

		// tracking active element for current Webkit and old Firefox versions. 
		// mousedown is needed becuase WebKit buttons are bugged and do not focus.
		if (document.addEventListener != null) {
			document.addEventListener("focus", this, false);
			document.addEventListener("blur", this, false);
			document.addEventListener("mousedown", this, false);
		}
	},

	/**
	* Tracking and hacking the active element; retrieved using method getActiveElement.
	* @param {Event} e
	*/
	handleEvent: function (e) {

		switch (e.type) {
			case "focus":
			case "mousedown":
				this._activeElement = e.target;
				break;
			case "blur":
				if (this._activeElement == e.target) {
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
	getXMLHttpRequest: function (method, target, handler) {

		var request = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("Msxml2.XMLHTTP.3.0");

		if (request != null) {
			request.open(method, target, (handler != null ? true : false));
			if (handler != null) {
				function action() {
					if (request.readyState == 4) {
						var errorType = request.getResponseHeader("X-Error-Type");
						// Handle error
						if (errorType) {
							var message = "";
							for (var i = 0; i < 10; i++)
							{
								var indexStr = i ? i : "";
								var errorType = request.getResponseHeader("X-Error-Type" + indexStr);
								if (!errorType)
									break;
								var errorMessage = request.getResponseHeader("X-Error-Message" + indexStr);
								message += errorType + "\n" + errorMessage + "\n";
							}
							Dialog.error("Error", message);
						} else {
							var text = request.responseText;
							UpdateManager.pendingResponse = text;
							var dom = UpdateAssistant.parse(text);
							if (dom != null) {
								handler.handleResponse(dom);
							}
						}
					}
				}
				/*
				* TODO: Does IE9 beta entere first case? 
				* And if yes - does this work?
				*/
				if (request.addEventListener != null) {
					request.addEventListener("readystatechange", {
						handleEvent: function () {
							action();
						}
					}, false);
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
	dispatchEvent: function (element, name) {

		var result = true;

		var event = document.createEvent("UIEvents");
		event.initEvent(name, true, true);
		result = element.dispatchEvent(event);

		return result;
	},

	/**
	* Locate update zones in given document context.
	* @param {Document} dom
	* @return {Array<Element>}
	*/
	getUpdateZones: function (dom) {

		var xpath = "//*[@id and contains(@class,'updatezone')]";
		var result = [];
		var search = null;
		var element = null;

		if (window.XPathResult != null) {
			var type = XPathResult.ORDERED_NODE_ITERATOR_TYPE;
			search = dom.evaluate(xpath, dom, null, type, null);
			while ((element = search.iterateNext()) != null) {
				result.push(element);
			}
		} else {
			search = dom.documentElement.selectNodes(xpath);
			Array.forEach(search, function (element) {
				result.push(element);
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
	getElementById: function (dom, id) {

		var xpath = "//*[@id='" + id + "']";
		var search = null;
		var result = null;

		if (window.XPathResult != null) {
			var type = XPathResult.FIRST_ORDERED_NODE_TYPE;
			search = dom.evaluate(xpath, dom, null, type, null);
			result = search.singleNodeValue;
		} else {
			result = dom.documentElement.selectNodes(xpath)[0];
		}
		return result;
	},

	/**
	* Collect all id attributes used in a document so that  
	* we can check for multiple occurances of the same id. 
	* @param {Document} dom
	* @return {Array<String>}
	*/
	_getIds: function (dom) {

		var xpath = "//*[@id]";
		var search = null;
		var result = [];

		if (window.XPathResult != null) {
			var type = XPathResult.ORDERED_NODE_ITERATOR_TYPE;
			search = dom.evaluate(xpath, dom, null, type, null);
			while ((element = search.iterateNext()) != null) {
				result.push(element.getAttribute("id"));
			}
		} else {
			search = dom.documentElement.selectNodes(xpath);
			Array.forEach(search, function (element) {
				result.push(element.getAttribute("id"));
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
	toHTMLElement: function (element) {

		var markup = this.serialize(element);
		var temp = document.createElement("temp");
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
	getActiveElement: function () {

		var result = document.activeElement;
		if (result == null || result == document.body) {
			result = this._activeElement;
		}
		return result;
	},

	/**
	* Serialize DOM intro XML string.
	* @param {Element} element
	* @return {String}
	*/
	serialize: function (element) {

		/*
		* Note to C1 developers: This method gets the  
		* overwrite treatment in DocumentUpdatePlugin.js!
		*/
		var result = null;
		if (element.xml != null) {
			result = element.xml;
		}
		else if (this._serializer != null) {
			result = this._serializer.serializeToString(element);
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
	hasDifferences: function (newelement, oldelement) {

		var s1 = null;
		var s2 = null;
		if (newelement.xml != null)
		{
			s1 = newelement.xml;
			s2 = oldelement.xml;
		}
		else if (this._serializer != null) {
			s1 = this._serializer.serializeToString(newelement);
			s2 = this._serializer.serializeToString(oldelement);
		} 
		return s1 != s2;
	},

	/**
	* Parse XML string into DOM document.
	* @param {String} markup
	* @return {Document}
	*/
	parse: function (markup) {

		var result = null;
		if (this._parser != null && window.XPathResult != null) {
			result = this._parser.parseFromString(markup, "text/xml");
		} else {
			result = new ActiveXObject("Msxml2.DOMDocument.3.0");
			result.setProperty("SelectionLanguage", "XPath");
			result.loadXML(markup);
		}
		return this._validate(result);
	},

	/**
	* Validate document and return it. UpdateManager.isDebugging can be  
	* set to true in order to get notified about these possible errors:  
	* 1) The XHTML is not well-formed
	* 2) There are multiple elements with the same id
	* @param {Document} dom
	* @return {Document}
	*/
	_validate: function (dom) {

		var out = null;
		if (dom.parseError != null && dom.parseError.errorCode != 0) {
			out = dom.parseError.reason;
		} else {
			var error = dom.getElementsByTagName("parsererror").item(0);
			if (error != null) {
				out = error.textContent.
					replace(/\^/g, "").
					replace(/\-/g, "");
			}
		}
		if (out == null) {
			var has = {}, ids = this._getIds(dom);
			ids.every(function (id) {
				var result = !has[id];
				has[id] = true;
				if (!result) {
					out = "Element \"" + id + "\" encountered twice.";
				}
				return result;
			});
		}
		if (out != null) {
			UpdateManager.error(out);
			dom = null;
		}
		return dom;
	}
};

/*
 * The single working instance is declared here!
 */
var UpdateAssistant = new _UpdateAssistant ();