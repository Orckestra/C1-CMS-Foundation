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
	 * Indexing toolbarbuttons by value of the cmd attribute.
	 * @type {Map<string><EditorToolBarButtonBinding>}
	 */
	this._buttons = null;

	/**
	 * The containing editor.
	 * @type {BespinEditorBinding}
	 */
	this._editorBinding = null;
	
	/**
	 * @type {Bespin}
	 */
	this._bespinEditor = null;
	
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
	
	SourceEditorToolBarBinding.superclass.onBindingAttach.call ( this );
	
	/*
	var codepresswindow = this.bindingWindow.bindingMap.codepresswindow;
	if ( codepresswindow ) {
		EditorBinding.registerComponent ( this, codepresswindow );
	}
	*/
	
	var bespinwindow = this.bindingWindow.bindingMap.bespinwindow;
	EditorBinding.registerComponent ( this, bespinwindow );
}

/*
 * Index toolbar buttons.
 * @overloads {ToolBarBinding#onBindingInitialize}
 */
SourceEditorToolBarBinding.prototype.onBindingInitialize = function () {
	
	SourceEditorToolBarBinding.superclass.onBindingInitialize.call ( this )
	
	this._buttons = new Map ();
	
	if ( this._toolBarBodyLef != null ) {
		var buttons = this._toolBarBodyLeft.getDescendantBindingsByLocalName ( "toolbarbutton" );
		while ( buttons.hasNext ()) {
			var button = buttons.getNext ();
			if ( button.cmd != null ) {
				this._buttons.set ( 
					button.cmd, 
					button 
				);
			}
		}
	}
}

/**
 * @implements {IWysiwygEditorComponent}
 * @param {BespinEditorBinding} binding
 * @param {Bespin} editor
 */
SourceEditorToolBarBinding.prototype.initializeSourceEditorComponent = function ( binding, editor ) {

	this._editorBinding = binding;
	this._bespinEditor = editor;

	/*
	this._editorBinding = editor;
	this._codePressFrame = frame;
	this._codePressEngine = engine;
	*/
	
	/*
	 * Show XML tools?
	 */
	switch ( this._editorBinding.syntax ) {
		case BespinEditorBinding.syntax.XML :
		case BespinEditorBinding.syntax.XSL :
		case BespinEditorBinding.syntax.HTML :
			this.bindingWindow.bindingMap.xmltools.show ();
			break;
	}
}

/**
 * This handles all button commands.
 * @implements {IActionListener}
 * @overloads {Binding#handleAction}
 * @param {Action} action
 */
SourceEditorToolBarBinding.prototype.handleAction = function ( action ) {

	SourceEditorToolBarBinding.superclass.handleAction.call ( this, action );
	
	var page = this.bindingWindow.bindingMap.editorpage;
	
	switch ( action.type ) {
		case ButtonBinding.ACTION_COMMAND :
			var button = action.target;
			if ( button.cmd ) {
				switch ( button.cmd ) {
					case "plainview" :
						page.switchMode ( true );
						break;
					case "fancyview" :
						page.switchMode ( false );
						break;
				}
				this.updateButtons ();
			}
			break;
	}
}

/**
 * Hide one buttons, show the other. Presented as separate method 
 * because it gets invoked by SourceEditorPageBinding onload.
 */
SourceEditorToolBarBinding.prototype.updateButtons = function () {
	
	var cmd1 = window.bindingMap.editorpage.isPlainView ? "plainview" : "fancyview";
	var cmd2 = window.bindingMap.editorpage.isPlainView ? "fancyview" : "plainview";
	
	if ( this._buttons.has ( cmd1 ) && this._buttons.has ( cmd2 )) {
		this._buttons.get ( cmd1 ).hide ();
		this._buttons.get ( cmd2 ).show ();
	}
}

/** 
 * Exposing buttons so that outside fellows can control the toolbar.
 * @param {string} cmd
 * @return {EditorToolBarButtonBinding}
 */
SourceEditorToolBarBinding.prototype.getButtonForCommand = function ( cmd ) {
	
	return this._buttons.get ( cmd );
}

/**
 * Nothing to see yet...
 * @param {boolean} isDisabled
 */
SourceEditorToolBarBinding.prototype.setDisabled = function ( isDisabled ) {}