ImageInputDialogBinding.prototype = new DataInputBinding;
ImageInputDialogBinding.prototype.constructor = ImageInputDialogBinding;
ImageInputDialogBinding.superclass = DataInputBinding.prototype;

ImageInputDialogBinding.IMAGE_SELECTED = "image input image selected";

/**
* @class
* @implements {IData}
*/
function ImageInputDialogBinding() {

	/**
	* @type {SystemLogger}
	*/
	this.logger = SystemLogger.getLogger("ImageInputDialogBinding");

	/**
	* ViewDefinition handle.
	* @type {string}
	*/
	this.handle = "Composite.Management.ImageSelectorDialog";

	/**
	* @type {ToolBarButtonBinding}
	*/
	this._dialogButtonBinding = null;

	/**
	* Used to hack the input: No validation when while button is handled.
	* @type {boolean}
	*/
	this._isButtonClicked = false;

	/**
	* Used for saving value in readonly mode.
	* @type {string}
	*/
	this.value = null;
}

/**
* Identifies binding.
*/
ImageInputDialogBinding.prototype.toString = function () {

	return "[ImageInputDialogBinding]";
}

/**
* Build button, build popup and populate by selection elements.
* @overloads {DataInputBinding#_buildDOMContent}
*/
ImageInputDialogBinding.prototype._buildDOMContent = function () {

	DataInputSelectorBinding.superclass._buildDOMContent.call(this);
	this.buildButton();

	var self = this;
	DOMEvents.addEventListener(this.shadowTree.input, DOMEvents.DOUBLECLICK, {
		handleEvent: function (e) {
			self.setReadOnly(false);
			self.focus();
		}
	});
}

/**
* Build button.
*/
ImageInputDialogBinding.prototype.buildButton = function () {

	var button = ToolBarButtonBinding.newInstance(this.bindingDocument);
	button.setImage("${icon:popup}");
	this.addFirst(button);
	button.attach();

	var self = this;

	button.oncommand = function () {

		self._isButtonClicked = true;
		setTimeout(function () {
			self._isButtonClicked = false;
		}, 1000);

		var definition = ViewDefinitions[self.handle];

		if (definition instanceof DialogViewDefinition) {

			definition.handler = {
				handleDialogResponse: function (response, result) {
					self._isButtonClicked = false;
					if (response == Dialog.RESPONSE_ACCEPT) {

						self.logger.debug("Usecase scenario was hardcoded into ImageInputDialogBinding#buildButton");
						var value = result.getFirst();
						self.setValue(value); // SETUP SPECIFIC - THIS MAY NOT BE SO!!!!
						self.validate(true);

						self.dispatchAction(ImageInputDialogBinding.IMAGE_SELECTED);
					}
					self.focus();
				}
			}
			definition.argument.selectedResult = self.getValue(); // TODO!
			StageBinding.presentViewDefinition(definition);

		} else {
			throw "Definition was either undefine or of a non-dialog type.";
		}
	}

	DOMEvents.addEventListener(button.getBindingElement(), DOMEvents.MOUSEDOWN, {
		handleEvent: function (e) {
			self._isButtonClicked = true;
		}
	});

	this._dialogButtonBinding = button;
};

/**
* Invoke dialog programatically.
*/
ImageInputDialogBinding.prototype.oncommand = function () {

	var button = this._dialogButtonBinding;
	if (button != null) {
		button.oncommand();
	}
};

/**
* OnBlur event
* @overloads {DataInputBinding#onblur}
*/
ImageInputDialogBinding.prototype.onblur = function () {

	ImageInputDialogBinding.superclass.onblur.call(this);
	this.dispatchAction(ImageInputDialogBinding.IMAGE_SELECTED);
}

/**
* Hack to circumvent validation while dialog is handled.
* @param {boolean} arg
* @overloads {DataInputBinding#validate}
*/
ImageInputDialogBinding.prototype.validate = function (arg) {

	var result = true;
	if (this._isButtonClicked == true) {
		this._isButtonClicked = false;
	} else {
		result = ImageInputDialogBinding.superclass.validate.call(this, arg);
	}
	return result;
};


/**
* Set value.
* @param {String} value
* @overloads {DataInputBinding#setValue}
*/
ImageInputDialogBinding.prototype.setValue = function (value) {

	if (this.isReadOnly) {
		this.value = value;
		this.shadowTree.input.value = TreeService.GetMediaLabel(value);
	} else {
		ImageInputDialogBinding.superclass.setValue.call(this, value);
	}
}

/**
* Get value.
* @overloads {DataInputBinding#getValue}
* @return {string}
*/
ImageInputDialogBinding.prototype.getValue = function () {

	if (this.isReadOnly) {
		result = this.value;
	} else {
		result = ImageInputDialogBinding.superclass.getValue.call(this);
	}
	return result;
}

/**
* @param {boolean} isReadOnly
* @overloads {DataInputBinding#setReadOnly}
*/
ImageInputDialogBinding.prototype.setReadOnly = function (isReadOnly) {
	var oldIsReadOnly = this.isReadOnly;
	ImageInputDialogBinding.superclass.setReadOnly.call(this, isReadOnly);

	if (oldIsReadOnly == true && isReadOnly == false) {
		ImageInputDialogBinding.superclass.setValue.call(this, this.value);
	}
	if (oldIsReadOnly == false && isReadOnly == true) {
		this.value = ImageInputDialogBinding.superclass.getValue.call(this)
		this.shadowTree.input.value = TreeService.GetMediaLabel(this.value);
	}
}