SourceEditorPageBinding.prototype = new PageBinding;
SourceEditorPageBinding.prototype.constructor = SourceEditorPageBinding;
SourceEditorPageBinding.superclass = PageBinding.prototype;

SourceEditorPageBinding.URL_CODEMIRRORWINDOW = "${root}/content/misc/editors/codemirroreditor/codemirror.html";

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
	 * @type {CodemirrorEditorBinding}
	 */
	this._editorBinding = null;
	
	/**
	 * The codemirror editor.
	 * @type {Codemirror}
	 */
	this._codemirrorEditor = null;
	
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

	/*
	* Show the relevant switchmode button and load CodePress. 
	* This delays method onPageInitialize untill all is loaded.
	*/
	this.isPlainView = this.bindingWindow.bindingMap.plaindeck.isSelected;

	this._loadCodemirror();

}

/**
 * Register for initialization when CodePress is loaded - then load CodePress.
 */
SourceEditorPageBinding.prototype._loadCodemirror = function () {
	var codemirrorwindow = this.bindingWindow.bindingMap.codemirrorwindow;
	EditorBinding.registerComponent(this, codemirrorwindow);
	codemirrorwindow.setURL(SourceEditorPageBinding.URL_CODEMIRRORWINDOW);
}

/**
 * Remember that only Mozilla ever gets around here.
 * @implements {IWysiwygEditorComponent}
 * @param {CodemirrorEditorBinding} binding
 * @param {Codemirror} editor
 */
SourceEditorPageBinding.prototype.initializeSourceEditorComponent = function ( binding, editor ) {

	this._editorBinding = binding;
	this._codemirrorEditor = editor;
	
	/*
	 * TODO: Hide "flash of syntax highlighting" with less timeout?
	 */
	var self = this;
	setTimeout ( function () {
		self._fit ();
		self.cover ( false );
	}, 500 );
	
	this.onPageInitialize ();
}

/**
 * Set content.
 * @return {string}
 */
SourceEditorPageBinding.prototype.setContent = function (string) {

	if (this.isPlainView == true) {
		this._editorTextBox.setValue(string);
		this._editorTextBox.clean();
	} else {

		// Unixification.
		string = string.replace(/\r\n/g, "\n");

		// Fixing the title char
		// TODO: probably on server...
		string = string.replace(/\"%7E/g, "\"~");
		string = string.replace(/%28/g, "(");
		string = string.replace(/%29/g, ")");

		this._codemirrorEditor.setValue(string);
	}
}

/**
 * Get content.
 * @param {string} string
 */
SourceEditorPageBinding.prototype.getContent = function (string) {

	var result = null;
	if (this.isPlainView) {
		result = this._editorTextBox.getValue();
	} else {
		result = this._codemirrorEditor.getValue();
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
 * Notify Codemirror on environment resize.
 */
SourceEditorPageBinding.prototype.flex = function () {
	
	SourceEditorPageBinding.superclass.flex.call ( this );
	
	var self = this;
	setTimeout ( function () {
		self._fit ();
	}, 0 );
}

/**
 * Fit Codemirror to window size.
 */
SourceEditorPageBinding.prototype._fit = function () {

	var win = this.bindingWindow.bindingMap.codemirrorwindow;

	if (win !== undefined) {
		var div = win.getContentDocument().getElementById("textarea");
		if (div != null) {
			var dim = win.boxObject.getDimension();
			div.style.width = dim.w + "px";
			div.style.height = dim.h + "px";

		}
		if (this._codemirrorEditor != null) {
			var wrapper = this._codemirrorEditor.getWrapperElement();
			if (wrapper != null) {
				var dim = win.boxObject.getDimension();
				wrapper.style.width = (dim.w) + "px";
				wrapper.style.height = (dim.h) + "px";
			}
		}
	}
}

/**
 * @return {string}
 */
SourceEditorPageBinding.prototype.getCheckSum = function () {

	var result = null;
	if (this.isPlainView) {
		result = this._editorTextBox.getValue();
	} else {
		result = this._codemirrorEditor.getValue();
	}
	return result;
}