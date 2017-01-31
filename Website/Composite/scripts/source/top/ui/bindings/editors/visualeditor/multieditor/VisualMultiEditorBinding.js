VisualMultiEditorBinding.prototype = new VisualEditorBinding;
VisualMultiEditorBinding.prototype.constructor = VisualMultiEditorBinding;
VisualMultiEditorBinding.superclass = VisualEditorBinding.prototype;

/**
 * The VisualMultiTemplateEditorBinding supports multiple content areas.
 * @class
 */
function VisualMultiEditorBinding () {

	/**
	 * @type {SystemLogger}
	 */
	this.logger = SystemLogger.getLogger ( "VisualMultiEditorBinding" );

	/**
	 * Any placeholders in template?
	 * @type {boolean}
	 */
	this._hasPlaceHolders = false;

	/**
	 * Currently selected template placeholder.
	 * @type {string}
	 */
	this._textareaname = null;

	/**
	 * Map content of current template placeholders.
	 * @type {Map<string><string>}
	 */
	this._textareas = null;

	/**
	 * Index HTML markup of multiple documents.
	 * @type {Map<string><string>}
	 */
	this._xhtmls = null;

	/*
	 * Returnable.
	 */
	return this;
}

/**
 * Identifies binding.
 */
VisualMultiEditorBinding.prototype.toString = function () {

	return "[VisualMultiEditorBinding]";
};

/**
 * Make sure that we have som placeholders to show.
 * @overloads {VisualEditorBining#_maybeShowEditor}
 */
VisualMultiEditorBinding.prototype._maybeShowEditor = function () {

	if ( this._hasPlaceHolders ) {
		VisualMultiEditorBinding.superclass._maybeShowEditor.call ( this );
	}
};

/**
 * @overwrites {VisualEditorBinding#_setup}
 */
VisualMultiEditorBinding.prototype._setup = function () {

	/*
	 * Prepare for multiple head sections.
	 */
	this._xhtmls = new Map();

	/*
	 * Extract start content and determine key for storing HTML Markup.
	 */
	var textareas = this.getDescendantElementsByLocalName ( "textarea" );
	while ( textareas.hasNext ()) {
		var textarea = textareas.getNext ();
		if ( textarea.getAttribute ( "selected" ) == "true" ) {
			this._startContent = textarea.value;
			this._textareaname = textarea.getAttribute ( "placeholderid" );
		}
	}

	/*
	 * Fallback start content.
	 * TODO: Can this be fixed in super or even superduper class?
	 */
	if ( this._startContent == null ) {
		this._startContent = VisualEditorBinding.DEFAULT_CONTENT;
	}
}

/**
 * @overloads {VisualEditorBinding#_initialize}
 */
VisualMultiEditorBinding.prototype._initialize = function () {

	var self = this;

	/*
	 * Rig up the templates tree to update editor
	 * content when a new placeholder is selected.
	 */
	var templatetree = this.getContentWindow ().bindingMap.templatetree;
	templatetree.addActionListener ( TreeBinding.ACTION_SELECTIONCHANGED, {
		handleAction : function ( action ) {
			var treenode = templatetree.getSelectedTreeNodeBindings ().getFirst ();
			self._placeHolderSelected ( treenode.textareaname );
			action.consume ();
		}
	});

	templatetree.addActionListener ( Binding.ACTION_FOCUSED, {
		handleAction : function ( action ) {
			self._activateEditor ( false );
		}
	})

	/*
	 * Inject startup content.
	 */
	this._updatePlaceHolders ();

	/*
	 * Show the tools panel.
	 * TODO: Maybe move this somewhere else so that uncollapse isn't noticable?
	 */
	var splitter = this.getContentWindow ().bindingMap.toolsplitter;
	splitter.unCollapse ();

	/*
	 * Finally invoke super method.
	 */
	VisualMultiEditorBinding.superclass._initialize.call ( this );
};

/**
 * Parse textareas into treenodes.
 */
