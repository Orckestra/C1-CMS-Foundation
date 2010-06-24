WysigwygEditorPageBinding.prototype = new PageBinding;
WysigwygEditorPageBinding.prototype.constructor = WysigwygEditorPageBinding;
WysigwygEditorPageBinding.superclass = PageBinding.prototype;

/*
 * NOT USED!
 */
WysigwygEditorPageBinding.URL_TINYWINDOW = "${root}/content/misc/editors/wysiwygeditor/tinymce.aspx";

/**
 * @class
 * @implements {IWysiwygEditorComponent}
 */
function WysigwygEditorPageBinding () {

	/**
	 * @type {SystemLogger}
	 */
	this.logger = SystemLogger.getLogger ( "WysigwygEditorPageBinding" );
	
	/**
	 * So that the ViewBinding can manage flex when editor wakes up.
	 * @see {ViewBinding#handleAction}
	 * @type {boolean}
	 *
	this.isEditorPageBinding = true;
	*/
	
	/**
	 * The containing editor.
	 * @type {WysiwygEditorBinding}
	 */
	this._editorBinding = null;
	
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
	
	/**
	 * Flipped when editor is targetted by the mouse or something.
	 * TODO: implement something!
	 * @type {boolean}
	 */
	this._isActive = false;
	
	/**
	 * @type {boolean}
	 */
	this.isSourceMode = false;
	
	/**
	 * @type {SourceCodeEditorBinding}
	 */
	this._sourceEditor = null;
	
	/**
	 * TODO: this seems to have no effect!
	 */
	this._isFocusManager = false;
	
	/**
	 * Flipped on startup.
	 * @type {boolean}
	 */
	this._isFirstTime = true;
	
	/*
	 * Returnable.
	 */
	return this;
}

/**
 * Identifies binding.
 */
WysigwygEditorPageBinding.prototype.toString = function () {
	
	return "[WysigwygEditorPageBinding]";
}

/*
 * @overloads {PageBinding#onBindingAttach}
 */
WysigwygEditorPageBinding.prototype.onBindingAttach = function () {
	
	WysigwygEditorPageBinding.superclass.onBindingAttach.call ( this );
	this.propertyMethodMap [ "isdisabled" ] = this.setDisabled;
	this.addActionListener ( SourceEditorBinding.ACTION_INITIALIZED );
}

/**
 * Register for initialization when TinyMCE is loaded.
 * @overloads {PageBinding#onPageInitialize}
 */
WysigwygEditorPageBinding.prototype.onBeforePageInitialize = function () {
	
	WysigwygEditorPageBinding.superclass.onBeforePageInitialize.call ( this );
	
	var tinywindow = this.bindingWindow.bindingMap.tinywindow;
	EditorBinding.registerComponent ( this, tinywindow );
}

/**
 * Show the editor (by hiding the cover). When editor is hidden, the 
 * switchbutton (between visual and source mode) will be disabled.
 * @param {boolean} isCover
 */
WysigwygEditorPageBinding.prototype.showEditor = function ( isShow ) {
	
	var cover = this.isSourceMode == true ? 
		this.bindingWindow.bindingMap.sourcecover :
		this.bindingWindow.bindingMap.tinycover;
	var button = this.bindingWindow.bindingMap.switchbutton;
		
	if ( isShow ) {
			cover.hide (); // SKIP ARG WHEN WE DROP FF2.0!
			if ( button ) {
				button.enable ();
			}
	} else {
		cover.show ();
		cover.setBusy ( false );
		if ( button ) {
			button.disable ();
		}
	}
}

/**
 * Desperate hack for Firefox 2.0 - the TinyMCE iframe may 
 * still be hidden after initialization, but only FIRST time 
 * the editor is used. To make things worse, this bug can 
 * only be reproduced on a remote server. Fortunately we can 
 * fix it with the desperate hack.
 */
