HierarchicalSelectorBinding.prototype = new DataBinding;
HierarchicalSelectorBinding.prototype.constructor = HierarchicalSelectorBinding;
HierarchicalSelectorBinding.superclass = DataBinding.prototype;

HierarchicalSelectorBinding.DISPLAY_SELECTED = "selected";
HierarchicalSelectorBinding.DISPLAY_UNSELECTED = "unselected";
HierarchicalSelectorBinding.ACTION_COMMAND = "HierarchicalSelector command";
HierarchicalSelectorBinding.ACTION_SELECTIONCHANGED = "HierarchicalSelector selection changed";

/**
 * @class
 * @implements {IData}
 */
function HierarchicalSelectorBinding() {

	/**
	 * @type {SystemLogger}
	 */
	this.logger = SystemLogger.getLogger("HierarchicalSelectorBinding");

	/**
	 * Block common crawlers.
	 * @overwrites {Binding#crawlerFilters}
	 * @type {List<string>}
	 */
	this.crawlerFilters = new List([DocumentCrawler.ID, FocusCrawler.ID]);

	/**
	* @type {boolean}
	*/
	this.autoSelectChildren = false;

	/**
	* @type {boolean}
	*/
	this.autoSelectParents = true;

	/**
	 * @type {boolean}
	 */
	this.isRequired = false;

	/**
	 * @type {boolean}
	 */
	this.hasCounter = false;
}

/**
 * Identifies binding.
 */
HierarchicalSelectorBinding.prototype.toString = function () {

	return "[HierarchicalSelectorBinding]";
}

/**
 * @overloads {DataBinding#onBindingAttach}
 */
HierarchicalSelectorBinding.prototype.onBindingAttach = function () {

	HierarchicalSelectorBinding.superclass.onBindingAttach.call(this);

	this.addActionListener(CheckTreeNodeBinding.ACTION_COMMAND);

	this._buildDOMContent();
	this._parseDOMProperties();
	this._populate();

	var parent = UserInterface.getBinding(this.bindingElement.parentNode);
	if (parent != null && parent instanceof DialogPageBodyBinding && parent.bindingElement.children.length === 1) {
		parent.attachClassName(DialogPageBodyBinding.FILLED_CLASSNAME);
	}

	this.updateCounter();

}

/**
 * @overloads {ToolBarBinding#onBindingInitialize}
 */
HierarchicalSelectorBinding.prototype.onBindingInitialize = function () {

	HierarchicalSelectorBinding.superclass.onBindingInitialize.call(this);
	this.shadowTree.tree.attachRecursive();
}

/**
 * Build DOM content.
 */
HierarchicalSelectorBinding.prototype._buildDOMContent = function () {

	// build box for result display
	this.shadowTree.box = DOMUtil.createElementNS(Constants.NS_UI, "ui:box", this.bindingDocument);
	this.bindingElement.appendChild(this.shadowTree.box);
}

/**
 * Parse DOM properties, instantiating editation and selectation.
 */
HierarchicalSelectorBinding.prototype._parseDOMProperties = function () {

	this.autoSelectChildren = this.getProperty("autoselectchildren") === true;
    this.autoSelectParents = this.getProperty("autoselectparents") === true;
	this.isRequired = this.getProperty("required") === true;
	this.hasCounter = this.getProperty("hascounter") === true;
}

HierarchicalSelectorBinding.prototype._populate = function () {

	this.shadowTree.tree = CheckTreeBinding.newInstance(this.bindingDocument);
	this.shadowTree.box.appendChild(this.shadowTree.tree.bindingElement);
	this._populateFromSelections(this.shadowTree.tree, this.bindingElement);
	this.shadowTree.tree.attachRecursive();

	this.shadowTree.tree.addActionListener(TreeNodeBinding.ACTION_OPEN, this);

}

