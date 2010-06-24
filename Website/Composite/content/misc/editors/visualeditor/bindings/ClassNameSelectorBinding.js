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
}

/**
 * Register as node change handler when TinyMCE is initialized.
 * @implements {IWysiwygEditorComponent}
 * @param {WysiwygEditorBinding} editor
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
ClassNameSelectorBinding.prototype.handleAction = function ( action ) {

	ClassNameSelectorBinding.superclass.handleAction.call ( this, action );
	
	switch ( action.type ) {
		case SelectorBinding.ACTION_SELECTIONCHANGED :
			var classname = this.getResult ();
			this._tinyInstance.execCommand (
				"mceSetCSSClass",
				false,
				classname
			);
			action.consume ();
			break;
	}	
}

/**
 * Handle node change.
 * TODO: this is invoked like crazy, please remove redundant builds.
 * Implements {@link IWysiwygEditorNodeChangeHandler}
 * @param {DOMElement} element
 */
ClassNameSelectorBinding.prototype.handleNodeChange = function ( element ) {
	
	var names = this._getClassNamesForElement ( element );
	
	if ( names.hasEntries ()) {
		var list = new List ();
		names.each ( function ( name ) {
			list.add ( 
				new SelectorBindingSelection ( 
					name, 
					name, 
					name == element.className 
				)
			);
		});
		this.populateFromList ( list );
		this.hasSelections = true;
		this.enable ();
	} else {
		this.clear ();
		this.hasSelections = false;
		this.disable ();
	}
}

/**
 * Get classnames for element.
 * @param {DOMElement} element
 * @return {List<string>}
 */
ClassNameSelectorBinding.prototype._getClassNamesForElement = function ( element ) {

	var config 	= this._editorBinding.elementClassConfiguration;
	var name 	= DOMUtil.getLocalName ( element ).toLowerCase ();
	var list 	= config.getClassNamesForElement ( name );
	
	return list;
}