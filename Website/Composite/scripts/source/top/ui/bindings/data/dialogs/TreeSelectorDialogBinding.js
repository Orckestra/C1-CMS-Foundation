TreeSelectorDialogBinding.prototype = new DataInputDialogBinding;
TreeSelectorDialogBinding.prototype.constructor = TreeSelectorDialogBinding;
TreeSelectorDialogBinding.superclass = DataInputDialogBinding.prototype;

/**
* @class
* @implements {IData}
*/
function TreeSelectorDialogBinding() {

	/**
	* @type {SystemLogger}
	*/
	this.logger = SystemLogger.getLogger("TreeSelectorDialogBinding");

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
TreeSelectorDialogBinding.prototype.toString = function () {

	return "[TreeSelectorDialogBinding]";
}

/**
* @overloads {Binding#onBindingRegister}
*/
TreeSelectorDialogBinding.prototype.onBindingRegister = function () {

	TreeSelectorDialogBinding.superclass.onBindingRegister.call(this);
	//this.addActionListener(PageBinding.ACTION_DOPOSTBACK);
};

/**
* Build button, build popup and populate by selection elements.
* @overloads {DataInputBinding#_buildDOMContent}
*/
TreeSelectorDialogBinding.prototype._buildDOMContent = function () {

	TreeSelectorDialogBinding.superclass._buildDOMContent.call(this);

}



///**
//* Build button.
//*/
//TreeSelectorDialogBinding.prototype.buildButtonAndLabel = function () {

//	/*
//	* Build the label.
//	*/
//	if (this.shadowTree.labelInput == null) {

//		this.shadowTree.labelInput = DOMUtil.createElementNS(Constants.NS_XHTML, "input", this.bindingDocument);
//		this.shadowTree.box.appendChild(this.shadowTree.labelInput);
//		this.shadowTree.labelInput.style.display = "none";
//		this.shadowTree.labelInput.readOnly = true;

//		var self = this;
		
//		DOMEvents.addEventListener(this.shadowTree.labelInput, DOMEvents.DOUBLECLICK, {
//			handleEvent: function (e) {
//				self.clearLabel();
//				self.focus();
//			}
//		});
//	}

//	/*
//	* Build the edit button.
//	*/
//	if (this.editButtonBinding == null) {

//		var button = ToolBarButtonBinding.newInstance(this.bindingDocument);
//		button.setImage("${icon:editor-sourceview}");
//		button.bindingElement.style.left = "3px";
//		button.bindingElement.style.width = "29px";
//		this.addFirst(button);
//		button.attach();
//		button.hide();

//		var self = this;

//		button.oncommand = function () {
//			self.clearLabel();
//			self.focus();
//		}

//		this.editButtonBinding = button;
//	}
//};


///**
//* OnBlur event
//* @overloads {DataInputBinding#onblur}
//*/
//TreeSelectorDialogBinding.prototype.onblur = function () {

//	TreeSelectorDialogBinding.superclass.onblur.call(this);
//	this.setValue(this.getValue());
//}

///**
//* Set value.
//* @param {String} value
//* @overloads {DataInputBinding#setValue}
//*/
//TreeSelectorDialogBinding.prototype.setValue = function (value) {

//	TreeSelectorDialogBinding.superclass.setValue.call(this, value);

//	if (this.isAttached) {

//		this.compositeUrl = new Uri(value);

//		if (this.compositeUrl.isMedia || this.compositeUrl.isPage || this.compositeUrl.isInternalUrl) {
//			var label = TreeService.GetCompositeUrlLabel(value);
//			if (label != value) {
//				this.setLabel(label);
//			}
//		} else {
//			this.clearLabel();
//		}
//		this.dispatchAction(TreeSelectorDialogBinding.URL_SELECTED);
//	}
//}


///**
//* Set Label for input
//* @param {String} value
//* @overloads {DataInputBinding#setValue}
//*/
//TreeSelectorDialogBinding.prototype.setLabel = function (label) {

//	this.buildButtonAndLabel();

//	if (this.shadowTree.labelInput) {
//		if (label) {
//			this.setReadOnly(true);
//			this.editButtonBinding.show();
//			this.shadowTree.input.style.display = "none";
//			this.shadowTree.labelInput.style.display = "block";
//			this.shadowTree.labelInput.value = label;
//		} else {
//			this.setReadOnly(false);
//			this.editButtonBinding.hide();
//			this.shadowTree.input.style.display = "block";
//			this.shadowTree.labelInput.style.display = "none";
//		} 
//	}
//}

///**
//* Unset Label for input
//*/
//TreeSelectorDialogBinding.prototype.clearLabel = function () {
//	this.setLabel();
//}

/**
 * Get definition to invoke.
 */
TreeSelectorDialogBinding.prototype.getDefinition = function () {

	var definition = ViewDefinition.clone(
		"Composite.Management.TreeSelectorDialog",
		"Generated.ViewDefinition.Handle." + KeyMaster.getUniqueKey()
	);
	definition.argument.selectionProperty = this.getProperty("selection-property");
	definition.argument.selectionValue = this.getProperty("selection-value");
	definition.argument.selectionResult = this.getProperty("selection-result");
	definition.argument.nodes = [
		{
			key: this.getProperty("element-provider"),
			search: this.getProperty('serialized-search-token')
		}
	];

	return definition;
};