HierarchicalSelectorBinding.prototype._populateFromSelections = function (treeNodeContainer, selectionContainer) {

	var selections = DOMUtil.getChildElementsByLocalName(selectionContainer, "selection");
	var treenode = null;;

	selections.each(function (selection) {

		treenode = CheckTreeNodeBinding.newInstance(this.bindingDocument);
		var label = selection.getAttribute("label");
		var value = selection.getAttribute("value");
		var isSelected = selection.getAttribute("selected") === "true";
		var image = selection.getAttribute("image");
		var isSelectable = selection.getAttribute("selectable") === "true";
		var isReadonly = selection.getAttribute("readonly") === "true";

		treenode.setLabel(label);
		treenode.setImage(image);
		treenode.imageProfile = new ImageProfile({
			image: image,
			imageHover: null,
			imageActive: null,
			imageDisabled: null
		});
		treenode.setProperty("selected", isSelected);
		treenode.selectionElement = selection;
		treenode.selectionValue = value;
		treenode.isSelectable = isSelectable;
		treenode.isReadOnly = isReadonly;

		treenode.isContainer = selection.hasChildNodes();

		treeNodeContainer.add(treenode);

	}, this);

	if (treeNodeContainer instanceof CheckTreeBinding && selections.getLength() === 1) {
		treenode.setProperty("open", true);
		treenode.setProperty("pin", true);
		this._populateFromSelections(treenode, treenode.selectionElement);
		treenode.hasBeenOpened = true;
	}
}

/**
 * Focus when button is handled; and hide the internal DataDialogBinding.
 * @implements {IActionListener}
 * @overloads {Binding#handleAction}
 * @param {Action} action
 */
HierarchicalSelectorBinding.prototype.handleAction = function (action) {

	HierarchicalSelectorBinding.superclass.handleAction.call(this, action);

	var binding = action.target;

	switch (action.type) {

		case CheckTreeNodeBinding.ACTION_COMMAND:

			this.dirty();

			var checkTreeNode = action.target;
			var isChecked = checkTreeNode.isChecked();

			checkTreeNode.selectionElement.setAttribute("selected", isChecked);

			if (this.autoSelectChildren || this.autoSelectParents && !isChecked) {

				this.checkChildrenLazySelections(checkTreeNode, isChecked);

				checkTreeNode.getDescendantBindingsByType(CheckTreeNodeBinding).each(function (child) {
					if (child.isSelectable && !child.isReadOnly) {
						child.setChecked(isChecked, true);
						child.selectionElement.setAttribute("selected", isChecked);
						this.checkChildrenLazySelections(child, isChecked);
					}
				}, this);
			}

			if (this.autoSelectParents && isChecked) {
				var parent = checkTreeNode;
				while (((parent = UserInterface.getBinding(parent.bindingElement.parentNode)) && parent instanceof CheckTreeNodeBinding)) {
					if (parent.isSelectable && !parent.isReadOnly) {
						parent.setChecked(isChecked, true);
						parent.selectionElement.setAttribute("selected", isChecked);
					}
				}
			}

			if (this.hasClassName(DataBinding.CLASSNAME_INVALID)) {
				this.detachClassName(DataBinding.CLASSNAME_INVALID);
			}

			this.updateCounter();

			action.consume();
			break;

		case TreeNodeBinding.ACTION_OPEN:
			var treenode = action.target;
			if (!treenode.hasBeenOpened) {
				this._populateFromSelections(treenode, treenode.selectionElement);
				treenode.attachRecursive();
			}
			action.consume();
			break;
	}
}



HierarchicalSelectorBinding.prototype.updateCounter = function () {

	if (this.hasCounter) {
		var count = 0;
		var selections = DOMUtil.getElementsByTagName(this.bindingElement, "selection");
		new List(selections).each(function (selection) {
			var isSelectable = selection.getAttribute("selectable") === "true";
			var isSelected = selection.getAttribute("selected") === "true";
			var isReadonly = selection.getAttribute("readonly") === "true";
			if (isSelectable && !isReadonly && isSelected) {
				count++;
			}
		}, this);
		this.setCounter(count);
		console.log(count);
	}
}


