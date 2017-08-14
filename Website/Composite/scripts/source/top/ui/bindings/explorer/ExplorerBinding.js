ExplorerBinding.prototype = new FlexBoxBinding;
ExplorerBinding.prototype.constructor = ExplorerBinding;
ExplorerBinding.superclass = FlexBoxBinding.prototype;
ExplorerBinding.ACTION_INITIALIZED = "explorer initialized";


/*
 * Perspective tags.
 * TODO: These should be updated to something more ... particular!
 */
ExplorerBinding.PERSPECTIVE_CONTENT		= "Content";
ExplorerBinding.PERSPECTIVE_MEDIA 		= "Media";
ExplorerBinding.PERSPECTIVE_DATA 		= "Datas";
ExplorerBinding.PERSPECTIVE_DESIGN 		= "Design";
ExplorerBinding.PERSPECTIVE_FUNCTIONS 	= "Functions";
ExplorerBinding.PERSPECTIVE_USERS 		= "Users";
ExplorerBinding.PERSPECTIVE_SYSTEM 		= "System";

/**
 * Static reference to the ExplorerBinding instance. Assigned on startup.
 * @see {ExplorerBinding#onBindingInitialize}
 * @type {ExplorerBinding}
 */
ExplorerBinding.bindingInstance = null;

/**
 * Get focused treenodes.
 * @return {List}
 */
ExplorerBinding.getFocusedTreeNodeBindings = function () {

	var selectedDeck = ExplorerBinding.bindingInstance.getSelectedDeckBinding();
	var selectedTree = selectedDeck.getSystemTree();
	if (!selectedTree) {
		return new List();
	}
	var focusedTreeNodeBinding = selectedTree.getFocusedTreeNodeBindings();

	//TODO: Refactor this
	//if nothing selected in tabs try find in dialog tree
	if (!focusedTreeNodeBinding.hasEntries() && StageBinding.treeSelector)
		focusedTreeNodeBinding = StageBinding.treeSelector.getFocusedTreeNodeBindings();

	return focusedTreeNodeBinding;
};


/**
 * Save focused Nodes.
 * @return {List}
 */
ExplorerBinding.saveFocusedNodes = function () {
	var treeNodeBindings = this.getFocusedTreeNodeBindings();
	LocalStore.focuseNodes.clear();
	treeNodeBindings.each(function (treeNodeBinding) {
		LocalStore.focuseNodes.add(treeNodeBinding.node);
	});

};


/**
 * Restore selected Nodes.
 * @return {List}
 */
ExplorerBinding.restoreFocuseNodes = function () {
	var entityTokens = LocalStore.focuseNodes.getEntityTokens();
	
	var selectedDeck = ExplorerBinding.bindingInstance.getSelectedDeckBinding();
	var selectedTree = selectedDeck.getSystemTree();
	
	entityTokens =  new List ( TreeService.GetCurrentLocaleEntityTokens(entityTokens.toArray()) );
	
	entityTokens.each(function(entityToken) {
		selectedTree._focusTreeNodeByEntityToken(entityToken);
	});
	
	LocalStore.focuseNodes.clear();
};

/**
 * @class
 */
function ExplorerBinding () {

	/**
	 * @type {SystemLogger}
	 */
	this.logger = SystemLogger.getLogger ( "ExplorerBinding" );
	
	/**
	 * @type {ExplorerMenuBinding}
	 */
	this._menuBinding = null;

	/*
	 * Returnable.
	 */
	return this;
}

/**
 * Identifies binding.
 */
ExplorerBinding.prototype.toString = function () {

	return "[ExplorerBinding]";
}

/**
 * @overloads {Binding#onBindingAttach}
 */
ExplorerBinding.prototype.onBindingAttach = function () {
	
	ExplorerBinding.superclass.onBindingAttach.call ( this );
	
	this._menuBinding = this.addMember ( 
		this.getDescendantBindingByLocalName ( "explorermenu" )
	);
}


/**
 * @overloads {TreeBinding#onBindingRegister}
 */
ExplorerBinding.prototype.onBindingRegister = function () {

	ExplorerBinding.superclass.onBindingRegister.call(this);

	this.setContextMenu(top.app.bindingMap.explorerpopup);
}


/**
 * @overloads {Binding#onBindingInitialize}
 */
ExplorerBinding.prototype.onBindingInitialize = function () {
	
	ExplorerBinding.bindingInstance = this;
	ExplorerBinding.superclass.onBindingInitialize.call ( this );
	this.dispatchAction(ExplorerBinding.ACTION_INITIALIZED);
	//update scroll after init
	this._menuBinding.updateScroll();
}

/**
 * Set selection by handle.
 * public API
 * @param {string} handle
 */
ExplorerBinding.prototype.setSelectionByHandle = function ( handle ) {

	this._menuBinding.setSelectionByHandle ( handle );
}

/**
 * Get selection handle.
 * public API
 */
ExplorerBinding.prototype.getSelectionHandle = function () {

	return this._menuBinding.getSelectionHandle();
}

/**
 * Selecting default (the first button).
 */
ExplorerBinding.prototype.setSelectionDefault = function () {
	
	this._menuBinding.setSelectionDefault ();
}

/**
 * Get Perspectives
 * public API
 */
ExplorerBinding.prototype.getPerspectives = function () {

	return this._menuBinding.getButtons();
}

/**
 * Get selected deck.
 * @return {DeckBinding}
 */
ExplorerBinding.prototype.getSelectedDeckBinding = function () {
	
	return app.bindingMap.stagedecks.getSelectedDeckBinding();
}

/**
 * Building explorer content on startup.
 * @param {SystemViewDefinition} definition
 */
ExplorerBinding.prototype.mountDefinition = function ( definition ) {
	
	if ( definition instanceof SystemViewDefinition ) {
		this._menuBinding.mountDefinition ( definition );
	}
}
