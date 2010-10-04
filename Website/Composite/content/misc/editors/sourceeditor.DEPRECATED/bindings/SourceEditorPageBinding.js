SourceEditorPageBinding.prototype = new PageBinding;
SourceEditorPageBinding.prototype.constructor = SourceEditorPageBinding;
SourceEditorPageBinding.superclass = PageBinding.prototype;

SourceEditorPageBinding.URL_CODEPRESSWINDOW = "${root}/content/misc/editors/SourceEditor/codepress/index.aspx?language=${syntax}";

/**
 * @class
 * @implements {IWysiwygEditorComponent}
 */
function SourceEditorPageBinding () {

	/**
	 * @type {SystemLogger}
	 */
	this.logger = SystemLogger.getLogger ( "SourceEditorPageBinding" );
	
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

	/**
	 * Always true in Explorer (has no CodePress).
	 * @type {boolean}
	 */
	this.isPlainView = true;
	
	/**
	 * @type {EditorTextBoxBinding}
	 */
	this._editorTextBox = null;
	
	/*
	 * Returnable.
	 */
	return this;
}

/**
 * Identifies binding.
 */
SourceEditorPageBinding.prototype.toString = function () {
	
	return "[SourceEditorPageBinding]";
}

/**
 * @overlaods {PageBinding#onBindingRegister}
 */
SourceEditorPageBinding.prototype.onBindingRegister = function () {
	
	SourceEditorPageBinding.superclass.onBindingRegister.call ( this );
	this.propertyMethodMap [ "isdisabled" ] = this.setDisabled;
}

/**
 * Halting page initialization until after CodePress is loaded.
 * @overwrites {PageBinding#onPageInitialize}
 */
SourceEditorPageBinding.prototype.onBeforePageInitialize = function () {
	
	/*
	 * Locate plaintexteditor.
	 */
	this._editorTextBox = this.bindingWindow.bindingMap.plaineditor;
	// this.addActionListener ( Binding.ACTION_DIRTY );
	
	if ( Client.isMozilla == true ) { 
		
		/*
		 * Show the relevant switchmode button and load CodePress. 
		 * This delays method onPageInitialize untill all is loaded.
		 */
		this.isPlainView = this.bindingWindow.bindingMap.plaindeck.isSelected;
		var toolbar = window.bindingMap.toolbar;
		toolbar.updateButtons ();
		
		this._loadCodePress ();
		
	} else {
		
		/*
		 * Simply initialize.
		 */
		this.onPageInitialize ();
	}
}

/**
 * Register for initialization when CodePress is loaded - then load CodePress.
 */
SourceEditorPageBinding.prototype._loadCodePress = function () {
	
	/*
	 * Fetch syntax from 
	 * document location.
	 */
	var codepresswindow = this.bindingWindow.bindingMap.codepresswindow;
	EditorBinding.registerComponent ( this, codepresswindow );
	var url = SourceEditorPageBinding.URL_CODEPRESSWINDOW;
	var syntax = document.location.search.split ( "=" )[ 1 ];
	url = url.replace ( "${syntax}", syntax );
	codepresswindow.setURL ( url );
}

/**
 * Remember that only Mozilla ever gets around here.
 * @implements {IWysiwygEditorComponent}
 * @param {SourceEditorBinding} editor
 * @param {HTMLIframeElement} frame
 * @param {CodePress} engine
 */
SourceEditorPageBinding.prototype.initializeSourceEditorComponent = function ( editor, frame, engine ) {

	this._editorBinding = editor;
	this._codePressFrame = frame;
	this._codePressEngine = engine;
	
	this.onPageInitialize ();
}

/**
 * Set content.
 * @return {string}
 */
SourceEditorPageBinding.prototype.setContent = function ( string ) {
	
	if ( this.isPlainView == true ) {
		this._editorTextBox.setValue ( string );
		this._editorTextBox.clean ();
	} else {
		this._codePressFrame.setCode ( string );
	}
}

/**
 * Get content.
 * @param {string} string
 */
SourceEditorPageBinding.prototype.getContent = function ( string ) {
	
	var result = null;
	if ( this.isPlainView ) {
		result = this._editorTextBox.getValue ();
	} else {
		result = this._codePressFrame.getCode ();
	}
	return result;
}

/**
 * Switch to either plain or fancy editing mode.
 */
SourceEditorPageBinding.prototype.switchMode = function ( isPlain ) {
	
	if ( isPlain != this.isPlainView )  {
		
		var code = this.getContent ();
		this.isPlainView = isPlain;
		this.setContent ( code );
		
		var decks = this.bindingWindow.bindingMap.sourcecodeeditordecks;
		if ( isPlain ) {
			decks.select ( "plaindeck" );
		} else {
			decks.select ( "fancydeck" );
		}
	}
}

/**
 * Clean plain editortextbox when containing 
 * SourceEditorBinding cleans up.
 */
SourceEditorPageBinding.prototype.clean = function () {

	this._editorTextBox.clean ();
}

/**
 * Nothing to see yet...
 * @param {boolean} isDisabled
 */
SourceEditorPageBinding.prototype.setDisabled = function ( isDisabled ) {}

/**
 * Cover the editor(s), not the toolbars.
 * @param isDisabled
 * @return
 */
SourceEditorPageBinding.prototype.cover = function ( isCover ) {
	
	function update ( binding ) {
		if ( isCover ) {
			binding.show ();
		} else {
			binding.hide ();
		}
	}
	
	update ( bindingMap.plaineditorcover );
	if ( bindingMap.codepresscover != null ) { // Mozilla only...
		update ( bindingMap.codepresscover );
	}
}

/**
 * Debug editor HTML source (developer feature).
 */
SourceEditorPageBinding.prototype.debug = function () {
	
	this._editorBinding.debug ();
}

/**
 * TODO: Do we need this?
 */
SourceEditorPageBinding.prototype.createBookmark = function () {
	
	this.logger.debug ( "Create bookmark!" );
}

/**
 * TODO: Do we need this?
 */
SourceEditorPageBinding.prototype.restoreBookmark = function () {
	
	this.logger.debug ( "Restore bookmark!" );
}

/**
 * @return {string}
 */
SourceEditorPageBinding.prototype.getCheckSum = function () {
	
	var result = null;
	if ( this.isPlainView ) {
		result = this._editorTextBox.getValue ();
	} else {
		result = this._codePressFrame.contentDocument.body.innerHTML; // MOZ ONLY!
	}
	return result;
}