HierarchicalSelectorBinding.prototype.setCounter = function (value) {

	if (this.hasCounter) {
		if (this.shadowTree.countLabelBinding == null) {
			this.shadowTree.countLabelBinding = LabelBinding.newInstance(
				this.bindingDocument
			);
			this.add(this.shadowTree.countLabelBinding);
		}
		var label = StringBundle.getString("ui", "Selector.Count");
		if (!label) return;
		this.shadowTree.countLabelBinding.setLabel(label.replace("{0}", value));
	}
}

HierarchicalSelectorBinding.prototype.checkChildrenLazySelections = function (treenode, isChecked) {

	if (treenode.isContainer && !treenode.hasBeenOpened) {
		var selections = DOMUtil.getElementsByTagName(treenode.selectionElement, "selection");
		new List(selections).each(function (selection) {
			var isSelectable = selection.getAttribute("selectable") === "true";
			var isReadonly = selection.getAttribute("readonly") === "true";
			if (isSelectable && !isReadonly) {
				selection.setAttribute("selected", isChecked);
			}
		});
	}
}

/**
 * @implements {IUpdateHandler}
 * @overwrites {Binding#handleElement}
 * @param {Element} element
 */
HierarchicalSelectorBinding.prototype.handleElement = function (element) {

	return true; // do handle element update
}

/**
 * @implements {IUpdateHandler}
 * @overwrites {Binding#updateElement}
 * @param {Element} element
 */
HierarchicalSelectorBinding.prototype.updateElement = function (element) {

	return true; // stop crawling descendants
}


// IMPLEMENT IDATA ...........................................................

/**
 * Validate.
 * @implements {IData}
 * @return {boolean}
 */
HierarchicalSelectorBinding.prototype.validate = function () {
	var isValid = true;
	if (this.isRequired) {
		isValid = false;
		this.getDescendantBindingsByType(CheckTreeNodeBinding).each(function (treenode) {
			if (treenode.isSelectable && !treenode.isReadOnly && treenode.isChecked()) {
				isValid = true;
				return false;
			}
			return true;
		});

		if (isValid === false) {
			this.attachClassName(DataBinding.CLASSNAME_INVALID);
		}

	}
	return isValid;
}

/**
 * Manifest. This will write form elements into page DOM
 * so that the server recieves something on form submit.
 * @implements {IData}
 */
HierarchicalSelectorBinding.prototype.manifest = function () {

	/*
	 * We need to submit an "array" sort of thing.
	 * First clear possible existing form elements.
	 */
	var inputs = new List(DOMUtil.getElementsByTagName(this.bindingElement, "input"));
	if (inputs.hasEntries()) {
		inputs.each(function (input) {
			input.parentNode.removeChild(input);
		});
	}

	/*
	 * Build inputs for selected selections.
	 */
	var selections = DOMUtil.getElementsByTagName(this.bindingElement, "selection");
	new List(selections).each(function (selection) {
		var isSelectable = selection.getAttribute("selectable") === "true";
		var isSelected = selection.getAttribute("selected") === "true";
		var value = selection.getAttribute("value");
		if (isSelectable && isSelected) {
			var input = DOMUtil.createElementNS(Constants.NS_XHTML, "input", this.bindingDocument);
			input.name = this._name;
			input.value = value;
			this.bindingElement.appendChild(input);
		}
	}, this);
}

/**
 * Get value. This is intended for serversice processing.
 * @implements {IData}
 * @return {string}
 */
HierarchicalSelectorBinding.prototype.getValue = function () {

	return null;
}

/**
 * Set value.
 * @implements {IData}
 * @param {string} value
 */
HierarchicalSelectorBinding.prototype.setValue = function (value) {

}

/**
 * Get result. This is intended for clientside processing.
 * @implements {IData}
 * @return {array
 */
HierarchicalSelectorBinding.prototype.getResult = function () {

	return new Array();
}

/**
 * Set result.
 * @implements {IData}
 * @param {array} array
 */
HierarchicalSelectorBinding.prototype.setResult = function (array) {

}