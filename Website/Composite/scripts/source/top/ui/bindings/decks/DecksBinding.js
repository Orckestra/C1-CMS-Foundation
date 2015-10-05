DecksBinding.prototype = new FlexBoxBinding;
DecksBinding.prototype.constructor = DecksBinding;
DecksBinding.superclass = FlexBoxBinding.prototype;
DecksBinding.ACTION_SELECTED = "decks deck selected";
DecksBinding.NODENAME_DECK = "deck";

/**
 * @class
 */
function DecksBinding () {

	/**
	 * @type {SystemLogger}
	 */
	this.logger = SystemLogger.getLogger ( "DecksBinding" );
	
	/**
	 * @type {DeckBinding}
	 */
	this._selectedDeckBinding = null;
	
	/**
	 * Storing decks dimensions in order to economize flex iterations.
	 * @see {DeckBinding#_invokeManagedRecursiveFlex}
	 * @type {Dimension}
	 */
	this._lastKnownDimension = null;
}

/**
 * Identifies binding.
 */
DecksBinding.prototype.toString = function () {

	return "[DecksBinding]";
}

/**
 * Overloads {FlexBoxBinding#onBindingRegister}
 */
DecksBinding.prototype.onBindingRegister = function () {

	DecksBinding.superclass.onBindingRegister.call ( this );
	this._lastKnownDimension = new Dimension ( 0, 0 );
	this.attachClassName ( "deckselement" );
}

/**
 * If no selected deck is specified, default select the first deck. The 
 * actual selection is invoked by the DeckBindings onBindingAttach method.
 * @overloads {Binding#onBindingAttach}
 */
DecksBinding.prototype.onBindingAttach = function () {

	DecksBinding.superclass.onBindingAttach.call ( this );
	
	var selectedindex = this.getProperty ( "selectedindex" );
	
	var decks = this.getDeckElements ();
	if ( decks.hasEntries ()) {
		var hasSelected = false;
		var index = 0;
		while ( decks.hasNext ()) {
			var deck = decks.getNext ();
			if ( selectedindex && index == selectedindex ) {
				deck.setAttribute ( "selected", "true" );
				hasSelected = true;
			} else if ( deck.getAttribute ( "selected" ) == "true" ) {
				hasSelected = true;
			}
			index ++;
		}
		if ( !hasSelected ) {
			decks.getFirst ().setAttribute ( "selected", "true" );
		}
	}
}

/**
 * Get deck elements.
 * @return {List<DOMElement>}
 */
DecksBinding.prototype.getDeckElements = function () {

	return this.getChildElementsByLocalName ( this.constructor.NODENAME_DECK );
}

/**
 * Select deck by one of three parameter types.
 * @param {object} arg This can be either an DOMElement, a DeckBinding or a string (element id).
 */
DecksBinding.prototype.select = function ( arg ) {

	var deckBinding = this.getBindingForArgument ( arg );
	
	if ( deckBinding != null ) {
		if ( deckBinding != this._selectedDeckBinding ) {
			if ( this._selectedDeckBinding ) {
				this._selectedDeckBinding.unselect ();
			}
			this._selectedDeckBinding = deckBinding;
			deckBinding.select ();
			var selectedindex = this.getProperty ( "selectedindex" );
			if ( selectedindex != null ) {
				this.setProperty ( 
					"selectedindex", 
					DOMUtil.getOrdinalPosition ( deckBinding.bindingElement, true )
				);
			}
			this.dispatchAction ( DecksBinding.ACTION_SELECTED );
			this.dispatchAction ( FocusBinding.ACTION_UPDATE );
		}
	} else {
		throw "No deck for argument " + arg;
	}
}

/**
 * Returns true if dimensions changed 
 * since method was lastly invoked.
 * @see {DeckBinding#_invokeManagedRecursiveFlex}
 * @return {boolean}
 */
DecksBinding.prototype.hasDimensionsChanged = function () {
	
	var result = false;
	var dim1 = this.boxObject.getDimension ();
	var dim2 = this._lastKnownDimension;
	
	if ( !Dimension.isEqual ( dim1, dim2 )) {
		result = true;
		this._lastKnownDimension = dim1;
	}
	
	return result;
}

/**
 * Get selected deck.
 * @return {DeckBinding}
 */
DecksBinding.prototype.getSelectedDeckBinding = function () {
	
	return this._selectedDeckBinding;
}

/**
 * DecksBinding factory.
 * @param {DOMDocument} ownerDocument
 * @return {DecksBinding}
 */
DecksBinding.newInstance = function ( ownerDocument ) {

	var element = DOMUtil.createElementNS ( Constants.NS_UI, "ui:decks", ownerDocument );
	return UserInterface.registerBinding ( element, DecksBinding );
}