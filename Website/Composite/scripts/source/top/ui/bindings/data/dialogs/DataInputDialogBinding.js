DataInputDialogBinding.prototype = new DataInputBinding;
DataInputDialogBinding.prototype.constructor = DataInputDialogBinding;
DataInputDialogBinding.superclass = DataInputBinding.prototype;

/**
 * @class
 * @implements {IData}
 */
function DataInputDialogBinding () {

	/**
	 * @type {SystemLogger}
	 */
	this.logger = SystemLogger.getLogger ( "DataInputDialogBinding" );
	
	/**
	 * ViewDefinition handle.
	 * @type {string}
	 */
	this._handle = null;
	
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
DataInputDialogBinding.prototype.toString = function () {
	
	return "[DataInputDialogBinding]";
}

/**
 * Build button, build popup and populate by selection elements.
 * @overloads {DataInputBinding#_buildDOMContent}
 */
DataInputDialogBinding.prototype._buildDOMContent = function () {
	 
	DataInputSelectorBinding.superclass._buildDOMContent.call ( this );
	this.buildButton ();
}

/**
 * Build button.
 */
DataInputDialogBinding.prototype.buildButton = function () {

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


		var definition = self.getDefinition();

		if (definition instanceof DialogViewDefinition) {

			definition.handler = {
				handleDialogResponse: function (response, result) {
					self._isButtonClicked = false;
					if (response == Dialog.RESPONSE_ACCEPT) {

						self.logger.debug("Usecase scenario was hardcoded into DataInputDialogBinding#buildButton");
						var value = result.getFirst();
						self.setValue(value); // SETUP SPECIFIC - THIS MAY NOT BE SO!!!!
						self.validate(true);
						self.checkDirty();
					}
					self.focus();
				}
			}

			definition.argument.selectedResult = self.getValue();
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
 * Get definition to invoke.
 */
DataInputDialogBinding.prototype.getDefinition = function () {

	var handle = this.getProperty("handle");

	var definition = ViewDefinition.clone(
		handle,
		"Generated.ViewDefinition.Handle." + KeyMaster.getUniqueKey()
	);

	return definition;
};


/**
 * Invoke dialog programatically.
 */
DataInputDialogBinding.prototype.oncommand = function () {
	
	var button = this._dialogButtonBinding;
	if ( button != null ) {
		button.oncommand ();
	}
};

/**
 * Hack to circumvent validation while dialog is handled.
 * @param {boolean} arg
 * @overloads {DataInputBinding#validate}
 */
DataInputDialogBinding.prototype.validate = function ( arg ) {
	
	var result = true;
	if ( this._isButtonClicked == true ) {
		this._isButtonClicked = false;
	} else {
		result = DataInputDialogBinding.superclass.validate.call ( this, arg );
	}
	return result;
};