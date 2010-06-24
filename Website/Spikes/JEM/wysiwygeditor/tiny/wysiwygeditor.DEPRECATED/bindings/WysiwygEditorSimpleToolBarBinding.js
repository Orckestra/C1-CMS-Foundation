WysiwygEditorSimpleToolBarBinding.prototype = new WysiwygEditorToolBarBinding;
WysiwygEditorSimpleToolBarBinding.prototype.constructor = WysiwygEditorSimpleToolBarBinding;
WysiwygEditorSimpleToolBarBinding.superclass = WysiwygEditorToolBarBinding.prototype;

/**
 * @class
 * @implements {IWysiwygEditorComponent}
 * @implements {IWysiwygEditorNodeChangeHandler}
 */
function WysiwygEditorSimpleToolBarBinding () {

	/**
	 * @type {SystemLogger}
	 */
	this.logger = SystemLogger.getLogger ( "WysiwygEditorSimpleToolBarBinding" );
	
	/**
	 * Indexing toolbarbuttons by value of the cmd attribute.
	 * @type {Map<string><EditorToolBarButtonBinding>}
	 */
	this._buttons = null;
	 
	/**
	 * Supress nodechange instructions while toolbar is handled.
	 * @type {boolean}
	 */
	this._isToolBarUpdate = false;
	
	/**
	 * @type {boolean}
	 */
	this._isAlignmentDisabled = false;
	
	/*
	 * Returnable.
	 */
	return this;
}

/**
 * Identifies binding.
 */
WysiwygEditorSimpleToolBarBinding.prototype.toString = function () {
	
	return "[WysiwygEditorSimpleToolBarBinding]";
}

/**
 * Hookup broadcaster integration.
 * @overloads {ToolBarBinding#onBindingRegister}
 */
WysiwygEditorSimpleToolBarBinding.prototype.onBindingRegister = function () {
	
	WysiwygEditorSimpleToolBarBinding.superclass.onBindingRegister.call ( this );
	this.propertyMethodMap [ "isdisabled" ] = this.setDisabled;
	this.addActionListener ( ButtonBinding.ACTION_COMMAND );
	this.addActionListener ( RadioGroupBinding.ACTION_SELECTIONCHANGED );
}

/**
 * Initialize invokes when containing WysiwygEditorBinding initializes.
 */
WysiwygEditorSimpleToolBarBinding.prototype._initialize = function () {

	/*
	 * Fetch buttons from server.
	 */
	WysiwygEditorSimpleToolBarBinding.superclass._initialize.call ( this );

	/*
	 * Index toolbar buttons.
	 */
	this._buttons = new Map ();
	var buttons = this.getDescendantBindingsByLocalName ( "toolbarbutton" );
	while ( buttons.hasNext ()) {
		var button = buttons.getNext ();
		if ( button.cmd != null ) {
			this._buttons.set ( 
				button.cmd, 
				button 
			);
		}
	}
	
	/* 
	 * Hookup on theme transmission.
	 */
	this._tinyTheme.registerNodeChangeHandler ( this );
	this._tinyTheme.registerContentChangeHandler ( this );
	
	/* 
	 * Hookup on TinyMCE internal events.
	 */
	DOMEvents.addEventListener ( this._tinyInstance.getDoc (), DOMEvents.MOUSEUP, this );
	DOMEvents.addEventListener ( this._tinyInstance.getDoc (), DOMEvents.KEYUP, this );
}

/**
 * @implements {IWysiwygEditorNodeChangeHandler}
 * @param {DOMElement} element
 */
WysiwygEditorSimpleToolBarBinding.prototype.handleNodeChange = function ( element ) {
	
	if ( !this._isToolBarUpdate ) {
		this._updateButtons ( element );
	}
}

/**
 * @implements {IWysiwygEditorContentChangeHandler}
 */
WysiwygEditorSimpleToolBarBinding.prototype.handleContentChange = function () {
	
	var undoRedo = this._tinyInstance.undoRedo;
	if ( undoRedo.undoIndex == 1 ) {
		this.bindingWindow.bindingMap.broadcasterCanUndo.enable ();
	}
	if ( undoRedo.undoIndex == undoRedo.undoLevels.length - 2 ) {
		this.bindingWindow.bindingMap.broadcasterCanRedo.disable ();
	}
}

/**
 * Update buttons.
 * @param {DOMElement} element
 */
