ResxEditorPageBinding.prototype = new PageBinding;
ResxEditorPageBinding.prototype.constructor = ResxEditorPageBinding;
ResxEditorPageBinding.superclass = PageBinding.prototype;


ResxEditorPageBinding.UPDATE_MESSAGE = "update resx editor page";

/**
 * @class
 * ResxEditorPageBinding.
 * @param {DOMElement} bindingElement
 */
function ResxEditorPageBinding() {

	/**
	 * @type {SystemLogger}
	 */
	this.logger = SystemLogger.getLogger("ResxEditorPageBinding");

	/*
	 * Return this.
	 */
	return this;
}

/**
 * Identifies binding.
 */
ResxEditorPageBinding.prototype.toString = function () {

	return "[ResxEditorPageBinding]";
}

/**
 * @overloads {Binding#onBindingRegister}
 */
ResxEditorPageBinding.prototype.onBindingRegister = function () {

	ResxEditorPageBinding.superclass.onBindingRegister.call(this);
}

/**
 * Overloads {Binding#onBindingAttach}
 */
ResxEditorPageBinding.prototype.onBindingAttach = function () {

	ResxEditorPageBinding.superclass.onBindingAttach.call(this);

	DOMEvents.addEventListener(this.bindingDocument.documentElement, UpdateManager.EVENT_AFTERUPDATE, this);

	this.subscribe(ResxEditorPageBinding.UPDATE_MESSAGE);


	if (!this.shadowTree.inputconsoleid) {
		var input = DOMUtil.createElementNS(
			Constants.NS_XHTML, "input", this.bindingDocument
		);
		input.type = "hidden";
		input.name = "__CONSOLEID";
		input.value = Application.CONSOLE_ID;
		this.shadowTree.inputconsoleid = input;
		this.bindingElement.appendChild(input);
	}
}

/**
 * @implements {IEventListener}
 * @overloads {Binding#handleEvent}
 * @param {MouseEvent} e
 */
ResxEditorPageBinding.prototype.handleEvent = function (e) {

	ResxEditorPageBinding.superclass.handleEvent.call(this, e);

	var target = e.currentTarget ? e.currentTarget : DOMEvents.getTarget(e);

	switch (e.type) {

		case UpdateManager.EVENT_AFTERUPDATE:
			if (target === this.bindingDocument.documentElement) {
				MessageQueue.update();
			}
			break;
	}
}

/**
 * Implements {IBroadcastListener}
 * @param {string} broadcast
 * @param {object} arg
 */
ResxEditorPageBinding.prototype.handleBroadcast = function (broadcast, arg) {

	ResxEditorPageBinding.superclass.handleBroadcast.call(this, broadcast, arg);

	switch (broadcast) {

		case ResxEditorPageBinding.UPDATE_MESSAGE:
			if (!arg || this.getProperty("page-id") == arg) {
				if (this._canPostBack) {
					var callbackid = "UPDATE";
					var callbackarg = "";
					this.bindingWindow.__doPostBack(callbackid, callbackarg);
				}
			}
			break;
	}
}