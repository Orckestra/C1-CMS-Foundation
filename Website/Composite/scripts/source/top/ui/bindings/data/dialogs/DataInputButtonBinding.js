DataInputButtonBinding.prototype = new DataInputBinding;
DataInputButtonBinding.prototype.constructor = DataInputButtonBinding;
DataInputButtonBinding.superclass = DataInputBinding.prototype;

/**
* @class
* @implements {IData}
*/
function DataInputButtonBinding() {

	/**
	* @type {SystemLogger}
	*/
	this.logger = SystemLogger.getLogger("DataInputButtonBinding");

	/**
	* @type {ToolBarButtonBinding}
	*/
	this._dialogButtonBinding = null;
}

/**
* Identifies binding.
*/
DataInputButtonBinding.prototype.toString = function () {

	return "[DataInputButtonBinding]";
}

/**
* @overloads {DataInputBinding#onBindingAttach}
*/
DataInputButtonBinding.prototype.onBindingAttach = function () {
	DataInputButtonBinding.superclass.onBindingAttach.call(this);

	if (this.hasCallBackID()) {
		Binding.dotnetify(this);
	}

}

/**
* Build button, build popup and populate by selection elements.
* @overloads {DataInputBinding#_buildDOMContent}
*/
DataInputButtonBinding.prototype._buildDOMContent = function () {

	DataInputSelectorBinding.superclass._buildDOMContent.call(this);
	this.buildButton();
}

/**
* Build button.
*/
DataInputButtonBinding.prototype.buildButton = function () {

	var button = ToolBarButtonBinding.newInstance(this.bindingDocument);
	var image = this.getProperty("image");
	if (image != null) {
		button.setImage(image);
	} else {
		button.setImage("${icon:popup}");
	}
	this.addFirst(button);
	button.attach();

	var self = this;

	button.oncommand = function () {
		self.dispatchAction(PageBinding.ACTION_DOPOSTBACK);
	}

	this._dialogButtonBinding = button;
};

/**
* Invoke dialog programatically.
*/
DataInputButtonBinding.prototype.oncommand = function () {

	var button = this._dialogButtonBinding;
	if (button != null) {
		button.oncommand();
	}
};
