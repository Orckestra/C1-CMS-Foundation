VisualEditorBinding.prototype = new EditorBinding;
VisualEditorBinding.prototype.constructor = VisualEditorBinding;
VisualEditorBinding.superclass = EditorBinding.prototype;

VisualEditorBinding.FUNCTION_CLASSNAME = "compositeFunctionWysiwygRepresentation";
VisualEditorBinding.FIELD_CLASSNAME = "compositeFieldReferenceWysiwygRepresentation";
VisualEditorBinding.HTML_CLASSNAME = "compositeHtmlWysiwygRepresentation";

VisualEditorBinding.ACTION_INITIALIZED = "visualeditor initialized";
VisualEditorBinding.DEFAULT_CONTENT = "<p></p>";
VisualEditorBinding.URL_DIALOG_CONTENTERROR = "${root}/content/dialogs/wysiwygeditor/errors/contenterror.aspx";
VisualEditorBinding.XHTML = "<html xmlns=\"http://www.w3.org/1999/xhtml\">\n\t<head></head>\n\t<body>\n${body}\n\t</body>\n</html>";

/*
 * It ain't pretty, but we had to put this somewhere.
 * @param {string} classname
 * @return {string}
 */
VisualEditorBinding.getTinyLessClassName = function (classname) {

	var i = 0, singlename, result = [], split = classname.split(" ");
	while ((singlename = split[i++]) != null) {
		if (singlename.length >= 3 && singlename.substring(0, 3) == "mce") {
			continue;
		} else if (singlename.length >= 14 && singlename.substring(0, 14) == "compositemedia") {
			continue;
		}
		result.push(singlename);
	}
	return result.join(" ");
}

/**
 * Convert tinymarkup to structured markup.
 * @param {string} content
 * @return {string}
 */
VisualEditorBinding.getStructuredContent = function ( content ) {

	var result = null;
	WebServiceProxy.isFaultHandler = false;
	var soap = XhtmlTransformationsService.TinyContentToStructuredContent ( content );
	if ( soap instanceof SOAPFault ) {
		// DO SOMETHING!?
	} else {
		result = soap.XhtmlFragment;
		if ( !result ) {
			result = "";
		}
	}
	WebServiceProxy.isFaultHandler = true;
	return result;
}

/**
 * Convert structured markup to tinymarkup.
 * @param {string} content Structured markup
 * @param {VisualEditorBinding} binding
 * @return {string}
 */
VisualEditorBinding.getTinyContent = function ( content, binding ) {

	var result = null;

	/*
	 * Some content seems to be needed for the webservice to return valid fragment.
	 */
	if (content == null || !content.replace(/\s*/gm, '').length) {
		content = VisualEditorBinding.DEFAULT_CONTENT;
	}

	/*
	 * If webservice fails to convert structured markup,
	 * a dialog will be presented and null will be returned.
	 */
	WebServiceProxy.isFaultHandler = false;
	var soap = binding.getSoapTinyContent ( content );
	if ( soap instanceof SOAPFault ) {
		var dialogArgument = soap;
		var dialogHandler = {
			handleDialogResponse : function () {
				/*
				 * Otherwise the save button could be disabled
				 * indefinitely during save scenario
				 */
				binding.dispatchAction ( Binding.ACTION_VALID );
			}
		};
		Dialog.invokeModal (
			VisualEditorBinding.URL_DIALOG_CONTENTERROR,
			dialogHandler,
			dialogArgument
		);
	} else {
		result = soap.XhtmlFragment;
		if ( result == null ) { // always return a string!
			result = new String ( "" );
		}

		//whitespaces beatween li ignore TAB/Shift+TAB event
		//TODO: check this at next version tinyMCE
		//Delete spaces between LI
		result = result.replace(/\s+<li>/g, '<li>');
	}
	WebServiceProxy.isFaultHandler = true;
	return result;
};

/**
 * Is image?
 * @param {DOMElement} element
 * @return {boolean}
 */
VisualEditorBinding.isImage = function (element) {

	return element && element.nodeName == "IMG";
}

/**
* Is image and not rendering?
* @param {DOMElement} element
* @return {boolean}
*/
VisualEditorBinding.isImageElement = function (element) {
	return VisualEditorBinding.isImage(element) && !VisualEditorBinding.isReservedElement(element);
}

/**
 * Is internal image element?
 * @param {DOMElement} element
 * @return {boolean}
 */
