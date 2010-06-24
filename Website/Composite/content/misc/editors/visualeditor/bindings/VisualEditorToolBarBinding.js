VisualEditorToolBarBinding.prototype = new ToolBarBinding;
VisualEditorToolBarBinding.prototype.constructor = VisualEditorToolBarBinding;
VisualEditorToolBarBinding.superclass = ToolBarBinding.prototype;

/**
 * @class
 * @implements {IWysiwygEditorComponent}
 * @implements {IWysiwygEditorNodeChangeHandler}
 */
function VisualEditorToolBarBinding () {

	/**
	 * @type {SystemLogger}
	 */
	this.logger = SystemLogger.getLogger ( "VisualEditorToolBarBinding" );
	
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
	 * @type {tinymce.Editor}
	 */
	this._tinyInstance = null;
	
	/**
	 * The TinyMCE theme.
	 * @type {TinyMCE_CompositeTheme}
	 */
	this._tinyTheme = null;
	
	/*
	 * Returnable.
	 */
	return this;
}

/**
 * Identifies binding.
 */
VisualEditorToolBarBinding.prototype.toString = function () {
	
	return "[VisualEditorToolBarBinding]";
}

/**
 * Fix the height, awating lazy attachment by containing box.
 * @overloads {ToolBarBinding#onBindingRegister}
 */
VisualEditorToolBarBinding.prototype.onBindingRegister = function () {
	
	VisualEditorToolBarBinding.superclass.onBindingRegister.call ( this );
	this.buildDOMContent ();
}


/**
 * Register for initialization when TinyMCE is loaded.
 * @overloads {ToolBarBinding#onBindingAttach}
 */
VisualEditorToolBarBinding.prototype.onBindingAttach = function () {
	
	VisualEditorToolBarBinding.superclass.onBindingAttach.call ( this );
	var tinywindow = this.bindingWindow.bindingMap.tinywindow;
	EditorBinding.registerComponent ( this, tinywindow );
}

/**
 * Setup to initialize when TinyMCE is loaded and containng EditorBinding initializes.
 * @implements {IWysiwygEditorComponent}
 * @param {WysiwygEditorBinding} editor
 * @param {TinyMCE_Engine} engine
 * @param {TinyMCE_Control} instance
 * @param {TinyMCE_CompositeTheme} theme
 */
VisualEditorToolBarBinding.prototype.initializeComponent = function ( editor, engine, instance, theme ) {

	this._editorBinding = editor;
	this._tinyEngine	= engine;
	this._tinyInstance 	= instance;
	this._tinyTheme 	= theme;
}