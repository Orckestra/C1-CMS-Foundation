MultiSelectorBinding.prototype = new DataBinding;
MultiSelectorBinding.prototype.constructor = MultiSelectorBinding;
MultiSelectorBinding.superclass = DataBinding.prototype;

MultiSelectorBinding.DISPLAY_SELECTED = "selected";
MultiSelectorBinding.DISPLAY_UNSELECTED = "unselected";
MultiSelectorBinding.ACTION_COMMAND = "multiselector command";
MultiSelectorBinding.ACTION_SELECTIONCHANGED = "multiselector selection changed";

/**
 * @class
 * @implements {IData}
 */
function MultiSelectorBinding () {

	/**
	 * @type {SystemLogger}
	 */
	this.logger = SystemLogger.getLogger ( "MultiSelectorBinding" );
	
	/**
	 * @type {boolean}
	 */
	this.isEditable = true;
	
	/**
	 * @type {boolean}
	 */
	this.isSelectable = false;
	
	/**
	 * @type {DataDialogBinding}
	 */
	this._dataDialogBinding = null;
	
	/**
	 * @type {List<SelectorBindingSelection>}
	 */
	this.selections = null;
	
	/**
	 * Mapping selected entries (highlighted entries, that is).
	 * type {Map<string><HTMLDivElement>}
	 */
	this._selectionMap = null;
	
	/**
	 * What to display - selected or unselected 
	 * selections? Defaults to selected.
	 * @type {string}
	 */
	this._display = MultiSelectorBinding.DISPLAY_SELECTED;
	
	/**
	 * @type {HTMLDivElement}
	 */
	this._lastSelectedElement = null;
	
	/**
	 * Block common crawlers.
	 * @overwrites {Binding#crawlerFilters}
	 * @type {List<string>}
	 */
	this.crawlerFilters	= new List ([ DocumentCrawler.ID, FocusCrawler.ID ]);
}

/**
 * Identifies binding.
 */
MultiSelectorBinding.prototype.toString = function () {
	
	return "[MultiSelectorBinding]";
}

/**
 * @overloads {DataBinding#onBindingAttach}
 */
MultiSelectorBinding.prototype.onBindingAttach = function () {
	
	MultiSelectorBinding.superclass.onBindingAttach.call ( this );
	
	this.selections = this._getSelectionsList ();
	this.addActionListener ( DataDialogBinding.ACTION_COMMAND );
	this.addActionListener ( MultiSelectorDataDialogBinding.ACTION_RESULT );
	this.addEventListener ( DOMEvents.MOUSEDOWN );
	this._buildDOMContent ();
	this._parseDOMProperties ();
	this.populateFromList ( this.selections );
	
	/*
	 * Setup doubleclick.
	 */
	var dataDialog = this._dataDialogBinding;
	if ( dataDialog != null ) {
		DOMEvents.addEventListener ( this.shadowTree.box, DOMEvents.DOUBLECLICK, {
			handleEvent : function () {
				dataDialog.fireCommand ();
			}
		});
	}
}

/**
 * Build DOM content.
 */
MultiSelectorBinding.prototype._buildDOMContent = function () {
	
	// build box for result display
	this.shadowTree.box = DOMUtil.createElementNS ( Constants.NS_UI, "ui:box", this.bindingDocument );
	this.bindingElement.appendChild ( this.shadowTree.box );
}

/**
 * Parse DOM properties, instantiating editation and selectation.
 */
MultiSelectorBinding.prototype._parseDOMProperties = function () {
	
	var editable = this.getProperty ( "editable" );
	var selectable = this.getProperty ( "selectable" );
	var display = this.getProperty ( "display" );
	
	if ( editable != false ) {
		this._buildEditorButton ();
	} else {
		this.isEditable = false;
	}
	if ( selectable ) {
		this.isSelectable = true;
		this._selectionMap = new Map ();
	}
	if ( display ) {
		this._display = display;
	}
}

/**
 * Build button to launch editor. The button is actually a {@link MultiSelectorDataDialogBinding}.
 */ 
MultiSelectorBinding.prototype._buildEditorButton = function () {
	
	if ( this.isEditable ) {
	
		var datadialog = MultiSelectorDataDialogBinding.newInstance ( this.bindingDocument );
		datadialog.selections = this.selections;
		this.add ( datadialog );
		datadialog.attach ();
		
		this._dataDialogBinding = datadialog;
		this.shadowTree.datadialog = datadialog;
	}
}

