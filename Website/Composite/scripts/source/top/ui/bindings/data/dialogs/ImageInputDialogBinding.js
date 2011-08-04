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