WysiwygEditorSimpleToolBarBinding.prototype._updateButtons = function ( element ) {
	
	var structure = new List ();
	var commands = new Map ();
	var buttons = this._buttons;
	var align = null;
	
	/**
	 * Collec ancestor nodenames in a list. 
	 * Scanninf for any alignment on stuff.
	 */
	var el = element;
	do {
		if ( el.nodeType == Node.ELEMENT_NODE ) {
			structure.add ( el.nodeName.toLowerCase ());
			if ( !align && el.getAttribute ( "align" )) {
				align = el.getAttribute ( "align" );
			}
		}
	} while (( el = el.parentNode ) != null );

	/*
	 * Computing commands relevant for current node. Cases "img" and "a" 
	 * are due to a flaw in EditorBinding#hasSelection where images aren't 
	 * reckognized as selections.
	 */
	var wasAlignmentDisabled = false;
	while ( structure.hasNext ()) {
		switch ( structure.getNext () ) {
			case "img" :
				if ( this._isReservedClassName ( element.className )) {
					this._disableAlignment ( true );
					wasAlignmentDisabled = true;
				}
				buttons.get ( "compositeInsertLink" ).enable ();
				/*
				if ( buttons.get ( "compositeInsertLink" ).isDisabled ) {
					setTimeout ( function () {
						buttons.get ( "compositeInsertLink" ).enable ();
					}, 0 );
				}
				*/
				break;
			case "a" :
				buttons.get ( "unlink" ).enable ();
				break;
			case "ul" :
				commands.set ( "InsertUnorderedList", true );
				break;
			case "ol" :
				commands.set ( "InsertOrderedList", true );
				break;
			case "b" :
			case "strong" :
				commands.set ( "Bold", true );
				break;
			case "i" :
			case "em" :
				commands.set ( "Italic", true );
				break;
			case "u" :
				commands.set ( "Underline", true );
				break;
			case "strike" :
				commands.set ( "Strikethrough", true );
				break;
		}
	}
	
	if ( !wasAlignmentDisabled && this._isAlignmentDisabled ) {
		this._disableAlignment ( false );
	}
	
	if ( align ) {
		switch ( align ) {
			case "left":
				commands.set ( "JustifyLeft", true );
				break;
			case "right":
				commands.set (  "JustifyRight", true );
				break;
			case "middle":
			case "center":
				commands.set ( "JustifyCenter", true );
				break;
			case "justify":
				commands.set ( "JustifyFull", true );
				break;
		}
	}
	
	/*
	 * Check and uncheck buttons.
	 */
	this._buttons.each ( 
		function ( key, button ) {
			if ( button.cmd && ( button.isCheckButton || button.isRadioButton )) {
				var isChecked = commands.has ( button.cmd );
				button.setChecked ( isChecked, true );
			}
		}
	);
}

/**
 * This handles all button commands.
 * @overloads {WysiwygEditorToolBarBinding#handleAction}
 * @implements {IActionListener}
 * @param {Action} action
 */
WysiwygEditorSimpleToolBarBinding.prototype.handleAction = function ( action ) {

	WysiwygEditorSimpleToolBarBinding.superclass.handleAction.call ( this, action );

	var button = null;
	var binding = action.target;

	switch ( action.type ) {
		case ButtonBinding.ACTION_COMMAND :
			button = binding;
			break;
		case RadioGroupBinding.ACTION_SELECTIONCHANGED :
			button = binding.getCheckedButtonBinding ();
			break;
	}
	if ( button ) {
		var self = this;
		setTimeout ( function () {
			self._handleButton ( button );
		}, 0 );
	}
}

/**
 * Handle button.
 * @param {EditorToolBarButton} button
 */
WysiwygEditorSimpleToolBarBinding.prototype._handleButton = function ( button ) {

	if ( button.cmd ) {
		
		var isRelay = true;
	
		switch ( button.cmd ) {
			
			case "compositeswitchmode" :
				this.bindingWindow.bindingMap.editorpage.switchEditingMode ();
				isRelay = false;
				break;
				
			case "Undo" :
				var undoRedo = this._tinyInstance.undoRedo;
				this.bindingWindow.bindingMap.broadcasterCanRedo.enable ();
				if ( undoRedo.undoIndex == 2 ) {
					this.bindingWindow.bindingMap.broadcasterCanUndo.disable ();
				}
				break;
				
			case "Redo" :
				var undoRedo = this._tinyInstance.undoRedo;
				this.bindingWindow.bindingMap.broadcasterCanUndo.enable ();
				if ( undoRedo.undoIndex == undoRedo.undoLevels.length - 2 ) {
					this.bindingWindow.bindingMap.broadcasterCanRedo.disable ();
				}
				break;
				
			case "unlink" :
				this._buttons.get ( "compositeInsertLink" ).disable ();
				this._buttons.get ( "unlink" ).disable ();
				break;		
		}
		if ( isRelay ) {
			
			/*
			 * Relay command execution to TinyMCE. Note that 
			 * we disable nodechange awareness for the duration 
			 * of this operation (leads to weird toolbar behavior).
			 */
			this._isToolBarUpdate = true;
			this._editorBinding.handleCommand ( 
				button.cmd, button.val, button.gui
			);
			var self = this;
			setTimeout ( function () {
				self._isToolBarUpdate = false;
			}, 0 );
		}
	}
}

