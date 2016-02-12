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
function HierarchicalSelectorBinding () {

	/**
	 * @type {SystemLogger}
	 */
	this.logger = SystemLogger.getLogger ( "HierarchicalSelectorBinding" );

	/**
	 * Block common crawlers.
	 * @overwrites {Binding#crawlerFilters}
	 * @type {List<string>}
	 */
	this.crawlerFilters	= new List ([ DocumentCrawler.ID, FocusCrawler.ID ]);
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

	HierarchicalSelectorBinding.superclass.onBindingAttach.call ( this );

	this.addActionListener(CheckTreeNodeBinding.ACTION_COMMAND);

	this._buildDOMContent ();
	this._parseDOMProperties ();
	this._populate();
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
	this.shadowTree.box = DOMUtil.createElementNS ( Constants.NS_UI, "ui:box", this.bindingDocument );
	this.bindingElement.appendChild(this.shadowTree.box);
}

/**
 * Parse DOM properties, instantiating editation and selectation.
 */
HierarchicalSelectorBinding.prototype._parseDOMProperties = function () {

}

HierarchicalSelectorBinding.prototype._populate = function () {

	this.shadowTree.tree = CheckTreeBinding.newInstance(this.bindingDocument);
	this.shadowTree.box.appendChild(this.shadowTree.tree.bindingElement);
	this._populateFromSelections(this.shadowTree.tree, this.bindingElement);
	this.shadowTree.tree.attachRecursive();
}

HierarchicalSelectorBinding.prototype._getTreeNode = function (selection) {


	return treenode;
}

HierarchicalSelectorBinding.prototype._getTreeNodes = function (selections) {

	var list = new List ();
	selections.each(function(selection) {
		list.add(this._getTreeNode(selection));
	}, this);

	return list;
}

HierarchicalSelectorBinding.prototype._populateFromSelections = function (treeNodeContainer, selectionContainer) {

	var hasSelected = false;
	DOMUtil.getChildElementsByLocalName(selectionContainer, "selection").each(function (selection) {

		var treenode = CheckTreeNodeBinding.newInstance(this.bindingDocument);
		var label = selection.getAttribute("label");
		var value = selection.getAttribute("value");
		var isSelected = selection.getAttribute("selected") === "true";
		var image = selection.getAttribute("image");

		treenode.setLabel(label);
		treenode.setImage(image);
		treenode.setProperty("selected", isSelected);
		treenode.selectionElement = selection;
		treenode.selectionValue = value;
		treeNodeContainer.add(treenode);

		if (this._populateFromSelections(treenode, treenode.selectionElement)) {
			treenode.setProperty("open", true);
			hasSelected = true;
		} else {
			hasSelected = hasSelected ? hasSelected : isSelected;
		}

	}, this);

	return hasSelected;

}

/**
 * Focus when button is handled; and hide the internal DataDialogBinding.
 * @implements {IActionListener}
 * @overloads {Binding#handleAction}
 * @param {Action} action
 */
HierarchicalSelectorBinding.prototype.handleAction = function ( action ) {

	HierarchicalSelectorBinding.superclass.handleAction.call ( this, action );

	var binding = action.target;

	switch ( action.type ) {

		case CheckTreeNodeBinding.ACTION_COMMAND:
			this.dirty ();
			action.consume ();
			break;
	}
}

// IMPLEMENT IDATA ...........................................................

/**
 * Validate.
 * @implements {IData}
 * @return {boolean}
 */
HierarchicalSelectorBinding.prototype.validate = function () {

	return true;
}

/**
 * Manifest. This will write form elements into page DOM
 * so that the server recieves something on form submit.
 * @implements {IData}
 */
HierarchicalSelectorBinding.prototype.manifest = function() {

	/*
	 * We need to submit an "array" sort of thing.
	 * First clear possible existing form elements.
	 */
	var inputs = new List(DOMUtil.getElementsByTagName(this.bindingElement, "input"));
	if (inputs.hasEntries()) {
		inputs.each(function(input) {
			input.parentNode.removeChild(input);
		});
	}

	/*
	 * Build inputs for selected selections.
	 */
	this.getDescendantBindingsByType(CheckTreeNodeBinding).each(function(treenode) {
		if (treenode.isChecked()) {
			var input = DOMUtil.createElementNS(Constants.NS_XHTML, "input", this.bindingDocument);
			input.name = this._name;
			input.value = treenode.selectionValue;
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
HierarchicalSelectorBinding.prototype.setValue = function ( value ) {

}

/**
 * Get result. This is intended for clientside processing.
 * @implements {IData}
 * @return {array
 */
HierarchicalSelectorBinding.prototype.getResult = function () {

	return new Array ();
}

/**
 * Set result.
 * @implements {IData}
 * @param {array} array
 */
HierarchicalSelectorBinding.prototype.setResult = function ( array ) {

}