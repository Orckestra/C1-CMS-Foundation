FormatSelectorBinding.prototype = new EditorSelectorBinding;
FormatSelectorBinding.prototype.constructor = FormatSelectorBinding;
FormatSelectorBinding.superclass = EditorSelectorBinding.prototype;

FormatSelectorBinding.LABEL_UNKNOWN = "(Unknown)";
FormatSelectorBinding.VALUE_UNKNOWN = "(Unknown)";
FormatSelectorBinding.LABEL_TEXT = "(Text)";
FormatSelectorBinding.LABEL_LIST = "(List)";


/*
<p>
<h1>, <h2>, <h3>, <h4>, <h5>, <h6>
<ol>, <ul>
<pre>
<address>
<blockquote>
<dl>
<div>
<fieldset>
<form>
<hr>
<noscript>
<table>
*/

/**
* Block format controller.
* @implements {IWysiwygEditorComponent}
*/
function FormatSelectorBinding() {

	/**
	* @type {SystemLogger}
	*/
	this.logger = SystemLogger.getLogger("FormatSelectorBinding");

	/**
	* @type {List<SelectorBindingSelection>}
	*/
	this._list = null;

	/**
	* @type {List<Format>}
	*/
	this.priorities = null;

	/**
	* @type {HTMLElement}
	*/
	this._element = null;

	/**
	* @type {HashMap<string><Format>}
	*/
	this._formats = new Map();

    /**
    * @type {MenuItemBinding}
    */
	this._unknownItemBinding = null;

	/*
	* Returnable.
	*/
	return this;
}

/**
* Identifies binding.
*/
FormatSelectorBinding.prototype.toString = function () {

	return "[FormatSelectorBinding]";
}

/**
* Populate selector on build.
* @overloads {EditorSelectorBinding#buildDOMContent}
*/
FormatSelectorBinding.prototype.buildDOMContent = function () {

	FormatSelectorBinding.superclass.buildDOMContent.call(this);

	/*
	* Mount and index configuration buttons.
	*/
	var groups = this._tinyTheme.formatGroups;
	var list = new List([
	    new SelectorBindingSelection(
	    	FormatSelectorBinding.LABEL_UNKNOWN,
	    	FormatSelectorBinding.VALUE_UNKNOWN
	    )
	]);

	// isolating BLOCK format instances
	groups.each(function (group) {
		group.each(function (format) {
			if (format.props.block != null && format.select != null && format.props.classes == null && !format.props.wrapper) {
				this._formats.set(format.id, format);
				var name = format.select.label;
				var value = format.id;
				var notes = format.notes;
				list.add(new SelectorBindingSelection(name, value, null, null, notes));
			}
		}, this);
	}, this);

	// Compute priorities
	var array = [];
	groups.each(function (group) {
		group.each(function (format) {
			if (format.select != null && format.props.block != null && format.props.classes == null && !format.props.wrapper) {
				array.push(format);
			}
		}, this);
	}, this);
	array.sort(function (f1, f2) {
		return f2.priority - f1.priority;
	});
	this.priorities = new List(array);

	this.populateFromList(list);

	var defaultitem = this._menuBodyBinding.getChildBindingByLocalName("menuitem");
	defaultitem.disable();

	this.addActionListener(SelectorBinding.ACTION_SELECTIONCHANGED);
	this._list = list;
}

/**
* Register as node change handler when TinyMCE is initialized.
* @implements {IWysiwygEditorComponent}
* @param {WysiwygEditorBinding} editor
* @param {TinyMCE_Engine} engine
* @param {TinyMCE_Control} instance
* @param {TinyMCE_CompositeTheme} theme
*/
FormatSelectorBinding.prototype.initializeComponent = function (editor, engine, instance, theme) {

	FormatSelectorBinding.superclass.initializeComponent.call(
		this,
		editor,
		engine,
		instance,
		theme
	);

	this._tinyTheme.registerNodeChangeHandler(this);
}

/**
* Implements {@link IActionHandler}
* @overloads {SelectorBinding#handleAction}
* @param {Action} action
*/
FormatSelectorBinding.prototype.handleAction = function (action) {

    FormatSelectorBinding.superclass.handleAction.call(this, action);

    switch (action.type) {
        case SelectorBinding.ACTION_SELECTIONCHANGED:
            var value = this.getValue();
            if (this._formats.has(value)) { // (exluding "Unknown" selection)
                var format = this._formats.get(value);
                this._tinyInstance.execCommand('FormatBlock', false, format.id);
                action.consume();
            }
            break;
    }
}

/**
* Handle node change.
* @implements {IWysiwygEditorNodeChangeHandler}
* @param {DOMElement} element
*/
FormatSelectorBinding.prototype.handleNodeChange = function (element) {

	if (element != this._element) {

	    if (element != null && element.nodeName.toLowerCase() == "br") {
	        element = element.parentNode;
	    }
	    this._element = element;

	    var isList = false;
	    var isText = element.nodeName.toLowerCase() == "body";

		var value = null;
		while (value == null && element != null && element.nodeName.toLowerCase() != "body") {
			this.priorities.each(function (format) {
				if (this._tinyInstance.formatter.matchNode(element, format.id)) {
					value = format.id;
				}
				return value == null;
			}, this);

			if (element.nodeName.toLowerCase() == "li") { isList = true; }
			if (element.parentNode != null
				&& element.parentNode.nodeName.toLowerCase() == "body"
                && element.nodeName.toLowerCase() == "div") {
			    isText = true;
			}
			element = element.parentNode;
		}
		if (value == null) {
		    value = FormatSelectorBinding.VALUE_UNKNOWN;
		}
		
		this.selectByValue(value, true);

		if (isList) {
		    this.setUknownLabel(FormatSelectorBinding.LABEL_LIST);
		} else if (isText) {
		    this.setUknownLabel(FormatSelectorBinding.LABEL_TEXT);
		} else {
		    this.setUknownLabel(FormatSelectorBinding.LABEL_UNKNOWN);
		}
	}
}

/**
 * Set label for FormatSelectorBinding.VALUE_UNKNOWN selection.
 * @param {object} value
 * @return {boolean} True if something (new) was selected
 */
FormatSelectorBinding.prototype.setUknownLabel = function (label) {

    var isSuccess = false;

    if (this._unknownItemBinding == null) {
        var bodyBinding = this._menuBodyBinding;
        var itemElementList = bodyBinding.getDescendantElementsByLocalName("menuitem");
        while (itemElementList.hasNext()) {
            var itemBinding = UserInterface.getBinding(
                    itemElementList.getNext()
            );
            if (itemBinding.selectionValue == FormatSelectorBinding.VALUE_UNKNOWN) {
                this._unknownItemBinding = itemBinding;
                break;
            }
        }
    }

    if (this._unknownItemBinding != null) {
        this._unknownItemBinding.setLabel(label)
        if (this._unknownItemBinding == this._selectedItemBinding) {
            this._selectionLabel = label;
            this._buttonBinding.setLabel(label);
        }
        isSuccess = true;
    }

    return isSuccess;
}