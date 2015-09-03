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
* @overloads {Binding#onBindintAttach}
*/
PopupSetBinding.prototype.onBindingAttach = function () {

	PopupSetBinding.superclass.onBindingAttach.call(this);

	if (this.bindingElement.parentNode.nodeName.toLowerCase() !== "body") {
		this.bindingDocument.body.appendChild(this.bindingElement);
	}
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