StageSplitBoxBinding.prototype = new SplitBoxBinding;
StageSplitBoxBinding.prototype.constructor = StageSplitBoxBinding;
StageSplitBoxBinding.superclass = SplitBoxBinding.prototype;

StageSplitBoxBinding.ACTION_HIDE = "stagesplitboxbinding hide";
StageSplitBoxBinding.ACTION_SHOW = "stagesplitboxbinding show";
StageSplitBoxBinding.ACTION_DOCK_EMPTIED = "stagesplitbox says dock emptied";
StageSplitBoxBinding.ACTION_DOCK_OPENED = "stagesplitbox says dock opened";

/**
 * @class
 */
function StageSplitBoxBinding () {

	/**
	 * @type {SystemLogger}
	 */
	this.logger = SystemLogger.getLogger ( "StageSplitBoxBinding" );
	
	/**
	 * Flipped when a descendant panel gets maximized. This acts as preparation 
	 * for the actual maximization, which is handled by the StageCrawler.
	 * @see {StageDeckBinding#handleControlBoxAction}
	 * @type {boolean}
	 */
	this.isMaximizePrepared = false;
	
	/**
	 * Flipped when the StageCrawler calls the handleMaximization method.
	 * @see {StageDeckBinding#handleControlBoxAction}
	 * @type {boolean}
	 */
	this.isMaximizedForReal = null;
	
	/**
	 * Flipped when minimized.
	 * @see {StageDeckBinding#handleControlBoxAction}
	 * @type {boolean}
	 */
	this.isMinimizedForReal = null;
	
	/**
	 * Indicates that style.visibility is set to hidden.
	 * @type {boolean}
	 *
	this._isInvisibilized = false;
	*/
	
	/*
	 * Returnable.
	 */
	return this;
}

/**
 * Identifies binding.
 */
StageSplitBoxBinding.prototype.toString = function () {

	return "[StageSplitBoxBinding]";
}

/**
 * @see {StageBoxAbstraction#onBindingRegister}
 */
StageSplitBoxBinding.prototype.onBindingRegister = function () {
	
	StageSplitBoxBinding.superclass.onBindingRegister.call ( this );
	StageBoxAbstraction.onBindingRegister.call ( this );
	
	this.addActionListener ( DockBinding.ACTION_EMPTIED, this );
	this.addActionListener ( DockBinding.ACTION_OPENED, this );
	this.addActionListener ( StageSplitBoxBinding.ACTION_SHOW, this );
	this.addActionListener ( StageSplitBoxBinding.ACTION_HIDE, this );
}

/**
 * @see {StageBoxAbstraction#handleAction}
 * @implements {IActionListener}
 * @overloads {SplitBoxBinding#handleAction}
 * @param {Action} action
 */
