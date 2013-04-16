StyleGroupSelectorBinding.prototype = new EditorSelectorBinding;
StyleGroupSelectorBinding.prototype.constructor = StyleGroupSelectorBinding;
StyleGroupSelectorBinding.superclass = EditorSelectorBinding.prototype;


/**
* Block format controller.
* @implements {IWysiwygEditorComponent}
*/
function StyleGroupSelectorBinding() {

	/**
	* @type {SystemLogger}
	*/
	this.logger = SystemLogger.getLogger("StyleGroupSelectorBinding");

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
StyleGroupSelectorBinding.prototype.toString = function() {

	return "[StyleGroupSelectorBinding]";
};

/**
* Populate selector on build.
* @overloads {EditorSelectorBinding#buildDOMContent}
*/
StyleGroupSelectorBinding.prototype.buildDOMContent = function() {

	StyleGroupSelectorBinding.superclass.buildDOMContent.call(this);

	this.addActionListener(SelectorBinding.ACTION_SELECTIONCHANGED);

	var groups = this._tinyTheme.formatGroups;

	// Compute priorities
	var array = [];
	groups.reverse().each(function (group) {
		group.each(function (format) {
			if (format.select != null && format.props.groupclasses != null) {
				array.push(format);
			}
		}, this);
	}, this);
	array.sort(function (f1, f2) {
		return f2.priority - f1.priority;
	});
	this.priorities = new List(array);
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
StyleGroupSelectorBinding.prototype.initializeComponent = function(editor, engine, instance, theme) {

	StyleGroupSelectorBinding.superclass.initializeComponent.call(
		this,
		editor,
		engine,
		instance,
		theme
	);

	this._tinyTheme.registerNodeChangeHandler(this);
};

/**
* Implements {@link IActionHandler}
* @overloads {SelectorBinding#handleAction}
* @param {Action} action
*/
StyleGroupSelectorBinding.prototype.handleAction = function(action) {

	StyleGroupSelectorBinding.superclass.handleAction.call(this, action);
};

/**
* Handle node change.
* @implements {IWysiwygEditorNodeChangeHandler}
* @param {DOMElement} element
*/
StyleGroupSelectorBinding.prototype.handleNodeChange = function(element) {

};
