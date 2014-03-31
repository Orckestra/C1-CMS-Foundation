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

/**
 * PopupSetBinding factory.
 * @param {DOMDocument} ownerDocument
 * @return {PopupSetBinding}
 */
PopupSetBinding.newInstance = function (ownerDocument) {

	var element = DOMUtil.createElementNS(Constants.NS_UI, "ui:popup", ownerDocument);
	return UserInterface.registerBinding(element, PopupSetBinding);
}