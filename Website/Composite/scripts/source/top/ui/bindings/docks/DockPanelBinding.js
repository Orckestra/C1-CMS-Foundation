DockPanelBinding.prototype = new TabPanelBinding;
DockPanelBinding.prototype.constructor = DockPanelBinding;
DockPanelBinding.superclass = TabPanelBinding.prototype;

/*
 * Descendant bindings may dispatch this  
 * action to select the associated tab.
 */
DockPanelBinding.ACTION_FORCE_SELECT = "dockpanel force select";

/**
 * @class
 */
function DockPanelBinding () {

	/**
	 * @type {SystemLogger}
	 */
	this.logger = SystemLogger.getLogger ( "DockPanelBinding" );
	
	/**
	 * The ViewBinding currently snapped to this  
	 * dockpanel. This property is set by the view. 
	 * @see {ViewBinding#snapToBinding}
	 * @type {ViewBinding}
	 */
	this.viewBinding = null;
	
	/*
	 * Returnable.
	 */
	return this;
}


/**
 * Identifies binding.
 */
DockPanelBinding.prototype.toString = function () {

	return "[DockPanelBinding]";
}

/**
 * When closing, dispose associated view.
 */
DockPanelBinding.prototype.onBindingDispose = function () {

	DockPanelBinding.superclass.onBindingDispose.call ( this );
	this.dispatchAction ( Binding.ACTION_DISPOSED );
}

/**
 * @overloads {TabPanelBinding#select}.
 * @param {boolean} isManaged If set to true, application focus will not be updated.
 */
DockPanelBinding.prototype.select = function ( isManaged ) {
	
	DockPanelBinding.superclass.select.call ( this, isManaged );
	this.dispatchAction ( Binding.ACTION_VISIBILITYCHANGED );
}

/**
 * @overloads {TabPanelBinding#unselect}.
 */
DockPanelBinding.prototype.unselect = function () {
	
	DockPanelBinding.superclass.unselect.call ( this );
	this.dispatchAction ( Binding.ACTION_VISIBILITYCHANGED );
}

/**
 * Action dispatched to be intercepted by the {@link ViewBinding}.
 * @implements {IFlexible} 
 */
DockPanelBinding.prototype.flex = function () {
	
	this.dispatchAction ( Binding.ACTION_DIMENSIONCHANGED );
} 


/**
 * Handle crawler. 
 * @implements {ICrawlerHandler}
 * @overloads {Binding#handleCrawler}
 * @param {Crawler} crawler
 */
DockPanelBinding.prototype.handleCrawler = function ( crawler ) {

	DockPanelBinding.superclass.handleCrawler.call ( this, crawler );
	
	/*
	 * Relay descending crawlers to view. The view has been rigged 
	 * up to return the crawler back here when it has been crawled.
	 * @see {ViewBinding#handleCrawler}
	 */
	if ( crawler.response == null ) {
		if ( crawler.type == NodeCrawler.TYPE_DESCENDING ) {
			if ( this.viewBinding != null ) {
				if ( crawler.id == FocusCrawler.ID ) {
					crawler.nextNode = this.viewBinding.bindingElement;
				}
			}
		}
	}
}

/**
 * DockPanelBinding factory.
 * @param {DOMDocument} ownerDocument
 * @return {DockPanelBinding}
 */
DockPanelBinding.newInstance = function ( ownerDocument ) {

	var element = DOMUtil.createElementNS ( Constants.NS_UI, "ui:dockpanel", ownerDocument );
	return UserInterface.registerBinding ( element, DockPanelBinding );
}