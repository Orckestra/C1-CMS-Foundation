BlockSelectorBinding.prototype = new EditorSelectorBinding;
BlockSelectorBinding.prototype.constructor = BlockSelectorBinding;
BlockSelectorBinding.superclass = EditorSelectorBinding.prototype;

BlockSelectorBinding.LABEL_DEFAULT = "(Default)";
BlockSelectorBinding.VALUE_DEFAULT = "(Default)";


/**
* Block format controller.
* @implements {IWysiwygEditorComponent}
*/
function BlockSelectorBinding() {

	/**
	* @type {SystemLogger}
	*/
	this.logger = SystemLogger.getLogger("BlockSelectorBinding");

	/**
	* @type {HTMLElement}
	*/
	this._element = null;

	/**
	* @type {List<Format>}
	*/
	this.priorities = null;

	/*
	* Returnable.
	*/
	return this;
}

/**
* Identifies binding.
*/
BlockSelectorBinding.prototype.toString = function() {

	return "[BlockSelectorBinding]";
};

/**
* Populate selector on build.
* @overloads {EditorSelectorBinding#buildDOMContent}
*/
BlockSelectorBinding.prototype.buildDOMContent = function() {

	BlockSelectorBinding.superclass.buildDOMContent.call(this);

	this.addActionListener(SelectorBinding.ACTION_SELECTIONCHANGED);

	var groups = this._tinyTheme.formatGroups;

	// Compute priorities
	var array = [];
	groups.reverse().each(function (group) {
		group.each(function (format) {
			if (format.select != null && format.props.block != null && format.props.wrapper == 1) {
				array.push(format);
			}
		}, this);
	}, this);
	array.sort(function (f1, f2) {
		return f2.priority - f1.priority;
	});
	this.priorities = new List(array);

	var list = new List([
	    new SelectorBindingSelection(
	    	BlockSelectorBinding.LABEL_DEFAULT,
	    	BlockSelectorBinding.VALUE_DEFAULT
	    )
	]);;

	this.priorities.each(function (format) {
		var name = format.select.label;
		var value = format.id;
		var notes = format.notes;
		list.add(new SelectorBindingSelection(name, value, null, null, notes));
		
		this._tinyInstance.formatter.register(value + '_special', {
			block: format.props.block,
			classes: format.props.classes,
			wrapper: 0
		});
	}, this);





	this.populateFromList(list);

	if (!this.priorities.hasEntries())
		this.hide();
};

/**
* Register as node change handler when TinyMCE is initialized.
* @implements {IWysiwygEditorComponent}
* @param {WysiwygEditorBinding} editor
* @param {TinyMCE_Engine} engine
* @param {TinyMCE_Control} instance
* @param {TinyMCE_CompositeTheme} theme
*/
BlockSelectorBinding.prototype.initializeComponent = function(editor, engine, instance, theme) {

	BlockSelectorBinding.superclass.initializeComponent.call(
		this,
		editor,
		engine,
		instance,
		theme
	);

	this._tinyTheme.registerNodeChangeHandler(this);
	this._tinyTheme.registerEnterKeyHandler(this);
};

/**
* Implements {@link IActionHandler}
* @overloads {SelectorBinding#handleAction}
* @param {Action} action
*/
BlockSelectorBinding.prototype.handleAction = function (action) {

	BlockSelectorBinding.superclass.handleAction.call(this, action);

	switch (action.type) {
		case SelectorBinding.ACTION_SELECTIONCHANGED:
			if (Client.isAnyExplorer) {
				this._editorBinding.deleteBookmark();
			}

			var value = this.getValue();
			if (value != BlockSelectorBinding.VALUE_DEFAULT) {
				this._tinyInstance.formatter.functionIsBlock = true;
				this._tinyInstance.formatter.apply(value);
				this._tinyInstance.formatter.functionIsBlock = false;
			}

			this.selections.each(function (selection) {
				var id = selection.value;
				if (id != null && id !=value) {
					if (this._tinyInstance.formatter.match(id + '_special')) {
						
						this._tinyInstance.formatter.remove(id + '_special');
					}
				}
			}, this);

			this._tinyInstance.undoManager.add();

			action.consume();
			break;
	}
};

/**
* Handle node change.
* @implements {IWysiwygEditorNodeChangeHandler}
* @param {DOMElement} element
*/
BlockSelectorBinding.prototype.handleNodeChange = function(element) {
	if (element != this._element) {

		this._element = element;

		var value = null;
		while (value == null && element != null && element.nodeName.toLowerCase() != "body") {
			this.priorities.each(function (format) {
				if (this._tinyInstance.formatter.matchNode(element, format.id)) {
					value = format.id;
				}
				return value == null;
			}, this);

			element = element.parentNode;
		}
		if (value == null) {
			value = BlockSelectorBinding.VALUE_DEFAULT;
		}
		this.selectByValue(value, true);
	}
};

/**
* Handle Editor Enter Key
*/
BlockSelectorBinding.prototype.handleEnterKey = function (e) {

	var editor = this._tinyInstance;
	var dom = editor.dom;
	var rng = editor.selection.getRng();
	
	if (rng.startContainer != null && rng.startContainer == rng.endContainer && rng.startOffset == 0 && rng.endOffset == 0) {
		var node = rng.startContainer;
		if (dom.isBlock(node) && editor.dom.isEmpty(node) && (node.nextElementSibling === null || node.previousElementSibling === null)) {
			var parent = rng.startContainer.parentNode;
			var value;
			this.priorities.each(function (format) {
				if (editor.formatter.matchNode(parent, format.id)) {
					value = format.id;
				}
				return value == null;
			}, this);

			if (value) {
				var p = dom.create("p");
				if (!editor.isIE) {
					p.innerHTML = '<br data-mce-bogus="1">';
				}
				if (node.previousElementSibling === null) {
					parent.parentNode.insertBefore(p, parent);
				} else {
					dom.insertAfter(p, parent);
				}
				dom.remove(node);
				editor.selection.setCursorLocation(p, 0);
				editor.undoManager.add();
				e.preventDefault();
			}
		}
	}
};
