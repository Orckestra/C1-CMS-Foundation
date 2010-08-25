SourceEditorBinding.prototype = new EditorBinding;
SourceEditorBinding.prototype.constructor = SourceEditorBinding;
SourceEditorBinding.superclass = EditorBinding.prototype;

SourceEditorBinding.ACTION_INITIALIZED = "sourceeditor initialized";

/**
 * Supported syntax list (although not checked for).
 * type {object}
 */
SourceEditorBinding.syntax = {
	
	XML			: "xml",
	ASP 		: "asp",
	CSHARP 		: "csharp",
	CSS 		: "css",
	HTML 		: "html",
	JAVA 		: "java",
	JAVASCRIPT 	: "javascript",
	PERL 		: "perl",
	PHP 		: "php",
	RUBY 		: "ruby",
	SQL 		: "sql",
	TEXT 		: "text",
	VBSCRIPT 	: "vbscript",
	XSL 		: "xsl"
}

/**
 * @class
 */
function SourceEditorBinding () {

	/**
	 * @type {SystemLogger}
	 */
	this.logger = SystemLogger.getLogger ( "SourceEditorBinding" );
	
	/**
	 * @type {string}
	 */
	this.action_initialized = SourceEditorBinding.ACTION_INITIALIZED;

	/**
	 * Hosted document.
	 * @type {string}
	 */
	this.url_default = "${root}/content/misc/editors/sourceeditor/sourceeditor.aspx?language=${syntax}";
	
	/**
	 * @type {DocumentView}
	 */
	this._editorWindowBinding = null; 
	
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
	
	/**
	 * Syntax defaults to plain text.
	 * @type {string}
	 */
	this.syntax = new String ( SourceEditorBinding.syntax.TEXT );
	
	/**
	 * @type {boolean}
	 */
	this._isPlainEditMode = false;
	
	/**
	 * @implements {IData}
	 * @type {boolean}
	 */
	this.isFocusable = true;
	
	/**
	 * True when embedded inside the visual editor. 
	 * TODO: Convert to public property - remove the underscore!
	 * @type {boolean}
	 */
	this._isEmbedded = false;
	
	/**
	 * Flip this by the "validate" property. When true, content 
	 * will be validated according to a stricter ruleset. For now, 
	 * this is only enabled for HTML syntax files.
	 */
	this._hasStrictValidation = false;
	
	/**
	 * This new thingy will rule all validation.
	 * TODO: Deprecate _hasStrictValidation eventually...
	 * @type {String}
	 */
	this._validator = null;
	
	/**
	 * Firefox 4 beta seems to have a problem with completely empty 
	 * documents (the root PRE tag is missing) so we will fallback 
	 * to this zero-width-space. Removed again on save.
	 * @see {SourceEditorBinding#getContent}
	 * @overwrites {EditorBinding#_startContent}
	 */
	this._startContent = "\u200B";
	
	/*
	 * Returnable.
	 */
	return this;
}

/**
 * Identifies binding.
 */
SourceEditorBinding.prototype.toString = function () {

	return "[SourceEditorBinding]";
}

/**
 * @overloads {EditorBinding#onBindingRegister}
 */
SourceEditorBinding.prototype.onBindingRegister = function () {
	
	/* 
	 * Force an early indexation of SourceEditorBinding strings  
	 * to supress occasional glitches in string fetching.
	 */
	SourceEditorBinding.superclass.onBindingRegister.call ( this );
	StringBundle.getString ( "Composite.Web.SourceEditor", "Preload.Key" );
}

/**
 * @overloads {Binding#onBindingAttach}
 */
SourceEditorBinding.prototype.onBindingAttach = function () {
	
	/*
	 * Only Mozilla loads CodePress.
	 */
	if ( Client.isMozilla == true ) {
		this.subscribe ( BroadcastMessages.CODEPRESS_INITIALIZED );
	}
	
	/*
	 * This has something to do with the editor 
	 * being embedded inside the visual editor.
	 * TODO: Refactor out this weird hardcode.
	 */
	if ( this.getProperty ( "embedded" ) == true ) {
		this._isEmbedded = true;
	}
	
	/*
	 * Enable strict validation?
	 */
	var validate = this.getProperty ( "validate" );
	if ( validate == true ) {
		this._hasStrictValidation = true;
	}
	
	/*
	 * Assign a validator?
	 */
	var validator = this.getProperty ( "validator" );
	if ( validator != null ) {
		this._validator = validator;
	}
	
	/*
	 * Modify URL to reflect syntax.
	 */
	this.syntax = this.getProperty ( "syntax" );
	this._url = this._url.replace ( "${syntax}", this.syntax );
	
	/*
	 * While developing, mount test file based on current syntax
	 */ 
	if ( this.getProperty ( "debug" )) {
		this._startContent = Templates.getPlainText ( 
			"sourcecodeeditor/" + this.syntax + ".txt" 
		);
	}
	
	// finally call super method.
	SourceEditorBinding.superclass.onBindingAttach.call ( this );
}

