ExplorerDecksBinding.prototype = new DecksBinding;
ExplorerDecksBinding.prototype.constructor = ExplorerDecksBinding;
ExplorerDecksBinding.superclass = DecksBinding.prototype;
ExplorerDecksBinding.NODENAME_DECK = "explorerdeck";

/**
 * @class
 */
function ExplorerDecksBinding () {

	/**
	 * @type {SystemLogger}
	 */
	this.logger = SystemLogger.getLogger ( "ExplorerDecksBinding" );
	
	/**
	 * Associating handles to decks.
	 * @type {HashMap<string><ExplorerDeckBinding>} 
	 */
	this._decks = {};
	
	/*
	 * Returnable.
	 */
	return this;
}

/**
 * @overloads {DecksBinding#onBindingAttach}
 */
ExplorerDecksBinding.prototype.onBindingAttach = function () {
	
	ExplorerDecksBinding.superclass.onBindingAttach.call ( this );
	this.addActionListener ( PageBinding.ACTION_ATTACHED );
	// this.dispatchAction ( Binding.ACTION_ATTACHED );
}

/**
 * Identifies binding.
 */
ExplorerDecksBinding.prototype.toString = function () {

	return "[ExplorerDecksBinding]";
}

/**
 * Building decks on startup.
 * @param {SystemViewDefinition} definition
 */
ExplorerDecksBinding.prototype.mountDefinition = function ( definition ) {

	if ( definition instanceof SystemViewDefinition ) {
	
		// construct ViewBinding
		var viewBinding = ViewBinding.newInstance ( this.bindingDocument );
		viewBinding.setType ( ViewBinding.TYPE_EXPLORERVIEW );
		viewBinding.setDefinition ( definition );
		
		// construct DeckBinding
		var deckBinding = ExplorerDeckBinding.newInstance ( this.bindingDocument );
		deckBinding.setAssociatedView ( viewBinding );
		this._decks [ definition.handle ] = deckBinding;
		
		// append
		deckBinding.add ( viewBinding );
		this.add ( deckBinding );
		
		// attach - WebKit needs a short break here...
		setTimeout ( function () {
			deckBinding.attach ();
			viewBinding.attach ();
		}, 0 );
	}
}

/**
 * @param {string} handle
 */
ExplorerDecksBinding.prototype.setSelectionByHandle = function ( handle ) {
	
	var deckBinding = this._decks [ handle ];
	this.select ( deckBinding );
}

/**
 * Emulates recursive flex, but performs faster.
 * @param {int} pixels
 */
DecksBinding.prototype.expandBy = function ( pixels ) {
	
	var deck = this.getSelectedDeckBinding ();
	if ( deck ) {
		var height = this.bindingElement.offsetHeight + pixels;
		var view = deck.getAssociatedView ();
		this.bindingElement.style.height = height + "px";
		this.reflex ( true );
	}
}

/**
 * ExplorerDecksBinding factory.
 * @param {DOMDocument} ownerDocument
 * @return {ExplorerDecksBinding}
 */
ExplorerDecksBinding.newInstance = function ( ownerDocument ) {

	var element = DOMUtil.createElementNS ( Constants.NS_UI, "ui:explorerdecks", ownerDocument );
	return UserInterface.registerBinding ( element, ExplorerDecksBinding );
}