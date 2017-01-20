SourceEditorInsertToolbarButtonBinding.prototype = new EditorToolBarButtonBinding;
SourceEditorInsertToolbarButtonBinding.prototype.constructor = SourceEditorInsertToolbarButtonBinding;
SourceEditorInsertToolbarButtonBinding.superclass = EditorToolBarButtonBinding.prototype;

/*
 * This could be elevated to a global utility function at some point.
 * UPDATE: now copied into CodePressCopyPasteManager!
 * UPDATE: now deprecated by intro of Codemirror
 * @param {string} code
 * @return {string}
 * @depreacated
 *
SourceEditorInsertToolbarButtonBinding._translate = function ( code ) {

	code = code.replace ( /&/gi, "&amp;" );
	code = code.replace ( /</g, "&lt;" );
	code = code.replace ( />/g, "&gt;" );
	return code;
}
*/

/**
 * @class
 */
function SourceEditorInsertToolbarButtonBinding () {

	/**
	 * @type {SystemLogger}
	 */
	this.logger = SystemLogger.getLogger ( "SourceEditorInsertToolbarButtonBinding" );

	/*
	 * Returnable.
	 */
	return this;
}

/**
 * Identifies binding.
 */
SourceEditorInsertToolbarButtonBinding.prototype.toString = function () {

	return "[SourceEditorInsertToolbarButtonBinding]";
}

/**
 * @overloads {ButtonBinding#onBindingAttach}
 */
SourceEditorInsertToolbarButtonBinding.prototype.onBindingAttach = function () {

	SourceEditorInsertToolbarButtonBinding.superclass.onBindingAttach.call ( this );
	this.popupBinding.addActionListener ( MenuItemBinding.ACTION_COMMAND, this );
	var codemirrorwindow = this.bindingWindow.bindingMap.codemirrorwindow;
	EditorBinding.registerComponent ( this, codemirrorwindow );
}

/**
 * @implements {IWysiwygEditorComponent}
 * @param {CodemirrorEditorBinding} binding
 * @param {Codemirror} editor
 */
SourceEditorInsertToolbarButtonBinding.prototype.initializeSourceEditorComponent = function ( binding, editor ) {

	this._editorBinding = binding;
	this._codemirrorEditor = editor;
}

/**
 * @implements {IActionListener}
 * @overloads {Binding#handleAction}
 * @param {Action} action
 */
SourceEditorInsertToolbarButtonBinding.prototype.handleAction = function ( action ) {

	SourceEditorInsertToolbarButtonBinding.superclass.handleAction.call ( this, action );

	var binding = action.target;

	switch ( action.type ) {

		case MenuItemBinding.ACTION_COMMAND :

			var cmd = binding.getProperty ( "cmd" );
			var val = binding.getProperty ( "val" );
			this.handleCommand ( cmd, null, val );
			break;
	}
}

/**
 * This has been isolated so that the contextmenu can invoke it.
 * @param {string} cmd
 * @param {string} gui
 * @param {string} val
 */
SourceEditorInsertToolbarButtonBinding.prototype.handleCommand = function ( cmd, gui, val ) {

	switch ( cmd ) {
		case "compositeInsert" :
			switch ( val ) {
				case "pageurl" :
					this._injectLinkable ( "Composite.Management.PageSelectorDialog" );
					break;
				case "imageurl" :
					this._injectLinkable ( "Composite.Management.ImageSelectorDialog" );
					break;
				case "mediaurl" :
					this._injectLinkable ( "Composite.Management.EmbeddableMediaSelectorDialog" );
					break;
				case "frontendurl" :
					this._injectLinkable ( "Composite.Management.FrontendFileSelectorDialog" );
					break;
				case "functionmarkup" :
					this._injectFunction ();
					break;
			}
			break;
	}
}

/**
 * Collect and inject linkable page, image or or media URL.
 * @param {string} handle
 */
SourceEditorInsertToolbarButtonBinding.prototype._injectLinkable = function ( handle ) {

	var def = ViewDefinitions [ handle ];

	var self = this;
	def.handler = {
		handleDialogResponse : function ( response, result ) {
			if ( response == Dialog.RESPONSE_ACCEPT ) {
				self._inject ( result.getFirst ());
			}
		}
	}

	Dialog.invokeDefinition ( def );
}

/**
 * Collect and inject function markup.
 */
SourceEditorInsertToolbarButtonBinding.prototype._injectFunction = function () {

	var def = ViewDefinitions [ "Composite.Management.FunctionSelectorDialog" ]; // "Composite.Management.XhtmlDocumentFunctionSelectorDialog"
	def.argument.nodes = [{
		key : "AllFunctionsElementProvider"
	}];

	var self = this;
	def.handler = {
		handleDialogResponse : function ( response, result ) {
			if ( response == Dialog.RESPONSE_ACCEPT ) {
				var functionName = result.getFirst ();
				var functionInfo = XhtmlTransformationsService.GetFunctionInfo ( functionName );
				if ( functionInfo.RequireConfiguration ) {
					self._injectFunctionConfiguration ( functionInfo.FunctionMarkup );
				} else {
				    self._injectFunctionMarkup(functionInfo.FunctionMarkup);
				}
			}
		}
	}

	Dialog.invokeDefinition(def, this._editorBinding);
}

/**
 * Collect and inject configured function markup.
 * @param {string} markup
 */
SourceEditorInsertToolbarButtonBinding.prototype._injectFunctionConfiguration = function ( markup ) {

	var self = this;
	var handler = {
		handleDialogResponse : function ( response, result ) {
			if ( response == Dialog.RESPONSE_ACCEPT ) {
			    self._injectFunctionMarkup(result);
			}
		}
	}

	EditorBinding.invokeFunctionEditorDialog(markup, handler, undefined, this._editorBinding);
}

/**
 * Inject result and trigger a syntaxhighlight.
 * @param {string} string
 */
SourceEditorInsertToolbarButtonBinding.prototype._injectFunctionMarkup = function (string) {

    switch (this._editorBinding.syntax) {
        case CodeMirrorEditorBinding.syntax.ASPX:
            string = string.replace(/(<f:function[^>]*) xmlns:f="[^"]*"/gi, '$1 runat="server"');
            string = string.replace(/(<f:param[^>]*) xmlns:f="[^"]*"/gi, '$1');
            break;
        default:
            break;
    }

    this._inject(string);
}

/**
 * Inject result and trigger a syntaxhighlight.
 * @param {string} string
 */
SourceEditorInsertToolbarButtonBinding.prototype._inject = function ( string ) {

	this._codemirrorEditor.replaceSelection(string);
	this._editorBinding.checkForDirty ();
}