VisualEditorBinding.isReservedElement = function (element) {
	if (VisualEditorBinding.isFunctionElement(element))
		return true;
	if (VisualEditorBinding.isFieldElement(element))
		return true;
	if (VisualEditorBinding.isHtmlElement(element))
		return true;
	return false;
}


/**
 * Is function element?
 * @param {DOMElement} element
 * @return {boolean}
 */
VisualEditorBinding.isFunctionElement = function (element) {

	return VisualEditorBinding.isImage(element) &&
		CSSUtil.hasClassName (
			element,
			VisualEditorBinding.FUNCTION_CLASSNAME
		);
}


/**
 * Is field element?
 * @param {DOMElement} element
 * @return {boolean}
 */
VisualEditorBinding.isFieldElement = function (element) {

	return VisualEditorBinding.isImage(element) &&
		CSSUtil.hasClassName (
			element,
			VisualEditorBinding.FIELD_CLASSNAME
		);
}

/**
 * Is html element?
 * @param {DOMElement} element
 * @return {boolean}
 */
VisualEditorBinding.isHtmlElement = function (element) {

	return VisualEditorBinding.isImage(element) &&
		CSSUtil.hasClassName (
			element,
			VisualEditorBinding.HTML_CLASSNAME
		);
}


/**
 * @class
 */
function VisualEditorBinding () {

	/**
	 * @type {SystemLogger}
	 */
	this.logger = SystemLogger.getLogger ( "VisualEditorBinding" );

	/**
	 * @type {string}
	 */
	this.action_initialized = VisualEditorBinding.ACTION_INITIALIZED;

	/**
	 * @type {string}
	 */
	this.url_default = "${root}/content/misc/editors/visualeditor/visualeditor.aspx";

	/**
	 * The TinyMCE engine.
	 * @type {TinyMCE_Engine}
	 */
	this._tinyEngine = null;

	/**
	 * The TinyMCE instance.
	 * @type {tinymce.Editor}
	 */
	this._tinyInstance = null;

	/**
	 * The TinyMCE theme.
	 * @type {TinyMCE_CompositeTheme}
	 */
	this._tinyTheme = null;

	/**
	 * @type {VisualEditorFieldGroupConfiguration}
	 */
	this.embedableFieldConfiguration = null;

	/**
	 * Stores xhtml without body.
	 * @type {string}
	 */
	this._xhtml = null;

    /**
	 * Preview page id.
	 * @type {string}
	 */
	this._previewPageId = null;

    /**
	 * Preview template id.
	 * @type {string}
	 */
	this._previewTemplateId = null;

    /**
	 * Preview placeholder.
	 * @type {string}
	 */
    this._previewPlaceholder = null;

	/*
	 * Returnable.
	 */
	return this;
}

/**
 * @overloads {EditorBinding#onBindingRegister}
 */
VisualEditorBinding.prototype.onBindingRegister = function () {

	/*
	 * Force an early indexation of VisualEditorBinding strings
	 * to supress occasional glitches in string fetching.
	 */
	VisualEditorBinding.superclass.onBindingRegister.call ( this );

	// load strings
	StringBundle.getString ( "Composite.Web.VisualEditor", "Preload.Key" );


}

/**
 * @overloads {WindowBinding#onBindingAttach}
 */
VisualEditorBinding.prototype.onBindingAttach = function () {

	// fields config
	var fieldsconfig = this.getProperty ( "embedablefieldstypenames" );
	if ( fieldsconfig != null ) {
		this.embedableFieldConfiguration = VisualEditorFieldGroupConfiguration.getConfiguration ( fieldsconfig );
	}

	// formatting config
	var config = this.getProperty ( "formattingconfiguration" );
	if ( config != null ) {
		this._url += "?config=" + config;
	}

	this._previewPageId = this.getProperty ("previewpageid");
	if (this._previewPageId == null) {
	    this._previewPageId = '00000000-0000-0000-0000-000000000000';
	}

	this._previewTemplateId = this.getProperty("previewtemplateid");
	if (this._previewTemplateId == null) {
	    this._previewTemplateId = '00000000-0000-0000-0000-000000000000';
	}

	this._previewPlaceholder = this.getProperty("previewplaceholder");

	VisualEditorBinding.superclass.onBindingAttach.call ( this );

	this.subscribe ( BroadcastMessages.TINYMCE_INITIALIZED );
	this.subscribe ( this.bindingWindow.WindowManager.WINDOW_RESIZED_BROADCAST);

};

/**
 * Identifies binding.
 */
VisualEditorBinding.prototype.toString = function () {

	return "[VisualEditorBinding]";
};

