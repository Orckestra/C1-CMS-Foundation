ViewSetBinding.prototype = new Binding;
ViewSetBinding.prototype.constructor = ViewSetBinding;
ViewSetBinding.superclass = Binding.prototype;

/**
 * @class
 */
function ViewSetBinding () {

	/**
	 * @type {SystemLogger}
	 */
	this.logger = SystemLogger.getLogger ( "ViewSetBinding" );
	
	/**
	 * Block common crawlers. Although views are children of this 
	 * binding, they APPEAR to be positioned elsewhere in the tree, 
	 * so this list should plausibly be extended for future crawlers. 
	 * Note: The crawler will be directed into view from the dockpanel.
	 * @see {DockPanelBinding#handleCrawler}
	 * @overwrites {Binding#crawlerFilters}
	 * @type {List<string>}
	 */
	this.crawlerFilters	= new List ([ FlexBoxCrawler.ID, FocusCrawler.ID ]);
	
	/*
	 * Returnable.
	 */
	return this;
}

/**
 * Identifies binding.
 */
ViewSetBinding.prototype.toString = function () {

	return "[ViewSetBinding]";
}