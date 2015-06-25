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


				////TESTUI
				//var explorerdocument = this.windowBinding.getContentDocument();
				//var explorerpanel = this.windowBinding.getContentWindow().bindingMap.explorerpanel;
				//// construct ViewBinding
				//var viewBinding = ViewBinding.newInstance(explorerdocument);
				//viewBinding.setType(ViewBinding.TYPE_EXPLORERVIEW);
				//viewBinding.setDefinition(this.definition);

				//explorerpanel.add(viewBinding);

				////setTimeout ( function () {         
				//	viewBinding.attach();
				//	viewBinding.initialize();
				////}, 0);

				//this._viewBinding = viewBinding;


				explorerdocument = this.windowBinding.getContentDocument();

				//TESTUI 
				var browserpanel = this.windowBinding.getContentWindow().bindingMap.browserpanel;

				var viewBinding = ViewBinding.newInstance(explorerdocument);
				viewBinding.setType(ViewBinding.TYPE_EXPLORERVIEW);
				var browserViewDefinition = ViewDefinitions["Composite.Management.Browser"];
				browserViewDefinition.argument["SystemViewDefinition"] = this.definition;
				viewBinding.setDefinition(browserViewDefinition);

				browserpanel.add(viewBinding);

				//setTimeout(function () {
					viewBinding.attach();
					viewBinding.initialize();
				//}, 0);

					this._viewBinding = viewBinding;

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
			if ( this._dockBindingCount == 2 ) {
				this._dockBindings.get ( "main" ).showControls ( true );
			}
			action.consume (); // StageBinding is no longer listening!
			break;
		
		/*
		 * Hide dockcontrols only one deck is open.
		 */	
		case StageSplitBoxBinding.ACTION_DOCK_EMPTIED : 
			this._dockBindingCount --;
			if ( this._dockBindingCount == 1 ) {
				this._dockBindings.get ( "main" ).showControls ( false );
			}
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

	if ( !this._isStageDeckBindingInitialized ) {
		this.initialize ();
	}
	StageDeckBinding.superclass.select.call ( this );
}

/**
 * Get that DockBinding.
 * @param {string} reference
 * @return {DockBinding}
 */
StageDeckBinding.prototype.getDockBindingByReference = function ( reference ) {
	
	return this._dockBindings.get ( reference );
}

/**
 * Load default stagedeck to initialize. Cover is made visible to avoid 
 * flash of white in Explorer (hidden again by method handleActioEvent}.
 */
StageDeckBinding.prototype.initialize = function () {
	
	if ( !this._isStageDeckBindingInitialized ) {
		top.app.bindingMap.stagedeckscover.show ();
		this.windowBinding = this.add ( 
			WindowBinding.newInstance ( this.bindingDocument )
		);
		var url = StageDeckBinding.DEFAULT_URL + "?handle=" + this.handle;
		this.windowBinding.setURL ( url );
		this.windowBinding.attach ();
		this._isStageDeckBindingInitialized = true;
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
