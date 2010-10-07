BespinEditorBinding.prototype = new EditorBinding;
BespinEditorBinding.prototype.constructor = BespinEditorBinding;
BespinEditorBinding.superclass = EditorBinding.prototype;

BespinEditorBinding.ACTION_INITIALIZED = "bespineditor initialized";

/**
 * Supported syntax list (although not checked for).
 * TODO: CONSTRUCT BESPIN SYNTAX PLUGINS!
 * type {object}
 */
BespinEditorBinding.syntax = {
	
	TEXT 		: "text",
	XML			: "xml",
	XSL 		: "xsl",
	HTML 		: "html",
	CSS 		: "css",
	JAVASCRIPT 	: "js",
	CSHARP 		: "cs",
	SQL 		: "sql"
}

/**
 * @class
 */
function BespinEditorBinding () {

	/**
	 * @type {SystemLogger}
	 */
	this.logger = SystemLogger.getLogger ( "BespinEditorBinding" );
	
	/**
	 * @type {string}
	 */
	this.action_initialized = BespinEditorBinding.ACTION_INITIALIZED;

	/**
	 * Hosted document.
	 * @type {string}
	 */
	this.url_default = "${root}/content/misc/editors/bespineditor/bespineditor.aspx"; // language=${syntax} 
	
	/**
	 * @type {DocumentView}
	 */
	this._editorWindowBinding = null; 
	
	/**
	 * @type {Bespin}
	 */
	this._bespinEditor = null;
	
	/**
	 * @type {WHAT?}
	 */
	this._bespinEnvelope = null;
	
	/**
	 * @type {HTMLCanvasElement}
	 */
	this._bespinElement = null;
	
	/**
	 * Syntax defaults to plain text.
	 * @type {string}
	 */
	this.syntax = new String ( BespinEditorBinding.syntax.TEXT );
	
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
	 * @see {BespinEditorBinding#getContent}
	 * @overwrites {EditorBinding#_startContent}
	 *
	this._startContent = "\u200B";
	*/
	
	this._startContent = "";
	
	/*
	 * Returnable.
	 */
	return this;
}

/**
 * Identifies binding.
 */
BespinEditorBinding.prototype.toString = function () {

	return "[BespinEditorBinding]";
}

/**
 * @overloads {EditorBinding#onBindingRegister}
 */
BespinEditorBinding.prototype.onBindingRegister = function () {
	
	/* 
	 * Force an early indexation of BespinEditorBinding strings  
	 * to supress occasional glitches in string fetching.
	 */
	BespinEditorBinding.superclass.onBindingRegister.call ( this );
	StringBundle.getString ( "Composite.Web.SourceEditor", "Preload.Key" );
}

/**
 * @overloads {Binding#onBindingAttach}
 */
BespinEditorBinding.prototype.onBindingAttach = function () {
	
	/*
	 * Only Mozilla loads CodePress.
	 */
	if ( Client.isMozilla == true ) {
		this.subscribe ( BroadcastMessages.BESPIN_LOADED );
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
	 * Assign syntax. Fallback to HTML for XML and XSL.
	 * TODO: Create these syntax thingies for Bespin.
	 */
	this.syntax = this.getProperty ( "syntax" );
	switch ( this.syntax ) {
		case BespinEditorBinding.syntax.XML :
		case BespinEditorBinding.syntax.XSL :
			this.syntax = BespinEditorBinding.syntax.HTML; 
			break;
	}
	
	//this._url = this._url.replace ( "${syntax}", this.syntax );
	
	/*
	 * While developing, mount test file based on current syntax
	 * 
	if ( this.getProperty ( "debug" )) {
		this._startContent = Templates.getPlainText ( 
			"sourcecodeeditor/" + this.syntax + ".txt" 
		);
	}
	*/
	
	// finally call super method.
	BespinEditorBinding.superclass.onBindingAttach.call ( this );
}

/**
 * @implements {IBroadcastListener}
 * @param {string} broadcast
 * @param {object} arg
 */
BespinEditorBinding.prototype.handleBroadcast = function ( broadcast, arg ) {
	
	BespinEditorBinding.superclass.handleBroadcast.call ( this, broadcast, arg );
	
	switch ( broadcast ) {
		
		case BroadcastMessages.BESPIN_LOADED :
			
			/*
			Application.unlock ( this );
			this._isFinalized = true;
			this.dispatchAction ( this.action_initialized );
			*/
			
			var windowBinding = this.getContentWindow ().bindingMap.bespinwindow;
			
			if ( windowBinding != null ) {
				
				var contentWindow = windowBinding.getContentWindow ();
			
				if ( arg.broadcastWindow == contentWindow ) {
					
					// this.logger.debug ( DOMSerializer.serialize ( contentWindow.document.documentElement, true ));
					
					// identification
					this._bespinEnvelope = arg.bespinEnvelope;
					this._bespinEditor = arg.bespinEditor;
					this._bespinElement = this._bespinEditor.textView.domNode;
					
					// syntax and settings - hardcode ahead
					// TODO: Move this somewhere...
					this._bespinEditor.syntax = this.syntax;
					this._bespinEnvelope.settings.set ( "theme", "white" );
					this._bespinEnvelope.settings.set ( "fontface", "monospace" );
					this._bespinEnvelope.settings.set ( "fontsize", 13 );
					this._bespinEnvelope.settings.set ( "tabmode", "tabs" );
					this._bespinEnvelope.settings.set ( "tabstop", 4 );
					
					// init components 
					this.initializeEditorComponents ( windowBinding );
					
					// activation
					this._bespinElement.addEventListener ( DOMEvents.MOUSEDOWN, this, false );
					
					// dirtyfication
					var self = this;
					this._bespinEditor.textChanged.add ( function ( oldRange, newRange, newText ) {
						self.checkForDirty ();
					});
					
					/*
					 * We have the editor but do we have the page? 
					 * if yes, initialize, otherwise wait for page.
					 * @see {BespinEditorBinding#_onPageInitialize}
					 */
					if ( this._pageBinding != null ) {
						this._initialize ();
					}
					
					this.unsubscribe ( broadcast );
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
BespinEditorBinding.prototype._onPageInitialize = function ( binding ) {
	
	BespinEditorBinding.superclass._onPageInitialize.call ( this, binding );
	
	/*
	 * Mozilla depends on CodePress for initialize. Explorer may go ahead.
	 */
	if ( Client.isExplorer || this._bespinEditor != null ) {
		this._initialize ();
	}
}

/**
 * Debug editor HTML content.
 * TODO: Move to super?
 */
BespinEditorBinding.prototype.debug = function () {
	
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
 * Activate editor.
 * @param {boolean} isActivate 
 */
BespinEditorBinding.prototype._activateEditor = function ( isActivate ) {
	
	if ( isActivate != this._isActivated ) {
		
		this._isActivated = isActivate;
		EditorBinding.isActive = isActivate;
		
		var broadcaster = this.getContentWindow ().bindingMap.broadcasterIsActive;
		
		if ( broadcaster != null ) {
			if ( isActivate ) {
				broadcaster.enable ();
				this.focus ();
			} else {
				broadcaster.disable ();
				this.blur ();
			}
		} else {
			throw "Required broadcaster not found";
		}
		
		/*
		var handler = this.getEditorWindow ().standardEventHandler;
		var broadcaster = this.getContentWindow ().bindingMap.broadcasterIsActive;
		
		if ( broadcaster != null ) {
			if ( isActivate ) {
				 
				if ( this.hasBookmark ()) {
					this.deleteBookmark (); // no need to keep old bookmarks around
				}
				broadcaster.enable ();
				
				if ( Client.isExplorer ) { // fixes a glitch where Explorer needs multiple activations.
					this._sanitizeExplorer ();
				}
				
				this.focus ();
				handler.enableNativeKeys ( true );
				
			} else {
				
				broadcaster.disable ();
				handler.disableNativeKeys ();
				this.blur (); 
			}
		} else {
			throw "Required broadcaster not found";
		}
		*/
	}
}

/**
 * @param {string} cmd
 * @param {boolean} gui
 * @param {string} val
 */
BespinEditorBinding.prototype.handleCommand = function ( cmd, gui, val ) {
	
	var isCommandHandled = BespinEditorBinding.superclass.handleCommand.call ( this, cmd, val );
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
BespinEditorBinding.prototype._finalize = function () {
	
	this.setContent ( this._startContent );
	BespinEditorBinding.superclass._finalize.call ( this );
}

/**
 * Initialize component. After startup, this method is invoked 
 * directly by method EditorBinding.registerComponent.
 * @param {IEditorComponent} binding
 */
BespinEditorBinding.prototype.initializeEditorComponent = function ( binding ) {

	binding.initializeSourceEditorComponent ( 
		this, 
		this._bespinEditor
	);
}

/**
 * On clean, also clean the plaintext editor.
 * @overloads {EditorBinding#clean}
 */
BespinEditorBinding.prototype.clean = function () {
	
	BespinEditorBinding.superclass.clean.call ( this );
	this.getContentWindow ().bindingMap.editorpage.clean ();
}

/**
 * @param {MouseEvent} e
 */
BespinEditorBinding.prototype.handleContextMenu = function ( e ) {
	
	alert ( "BespinEditorBinding.prototype.handleContextMenu" );
	/*
	this._popupBinding.configure ( this, this._codePressFrame, this._codePressEngine );
	BespinEditorBinding.superclass.handleContextMenu.call ( this, e );
	*/
}

/**
 * @return {SourceCodeEditorPopupBinding}
 */
BespinEditorBinding.prototype.getEditorPopupBinding = function () {
	
	return top.app.bindingMap.sourcecodeeditorpopup;
}

/**
 * Get editor window.
 * @return {DOMDocumentView}
 */
BespinEditorBinding.prototype.getEditorWindow = function () {
	
	return this._codePressFrame.contentWindow;
}

/**
 * Get editor document.
 * @return {DOMDocument}
 */
BespinEditorBinding.prototype.getEditorDocument = function () {
	
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
BespinEditorBinding.prototype.setContent = function ( string ) {
	
	if ( !this._isFinalized ) {
		if ( string != this._startContent ) {
			this._startContent = string;
		}
	}
	
	if ( this.isInitialized && this.getContentWindow ().bindingMap != null ) {
	
		/* 
		 * In structured content, newlines are indicated by &#xA; 
		 * We replace this now, but it should be done elsewhere...
		 *
		string = string.replace ( /&#xA;/g, "\n" );
		*/
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
BespinEditorBinding.prototype.getContent = function () {
	
	var result = this.getContentWindow ().bindingMap.editorpage.getContent ();
	
	/*
	if ( result != null ) {
		result = result.replace ( /\u200B/g, "" ); // Firefox 4 beta bug hack.
	}
	*/
	
	return result ? result : "";
}

/**
 * Reset undo-redo history.
 */
BespinEditorBinding.prototype.resetUndoRedo = function () {
	
	/*
	this.logger.warn ( "BespinEditorBinding.prototype.resetUndoRedo!!!" );
	
	/*
	 * TODO: Migrate to custom undomanager!
	 * UPDATE: Don't we have one of those now?
	 *
	if ( this._codePressEngine ) {
		this._codePressEngine.actions.pos = -1;
	}
	*/
}

/**
 * Cover the editor (toolbars not covered). Used when the editor  
 * is embedded inside VisualEditorBinding; and other places.
 * @see {VisualEditorPageBinding#showEditor}
 * @param {boolean} isCover
 */
BespinEditorBinding.prototype.cover = function ( isCover ) {
	
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
BespinEditorBinding.prototype.updateElement = function ( element ) {
	
	if ( element != null && this.shadowTree.dotnetinput != null ) {
		var value = element.getAttribute ( "value" );
		if ( value != null && value != this.shadowTree.dotnetinput.value ) {
			this.setValue ( decodeURIComponent ( value ));
		}
	}
	
	return true; // stop crawling
};


/**
 * Not relevant for canvas-based editor!
 * TODO: Refactor this method chain.
 * @overwrites {EditorBinding#addEditorEvent}
 */
BespinEditorBinding.prototype.addEditorEvents = function () {}

/**
 * Not relevant for canvas-based editor!
 * TODO: Refactor this method chain.
 * @overwrites {EditorBinding#blurEditor}
 */
BespinEditorBinding.prototype.blurEditor = function () {}



// ABSTRACT METHODS ..........................................................

/**
 * Validate. This is currently only done for  
 * XML dialect syntax. Otherwise hardcoded "true".
 * @implements {IData}
 * @return {boolean}
 */
BespinEditorBinding.prototype.validate = function () {
	
	var result = true;
	var source = this.getContent ();
	
	if ( this._validator != null ) { // server side validation?
		
		result = Validator.validateInformed ( source, this._validator );
	
	} else {
		
		switch ( this.syntax ) {
			
			/*
			 * Validate markup languages.
			 */
			case BespinEditorBinding.syntax.XML :
			case BespinEditorBinding.syntax.XSL :
			case BespinEditorBinding.syntax.HTML :
				
				
				result = XMLParser.isWellFormedDocument ( source, true );
				
				/*
				 * Strict validation?
				 */
				if ( result == true && this._hasStrictValidation ) {
					switch ( this.syntax ) {
						case BespinEditorBinding.syntax.HTML :
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
BespinEditorBinding.prototype._isValidHTML = function ( xml ) {
	
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
BespinEditorBinding.prototype._isValidXSL = function () {
	
	return true;
}

/**
 * Get value. This is intended for serverside processing.
 * @implements {IData}
 * @return {string}
 */
BespinEditorBinding.prototype.getValue = BespinEditorBinding.prototype.getContent;

/**
 * Set value.
 * @implements {IData}
 * @param {string} value
 */
BespinEditorBinding.prototype.setValue = BespinEditorBinding.prototype.setContent;

/**
 * Get result. This is intended for clientside processing.
 * @implements {IData}
 * @return {object}
 */
BespinEditorBinding.prototype.getResult = BespinEditorBinding.prototype.getContent;

/**
 * Set result.
 * @implements {IData}
 * @param {object} result
 */
BespinEditorBinding.prototype.setResult = BespinEditorBinding.prototype.setContent;


/**
 * TODO!
 * Create selection bookmark, patching explorer focus dysfunction.
 */
BespinEditorBinding.prototype.createBookmark = function () {};

/** 
 * TODO!
 * Restore selection focus for explorer.
 */
BespinEditorBinding.prototype.restoreBookmark = function () {};

/**
 * TODO!
 * Has bookmark?
 * @return {boolean}
 */
BespinEditorBinding.prototype.hasBookmark = function () {};

/**
 * TODO!
 * Delete bookmark.
 */
BespinEditorBinding.prototype.deleteBookmark = function () {};

/**
 * Used to determine when a dirty flag should be raised.
 * @return {string}
 */
BespinEditorBinding.prototype.getCheckSum = function () {
	
	var result = null;
	var page = this._pageBinding;
	
	if ( page != null ) {
		result = page.getCheckSum ();
	}
	
	return result;
}