/**
 * @implements {IBroadcastListener}
 * @param {string} broadcast
 * @param {object} arg
 */
SourceEditorBinding.prototype.handleBroadcast = function ( broadcast, arg ) {
	
	SourceEditorBinding.superclass.handleBroadcast.call ( this, broadcast, arg );
	
	switch ( broadcast ) {
	
		case BroadcastMessages.CODEPRESS_INITIALIZED :
			
			var windowBinding = this.getContentWindow ().bindingMap.codepresswindow;
			
			if ( windowBinding ) {
				
				var contentWindow = windowBinding.getContentWindow ();
			
				if ( arg.broadcastWindow == contentWindow ) {
					
					this._editorWindowBinding = windowBinding;
					this._codePressFrame = arg.codePressFrame;
					this._codePressEngine = arg.codePressFrame.editor;
					
					this.initializeEditorComponents ( windowBinding );
					
					/*
					 * We have the editor but do we have the page? 
					 * if yes, initialize, otherwise wait for page.
					 * @see {SourceEditorBinding#_onPageInitialize}
					 */
					if ( this._pageBinding != null ) {
						this._initialize ();
					}
					
					/*
					 * When embedded, this is handled by the containing page.
					 * Becuase in that case, the editor is covered by a cover.
					 * @see {WysigwygEditorPageBinding#handleAction}
					 */	
					if ( !this._isEmbedded ) {
						this.blurEditor ();
					}
					
					this.unsubscribe ( BroadcastMessages.CODEPRESS_INITIALIZED );
				}
			}
			break;
	}
}

/**
 * Invoked when contained page initializes.
 * @overloads {EditorBinding#_onPageInitialze}
 * @param {PageBinding} binding
 */
SourceEditorBinding.prototype._onPageInitialize = function ( binding ) {
	
	SourceEditorBinding.superclass._onPageInitialize.call ( this, binding );
	
	/*
	 * Mozilla depends on CodePress for initialize. Explorer may go ahead.
	 */
	if ( Client.isExplorer || this._codePressEngine != null ) {
		this._initialize ();
	}
}

/**
 * Debug editor HTML content.
 * TODO: Move to super?
 */
SourceEditorBinding.prototype.debug = function () {
	
	var html = this.getEditorDocument ().body.innerHTML;
	if ( Client.isMozilla ) {
		html = html.replace(/<br>/g,"<br/>");
		html = html.replace(/\t/g,"....");
		var dom = XMLParser.parse ( html );
		if ( dom ) {
			html = DOMSerializer.serialize ( dom, true );
		}
	} else {
		html = "Debug not supported in IE.";
	}
	this.logger.debug ( html );
}

/**
 * @param {string} cmd
 * @param {boolean} gui
 * @param {string} val
 */
SourceEditorBinding.prototype.handleCommand = function ( cmd, gui, val ) {
	
	var isCommandHandled = SourceEditorBinding.superclass.handleCommand.call ( this, cmd, val );
	/*
	 * THIS IS NOT YET SUPPORTED BY GUI!
	 */
	switch ( cmd ) {
		case "Paste" :
			this._codePressFrame.syntaxHighlight ( "generic" );
			break;
	}
	return isCommandHandled;
}

/**
 * Finalize initialization.
 * @overloads {EditorBinding._finalize}
 */
SourceEditorBinding.prototype._finalize = function () {
	
	this.setContent ( this._startContent );
	SourceEditorBinding.superclass._finalize.call ( this );
}

/**
 * Initialize component. After startup, this method is invoked 
 * directly by method EditorBinding.registerComponent.
 * @param {IEditorComponent} binding
 */
SourceEditorBinding.prototype.initializeEditorComponent = function ( binding ) {

	binding.initializeSourceEditorComponent ( 
		this, 
		this._codePressFrame,
		this._codePressEngine
	);
}

/**
 * On clean, also clean the plaintext editor.
 * @overloads {EditorBinding#clean}
 */
