StageDeckBinding.prototype = new DeckBinding;
StageDeckBinding.prototype.constructor = StageDeckBinding;
StageDeckBinding.superclass = DeckBinding.prototype;

StageDeckBinding.ACTION_LOADED = "stagedeck loaded";
StageDeckBinding.NODENAME_DECKS = "stagedecks";
StageDeckBinding.DEFAULT_URL = "${root}/content/misc/stage/stagedeck.aspx";
StageDeckBinding.CLASSNAME_TOOLS_OPEN = "toolsopen";

/**
 * @class
 * Please notice that some of these methods get evaluated in the
 * context of the {@link StageBoxHandlerAbstraction} in order
 * not to copy-paste code shared with the {@link StageBinding}.
 * @extends {StageBoxHandlerAbstraction}
 */
function StageDeckBinding () {

	/**
	 * @type {SystemLogger}
	 */
	this.logger = SystemLogger.getLogger ( "StageDeckBinding" );

	/**
	 * This property is set by the {@link StageDecksBinding}
	 * when the deck is constructed.
	 * @type {string}
	 */
	this.handle = null;

	/**
	 * @type {string}
	 */
	this.path = null;

	/**
	 * If true, contained tree needs to be refreshed.
	 * @type {boolean}
	 */
	this._isRefreshRequired = false;

	/**
	 * Associates the deck to the selected perspective.
	 * This property is set by the {@link StageDecksBinding} while building.
	 * @type {SystemNode}
	 */
	this.perspectiveNode = null;

	/**
	 * This flag is flipped once the *initial* content is loaded.
	 * @type {boolean}
	 */
	this.isReady = false;

	/**
	 * @type {boolean}
	 */
	this.isDefaultStageDeck = true;

	/**
	 * This flag is flipped once the *real* content is loaded.
	 * @type {boolean}
	 */
	this._isStageDeckBindingInitialized = false;

	/**
	 * Indexing docks by reference property.
	 * @type {Map<string><DockBinding>}
	 */
	this._dockBindings = null;

	/**
	 * Counting open docks in order
	 * to show and hide dockcontrols.
	 * @type {int}
	 */
	this._dockBindingCount = 0;

	/**
	 * Gets assigned in the newInstance method.
	 * @type {WindowBinding}
	 */
	this.windowBinding = null;

	/**
	 * Flipped by the StageBoxHandlerAbstraction when a panel is maximized.
	 * @type {boolean}
	 */
	this.isSubPanelMaximized = false;


	this.definition = null;
}

/**
 * Identifies binding.
 */
StageDeckBinding.prototype.toString = function () {

	return "[StageDeckBinding]";
}

/**
 * Notice that we are simulating a {@link StageBoxHandlerAbstraction} in
 * the inheritance chain. That's because the {@link StageBinding} is
 * interested in some of these functionalities as well.
 * @overloads {DecksBinding#onBindingRegister}
 */
StageDeckBinding.prototype.onBindingRegister = function () {

	StageDeckBinding.superclass.onBindingRegister.call ( this );
	StageBoxHandlerAbstraction.onBindingRegister.call ( this );

	this._dockBindings = new Map ();

	this.addActionListener ( WindowBinding.ACTION_LOADED );
	this.addActionListener ( TabBoxBinding.ACTION_ATTACHED );

	this.subscribe(BroadcastMessages.SYSTEMTREEBINDING_REFRESHALL);
}

/**
 * On first load event, the iframe is simply registered. On second load event,
 * the actual deck content has been loaded and the deck gets selected. Setup
 * ensures that there is no flash of white when Explorer loads deck content.
 * TODO: this url should probably be set already in the newInstance method
 * to avoid window content loading twice...
 * @implements {IActionListener}
 * @overloads {DeckBinding#handleAction}
 * @param {Action} action
 */
StageDeckBinding.prototype.handleAction = function ( action ) {

	StageDeckBinding.superclass.handleAction.call ( this, action );

	var binding = action.target;

	switch ( action.type ) {

		/*
		 * Startup.
		 */
		case WindowBinding.ACTION_LOADED :
			if ( binding == this.windowBinding ) {
				top.app.bindingMap.stagedeckscover.hide ();
				this.removeActionListener ( WindowBinding.ACTION_LOADED );
				this.addActionListener ( StageSplitBoxBinding.ACTION_DOCK_EMPTIED );
				this.addActionListener ( StageSplitBoxBinding.ACTION_DOCK_OPENED );
				this.dispatchAction(StageDeckBinding.ACTION_LOADED);

				action.consume ();
			}
			break;

		/*
		 * Indexing docks on startup.
		 */
		case TabBoxBinding.ACTION_ATTACHED :
			if ( binding instanceof DockBinding ) {
				this._dockBindings.set ( binding.reference, binding );
				binding.perspectiveNode = this.perspectiveNode;
			}
			break;

		/*
		 * Show dockcontrols when MORE than one dock is open.
		 */
		case StageSplitBoxBinding.ACTION_DOCK_OPENED :
			this._dockBindingCount ++;
			//if ( this._dockBindingCount == 2 ) {
			//	this._dockBindings.get ( "main" ).showControls ( true );
			//}
			action.consume (); // StageBinding is no longer listening!
			break;

		/*
		 * Hide dockcontrols only one deck is open.
		 */
		case StageSplitBoxBinding.ACTION_DOCK_EMPTIED :
			this._dockBindingCount --;
			//if ( this._dockBindingCount == 1 ) {
			//	this._dockBindings.get ( "main" ).showControls ( false );
			//}
			action.consume ();
			break;
	}

	/*
	 * Notice this hack!
	 */
	StageBoxHandlerAbstraction.handleAction.call ( this, action );
	StageDeckBinding.superclass.handleAction.call ( this, action );
}

