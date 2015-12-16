ExplorerMenuBinding.prototype = new Binding;
ExplorerMenuBinding.prototype.constructor = ExplorerMenuBinding;
ExplorerMenuBinding.superclass = Binding.prototype;
ExplorerMenuBinding.ACTION_SELECTIONCHANGED = "explorermenu selectionchanged";

ExplorerMenuBinding.SCROLLUP_CLASSNAME = "scrollup";
ExplorerMenuBinding.SCROLLDOWN_CLASSNAME = "scrolldown";

/**
 * @class
 */
function ExplorerMenuBinding() {

	/**
	 * @type {SystemLogger}
	 */
	this.logger = SystemLogger.getLogger("ExplorerMenuBinding");

	/**
	 * Associating buttons to handles.
	 * @type {Map<string><ToolBarButtonBinding>}
	 */
	this._buttons = new Map();

	/**
	 * @type {List<ToolBarButtonBinding}
	 */
	this._list = new List();

	/**
	 * @type {int}
	 */
	this._index = -1;

	/**
	 * The small toolbargroup
	 * @type {ToolBarGroupBinding}
	 */
	this._group = null;

	/**
	 * @type {string}
	 */
	this._selectedHandle = null;

	/**
	 * @type {string}
	 */
	this._selectedTag = null;

}

/**
 * Identifies binding.
 */
ExplorerMenuBinding.prototype.toString = function () {

	return "[ExplorerMenuBinding]";
}

/**
 * @overloads {Binding#onBindingRegister}
 */
ExplorerMenuBinding.prototype.onBindingRegister = function () {

	ExplorerMenuBinding.superclass.onBindingRegister.call(this);
	this.addActionListener(RadioGroupBinding.ACTION_SELECTIONCHANGED, this);
	this.subscribe(this.bindingWindow.WindowManager.WINDOW_RESIZED_BROADCAST);
	this.addEventListener(DOMEvents.SCROLL);
}

/**
 * @overloads {Binding#onBindingAttach}
 */
ExplorerMenuBinding.prototype.onBindingAttach = function () {

	ExplorerMenuBinding.superclass.onBindingAttach.call(this);
	this.addMember ( this.getChildBindingByLocalName ( "explorertoolbar" ));
}

/**
 * @overloads {Binding#onMemberInitialize}
 * @param {Binding} binding
 */
ExplorerMenuBinding.prototype.onMemberInitialize = function (binding) {

	switch (binding.constructor) {
		case ExplorerToolBarBinding:
			this._group = binding.getToolBarGroupByIndex(0);
			break;
	}
	ExplorerMenuBinding.superclass.onMemberInitialize.call(this, binding);
}

/**
 * Mount viewDefinition, building menu items.
 * @param {SystemViewDefinition} definition
 */
ExplorerMenuBinding.prototype.mountDefinition = function (definition) {

	this._buttons.set(definition.handle, this._mountMinButton(definition));
	this._index++;
}

/**
 * get buttons.
 * @return Map<string><ToolBarButtonBinding>
 */
ExplorerMenuBinding.prototype.getButtons = function () {

	return this._buttons;
}

/**
 * Building small menubutton.
 * @param {SystemViewDefinition} definition
 * @return {ExplorerToolBarButtonBinding}
 */
ExplorerMenuBinding.prototype._mountMinButton = function (definition) {

	var button = ExplorerToolBarButtonBinding.newInstance(
			this.bindingDocument,
			ExplorerToolBarButtonBinding.TYPE_NORMAL
	);
	button.setLabel(definition.label);
	button.setToolTip(definition.label); // use label as tooltip
	button.handle = definition.handle;
	button.node = definition.node;
	this._group.add(button);
	this._list.add(button);
	button.attach();
	return button;
}

/**
 * Fires when selection changes in either one of the menus.
 * @implements {IActionListener}
 * @overloads {Binding#handleAction}
 * @param {Action} action
 */
