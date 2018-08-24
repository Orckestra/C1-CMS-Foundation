SourceEditorToggleWordWrapToolbarButtonBinding.prototype = new EditorToolBarButtonBinding;
SourceEditorToggleWordWrapToolbarButtonBinding.prototype.constructor = SourceEditorToggleWordWrapToolbarButtonBinding;
SourceEditorToggleWordWrapToolbarButtonBinding.superclass = EditorToolBarButtonBinding.prototype;

/**
 * @class
 */
function SourceEditorToggleWordWrapToolbarButtonBinding () {

	/**
	 * @type {SystemLogger}
	 */
	this.logger = SystemLogger.getLogger ( "SourceEditorToggleWordWrapToolbarButtonBinding" );

	/**
	 * The containing editor.
	 * @type {SourceEditorBinding}
	 */
	this._editorBinding = null;

	/**
	 * The codemirror editor.
	 * @type {Codemirror}
	 */
	this._codemirrorEditor = null;

	/*
	 * Returnable.
	 */
	return this;
}

/**
 * Identifies binding.
 */
SourceEditorToggleWordWrapToolbarButtonBinding.prototype.toString = function () {

	return "[SourceEditorToggleWordWrapToolbarButtonBinding]";
}

/**
 * @overloads {EditorToolBarBinding#onBindingAttach}
 */
SourceEditorToggleWordWrapToolbarButtonBinding.prototype.onBindingAttach = function () {

	SourceEditorToggleWordWrapToolbarButtonBinding.superclass.onBindingAttach.call ( this );
	var codemirrorwindow = this.bindingWindow.bindingMap.codemirrorwindow;
	EditorBinding.registerComponent ( this, codemirrorwindow );
}

/**
 * @implements {IWysiwygEditorComponent}
 * @param {CodemirrorEditorBinding} binding
 * @param {Codemirror} editor
 */
SourceEditorToggleWordWrapToolbarButtonBinding.prototype.initializeSourceEditorComponent = function ( binding, editor ) {

	this._editorBinding = binding;
    this._codemirrorEditor = editor;
}

/**
 * 
 * @overwrites {ToolBarButtonBinding#onCommand}
 */
SourceEditorToggleWordWrapToolbarButtonBinding.prototype.oncommand = function () {
	
	var self = this;	
	this._codemirrorEditor.setOption("lineWrapping", !this._codemirrorEditor.getOption("lineWrapping"));
    localStorage.setItem("lineWrapping", this._codemirrorEditor.getOption("lineWrapping"));
}

/**
 * This has been isolated so that the contextmenu can invoke it.
 * @param {string} cmd
 * @param {string} gui
 * @param {string} val
 */
SourceEditorToggleWordWrapToolbarButtonBinding.prototype.handleCommand = function ( cmd, gui, val ) {

	this.oncommand ();
}

/**
 * @param {string} string
 * @param {string} token
 * @return {string}
 */
SourceEditorToggleWordWrapToolbarButtonBinding.prototype._getStartString = function ( string, token ) {

	var result = null;
	if ( string.indexOf ( token ) > -1 ) {
		result = string.substring ( 0, string.indexOf ( token ));
	}
	return result;
}