SourceEditorBinding.prototype.clean = function () {
	
	SourceEditorBinding.superclass.clean.call ( this );
	this.getContentWindow ().bindingMap.editorpage.clean ();
}

/**
 * @param {MouseEvent} e
 */
SourceEditorBinding.prototype.handleContextMenu = function ( e ) {
	
	this._popupBinding.configure ( this, this._codePressFrame, this._codePressEngine );
	SourceEditorBinding.superclass.handleContextMenu.call ( this, e );
}

/**
 * @return {SourceCodeEditorPopupBinding}
 */
SourceEditorBinding.prototype.getEditorPopupBinding = function () {
	
	return top.app.bindingMap.sourcecodeeditorpopup;
}

/**
 * Get editor window.
 * @return {DOMDocumentView}
 */
SourceEditorBinding.prototype.getEditorWindow = function () {
	
	return this._codePressFrame.contentWindow;
}

/**
 * Get editor document.
 * @return {DOMDocument}
 */
SourceEditorBinding.prototype.getEditorDocument = function () {
	
	var result = null;
	if ( this._codePressFrame != null ) {
		result = this._codePressFrame.contentWindow.document;
	}
	return result;
}

/**
 * Set content.
 * @param {string} string
 * @return {boolean} True if content can be mounted. HARDCODED for now.
 */
