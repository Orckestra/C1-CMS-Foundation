FieldSelectorBinding.prototype = new EditorSelectorBinding;
FieldSelectorBinding.prototype.constructor = FieldSelectorBinding;
FieldSelectorBinding.superclass = EditorSelectorBinding.prototype;

/**
 * @class
 * @implements {IWysiwygEditorComponent}
 */
function FieldSelectorBinding () {

	/**
	 * @type {SystemLogger}
	 */
	this.logger = SystemLogger.getLogger ( "FieldSelectorBinding" );
	
	/*
	 * Returnable.
	 */
	return this;
}

/**
 * Identifies binding.
 */
FieldSelectorBinding.prototype.toString = function () {

	return "[FieldSelectorBinding]";
}

/**
 * Overloads {EditorSelectorBinding#onBindingAttach}
 */
FieldSelectorBinding.prototype.onBindingAttach = function () {
	
	FieldSelectorBinding.superclass.onBindingAttach.call ( this );
	this.addActionListener ( SelectorBinding.ACTION_SELECTIONCHANGED, this );
}

/**
 * Register as node change handler when TinyMCE is initialized.
 * @implements {IWysiwygEditorComponent}
 * @param {WysiwygEditorBinding} editor
 * @param {TinyMCE_Engine} engine
 * @param {TinyMCE_Control} instance
 * @param {TinyMCE_CompositeTheme} theme
 */
FieldSelectorBinding.prototype.initializeComponent = function ( editor, engine, instance, theme ) {
	
	FieldSelectorBinding.superclass.initializeComponent.call ( 
		this,
		editor, 
		engine, 
		instance,
		theme 
	);
	
	var config = this._editorBinding.embedableFieldConfiguration;
	if ( config ) {
		var list = new List ();
		var names = config.getFieldNames ();
		names.each ( function ( name ) {
			list.add ( new SelectorBindingSelection ( 
				name,
				config.getTinyMarkup ( name )
			));
		});
		this.populateFromList ( list );
	}
}

/**
 * Implements {@link IActionHandler}
 * @overloads {SelectorBinding#populateFromList}
 * @param {Action} action
 */
FieldSelectorBinding.prototype.handleAction = function ( action ) {

	FieldSelectorBinding.superclass.handleAction.call ( this, action );
	
	switch ( action.type ) {
		case SelectorBinding.ACTION_SELECTIONCHANGED :
			// what's this used for?
			break;
	}	
}