WysigwygEditorPageBinding.prototype.desperateHack = function () {
	
	var win = this.bindingWindow.bindingMap.tinywindow;
	win.shadowTree.iframe.style.display = "none";
	setTimeout ( function () {
		win.shadowTree.iframe.style.display = "block";
	}, 0 );
}

/**
 * @implements {IWysiwygEditorComponent}
 * @param {WysiwygEditorBinding} editor
 * @param {TinyMCE_Engine} engine
 * @param {TinyMCE_Control} instance
 * @param {TinyMCE_CompositeTheme} theme
 */
WysigwygEditorPageBinding.prototype.initializeComponent = function ( editor, engine, instance, theme ) {

	this._editorBinding = editor;
	this._tinyEngine	= engine;
	this._tinyInstance 	= instance;
	this._tinyTheme 	= theme;
}

/**
 * @implements {IActionListner}
 * @overloads {PageBinding#handleAction}
 * @param {Action} action
 */
WysigwygEditorPageBinding.prototype.handleAction = function ( action ) {
	
	WysigwygEditorPageBinding.superclass.handleAction.call ( this, action );
	
	var binding = action.target;
	
	switch ( action.type ) {
		
		case SourceEditorBinding.ACTION_INITIALIZED :
			
			this._sourceEditor = binding;
			this._buildSwitchButton ();
			
			var cover = this.bindingWindow.bindingMap.sourcecover;
			
			/*
			 * Timeout saves the day.
			 * TODO: handle illegal content.
			 */
			var self = this;
			setTimeout ( function () {
				if ( self._synchronizeSwitch ()) {
					cover.hide ();
					setTimeout ( function () {
						binding.blurEditor ();
					}, 100 );
				} else {
					throw "Illegal content";
				}
			}, Client.isExplorer == true ? 500 : 0 );
			break;
	}
}

/**
 * Building a button on the sourcecode editor toolbar.
 */
WysigwygEditorPageBinding.prototype._buildSwitchButton = function () {

	var win = this._sourceEditor.getContentWindow ();
	var doc = this._sourceEditor.getContentDocument ();
	
	var button = ToolBarButtonBinding.newInstance ( doc );
	button.isEditorControlBinding = false;
	button.setLabel ( StringBundle.getString ( "ui", "Website.WysiwygEditor.LabelWysiwyg" ));
	button.flip ( true );
	button.imageProfile = new ImageProfile ({
		image : "${icon:editor-designview}",
		imageDisabled : "${icon:editor-designview-disabled}" 
	});

	var self = this;
	button.oncommand = function () {
		self.switchEditingMode ();
	}
	
	win.bindingMap.toolbar.addRight ( button );
	button.attach ();
}

/**
 * Set content. Note that content should *always* be provided as structured markup, not 
 * Tiny markup. This method is invoked by the containing {@link WysiwygEditorBinding}
 * @param {string} content
 * @return {boolean} True if content can be mounted.
 */
WysigwygEditorPageBinding.prototype.setContent = function ( content ) {
	
	var isSuccess = true;
	
	if ( this.isSourceMode == true ) {
		this._sourceEditor.setContent ( content ); // note that we don't check for errors!
	} else {
		content = VisualEditorBinding.getTinyContent ( content, this._editorBinding );
		if ( content != null ) {
			this._tinyEngine.setContent ( content );
		} else {
			isSuccess = false;
		}
	}
	return isSuccess;	
}

/**
 * Is valid content?
 * @see {WysiwygEditorBinding#validate}
 * @see {TemplateTreeBinding#handleAction}
 * @return {boolean}
 *
WysigwygEditorPageBinding.prototype.isValidContent = function () {
	
	var isValid = true;
	var content = this.getContent ();
	
	switch ( this.isSourceMode ) {
		case true :
			if ( content.length == 0 ) {
				// case for sourcecodeeditor in plain edit mode (we think)
			} else if ( content.length == 1 && content.charCodeAt ( 0 ) == 10 ) {
				// case for sourcecodeeditor in colored edit mode (we presume)
			} else {
				content = VisualEditorBinding.getTinyContent ( content, this._editorBinding );
				if ( !content ) {
					isValid = false;
				}
			}
			break;
		case false :
			if ( content == null ) {
				isValid = false;
			}
			break;
	}
	return isValid;
}
*/

