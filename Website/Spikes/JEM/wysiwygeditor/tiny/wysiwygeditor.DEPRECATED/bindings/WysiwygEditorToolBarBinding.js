WysiwygEditorToolBarBinding.prototype = new ToolBarBinding;
WysiwygEditorToolBarBinding.prototype.constructor = WysiwygEditorToolBarBinding;
WysiwygEditorToolBarBinding.superclass = ToolBarBinding.prototype;

/**
 * @class
 * This toolbar is rigged up to load content when containing EditorBinding initializes. 
 * Decision was made to show toolbars AFTER editor content is displayed, although 
 * technically, the net result is slower than the opposite scenario.
 * @implements {IWysiwygEditorComponent}
 * @implements {IWysiwygEditorNodeChangeHandler}
 */
function WysiwygEditorToolBarBinding () {

	/**
	 * @type {SystemLogger}
	 */
	this.logger = SystemLogger.getLogger ( "WysiwygEditorToolBarBinding" );
	
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
	
	/*
	 * Returnable.
	 */
	return this;
}

/**
 * Identifies binding.
 */
WysiwygEditorToolBarBinding.prototype.toString = function () {
	
	return "[WysiwygEditorToolBarBinding]";
}

/**
 * Register for initialization when TinyMCE is loaded.
 * @overloads {ToolBarBinding#onBindingAttach}
 */
WysiwygEditorToolBarBinding.prototype.onBindingAttach = function () {
	
	WysiwygEditorToolBarBinding.superclass.onBindingAttach.call ( this );
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
WysiwygEditorToolBarBinding.prototype.initializeComponent = function ( editor, engine, instance, theme ) {

	this._editorBinding = editor;
	this._tinyEngine	= engine;
	this._tinyInstance 	= instance;
	this._tinyTheme 	= theme;
	
	this._editorBinding.addActionListener ( WysiwygEditorBinding.ACTION_INITIALIZED, this );
}

/**
 * @implements {IActionListener}
 * @param {Action} action
 */
WysiwygEditorToolBarBinding.prototype.handleAction = function ( action ) {

	var binding = action.target;

	switch ( action.type ) {
		case WysiwygEditorBinding.ACTION_INITIALIZED :
			if ( binding == this._editorBinding ) {
				this._initialize ();
			}
			break;
	}
}

/**
 * Fetch toolbar content from server. 
 * Template is cached upon next request.
 */
WysiwygEditorToolBarBinding.prototype._initialize = function () {

	var template = this.getProperty ( "template" );
	if ( template ) {
		this.subTreeFromString (
			Templates.getTemplateBodyText ( template )
		);
	} else {
		throw "Missing property: template";
	}
}