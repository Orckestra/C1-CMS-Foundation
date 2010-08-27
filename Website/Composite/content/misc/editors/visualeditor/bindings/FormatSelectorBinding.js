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
	
	/**
	 * @type {HTMLElement}
	 */
	this._element = null;
	
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
	
	FormatSelectorBinding.superclass.buildDOMContent.call ( this );
	
	/*
	 * Build selections.
	 */
	var list = new List ();
	var names = new List ();
	var config = this._editorBinding.formattingConfiguration.getFormattingOptions ();
	
	for ( var tag in config ) {
		var name = config [ tag ];
		var value = tag;
		list.add ( new SelectorBindingSelection ( name, value ));
		names.add ( value );
	}
	
	this.populateFromList ( list );
	this._elementNames = names.toString ();
	
	/*
	 * Rigup action.
	 */
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
 * @overloads {SelectorBinding#handleAction}
 * @param {Action} action
 */
FormatSelectorBinding.prototype.handleAction = function ( action ) {

	FormatSelectorBinding.superclass.handleAction.call ( this, action );
	
	switch ( action.type ) {
		case SelectorBinding.ACTION_SELECTIONCHANGED :
			var format = this.getResult ();
			/*
			 * Seems to be fixed in IE8, though...
			 */ 
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
	
	if ( element != this._element ) {
		
		this._element = element;
		
		var block = this._tinyInstance.dom.getParent (
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
}