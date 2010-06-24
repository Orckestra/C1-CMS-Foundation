WysiwygEditorStatusBarBinding.prototype = new ToolBarBinding;
WysiwygEditorStatusBarBinding.prototype.constructor = WysiwygEditorStatusBarBinding;
WysiwygEditorStatusBarBinding.superclass = ToolBarBinding.prototype;

WysiwygEditorStatusBarBinding.NAME_RENDERING 		= "[function]";
WysiwygEditorStatusBarBinding.NAME_FIELD 			= "[field]";
WysiwygEditorStatusBarBinding.NAME_FLASH 			= "[flash]";
WysiwygEditorStatusBarBinding.NAME_QUICKTIME 		= "[quicktime]";
WysiwygEditorStatusBarBinding.NAME_SHOCKWAVE 		= "[shockwave]";
WysiwygEditorStatusBarBinding.NAME_WINMEDIA 		= "[windowsmedia]";
WysiwygEditorStatusBarBinding.NAME_GENERICMEDIA 	= "[media]";

/**
 * @class
 */
function WysiwygEditorStatusBarBinding () {

	/**
	 * @type {SystemLogger}
	 */
	this.logger = SystemLogger.getLogger ( "WysiwygEditorStatusBarBinding" );
	
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
	
	/*
	 * Returnable.
	 */
	return this;
}

/**
 * Identifies binding.
 */
WysiwygEditorStatusBarBinding.prototype.toString = function () {
	
	return "[WysiwygEditorStatusBarBinding]";
}

/**
 * @overloads {ToolBarBinding#onBindingAttach}
 */
WysiwygEditorStatusBarBinding.prototype.onBindingAttach = function () {
	
	WysiwygEditorStatusBarBinding.superclass.onBindingAttach.call ( this );
	this.propertyMethodMap [ "isdisabled" ] = this.setDisabled;
	this.addActionListener ( ButtonBinding.ACTION_COMMAND );
	
	/*
	 * Register for initialization when TinyMCE is loaded.
	 */
	var tinywindow = this.bindingWindow.bindingMap.tinywindow;
	EditorBinding.registerComponent ( this, tinywindow );
}

/**
 * Register as node change handler when TinyMCE is initialized.
 * @implements {IWysiwygEditorComponent}
 * @param {WysiwygEditorBinding} editor
 * @param {TinyMCE_Engine} engine
 * @param {TinyMCE_Control} instance
 * @param {TinyMCE_CompositeTheme} theme
 */
WysiwygEditorStatusBarBinding.prototype.initializeComponent = function ( editor, engine, instance, theme ) {

	this._editorBinding = editor;
	this._tinyEngine	= engine;
	this._tinyInstance 	= instance;
	this._tinyTheme 	= theme;
	
	this._tinyTheme.registerNodeChangeHandler ( this );
}


/**
 * @implements {IWysiwygEditorNodeChangeHandler}
 * @param {DOMElement} element
 */
WysiwygEditorStatusBarBinding.prototype.handleNodeChange = function ( element ) {
	
	this._buildToolBar ( element );	
}

/**
 * Select DOM tree section on button command.
 * @implements {IActionListener}
 * @param {Action} action
 */
WysiwygEditorStatusBarBinding.prototype.handleAction = function ( action ) {
	
	switch ( action.type ) {
		case ButtonBinding.ACTION_COMMAND :
		
			var button = action.target;
			var depth = button.structuralDepth;
			var self = this;
			
			setTimeout ( function () { // explorer needs a timeout
				self._tinyEngine.execInstanceCommand ( 
					"mce_editor_0", 
					"mceSelectNodeDepth", 
					false, 
					depth 
				);
				self._buildToolBar ( self._tinyEngine.selectedElement );
			}, 0 );
			
			action.consume ();
			break;
	}
}

/**
 * @implements {IWysiwygEditorNodeChangeHandler}
 * @param {DOMElement} element
 */
WysiwygEditorStatusBarBinding.prototype._buildToolBar = function ( element ) {
	
	if ( element ) {
	
		var body = this._toolBarBodyLeft;
		if ( this._groupBinding ) {
			this._groupBinding.dispose ();
			this._groupBinding = null;
		}
		body.hide ();
		
		var elements = new List ();
		while ( element.nodeName.toLowerCase () != "body" ) {
			if ( element.nodeType == Node.ELEMENT_NODE ) {
				elements.add ( element );
			}
			element = element.parentNode;
		}
		
		if ( elements.reverse ().hasEntries ()) {
			
			var groupBinding = ToolBarGroupBinding.newInstance ( this.bindingDocument );
			var structuralDepth = elements.getLength ();
			
			while ( elements.hasNext ()) {
				groupBinding.add ( 
					this._getButtonBinding ( elements.getNext (), -- structuralDepth )
				);
			}
			this.addLeft ( groupBinding );
			this._groupBinding = groupBinding;
			groupBinding.attachRecursive ();
		}
		
		body.show ();
	}
}