/**
 * @implements {IBroadcastListener}
 * @param {string} broadcast
 * @param {object} arg
 */
VisualEditorBinding.prototype.handleBroadcast = function ( broadcast, arg ) {

	VisualEditorBinding.superclass.handleBroadcast.call ( this, broadcast, arg );

	var windowBinding = this.getContentWindow().bindingMap.tinywindow;
	var contentWindow = windowBinding.getContentWindow ();

	switch ( broadcast ) {

		/*
		 * TinyMCE initialized.
		 */
		case BroadcastMessages.TINYMCE_INITIALIZED :

			if ( arg.broadcastWindow == contentWindow ) {

				this._tinyEngine = arg.tinyEngine;
				this._tinyInstance = arg.tinyInstance;
				this._tinyTheme = arg.tinyTheme;

				this._tinyTheme.initC1(
					this,
					this._tinyEngine,
					this._tinyInstance
				);

				this.initializeEditorComponents ( windowBinding );
				this._initialize ();

				this.unsubscribe ( BroadcastMessages.TINYMCE_INITIALIZED );
			}
			break;

		case this.bindingWindow.WindowManager.WINDOW_RESIZED_BROADCAST:
			this.handleCommand("CompositeUpdateLayout", false, null);
			break;
	}
};

/**
 * Initialize components collected during startup. After startup,
 * this method is invoked directly when bindings register themselves
 * through method EditorBinding.registerComponent.
 * @param {IEditorComponent} binding
 */
VisualEditorBinding.prototype.initializeEditorComponent = function ( binding ) {

	binding.initializeComponent (
		this,
		this._tinyEngine,
		this._tinyInstance,
		this._tinyTheme
	);
};

/**
 * @overloads {EditorBinding#finalize}
 */
VisualEditorBinding.prototype._finalize = function () {

	VisualEditorBinding.superclass._finalize.call(this);

	/*
	* Normalize start content and extract HEAD and BODY section before we
	* feed it to TinyMCE. Normalization is required while old solutions
	* are upgraded to the new setup (with HEAD and BODY sections).
	*/
	this._startContent = this.normalizeToDocument(this._startContent);
	this._startContent = this.extractBody(this._startContent);

	/*
	* Inject BODY markup into TinyMCE. From now on, injection
	* is handled by the VisualEditorPageBinding.
	*/
	var tinyContent = VisualEditorBinding.getTinyContent(this._startContent, this);
	if (tinyContent.replace(/\s*/gm, '').length == 0) {
		tinyContent = VisualEditorBinding.DEFAULT_CONTENT;
	}

	this._tinyInstance.setContent(tinyContent, { format: 'raw' });
	this._tinyInstance.undoManager.clear();
	this._tinyInstance.undoManager.add();

	this.updateBodyWidth();
	this.updateCssClasses();

	this._maybeShowEditor();

};

/**
 * Invoked when contained page initializes.
 * @overloads {EditorBinding#_onPageInitialze}
 * @param {PageBinding} binding
 */
VisualEditorBinding.prototype._onPageInitialize = function ( binding ) {

	VisualEditorBinding.superclass._onPageInitialize.call ( this, binding );
	this._maybeShowEditor ();
};

/**
 * Stuff is not always loaded in a tight sequence arund here, so
 * we make sure not to show the editor until we are ready.
 */
VisualEditorBinding.prototype._maybeShowEditor = function () {

	if ( this._isFinalized && this._pageBinding != null ) {
		this._checksum = this.getCheckSum ();
		this._pageBinding.showEditor ( true );
	}
};

/**
 * Extract BODY section and return it. TinyMCE
 * should alwasy be fed BODY content only.
 * @param {string} html
 * @return {string}
 */
VisualEditorBinding.prototype.extractBody = function ( html ) {

	var result = null;
	var re = /(<body\s*[^>]*>)([\S\s]*)(<\/body>)/i;
	var match = html.match(re);
	if (match) {
		result = match[2];
		this._xhtml = html.replace(re, "$1\n${body}\n\t$3");
	} else {
		result = new String("");
		this._xhtml = VisualEditorBinding.XHTML;
	}
	return result;
}

/**
 * Restore HTML markup and convert HTML fragment to normalized HTML document.
 * This must be done whenever content is extracted from TinyMCE.
 * @param {string} body
 * @return {string}
 */
VisualEditorBinding.prototype.normalizeToDocument = function ( markup ) {

	var result = markup;
	if ( !this._isNormalizedDocument ( markup )) {
		result = this._getHtmlMarkup().replace("${body}", markup);
	}
	return result;
}

