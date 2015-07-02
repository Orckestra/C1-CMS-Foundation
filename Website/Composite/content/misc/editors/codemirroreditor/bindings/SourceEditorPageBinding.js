SourceEditorPageBinding.prototype = new PageBinding;
SourceEditorPageBinding.prototype.constructor = SourceEditorPageBinding;
SourceEditorPageBinding.superclass = PageBinding.prototype;

SourceEditorPageBinding.URL_CODEMIRRORWINDOW = "${root}/content/misc/editors/codemirroreditor/codemirror.aspx";

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
 * Halting page initialization until after Editor is loaded.
 * @overwrites {PageBinding#onPageInitialize}
 */
SourceEditorPageBinding.prototype.onBeforePageInitialize = function () {

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
	}, 500 );
	
	this.onPageInitialize ();
}

/**
 * Set content.
 * @return {string}
 */
SourceEditorPageBinding.prototype.setContent = function(string) {

	// Unixification.
	string = string.replace(/\r\n/g, "\n");

	// Fixing the title char
	// TODO: probably on server...
	string = string.replace(/\"%7E/g, "\"~");
	string = string.replace(/%28/g, "(");
	string = string.replace(/%29/g, ")");

	this._codemirrorEditor.setValue(string);

}
/**
 * Get content.
 * @param {string} string
 */
SourceEditorPageBinding.prototype.getContent = function (string) {

	var result = null;
	result = this._codemirrorEditor.getValue();
	return result;
}

/**
 * Nothing to see yet...
 * @param {boolean} isDisabled
 */
SourceEditorPageBinding.prototype.setDisabled = function ( isDisabled ) {}

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
 * @param isDisabled
 * @return
 */
SourceEditorPageBinding.prototype.cover = function (isCover) {
	
}

/**
 * @return {string}
 */
SourceEditorPageBinding.prototype.getCheckSum = function () {

	var result = null;
	result = this._codemirrorEditor.getValue();
	return result;
}