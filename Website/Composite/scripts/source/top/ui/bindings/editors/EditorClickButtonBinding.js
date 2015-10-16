EditorClickButtonBinding.prototype = new ClickButtonBinding;
EditorClickButtonBinding.prototype.constructor = EditorClickButtonBinding;
EditorClickButtonBinding.superclass = ClickButtonBinding.prototype;

/**
 * We need a special binding for buttons in the editor because IE will loose focus on  
 * the editor selection if any HTML element is clicked *except* form elements, IMG 
 * and A elements. We overload the method {@link ButtonBinding#buildDOMContent} 
 * to inject an IMG element absolutely positioned on top of the toolbarbutton subchildren.
 * @implements {IWysiwygEditorComponent}
 * @implements {IEditorControlBinding}
 * @class
 */
function EditorClickButtonBinding () {

	/**
	 * @type {SystemLogger}
	 */
	this.logger = SystemLogger.getLogger ( "EditorClickButtonBinding" );
	
	/**
	 * The containing editor.
	 * @type {WysiwygEditorBinding}
	 */
	this._editorBinding = null;
	
	/**
	 * Indicates that editors should not blur 
	 * the toolbars when binding is handled.
	 * @implements {IEditorControlBinding}
	 * @type {boolean}
	 */
	this.isEditorControlBinding = true;
	
	/**
	 * Indicates that editor should refocus 
	 * on the mouseup event.
	 * @type {boolean}
	 */
	this.isEditorSimpleControl = true;
	
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
	
	
	// TINYMCE CONTROL .............................................
	
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
	
	
	// CODEPRESS CONTROL .............................................
	
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
EditorClickButtonBinding.prototype.toString = function () {

	return "[EditorClickButtonBinding]";
}

/**
 * Register as editor component.
 * @overloads {ClickButtonBinding#onBindingAttach}
 */
EditorClickButtonBinding.prototype.onBindingAttach = function () {
	
	EditorClickButtonBinding.superclass.onBindingAttach.call ( this );
	this._setupEditorButton ();
}

/**
 * Setup as editor button.
 */
EditorClickButtonBinding.prototype._setupEditorButton = function () {

	this.cmd = this.getProperty ( "cmd" );
	this.val = this.getProperty ( "val" );
	this.gui = this.getProperty ( "gui" );
	
	if ( this.getProperty ( "editorcontrol" ) == false ) {
		this.isEditorControlBinding = false;
	}
	
	/*
	 * THIS WILL FAIL IN SOURCECODEEDITOR!
	 */
	var tinywindow = this.bindingWindow.bindingMap.tinywindow;
	var codepresswin = this.bindingWindow.bindingMap.codepresswindow;
	
	if ( tinywindow ) {
		EditorBinding.registerComponent ( this, tinywindow );
	} else if ( codepresswin ) {
		EditorBinding.registerComponent ( this, codepresswin );
	}
}

/**
 * @overloads {ButtonBinding#buildDOMContent}
 */
EditorClickButtonBinding.prototype.buildDOMContent = function () {

	EditorClickButtonBinding.superclass.buildDOMContent.call ( this );
	this._buildDesignModeSanitizer();

}

/**
 * Initialize as editor component.
 * @implements {IWysiwygEditorComponent}
 * @param {WysiwygEditorBinding} editor
 * @param {TinyMCE_Engine} engine
 * @param {TinyMCE_Control} instance
 * @param {TinyMCE_CompositeTheme} theme
 */
EditorClickButtonBinding.prototype.initializeComponent = function ( editor, engine, instance, theme ) {

	this._editorBinding = editor;
	this._tinyEngine	= engine;
	this._tinyInstance 	= instance;
	this._tinyTheme 	= theme;
	
	this._setupEditorBookmarking ();
}

/**
 * @implements {IWysiwygEditorComponent}
 * @param {SourceEditorBinding} editor
 * @param {HTMLIframeElement} frame
 * @param {CodePress} engine
 */
EditorClickButtonBinding.prototype.initializeSourceEditorComponent = function ( editor, frame, engine ) {
	
	this._editorBinding = editor;
	this._codePressFrame = frame;
	this._codePressEngine = engine;
}

/**
 * Places an IMG element on top of all other elements. This feature is 
 * disabled for Mozilla because it makes the button draggable; it's not 
 * needed in Mozilla anyway.
 */
EditorClickButtonBinding.prototype._buildDesignModeSanitizer = function () {

	if (Client.isAnyExplorer) {
		var img = this.bindingDocument.createElement ( "img" );
		img.className = "designmodesanitizer";
		img.src = Resolver.resolve("${root}/images/blank.png");
		img.ondragstart = function (e) { e.preventDefault(); }
		this.shadowTree.designmodesanitizer = img;
		this.bindingElement.appendChild(img);
	}
	
}


/**
 * Bookmark editor selection when the button is handled. 
 * @see {EditorClickButtonBinding#_setupEditorBookmarking}
 */
EditorClickButtonBinding.prototype._setupEditorBookmarking = function () {
	
	var editor = this._editorBinding;
	
	if ( editor != null ) {
		
		var self = this;
		var handler = { 
			handleEvent : function ( e ) {
				switch ( e.type ) {
					case DOMEvents.MOUSEDOWN :
						if ( !editor.hasBookmark ()) {
							editor.createBookmark ();
						}
						break;
					case DOMEvents.MOUSEUP :
						if ( self.isEditorSimpleControl ) {
							if ( self.popupBinding == null ) { // hacking a bit here...
								if ( editor.hasBookmark ()) {
									editor.restoreBookmark ();
								}
							}
						}
						break;
				}
			}
		};
		
		DOMEvents.addEventListener ( this.bindingElement, DOMEvents.MOUSEDOWN, handler );
		DOMEvents.addEventListener ( this.bindingElement, DOMEvents.MOUSEUP, handler );
	}
}

/**
 * EditorClickButtonBinding factory.
 * @param {DOMDocument} ownerDocument
 * @return {EditorClickButtonBinding}
 */
EditorClickButtonBinding.newInstance = function ( ownerDocument ) {

	var element = DOMUtil.createElementNS ( Constants.NS_UI, "ui:clickbutton", ownerDocument );
	return UserInterface.registerBinding ( element, EditorClickButtonBinding );
}