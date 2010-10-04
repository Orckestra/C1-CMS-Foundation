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
	var codepresswindow = this.bindingWindow.bindingMap.codepresswindow;
	if ( codepresswindow ) {
		EditorBinding.registerComponent ( this, codepresswindow );
	}
}

/*
 * Index toolbar buttons.
 * @overloads {ToolBarBinding#onBindingInitialize}
 */
SourceEditorToolBarBinding.prototype.onBindingInitialize = function () {
	
	SourceEditorToolBarBinding.superclass.onBindingInitialize.call ( this )
	
	this._buttons = new Map ();
	
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

/**
 * @implements {IWysiwygEditorComponent}
 * @param {SourceEditorBinding} editor
 * @param {HTMLIframeElement} frame
 * @param {CodePress} engine
 */
SourceEditorToolBarBinding.prototype.initializeSourceEditorComponent = function ( editor, frame, engine ) {

	this._editorBinding = editor;
	this._codePressFrame = frame;
	this._codePressEngine = engine;
	
	/*
	 * Show XML tools?
	 */
	switch ( this._editorBinding.syntax ) {
		case SourceEditorBinding.syntax.XML :
		case SourceEditorBinding.syntax.XSL :
		case SourceEditorBinding.syntax.HTML :
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
	
	this._buttons.get ( cmd1 ).hide ();
	this._buttons.get ( cmd2 ).show ();
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