VisualMultiEditorBinding.prototype._updatePlaceHolders = function () {

	templatetree = this.getContentWindow ().bindingMap.templatetree;
	var textareas = this.getDescendantElementsByLocalName ( "textarea" );

	templatetree.empty ();

	if ( textareas.hasEntries ()) {
		this._hasPlaceHolders = true;
		this._parsePlaceHolders ( textareas );
		if ( this._isFinalized ) {
			this._pageBinding.showEditor ( true );
		}
	} else {
		this._hasPlaceHolders = false;
		this._noPlaceHolders ();
		if ( this._isFinalized ) {
			this._pageBinding.showEditor ( false );
		}
	}
};

/**
 * Actually parse textareas into treenodes.
 * @param {List<DOMElement>}
 */
VisualMultiEditorBinding.prototype._parsePlaceHolders = function ( textareas ) {

	this._textareas = new Map ();

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
				placeholdermarkup 	: textarea.value,
				textareaelement		: textarea,
				isSelected 			: textarea.getAttribute ( "selected" ) == "true"
			}
		);
	}

	/*
	 * Populate the tree and locate the selected treenode.
	 */
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
	 * Select treenode and mount editor content.
	 */
	if ( selected != null ) {
		var object = this._textareas.get ( selected.textareaname );
		this._textareaname = selected.textareaname;
		this._placeholdername = object.placeholdername;
		this._setContentFromPlaceHolder ( selected.textareaname );
		selected.focus ();
	}
};

/**
 * No placeholders in template: Display warning.
 */
VisualMultiEditorBinding.prototype._noPlaceHolders = function () {

	/*
	 * Build warning treenode.
	 */
	var templatetree = this.getContentWindow ().bindingMap.templatetree;
	var treenode = templatetree.add (
		TreeNodeBinding.newInstance (
			templatetree.bindingDocument
		)
	);
	treenode.setLabel ( StringBundle.getString ( "Composite.Web.VisualEditor", "TemplateTree.NoTemplateWarning" ));
	treenode.setImage ( "${icon:warning}" );
	treenode.attach ();

	/*
	 * Neutralize statusbar
	 */
	var statusbar = this.getContentWindow ().bindingMap.statusbar;
	statusbar.setPlaceHolderName ( null );
};

/**
 * Set editor content based on placeholder name. Currently,
 * this will reset the undo history for all placeholders.
 * @param {string} name
 */
VisualMultiEditorBinding.prototype._setContentFromPlaceHolder = function ( name ) {

	/*
	 * While initializing, content is presented in TinyMCE independantly from
	 * the current placeholder selction. Content is only updated when finalized.
	 */
	if ( this._isFinalized == true ) {
		var object = this._textareas.get ( name );
		var content = object.placeholdermarkup;
		this.setValue ( this.normalizeToDocument ( content ));
		this.resetUndoRedo ();
	}
};

/**
 * Do stuff when tree selection changes.
 * @param {string} textareaname
 */
VisualMultiEditorBinding.prototype._placeHolderSelected = function ( textareaname ) {

	/*
	 * Unless we are initializing, backup current placeholdermarkup.
	 */
	if ( this._isFinalized == true ) {
		if ( this._textareaname && this._textareas.has ( this._textareaname )) {
			this._textareas.get ( this._textareaname ).placeholdermarkup = this.getValue ();
		}
	}

	/*
	 * Register new placeholdernames
	 * and update the statusbar.
	 */
	this._textareaname = textareaname;
	this._placeholdername = this._textareas.get ( this._textareaname ).placeholdername;
	var statusbar = this.getContentWindow ().bindingMap.statusbar;
	statusbar.setPlaceHolderName ( this._placeholdername );

	/*
	 * Unless we are initializing,
	 * update TinyMCE contentarea.
	 */
	if ( this._isFinalized == true ) {
		var self = this;
		Application.lock ( self );
		setTimeout ( function () {
			self._setContentFromPlaceHolder ( textareaname );
			Application.unlock ( self );
		}, 0 );
	}

	this.updateCssClasses();
}