/**
 * Build special label to show the name of currently edited placeholder.
 * @param {string} name Use null to undisplay the placeholder
 */
WysiwygEditorStatusBarBinding.prototype.setPlaceHolderName = function ( name ) {
	
	if ( !this._placeholderlabel ) {
		
		var doc = this.bindingDocument;
		var group = ToolBarGroupBinding.newInstance ( doc );
		var label = group.add ( ToolBarLabelBinding.newInstance ( doc ));
		
		label.setImage ( "${icon:placeholder}" );
		
		if ( name ) {
			label.setLabel ( name );
		} else {
			label.hide ();
		}
		
		this.addLeftFirst ( group );
		group.attachRecursive ();
		this._placeholderlabel = label;
		this._toolBarBodyLeft.refreshToolBarGroups ();
		
	} else {
		
		if ( name ) {
			this._placeholderlabel.setLabel ( name );
			this._placeholderlabel.show ();
		} else {
			this._placeholderlabel.hide ();
		}
	}
}

/**
 * @param {DOMElement} element
 * @param {int} structuralDepth
 * return {EditorToolBarButtonBinding}
 */
WysiwygEditorStatusBarBinding.prototype._getButtonBinding = function ( element, structuralDepth ) {
	
	var buttonBinding = EditorToolBarButtonBinding.newInstance ( document );
	var nodeName = element.nodeName.toLowerCase ();
	var nodeData = "";
	
	switch ( nodeName ) {
		case "img" :
			var classname = element.className;
			if ( classname != "" ) {
				if ( classname == WysiwygEditorBinding.RENDERING_CLASSNAME ) {
					nodeName = WysiwygEditorStatusBarBinding.NAME_RENDERING;
				} else if ( classname == WysiwygEditorBinding.FIELD_CLASSNAME ) {
					nodeName = WysiwygEditorStatusBarBinding.NAME_FIELD;
				} else if ( element.className.indexOf ( WysiwygEditorBinding.CLASSNAME_MEDIA ) >-1 ) {
					if ( element.className.indexOf ( WysiwygEditorBinding.CLASSNAME_FLASH ) >-1 ) {
						nodeName = WysiwygEditorStatusBarBinding.NAME_FLASH;
					} else if ( element.className.indexOf ( WysiwygEditorBinding.CLASSNAME_QUICKTIME ) >-1 ) {
						nodeName = WysiwygEditorStatusBarBinding.NAME_QUICKTIME;
					} else if ( element.className.indexOf ( WysiwygEditorBinding.CLASSNAME_SHOCKWAVE ) >-1 ) {
						nodeName = WysiwygEditorStatusBarBinding.NAME_SHOCKWAVE;
					} else if ( element.className.indexOf ( WysiwygEditorBinding.CLASSNAME_WINMEDIA  ) >-1 ) {
						nodeName = WysiwygEditorStatusBarBinding.NAME_WINMEDIA;
					} else {
						nodeName = WysiwygEditorStatusBarBinding.NAME_GENERICMEDIA;
					}
				}
			}
			break;
		case "b" :
			nodeName = "strong";
			break;
		case "i" :
			nodeName = "em";
			break;
		 case "font" :
			nodeName = "span";
	}
	
	
	var id = element.id;
	var classname = element.className;
	
	if ( id != "" ) {
		nodeData += "id=\"" + id + "\" ";
		nodeName += "#" + id;
	}
	if ( classname != "" &&
		classname != WysiwygEditorBinding.FIELD_CLASSNAME && 
		classname != WysiwygEditorBinding.RENDERING_CLASSNAME 
		) { // && classname.indexOf ( 'mceItem' ) == -1 
		classname = VisualEditorBinding.getTinyLessClassName ( classname );
		switch ( nodeName ) {
			case WysiwygEditorStatusBarBinding.NAME_FLASH :
			case WysiwygEditorStatusBarBinding.NAME_QUICKTIME :
			case WysiwygEditorStatusBarBinding.NAME_SHOCKWAVE :
			case WysiwygEditorStatusBarBinding.NAME_WINMEDIA :
			case WysiwygEditorStatusBarBinding.NAME_GENERICMEDIA :
				classname = classname.indexOf ( " " ) >-1 ? 
					classname.split ( " " )[ 1 ] : "";
				break;					
		}
		if ( classname != "" ) {
			nodeData += "class=\"" + classname + "\" ";
			nodeName += "." + classname;
		}
	}
	
	buttonBinding.structuralDepth = structuralDepth;
	buttonBinding.setLabel ( nodeName );
	buttonBinding.setToolTip ( nodeData );
	return buttonBinding;
}

/**
 * Hide statusbar content when editor is not active.
 * @param {boolean} isDisable
 */
WysiwygEditorStatusBarBinding.prototype.setDisabled = function ( isDisabled ) {
	
	if ( this._groupBinding ) {
		if ( isDisabled ) {
			this._groupBinding.dispose ();
			this._groupBinding = null;
			this._toolBarBodyLeft.refreshToolBarGroups ();
		}
	}
}