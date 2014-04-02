ClassNameSelectorBinding.prototype = new EditorSelectorBinding;
ClassNameSelectorBinding.prototype.constructor = ClassNameSelectorBinding;
ClassNameSelectorBinding.superclass = EditorSelectorBinding.prototype;

/**
 * @class
 */
function ClassNameSelectorBinding () {

	/**
	 * @type {SystemLogger}
	 */
	this.logger = SystemLogger.getLogger ( "ClassNameSelectorBinding" );
	
	/**
	 * @type {boolean}
	 */
	this._hack = false;
	
	/*
	 * Returnable.
	 */
	return this;
}

/**
 * Identifies binding.
 */
ClassNameSelectorBinding.prototype.toString = function () {

	return "[ClassNameSelectorBinding]";
}

/**
 * Overloads {SelectorBinding#onBindingAttach}
 */
ClassNameSelectorBinding.prototype.onBindingAttach = function () {
	
	ClassNameSelectorBinding.superclass.onBindingAttach.call ( this );
	this.addActionListener ( SelectorBinding.ACTION_SELECTIONCHANGED );
	
	var groups = this._tinyTheme.formatGroups;
	
	// Compute priorities
	var array = [];
	groups.reverse ().each ( function ( group ) {
		group.each ( function ( format ) {
			if ( format.select != null && format.props.classes != null ) {
				if ( format.props.block == null && format.props.inline == null ) {
					array.push ( format );
				}
			}
		}, this );
	}, this );
	array.sort ( function ( f1, f2 ) {
		return f2.priority - f1.priority;
	});
	this.priorities = new List ( array );
}

/**
 * Register as node change handler when TinyMCE is initialized.
 * @implements {IWysiwygEditorComponent}
 * @param {VisualEditorBinding} editor
 * @param {TinyMCE_Engine} engine
 * @param {TinyMCE_Control} instance
 * @param {TinyMCE_CompositeTheme} theme
 */
ClassNameSelectorBinding.prototype.initializeComponent = function ( editor, engine, instance, theme ) {
	
	ClassNameSelectorBinding.superclass.initializeComponent.call ( 
		this,
		editor, 
		engine, 
		instance,
		theme 
	);
	
	this._tinyTheme.registerNodeChangeHandler ( this );
}


/**
 * Implements {@link IActionHandler}
 * @overloads {SelectorBinding#handleAction}
 * @param {Action} action
 */
ClassNameSelectorBinding.prototype.handleAction = function (action) {

    ClassNameSelectorBinding.superclass.handleAction.call(this, action);

    switch (action.type) {
        case SelectorBinding.ACTION_SELECTIONCHANGED:

            var result = true;

            if (Client.isExplorer) {
                this._editorBinding.createBookmark();
            }

            this._isUpdating = true;
            var value = this.getValue();
            for (var i = this.selections.getLength() - 1; i >= 0; i--) {
            	selection = this.selections.get(i);
            	var id = selection.value;
            	if (id != null) {
            		if (this._tinyInstance.formatter.match(id)) {
            			this._tinyInstance.formatter.remove(id);
            			break;
            		}
            	}
            }

            if (value != null) {
                
                this._tinyInstance.formatter.apply(this.getValue());
                this._tinyInstance.undoManager.add();
            }

            this._isUpdating = false;

            if (Client.isExplorer) {
                this._editorBinding.createBookmark();
            }

            break;
    }
}

/**
 * Handle node change.
 * Implements {@link IWysiwygEditorNodeChangeHandler}
 * @param {DOMElement} element
 */
ClassNameSelectorBinding.prototype.handleNodeChange = function (element) {

    if (!this._isUpdating) {
        if (element != this._element || element.className != this._classname) {

            this._element = element; 
            this._classname = element.className;

            // TODO: Add support for images here?

            var list = new List();
            this.priorities.each(function (format) {

                if (this.canApplyDirect(format.id, element)) {
                    list.add(new SelectorBindingSelection(
                        format.select.label,
                        format.id,
                        this._tinyInstance.formatter.match(format.id),
                        null,
                        format.notes
                    ));
                }
            }, this);

            if (list.hasEntries()) {
                this.populateFromList(list);
                this._hack = true;
                this.enable();
                this._false = true;

            } else {
                this.clear();
                this.disable();
            }
        }
    }
}

/**
* Test is the named TinyMCE format can be applied directly to the current selection.
* A specialization for the formatter.canApply(name) which also include parent elements
* @param {string} formatName
* @returns {boolean}
*/
ClassNameSelectorBinding.prototype.canApplyDirect = function (formatName, element) {

	if (VisualEditorBinding.isReservedElement(element))
		return false;

	var formatList = this._tinyInstance.formatter.get(formatName), x, selector;

	for (x = formatList.length - 1; x >= 0; x--) {
		selector = formatList[x].selector;
		if (!selector || this._tinyInstance.dom.is(element, selector)) {
			return true;
		}
	}
	return false;
}




/**
 * Only enable the selector when WE decide to.
 * @param {boolean} isDisabled
 */
ClassNameSelectorBinding.prototype.setDisabled = function ( isDisabled ) {
	
	if ( isDisabled == true || this._hack == true ) {
		ClassNameSelectorBinding.superclass.setDisabled.call ( this, isDisabled );
		if ( isDisabled ) {
			this._element = null;
		}
	}
}