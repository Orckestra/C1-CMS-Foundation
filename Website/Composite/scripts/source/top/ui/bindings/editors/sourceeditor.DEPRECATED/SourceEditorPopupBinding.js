SourceEditorPopupBinding.prototype = new EditorPopupBinding;
SourceEditorPopupBinding.prototype.constructor = SourceEditorPopupBinding;
SourceEditorPopupBinding.superclass = EditorPopupBinding.prototype;

SourceEditorPopupBinding.CONTENT_TEMPLATE = "sourceeditor/popup.xml";

/**
 * @class
 */
function SourceEditorPopupBinding () {

	/**
	 * @type {SystemLogger}
	 */
	this.logger = SystemLogger.getLogger ( "SourceEditorPopupBinding" );
	
	/**
	 * The containing editor.
	 * @type {SourceEditorBinding}
	 */
	this._editorBinding = null;
	
	/**
	 * This element has been spirited with some extendo  
	 * functions constituting the core CorePress ballyhoo.  
	 * @type {HTMLIframeElement}
	 */
	this._codePressFrame = null;
	
	/**
	 * Somehow there are two CodePress objects in this 
	 * version of CodePress. This is the "engine" version.
	 * @type {CodePress}
	 */
	this._codePressEngine = null;
}

/**
 * Identifies binding.
 */
SourceEditorPopupBinding.prototype.toString = function () {

	return "[SourceEditorPopupBinding]";
}

/**
 * Configure contextmenu for the current source code editor.
 * @implements {IWysiwygEditorComponent}
 * @param {SourceEditorBinding} editor
 * @param {HTMLIframeElement} frame
 * @param {CodePress} engine
 */
SourceEditorPopupBinding.prototype.configure = function ( editor, frame, engine ) {

	this._editorBinding = editor;
	this._codePressFrame = frame;
	this._codePressEngine = engine;
	
	WysiwygEditorPopupBinding.superclass.configure.call ( this );
}

/**
 * Configure stuff.
 */
SourceEditorPopupBinding.prototype._configure = function () {
	
	/*
	 * Show XML tools?
	 */
	switch ( this._editorBinding.syntax ) {
		case SourceEditorBinding.syntax.XML :
		case SourceEditorBinding.syntax.XSL :
		case SourceEditorBinding.syntax.HTML :
			this._showMenuGroups ( "xml" );
			break;
		default :
			this._hideMenuGroups ( "xml" );
			break;
	}
}

/**
 * Handle that command.
 * @param {string} cmd
 * @param [string} gui
 * @param {string} val
 */
SourceEditorPopupBinding.prototype.handleCommand = function ( cmd, gui, val ) {
	
	var win = this._editorBinding.getContentWindow ();
	var but = null;
	
	switch ( cmd ) {
		
		case "compositeInsert" :	
			but = win.bindingMap.insertbutton;
			break;
			
		case "compositeFormat" :
			but = win.bindingMap.formatbutton;
			break;
	}
	
	if ( but != null ) {
		but.handleCommand ( cmd, gui, val );
	}
}