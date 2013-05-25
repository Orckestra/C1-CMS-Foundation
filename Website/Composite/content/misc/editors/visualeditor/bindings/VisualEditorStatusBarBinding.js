VisualEditorStatusBarBinding.prototype = new ToolBarBinding;
VisualEditorStatusBarBinding.prototype.constructor = VisualEditorStatusBarBinding;
VisualEditorStatusBarBinding.superclass = ToolBarBinding.prototype;

VisualEditorStatusBarBinding.NAME_RENDERING 	= "[function]";
VisualEditorStatusBarBinding.NAME_FIELD 		= "[field]";
VisualEditorStatusBarBinding.NAME_HTML			= "[html]";

// TODO: THESE ARE NOT USED NO MORE!
VisualEditorStatusBarBinding.NAME_FLASH 		= "[flash]";
VisualEditorStatusBarBinding.NAME_QUICKTIME 	= "[quicktime]";
VisualEditorStatusBarBinding.NAME_SHOCKWAVE 	= "[shockwave]";
VisualEditorStatusBarBinding.NAME_WINMEDIA 		= "[windowsmedia]";
VisualEditorStatusBarBinding.NAME_GENERICMEDIA 	= "[media]";

/**
 * @class
 */
function VisualEditorStatusBarBinding () {

	/**
	 * @type {SystemLogger}
	 */
	this.logger = SystemLogger.getLogger ( "VisualEditorStatusBarBinding" );
	
	/**
	 * The containing editor.
	 * @type {VisualEditorBinding}
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
	this._element = null;
	
	/**
	 * @type {String}
	 */
	this._classname = null;
	
	/**
	 * @type {LabelBinding}
	 */
	this._placeholderlabel = null;
	
	/*
	 * Returnable.
	 */
	return this;
}

/**
 * Identifies binding.
 */
VisualEditorStatusBarBinding.prototype.toString = function () {
	
	return "[VisualEditorStatusBarBinding]";
}

/**
 * @overloads {ToolBarBinding#onBindingAttach}
 */
