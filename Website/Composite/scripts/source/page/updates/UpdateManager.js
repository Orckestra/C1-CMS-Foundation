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
	version: "0.1",

	/**
	* Attach this classname to any form on the page to make it postback without page refresh.
	* @type {string}
	*/
	CLASSNAME_FORM: "updateform",

	/**
	* Attach this classname to one or more elements to make them update without page refresh.
	* @type {string} 
	*/
	CLASSNAME_ZONE: "updatezone",

	/**
	* Considered experimental until further notice: Attach this classname to block updates!
	* @type {string}
	*/
	CLASSNAME_GONE: "updategone",

	/**
	* This event is dispatched from the documentElement BEFORE any new request to the 
	* server is made. The event is fired regardless of whether or not the page is 
	* actually being updated. Note the the event is also fired once for each page 
	* update, though not with the documentElement as target. Note that we use  
	* the same event name because IE handles a limited list of available names. 
	* @see {Update#EVENT_BEFOREUPDATE}
	* @type {string}
	*/
	EVENT_BEFOREUPDATE: "beforeupdate",

	/**
	* This event is dispatched from the documentElement AFTER any new request to the 
	* server has been handled. The event is fired regardless of whether or not the 
	* page was actually updated. Note the the event is also fired once for each 
	* page update, though not with the documentElement as target
	* @see {Update#EVENT_AFTERUPDATE}
	* @type {string}
	*/
	EVENT_AFTERUPDATE: "afterupdate",

	/**
	* Fires when an error occurs - one that is recognized by the code, that is. 
	* If you intercept this DOM event, you can ask for the error message as a 
	* property of the UpdateManager.
	* @see {UpdateManager#error}
	* @see {UpdateManager#errormessage}
	* @type {string}
	*/
	EVENT_ERRORUPDATE: "errorupdate",

	/**
	* If this property is specified by serverside magic, we can avoid rendering the page  
	* twice. Note that the page may be rendered twice by the server, not on the client.
	* @type {string}
	*/
	xhtml: null,

	/**
	* An summary is collected here during the update phase. 
	* @type {string}
	*/
	summary: null,

	/**
	* Flip this property to enable normal form post.
	* @type {boolean}
	*/
	isEnabled: true,

	/**
	* You should set this to true while developing. This will allow  
	* the UpdateManager to inform you about possible execution errors.  
	* @type {boolean}
	*/
	isDebugging: false,

	/**
	* True while posting request or parsing response. While true, all further postback is disabled.
	* TODO: Disabling further postback, is this a good idea?
	* @type {boolean}
	*/
	isUpdating: false,

	/**
	* Are elements candidates for "soft" attribute update? When true, elements may have 
	* their attributes updated WITHOUT replacing the original element with a new one - 
	* though if something in the descendant DOM tree changed, replacement may still occur. 
	* 1) The element must have an id attribute specified for this to work. 
	* @type {boolean}
	*/
	hasSoftAttributes: false,

	/**
	* Are elements candidates for "soft" insertion or deletion? Instead of simly replacing 
	* the parent, child elements may by be appended or removed using delicate DOM methods. 
	* Switching the ordinal position of elements is NOT supported, only insert and delete, 
	* since movement of existing elements is destructive the "hard" way. Requirements are: 
	* 1) All children must be Element nodes (or whitespace text).
	* 2) All children must have an id attribute specified.
	* @type {boolean}hasSoftChildren
	*/
	hasSoftSiblings: false,

	/**
	* The latest response string sent from server (before it is  
	* converted into DOM). This can be analyzed in case of errors.
	* @see {UpdateAssistant#getXMLHttpRequest}
	* @type {string}
	*/
	pendingResponse: null,

	/**
	* This holds the latest document DOM as it was sent 
	* from the server. It is updated on each request.
	* @type {DOMDocument}
	*/
	currentDOM: null,

	/**
	* Holds the latest error message string, if any. 
	* @see {UpdateManager#error}
	* @type {string}
	*/
	errormessage: null,

	/**
	* The assistant performs the stuff we don't want to focus on here.  
	* @type {UpdateAssistant}
	*/
	_assistant: null,

	/**
	* Objects with two props: ID of Element to delete, Element to insert instead.
	* @type {Array<Update>}
	*/
	_updates: null,

	/**
	* Keep track of ReplaceUpdate element IDs to minimize crawling efforts.
	* @type {HasMap<boolean>}
	*/
	_replaced: null,

	/**
	* NET special: These form element will be updated on each  
	* request, although it is possible not needed for all of them.
	* @type {Array<String>}
	*/
	_dotnetnames: [
	                 "__VIEWSTATE",
	                 "__EVENTVALIDATION",
	                 "__EVENTTARGET",
	                 "__EVENTARGUMENT",
	                 "__LASTFOCUS"],

	/**
	* List of plugins should be assembled on startup (before window.onload)
	* @type {Array<object>}
	*/
	plugins: [],

	/**
	* Identification.
	* @return {string}
	*/
	toString: function () {

		return "[object UpdateManager]";
	},

	/**
	* Constructor action: Confirming well-formed markup.
	*/
	_construct: function (xhtml) {

		var root = document.documentElement;
		var xmlns = root.namespaceURI;
		if (xmlns == null) {
			xmlns = new String(root.getAttribute("xmlns"));
		}
		if (xmlns == "http://www.w3.org/1999/xhtml") {
			this._addListener(window, "load");
			this._addListener(window, "unload");
		} else {
			this.error("Not an XHTML document!");
		}
	},

	/**
	* Invoked once, on window load. If the xhtml property is specified,  
	* we can now parse it into a DOM document. Otherwise we request it.
	*/
	_setup: function () {

		if (this.isEnabled) {
			this.isEnabled = this.setupForms();
			if (this.isEnabled) {
				if (this.xhtml != null) {
					if (typeof this.xhtml == "string") {
						var markup = decodeURIComponent(this.xhtml);
						this.currentDOM = UpdateAssistant.parse(markup);
					} else {
						throw new TypeError();
					}
				} else {
					var _this = this;
					UpdateAssistant.getXMLHttpRequest("get", window.location.toString(), {
						handleResponse: function (dom) {
							_this.currentDOM = dom;
						}
					}).send(null);
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
	setupForms: function () {

		var hasSetup = false;
		Array.forEach(document.forms, function (form) {
			if (form.className.indexOf(this.CLASSNAME_FORM) > -1) {
				if (!form.__isSetup) {
					this._setupForm(form);
					form.__isSetup = true;
				}
				hasSetup = true;
			}
		}, this);
		return hasSetup;
	},

	/**
	* Intercepting form submit.
	* @param {HTMLFormElement} form
	*/
	_setupForm: function (form) {

		var _this = this;
		this._addListener(form, "submit");

		form.__submit = form.submit;
		form.submit = function () {
			if (_this.isEnabled) {
				_this._submit(form);
			} else {
				form.__submit();
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
	_addListener: function (target, type) {

		if (target.addEventListener != null) {
			target.addEventListener(type, this, false);
		} else {
			var _this = this;
			target.attachEvent("on" + type, function () {
				_this.handleEvent(window.event);
			});
		}
	},

	/**
	* DOM event listener.
	* @param {Event} e
	*/
	handleEvent: function (e) {

		switch (e.type) {

			case "load":
				if (this.isEnabled) {
					this._setup();
				}
				break;

			case "unload":
				this.isEnabled = false;
				break;

			case "submit":
				if (this.isEnabled) {
					if (document.all) {
						e.returnValue = false;
					} else {
						e.preventDefault();
					}
					var form = e.target ? e.target : e.srcElement;
					this._submit(form);
				}
				break;
		}
	},

	/**
	* Submit form. Note that we block further postback until response is handled.
	* @param {HTMLFormElement} form
	*/
	_submit: function (form) {

		if (!this.isUpdating) {
			this.isUpdating = true; // reversed in method handleResponse below
			UpdateAssistant.dispatchEvent(document.documentElement, this.EVENT_BEFOREUPDATE);
			this._postRequest(form);
		}
	},

	/** 
	* Update the page.
	* @param {Document} dom
	*/
	handleResponse: function (dom) {

		if (this.isEnabled) { // the window might have been unloaded while response was pending

			this.summary = new String("");
			this.errors = new String("");

			if (dom != null) {

				// isolate update zones
				var newzones = UpdateAssistant.getUpdateZones(dom);
				var oldzones = UpdateAssistant.getUpdateZones(this.currentDOM);

				// clear old updates
				this._updates = [];
				this._replaced = {};

				// collect updates
				newzones.forEach(function (newzone, index) {
					var oldzone = oldzones[index];
					this._crawl(newzone, oldzone);
				}, this);

				// apply updates
				this._updates.forEach(function (update, index) {
					update.update();
					update.dispose();
				}, this);

				// NET specials
				this._dotnetnames.forEach(function (name) {
					this._fixdotnet(dom, name);
				}, this);

				// prepare next update
				this.currentDOM = dom;
			}
		}

		// request end stuff
		this.isUpdating = false;
		UpdateAssistant.dispatchEvent(document.documentElement, this.EVENT_AFTERUPDATE);
	},

	/**
	* Don't update the page. But we may still need to tell the world... 
	*/
	handleSimilarResponse: function () {

		UpdateAssistant.dispatchEvent(document.documentElement, this.EVENT_AFTERUPDATE);
	},

	/**
	* Crawl elements.
	* @param {Element} newnode
	* @param {Element} oldnode
	* @param {Element} element While iterating, this elements has the last specified ID. 
	* @param {string} id The ID of aforementioned element.
	* @return {boolean}
	*/
	_crawl: function (newnode, oldnode, element, id) {

		var result = true;

		var classname = oldnode.getAttribute("class");
		if (classname == null || classname.indexOf(this.CLASSNAME_GONE) == -1) {
			if (oldnode.nodeType == Node.ELEMENT_NODE) {
				var oldid = oldnode.getAttribute("id");
				if (oldid != null) {
					element = newnode;
					id = oldid;
				}
			}
			if (result = this._check(newnode, oldnode, element, id)) {
				var child1 = newnode.firstChild;
				var child2 = oldnode.firstChild;
				while (child1 != null && child2 != null && !this._replaced[id]) {
					switch (child1.nodeType) {
						case Node.TEXT_NODE:
							result = this._check(child1, child2, element, id);
							break;
						case Node.DOCUMENT_NODE:
						case Node.ELEMENT_NODE:
							result = this._crawl(child1, child2, element, id);
							break;
					}
					if (this._replaced[id]) {
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
	_check: function (newnode, oldnode, element, id) {

		var result = true;
		var plugin = null;
		var isSoftUpdate = false;
		var isPluginUpdate = false;

		if ((newnode != null && oldnode == null) || (newnode == null && oldnode != null)) {
			result = false;
		} else if (result = newnode.nodeType == oldnode.nodeType) {
			switch (oldnode.nodeType) {
				case Node.ELEMENT_NODE:
					if (newnode.namespaceURI != oldnode.namespaceURI || newnode.nodeName != oldnode.nodeName) {
						result = false;
					} else if (result = (newnode.nodeName == oldnode.nodeName)) {
						var oldid = oldnode.getAttribute("id");
						var newid = newnode.getAttribute("id");
						if (oldid != null && newid != null) {
							if (oldid != newid) {
								result = false;
							} else if ((plugin = this._getPlugin(newnode, oldnode)) != null) {
								if (plugin.updateElement(newnode, oldnode)) {
									isPluginUpdate = true; // dont replace (but maybe plugin did)
									result = false; // stop crawling
								}
							}
						}
						if (result) {
							if (result = this._checkAttributes(newnode, oldnode)) {
								if (this.hasSoftSiblings && this._hasSoftChildren(newnode) && this._hasSoftChildren(oldnode)) {
									if (this._validateSoftChildren(newnode, oldnode)) {
										this._updateSoftChildren(newnode, oldnode);
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
				case Node.TEXT_NODE:
					/*
					* Trimming is needed because serverside scripting      
					* may spontaneously insert whitespace text. oh Lord.
					*/
					if (newnode.data.trim() != oldnode.data.trim()) {
						result = false;
					}
					break;
			}
		}

		// when in doubt, the default action is to simply replace...
		if (result == false && !isSoftUpdate && !isPluginUpdate) {
			if (id != null && element != null) {
				this.addUpdate(
					new ReplaceUpdate(id, element)
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
	_checkAttributes: function (newnode, oldnode) {

		var result = true;
		var changed = false;

		var atts1 = newnode.attributes;
		var atts2 = oldnode.attributes;

		if (atts1.length != atts2.length) {
			changed = true;
		} else {
			changed = !Array.every(atts1, function (att1, i) {
				var att2 = atts2.item(i);
				return att1.nodeName == att2.nodeName && att1.nodeValue == att2.nodeValue;
			});
		}
		if (changed) {
			var newid = newnode.getAttribute("id");
			var oldid = oldnode.getAttribute("id");
			if (this.hasSoftAttributes && newid != null && newid == oldid) {
				this.addUpdate(
					new AttributesUpdate(oldid, newnode, oldnode)
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
	_hasSoftChildren: function (element) {

		var result = true;
		if (element.hasChildNodes()) {
			result = Array.every(element.childNodes, function (node) {
				var res = true;
				switch (node.nodeType) {
					case Node.TEXT_NODE:
						res = !/[^\t\n\r ]/.test(node.nodeValue);
						break;
					case Node.ELEMENT_NODE:
						res = node.getAttribute("id") != null;
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
	_validateSoftChildren: function (newnode, oldnode) {

		var result = true;
		var prevold = -1;
		var prevnew = -1;
		var newindex = -1;

		var news = this._toMap(newnode.childNodes, true);
		var olds = this._toMap(oldnode.childNodes, true);

		for (var id in olds) {
			if (result) {
				var oldindex = olds[id];
				result = oldindex >= prevold;
				if (news[id] != null) {
					newindex = news[id];
					result = newindex >= prevnew;
				}
			}
			prevold = oldindex;
			if (newindex > -1) {
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
	_updateSoftChildren: function (newnode, oldnode) {

		var news = this._toMap(newnode.childNodes);
		var olds = this._toMap(oldnode.childNodes);

		for (var id in olds) {
			if (news[id] == null) {
				this.addUpdate(
					new SiblingUpdate(Update.TYPE_REMOVE, id, null, null)
				);
			} else {
				this._crawl(news[id], olds[id]); // crawling continued here!
			}
		}
		var previd = null;
		for (id in news) {
			if (olds[id] == null) {
				var xmlelement = news[id];
				if (previd == null) { // TODO: refactor this tedious fork
					var parentid = oldnode.getAttribute("id");
					this.addUpdate(
						new SiblingUpdate(Update.TYPE_INSERT, parentid, xmlelement, true)
					);
				} else {
					this.addUpdate(
						new SiblingUpdate(Update.TYPE_INSERT, previd, xmlelement, false)
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
	addUpdate: function (update) {

		this._updates.push(update);
		if (update instanceof ReplaceUpdate) {
			this._replaced[update.id] = true;
		}
	},

	/**
	* @param {Element} element
	* @param {Element} oldelement
	* @return {object}
	*/
	_getPlugin: function (element, oldelement) {

		var result = null;
		this.plugins.every(function (plugin) {
			if (plugin.handleElement(element, oldelement)) {
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
	_toMap: function (nodes, isIndex) {

		var result = {};
		Array.forEach(nodes, function (node, index) {
			if (node.nodeType == Node.ELEMENT_NODE) {
				result[node.getAttribute("id")] = isIndex ? index : node;
			}
		});
		return result;
	},

	/**
	* Harvest form elements.
	* @param {HTMLFormElement} form
	* @return {string}
	*/
	_getPost: function (form) {

		var result = new String("");

		if (form != null) {
			var last = "";
			Array.forEach(form.elements, function (element) {

				if (element.name == null || element.name == "") return;

				var name = element.name;
				var value = encodeURIComponent(element.value);

				switch (element.type) {

					case "button":
					case "submit":
						var active = UpdateAssistant.getActiveElement();
						if (element == active && name != "") {
							result += name + "=" + value + "&";
						}
						break;

					case "radio":
						if (element.checked) {
							result += name + "=" + value + "&";
						}
						break;

					case "checkbox":
						if (element.checked) {
							if (element.name == last) {
								if (result.lastIndexOf("&") == result.length - 1) {
									result = result.substr(0, result.length - 1);
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
					case "select-one":
						result += name + "=" + value + "&";
						break;
				}
			});
		}

		return result.substr(0, result.length - 1);
	},

	/**
	* Post form data and parse document response.
	* @param {HTMLFormElement} form
	*/
	_postRequest: function (form) {

		// collect post data
		var method = form.method != "" ? form.method : "get";
		var action = form.action != "" ? form.action : window.location.toString();
		var format = this._getPost(form);

		if (method == "get") {
			if (action.indexOf("?") > -1) {
				action = action + "&" + format;
			} else {
				action + "?" + format;
			}
		}

		// invoke request
		var _this = this;
		var request = UpdateAssistant.getXMLHttpRequest(method, action, this);
		if (method == "post") {
			request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
		}

		request.send(method == "post" ? format : null);
	},

	/**
	* ASP.NET requires viewstate and eventvalidation to be updated on each  
	* page update, even though they may not be placed inside an updatezone.
	* @param {Document} dom  
	* @param {string} id
	*/
	_fixdotnet: function (dom, id) {

		var input = document.getElementById(id);
		if (input != null) {
			var nextinput = UpdateAssistant.getElementById(dom, id);
			if (nextinput != null) {
				var value = nextinput.getAttribute("value");
				if (value !== input.value) {
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
	debug: function (out) {

		if (this.isDebugging) {
			alert("UpdateManager dysfunction. \n\n" + out);
		}
	},

	/** 
	* Debug something that went wrong. You can tap into  
	* the dispatched DOM event in order to handle the error.
	* @param {string} out
	*/
	error: function (out) {

		this.errorsmessage = out;
		UpdateAssistant.dispatchEvent(document.documentElement, UpdateManager.EVENT_ERRORUPDATE);
		this.debug(out);
	},

	/**
	* Append update info to the "summary" property.  
	* @param {string} string This should be a one-liner.
	*/
	report: function (string) {

		this.summary += string + "\n";
	}
};

/*
 * The single working instance is declared here. Notice no _underscore!
 */
var UpdateManager = new _UpdateManager ();