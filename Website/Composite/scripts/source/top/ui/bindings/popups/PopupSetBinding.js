PopupSetBinding.prototype = new MenuContainerBinding;
PopupSetBinding.prototype.constructor = PopupSetBinding;
PopupSetBinding.superclass = MenuContainerBinding.prototype;


PopupSetBinding.getPopupSet = function (ownerDocument, rel) {

	var rootBinding = UserInterface.getBinding(ownerDocument.body);
	var result = null;
	rootBinding.getDescendantBindingsByType(PopupSetBinding).each(function(popupset) {
		if (popupset.getProperty("rel") === rel) {
			result = popupset;
			return false;
		}
		return true;
	});

	if (result == null) {
		result = rootBinding.addFirst(PopupSetBinding.newInstance(ownerDocument));
		result.setProperty("rel", rel);
		result.attach();
	}

	return result;
}

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

PopupSetBinding.prototype.getPopupByRel = function (rel) {

	var result = null;

	this.getDescendantBindingsByType(PopupBinding).each(function (popup) {
		if (popup.getProperty("rel") === rel) {
			result = popup;
			return false;
		}
		return true;
	});

	return result;
};

PopupSetBinding.prototype.createNewPopupByRel = function (rel) {

	var popupBinding = this.getPopupByRel(rel);

	if (popupBinding) {
		popupBinding.empty();
	} else {
		popupBinding = this.add(
			PopupBinding.newInstance(this.bindingDocument)
		);
		popupBinding.add(
			MenuBodyBinding.newInstance(this.bindingDocument)
		);
		popupBinding.setProperty("rel", rel);
		popupBinding.attachRecursive();
	}

	return popupBinding;
}


/**
 * PopupSetBinding factory.
 * @param {DOMDocument} ownerDocument
 * @return {PopupSetBinding}
 */
PopupSetBinding.newInstance = function (ownerDocument) {

	var element = DOMUtil.createElementNS(Constants.NS_UI, "ui:popupset", ownerDocument);
	return UserInterface.registerBinding(element, PopupSetBinding);
}