ExplorerMenuBinding.prototype.handleAction = function (action) {

	ExplorerMenuBinding.superclass.handleAction.call(this, action);

	switch (action.type) {
		case RadioGroupBinding.ACTION_SELECTIONCHANGED:

			this.collapse();
			var radioGroupBinding = action.target;
			var buttonBinding = radioGroupBinding.getCheckedButtonBinding();
			var handle = buttonBinding.handle;
			
			this._selectedHandle = handle;
			this._selectedTag = buttonBinding.node.getTag();
			this.dispatchAction ( ExplorerMenuBinding.ACTION_SELECTIONCHANGED );

			action.consume();
			break;
	}
}

/**
 * @implements {IEventHandler}
 * @overloads {Binding#handleEvent}
 * @param {MouseEvent} e
 */
ExplorerMenuBinding.prototype.handleEvent = function (e) {

	ExplorerMenuBinding.superclass.handleEvent.call(this, e);

	switch (e.type) {

		case DOMEvents.SCROLL:
			this.updateScroll();
			break;
	}
}

/**
 * @implements {IBroadcastListener}
 * @param {string} broadcast
 * @param {object} arg
 */
ExplorerMenuBinding.prototype.handleBroadcast = function (broadcast, arg) {

	ExplorerMenuBinding.superclass.handleBroadcast.call(this, broadcast, arg);

	switch (broadcast) {
		case this.bindingWindow.WindowManager.WINDOW_RESIZED_BROADCAST:
			this.collapse();
			this.updateScroll();
			break;
	}
}


/**
 * Set selection by handle.
 * @param {string} handle
 */
ExplorerMenuBinding.prototype.setSelectionByHandle = function (handle) {

	var buttonBinding = this._buttons.get(handle);

	if (buttonBinding) {
		buttonBinding.check();
	} else {
		this.setSelectionDefault();
	}
}

/**
 * Get handle on selected viewDefinition.
 * @return {string}
 */
ExplorerMenuBinding.prototype.getSelectionHandle = function () {

	return this._selectedHandle;
}

/**
 * Get tag on selected viewDefinition (or the SystemNode associated to it).
 * @return {string}
 */
ExplorerMenuBinding.prototype.getSelectionTag = function () {

	return this._selectedTag;
}

/**
 * Selecting first button by default.
 */
ExplorerMenuBinding.prototype.setSelectionDefault = function () {

	if (this._list.hasEntries()) {
		this._list.getFirst().check();
	}
}


/**
 * Toogle explorer
 */
ExplorerMenuBinding.prototype.toggle = function () {
	if (top.app.bindingMap.app.hasClassName("exploler-expanded")) {
		this.collapse();
	} else {
		this.expand();
	}
}

/**
 * Collapse explorer
 */
ExplorerMenuBinding.prototype.collapse = function () {
	top.app.bindingMap.app.detachClassName("exploler-expanded");
	top.app.bindingMap.menutogglebutton.setImage("${icon:menu}");

}


/**
 * Expand explorer
 */
ExplorerMenuBinding.prototype.expand = function () {
	top.app.bindingMap.app.attachClassName("exploler-expanded");
	top.app.bindingMap.menutogglebutton.setImage("${icon:arrow-left}");
}

/**
 * Toogle explorer
 */
ExplorerMenuBinding.prototype.updateScroll = function () {
	var scrollTop = this.bindingElement.scrollTop;
	var scrollHeight = this.bindingElement.scrollHeight;
	var clientHeight = this.bindingElement.clientHeight;
	if (scrollTop === 0){
		ExplorerBinding.bindingInstance.detachClassName(ExplorerMenuBinding.SCROLLUP_CLASSNAME);
	} else {
		ExplorerBinding.bindingInstance.attachClassName(ExplorerMenuBinding.SCROLLUP_CLASSNAME);
	}

	if (scrollTop + clientHeight < scrollHeight) {
		this.attachClassName(ExplorerMenuBinding.SCROLLDOWN_CLASSNAME);
	} else {
		this.detachClassName(ExplorerMenuBinding.SCROLLDOWN_CLASSNAME);
	}

}
