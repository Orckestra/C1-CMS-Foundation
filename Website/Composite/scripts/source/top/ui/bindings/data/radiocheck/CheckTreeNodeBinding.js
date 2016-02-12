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

	this._buildCheckButtonBinding();
}


/**
 * Build button.
 */
CheckTreeNodeBinding.prototype._buildCheckButtonBinding = function () {

	this._buttonBinding = this.add(
		CheckButtonBinding.newInstance(this.bindingDocument)
	);
	if (this.getProperty("selected") === true) {
		this._buttonBinding.check(true);
	}

	var self = this;
	this._buttonBinding.addActionListener(
			ButtonBinding.ACTION_COMMAND, {
				handleAction: function (action) {
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

CheckTreeNodeBinding.prototype.isChecked = function () {

	return this._buttonBinding.isChecked;
}

CheckTreeNodeBinding.prototype.invoke = function () {

	this._buttonBinding.invoke();
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
