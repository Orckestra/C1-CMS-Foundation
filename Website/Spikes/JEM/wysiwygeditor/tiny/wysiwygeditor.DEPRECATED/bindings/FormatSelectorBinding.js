FormatSelectorBinding.prototype = new EditorSelectorBinding;
FormatSelectorBinding.prototype.constructor = FormatSelectorBinding;
FormatSelectorBinding.superclass = EditorSelectorBinding.prototype;

/**
 * @class
 * @implements {IWysiwygEditorComponent}
 */
function FormatSelectorBinding () {

	/**
	 * @type {SystemLogger}
	 */
	this.logger = SystemLogger.getLogger ( "FormatSelectorBinding" );
	
	/**
	 * Comma separated string of recognized formatting element names.
	 * "p,div,h1,h2,h3,h4,h5,h6,pre,address,blockquote,dt,dl,dd,samp"
	 * @type {string}
	 */
	this._elementNames = null;
	
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
 * Overloads {EditorSelectorBinding#onBindingAttach}
 */
FormatSelectorBinding.prototype.onBindingAttach = function () {
	
	FormatSelectorBinding.superclass.onBindingAttach.call ( this );
	
	this.addActionListener ( SelectorBinding.ACTION_SELECTIONCHANGED, this );
	
	var names = new List ();
	this.selections.each ( 
		function ( selection ) {
			if ( selection.value != "" ) {
				names.add ( selection.value );
			}
		}
	);
	this._elementNames = names.toString ();	
}

/**
 * Register as node change handler when TinyMCE is initialized.
 * @implements {IWysiwygEditorComponent}
 * @param {WysiwygEditorBinding} editor
 * @param {TinyMCE_Engine} engine
 * @param {TinyMCE_Control} instance
 * @param {TinyMCE_CompositeTheme} theme
 */
FormatSelectorBinding.prototype.initializeComponent = function ( editor, engine, instance, theme ) {
	
	FormatSelectorBinding.superclass.initializeComponent.call ( 
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
 * @overloads {SelectorBinding#populateFromList}
 * @param {Action} action
 */
FormatSelectorBinding.prototype.handleAction = function ( action ) {

	FormatSelectorBinding.superclass.handleAction.call ( this, action );
	
	switch ( action.type ) {
		case SelectorBinding.ACTION_SELECTIONCHANGED :
			var format = this.getResult ();
			if ( Client.isExplorer ) {
				if ( format == "" ) {
					this.logger.error ( "TODO: Problem with no format in Explorer!" );
				}
				format = "<" + format + ">";
			}
			this._tinyInstance.execCommand (
				"FormatBlock",
				false,
				format
			);
			this._tinyInstance.execCommand (
				"mceSetCSSClass",
				false,
				""
			);
			action.consume ();
			break;
	}	
}

/**
 * Handle node change.
 * @implements {IWysiwygEditorNodeChangeHandler}
 * @param {DOMElement} element
 */
FormatSelectorBinding.prototype.handleNodeChange = function ( element ) {
	
	var block = this._tinyInstance.getParentElement (
		element, this._elementNames
	);
	if ( block ) {
		this.selectByValue ( 
			DOMUtil.getLocalName ( block ).toLowerCase (),
			true
		);
	} else {
		this.reset ( true );
	}
}