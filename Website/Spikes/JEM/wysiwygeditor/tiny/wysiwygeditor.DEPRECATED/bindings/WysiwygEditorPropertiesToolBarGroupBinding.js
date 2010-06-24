WysiwygEditorPropertiesToolBarGroupBinding.prototype = new ToolBarGroupBinding;
WysiwygEditorPropertiesToolBarGroupBinding.prototype.constructor = WysiwygEditorPropertiesToolBarGroupBinding;
WysiwygEditorPropertiesToolBarGroupBinding.superclass = ToolBarGroupBinding.prototype;

/**
 * @class
 * @implements {IWysiwygEditorComponent}
 */
function WysiwygEditorPropertiesToolBarGroupBinding () {

	/**
	 * @type {SystemLogger}
	 */
	this.logger = SystemLogger.getLogger ( "WysiwygEditorPropertiesToolBarGroupBinding" );
	
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
	 * @type {HTMLElement}
	 */
	this._tinyElement = null;
	
	/**
	 * @type {Map<string><WysiwygEditorToolBarButtonBinding}
	 */
	this._buttons = new Map ();
	
	/*
	 * Returnable.
	 */
	return this;
}

/**
 * Identifies binding.
 */
WysiwygEditorPropertiesToolBarGroupBinding.prototype.toString = function () {
	
	return "[WysiwygEditorPropertiesToolBarGroupBinding]";
}

/**
 * Although the "hidden" property is set in markup, Mozilla insists on 
 * displaying contents in a short flash. We hide the entire setup for starters.
 * @overloads {RadioGroupBinding#onBindingRegister}
 */
WysiwygEditorPropertiesToolBarGroupBinding.prototype.onBindingRegister = function () {
	
	WysiwygEditorPropertiesToolBarGroupBinding.superclass.onBindingRegister.call ( this );
	
	if ( Client.isMozilla ) {
		this.bindingElement.style.visibility = "hidden";
	}
}

/**
 * Register as editor component.
 * @overloads {ToolBarGroupBinding#onBindingAttach}
 */
WysiwygEditorPropertiesToolBarGroupBinding.prototype.onBindingAttach = function () {

	WysiwygEditorPropertiesToolBarGroupBinding.superclass.onBindingAttach.call ( this );
	
	this.propertyMethodMap [ "isdisabled" ] = this._setSpecialVisibility;
	var tinywindow = this.bindingWindow.bindingMap.tinywindow;
	EditorBinding.registerComponent ( this, tinywindow );
}

/**
 * Register buttons.
 */
WysiwygEditorPropertiesToolBarGroupBinding.prototype.onBindingInitialize = function () {
	
	WysiwygEditorPropertiesToolBarGroupBinding.superclass.onBindingInitialize.call ( this );
	
	var buttons = this._buttons;
	this.getDescendantBindingsByLocalName ( "toolbarbutton" ).each ( function ( button ) {
		buttons.set ( button.cmd, button );
	});
	
}

/**
 * Initialize as editor component.
 * @implements {IWysiwygEditorComponent}
 * @param {WysiwygEditorBinding} editor
 * @param {TinyMCE_Engine} engine
 * @param {TinyMCE_Control} instance
 * @param {TinyMCE_CompositeTheme} theme
 */
WysiwygEditorPropertiesToolBarGroupBinding.prototype.initializeComponent = function ( editor, engine, instance, theme ) {

	this._editorBinding = editor;
	this._tinyEngine	= engine;
	this._tinyInstance 	= instance;
	this._tinyTheme 	= theme;
	
	/* 
	 * Register as node change handler.
	 */
	this._tinyTheme.registerNodeChangeHandler ( this );
	
	/*
	 * Mozilla bug. Hidden by method onBindingRegister.
	 */
	if ( Client.isMozilla == true ) {
		var self = this;
		setTimeout ( function () {
			self.bindingElement.style.visibility = "visible";
		}, 0 );
	}
}

/**
 * Note to self: When editor has selection, explorer and mozilla behave differently. 
 * Mozilla will show eg. the function properties button while explorer will not (bug 653).
 * This should probably be synchronized - what should happen when two functions are selected?
 * @implements {IWysiwygEditorNodeChangeHandler}
 * @param {DOMElement} element
 */
