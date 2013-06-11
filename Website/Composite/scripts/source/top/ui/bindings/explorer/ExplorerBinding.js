ExplorerBinding.prototype = new FlexBoxBinding;
ExplorerBinding.prototype.constructor = ExplorerBinding;
ExplorerBinding.superclass = FlexBoxBinding.prototype;
ExplorerBinding.ACTION_INITIALIZED = "explorer initialized";
ExplorerBinding.ACTION_DECK_LOADED = "explorer deck loaded";

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
	var selectedView = selectedDeck.getAssociatedView();
	var selectedTree = selectedView.getContentWindow().bindingMap.tree;
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
	var selectedView = selectedDeck.getAssociatedView();
	var selectedTree = selectedView.getContentWindow().bindingMap.tree;
	
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
	 * @type {ExplorerDecksBinding}
	 */
	this._decksBinding = null;
	
	/**
	 * @type {ExplorerMenuBinding}
	 */
	this._menuBinding = null;
	
	/**
	 * @type {ExplorerSplitterBinding}
	 */
	this._splitterBinding = null;
	
	/**
	 * @type {int}
	 */
	this._dragStart = 0;
	
	/**
	 * @type {int}
	 */
	this._dragSlot = 0;
	
	/**
	 * @type {int}
	 */
	this._dragHeight = 0;

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
	
	this.addActionListener ( ExplorerMenuBinding.ACTION_SELECTIONCHANGED );
	this.addActionListener ( ViewBinding.ACTION_LOADED );
	this.addActionListener ( Binding.ACTION_DRAG );

	this._decksBinding = this.addMember ( 
		this.getDescendantBindingByLocalName ( "explorerdecks" )
	);
	this._splitterBinding = this.addMember ( 
		this.getDescendantBindingByLocalName ( "explorersplitter" )
	);
	this._menuBinding = this.addMember ( 
		this.getDescendantBindingByLocalName ( "explorermenu" )
	);
}

/**
 * @overloads {Binding#onBindingInitialize}
 */
ExplorerBinding.prototype.onBindingInitialize = function () {
	
	ExplorerBinding.bindingInstance = this;
	ExplorerBinding.superclass.onBindingInitialize.call ( this );
	this.dispatchAction ( ExplorerBinding.ACTION_INITIALIZED );
}

/**
 * @implements {IActionListener}
 * @overloads {FlexBoxBinding#handleAction}
 * @param {Action} action
 */
ExplorerBinding.prototype.handleAction = function ( action ) {
	
	ExplorerBinding.superclass.handleAction.call ( this, action );
	
	var binding = action.target;
	
	switch ( action.type ) {
	
		case ExplorerMenuBinding.ACTION_SELECTIONCHANGED :
			this._decksBinding.setSelectionByHandle ( 
				this._menuBinding.getSelectionHandle ()
			);
			var tag = this._menuBinding.getSelectionTag ();
			EventBroadcaster.broadcast ( BroadcastMessages.PERSPECTIVE_CHANGED, tag );
			break;
			
		case ViewBinding.ACTION_LOADED :
			this.dispatchAction ( ExplorerBinding.ACTION_DECK_LOADED );
			action.consume ();
			break;
			
		case Binding.ACTION_DRAG :
			if ( binding instanceof ExplorerSplitterBinding ) {
				binding.dragger.registerHandler ( this );
			}
			action.consume ();
	}
}

/**
 * Set selection by handle.
 * @param {string} handle
 */
ExplorerBinding.prototype.setSelectionByHandle = function ( handle ) {

	this._menuBinding.setSelectionByHandle ( handle );
}

/**
 * Selecting default (the first button).
 */
ExplorerBinding.prototype.setSelectionDefault = function () {
	
	this._menuBinding.setSelectionDefault ();
}

/**
 * Get selected deck.
 * @return {DeckBinding}
 */
ExplorerBinding.prototype.getSelectedDeckBinding = function () {
	
	return this._decksBinding.getSelectedDeckBinding ();
}

/**
 * Building explorer content on startup.
 * @param {SystemViewDefinition} definition
 */
ExplorerBinding.prototype.mountDefinition = function ( definition ) {
	
	if ( definition instanceof SystemViewDefinition ) {
		this._decksBinding.mountDefinition ( definition );
		this._menuBinding.mountDefinition ( definition );
	}
}


/**
 * Start splitter drag.
 * @implements {IDragHandler}
 * @param {Point} point
 */
ExplorerBinding.prototype.onDragStart = function ( point ) {
	
	var buttons = this._menuBinding.getDescendantBindingsByLocalName ( "explorertoolbarbutton" );
	
	if ( buttons.hasEntries ()) {
		
		var button = buttons.getFirst ();
		this._dragStart = button.boxObject.getLocalPosition ().y;
		this._dragSlot = 0;
		
		if ( this._dragHeight == 0 ) {
			this._dragHeight = button.boxObject.getDimension ().h;
		}
		
		this.bindingWindow.bindingMap.explorercover.show ();
	}
}

/**
 * On splitter drag.
 * @implements {IDragHandler}
 * @param {Point} diff
 */
ExplorerBinding.prototype.onDrag = function ( diff ) {
	
	var y = this._dragStart + diff.y;
	
	/*
	 * Show less?
	 */
	if ( y > this._dragStart + this._dragSlot + this._dragHeight ) {
		if ( this._menuBinding.showLess ()) {
			this._decksBinding.expandBy ( this._dragHeight);
			this._dragSlot += this._dragHeight;
		}
	}
	
	/*
	 * Show more?
	 */
	if ( y < this._dragStart + this._dragSlot ) {
		if ( this._menuBinding.showMore ()) {
			this._decksBinding.expandBy ( - this._dragHeight);
			this._dragSlot -= this._dragHeight;
		}
	}
}

/**
 * Stop splitter drag.
 * @implements {IDragHandler}
 * @param {Point} diff
 */
ExplorerBinding.prototype.onDragStop = function ( diff ) {

	this.bindingWindow.bindingMap.explorercover.hide ();
}