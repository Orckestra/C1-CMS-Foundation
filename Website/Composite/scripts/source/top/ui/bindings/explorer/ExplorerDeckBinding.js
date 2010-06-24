ExplorerDeckBinding.prototype = new DeckBinding;
ExplorerDeckBinding.prototype.constructor = ExplorerDeckBinding;
ExplorerDeckBinding.superclass = DeckBinding.prototype;
ExplorerDeckBinding.NODENAME_DECKS = "explorerdecks";

/**
 * @class
 */
function ExplorerDeckBinding () {

	/**
	 * @type {SystemLogger}
	 */
	this.logger = SystemLogger.getLogger ( "ExplorerDeckBinding" );
	
	/**
	 * Entitytoken of the associated SystemNode.
	 */
	this._entityToken = null;
	
	/**
	 * If true, contained tree needs to be refreshed.
	 * @type {boolean}
	 */
	this._isRefreshRequired = false;
	
	/**
	 * @type {ViewBinding}
	 */
	this._viewBinding = null;
	
	/**
	 * Flipped when viewbinding is loaded.
	 * @type {boolean}
	 */
	this._isExplorerDeckBindingInitialized = false;
	
	/*
	 * Returnable.
	 */
	return this;
}

/**
 * Identifies binding.
 */
ExplorerDeckBinding.prototype.toString = function () {

	return "[ExplorerDeckBinding]";
}

/**
 * @overloads {DeckBinding#onBindingRegister}
 */
ExplorerDeckBinding.prototype.onBindingRegister = function () {
	
	ExplorerDeckBinding.superclass.onBindingRegister.call ( this );
	this.subscribe ( BroadcastMessages.SYSTEMTREEBINDING_REFRESHALL );
}

/**
 * Set associated ViewBinding.
 * @param {ViewBinding} viewBinding
 */
ExplorerDeckBinding.prototype.setAssociatedView = function ( viewBinding ) {
	
	this._viewBinding = viewBinding;
}

/**
 * Get associated ViewBinding.
 * @return {ViewBinding}
 */
ExplorerDeckBinding.prototype.getAssociatedView = function () {
	
	return this._viewBinding;
}

/**
 * @overloads {DeckBinding#select}
 */
ExplorerDeckBinding.prototype.select = function () {
	
	if ( !this._isExplorerDeckBindingInitialized ) {
	
		/*
		 * Lock app and update statusbar
		 */
		Application.lock ( this );
		var message = StringBundle.getString ( "ui", "Website.App.StatusBar.Loading" );
		var label = this._viewBinding.getDefinition ().label;
		StatusBar.busy ( message, [ label ]);
		
		/*
		 * Mount the show.
		 */
		this.bindingWindow.bindingMap.explorerdeckscover.show ();
		this.addActionListener ( PageBinding.ACTION_INITIALIZED );
		this._viewBinding.initialize ();
	}
	
	/*
	 * Refresh tree required? If yes, the deck will  
	 * be selected when the tree is done refreshing. 
	 */
	if ( this._isRefreshRequired == true ) {
		this._refreshTree ();
		this._isRefreshRequired = false;
	} else {
	
		/*
		 * This will force a change of label and image on related 
		 * containing DockTabBinding. See ILabel methods below.
		 */
		ExplorerDeckBinding.superclass.select.call ( this );
		this.dispatchAction ( DockTabBinding.ACTION_UPDATE_VISUAL );
	}
}

/**
 * @implements {IActionListener}
 * @overloads {DeckBinding#handleAction}
 * @param {Action} action
 */
ExplorerDeckBinding.prototype.handleAction = function ( action ) {
	
	ExplorerDeckBinding.superclass.handleAction.call ( this, action );
	
	var binding = action.target;
	
	switch ( action.type ) {
		case PageBinding.ACTION_INITIALIZED :
			if ( binding instanceof SystemPageBinding ) {
				this._isExplorerDeckBindingInitialized = true;
				this._entityToken = binding.node.getEntityToken ();
				this.removeActionListener ( PageBinding.ACTION_INITIALIZED );
				this.bindingWindow.bindingMap.explorerdeckscover.hide ();
				this.dispatchAction ( DockTabBinding.ACTION_UPDATE_VISUAL );
				Application.unlock ( this );
				if ( StatusBar.state == StatusBar.BUSY ) {
					StatusBar.clear ();
				}
			}
			break;
	}
}

/**
 * @implements {IBroadcastListener}
 * @param {string} broadcast
 * @param {object} arg
 */
ExplorerDeckBinding.prototype.handleBroadcast = function ( broadcast, arg ) {
	
	ExplorerDeckBinding.superclass.handleBroadcast.call ( this, broadcast, arg );
	
	switch ( broadcast ) {
		
		case BroadcastMessages.SYSTEMTREEBINDING_REFRESHALL :
			if ( this.isSelected == true ) {
				this._refreshTree ();
			} else if ( this._entityToken != null ) {
				this._isRefreshRequired = true;
			}
			break;
			
		case BroadcastMessages.SYSTEMTREEBINDING_REFRESHED :
			this.unsubscribe ( BroadcastMessages.SYSTEMTREEBINDING_REFRESHED );
			this.select ();
			break;
	}
}

/**
 * Refresh the contained tree.
 */
ExplorerDeckBinding.prototype._refreshTree = function () {
	
	/*
	 * The broadcast will be intercepted by SystemPageBinding. 
	 */
	if ( this._entityToken != null ) {
		this.subscribe ( BroadcastMessages.SYSTEMTREEBINDING_REFRESHED );
		EventBroadcaster.broadcast ( 
			BroadcastMessages.SYSTEMTREEBINDING_REFRESH, 
			this._entityToken 
		);
	}
}

/**
 * Collapse the contained tree.
 */
ExplorerDeckBinding.prototype._collapseTree = function () {
	
	alert ( "ExplorerDeckBinding: collapse tree!" );
}

/**
 * @implements {ILabel}
 * @return {string}
 */
ExplorerDeckBinding.prototype.getLabel = function () {
	
	var result = null;
	if ( this._isExplorerDeckBindingInitialized ) {
		result = this._viewBinding.getDefinition ().label;
	} else {
		result = DockTabBinding.LABEL_TABLOADING;
	}
	return result;
}

/** 
 * @implements {ILabel}
 * @return {string}
 */
ExplorerDeckBinding.prototype.getImage = function () {

	var result = null;
	if ( this._isExplorerDeckBindingInitialized ) {
		result = this._viewBinding.getDefinition ().image;
	} else {
		result = DockTabBinding.IMG_TABLOADING;
	}
	return result;
}

/**
 * @implements {ILabel}
 * @return {string}
 */
ExplorerDeckBinding.prototype.getToolTip = function () {

	var result = null;
	if ( this._isExplorerDeckBindingInitialized ) {
		result = this._viewBinding.getDefinition ().toolTip;
	}
	return result;
}

/**
 * ExplorerDeckBinding factory.
 * @param {DOMDocument} ownerDocument
 * @return {ExplorerDeckBinding}
 */
ExplorerDeckBinding.newInstance = function ( ownerDocument ) {

	var element = DOMUtil.createElementNS ( Constants.NS_UI, "ui:explorerdeck", ownerDocument );
	return UserInterface.registerBinding ( element, ExplorerDeckBinding );
}