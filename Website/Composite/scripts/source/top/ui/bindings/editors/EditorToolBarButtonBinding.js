EditorToolBarButtonBinding.prototype = new ToolBarButtonBinding;
EditorToolBarButtonBinding.prototype.constructor = EditorToolBarButtonBinding;
EditorToolBarButtonBinding.superclass = ToolBarButtonBinding.prototype;

/**
 * We need a special binding for buttons in the editor because IE will loose focus on  
 * the editor selection if any HTML element is clicked *except* form elements, IMG 
 * and A elements. We overload the method {@link ButtonBinding#buildDOMContent} 
 * to inject an IMG element absolutely positioned on top of the toolbarbutton subchildren.
 * @implements {IWysiwygEditorComponent}
 * @implements {IEditorControlBinding}
 * @class
 */
function EditorToolBarButtonBinding () {

	/**
	 * @type {SystemLogger}
	 */
	this.logger = SystemLogger.getLogger ( "EditorToolBarButtonBinding" );
	
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
	 * Indicates that editor should refocus 
	 * on the mouseup event.
	 * @type {boolean}
	 */
	this.isEditorSimpleControl = true;
	
	/**
	 * Indicates that editors should not blur 
	 * the toolbars when binding is handled.
	 * @implements {IEditorControlBinding}
	 * @type {boolean}
	 */
	this.isEditorControlBinding = true;
	
	/**
	 * Shorthand the "cmd" property.
	 * @type {string}
	 */
	this.cmd = null;
	
	/**
	 * Shorthand the "val" property (not always used).
	 * @type {string}
	 */
	this.val = null;
	
	/**
	 * Shorthand the "gui" property (not always used).
	 * @type {string}
	 */
	this.gui = null;

}

/**
 * Identifies binding.
 */
EditorToolBarButtonBinding.prototype.toString = function () {

	return "[EditorToolBarButtonBinding]";
}

/**
 * Register as editor component.
 * @overloads {ToolBarButtonBinding#onBindingAttach}
 */
EditorToolBarButtonBinding.prototype.onBindingAttach = function () {
	
	EditorToolBarButtonBinding.superclass.onBindingAttach.call ( this );
	this._setupEditorButton ();
}

/**
 * Setup as editor button.
 */
EditorToolBarButtonBinding.prototype._setupEditorButton = EditorClickButtonBinding.prototype._setupEditorButton;

/**
 * @overloads {ButtonBinding#buildDOMContent}
 */
EditorToolBarButtonBinding.prototype.buildDOMContent = function () {

	EditorToolBarButtonBinding.superclass.buildDOMContent.call ( this );
	this._buildDesignModeSanitizer ();
}

/**
 * Initialize as editor component.
 * @implements {IWysiwygEditorComponent}
 * @param {WysiwygEditorBinding} editor
 * @param {TinyMCE_Engine} engine
 * @param {TinyMCE_Control} instance
 * @param {TinyMCE_CompositeTheme} theme
 */
EditorToolBarButtonBinding.prototype.initializeComponent = EditorClickButtonBinding.prototype.initializeComponent;

/**
 * @implements {IWysiwygEditorComponent}
 * @param {SourceEditorBinding} editor
 * @param {HTMLIframeElement} frame
 * @param {CodePress} engine
 */
EditorToolBarButtonBinding.prototype.initializeSourceEditorComponent = EditorClickButtonBinding.prototype.initializeSourceEditorComponent;

/**
 * Places an IMG element on top of all other elements. This feature is 
 * disabled for Mozilla because it makes the button draggable; it's not 
 * needed in Mozilla anyway.
 * @see {EditorClickButtonBinding#_buildDesignModeSanitizer}
 */
EditorToolBarButtonBinding.prototype._buildDesignModeSanitizer = EditorClickButtonBinding.prototype._buildDesignModeSanitizer;

/**
 * Bookmark editor selection when the button is handled.
 * @see {EditorClickButtonBinding#_setupEditorBookmarking}
 */
EditorToolBarButtonBinding.prototype._setupEditorBookmarking = EditorClickButtonBinding.prototype._setupEditorBookmarking;

/**
 * EditorToolBarButtonBinding factory.
 * @param {DOMDocument} ownerDocument
 * @return {EditorToolBarButtonBinding}
 */
EditorToolBarButtonBinding.newInstance = function ( ownerDocument ) {

	var element = DOMUtil.createElementNS ( Constants.NS_UI, "ui:toolbarbutton", ownerDocument );
	return UserInterface.registerBinding ( element, EditorToolBarButtonBinding );
}