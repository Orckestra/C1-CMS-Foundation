VisualMultiTemplateEditorBinding.prototype = new VisualMultiEditorBinding;
VisualMultiTemplateEditorBinding.prototype.constructor = VisualMultiTemplateEditorBinding;
VisualMultiTemplateEditorBinding.superclass = VisualMultiEditorBinding.prototype;

/** 
 * The VisualMultiTemplateEditorBinding supports multiple GROUPED content areas.
 * @class
 */
function VisualMultiTemplateEditorBinding () {

	/**
	 * @type {SystemLogger}
	 */
	this.logger = SystemLogger.getLogger ( "VisualMultiTemplateEditorBinding" );
	
	/**
	 * Cache content of deselected template placeholders, restore on reselection.
	 * @type {Map<string><string>}
	 */
	this._oldtextareas = null;

	/**
	 * Page id.
	 * @type {Guid}
	 */
	this._pageId = null;
	
	/*
	 * Returnable.
	 */
	return this;
}

/**
 * Identifies binding.
 */
VisualMultiTemplateEditorBinding.prototype.toString = function () {

	return "[VisualMultiTemplateEditorBinding]";
};

/**
 * @overloads {VisualEditorBinding#onBindingAttach}
 * @return
 */
VisualMultiTemplateEditorBinding.prototype.onBindingAttach = function () {
	
	VisualMultiTemplateEditorBinding.superclass.onBindingAttach.call ( this );
	this._oldtextareas = new Map ();

	if (this.getProperty("pageid"))
		this._pageId = this.getProperty("pageid");
}


/**
 * @overloads {VisualMultiEditorBinding#_initialize}
 */
VisualMultiTemplateEditorBinding.prototype._initialize = function () {
	
	var self = this;
	
	/*
	 * Rig up selector.
	 */
	var selector = this.getDescendantBindingByLocalName ( "selector" );
	selector.attach ();
	this._populateTemplateSelector ();
	
	/*
	 * Contained page selector is wired to control main page selector.
	 * When selection changes, main page performs a postback.
	 */
	var templateselector = this.getContentWindow ().bindingMap.templateselector;
	templateselector.addActionListener ( SelectorBinding.ACTION_SELECTIONCHANGED, {
		handleAction : function () {
			setTimeout ( function () {
				self._onTemplateSelectionChanged ();
			}, 0 );
		}
	});
	
	/*
	 * Show the template toolbar.
	 */
	this.getContentWindow ().bindingMap.templatetoolbar.show ();
	
	/*
	 * Invoke super method.
	 */
	VisualMultiTemplateEditorBinding.superclass._initialize.call ( this );
};

/**
 * Populate template selector from hidden selector selections.
 */
VisualMultiTemplateEditorBinding.prototype._populateTemplateSelector = function () {
	
	var hiddenselector = this.getDescendantBindingByLocalName ( "selector" );
	var templateselector = this.getContentWindow ().bindingMap.templateselector;
	hiddenselector.selections.each ( function ( selection ) {
		selection.imageProfile = new ImageProfile ({
			image : "${icon:page-template-template}"
		});
	});
	templateselector.populateFromList ( hiddenselector.selections );
}

/**
 * Template selection changed. This event must be channelized to the hidden selector.
 */
VisualMultiTemplateEditorBinding.prototype._onTemplateSelectionChanged = function () {
	
	var hiddenselector = this.getDescendantBindingByLocalName ( "selector" );
	var templateselector = this.getContentWindow ().bindingMap.templateselector;
	hiddenselector.selectByValue ( templateselector.getValue ());
	hiddenselector.dispatchAction ( PageBinding.ACTION_DOPOSTBACK );
	this.checkForDirty ( true );
}

/**
 * Actually parse textareas into treenodes.
 * @param {List<DOMElement>}
 */