/**
 * Disabling alignement functions when eg. a function or field is selected.
 * @param {boolean} isDisable
 */
WysiwygEditorSimpleToolBarBinding.prototype._disableAlignment = function ( isDisable ) {
	
	if ( isDisable != this._isAlignmentDisabled ) {	
		var buttons = this._buttons;
		new List ([ "JustifyLeft", "JustifyRight", "JustifyCenter", "JustifyFull" ]).each (
			function ( cmd ) {
				var button = buttons.get ( cmd );
				if ( button.isDisabled != isDisable ) {
					button.setDisabled ( isDisable );
				}
			}
		);
		this._isAlignmentDisabled = isDisable;
	}
}

/**
 * Is internal classname?
 * @param {string} classname
 * @return {boolean}
 */
WysiwygEditorSimpleToolBarBinding.prototype._isReservedClassName = function ( classname ) {

	var result = false;
	if ( classname && classname != "" ) {
		switch ( classname ) {
			case WysiwygEditorBinding.RENDERING_CLASSNAME :
			case WysiwygEditorBinding.FIELD_CLASSNAME :
			case WysiwygEditorBinding.CLASSNAME_MEDIA :
			case WysiwygEditorBinding.CLASSNAME_FLASH :
			case WysiwygEditorBinding.CLASSNAME_QUICKTIME :
			case WysiwygEditorBinding.CLASSNAME_SHOCKWAVE :
			case WysiwygEditorBinding.CLASSNAME_WINMEDIA :
				result = true;
				break;
		}
	}
	return result;
}

/** 
 * Exposing buttons so that outside fellows can control the toolbar.
 * @param {string} cmd
 * @return {EditorToolBarButtonBinding}
 */
WysiwygEditorSimpleToolBarBinding.prototype.getButtonForCommand = function ( cmd ) {
	
	return this._buttons.get ( cmd );
}

/**
 * Controls the "link" and "unlink" buttons. Notice that method 
 * handleNodeChange also deals with these specific buttonts!
 * @implements {IEventListener}
 * @param {Event} e
 */
WysiwygEditorSimpleToolBarBinding.prototype.handleEvent = function ( e ) {
	
	if ( this._buttons.has ( "compositeInsertLink" )) {
	
		var linkButton		= this._buttons.get ( "compositeInsertLink" );
		var unLinkButton 	= this._buttons.get ( "unlink" );
		var isEnableLink 	= this._editorBinding.hasSelection ();
		var isEnableUnlink 	= false;
		
		var node = DOMEvents.getTarget ( e );
		do {
			if ( node.nodeType == Node.ELEMENT_NODE ) {
				if ( node.nodeName.toLowerCase () == "a" ) {
					isEnableLink = true;
					isEnableUnlink = true;
					break;
				}
			}
		} while (( node = node.parentNode ) != null );
		
		linkButton.setDisabled ( !isEnableLink );
		unLinkButton.setDisabled ( !isEnableUnlink );
	}
}

/**
 * Disable buttons when editor is unactivated.
 * TODO: To allow completely custom buttons, maybe move this to button itself?
 * @param {boolean} isDisabled
 */
WysiwygEditorSimpleToolBarBinding.prototype.setDisabled = function ( isDisabled ) {
	
	/*
	 * Timeout should allow another view to focus 
	 * any databinding before we update buttons.
	 */
	var self = this;
	setTimeout ( function () {
		self._buttons.each ( function ( key, button ) {
			switch ( button.cmd ) {
				case "Undo" :
				case "Redo" :
				case "compositeswitchmode" :
					// these should always be enabled...
					break;
				case "compositeInsertLink" :
				case "unlink" :
					if ( isDisabled ) {
						button.disable ();
					}
					break;
				default :
					button.setDisabled ( isDisabled );
					break;
			}
		});
	}, 10 );
}