/**
 * Populate multiselector. Clearing existing selections.
 * @param {List<SelectorBindingSelection>} list
 */
MultiSelectorBinding.prototype.populateFromList = function ( list ) {
	
	list.reset ();
	var isDisplay = false;
	
	this.shadowTree.box.innerHTML = "";
	
	while ( list.hasNext ()) {
		var selection = list.getNext ();
		switch ( this._display ) {
			case MultiSelectorBinding.DISPLAY_SELECTED :
				isDisplay = selection.isSelected;
				break;
			case MultiSelectorBinding.DISPLAY_UNSELECTED :
				isDisplay = selection.isSelected != true;
				break;
		}
		if ( isDisplay ) {
			this.shadowTree.box.appendChild (
				this._getElementForSelection ( selection )
			);
		}
	}
	
	this.selections = list;
	if ( this._dataDialogBinding ) {
		this._dataDialogBinding.selections = this.selections;
	}
}

/**
 * Append selections to existing selections. Note that 
 * automatic selection has been hardcoded into this.
 * @param {List<SelectorBindingSelection>} list
 * @param {boolean} isAssimilate If set to true, selection.isSelected is forced to adapt.
 */
MultiSelectorBinding.prototype.cumulateFromList = function ( list, isAssimilate ) {

	var box = this.shadowTree.box;
	var isDisplay = false;
	
	if ( list.hasEntries ()) {
	
		list.reverse ().reset ();
		while ( list.hasNext ()) { 
			var selection = list.getNext ();	
			if ( isAssimilate ) {
				selection.isSelected = this._display == MultiSelectorBinding.DISPLAY_SELECTED;
				isDisplay = true;
			} else {
				switch ( this._display ) {
					case MultiSelectorBinding.DISPLAY_SELECTED :
						isDisplay = selection.isSelected;
						break;
					case MultiSelectorBinding.DISPLAY_UNSELECTED :
						isDisplay = selection.isSelected != true;
						break;
				}
			}
			if ( isDisplay ) {
				var element = this._getElementForSelection ( selection );
		 		box.insertBefore ( element, box.firstChild );
		 		CSSUtil.attachClassName ( element, "selected" );
				this._selectionMap.set ( selection.value, element );
		 	}
		}
		
		// Because we autoselect, we can fire this.
		this.dispatchAction ( MultiSelectorBinding.ACTION_SELECTIONCHANGED );
	}
}

/**
 * Build a DIV element. This is very popular.
 * @param {SelectorBindingSelection} selection
 * @return {HTMLDivElement}
 */
MultiSelectorBinding.prototype._getElementForSelection = function ( selection ) {

	var element = DOMUtil.createElementNS ( Constants.NS_XHTML, "div", this.bindingDocument );
	element.appendChild ( this.bindingDocument.createTextNode ( selection.label ));
	element.setAttribute ( "label", selection.label );
	element.setAttribute ( "value", selection.value );
	return element;
}

/**
 * Has selection (highlighted entry)?
 * @return {boolean}
 */
MultiSelectorBinding.prototype.hasHighlight = function () {
	
	return this._selectionMap && this._selectionMap.hasEntries ();
}

/**
 * Focus on mousedown.
 * @implements {IActionListener}
 * @overloads {Binding#handleEvent}
 * @param {Action} action
 */
MultiSelectorBinding.prototype.handleEvent = function ( e ) {
	
	MultiSelectorBinding.superclass.handleEvent.call ( this, e );
	
	switch ( e.type ) {
		case DOMEvents.MOUSEDOWN :
			if ( !this.isFocused ) {
				this.focus ();
			}
			if ( this.isSelectable ) {
				var element = DOMEvents.getTarget ( e );
				var nodename = DOMUtil.getLocalName ( element );
				if ( nodename == "div" ) {
					this._handleMouseDown ( element );
					this.dispatchAction ( MultiSelectorBinding.ACTION_SELECTIONCHANGED );
				}
			}
			break;
	}
}

/**
 * Mousedown. Handling multiselect on shiftdown.
 * @param {HTMLDivElement} element
 */