VisualMultiTemplateEditorBinding.prototype._parsePlaceHolders = function ( textareas ) {
	
	/*
	 * Reset textareas Map but keep a copy of the old 
	 * map content in order to persist content changes. 
	 * Similarly named placeholder will inherit cache.
	 */
	var nev = this._textareas;
	var old = this._oldtextareas;
	
	if ( nev != null ) {	
		nev.each ( function ( key, value ) {
			old.set ( key, value );
		});
	}
	
	this._textareas = new Map ();
	
	/*
	 * Nifty function to persist changes. 
	 * @param {string} placeholderid
	 * @param {string} placeholdermarkup
	 * @return {string}
	 */
	function compute ( placeholderid, placeholdermarkup ) {
		var result = placeholdermarkup;
		if ( old.has ( placeholderid )) {
			result = old.get ( placeholderid ).placeholdermarkup;
		}
		return result;
	}
	
	/*
	 * Rig up textareas.
	 */
	while ( textareas.hasNext ()) {
		var textarea = textareas.getNext ();
		var placeholderid = textarea.getAttribute ( "placeholderid" );
		this._textareas.set ( placeholderid, 
			{
				placeholderid       : placeholderid,
				placeholdername 	: textarea.getAttribute ( "placeholdername" ),
				placeholdermarkup 	: compute ( placeholderid, textarea.value ),
				textareaelement		: textarea,
				isSelected 			: textarea.getAttribute ( "selected" ) == "true"
			}
		);
	}
	
	/*
	 * Populate the tree and locate the selected treenode.
	 * TODO: Don't copy paste this step from super class!
	 */
	var selected = null;
	var templatetree = this.getContentWindow ().bindingMap.templatetree;
	
	var treenodes = new Map ();
	this._textareas.each ( function ( name, object ) {
		var treenode = templatetree.add ( 
			TreeNodeBinding.newInstance ( 
				templatetree.bindingDocument 
			)
		);
		treenode.setLabel ( object.placeholdername );
		treenode.setImage ( "${icon:placeholder}" );
		treenode.setProperty ( "placeholder", true );
		treenode.textareaname = name;
		treenodes.set ( object.placeholdername, treenode );
		if ( object.isSelected ) {
			selected = treenode;
		}
	});
	
	templatetree.attachRecursive ();
	
	/*
	 * This convoluted setup ensures that a placeholder  
	 * will be selected that matches the last selected    
	 * placeholder (before template was changed).
	 */
	if ( selected != null ) {
	
		var isDefaultBehavior = true;
		
		if ( this._oldtextareas.hasEntries ()) {
			
			isDefaultBehavior = false;
			var map = new Map ();
			this._textareas.each ( function ( id, object ) {
				map.set ( object.placeholdername, true );
			});
			if ( !map.has ( this._placeholdername )) {
				isDefaultBehavior = true;
			}
		}
		
		if ( isDefaultBehavior ) {
			var object = this._textareas.get ( selected.textareaname );
			this._textareaname = selected.textareaname;
			this._placeholdername = object.placeholdername;
			this._setContentFromPlaceHolder ( selected.textareaname );
			selected.focus ();
		} else {
			var treenode = treenodes.get ( this._placeholdername );
			this._textareaname = treenode.textareaname;
			treenode.focus ();
		}
	}
};

/**
 * Some pretty hacked stuff going on here. Stuff like this should not be communicated 
 * through the page DOM, but via a dedicated service offering structured data. Oh well...
 * @implements {IUpdateHandler}
 * @overloads {VisualMultiEditorBinding#updateElement}
 * @param {Element} newelement
 * @param {Element} oldelement
 * @return {boolean}
 */
VisualMultiTemplateEditorBinding.prototype.updateElement = function ( newelement, oldelement ) {
	
	var newselector = newelement.getElementsByTagName ( "ui:selector" ).item ( 0 );
	var oldselector = oldelement.getElementsByTagName ( "ui:selector" ).item ( 0 );
	
	var hasChanges = false;
	
	if ( newselector != null && oldselector != null ) {
		var newselections = new List ( newselector.getElementsByTagName ( "ui:selection" )); 
		var oldselections = new List ( oldselector.getElementsByTagName ( "ui:selection" ));
		if ( newselections.getLength () != oldselections.getLength ()) {
			hasChanges = true;
		} else {
			newselections.each ( function ( element, index ) {
				var newvalue = element.getAttribute ( "value" );
				var oldvalue = oldselections.get ( index ).getAttribute ( "value" );
				if ( newvalue != oldvalue ) {
					hasChanges = true;
				}
				return !hasChanges;
			});
		}
	}
	
	if ( hasChanges ) {
		var div = this.bindingElement.getElementsByTagName ( "div" ).item ( 1 );
		this.bindingWindow.DocumentManager.detachBindings ( div, true );
		div.innerHTML = DOMSerializer.serialize ( newselector );
		this.bindingWindow.DocumentManager.attachBindings ( div );
		this._populateTemplateSelector ();
	}
	
	return VisualMultiTemplateEditorBinding.superclass.updateElement.call ( this, newelement, oldelement );
}

/**
 * @overloads {VisualEditorBinding#getSoapTinyContent}
 * @return {SOAP}
 */
VisualMultiTemplateEditorBinding.prototype.getSoapTinyContent = function (content) {
	var pageId = this._pageId;
	var placeholder = this._textareaname;
	var templateId = this.getDescendantBindingByLocalName ( "selector" ).getValue();
	return XhtmlTransformationsService.StructuredContentToTinyContentMultiTemplate(content, pageId, templateId, placeholder);
}

/**
 * @overloads {VisualEditorBinding#getImageTagForFunctionCall}
 * @return {SOAP}
 */

VisualEditorBinding.prototype.getImageTagForFunctionCall = function (markup) {
	var pageId = this._pageId;
	var placeholder = this._textareaname;
	var templateId = this.getDescendantBindingByLocalName("selector").getValue();
	return XhtmlTransformationsService.GetImageTagForFunctionCall2(markup, pageId, templateId, placeholder);
}