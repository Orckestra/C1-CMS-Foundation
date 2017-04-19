StageDecksBinding.prototype = new DecksBinding;
StageDecksBinding.prototype.constructor = StageDecksBinding;
StageDecksBinding.superclass = DecksBinding.prototype;
StageDecksBinding.NODENAME_DECK = "stagedeck";
StageDecksBinding.ACTION_INITIALIZED = "stagedecks initialized";

/**
 * @class
 */
function StageDecksBinding () {

	/**
	 * @type {SystemLogger}
	 */
	this.logger = SystemLogger.getLogger ( "StageDecksBinding" );
	
	/**
	 * Associating handles to decks.
	 * @type {HashMap<string><StageDeckBinding>} 
	 */
	this._decks = {};
}

/**
 * Identifies binding.
 */
StageDecksBinding.prototype.toString = function () {

	return "[StageDecksBinding]";
}

/**
 * @overloads {Binding#onBindingInitialize}
 */
StageDecksBinding.prototype.onBindingInitialize = function () {

	StageDecksBinding.superclass.onBindingInitialize.call ( this );
	this.dispatchAction ( StageDecksBinding.ACTION_INITIALIZED );
}

/**
 * Mount viewDefinition, building decks.
 * @param {SystemViewDefinition} definition
 */
StageDecksBinding.prototype.mountDefinition = function ( definition ) {

	var deckBinding = StageDeckBinding.newInstance ( this.bindingDocument );
	deckBinding.handle = definition.handle;
	deckBinding.perspectiveNode = definition.node;
	deckBinding.definition = definition;
	if (Application.isTestEnvironment) {
		deckBinding.setProperty("data-qa", "perspective" + definition.label);
	}
	this._decks [ deckBinding.handle ] = deckBinding;
	this.add ( deckBinding );
	deckBinding.attach ();
}

/**
 * @param {string} handle
 */
StageDecksBinding.prototype.setSelectionByHandle = function ( handle ) {

	var deckBinding = this._decks [ handle ];
	StageBinding.perspectiveNode = deckBinding.perspectiveNode;
	this.select ( deckBinding );
}