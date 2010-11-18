FormatSelectorBinding.prototype = new EditorSelectorBinding;
FormatSelectorBinding.prototype.constructor = FormatSelectorBinding;
FormatSelectorBinding.superclass = EditorSelectorBinding.prototype;

FormatSelectorBinding.LABEL_UNKNOWN = "(Unknown)"
FormatSelectorBinding.VALUE_UNKNOWN = "(Unknown)"
	
/*
<p>
<h1>, <h2>, <h3>, <h4>, <h5>, <h6>
<ol>, <ul>
<pre>
<address>
<blockquote>
<dl>
<div>
<fieldset>
<form>
<hr>
<noscript>
<table>
*/
	
/**
 * Block format controller.
 * @implements {IWysiwygEditorComponent}
 */
function FormatSelectorBinding () {

	/**
	 * @type {SystemLogger}
	 */
	this.logger = SystemLogger.getLogger ( "FormatSelectorBinding" );
	
	/**
	 * @type {List<SelectorBindingSelection>}
	 */
	this._list = null;
	
	/**
	 * @type {List<Format>}
	 */
	this.priorities = null;
	
	/**
	 * @type {HTMLElement}
	 */
	this._element = null;
	
	/**
	 * @type {HashMap<string><Format>}
	 */
	this._formats = new Map ();
	
	/*
	 * Returnable.
	 */
	return this;
}

/**
 * Identifies binding.
 */
FormatSelectorBinding.prototype.toString = function () {

	return "[FormatSelectorBinding]";
}

/**
 * Populate selector on build.
 * @overloads {EditorSelectorBinding#buildDOMContent}
 */
FormatSelectorBinding.prototype.buildDOMContent = function () {
	
	FormatSelectorBinding.superclass.buildDOMContent.call ( this );
	
	/*
	 * Mount and index configuration buttons.
	 */
	var groups = this._tinyTheme.formatGroups;
	var list = new List ([ 
	    new SelectorBindingSelection ( 
	    	FormatSelectorBinding.LABEL_UNKNOWN,
	    	FormatSelectorBinding.VALUE_UNKNOWN
	    )
	]);
	
	// isolating BLOCK format instances
	groups.each ( function ( group ) {
		var groupBinding = ToolBarGroupBinding.newInstance ( this.bindingDocument );
		group.each ( function ( format ) {
			if ( format.props.block != null && format.select != null ) {
				this._formats.set ( format.id, format );
				var name = format.select.label;
				var value = format.id;
				var notes = format.notes;
				list.add ( new SelectorBindingSelection ( name, value, null, null, notes ));
			}
		}, this );
	}, this );
	
	// Compute priorities
	var array = [];
	groups.each ( function ( group ) {
		group.each ( function ( format ) {
			if ( format.select != null && format.props.block != null ) {
				array.push ( format );
			}
		}, this );
	}, this );
	array.sort ( function ( f1, f2 ) {
		return f2.priority - f1.priority;
	});
	this.priorities = new List ( array );
	
	this.populateFromList ( list );
	
	var defaultitem = this._menuBodyBinding.getChildBindingByLocalName ( "menuitem" );
	defaultitem.disable ();
	
	this.addActionListener ( SelectorBinding.ACTION_SELECTIONCHANGED );
	this._list = list;
}

/**
 * Register as node change handler when TinyMCE is initialized.
 * @implements {IWysiwygEditorComponent}
 * @param {WysiwygEditorBinding} editor
 * @param {TinyMCE_Engine} engine
 * @param {TinyMCE_Control} instance
 * @param {TinyMCE_CompositeTheme} theme
 */
FormatSelectorBinding.prototype.initializeComponent = function ( editor, engine, instance, theme ) {
	
	FormatSelectorBinding.superclass.initializeComponent.call ( 
		this,
		editor, 
		engine, 
		instance,
		theme 
	);
	
	this._tinyTheme.registerNodeChangeHandler ( this );
}

/**
 * Implements {@link IActionHandler}
 * @overloads {SelectorBinding#handleAction}
 * @param {Action} action
 */
FormatSelectorBinding.prototype.handleAction = function ( action ) {

	FormatSelectorBinding.superclass.handleAction.call ( this, action );
	
	switch ( action.type ) {
		case SelectorBinding.ACTION_SELECTIONCHANGED :
			var value = this.getValue ();
			if ( this._formats.has ( value )) { // (exluding "Unknown" selection)
				var format = this._formats.get ( value );
				var formatter = this._tinyInstance.formatter;
				if ( formatter.canApply ( format.id )) {
					formatter.apply ( format.id );
				}
			}
			break;
	}
}

/**
 * Handle node change.
 * @implements {IWysiwygEditorNodeChangeHandler}
 * @param {DOMElement} element
 */
FormatSelectorBinding.prototype.handleNodeChange = function ( element ) {
	
	if ( element != this._element ) {
		
		this._element = element;
		
		var value = null;
		while ( value == null && element != null && element.nodeName.toLowerCase () != "body" ) {
			this.priorities.each ( function ( format ) {
				if ( this._tinyInstance.formatter.matchNode ( element, format.id )) {
					value = format.id;
				}
				return value == null;
			}, this );
			element = element.parentNode;
		}
		if ( value == null ) {
			value = FormatSelectorBinding.VALUE_UNKNOWN;
		}
		this.selectByValue ( value, true );
	}
}