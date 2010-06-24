DataInputSelectorBinding.prototype = new DataInputBinding;
DataInputSelectorBinding.prototype.constructor = DataInputSelectorBinding;
DataInputSelectorBinding.superclass = DataInputBinding.prototype;

DataInputSelectorBinding.INDICATOR_IMAGE = Resolver.resolve ( "${skin}/fields/selectorindicator.png" );
DataInputSelectorBinding.ACTION_SELECTIONCHANGED = "datainputselectorselectionchanged";

/**
 * @class
 * @implements {IData}
 */
function DataInputSelectorBinding () {

	/**
	 * @type {SystemLogger}
	 */
	this.logger = SystemLogger.getLogger ( "DataInputSelectorBinding" );
	
	/**
	 * @type {ToolBarButtonBinding}
	 */
	this._buttonBinding = null;
	
	/**
	 * @type {PopupBinding}
	 */
	this._popupBinding = null;
	
	/**
	 * @type {MenuBodyBinding}
	 */
	this._menuBodyBinding = null;
	
	/**
	 * @type {string}
	 */
	this._selectionValue = null;
	
	/**
	 * @type {boolean}
	 */
	this.isDirty = false;
		
	/**
	 * @type {boolean}
	 */
	this._hasKeyboard = false;
	
	/**
	 * Flipped when menitems need to be reattached.
	 * @type {boolean}
	 */
	this._isUpToDate = false;
	
	/**
	 * @type {MenuItemBinding}
	 */
	this._selectedItemBinding = null;
	
	/**
	 * Block common crawlers.
	 * @type {Map<string><boolean>}
	 * @overwrites {Binding#crawlerFilters}
	 */
	this.crawlerFilters	= new List ([ DocumentCrawler.ID, FocusCrawler.ID ]);
}

/**
 * Identifies binding.
 */
DataInputSelectorBinding.prototype.toString = function () {

	return "[DataInputSelectorBinding]";
}

/**
 * @overloads {DataBinding#onBindingDispose}
 * @see {SelectorBinding#onBindingDispose}
 */
DataInputSelectorBinding.prototype.onBindingDispose = SelectorBinding.prototype.onBindingDispose;

/**
 * Build button, build popup and populate by selection elements.
 * @overloads {DataBinding#_buildDOMContent}
 */
DataInputSelectorBinding.prototype._buildDOMContent = function () {
	 
	DataInputSelectorBinding.superclass._buildDOMContent.call ( this );
	
	this.buildButton ();
	this.buildPopup ();
	this.buildSelections ();
}

/**
 * Build button.
 */
DataInputSelectorBinding.prototype.buildButton = function () {

	var button = this.addFirst ( 
		ToolBarButtonBinding.newInstance ( this.bindingDocument )
	); 
	button.popupBindingTargetElement = this.shadowTree.input; 
	button.setImage ( DataInputSelectorBinding.INDICATOR_IMAGE );
	button.attach ();
	 
	var self = this;
	button.oncommand = function () {
	 	self._attachSelections ();
	}
	 
	this._buttonBinding = button;
}

/**
 * Build popup.
 * @see {SelectorBinding#buildPopup}
 */
DataInputSelectorBinding.prototype.buildPopup = SelectorBinding.prototype.buildPopup; 


/**
 * Build selections.
 */
DataInputSelectorBinding.prototype.buildSelections = function () {

	/* 
	 * Parse DOM content.
	 */
	var list = new List ();
	var selections = DOMUtil.getElementsByTagName ( this.bindingElement, "selection" );
	new List ( selections ).each ( function ( selection ) {
		if ( selection.getAttribute ( "label" )) {
			throw "label not supported - use value property!";
		} else {
			var value 	= selection.getAttribute ( "value" );
			var select 	= selection.getAttribute ( "selected" );
			var toolTip = selection.getAttribute ( "tooltip" );
			list.add ({
				value 		: value ? value : null,
				toolTip		: toolTip ? toolTip : null,
				isSelected	: ( select && select == "true" ) ? true : false
			});
		}
	});
	if ( list.hasEntries ()) {
		this.populateFromList ( list );
	}
}

