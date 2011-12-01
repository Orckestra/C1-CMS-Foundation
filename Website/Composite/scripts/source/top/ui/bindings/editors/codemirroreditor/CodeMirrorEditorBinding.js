CodeMirrorEditorBinding.prototype = new EditorBinding;
CodeMirrorEditorBinding.prototype.constructor = CodeMirrorEditorBinding;
CodeMirrorEditorBinding.superclass = EditorBinding.prototype;

CodeMirrorEditorBinding.ACTION_INITIALIZED = "codemirroreditor initialized";

/**
* Supported syntax list (although not checked for).
* TODO: CONSTRUCT CODEMIRROR SYNTAX PLUGINS!
* type {object}
*/
CodeMirrorEditorBinding.syntax = {

	TEXT: "text",
	XML: "xml",
	XSL: "xsl",
	HTML: "html",
	CSS: "css",
	JAVASCRIPT: "js",
	CSHARP: "cs",
	CSHTML: "cshtml",
	SQL: "sql"
}

/**
* @class
*/
function CodeMirrorEditorBinding() {

	/**
	* @type {SystemLogger}
	*/
	this.logger = SystemLogger.getLogger("CodeMirrorEditorBinding");

	/**
	* @type {string}
	*/
	this.action_initialized = CodeMirrorEditorBinding.ACTION_INITIALIZED;

	/**
	* Hosted document.
	* @type {string}
	*/
	this.url_default = "${root}/content/misc/editors/codemirroreditor/codemirroreditor.aspx"; // language=${syntax} 

	/**
	* TODO: Is this used?
	* @type {DocumentView}
	*/
	this._editorWindowBinding = null;

	/**
	* @type {DocumentView}
	*/
	this._codemirrorWindow = null;

	/**
	* @type {CodeMirror}
	*/
	this._codemirrorEditor = null;

	/**
	* @type {codemirrorWrapperElement}
	*/
	this._codemirrorWrapperElement = null;

	/**
	* Syntax defaults to plain text.
	* @type {string}
	*/
	this.syntax = new String(CodeMirrorEditorBinding.syntax.TEXT);

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
	* @see {CodeMirrorEditorBinding#getContent}
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
CodeMirrorEditorBinding.prototype.toString = function () {

	return "[CodeMirrorEditorBinding]";
}

/**
* @overloads {EditorBinding#onBindingRegister}
*/
CodeMirrorEditorBinding.prototype.onBindingRegister = function () {

	/* 
	* Force an early indexation of CodeMirrorEditorBinding strings  
	* to supress occasional glitches in string fetching.
	*/
	CodeMirrorEditorBinding.superclass.onBindingRegister.call(this);
	StringBundle.getString("Composite.Web.SourceEditor", "Preload.Key");
}

/**
* @overloads {Binding#onBindingAttach}
*/
CodeMirrorEditorBinding.prototype.onBindingAttach = function () {

	/*
	* Only Mozilla loads CodePress.
	*/
	//if ( Client.isMozilla == true ) {
	this.subscribe(BroadcastMessages.CODEMIRROR_LOADED);
	//}

	/*
	* This has something to do with the editor 
	* being embedded inside the visual editor.
	* TODO: Refactor out this weird hardcode.
	*/
	if (this.getProperty("embedded") == true) {
		this._isEmbedded = true;
	}

	/*
	* Enable strict validation?
	*/
	var validate = this.getProperty("validate");
	if (validate == true) {
		this._hasStrictValidation = true;
	}

	/*
	* Assign a validator?
	*/
	var validator = this.getProperty("validator");
	if (validator != null) {
		this._validator = validator;
	}

	/*
	* Assign syntax. Fallback to HTML for XML and XSL.
	* TODO: Create these syntax thingies for CodeMirror.
	*/
	this.syntax = this.getProperty("syntax");
	switch (this.syntax) {
		case CodeMirrorEditorBinding.syntax.XML:
		case CodeMirrorEditorBinding.syntax.XSL:
			this.syntax = CodeMirrorEditorBinding.syntax.HTML;
			break;
	}

	/*
	* While developing, mount test file based on current syntax
	*/
	if (this.getProperty("debug")) {
		this._startContent = Templates.getPlainText(
			"sourcecodeeditor/" + this.syntax + ".txt"
		);
	}

	// finally call super method.
	CodeMirrorEditorBinding.superclass.onBindingAttach.call(this);
}

/**
* @implements {IBroadcastListener}
* @param {string} broadcast
* @param {object} arg
*/
CodeMirrorEditorBinding.prototype.handleBroadcast = function (broadcast, arg) {

	CodeMirrorEditorBinding.superclass.handleBroadcast.call(this, broadcast, arg);
	switch (broadcast) {

		case BroadcastMessages.CODEMIRROR_LOADED:

			/*
			Application.unlock ( this );
			this._isFinalized = true;
			this.dispatchAction ( this.action_initialized );
			*/

			var windowBinding = this.getContentWindow().bindingMap.codemirrorwindow;

			if (windowBinding != null) {

				var contentWindow = windowBinding.getContentWindow();

				if (arg.broadcastWindow == contentWindow) {


					// identification
					this._codemirrorWindow = contentWindow;
					this._codemirrorEditor = arg.codemirrorEditor;
					this._codemirrorWrapperElement = arg.codemirrorEditor.getWrapperElement();

					// syntax
					switch (this.syntax) {
						case CodeMirrorEditorBinding.syntax.XML:
							this._codemirrorEditor.setOption("mode", "application/xml");
							break;
						case CodeMirrorEditorBinding.syntax.XSL:
						case CodeMirrorEditorBinding.syntax.HTML:
							this._codemirrorEditor.setOption("mode", "text/html");
							break;
						case CodeMirrorEditorBinding.syntax.CSS:
							this._codemirrorEditor.setOption("mode", "text/css");

							break;
						case CodeMirrorEditorBinding.syntax.CSHARP:
						case CodeMirrorEditorBinding.syntax.CSHTML:
							this._codemirrorEditor.setOption("mode", "text/x-csharp");
							break;
						case CodeMirrorEditorBinding.syntax.JAVASCRIPT:
							this._codemirrorEditor.setOption("mode", "text/javascript");
							break;
						case CodeMirrorEditorBinding.syntax.SQL:
							this._codemirrorEditor.setOption("mode", "");
						case CodeMirrorEditorBinding.syntax.TEXT:
							this._codemirrorEditor.setOption("mode", "");
							break;
					}


					// init components 
					this.initializeEditorComponents(windowBinding);

					


					// dirtyfication
					var self = this;

					this._codemirrorEditor.setOption("onChange",
						function (e) {
							self.checkForDirty();
						}
					);

					this._codemirrorEditor.setOption("onFocus",
						function (e) {
							self._activateEditor(true);
						}
					);

//					this._codemirrorEditor.setOption("onBlur",
//						function (e) {
//							self._activateEditor(false);
//						}
//					);

					/*
					* We have the editor but do we have the page? 
					* if yes, initialize, otherwise wait for page.
					* @see {CodeMirrorEditorBinding#_onPageInitialize}
					*/
					if (this._pageBinding != null) {
						this._initialize();
					}

					this.unsubscribe(broadcast);
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
CodeMirrorEditorBinding.prototype._onPageInitialize = function (binding) {

	CodeMirrorEditorBinding.superclass._onPageInitialize.call(this, binding);

	/*
	* Mozilla depends on CodePress for initialize. Explorer may go ahead.
	*/
	if (Client.isExplorer || this._codemirrorEditor != null) {
		this._initialize();
	}
}

/**
* Debug editor HTML content.
* TODO: Move to super?
*
CodeMirrorEditorBinding.prototype.debug = function () {
	
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
*/

/**
* Activate editor.
* @param {boolean} isActivate 
*/
CodeMirrorEditorBinding.prototype._activateEditor = function (isActivate) {
	if (isActivate != this._isActivated || this.isFocusable && !this.isFocused) {

		this._isActivated = isActivate;
		EditorBinding.isActive = isActivate;

		/*
		* Enable all keyboard keys.
		*/
		var handler = this.getContentWindow().standardEventHandler;

		if (isActivate) {
			handler.enableNativeKeys(true);
		} else {
			handler.disableNativeKeys();
		}


		/*
		* Update "active" broadcaster.
		*/
		var broadcaster = this.getContentWindow().bindingMap.broadcasterIsActive;
		if (broadcaster != null) {
			if (isActivate) {
				broadcaster.enable();
			} else {
				broadcaster.disable();
			}
		}

		/*
		* Update focus status.
		*/
		if (isActivate) {
			this.focus();
			var editor = this._codemirrorEditor;
		} else {
			this.blur();
		}
	}
}

/**
* @param {string} cmd
* @param {boolean} gui
* @param {string} val
*/
CodeMirrorEditorBinding.prototype.handleCommand = function (cmd, gui, val) {

	var isCommandHandled = CodeMirrorEditorBinding.superclass.handleCommand.call(this, cmd, val);

	return isCommandHandled;
}




/**
* Finalize initialization.
* @overloads {EditorBinding._finalize}
*/
CodeMirrorEditorBinding.prototype._finalize = function () {

	this.setContent(this._startContent);
	CodeMirrorEditorBinding.superclass._finalize.call(this);
}

/**
* Initialize component. After startup, this method is invoked 
* directly by method EditorBinding.registerComponent.
* @param {IEditorComponent} binding
*/
CodeMirrorEditorBinding.prototype.initializeEditorComponent = function (binding) {

	binding.initializeSourceEditorComponent(
		this,
		this._codemirrorEditor
	);
}

/**
* On clean, also clean the plaintext editor.
* @overloads {EditorBinding#clean}
*/
CodeMirrorEditorBinding.prototype.clean = function () {

	CodeMirrorEditorBinding.superclass.clean.call(this);
	this.getContentWindow().bindingMap.editorpage.clean();
}

/**
* @param {MouseEvent} e
*/
CodeMirrorEditorBinding.prototype.handleContextMenu = function (e) {

	/*
	this._popupBinding.configure ( this, this._codePressFrame, this._codePressEngine );
	CodeMirrorEditorBinding.superclass.handleContextMenu.call ( this, e );
	*/
}

/**
* @return {SourceCodeEditorPopupBinding}
*/
CodeMirrorEditorBinding.prototype.getEditorPopupBinding = function () {

	return top.app.bindingMap.sourcecodeeditorpopup;
}

/**
* Get editor window.
* @return {DOMDocumentView}
*/
CodeMirrorEditorBinding.prototype.getEditorWindow = function () {

	return this._codemirrorWindow;
}

/**
* Get editor document.
* @return {DOMDocument}
*/
CodeMirrorEditorBinding.prototype.getEditorDocument = function () {

	if (this._codemirrorWrapperElement != null)
		return this._codemirrorWrapperElement.ownerDocument;
	return null;
}

/**
* Set content.
* @param {string} string
* @return {boolean} True if content can be mounted. HARDCODED for now.
*/
CodeMirrorEditorBinding.prototype.setContent = function (string) {

	if (!this._isFinalized) {
		if (string != this._startContent) {
			this._startContent = string;
		}
	}

	if (this.isInitialized && this.getContentWindow().bindingMap != null) {

		/* 
		* In structured content, newlines are indicated by &#xA; 
		* We replace this now, but it should be done elsewhere...
		*
		string = string.replace ( /&#xA;/g, "\n" );
		*/
		this.getContentWindow().bindingMap.editorpage.setContent(string);
		this.resetUndoRedo();

		/*
		* Reset checksum system.
		*/
		this._checksum = this.getCheckSum();
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
CodeMirrorEditorBinding.prototype.getContent = function () {

	var result = this.getContentWindow().bindingMap.editorpage.getContent();

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
CodeMirrorEditorBinding.prototype.resetUndoRedo = function () {

	/*
	this.logger.warn ( "CodeMirrorEditorBinding.prototype.resetUndoRedo!!!" );
	
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
CodeMirrorEditorBinding.prototype.cover = function (isCover) {

	if (this._pageBinding != null) {
		this._pageBinding.cover(isCover);
	}
}

/**
* TODO: MOVE TO SUPER! And implement for VisualEditor as well...
* @implements {IUpdateHandler}
* @overwrites {EditorBinding#updateElement}
* @param {Element} element
*/
CodeMirrorEditorBinding.prototype.updateElement = function (element) {

	if (element != null && this.shadowTree.dotnetinput != null) {
		var value = element.getAttribute("value");
		if (value != null && value != this.shadowTree.dotnetinput.value) {
			this.setValue(decodeURIComponent(value));
		}
	}

	return true; // stop crawling
};


/**
* Not relevant for canvas-based editor!
* TODO: Refactor this method chain.
* @overwrites {EditorBinding#blurEditor}
*/
CodeMirrorEditorBinding.prototype.blurEditor = function () { }



// ABSTRACT METHODS ..........................................................

/**
* Validate. This is currently only done for  
* XML dialect syntax. Otherwise hardcoded "true".
* @implements {IData}
* @return {boolean}
*/
CodeMirrorEditorBinding.prototype.validate = function () {

	var result = true;
	var source = this.getContent();

	if (this._validator != null) { // server side validation?

		result = Validator.validateInformed(source, this._validator);

	} else {

		switch (this.syntax) {

			/*
			* Validate markup languages.
			*/ 
			case CodeMirrorEditorBinding.syntax.XML:
			case CodeMirrorEditorBinding.syntax.XSL:
			case CodeMirrorEditorBinding.syntax.HTML:


				result = XMLParser.isWellFormedDocument(source, true);

				/*
				* Strict validation?
				*/
				if (result == true && this._hasStrictValidation) {
					switch (this.syntax) {
						case CodeMirrorEditorBinding.syntax.HTML:
							result = this._isValidHTML(source);
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
CodeMirrorEditorBinding.prototype._isValidHTML = function (xml) {

	var result = true;
	var doc = XMLParser.parse(xml);
	var errors = new List();

	/*
	* Collect errors.
	*/
	if (doc != null) {

		var root = doc.documentElement;
		if (root.nodeName != "html") {
			errors.add("MissingHtml");
		}
		if (root.namespaceURI != Constants.NS_XHTML) {
			errors.add("NamespaceURI");
		}
		var head = null, body = null;
		var children = new List(root.childNodes);
		while (children.hasNext()) {
			var child = children.getNext();
			if (child.nodeType == Node.ELEMENT_NODE) {
				switch (child.nodeName) {
					case "head":
						if (head != null) {
							errors.add("MultipleHead");
						}
						if (body != null) {
							errors.add("HeadBodyIndex");
						}
						head = child;
						break;
					case "body":
						if (body != null) {
							errors.add("MultipleBody");
						}
						body = child;
						break;
				}
			}
		}
		if (head == null) {
			errors.add("MissingHead");
		}
		if (body == null) {
			errors.add("MissingBody");
		}
	}

	/*
	* Show dialog if errors.
	*/
	if (errors.hasEntries()) {
		result = false;
		//Workarround for webkit and codemirror
		if (Client.isWebKit) {
			alert(StringBundle.getString("Composite.Web.SourceEditor", "Invalid.HTML." + errors.getFirst()));
		}
		else {
			Dialog.error(
			StringBundle.getString("Composite.Web.SourceEditor", "Invalid.HTML.DialogTitle"),
			StringBundle.getString("Composite.Web.SourceEditor", "Invalid.HTML." + errors.getFirst())
		);
		}
	}

	return result;
}

/**
* Basic XSL checker. Result is HARDCODED for now.
* @return {boolean}
*/
CodeMirrorEditorBinding.prototype._isValidXSL = function () {

	return true;
}

/**
* Get value. This is intended for serverside processing.
* @implements {IData}
* @return {string}
*/
CodeMirrorEditorBinding.prototype.getValue = CodeMirrorEditorBinding.prototype.getContent;

/**
* Set value.
* @implements {IData}
* @param {string} value
*/
CodeMirrorEditorBinding.prototype.setValue = CodeMirrorEditorBinding.prototype.setContent;

/**
* Get result. This is intended for clientside processing.
* @implements {IData}
* @return {object}
*/
CodeMirrorEditorBinding.prototype.getResult = CodeMirrorEditorBinding.prototype.getContent;

/**
* Set result.
* @implements {IData}
* @param {object} result
*/
CodeMirrorEditorBinding.prototype.setResult = CodeMirrorEditorBinding.prototype.setContent;


/**
* TODO!
* Create selection bookmark, patching explorer focus dysfunction.
*/
CodeMirrorEditorBinding.prototype.createBookmark = function () { };

/** 
* TODO!
* Restore selection focus for explorer.
*/
CodeMirrorEditorBinding.prototype.restoreBookmark = function () { };

/**
* TODO!
* Has bookmark?
* @return {boolean}
*/
CodeMirrorEditorBinding.prototype.hasBookmark = function () { };

/**
* TODO!
* Delete bookmark.
*/
CodeMirrorEditorBinding.prototype.deleteBookmark = function () { };

/**
* Used to determine when a dirty flag should be raised.
* @return {string}
*/
CodeMirrorEditorBinding.prototype.getCheckSum = function () {

	var result = null;
	var page = this._pageBinding;

	if (page != null) {
		result = page.getCheckSum();
	}

	return result;
}