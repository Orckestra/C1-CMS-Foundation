PopupSetBinding.prototype = new MenuContainerBinding;
PopupSetBinding.prototype.constructor = PopupSetBinding;
PopupSetBinding.superclass = MenuContainerBinding.prototype;

/**
 * @class
 */
function PopupSetBinding () {

	/**
	 * @type {SystemLogger}
	 */
	this.logger = SystemLogger.getLogger ( "PopupSetBinding" );
	
	/**
	 * Block common crawlers.
	 * @type {Map<string><boolean>}
	 * @overwrites {Binding#crawlerFilters}
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
PopupSetBinding.prototype.toString = function () {

	return "[PopupSetBinding]";
}