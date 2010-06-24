DockPanelsBinding.prototype = new TabPanelsBinding;
DockPanelsBinding.prototype.constructor = DockPanelsBinding;
DockPanelsBinding.superclass = TabPanelsBinding.prototype;
//DockPanelsBinding.NODENAME_TABBOX = "tabbox";

/**
 * @class
 */
function DockPanelsBinding () {

	/**
	 * @type {SystemLogger}
	 */
	this.logger = SystemLogger.getLogger ( "DockPanelsBinding" );
	
	/**
	 * @type {boolean}
	 */
	this.isVisible = true;
	
	/*
	 * Returnable.
	 */
	return this;
}

/**
 * Identifies binding.
 */
DockPanelsBinding.prototype.toString = function () {

	return "[DockPanelsBinding]";
}

/**
 * DockPanelsBinding factory.
 * @param {DOMDocument} ownerDocument
 * @return {DockPanelsBinding}
 */
DockPanelsBinding.newInstance = function ( ownerDocument ) {

	var element = DOMUtil.createElementNS ( Constants.NS_UI, "ui:dockpanels", ownerDocument );
	return UserInterface.registerBinding ( element, DockPanelsBinding );
}