MultiSelectorBinding.prototype._handleMouseDown = function ( element ) {

	if ( Keyboard.isShiftPressed && this._lastSelectedElement ) {
		
		var elements = this._getElements ();
		var value1 = element.getAttribute ( "value" );
		var value2 = this._lastSelectedElement.getAttribute ( "value" );
		
		var isSelect = false;
		while ( elements.hasNext ()) {
			var el = elements.getNext ();
			switch ( el.getAttribute ( "value" )) {
				case value1 :
				case value2 :
					isSelect = !isSelect;
					break;
			}
 			if ( isSelect ) {
 				this._hilite ( el );
 			} else {
 				this._unhilite ( el );
 			}
 			this._hilite ( this._lastSelectedElement );
 			this._hilite ( element );
		}
	} else {
		if ( Keyboard.isControlPressed && this._isHilited ( element )) {
			this._unhilite ( element );
		} else {
			this._hilite ( element );
		}
		if ( !Keyboard.isControlPressed ) {
			var self = this;
			this._getElements ().each ( function ( el ) {
				if ( el != element ) {
					self._unhilite ( el );
				}
			});
		}
	}
	
	this._lastSelectedElement = element;
}

/**
 * Highlight element.
 * @param {HTMLDivElement} element
 */
MultiSelectorBinding.prototype._hilite = function ( element ) {
	
	var value = element.getAttribute ( "value" );
	if ( !this._selectionMap.has ( value )) {
		CSSUtil.attachClassName ( element, "selected" );
		this._selectionMap.set ( value, element );
	}
}

/**
 * Don't highlight element.
 * @param {HTMLDivElement} element
 */
MultiSelectorBinding.prototype._unhilite = function ( element ) {

	var value = element.getAttribute ( "value" );
	if ( this._selectionMap.has ( value )) {
		CSSUtil.detachClassName ( element, "selected" );
		this._selectionMap.del ( value );
	}
}

/**
 * Is element highlighted?
 * @param {HTMLDivElement} element
 */
MultiSelectorBinding.prototype._isHilited = function ( element ) {

	return CSSUtil.hasClassName ( element, "selected" );
}

/**
 * Focus when button is handled; and hide the internal DataDialogBinding.
 * @implements {IActionListener}
 * @overloads {Binding#handleAction}
 * @param {Action} action
 */
MultiSelectorBinding.prototype.handleAction = function ( action ) {
	
	MultiSelectorBinding.superclass.handleAction.call ( this, action );
	
	var binding = action.target;
	
	switch ( action.type ) {
		
		/*
		 * Invoked when dialog is opened.
		 */
		case DataDialogBinding.ACTION_COMMAND :
			if ( binding == this._dataDialogBinding ) {
				if ( !this.isFocused ) {
					this.focus ();
				}
				this.dispatchAction ( MultiSelectorBinding.ACTION_COMMAND );
				action.consume ();
			}
			break;
			
		/*
		 * Invoked when dialog is closed.
		 */
		case MultiSelectorDataDialogBinding.ACTION_RESULT :
			this.populateFromList ( binding.result );
			this.dirty ();
			binding.result = null;
			action.consume ();
			break;
	}
}

/**
 * 
 * @return {List<SelectorBindingSelection}
 */
MultiSelectorBinding.prototype.extractSelected = function () {
	
	var result = null;
	if ( this.isSelectable ) {
		result = new List ();
		if ( this._selectionMap && this._selectionMap.hasEntries ()) {
		
			/*
			THIS WOULD EXTRACT IN RANDOM ORDER!
			this._selectionMap.each ( function ( key, element ) {
				element.parentNode.removeChild ( element );
				result.add ( new SelectorBindingSelection (
					element.getAttribute ( "label" ),
					element.getAttribute ( "value" ),
					true // hmmm....
				));
			});
			*/
			
			var self = this;
			this._getElements ().each ( function ( element ) {
				if ( self._isHilited ( element )) {
					element.parentNode.removeChild ( element );
					result.add ( new SelectorBindingSelection (
						element.getAttribute ( "label" ),
						element.getAttribute ( "value" ),
						true // hmmm....
					));
				}
			});
			
			this._selectionMap = new Map ();
			this.dispatchAction ( MultiSelectorBinding.ACTION_SELECTIONCHANGED );
		}
	}
	return result;
} 
 
/**
 * Reposition selected elements. Move either up or down.
 * @param {boolean} isUp
 */
