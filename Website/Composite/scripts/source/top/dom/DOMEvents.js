/**
 * @class
 * Gateway for common DOM event management, emulating
 * DOM2 EventListener interface for Internet Explorer
 */
function _DOMEvents() { }

_DOMEvents.prototype = {
	_logger: SystemLogger.getLogger("DOMEvents"),

	/*
	* In order to avoid spelling mistakes, please use these constants.
	*/
	MOUSEDOWN: "mousedown",
	MOUSEUP: "mouseup",
	MOUSEOVER: "mouseover",
	MOUSEOUT: "mouseout",
	MOUSEMOVE: "mousemove",
	CLICK: "click",
	DOUBLECLICK: "dblclick",
	KEYPRESS: "keypress",
	KEYDOWN: "keydown",
	KEYUP: "keyup",
	CONTEXTMENU: "contextmenu",
	SCROLL: "scroll",
	LOAD: "load",
	BEFOREUNLOAD: "beforeunload",
	UNLOAD: "unload",
	RESIZE: "resize",
	FOCUS: "focus",
	BLUR: "blur",
	SUBMIT: "submit",
	CUT: "cut",
	COPY: "copy",
	PASTE: "paste",
	DOM: "DOMContentLoaded",
	DRAGOVER: "dragover",
	DROP: "drop",
	WHEEL: "wheel",
	HASHCHANGE: "hashchange",

	TOUCHSTART: "touchstart",
	TOUCHEND: "touchend",
	TOUCHMOVE: "touchmove",

	/*
	* Explorer specific events. Note that "mouseenter" and
	* "mouseleave" pseudosupport has been hacked into Mozilla.
	*/
	ACTIVATE: "activate",
	DEACTIVATE: "deactivate",
	MOUSEENTER: "mouseenter",
	MOUSELEAVE: "mouseleave",
	SELECTSTART: "selectstart",
	FOCUSIN: "focusin",
	FOCUSOUT: "focusout",
	HELP: "help",

	/*
	* These are Explorer native, but can be emulated in Mozilla.
	*/
	BEFOREUPDATE: "beforeupdate",
	AFTERUPDATE: "afterupdate",
	ERRORUPDATE: "errorupdate",

	/*
	* Tracking event listeners attached.
	*/
	_count: 0,

	/**
	* Add event Listener.
	* @param {DOMElement} target
	* @param {string} event
	* @param {IEventListener} handler
	* @param {boolean} isReverse Don't use this Mozilla-only flag!
	*/
	addEventListener: function (target, event, handler, isReverse) {

		this._count++;

		this._eventListener(
			true,
			target,
			event,
			handler,
			isReverse
		);
	},

	/**
	* Remove event listener.
	* @param {DOMElement} target
	* @param {string} event
	* @param {IEventListener} handler
	* @param {boolean} isReverse
	*/
	removeEventListener: function (target, event, handler, isReverse) {

		this._count--;

		this._eventListener(
			false,
			target,
			event,
			handler,
			isReverse
		);
	},

	/**
	* @param {Event} e
	* @return {DOMElement}
	*/
	getTarget: function (e) {

		return e ? (e.target ? e.target : e.srcElement) : null;
	},

	/**
	* Stop event propagation.
	* @param {Event} e
	*/
	stopPropagation: function (e) {

		try {
			if (e.stopPropagation != null) {
				e.stopPropagation();
			} else {
				e.cancelBubble = true;
			}
		} catch (exception) {
			/*
			* May happen in explorer if the event window has been unloaded.
			*/
			if (Application.isDeveloperMode == true) {
				this._logger.error(exception);
			}
		}
	},

	/**
	* Prevent event default.
	* @param {Event} e
	*/
	preventDefault: function (e) {

		try {
			if (e.preventDefault) {
				e.preventDefault();
			} else {
				e.returnValue = false;
			}
		} catch (exception) {
			/*
			* May happen in explorer if the event window has been unloaded.
			*/
			if (Application.isDeveloperMode == true) {
				this._logger.error(exception);
			}
		}
	},

	/**
	* Was it a right click? Can never remember the "2" involved here...
	* @param {MouseEvent} e
	*/
	isRightButton: function (e) {

		return e.button == 2 ? true : false;
	},

	/**
	* @param {MouseEvent} e
	*/
	isButtonPressed: function (e) {
		if ((Client.isFirefox || Client.isExplorer11) && e.buttons === 0)
			return false;
		else if (Client.isWebKit && e.which === 0)
			return false;
		return undefined;
	},

	/**
	* @param {IEventListener} handler
	*/
	cleanupEventListeners: function (handler) {

		this._deleteWrappedHandler(handler);
	},

	/**
	* Not recommended ( mozilla only).
	* @param {Event} e
	*/
	isCurrentTarget: function (e) {

		var result = false;
		if (Client.isMozilla == true) {
			result = e.target == e.currentTarget;
		}
		return true;
	},

	// PRIVATE FUNCTIONS ......................................................

	/**
	* Is node child of parent? Used to emulate
	* IE native "mouseenter" and "mouseleave".
	* TODO: Move to DOMUtil?
	* @param {DOMElement} parent
	* @param {DOMElement} child
	* @return {boolean}
	*/
	_isChildOf: function (parent, child) {

		var result = true;
		if (parent == child) {
			result = false;
		}
		if (result == true) {
			while (child != null && child.nodeType != Node.DOCUMENT_NODE && child != parent) {
				child = child.parentNode;
			}
			result = (child == parent);
		}
		return result;
	},

	/**
	* @param {boolean} isAdd
	* @param {DOMElement} target
	* @param {string} event
	* @param {IEventListener} handler
	* @param {function} caller
	*/
	_eventListener: function (isAdd, target, event, handler, isReverse, caller) {

		if (Interfaces.isImplemented(IEventListener, handler, true)) {
			if (typeof event != Types.UNDEFINED) {
				var action = this._getAction(isAdd);
				if (target[action]) {
					if (Client.isPad && event == DOMEvents.DOUBLECLICK) {
						if (isAdd) {
							var lastTouch = null;
							var doubletaphandler = {
								handleEvent: function (e) {
									var now = new Date().getTime();
									if (lastTouch && now - lastTouch < 500) {
										DOMEvents.stopPropagation(e); //?
										DOMEvents.preventDefault(e); //?
										var newevent = new MouseEvent(DOMEvents.DOUBLECLICK, e);
										handler.handleEvent(newevent);
										lastTouch = null;
										return;
									}
									lastTouch = now;
								}
							}
							target[action](DOMEvents.TOUCHSTART, doubletaphandler, isReverse ? true : false);
						}
					} else if (Client.isExplorer || Client.isExplorer11) {
						switch (event) {
							case DOMEvents.MOUSEDOWN:
							case DOMEvents.MOUSEUP:
							case DOMEvents.MOUSEOVER:
							case DOMEvents.MOUSEOUT:
							case DOMEvents.MOUSEMOVE:
								handler = this._getWrappedHandler(target, event, handler, caller);
								target[action](event, handler, false);
								break;
							default:
								target[action](event, handler, false);
								break;
						}
					} else {
						switch (event) {
							/*
							* Note that the "mouseenter" and "mouseleave" events are
							* registered in Mozilla as "mouseover" and "mouseout"
							* event though the IE native behavior is emulated. This
							* implies that you have to listen for both "mouseover"
							* and "mouseenter" event event though only the latter was added!
							*/
							case DOMEvents.MOUSEENTER:
							case DOMEvents.MOUSELEAVE:
								event = event == DOMEvents.MOUSEENTER ? DOMEvents.MOUSEOVER : DOMEvents.MOUSEOUT;
								target[action](event, {
									handleEvent: function (e) {
										var rel = e.relatedTarget;
										if (e.currentTarget == rel || DOMEvents._isChildOf(e.currentTarget, rel)) { }
										else {
											handler.handleEvent(e);
										}
									}
								}, isReverse ? true : false);
								break;
							default:
								target[action](event, handler, isReverse ? true : false);
								break;
						}
					}
				}
			} else {
				throw "No such event allowed!";
			}
		}
	},

	/**
	* Get that action.
	* @param {boolean} isAdd
	* @return {string}
	*/
	_getAction: function (isAdd) {

		var result = null;
		switch (isAdd) {
			case true:
				result = "addEventListener";
				break;
			case false:
				result = "removeEventListener";
				break;
		}
		return result;
	},

	// EXPLORER SPECIFIC ...............................................

	/**
	* Explorer expects functions, not objects, as event handlers.
	* This fellow will return a function which in turn invokes the
	* designated method <code>handleEvent</code> on the object.
	* The error handling is especially elaborate around here.
	* @param {DOMElement} target
	* @param {string} event
	* @param {IEventListener} handler
	* @param {function} caller
	* @return {function}
	*/
	_getWrappedHandler: function (target, event, handler, caller) {

		var result = null;
		try {
			if (!handler._domEventHandlers) {
				handler._domEventHandlers = {};
			}
			if (!handler._domEventHandlers[target]) {
				handler._domEventHandlers[target] = {};
			}
			if (!handler._domEventHandlers[target][event]) {
				var win = target.nodeType ? DOMUtil.getParentWindow(target) : target;
				if (win) {
					handler._domEventHandlers[target][event] = function (e) {
						if (win.event != null && handler != null) {
							handler.handleEvent(win.event);
						} else if (handler != null) {
							handler.handleEvent(e);
						}
					}
				}
			}
			result = handler._domEventHandlers[target][event];
		} catch (exception) {
			this._report(target, event, handler, caller);
		}

		return result;
	},

	_deleteWrappedHandler: function (handler) {

		for (var target in handler._domEventHandlers) {
			if (target) {
				for (var event in handler._domEventHandlers[target]) {
					if (event) {
						delete handler._domEventHandlers[target][event];
					}
				}
			}
			delete handler._domEventHandlers[target];
		}
	},

	/**
	* Patching Explorers miserable error repporting.
	* @param {DOMElement} target
	* @param {string} event
	* @param {IEventListener} handler
	* @param {function} caller
	*/
	_report: function (target, event, handler, caller) {

		alert(
			"DOMEvents.getWrappedHandler malfunction.\n\n" +
			"\ttarget: " + (target ? target.nodeName : target) + "\n" +
			"\tevent: " + event + "\n" +
			"\thandler: " + handler + "\n\n" +
			"Offending invoker: " + (
				caller.callee ? caller.callee.toString() : caller.constructor
			)
		);
	}

}

/**
 * The instance that does it.
 * @type {_DOMEvents}
 */
var DOMEvents = new _DOMEvents();