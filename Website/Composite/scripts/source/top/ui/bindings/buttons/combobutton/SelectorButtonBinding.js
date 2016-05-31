SelectorButtonBinding.prototype = new SelectorBinding;
SelectorButtonBinding.prototype.constructor = SelectorButtonBinding;
SelectorButtonBinding.superclass = SelectorBinding.prototype;

/**
* @class
*/
function SelectorButtonBinding() {

	/**
	* @type {SystemLogger}
	*/
	this.logger = SystemLogger.getLogger("SelectorButtonBinding");

	this.isSingle = false;

	/*
	* Returnable.
	*/
	return this;
}

/**
* Identifies binding.
*/
SelectorButtonBinding.prototype.toString = function () {

	return "[SelectorButtonBinding]";
}

/**
* @overloads {ToolBarButtonBinding#onBindingAttach}
*/
SelectorButtonBinding.prototype.onBindingAttach = function () {

	SelectorButtonBinding.superclass.onBindingAttach.call(this);

	this.isSearchSelectionEnabled = false;
};

/**
* @overloads {SelectorBinding#handleBroadcast}
* @param {string} broadcast
* @param {object} arg
*/
SelectorButtonBinding.prototype.handleBroadcast = function (broadcast, arg) {

	SelectorButtonBinding.superclass.handleBroadcast.call(this, broadcast, arg);
}


/**
 * @implements {IActionListener}
 * @overloads {Binding#handleAction}
 * @param {Action} action
 */
SelectorButtonBinding.prototype.handleAction = function (action) {

	if (action.type === ButtonBinding.ACTION_COMMAND && this.isSingle) {
		this.onValueChange();
	} else {
		SelectorButtonBinding.superclass.handleAction.call(this, action);
	}
}

SelectorButtonBinding.prototype.dirty = function () { }


SelectorButtonBinding.prototype.populateFromList = function (list) {

	var singleunselected = null;
	list.each(function (item) {
		if (!item.isSelected ) {
			if (singleunselected == null) {
				singleunselected = item;
			} else {
				singleunselected = null;
				return false;
			}
		}
		return true;
	}, this);

	if (singleunselected != null) {
		this.isSingle = true;
		this._buttonBinding.setLabel(singleunselected.label);
		this._selectionValue = singleunselected.value;
		this._selectionLabel = singleunselected.label;
		this._buttonBinding.setPopup();
		this.setProperty("single", true);
	} else {
		this.isSingle = false;
		this._buttonBinding.setPopup(this._popupBinding);
		this.deleteProperty("single");
		SelectorButtonBinding.superclass.populateFromList.call(this, list);
	}
}

SelectorButtonBinding.prototype.clear = function (isClearAll) {

	SelectorButtonBinding.superclass.clear.call(this, isClearAll);
	this.isSingle = false;
}