/**
 * Is markup a valid HTML document; or simply a fragment?
 * @param {string} markup
 * @return {boolean}
 */
VisualEditorBinding.prototype._isNormalizedDocument = function ( markup ) {

	var result = false;
	var doc = XMLParser.parse ( markup, true );
	if ( doc != null ) {
		if ( doc.documentElement.nodeName == "html" ) {
			result = true;
		}
	}
	//When markup start with <!-- --> then parser return html document in chrome
	//TODO: Investigate it to make function more niced
	if (Client.isWebKit) {
		if (markup.indexOf("<html") !== 0) {
			result = false;
		}
	}
	return result;
}

/**
 * Get cached HTML Markup. Method isolated so that subclasses may overwrite.
 * @return {string}
 */
VisualEditorBinding.prototype._getHtmlMarkup = function () {

	return this._xhtml != null ? this._xhtml : VisualEditorBinding.XHTML;
}

/**
 * Handle command.
 * @overwrites {EditorBinding#handleCommand}
 * @param {string} cmd
 * @param {boolean} gui
 * @param {string} val
 * @return {boolean} ... This is always true; maybe refactor something?
 */
VisualEditorBinding.prototype.handleCommand = function ( cmd, gui, val ) {

	/*
	 * The superclass handles special commmands "copy" and "paste"
	 * thay may invoke a warning dialog in unprivileged Mozillas.
	 */
	var isCommandHandled = VisualEditorBinding.superclass.handleCommand.call ( this, cmd, gui, val );

	/*
	 * Otherwise, the command gets realyed to the TinyMCE instance.
	 */
	if ( !isCommandHandled ) {
		try {
			this._tinyInstance.execCommand(cmd, gui, val, { skip_focus: true });
			this.checkForDirty ();
		} catch ( e ) {
			SystemDebug.stack ( arguments );
		}
		isCommandHandled = true;
	}

	return isCommandHandled;
};

/**
 * Configure contextmenu before showing it.
 * @overloads {EditorBinding#handleContextMenu}
 * @param {MouseEvent} e
 */
VisualEditorBinding.prototype.handleContextMenu = function ( e ) {

	var element = DOMEvents.getTarget ( e );
	this._popupBinding.configure ( this._tinyInstance, this._tinyEngine, element );
	VisualEditorBinding.superclass.handleContextMenu.call ( this, e );
}



// ABSTRACT METHODS IMPLEMENTED .............................................

/**
 * Get the editable window.
 * @return {DOMDocumentView}
 */
VisualEditorBinding.prototype.getEditorWindow = function () {

	return DOMUtil.getParentWindow ( this.getEditorDocument ());
};

/**
 * Get the editable document.
 * @return {DOMDocument}
 */
VisualEditorBinding.prototype.getEditorDocument = function () {

	return this._tinyInstance.getDoc ();
};

/**
 * Get the contextmenu associated.
 * @return {VisualEditorPopupBinding}
 */
VisualEditorBinding.prototype.getEditorPopupBinding = function () {

	return app.bindingMap.visualeditorpopup;
};

/**
 * Create selection bookmark.
 */
VisualEditorBinding.prototype.createBookmark = function () {

	this._bookmark = this._tinyInstance.selection.getBookmark ( true );
};

/**
 * Restore selection from bookmark. This will delete the bookmark!
 */
VisualEditorBinding.prototype.restoreBookmark = function () {

	if ( this.hasBookmark ()) {
		this._tinyInstance.selection.moveToBookmark ( this._bookmark );
		this.deleteBookmark ();
	}
};

/**
 * Has bookmark?
 * @return {boolean}
 */
VisualEditorBinding.prototype.hasBookmark = function () {

	return this._bookmark != null;
};

/**
 * Delete bookmark.
 */
VisualEditorBinding.prototype.deleteBookmark = function () {

	this._bookmark = null;
};

/**
 * Reset undo-redo history.
 */
VisualEditorBinding.prototype.resetUndoRedo = function () {

    this._tinyInstance.undoManager.clear();
    this._tinyInstance.undoManager.add();
	if ( this._pageBinding != null ) {
		this._pageBinding.updateUndoBroadcasters ();
	}
};

/**
 * Used to determine when a dirty flag should be raised.
 * @return {string}
 *
VisualEditorBinding.prototype.getCheckSum = function () {

	var result = null;
	if ( Binding.exists ( this._pageBinding )) {
		result = this._pageBinding.getCheckSum ( this._checksum );
	}
	return result;
}
*/


