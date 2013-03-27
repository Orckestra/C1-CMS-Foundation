SourceEditorFormatToolbarButtonBinding.prototype = new EditorToolBarButtonBinding;
SourceEditorFormatToolbarButtonBinding.prototype.constructor = SourceEditorFormatToolbarButtonBinding;
SourceEditorFormatToolbarButtonBinding.superclass = EditorToolBarButtonBinding.prototype;

/**
 * @class
 */
function SourceEditorFormatToolbarButtonBinding () {

	/**
	 * @type {SystemLogger}
	 */
	this.logger = SystemLogger.getLogger ( "SourceEditorFormatToolbarButtonBinding" );
	
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

	/**
	* Syntax defaults to plain text.
	* @type {string}
	*/
	this.syntax = new String(CodeMirrorEditorBinding.syntax.TEXT);

	/*
	 * Returnable.
	 */
	return this;
}

/**
 * Identifies binding.
 */
SourceEditorFormatToolbarButtonBinding.prototype.toString = function () {
	
	return "[SourceEditorFormatToolbarButtonBinding]";
}

/**
 * @overloads {EditorToolBarBinding#onBindingAttach}
 */
SourceEditorFormatToolbarButtonBinding.prototype.onBindingAttach = function () {
	
	SourceEditorFormatToolbarButtonBinding.superclass.onBindingAttach.call ( this );
	var codemirrorwindow = this.bindingWindow.bindingMap.codemirrorwindow;
	EditorBinding.registerComponent ( this, codemirrorwindow );
}

/**
 * @implements {IWysiwygEditorComponent}
 * @param {CodemirrorEditorBinding} binding
 * @param {Codemirror} editor
 */
SourceEditorFormatToolbarButtonBinding.prototype.initializeSourceEditorComponent = function (binding, editor) {

	this._editorBinding = binding;
	this._codemirrorEditor = editor;
	if (binding != null)
		this.syntax = binding.syntax;
}

/**
 * Format or die.
 * @overwrites {ToolBarButtonBinding#onCommand}
 */
SourceEditorFormatToolbarButtonBinding.prototype.oncommand = function () {
	
	/* 
	 * The timeout is simply to lock the GUI so that user knows we are working.
	 */
	Application.lock ( this );
	var self = this;
	setTimeout ( function () {
		self._doIt ();
	}, 0 );
}

/**
 * Do it.
 * @return
 */
SourceEditorFormatToolbarButtonBinding.prototype._doIt = function () {

    var markup = this._editorBinding.getContent();
	var dom = XMLParser.parse(markup, true);

	if (dom != null) {
		WebServiceProxy.isFaultHandler = false;
		var result;
		if (this.syntax == CodeMirrorEditorBinding.syntax.HTML) {
			result = MarkupFormatService.AutoIndentDocument(encodeURIComponent(markup));
		}
		else {
			result = MarkupFormatService.AutoIndentXml(encodeURIComponent(markup));
		}
		WebServiceProxy.isFaultHandler = true;
		if (result instanceof SOAPFault) {
			Application.unlock(this);
			this._editorBinding.validate();
		}
		else {
			bindingMap.editorpage.setContent(decodeURIComponent(result));
			this._editorBinding.checkForDirty();
			Application.unlock(this);
		}
	} else {
		Application.unlock(this);
		var editor = this._editorBinding;
		Dialog.warning(
			StringBundle.getString("Composite.Web.SourceEditor", "Format.XML.ErrorDialog.Title"),
			StringBundle.getString("Composite.Web.SourceEditor", "Format.XML.ErrorDialog.Text"),
			null,
			{
				handleDialogResponse: function () {
					editor.validate();
				}
			}
		);
	}
}

/**
 * This has been isolated so that the contextmenu can invoke it.
 * @param {string} cmd
 * @param {string} gui
 * @param {string} val
 */
SourceEditorFormatToolbarButtonBinding.prototype.handleCommand = function ( cmd, gui, val ) {
	
	this.oncommand ();
}

/**
 * @param {string} string
 * @param {string} token
 * @return {string}
 */
SourceEditorFormatToolbarButtonBinding.prototype._getStartString = function ( string, token ) {
	
	var result = null;
	if ( string.indexOf ( token ) > -1 ) {
		result = string.substring ( 0, string.indexOf ( token ));
	}
	return result;
}