/**
 * @param {List} list
 */
DataInputSelectorBinding.prototype.populateFromList = function ( list ) {
	
	var bodyBinding = this._menuBodyBinding;
	var bodyDocument = bodyBinding.bindingDocument;
	
	/* 
	 * Dispose existing content, remembering that bindings 
	 * may not be attached (before the button is pressed).
	 */
	while ( bodyBinding.bindingElement.hasChildNodes ()) {
		var node = bodyBinding.bindingElement.lastChild;
		if ( node.nodeType == Node.ELEMENT_NODE && UserInterface.hasBinding ( node )) {
			UserInterface.getBinding ( node ).dispose ();
		} else {
			bodyBinding.removeChild ( node );
		}
	}
	 
	/*
	 * Add new content.
	 */
	if ( list.hasEntries ()) {
	
		this._isUpToDate = false;
	
		if ( !this._buttonBinding.isVisible ) {
			this._buttonBinding.show ();
		}
		while ( list.hasNext ()) {
			var entry = list.getNext ();
			var itemBinding = MenuItemBinding.newInstance ( bodyDocument );
			itemBinding.setLabel ( entry.value );
			itemBinding.selectionValue = entry.value;
			if ( entry.toolTip ) {
				itemBinding.setToolTip ( entry.toolTip );
			}
			if ( entry.isSelected ) {
				this.select ( itemBinding, true );
			}
			bodyBinding.add ( itemBinding );
		}
	} else {
		this._buttonBinding.hide ();
	}
}

/**
 * @see {SelectorBinding#handleAction}
 * @param {Action} action
 */
DataInputSelectorBinding.prototype.handleAction = SelectorBinding.prototype.handleAction; 

/**
 * On button command.
 * @see {SelectorBinding#handleAction}
 */
DataInputSelectorBinding.prototype._onButtonCommand = function () {

	this.focus ();
	this._restoreSelection ();
	this.dispatchAction ( SelectorBinding.ACTION_COMMAND );
}

/**
 * On popup showing.
 * @see {SelectorBinding#handleAction}
 */
DataInputSelectorBinding.prototype._onPopupShowing = function () {

	this._fitMenuToSelector ();
	this._restoreSelection ();
	this._releaseKeyboard ();
}

/**
 * On menuitem command.
 * @param {MenuItemBinding} binding
 * @see {SelectorBinding#handleAction}
 */
DataInputSelectorBinding.prototype._onMenuItemCommand = function ( binding ) {

	this.select ( binding );
	FocusBinding.focusElement ( this.bindingElement );
	this._grabKeyboard ();
}

/**
 * Note that we evaluate this method in the context of 
 * both the superclass and the SelectorBinding class.
 * @implements {IBroadcastListener}
 * @see {SelectorBinding#handleAction}
 * @param {string} broadcast
 * @param {object} arg
 */
DataInputSelectorBinding.prototype.handleBroadcast = function ( broadcast, arg ) {
	
	SelectorBinding.prototype.handleBroadcast.call ( this, broadcast, arg );
	
	/*
	 * The DataInputBinding has been hacked to blur when a mousedown 
	 * is registered. This should obviously not extend to our button.
	 */
	switch ( broadcast ) {
		case BroadcastMessages.MOUSEEVENT_MOUSEDOWN :
			if ( arg != this._buttonBinding ) {
				DataInputSelectorBinding.superclass.handleBroadcast.call ( this, broadcast, arg );
			}
			break;
	}
	
}

/**
 * Grab keyboard.
 * @see {SelectorBinding#_grabKeyboard}
 */
DataInputSelectorBinding.prototype._grabKeyboard = SelectorBinding.prototype._grabKeyboard;

