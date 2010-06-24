MultiSelectorDialogPageBinding.prototype = new DialogPageBinding;
MultiSelectorDialogPageBinding.prototype.constructor = MultiSelectorDialogPageBinding;
MultiSelectorDialogPageBinding.superclass = DialogPageBinding.prototype;

/**
 * @class
 */
function MultiSelectorDialogPageBinding () {

	/**
	 * @type {SystemLogger}
	 */
	this.logger = SystemLogger.getLogger ( "MultiSelectorDialogPageBinding" );
	
	/**
	 * This property is provided as page argument 
	 * and will page returned as dialog result.
	 * @type {List<SelectorBindingSelection>}
	 */
	this._selections = null;
	
	/**
	 * The left selector.
	 * @type {MultiSelectorBinding}
	 */
	this._left = null;
	
	/**
	 * The right selector.
	 * @type {MultiSelectorBinding}
	 */
	this._left = null;
	
	/**
	 * The left broadcaster.
	 * @type {BroadcasterBinding}
	 */
	this._broadcasterLeft = null;
	
	/**
	 * The right broadcaster.
	 * @type {BroadcasterBinding}
	 */
	this._broadcasterLeft = null;
	
	/**
	 * The up broadcaster.
	 * @type {BroadcasterBinding}
	 */
	this._broadcasterUp = null;
	
	/**
	 * The down broadcaster.
	 * @type {BroadcasterBinding}
	 */
	this._broadcasterDown = null;
}

/**
 * Identifies binding.
 */
MultiSelectorDialogPageBinding.prototype.toString = function () {
	
	return "[MultiSelectorDialogPageBinding]";
}

/**
 * @overloads {PageBinding#setPageArgument}
 * @param {object} arg
 */
MultiSelectorDialogPageBinding.prototype.setPageArgument = function ( arg ) {
	
	MultiSelectorDialogPageBinding.superclass.setPageArgument.call ( this );
	
	this.label = arg.label;
	this._selections = arg.selections;
}

/**
 * @overloads {DialogPageBinding#onBeforePageInitialize}
 */
MultiSelectorDialogPageBinding.prototype.onBeforePageInitialize = function () {
	
	this.addActionListener ( MultiSelectorBinding.ACTION_SELECTIONCHANGED );
	
	var map = this.bindingWindow.bindingMap;
	
	/*
	 * Locate key players.
	 */
	this._left = map.leftselector;
	this._right = map.rightselector;
	this._broadcasterRight = map.broadcasterRight;
	this._broadcasterLeft = map.broadcasterLeft;
	this._broadcasterUp = map.broadcasterUp;
	this._broadcasterDown = map.broadcasterDown;
	
	/*
	 * Setup doubleclick.
	 */
	DOMEvents.addEventListener ( this._left.bindingElement, DOMEvents.DOUBLECLICK, this );
	DOMEvents.addEventListener ( this._right.bindingElement, DOMEvents.DOUBLECLICK, this );
	
	/*
	 * Populate selectors. Left selector is rigged to show unselected selections.
	 */
	if ( this._selections.hasEntries ()) {
		this._left.populateFromList ( this._selections );
		this._right.populateFromList ( this._selections );
	}
	
	MultiSelectorDialogPageBinding.superclass.onBeforePageInitialize.call ( this );
}

/**
 * @overloads {DialogPageBinding#handleAction}
 * @implements {IActionListener}
 * @overloads {Binding#handleAction}
 * @param {Action} action
 */
MultiSelectorDialogPageBinding.prototype.handleAction = function ( action ) {
	
	MultiSelectorDialogPageBinding.superclass.handleAction.call ( this, action );
	
	var binding = action.target;
	var id = binding.bindingElement.id;
	
	switch ( action.type ) {
	
		/*
		 * Listener added by PageBinding superclass
		 */
		case ButtonBinding.ACTION_COMMAND : 
		
			switch ( id ) {
				case "rightbutton" :
				case "leftbutton" :
				case "upbutton" :
				case "downbutton" :
					this._handleButton ( binding );
					action.consume ();
					break;
			}
			break;
		
		/*
		 * Updating buttons when selection changes.
		 */
		case MultiSelectorBinding.ACTION_SELECTIONCHANGED :
		
			this._broadcasterRight.setDisabled ( !this._right.hasHighlight ());
			this._broadcasterLeft.setDisabled ( !this._left.hasHighlight ());
			this._updateUpDownBroadcasters ();
			break;
	}
	
	MultiSelectorDialogPageBinding.superclass.handleAction.call ( this, action );
}

/**
 * @param {ClickButtonBinding} binding
 */
MultiSelectorDialogPageBinding.prototype._handleButton = function ( binding ) {

	switch ( binding.bindingElement.id ) {
		case "rightbutton" :
			this._right.cumulateFromList ( this._left.extractSelected (), true );
			break;
		case "leftbutton" :
			this._left.cumulateFromList ( this._right.extractSelected (), true );
			break;
		case "upbutton" :
			this._right.reposition ( true );
			this._updateUpDownBroadcasters ();
			break;
		case "downbutton" :
			this._right.reposition ( false );
			this._updateUpDownBroadcasters ();
			break;
	}
}

/**
 * @overloads {PageBinding#handleEvent}
 * @imlements {IEventHandler}
 * @param {MouseEvent} e
 */
MultiSelectorDialogPageBinding.prototype.handleEvent = function ( e ) {
	
	MultiSelectorDialogPageBinding.superclass.handleEvent.call ( this, e );
	
	switch ( e.type ) {
		case DOMEvents.DOUBLECLICK :
			var element = DOMEvents.getTarget ( e );
			while ( DOMUtil.getLocalName ( element ) != "multiselector" ) {
				element = element.parentNode;
			}
			switch ( element ) {
				case this._left.bindingElement :
					this._right.cumulateFromList ( this._left.extractSelected (), true );
					break;
				case this._right.bindingElement :
					this._left.cumulateFromList ( this._right.extractSelected (), true );
					break;
			}
			break;
	}
	
	/*
	switch ( DOMUtil.getTarget ( e )) {
		case this._left.bindingElement :
			alert ( "LEFT" )
			break;
		case this._right.bindingElement :
			alert ( "RIGHT" )
			break;
			
	}
	*/
}

/**
 * Disable up-down buttons?
 */
MultiSelectorDialogPageBinding.prototype._updateUpDownBroadcasters = function () {
	
	if ( !this._right.hasHighlight ()) {
		this._broadcasterUp.setDisabled ( true );
		this._broadcasterDown.setDisabled ( true );
	} else {
		var list = this._right.toSelectionList ();
		if ( list.hasEntries ()) {
			this._broadcasterUp.setDisabled ( list.getFirst ().isHighlighted );
			this._broadcasterDown.setDisabled ( list.getLast ().isHighlighted );
		}
	}
}

/**
 * Combine left and right selections into a list. This list 
 * will be used to populate multiselector in original window.
 * @overloads {DialogPageBinding#onDialogAccept}
 */
MultiSelectorDialogPageBinding.prototype.onDialogAccept = function () {
	
	this.result = this._right.toSelectionList ();
	var temp = this._left.toSelectionList ();
	while ( temp.hasNext ()) {
		this.result.add ( temp.getNext ());
	}
	
	MultiSelectorDialogPageBinding.superclass.onDialogAccept.call ( this );
}