/**
 * Validate. This only makes a difference when in source mode.
 * @return {boolean}
 */
WysigwygEditorPageBinding.prototype.validate = function () {
	
	var result = true;
	if ( this.isSourceMode == true ) {
		result = this._sourceEditor.validate (); 
	}
	return result;
}

/**
 * Get content. Some garbage markup is eliminated by XSLT, anticipating 
 * the users intentioon to create an all empty page.
 * @return {string}
 */
WysigwygEditorPageBinding.prototype.getContent = function () {

	var result = null;

	if ( this.isSourceMode == true ) {
		result = this._sourceEditor.getContent ();
	} else {
		result = VisualEditorBinding.getStructuredContent (
			this._tinyInstance.getBody().innerHTML
		);
	}
	return result;
}

/**
 * Switch to either wysiwyg or source code editing.
 * Invoked by the {@link WysigwygEditorToolBarBinding}
 */
WysigwygEditorPageBinding.prototype.switchEditingMode = function () {
	
	/*
	 * Managing Application lock while switching.
	 */
	var self = this;
	Application.lock ( self );
	setTimeout ( function () {
		self._switchMode ();
		setTimeout ( function () {
			Application.unlock ( self );
		}, 0 );
	}, 0 );
}

/**
 * Switch editing mode.
 */
WysigwygEditorPageBinding.prototype._switchMode = function () {
	
	var decks = this.bindingWindow.bindingMap.decks;
	var isSwitchAllowed = true;
	
	/*
	 * Note double validation. First we check if the source editor 
	 * has valid code. Then we see if visual editor will accept it.
	 * The source editor may not be loaded now, see below.
	 */
	if ( this._sourceEditor != null ) {
		isSwitchAllowed = this._sourceEditor.validate ();
		if ( isSwitchAllowed == true ) {
			if ( !this._synchronizeSwitch ()) {
				isSwitchAllowed = false;
			}
		}
	}
	
	/*
	 * This will LOAD the sourceeditor on first invoke. 
	 */
	if ( isSwitchAllowed ) {
		var selected = decks.getSelectedDeckBinding ();
		var currentID = selected.bindingElement.id;
		decks.select (
			currentID == "sourcedeck" ? "designdeck" : "sourcedeck"
		);
	}
}

/**
 * Switch to either wysiwyg or source code editing, transferring content from one 
 * to the other. This may not always succeed, in which case the deck will not shift.
 * @param {boolean} isNotSwitching True if the editing mode is not supposed to switch.
 * @return {boolean} True for smooth switch.
 */
WysigwygEditorPageBinding.prototype._synchronizeSwitch = function () {
	
	var content = this.getContent ();
	this.isSourceMode = !this.isSourceMode;
	var isSuccess = this.setContent ( content );
	if ( !isSuccess ) {
		this.isSourceMode = !this.isSourceMode;
	}
	return isSuccess;
}

/**
 * @param {boolean} isDisabled
 */
WysigwygEditorPageBinding.prototype.setDisabled = function ( isDisabled ) {

	/*
	 * Mozilla will use inline styles per default unless 
	 * we set this after all is loaded. We'll make double 
	 * sure by setting it constantly (since there is also 
	 * an issue with the setting being reset after iframe 
	 * has been hidden, see bug 322639).
	 */
	if ( Client.isMozilla && !isDisabled ) {
		this._tinyInstance.getDoc ().execCommand ( 
			"styleWithCSS", 
			false, 
			false
		);
	}
}