// IMPLEMENT AS DATABINDING .............................................

/**
 * Validate.
 * @implements {IData}
 * @return {boolean}
 */
VisualEditorBinding.prototype.validate = function () {

	return this._pageBinding.validate ();
};

/**
 * Get value. This is intended for serversice processing.
 * @implements {IData}
 * @return {string}
 */
VisualEditorBinding.prototype.getValue = function () {

	/*
	 * The content is probably valid at this point because the validate
	 * method has been invoked. We can save some time here by not duplicating
	 * validation, although theoretically we should.
	 */
	return this._pageBinding.getContent ();
};

/**
 * Set value. This resets the undo stack.
 * @param {string} value
 */
VisualEditorBinding.prototype.setValue = function ( value ) {

	if ( this._isFinalized ) {
		if ( Binding.exists ( this._pageBinding )) {
			this._pageBinding.setContent ( value );
			// resetUndoRedo invoked by page!
			// _checksum reset by page! (how ugly!)
		}
	} else if ( this._startContent == null ){
		this._startContent = value;
	}
};

/**
 * Get result. This is intended for clientside processing.
 * @implements {IData}
 * @return {object}
 */
VisualEditorBinding.prototype.getResult = function () {};

/**
 * Clean must be realyed to sourcecodeeditor.
 * @overloads {EditorBinding#clean}
 */
VisualEditorBinding.prototype.clean = function () {

	VisualEditorBinding.superclass.clean.call ( this );

	if ( this._pageBinding != null ) {
		this._pageBinding.clean ();
	}
}

/**
 * Convert structured content to tiny content on server.
 * @param {string} content Structured markup
 * @return {SOAP}
 */
VisualEditorBinding.prototype.getSoapTinyContent = function (content) {
	var width = this.getEffectiveWidth();
    return XhtmlTransformationsService.StructuredContentToTinyContentMultiTemplate(content, this._previewPageId, this._previewTemplateId, this._previewPlaceholder, width);
}

/**
 * Convert structured content to tiny content on server.
 * @param {string} content Structured markup
 * @return {SOAP}
 */
VisualEditorBinding.prototype.getImageTagForFunctionCall = function (markup) {
	var width = this.getEffectiveWidth();
	return XhtmlTransformationsService.GetImageTagForFunctionCall2(markup, this._previewPageId, this._previewTemplateId, this._previewPlaceholder, width);
}

/**
 * Get effective width
 * @return {int}
 */

VisualEditorBinding.prototype.getEffectiveWidth = function () {
	var body = this._tinyInstance.getBody();
	var padding = CSSComputer.getPadding(body);
	var editorsplitpanel = this.getContentWindow().bindingMap.editorsplitpanel;
	var width = editorsplitpanel.bindingElement.offsetWidth - 52; //Hack for "- padding.right - padding.left";
	return Math.floor(width / 32) * 32;
}

/**
 * Get placeholder width
 * @return {int}
 */
VisualEditorBinding.prototype.getPlaceholderWidth = function () {

	return StageBinding.placeholderWidth;
}

/**
 * Update TinyMCE body width
 * @param {int} content Structured markup
  */
VisualEditorBinding.prototype.updateBodyWidth = function (width) {

	if (width == undefined) {
		width = this.getPlaceholderWidth();
	}
	if (width) {
		this._tinyInstance.getBody().style.maxWidth = (width + 52) + "px";
	} else {
		this._tinyInstance.getBody().style.maxWidth = "";
	}
}

VisualEditorBinding.prototype.updateCssClasses = function () {

	var contextContainer = ContextContainer.getContextContainer(this);
	if (contextContainer != null) {
		var body = this._tinyInstance.getBody();
		body.className = "";
		contextContainer.getContainerClassesList().each(function(className) {
			CSSUtil.attachClassName(body, className);
		});
	}
}

/**
* Focus
* @overloads {EditorBinding#focus}
*/
VisualEditorBinding.prototype.focus = function () {

	VisualEditorBinding.superclass.focus.call(this);

	//Hack for IE
	if (Client.isExplorer && this._tinyInstance) {
		this._tinyInstance.selection.setRng(this._tinyInstance.selection.getRng());
	}
}


/**
* RestoreFocus
*/
VisualEditorBinding.prototype.restoreEditorFocus = function () {

	this._tinyInstance.focus();
}

/**
 * Set result. This is intended for clientside processing.
 * @param {string} result
 */
VisualEditorBinding.prototype.setResult = function ( result ) {};