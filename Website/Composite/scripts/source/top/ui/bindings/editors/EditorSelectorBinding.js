EditorSelectorBinding.prototype = new SelectorBinding;
EditorSelectorBinding.prototype.constructor = EditorSelectorBinding;
EditorSelectorBinding.superclass = SelectorBinding.prototype;

/**
 * @class
 * Bookmarking cursor position and selection status in 
 * the editor whenever the selector is handled. 
 * Restore selection when done.
 * @implements {IWysiwygEditorComponent}
 */
function EditorSelectorBinding () {

	/**
	 * @type {SystemLogger}
	 */
	this.logger = SystemLogger.getLogger ( "EditorSelectorBinding" );
	
	/**
	 * The containing editor.
	 * @type {WysiwygEditorBinding}
	 */
	this._editorBinding = null;
	
	/**
	 * The TinyMCE engine.
	 * @type {TinyMCE_Engine} 
	 */
	this._tinyEngine = null;
	
	/**
	 * The TinyMCE instance.
	 * @type {TinyMCE_Control}
	 */
	this._tinyInstance = null;
	
	/**
	 * The TinyMCE theme.
	 * @type {TinyMCE_CompositeTheme}
	 */
	this._tinyTheme = null;
		
	/**
	 * TODO: since this property is obviously not constant, lowercase it!
	 * @overwrites {SelectorBinding#BUTTON_IMPLEMENTATION}
	 * @type {class}
	 */
	this.BUTTON_IMPLEMENTATION = EditorClickButtonBinding;
	
	/*
	 * @overwrites {SelectorBinding#MENUITEM_IMPLEMENTATION}
	 * @type {class}
	 */
	this.MENUITEM_IMPLEMENTATION = EditorMenuItemBinding;
	
	/* 
	 * Never recieve the focus!
	 * @overwrites {SelectorBinding#isFocusable}
	 */
	this.isFocusable = false;
	
	/**
	 * Indicates that editors should not blur 
	 * the toolbars when binding is handled.
	 * @implements {IEditorControlBinding}
	 * @type {boolean}
	 */
	this.isEditorControlBinding = true;

	/**
	* @type {boolean}
	*/
	this.isSearchSelectionEnabled = false;
}

/**
 * Identifies binding.
 */
EditorSelectorBinding.prototype.toString = function () {

	return "[EditorSelectorBinding]";
}

/**
 * @overloads {SelectorBinding#onBindingAttach}
 */
EditorSelectorBinding.prototype.onBindingAttach = function () {

	/*
	 * Should editor activation be maintained while handling this selector? 
	 */
	if ( this.getProperty ( "editorcontrol" ) == false ) {
		this.isEditorControlBinding = false;
		this.BUTTON_IMPLEMENTATION = ClickButtonBinding;
		this.MENUITEM_IMPLEMENTATION = MenuItemBinding;
	}
	
	/*
	 * THIS WILL FAIL IN SOURCECODEEDITOR!
	 */
	var tinywindow = this.bindingWindow.bindingMap.tinywindow;
	EditorBinding.registerComponent ( this, tinywindow );
	
	if (Client.isPad) {
		this.setProperty("width", 140);
	}
	
	/*
	 * Executed last so that isEditorControlBinding 
	 * is determined before we build the button.
	 */
	EditorSelectorBinding.superclass.onBindingAttach.call ( this );
}

/** 
 * Button must inherit IEditorControlBinding status.
 * @overloads {SelectorBinding#buildButton}
 */
EditorSelectorBinding.prototype.buildButton = function () {

	EditorSelectorBinding.superclass.buildButton.call(this);
	this._buttonBinding.isEditorSimpleControl = false;
	if ( this.isEditorControlBinding == false ) {
		this._buttonBinding.isEditorControlBinding = false;
	}
}

/**
 * Register as node change handler when TinyMCE is initialized.
 * @implements {IWysiwygEditorComponent}
 * @param {WysiwygEditorBinding} editor
 * @param {TinyMCE_Engine} engine
 * @param {TinyMCE_Control} instance
 * @param {TinyMCE_CompositeTheme} theme
 */
EditorSelectorBinding.prototype.initializeComponent = function ( editor, engine, instance, theme ) {

	this._editorBinding = editor;
	this._tinyEngine	= engine;
	this._tinyInstance 	= instance;
	this._tinyTheme 	= theme;
}

/**
 * Restore selection just after action invoked - unless a dialog was opened...
 * @overloads {SelectorBinding#handleAction}
 * @param {Action} action
 */
EditorSelectorBinding.prototype.handleAction = function ( action ) {
	
	EditorSelectorBinding.superclass.handleAction.call ( this, action );
	
	switch ( action.type ) {
		case MenuItemBinding.ACTION_COMMAND :
			if ( this._editorBinding.hasBookmark ()) {
				var self = this;
				setTimeout ( function () {
					if ( !self._editorBinding.isDialogMode ) {
						self._editorBinding.restoreBookmark();
						self._tinyInstance.focus();
					}
				}, 0 );
			}
			break;
	}
}

/**
 * Never grab keyboard!
 * @overwrites {SelectorBinding#_grabKeyboard}
 */
EditorSelectorBinding.prototype._grabKeyboard = function () {}

/**
 * Never release keyboard!
 * @overwrites {SelectorBinding#_releaseKeyboard}
 */
EditorSelectorBinding.prototype._releaseKeyboard = function () {}