/**
 * Release keyboard.
 * @see {SelectorBinding#_releaseKeyboard}
 */
DataInputSelectorBinding.prototype._releaseKeyboard = SelectorBinding.prototype._releaseKeyboard;

/**
 * Keyboard navigation stuff.
 * @see {SelectorBinding#_handleArrowKey}
 * @param {int} key
 */
DataInputSelectorBinding.prototype._handleArrowKey = SelectorBinding.prototype._handleArrowKey;

/**
 * Focus.
 * @implements {IData}
 * @param {boolean} isDomEvent
 */
DataInputSelectorBinding.prototype.focus = function ( isDomEvent ) {
	
	if ( !this.isFocused ) {
		DataInputSelectorBinding.superclass.focus.call ( this, isDomEvent );
		if ( this.isFocused == true ) {
			this._grabKeyboard ();
		}	
	}
	
	/*
	if ( !this._hasKeyboard ) {	
		this._grabKeyboard ();
	}
	DataInputSelectorBinding.superclass.focus.call ( this, isDomEvent );
	*/
}

/**
 * Blur.
 * @implements {IData}
 * @param {boolean} isDomEvent
 */
DataInputSelectorBinding.prototype.blur = function ( isDomEvent ) {
	
	if ( this.isFocused == true ) {
		DataInputSelectorBinding.superclass.blur.call ( this, isDomEvent );
		this._releaseKeyboard ();
		if ( this._popupBinding.isVisible ) {		
			this._popupBinding.hide ();
		}
	}
	/*
	if ( this._hasKeyboard ) {
		this._releaseKeyboard ();
	}
	if ( this._popupBinding.isVisible ) {		
		this._popupBinding.hide ();
	}
	DataInputSelectorBinding.superclass.blur.call ( this, isDomEvent );
	*/
}

/**
 * For cosmetic reasons, attempting to make 
 * the opening menu as wide as the selector.
 * @see {SelectorBinding#handleAction}
 */
DataInputSelectorBinding.prototype._fitMenuToSelector = function () {
	
	var selectorWidth = this.bindingElement.offsetWidth + "px";
	var popupElement = this._popupBinding.bindingElement;
	
	if ( Client.isMozilla ) {
		popupElement.style.minWidth = selectorWidth;
	} else {
		popupElement.style.width = selectorWidth;
	}
}

/**
 * Restore selection.
 */
DataInputSelectorBinding.prototype._restoreSelection = function () {
	
	if ( !this._isUpToDate ) {
		this._attachSelections ();
	}
	
	var items = this._menuBodyBinding.getDescendantBindingsByLocalName ( "menuitem" );
	var value = this.getValue ();
	var selected = null;
	
	items.each ( function ( item ) {
		if ( item.getLabel () == value ) {
			selected = item;
		}
	});
	if ( selected ) {
		selected.focus ();
	}
	
}

/**
 * @param {MenuItemBinding} item
 * @param {boolean} isDefault Set while initializing to block action.
 */
DataInputSelectorBinding.prototype.select = function ( item, isDefault ) {
	
	if ( item != this._selectedItemBinding ) {
		
		this._selectedItemBinding = item;
		
		this.setValue ( item.selectionValue );
		
		if ( !isDefault ) {
			this.dirty ();
			this.dispatchAction ( 
				DataInputSelectorBinding.ACTION_SELECTIONCHANGED
			);
		}
	}
	this.shadowTree.input.focus ();
}

/**
 * Build selections. For faster page load time, the popup bindings 
 * get attached only when user handles the selector button.
 */
DataInputSelectorBinding.prototype._attachSelections = SelectorBinding.prototype._attachSelections;

/**
 * Set result (alias set value).
 * @implements {IData}
 * @param {object} result
 */
DataInputSelectorBinding.prototype.setResult = DataInputSelectorBinding.prototype.setValue;