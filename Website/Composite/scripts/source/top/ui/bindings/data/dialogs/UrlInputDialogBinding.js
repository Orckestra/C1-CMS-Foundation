UrlInputDialogBinding.prototype = new DataInputDialogBinding;
UrlInputDialogBinding.prototype.constructor = UrlInputDialogBinding;
UrlInputDialogBinding.superclass = DataInputDialogBinding.prototype;

UrlInputDialogBinding.URL_SELECTED = "input link selected";

/**
* @class
* @implements {IData}
*/
function UrlInputDialogBinding() {

	/**
	* @type {SystemLogger}
	*/
	this.logger = SystemLogger.getLogger("UrlInputDialogBinding");

	/**
	* @type {ToolBarButtonBinding}
	*/
	this.editButtonBinding = null;

	/**
	* @type {LabelBinding}
	*/
	this.labelBinding = null;


}

/**
* Identifies binding.
*/
UrlInputDialogBinding.prototype.toString = function () {

	return "[UrlInputDialogBinding]";
}

/**
* @overloads {Binding#onBindingRegister}
*/
UrlInputDialogBinding.prototype.onBindingRegister = function () {

	UrlInputDialogBinding.superclass.onBindingRegister.call(this);
	this.addActionListener(PageBinding.ACTION_DOPOSTBACK);
};

/**
* Build button, build popup and populate by selection elements.
* @overloads {DataInputBinding#_buildDOMContent}
*/
UrlInputDialogBinding.prototype._buildDOMContent = function () {

	UrlInputDialogBinding.superclass._buildDOMContent.call(this);

}



/**
* Build button.
*/
UrlInputDialogBinding.prototype.buildButtonAndLabel = function () {

	/*
	* Build the label.
	*/
	if (this.shadowTree.labelInput == null) {

		this.shadowTree.labelInput = DOMUtil.createElementNS(Constants.NS_XHTML, "input", this.bindingDocument);
		this.shadowTree.box.appendChild(this.shadowTree.labelInput);
		this.shadowTree.labelInput.style.display = "none";
		this.shadowTree.labelInput.readOnly = true;

		var self = this;
		
		DOMEvents.addEventListener(this.shadowTree.labelInput, DOMEvents.DOUBLECLICK, {
			handleEvent: function (e) {
				self.clearLabel();
				self.focus();
			}
		});
	}

	/*
	* Build the edit button.
	*/
	if (this.editButtonBinding == null) {

		var button = ToolBarButtonBinding.newInstance(this.bindingDocument);
		button.setImage("${icon:editor-sourceview}");
		button.bindingElement.style.left = "3px";
		button.bindingElement.style.width = "29px";
		this.addFirst(button);
		button.attach();
		button.hide();

		var self = this;

		button.oncommand = function () {
			self.clearLabel();
			self.focus();
		}

		this.editButtonBinding = button;
	}
};


/**
* OnBlur event
* @overloads {DataInputBinding#onblur}
*/
UrlInputDialogBinding.prototype.onblur = function () {

	UrlInputDialogBinding.superclass.onblur.call(this);
	this.setValue(this.getValue());
}

/**
* Set value.
* @param {String} value
* @overloads {DataInputBinding#setValue}
*/
UrlInputDialogBinding.prototype.setValue = function (value) {

	UrlInputDialogBinding.superclass.setValue.call(this, value);

	if (this.isAttached) {

		this.compositeUrl = new Uri(value);

		if (this.compositeUrl.isMedia || this.compositeUrl.isPage || this.compositeUrl.isInternalUrl) {
			var label = TreeService.GetCompositeUrlLabel(value);
			if (label != value) {
				this.setLabel(label);
			}
		} else {
			this.clearLabel();
		}
		this.dispatchAction(UrlInputDialogBinding.URL_SELECTED);
	}
}


/**
* Set Label for input
* @param {String} value
* @overloads {DataInputBinding#setValue}
*/
UrlInputDialogBinding.prototype.setLabel = function (label) {

	this.buildButtonAndLabel();

	if (this.shadowTree.labelInput) {
		if (label) {
			this.setReadOnly(true);
			this.editButtonBinding.show();
			this.shadowTree.input.style.display = "none";
			this.shadowTree.labelInput.style.display = "block";
			this.shadowTree.labelInput.value = label;
		} else {
			this.setReadOnly(false);
			this.editButtonBinding.hide();
			this.shadowTree.input.style.display = "block";
			this.shadowTree.labelInput.style.display = "none";
		} 
	}
}

/**
* Unset Label for input
*/
UrlInputDialogBinding.prototype.clearLabel = function () {
	this.setLabel();
}