StageSplitBoxBinding.prototype.handleAction = function ( action ) {
	
	StageSplitBoxBinding.superclass.handleAction.call ( this, action );
	StageBoxAbstraction.handleAction.call ( this, action );
	
	var binding = action.target;
	var docks = null;
	var splitter = null;
	
	switch ( action.type ) {
	
		/*
		 * DockBinding emptied
		 */
		case DockBinding.ACTION_EMPTIED :
			
			splitter = this.getChildBindingByLocalName ( "splitter" );
			if ( splitter.isVisible ) {
				splitter.hide ();
			}
			docks = this.getDescendantBindingsByLocalName ( "dock" );
			if ( docks.getFirst ().isEmpty && docks.getLast ().isEmpty ) {
				if ( docks.getFirst ().type != DockBinding.TYPE_EDITORS ) { /* ADDED */
					this.dispatchAction ( StageSplitBoxBinding.ACTION_HIDE );
					this.hide ();
				}
			} else {
				this.flex ();
				this.invokeLayout ();
			}
			
			/*
			 * We must consume this event, but the stagedeck needs to know.
			 */
			this.dispatchAction ( StageSplitBoxBinding.ACTION_DOCK_EMPTIED );
			action.consume ();
			break;
		
		/*
		 * DockBinding opened
		 */	
		case DockBinding.ACTION_OPENED :
		
			docks = this.getDescendantBindingsByLocalName ( "dock" );
			if ( !docks.getFirst ().isEmpty && !docks.getLast ().isEmpty ) {
				splitter = this.getChildBindingByLocalName ( "splitter" );
				if ( !splitter.isVisible ){
					splitter.show ();
				}
			}
			if ( !this.isVisible ) {
				this.show ();
				this.dispatchAction ( StageSplitBoxBinding.ACTION_SHOW );
			}
			this.flex ();
			this.invokeLayout ();
			
			/*
			 * We must consume this action in order to hide it  
			 * from the next StageSplitBoxBinding, but ancestor   
			 * bindings need to know that a dock was opened.
			 * @see {StageDeckBinding}
			 */
			this.dispatchAction ( StageSplitBoxBinding.ACTION_DOCK_OPENED );
			action.consume ();
			break;
		
		/*
		 * Sub-splitbox hiding
		 */
		case StageSplitBoxBinding.ACTION_HIDE :
		
			if ( binding != this ) {
				splitter = this.getChildBindingByLocalName ( "splitter" );
				if ( splitter.isVisible ) {
					splitter.hide ();
				}
				this.invokeLayout ();
				action.consume ();
			}
			break;
		
		/*
		 * Sub-splitbox showing
		 */	
		case StageSplitBoxBinding.ACTION_SHOW :
			
			if ( binding != this ) {
				var splitPanels = this.getChildBindingsByLocalName ( "splitpanel" );
				if ( splitPanels.getFirst ().isVisible && splitPanels.getLast ().isVisible ) {
					splitter = this.getChildBindingByLocalName ( "splitter" );
					if ( !splitter.isVisible ) {
						splitter.show ();
					}
				}
				this.invokeLayout ();
				action.consume ();
			}
			break;
	}
}

/**
 * Handle maximization. 
 */
StageSplitBoxBinding.prototype.handleMaximization = function () {
	
	StageBoxAbstraction.handleMaximization.call ( this );
}

/**
 * Handle unmaximization.
 */
StageSplitBoxBinding.prototype.handleUnMaximization = function () {
	
	StageBoxAbstraction.handleUnMaximization.call ( this );
}

/**
 * The outcome of the flex method depends heavily on the current state of the splitbox.
 * @overwrites {SplitBoxBinding#flex}
 * @implements {IFlexible}
 */
StageSplitBoxBinding.prototype.flex = function () {
	
	if ( this.isMaximizedForReal == null ) {
		
		StageSplitBoxBinding.superclass.flex.call ( this );
	}
}

/**
 * Handle crawler.
 * @implements {ICrawlerHandler}
 * @param {Crawler} crawler
 */
StageSplitBoxBinding.prototype.handleCrawler = function ( crawler ) {
	
	StageSplitBoxBinding.superclass.handleCrawler.call ( this, crawler );
	
	switch ( crawler.id ) {	
		case FlexBoxCrawler.ID :
			if ( this.isMaximizedForReal == false ) { // Huh? Shouldn't this be TRUE?
				crawler.response = NodeCrawler.SKIP_CHILDREN;
			}
			break;
	}
}

/**
 * @return {boolean}
 */
StageSplitBoxBinding.prototype.hasBothPanelsVisible = function () {
	
	var splitPanels = this.getChildBindingsByLocalName ( "splitpanel" );
	return splitPanels.getFirst ().isVisible && splitPanels.getLast ().isVisible;
}

/**
 * @return {boolean}
 */
StageSplitBoxBinding.prototype.hasBothPanelsFixed = function () {
	
	var splitPanels = this.getChildBindingsByLocalName ( "splitpanel" );
	return splitPanels.getFirst ().isFixed && splitPanels.getLast ().isFixed;
}

/**
 * Make splitbox invisible.
 * @param {boolean} isHide
 *
StageSplitBoxBinding.prototype.invisibilize = function ( isHide ) {
	
	if ( isHide != this._isInvisibilized ) {
		if ( isHide ) {
			this.bindingElement.style.visibility = "hidden";
		} else {
			this.bindingElement.style.visibility = "visible";
		}
		this._isInvisibilized = !this._isInvisibilized;
	}
}
*/