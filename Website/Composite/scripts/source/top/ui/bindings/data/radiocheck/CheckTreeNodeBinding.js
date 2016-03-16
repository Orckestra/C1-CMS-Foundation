CheckTreeNodeBinding.prototype = new TreeNodeBinding;
CheckTreeNodeBinding.prototype.constructor = CheckTreeNodeBinding;
CheckTreeNodeBinding.superclass = TreeNodeBinding.prototype;

CheckTreeNodeBinding.CLASS_NAME = "checkbox";

CheckTreeNodeBinding.ACTION_COMMAND = "checkbox treenode command";

/**
 * @class
 */
function CheckTreeNodeBinding() {

	/**
	 * @type {SystemLogger}
	 */
	this.logger = SystemLogger.getLogger("CheckTreeNodeBinding");

	/**
	 * @type {DOMNode}
	 */
	this.selectionElement = null;

	/**
	 * @type {string}
	 */
	this.selectionValue = null;

	/**
	 * @type {boolean}
	 */
	this.isSelectable = true;

	/**
	 * @type {boolean}
	 */
	this.isReadOnly = false;

	return this;
}

/**
 * Identifies binding.
 */
CheckTreeNodeBinding.prototype.toString = function () {

	return "[CheckTreeNodeBinding]";
}

/**
 * @overloads {TreeNodeBinding#onBindingRegister}
 */
CheckTreeNodeBinding.prototype.onBindingRegister = function () {

	CheckTreeNodeBinding.superclass.onBindingRegister.call(this);

}

/**
 * @overloads {TreeNodeBinding#onBindingAttach}
 */
CheckTreeNodeBinding.prototype.onBindingAttach = function () {

	CheckTreeNodeBinding.superclass.onBindingAttach.call(this);

	this._parseDOMProperties();
	this._buildCheckButtonBinding();

	if (this.isReadOnly) {
		this.labelBinding.attachClassName(LabelBinding.CLASSNAME_GRAYTEXT);
	}
}

/**
 * Parse DOM properties, instantiating editation and selectation.
 */
CheckTreeNodeBinding.prototype._parseDOMProperties = function () {

	this.isSelectable = this.isSelectable ? true : this.getProperty("selectable");
}

/**
 * Build button.
 */
CheckTreeNodeBinding.prototype._buildCheckButtonBinding = function () {

	if (this.isSelectable) {
		this._buttonBinding = CheckButtonBinding.newInstance(this.bindingDocument);
		this.bindingElement.insertBefore(
			this._buttonBinding.bindingElement,
			this.labelBinding.bindingElement.nextSibling
		);
		if (this.getProperty("selected") === true) {
			this._buttonBinding.check(true);
		}
		if (this.isReadOnly) {
			this._buttonBinding.setDisabled(true);
		}

		var self = this;
		this._buttonBinding.addActionListener(
			ButtonBinding.ACTION_COMMAND, {
				handleAction: function(action) {
					action.consume();
					self.dispatchAction(
						CheckTreeNodeBinding.ACTION_COMMAND
					);
				}
			}
		);

		this._buttonBinding.attach();

		this.attachClassName(CheckTreeNodeBinding.CLASS_NAME);
	}
}

CheckTreeNodeBinding.prototype.isChecked = function () {

	if (this.isSelectable) {
		return this._buttonBinding.isChecked;
	}
	return undefined;
}

CheckTreeNodeBinding.prototype.setChecked = function (isChecked, isDisableCommand) {

	if (this.isSelectable) {
		this._buttonBinding.setChecked(isChecked, isDisableCommand);
	}
}

CheckTreeNodeBinding.prototype.invoke = function () {

	if (this.isSelectable) {
		this._buttonBinding.invoke();
	}
}

/**
 * TreeNodeBinding factory.
 * @param {DOMDocument} ownerDocument
 * @return {TreeNodeBinding}
 */
CheckTreeNodeBinding.newInstance = function(ownerDocument) {

	var element = DOMUtil.createElementNS(Constants.NS_UI, "ui:treenode", ownerDocument);
	return UserInterface.registerBinding(element, CheckTreeNodeBinding);
}