/**
 * Iterate stagebox bindings, starting inside the contained WindowBinding.
 * This method is required by the StageBoxAbstractionHandler.
 * @see {StageBoxHandlerAbstraction#handleControlBoxAction}
 * @param {string} mode
 */
StageDeckBinding.prototype.iterateContainedStageBoxBindings = function ( mode ) {

	var crawler = new StageCrawler ();
	crawler.mode = mode;
	crawler.crawl ( this.windowBinding.getContentDocument ().body );
	crawler.dispose ();
}

/**
 * Load iframe content when first selected.
 * @overloads {DeckBinding#select}
 */
StageDeckBinding.prototype.select = function () {

	if (!this._isStageDeckBindingInitialized) {
		this.initialize();
	} else {
		EventBroadcaster.broadcast(BroadcastMessages.STAGEDECK_CHANGED, this.handle);
	}
	StageDeckBinding.superclass.select.call(this);

	if (this._isRefreshRequired == true) {
		this._refreshTree();
		this._isRefreshRequired = false;
	}

}

/**
 * Get that DockBinding.
 * @param {string} reference
 * @return {DockBinding}
 */
StageDeckBinding.prototype.getDockBindingByReference = function ( reference ) {

	return this._dockBindings.get ( reference );
}

StageDeckBinding.prototype.isPlaceholder = function () {
	return this.path != null;
}

/**
 * Load default stagedeck to initialize. Cover is made visible to avoid
 * flash of white in Explorer (hidden again by method handleActioEvent}.
 */
StageDeckBinding.prototype.initialize = function () {

	if (!this._isStageDeckBindingInitialized) {
		this.path = this.perspectiveNode.getPropertyBag() ? this.perspectiveNode.getPropertyBag().Path : null;

		this.isDefaultStageDeck = this.path == undefined;

		top.app.bindingMap.stagedeckscover.show();

		this.windowBinding = this.add(
			WindowBinding.newInstance ( this.bindingDocument )
		);
		var url = this.isDefaultStageDeck ? (StageDeckBinding.DEFAULT_URL + "?handle=" + this.handle) : this.path;
		this.windowBinding.setURL ( url );
		this.windowBinding.attach ();
		this._isStageDeckBindingInitialized = true;
		if (!this.isDefaultStageDeck) {
			top.app.bindingMap.stagedeckscover.hide();
			this.dispatchAction(StageDeckBinding.ACTION_LOADED);
			this.dispatchAction(StageBinding.ACTION_DECK_LOADED);
		}
	}
}

StageDeckBinding.prototype.getBrowserTab = function () {

	return this._browserTab;
}

StageDeckBinding.prototype.getBrowserPage = function () {

	var browserTab = this.getBrowserTab();
	if (browserTab == null) return null;
	var associatedView = browserTab.getAssociatedView();
	if (associatedView == null) return null;
	var contentWindow = associatedView.getContentWindow();
	if (contentWindow == null) return null;
	if (contentWindow.bindingMap == null) return null;
	return contentWindow.bindingMap.browserpage;
}

StageDeckBinding.prototype.getSystemTree = function () {

	var result = null;
	var page = this.getBrowserPage();
	if (page) {
		result = page.getSystemTree();
	}
	return result;
}

/**
 * @implements {IBroadcastListener}
 * @param {string} broadcast
 * @param {object} arg
 */
StageDeckBinding.prototype.handleBroadcast = function (broadcast, arg) {

	StageDeckBinding.superclass.handleBroadcast.call(this, broadcast, arg);

	switch (broadcast) {

		case BroadcastMessages.SYSTEMTREEBINDING_REFRESHALL:
			if (this.isSelected == true) {
				this._refreshTree();
			} else if (this.perspectiveNode != null) {
				this._isRefreshRequired = true;
			}
			break;

		case BroadcastMessages.SYSTEMTREEBINDING_REFRESHED:
			this.unsubscribe(BroadcastMessages.SYSTEMTREEBINDING_REFRESHED);
			this.select();
			break;
	}
}

/**
 * Refresh the contained tree.
 */
StageDeckBinding.prototype._refreshTree = function () {

	/*
	 * The broadcast will be intercepted by SystemPageBinding.
	 */
	if (this.perspectiveNode && this.perspectiveNode.getEntityToken) {
		this.subscribe(BroadcastMessages.SYSTEMTREEBINDING_REFRESHED);
		EventBroadcaster.broadcast(
			BroadcastMessages.SYSTEMTREEBINDING_REFRESH,
			this.perspectiveNode.getEntityToken()
		);
	}
}


/**
 * StageDeckBinding factory.
 * @param {DOMDocument} ownerDocument
 * @return {StageDeckBinding}
 */
StageDeckBinding.newInstance = function ( ownerDocument ) {

	var element = DOMUtil.createElementNS ( Constants.NS_UI, "ui:stagedeck", ownerDocument )
	var binding = UserInterface.registerBinding ( element, StageDeckBinding );
	return binding;
}
