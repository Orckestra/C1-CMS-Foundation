SourceEditorToolBarBinding.prototype = new ToolBarBinding;
SourceEditorToolBarBinding.prototype.constructor = SourceEditorToolBarBinding;
SourceEditorToolBarBinding.superclass = ToolBarBinding.prototype;

/**
 * @class
 * @implements {IWysiwygEditorComponent}
 * @implements {IWysiwygEditorNodeChangeHandler}
 */
function SourceEditorToolBarBinding () {

	/**
	 * @type {SystemLogger}
	 */
	this.logger = SystemLogger.getLogger ( "SourceEditorToolBarBinding" );
	
	/**
	 * The containing editor.
	 * @type {CodemirrorEditorBinding}
	 */
	this._editorBinding = null;
	
	/**
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
SourceEditorToolBarBinding.prototype.toString = function () {
	
	return "[SourceEditorToolBarBinding]";
}

/**
 * Hookup broadcaster integration.
 * @overloads {ToolBarBinding#onBindingRegister}
 */
SourceEditorToolBarBinding.prototype.onBindingRegister = function () {
	
	SourceEditorToolBarBinding.superclass.onBindingRegister.call ( this );
	this.propertyMethodMap [ "isdisabled" ] = this.setDisabled;
	this.addActionListener ( ButtonBinding.ACTION_COMMAND );
}

/**
 * Register as editor component.
 * @overloads {ToolBarBinding#onBindingAttach}
 */
SourceEditorToolBarBinding.prototype.onBindingAttach = function () {

	SourceEditorToolBarBinding.superclass.onBindingAttach.call(this);

	var codemirrorwindow = this.bindingWindow.bindingMap.codemirrorwindow;
	EditorBinding.registerComponent(this, codemirrorwindow);
}

/**
 * @implements {IWysiwygEditorComponent}
 * @param {CodemirrorEditorBinding} binding
 * @param {Codemirror} editor
 */
SourceEditorToolBarBinding.prototype.initializeSourceEditorComponent = function (binding, editor) {

	this._editorBinding = binding;
	this._codemirrorEditor = editor;
	
	/*
	* Show XML tools?
	*/
	switch ( this._editorBinding.syntax ) {
		case CodeMirrorEditorBinding.syntax.XML:
		case CodeMirrorEditorBinding.syntax.XSL:
		case CodeMirrorEditorBinding.syntax.HTML:
			this.bindingWindow.bindingMap.xmltools.show ();
			break;
	}
}

/**
 * Nothing to see yet...
 * @param {boolean} isDisabled
 */
SourceEditorToolBarBinding.prototype.setDisabled = function ( isDisabled ) {}