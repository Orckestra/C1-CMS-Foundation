LinkableInputDialogBinding.prototype = new DataInputDialogBinding;
LinkableInputDialogBinding.prototype.constructor = LinkableInputDialogBinding;
LinkableInputDialogBinding.superclass = DataInputDialogBinding.prototype;

LinkableInputDialogBinding.LINK_SELECTED = "input link selected";

/**
* @class
* @implements {IData}
*/
function LinkableInputDialogBinding() {

	/**
	* @type {SystemLogger}
	*/
	this.logger = SystemLogger.getLogger("LinkableInputDialogBinding");

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
LinkableInputDialogBinding.prototype.toString = function () {

	return "[LinkableInputDialogBinding]";
}

/**
* @overloads {Binding#onBindingRegister}
*/
LinkableInputDialogBinding.prototype.onBindingRegister = function () {

	LinkableInputDialogBinding.superclass.onBindingRegister.call(this);
	this.addActionListener(PageBinding.ACTION_DOPOSTBACK);
};

/**
* Build button, build popup and populate by selection elements.
* @overloads {DataInputBinding#_buildDOMContent}
*/
LinkableInputDialogBinding.prototype._buildDOMContent = function () {

	LinkableInputDialogBinding.superclass._buildDOMContent.call(this);
}



/**
* Build button.
*/
LinkableInputDialogBinding.prototype.buildButtonAndLabel = function () {

	/*
	* Build the label.
	*/
	if (this.shadowTree.labelInput == null) {

		this.shadowTree.labelInput = DOMUtil.createElementNS(Constants.NS_XHTML, "input", this.bindingDocument);
		this.shadowTree.box.appendChild(this.shadowTree.labelInput);
		this.shadowTree.labelInput.style.display = "none";
		this.shadowTree.labelInput.readonly = true;
		

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
		button.bindingElement.style.left = "-24px";
		button.bindingElement.style.width = "24px";
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
LinkableInputDialogBinding.prototype.onblur = function () {

	LinkableInputDialogBinding.superclass.onblur.call(this);
	this.setValue(this.getValue());
}

/**
* Set value.
* @param {String} value
* @overloads {DataInputBinding#setValue}
*/
LinkableInputDialogBinding.prototype.setValue = function (value) {

	LinkableInputDialogBinding.superclass.setValue.call(this, value);

	if (this.shadowTree.labelText == null) {
		this.buildButtonAndLabel();
	}

	this.compositeUrl = new CompositeUrl(value);

	if (this.compositeUrl.isMedia || this.compositeUrl.isPage) {
		var label = TreeService.GetCompositeUrlLabel(value);
		if (label == value) {
			this.setLabel(StringResourceSystemFacade.GetString("Composite.Management", "AspNetUiControl.Selector.BrokenReference"));
		}
		else {
			this.setLabel(TreeService.GetCompositeUrlLabel(value));
		}
	} else {
		this.clearLabel();
	}
	this.dispatchAction(LinkableInputDialogBinding.LINK_SELECTED);
}


/**
* Set Label for input
* @param {String} value
* @overloads {DataInputBinding#setValue}
*/
LinkableInputDialogBinding.prototype.setLabel = function (label) {
	this.setReadOnly(true);
	this.editButtonBinding.show();
	this.shadowTree.input.style.display = "none";
	this.shadowTree.labelInput.style.display = "block";
	this.shadowTree.labelInput.value = label;
}

/**
* Unset Label for input
* @overloads {DataInputBinding#setValue}
*/
LinkableInputDialogBinding.prototype.clearLabel = function () {
	this.setReadOnly(false);
	this.editButtonBinding.hide();
	this.shadowTree.input.style.display = "block";
	this.shadowTree.labelInput.style.display = "none";
}
