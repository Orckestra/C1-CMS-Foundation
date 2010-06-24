DockTabsButtonBinding.prototype = new TabsButtonBinding;
DockTabsButtonBinding.prototype.constructor = DockTabsButtonBinding;
DockTabsButtonBinding.superclass = TabsButtonBinding.prototype;
DockTabsButtonBinding.RESERVED_SPACE = 50;
DockTabsButtonBinding.NODENAME_TABBOX = "dock";

/**
 * @class
 */
function DockTabsButtonBinding () {

	/**
	 * @type {SystemLogger}
	 */
	this.logger = SystemLogger.getLogger ( "DockTabsButtonBinding" );
}

/**
 * Identifies binding.
 */
DockTabsButtonBinding.prototype.toString = function () {

	return "[DockTabsButtonBinding]";
}

/**
 * DockTabsButtonBinding factory.
 * @param {DOMDocument} ownerDocument
 * @return {DockTabsButtonBinding}
 */
DockTabsButtonBinding.newInstance = function ( ownerDocument ) {

	var toolbarbutton = DOMUtil.createElementNS ( Constants.NS_UI, "ui:toolbarbutton", ownerDocument );
	toolbarbutton.setAttribute ( "type", "checkbox" );
	toolbarbutton.setAttribute ( "popup", "app.bindingMap.tabsbuttonpopup" );
	toolbarbutton.className = "tabbutton";	
	return UserInterface.registerBinding ( toolbarbutton, DockTabsButtonBinding );
}