VisualEditorStatusBarBinding.prototype.onBindingAttach = function () {
	
	VisualEditorStatusBarBinding.superclass.onBindingAttach.call ( this );
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
 * @param {VisualEditorBinding} editor
 * @param {TinyMCE_Engine} engine
 * @param {TinyMCE_Control} instance
 * @param {TinyMCE_CompositeTheme} theme
 */
VisualEditorStatusBarBinding.prototype.initializeComponent = function ( editor, engine, instance, theme ) {

	this._editorBinding = editor;
	this._tinyEngine	= engine;
	this._tinyInstance 	= instance;
	this._tinyTheme 	= theme;
	
	this._tinyTheme.registerNodeChangeHandler ( this );
	
	/*
	 * A bug in Firefox 3.0 prevents us from attaching the blur listener to the window object.
	 * TODO: Check out if this code stil works as expected in Firefox 3.5!
	 */
	var self = this;
	var target = Client.isMozilla ? this._tinyInstance.getDoc () : this._tinyInstance.getWin (); 
	DOMEvents.addEventListener ( target, DOMEvents.BLUR, {
		handleEvent : function ( e ) {
			self._element = null;
		}
	});
}


/**
 * @implements {IWysiwygEditorNodeChangeHandler}
 * @param {DOMElement} element
 */
VisualEditorStatusBarBinding.prototype.handleNodeChange = function (element) {

    if (element != this._element || element.className != this._classname) {
        this._buildToolBar(element);
        this._element = element;
        this._classname = element.classname;
    }
}

/**
 * Select DOM tree section on button command.
 * @implements {IActionListener}
 * @overloads {Binding#handleAction}
 * @param {Action} action
 */
VisualEditorStatusBarBinding.prototype.handleAction = function (action) {

	VisualEditorStatusBarBinding.superclass.handleAction.call(this, action);

	switch (action.type) {
		case ButtonBinding.ACTION_COMMAND:
			var button = action.target;
			var depth = button.structuralDepth;

			var self = this;

			setTimeout(function () { // chrome needs a timeout
				//self._tinyInstance.execCommand("mceSelectNodeDepth", false, depth);
				var counter = 0;
				self._tinyInstance.dom.getParent(self._tinyInstance.selection.getNode(), function (node) {
					if (node.nodeType == 1 && counter++ == depth) {
						self._tinyInstance.selection.select(node);
						return false;
					}
				}, self._tinyInstance.getBody());
				self._tinyInstance.nodeChanged();
			}, 0);

			action.consume();
			break;
	}
}

/**
* Returns selected element
*/
VisualEditorStatusBarBinding.prototype._getSelectedNode = function () {
	return this._tinyInstance.selection.getNode();
}

/**
 * @implements {IWysiwygEditorNodeChangeHandler}
 * @param {DOMElement} element
 */
VisualEditorStatusBarBinding.prototype._buildToolBar = function ( element ) {
	
	if ( element != null ) {
	
		var body = this._toolBarBodyLeft;
		if ( this._groupBinding ) {
			this._groupBinding.dispose ();
			this._groupBinding = null;
		}
		body.hide ();
		
		var elements = new List ();
		while ( element != null && element.nodeName.toLowerCase () != "body" ) {
			if ( element.nodeType == Node.ELEMENT_NODE ) {
				elements.add ( element );
			}
			element = element.parentNode;
		}
		
		if ( elements.reverse ().hasEntries ()) {
			
			var groupBinding = ToolBarGroupBinding.newInstance ( this.bindingDocument );
			var structuralDepth = elements.getLength ();
			
			while ( elements.hasNext ()) {
				var e = elements.getNext ();
				if ( e.nodeName.toLowerCase () != "br" ) { // some new TinyMCE devilry
					groupBinding.add ( 
						this._getButtonBinding ( e, -- structuralDepth )
					);
				}
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
VisualEditorStatusBarBinding.prototype.setPlaceHolderName = function ( name ) {
	
	if ( this._placeholderlabel == null ) {
		
		var doc = this.bindingDocument;
		var group = ToolBarGroupBinding.newInstance ( doc );
		var label = group.add ( ToolBarLabelBinding.newInstance ( doc ));
		
		label.setImage ( "${icon:placeholder}" );
		
		if ( name != null ) {
			label.setLabel ( name );
		} else {
			label.hide ();
		}
		
		this.addLeftFirst ( group );
		group.attachRecursive ();
		this._placeholderlabel = label;
		
	} else {
		
		if ( name ) {
			this._placeholderlabel.setLabel ( name );
			this._placeholderlabel.show ();
		} else {
			this._placeholderlabel.hide ();
		}
	}
	
	this._toolBarBodyLeft.refreshToolBarGroups ();
}

/**
 * @param {DOMElement} element
 * @param {int} structuralDepth
 * return {EditorToolBarButtonBinding}
 */
VisualEditorStatusBarBinding.prototype._getButtonBinding = function ( element, structuralDepth ) {
	
	var button = EditorToolBarButtonBinding.newInstance ( this.bindingDocument );
	var nodeName = element.nodeName.toLowerCase ();
	var nodeData = "";
	
	switch ( nodeName ) {
		case "img":
			if (VisualEditorBinding.isFunctionElement(element))
				nodeName = VisualEditorStatusBarBinding.NAME_RENDERING; ;
			if (VisualEditorBinding.isFieldElement(element))
				nodeName = VisualEditorStatusBarBinding.NAME_FIELD;
			if (VisualEditorBinding.isHtmlElement(element))
				nodeName = VisualEditorStatusBarBinding.NAME_HTML;
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
	if ( classname != "" && !VisualEditorBinding.isReservedElement(element)
		) { 
		classname = VisualEditorBinding.getTinyLessClassName ( classname );
		if ( classname != "" ) {
			nodeData += "class=\"" + classname + "\" ";
			nodeName += "." + classname;
		}
	}
	
	button.structuralDepth = structuralDepth;
	button.setLabel ( nodeName );
	button.setToolTip ( nodeData );
	return button;
}

/**
 * Hide statusbar content when editor is not active.
 * @param {boolean} isDisable
 */
VisualEditorStatusBarBinding.prototype.setDisabled = function ( isDisabled ) {
	
	if ( this._groupBinding ) {
		if ( isDisabled ) {
			this._groupBinding.dispose ();
			this._groupBinding = null;
			this._toolBarBodyLeft.refreshToolBarGroups ();
		}
	}
}
