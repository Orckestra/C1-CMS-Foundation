VisualEditorPropertiesToolBarGroupBinding.prototype = new ToolBarGroupBinding;
VisualEditorPropertiesToolBarGroupBinding.prototype.constructor = VisualEditorPropertiesToolBarGroupBinding;
VisualEditorPropertiesToolBarGroupBinding.superclass = ToolBarGroupBinding.prototype;

/**
 * Classname reserved for focused element.
 */
VisualEditorPropertiesToolBarGroupBinding.CLASSNAME_FOCUSED = "mceC1Focused";

/**
 * @class
 * @implements {IWysiwygEditorComponent}
 */
function VisualEditorPropertiesToolBarGroupBinding () {

	/**
	 * @type {SystemLogger}
	 */
	this.logger = SystemLogger.getLogger ( "VisualEditorPropertiesToolBarGroupBinding" );
	
		/**
	 * The containing editor.
	 * @type {VisualEditorBinding}
	 */
	this._editorBinding = null;
	
	/**
	 * The TinyMCE engine.
	 * @type {tinymce.Engine} 
	 */
	this._tinyEngine = null;
	
	/**
	 * The TinyMCE instance.
	 * @type {tinymce.EngineManager}
	 */
	this._tinyInstance = null;
	
	/**
	 * The TinyMCE theme.
	 * @type {tinymce.Theme}
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
	
	/**
	 * Tracking the focused image.
	 * @type {HTMLImageElement}
	 */
	this._focusedImage = null;
	
	/*
	 * Returnable.
	 */
	return this;
}

/**
 * Identifies binding.
 */
VisualEditorPropertiesToolBarGroupBinding.prototype.toString = function () {
	
	return "[VisualEditorPropertiesToolBarGroupBinding]";
}

/**
 * Although the "hidden" property is set in markup, Mozilla insists on 
 * displaying contents in a short flash. We hide the entire setup for starters.
 * @overloads {RadioGroupBinding#onBindingRegister}
 */
VisualEditorPropertiesToolBarGroupBinding.prototype.onBindingRegister = function () {
	
	VisualEditorPropertiesToolBarGroupBinding.superclass.onBindingRegister.call ( this );
	
	if ( Client.isMozilla ) {
		this.bindingElement.style.visibility = "hidden";
	}
}

/**
 * Register as editor component.
 * @overloads {ToolBarGroupBinding#onBindingAttach}
 */
VisualEditorPropertiesToolBarGroupBinding.prototype.onBindingAttach = function () {

	VisualEditorPropertiesToolBarGroupBinding.superclass.onBindingAttach.call ( this );
	
	this.propertyMethodMap [ "isdisabled" ] = this._setSpecialVisibility;
	var tinywindow = this.bindingWindow.bindingMap.tinywindow;
	EditorBinding.registerComponent ( this, tinywindow );
}

/**
 * Register buttons.
 */
VisualEditorPropertiesToolBarGroupBinding.prototype.onBindingInitialize = function () {
	
	VisualEditorPropertiesToolBarGroupBinding.superclass.onBindingInitialize.call ( this );
	
	var buttons = this._buttons;
	this.getDescendantBindingsByLocalName ( "toolbarbutton" ).each ( function ( button ) {
		buttons.set ( button.cmd, button );
	});
	
}

/**
 * @implements {IWysiwygEditorComponent}
 * @param {VisualEditorBinding} editor
 * @param {tinymce.Engine} engine
 * @param {tinymce.EngineManager} instance
 * @param {tinymce.Theme} theme
 */
VisualEditorPropertiesToolBarGroupBinding.prototype.initializeComponent = function ( editor, engine, instance, theme ) {

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
VisualEditorPropertiesToolBarGroupBinding.prototype.handleNodeChange = function ( element ) {
	
	this._tinyElement = element;
	var classname = VisualEditorPropertiesToolBarGroupBinding.CLASSNAME_FOCUSED;
	
	if ( this._isImage ()) {
		
		if ( this._focusedImage != null ) {
			CSSUtil.detachClassName ( this._focusedImage, classname );
		}
		CSSUtil.attachClassName ( element, classname );
		this._focusedImage = element;
		
		var command = null;
		if ( this._isRendering ()) {
			command = "compositeInsertRendering";
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
	} else {
		
		if ( this._focusedImage != null ) {
			CSSUtil.detachClassName ( this._focusedImage, classname );
			this._focusedImage = null;
		}
		if ( this.isVisible ) {
			this.hide ();
		}
	}
}

/**
 * @overloads {RadioGroupBinding#handleAction}
 * @implements {IActionListener}
 * @param {Action} action
 */
VisualEditorPropertiesToolBarGroupBinding.prototype.handleAction = function ( action ) {
	
	VisualEditorPropertiesToolBarGroupBinding.superclass.handleAction.call ( this, action );
	
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
VisualEditorPropertiesToolBarGroupBinding.prototype._isImage = function () {
	
	return this._tinyElement && this._tinyElement.nodeName == "IMG";
}

/**
 * TODO: COMBINE WITH POPUP!
 * Is rendering?
 * @return {boolean}
 */
VisualEditorPropertiesToolBarGroupBinding.prototype._isRendering = function () {
	
	return this._isImage () && 
		CSSUtil.hasClassName ( 
			this._tinyElement, 
			VisualEditorBinding.FUNCTION_CLASSNAME 
		);
}

/**
 * TODO: COMBINE WITH POPUP!
 * Is field?
 * @return {boolean}
 */
VisualEditorPropertiesToolBarGroupBinding.prototype._isField = function () {
	
	return this._isImage () && 
		CSSUtil.hasClassName ( 
			this._tinyElement, 
			VisualEditorBinding.FIELD_CLASSNAME 
		);
}

/**
 * Hide all buttons when editor looses focus.
 * @param {boolean} isDisabled
 */
VisualEditorPropertiesToolBarGroupBinding.prototype._setSpecialVisibility = function ( isDisabled ) {
	
	if ( isDisabled ) {
		if ( this.isVisible == true ) {
			this.hide ();
			this._buttons.each ( function ( cmd, button ) {
				if ( button.isVisible ) {
					button.hide ();
				}
			});
		}
	}
}