SourceEditorBinding.prototype.setContent = function ( string ) {
	
	if ( !this._isFinalized ) {
		if ( string != this._startContent ) {
			this._startContent = string;
		}
	}
	
	if ( this.isInitialized && this.getContentWindow ().bindingMap != null ) {
	
		/* 
		 * In structured content, newlines are indicated by &#xA; 
		 * We replace this now, but it should be done elsewhere...
		 */  
		string = string.replace ( /&#xA;/g, "\n" );
		this.getContentWindow ().bindingMap.editorpage.setContent ( string );
		this.resetUndoRedo ();
		
		/*
		 * Reset checksum system.
		 */
		this._checksum = this.getCheckSum ();
	
	}
		
	/*
	 * HARDCODED!
	 * TODO: Validate stuff here?
	 */
	return true; // 
}

/**
 * Get content.
 * @return {string}
 */
SourceEditorBinding.prototype.getContent = function () {
	
	var result = this.getContentWindow ().bindingMap.editorpage.getContent ();
	if ( result != null ) {
		result = result.replace ( /\u200B/g, "" ); // Firefox 4 beta bug hack.
	}
	return result ? result : "";
}

/**
 * Reset undo-redo history.
 */
SourceEditorBinding.prototype.resetUndoRedo = function () {
	
	this.logger.warn ( "SourceEditorBinding.prototype.resetUndoRedo!!!" );
	
	/**
	 * TODO: Migrate to custom undomanager!
	 * UPDATE: Don't we have one of those now?
	 */
	if ( this._codePressEngine ) {
		this._codePressEngine.actions.pos = -1;
	}
}

/**
 * Cover the editor (toolbars not covered). Used when the editor  
 * is embedded inside VisualEditorBinding; and other places.
 * @see {VisualEditorPageBinding#showEditor}
 * @param {boolean} isCover
 */
SourceEditorBinding.prototype.cover = function ( isCover ) {
	
	if ( this._pageBinding != null ) {
		this._pageBinding.cover ( isCover );
	}
}

/**
 * TODO: MOVE TO SUPER! And implement for VisualEditor as well...
 * @implements {IUpdateHandler}
 * @overwrites {EditorBinding#updateElement}
 * @param {Element} element
 */
SourceEditorBinding.prototype.updateElement = function ( element ) {
	
	if ( element != null && this.shadowTree.dotnetinput != null ) {
		var value = element.getAttribute ( "value" );
		if ( value != null && value != this.shadowTree.dotnetinput.value ) {
			this.setValue ( decodeURIComponent ( value ));
		}
	}
	
	return true; // stop crawling
};

// ABSTRACT METHODS ..........................................................

/**
 * Focus.
 * @implements {IFocusable}
 *
SourceEditorBinding.prototype.focus = function () {
	
	this.dispatchAction ( Binding.ACTION_FOCUSED );
};

/**
 * Blur.
 * @implements {IFocusable}
 *
SourceEditorBinding.prototype.blur = function () {};
*/

/**
 * Validate. This is currently only done for  
 * XML dialect syntax. Otherwise hardcoded "true".
 * @implements {IData}
 * @return {boolean}
 */
SourceEditorBinding.prototype.validate = function () {
	
	var result = true;
	var source = this.getContent ();
	
	if ( this._validator != null ) { // server side validation?
		
		result = Validator.validateInformed ( source, this._validator );
	
	} else {
		
		switch ( this.syntax ) {
			
			/*
			 * Validate markup languages.
			 */
			case SourceEditorBinding.syntax.XML :
			case SourceEditorBinding.syntax.XSL :
			case SourceEditorBinding.syntax.HTML :
				
				
				result = XMLParser.isWellFormedDocument ( source, true );
				
				/*
				 * Strict validation?
				 */
				if ( result == true && this._hasStrictValidation ) {
					switch ( this.syntax ) {
						case SourceEditorBinding.syntax.HTML :
							result = this._isValidHTML ( source );
							break;
					}
				}
				break;
		}
	}
	return result;
};

/**
 * Basic XHTML checker.
 * TODO: Schema-validate this stuff on the server!
 * @return {boolean}
 */
SourceEditorBinding.prototype._isValidHTML = function ( xml ) {
	
	var result = true;
	var doc = XMLParser.parse ( xml );
	var errors = new List ();
	
	/*
	 * Collect errors.
	 */
	if ( doc != null ) {
		
		var root = doc.documentElement;
		if ( root.nodeName != "html" ) {
			errors.add ( "MissingHtml" );
		}
		if ( root.namespaceURI != Constants.NS_XHTML ) {
			errors.add ( "NamespaceURI" );
		}
		var head = null, body = null;
		var children = new List ( root.childNodes );
		while ( children.hasNext ()) {
			var child = children.getNext ();
			if ( child.nodeType == Node.ELEMENT_NODE ) {
				switch ( child.nodeName ) {
					case "head" :
						if ( head != null ) {
							errors.add ( "MultipleHead" );
						}
						if ( body != null ) {
							errors.add ( "HeadBodyIndex" );
						}
						head = child;
						break;
					case "body" :
						if ( body != null ) {
							errors.add ( "MultipleBody" );
						}
						body = child;
						break;
				}
			}
		}
		if ( head == null ) {
			errors.add ( "MissingHead" );
		}
		if ( body == null ) {
			errors.add ( "MissingBody" );
		}
	}
	
	/*
	 * Show dialog if errors.
	 */
	if ( errors.hasEntries ()) {
		result = false;
		Dialog.error ( 
			StringBundle.getString ( "Composite.Web.SourceEditor", "Invalid.HTML.DialogTitle" ),
			StringBundle.getString ( "Composite.Web.SourceEditor", "Invalid.HTML." + errors.getFirst ())
		);
	}
	
	return result;
}

/**
 * Basic XSL checker. Result is HARDCODED for now.
 * @return {boolean}
 */
SourceEditorBinding.prototype._isValidXSL = function () {
	
	return true;
}

/**
 * Get value. This is intended for serverside processing.
 * @implements {IData}
 * @return {string}
 */
SourceEditorBinding.prototype.getValue = SourceEditorBinding.prototype.getContent;

/**
 * Set value.
 * @implements {IData}
 * @param {string} value
 */
SourceEditorBinding.prototype.setValue = SourceEditorBinding.prototype.setContent;

/**
 * Get result. This is intended for clientside processing.
 * @implements {IData}
 * @return {object}
 */
SourceEditorBinding.prototype.getResult = SourceEditorBinding.prototype.getContent;

/**
 * Set result.
 * @implements {IData}
 * @param {object} result
 */
SourceEditorBinding.prototype.setResult = SourceEditorBinding.prototype.setContent;


/**
 * TODO!
 * Create selection bookmark, patching explorer focus dysfunction.
 */
SourceEditorBinding.prototype.createBookmark = function () {};

/** 
 * TODO!
 * Restore selection focus for explorer.
 */
SourceEditorBinding.prototype.restoreBookmark = function () {};

/**
 * TODO!
 * Has bookmark?
 * @return {boolean}
 */
SourceEditorBinding.prototype.hasBookmark = function () {};

/**
 * TODO!
 * Delete bookmark.
 */
SourceEditorBinding.prototype.deleteBookmark = function () {};

/**
 * Used to determine when a dirty flag should be raised.
 * @return {string}
 *
SourceEditorBinding.prototype.getCheckSum = function () {
	
	var result = null;
	var page = this._pageBinding;
	
	if ( page != null ) {
		result = page.getCheckSum ();
	}
	
	return result;
}
*/