MultiSelectorBinding.prototype.reposition = function ( isUp ) {
	
	/*
	 * Cannot use selectionMap because we need 
	 * to process sequentially in DOM node order.
	 */
	var elements = this._getElements ();
	if ( !isUp ) {
		elements.reverse ();
	}
	
	var isContinue = true;
	while ( isContinue && elements.hasNext ()) {
		var element = elements.getNext ();
		if ( this._isHilited ( element )) {
			switch ( isUp ) {
				case true :
					if ( element.previousSibling ) {
						element.parentNode.insertBefore ( element, element.previousSibling );
					} else {
						isContinue = false;
					}
					break;
				case false :
					if ( element.nextSibling ) {
						element.parentNode.insertBefore ( element, element.nextSibling.nextSibling );
					} else {
						isContinue = false;
					}
					break;
			}
		}
	}
}

/**
 * Parse DIV elements into a list of SelectorBindingSelection instances. 
 * Eeach SelectorBindingSelection is annotated with DIV highlighted status.
 * @see {MultiSelectorDialogPageBinding#_updateUpDownBroadcasters} 
 */
MultiSelectorBinding.prototype.toSelectionList = function () {
	
	var result = new List ();
	var isSelected = this._display == MultiSelectorBinding.DISPLAY_SELECTED;
	var self = this;
	
	this._getElements ().each ( function ( element ) {
		var selection = new SelectorBindingSelection (
			element.getAttribute ( "label" ),
			element.getAttribute ( "value" ),
			isSelected
		);
		selection.isHighlighted = self._isHilited ( element );
		result.add ( selection );
	});
	
	return result;
}

/**
 * Get those DIV elements.
 * @return {List<HTMLDivElement>}
 */
MultiSelectorBinding.prototype._getElements = function () {

    if (!this.shadowTree.box) {
        return new List(); // IE work around - on close this gets called, this.shadowTree.box is null. No side effect here.
    }
    return new List(
		DOMUtil.getElementsByTagName(
			this.shadowTree.box, "div"
		)
	);
}

/**
 * Parse ui:selection elements into instances of SelectorBindingSelection. 
 * This is used to populate the selector on startup.
 * @return {List<SelectorBindingSelection}
 */
MultiSelectorBinding.prototype._getSelectionsList = SelectorBinding.prototype._getSelectionsList;


// IMPLEMENT IDATA ...........................................................

/**
 * Validate.
 * @implements {IData}
 * @return {boolean}
 */
MultiSelectorBinding.prototype.validate = function () {
	
	return true;
}

/**
 * Manifest. This will write form elements into page DOM 
 * so that the server recieves something on form submit.
 * @implements {IData}
 */
MultiSelectorBinding.prototype.manifest = function () {
	
	/*
	 * We need to submit an "array" sort of thing. 
	 * First clear possible existing form elements.
	 */
	var inputs = new List ( DOMUtil.getElementsByTagName ( this.bindingElement, "input" ));
	if ( inputs.hasEntries ()) {
		inputs.each ( function ( input ) {
			input.parentNode.removeChild ( input );
		});
	}
	
	/*
	 * Build inputs for selected selections.
	 */
	this.selections.reset ();
	while ( this.selections.hasNext ()) {
		var selection = this.selections.getNext ();
		if ( selection.isSelected ) {
			var input = DOMUtil.createElementNS ( Constants.NS_XHTML, "input", this.bindingDocument );
			input.name = this._name;
			input.value = selection.value;
			this.bindingElement.appendChild ( input );
		}
	}
}

/**
 * Get value. This is intended for serversice processing.
 * @implements {IData}
 * @return {string}
 */
MultiSelectorBinding.prototype.getValue = function () {
	
	return "HEJ!";
}

/**
 * Set value.
 * @implements {IData}
 * @param {string} value
 */
MultiSelectorBinding.prototype.setValue = function ( value ) {
	
	alert ( value );
}

/**
 * Get result. This is intended for clientside processing.
 * @implements {IData}
 * @return {array
 */
MultiSelectorBinding.prototype.getResult = function () {
	
	alert ( "TODO: MultiSelectorBinding#getResult" );
	return new Array ();
}

/**
 * Set result.
 * @implements {IData}
 * @param {array} array
 */
MultiSelectorBinding.prototype.setResult = function ( array ) {

	alert ( "TODO: MultiSelectorBinding#setResult" );
}