WysiwygEditorPropertiesToolBarGroupBinding.prototype.handleNodeChange = function ( element ) {
	
	this._tinyElement = element;
	
	if ( this._isImage ()) {
		var command = null;
		if ( this._isRendering ()) {
			command = "compositeInsertRendering";
		} else if ( this._isMedia ()) {
			command = "compositeInsertMedia";
		} else if ( !this._isField ()) {
			command = "compositeInsertImage";	
		}
		if ( command ) {
			this._buttons.each ( function ( cmd, button ) {
				if ( cmd == command ) {
					button.show ();
				} else {
					button.hide ();
				}
			});
			if ( !this.isVisible ) {
				this.show ();
			}
		}
	} else if ( this.isVisible ) {
		this.hide ();
	}
}

/**
 * @overloads {RadioGroupBinding#handleAction}
 * @implements {IActionListener}
 * @param {Action} action
 */
WysiwygEditorPropertiesToolBarGroupBinding.prototype.handleAction = function ( action ) {
	
	WysiwygEditorPropertiesToolBarGroupBinding.superclass.handleAction.call ( this, action );
	
	switch ( action.type ) {
		
		/*
		 * For your information, this listener was
		 * added by the RadioGroupBinding superclass.
		 */
		case ButtonBinding.ACTION_COMMAND :
			var button = action.target;
			this._editorBinding.handleCommand ( 
				button.cmd, 
				button.gui, 
				button.val
			);
			break;
	}
}

/**
 * TODO: COMBINE WITH POPUP!
 * Is image?
 * @return {boolean}
 */
WysiwygEditorPropertiesToolBarGroupBinding.prototype._isImage = function () {
	
	return this._tinyElement && this._tinyElement.nodeName == "IMG";
}

/**
 * TODO: COMBINE WITH POPUP!
 * Is rendering?
 * @return {boolean}
 */
WysiwygEditorPropertiesToolBarGroupBinding.prototype._isRendering = function () {
	
	return this._isImage () && 
		CSSUtil.hasClassName ( 
			this._tinyElement, 
			WysiwygEditorBinding.RENDERING_CLASSNAME 
		);
}

/**
 * TODO: COMBINE WITH POPUP!
 * Is field?
 * @return {boolean}
 */
WysiwygEditorPropertiesToolBarGroupBinding.prototype._isField = function () {
	
	return this._isImage () && 
		CSSUtil.hasClassName ( 
			this._tinyElement, 
			WysiwygEditorBinding.FIELD_CLASSNAME 
		);
}

/**
 * TODO: COMBINE WITH POPUP!
 * Is media?
 * @return {boolean}
 */
WysiwygEditorPropertiesToolBarGroupBinding.prototype._isMedia = function () {

	return this._isImage () && 
		(
			CSSUtil.hasClassName ( this._tinyElement, WysiwygEditorBinding.CLASSNAME_MEDIA ) ||
			CSSUtil.hasClassName ( this._tinyElement, WysiwygEditorBinding.CLASSNAME_FLASH ) ||
			CSSUtil.hasClassName ( this._tinyElement, WysiwygEditorBinding.CLASSNAME_QUICKTIME ) ||
			CSSUtil.hasClassName ( this._tinyElement, WysiwygEditorBinding.CLASSNAME_SHOCKWAVE ) ||
			CSSUtil.hasClassName ( this._tinyElement, WysiwygEditorBinding.CLASSNAME_WINMEDIA )
		);
}

/**
 * Hide all buttons when editor looses focus.
 * @param {boolean} isDisabled
 */
WysiwygEditorPropertiesToolBarGroupBinding.prototype._setSpecialVisibility = function ( isDisabled ) {
	
	if ( isDisabled ) {
		if ( this.isVisible == true ) {
			this.hide ();
			this._buttons.each ( function ( cmd, button ) {
				if ( button.isVisible ) {
					button.hide ();
				}
			});
		}
	} else {
		if ( !this.isVisible ) {
			this.show ();
		}
	}
}