/**
 * Cache Html markup.
 * @overloads {VisualEditorBinding#extractBody}
 * @param {string} html
 */
VisualMultiEditorBinding.prototype.extractBody = function ( html ) {

	var result = VisualMultiEditorBinding.superclass.extractBody.call(this, html);
	this._xhtmls.set(this._textareaname, this._xhtml);
	return result;
}

/**
 * Get cached html markup.
 * @overwrites {VisualEditorBinding#_getHtmlMarkup}
 * @return {string}
 */
VisualMultiEditorBinding.prototype._getHtmlMarkup = function () {

	var result = VisualEditorBinding.XHTML;
	if ( this._xhtmls.has ( this._textareaname )) {
		result = this._xhtmls.get(this._textareaname);
		if ( result == null ) {
			result = VisualEditorBinding.XHTML;
		}
	}
	return result;
}

/**
 * Manifest. This will write form elements into page DOM
 * so that the server recieves something on form submit.
 * @overwrites {VisualEditorBinding#manifest}
 * @implements {IData}
 */
VisualMultiEditorBinding.prototype.manifest = function () {

	if ( this._textareas != null && this._textareas.hasEntries ()) {
		this._textareas.get ( this._textareaname ).placeholdermarkup = this.getValue ();
		this._textareas.each ( function ( name, object ) {
			object.textareaelement.value = object.placeholdermarkup;
		});
	}
};

/**
 * TODO: Fix this horrendous uglyfication.
 * @implements {IUpdateHandler}
 * @overwrites {EditorBinding#updateElement}
 * @param {Element} newelement
 * @param {Element} oldelement
 * @return {boolean}
 */
VisualMultiEditorBinding.prototype.updateElement = function (newelement, oldelement, hasChanges) {

	var newdiv = newelement.getElementsByTagName ( "div" ).item ( 0 );
	var olddiv = oldelement.getElementsByTagName ( "div" ).item ( 0 );
	var newareas = new List ( newdiv.getElementsByTagName ( "textarea" ));
	var oldareas = new List ( olddiv.getElementsByTagName ( "textarea" ));

	if ( newareas.getLength () != oldareas.getLength ()) {
		hasChanges = true;
	} else {
		var index = 0;
		newareas.each ( function ( newarea, index ) {
			var oldarea = oldareas.get ( index );
			var newid = newarea.getAttribute ( "placeholderid" );
			var oldid = oldarea.getAttribute ( "placeholderid" );
			var newname = newarea.getAttribute ( "placeholdername" );
			var oldname = oldarea.getAttribute ( "placeholdername" );
			if ( newid != oldid || newname != oldname ) {
				hasChanges = true;
			}
			return !hasChanges;
		})
	}

	if ( hasChanges ) {

		var html = null;
		if ( newdiv.innerHTML != null ) {
			html = newdiv.innerHTML;
		} else {
			html = DOMSerializer.serialize ( newdiv );
			html = html.substring ( html.indexOf ( ">" ) + 1, html.length );
			html = html.substring ( 0, html.lastIndexOf ( "<" ));
		}

		var div = this.bindingElement.getElementsByTagName ( "div" ).item ( 0 );
		if ( div != null ) {
			div.innerHTML = html;
		}

		this._updatePlaceHolders ();
	}

	return true;
}

VisualMultiEditorBinding.prototype.getContextContainer = function () {

	var result = null;
	var containerClasses = this.getContainerClasses();
	if (containerClasses != undefined) {
		var ancestorContainer = ContextContainer.getAncestorContextContainer(this);
		result = (ancestorContainer == null) ? new ContextContainer() : ancestorContainer.clone();
		result.setContainerClasses(containerClasses);
	}
	return result;
}

VisualMultiEditorBinding.prototype.getContainerClasses = function () {

	var result = null;
	var object = this._textareas.get(this._textareaname);
	if (object != null) {
		result = object.containerclasses;
	}
	return result;
}