DockTabsBinding.prototype = new TabsBinding;
DockTabsBinding.prototype.constructor = DockTabsBinding;
DockTabsBinding.superclass = TabsBinding.prototype;
DockTabsBinding.NODENAME_TABBOX = "dock";
DockTabsBinding.TABBUTTON_IMPLEMENTATION = DockTabsButtonBinding;

/**
 * @class
 */
function DockTabsBinding () {

	/**
	 * @type {SystemLogger}
	 */
	this.logger = SystemLogger.getLogger ( "DockTabsBinding" );
}

/**
 * Identifies binding.
 */
DockTabsBinding.prototype.toString = function () {

	return "[DockTabsBinding]";
}

/**
 * @overloads {TabsBinding#flex}
 * @implements {IFlexible}
 */
DockTabsBinding.prototype.flex = function () {

	/*
	 * This fixes a horrendous rendering engine malfunction in Explorer.
	 * Notice that a borderwidth (or whatever) has been hardcoded into this!
	 */
	if ( Client.isExplorer && this.containingTabBoxBinding != null ) {
	
		var self = this;
		function fix () {
			var width = self.containingTabBoxBinding.getWidth ();
			if ( !isNaN ( width )) {
				width = width > 0 ? width - 1 : 0; // hardcode!
				self.bindingElement.style.width = new String ( width ) + "px";
			}
		}
		setTimeout ( fix, 250 );
		fix ();
	}
	
	DockTabsBinding.superclass.flex.call ( this );
}

/**
 * Handle crawler.
 * @implements {ICrawlerHandler}
 * @param {Crawler} crawler
 */
DockTabsBinding.prototype.handleCrawler = function ( crawler ) {
	
	DockTabsBinding.superclass.handleCrawler.call ( this, crawler );
	
	switch ( crawler.id ) {	
		case FlexBoxCrawler.ID :
			this._explorerFlexHack ();
			break;
	}
}

/*
 * This fixes a horrendous rendering engine malfunction in Explorer.
 * Notice that a borderwidth (or whatever) has been hardcoded into this!
 */
DockTabsBinding.prototype._explorerFlexHack = function () {
	
	if ( Client.isExplorer && this.containingTabBoxBinding != null ) {
	
		var self = this;
		function fix () {
			var width = self.containingTabBoxBinding.getWidth ();
			if ( !isNaN ( width )) {
				width = width > 0 ? width - 1 : 0; // hardcode!
				self.bindingElement.style.width = new String ( width ) + "px";
			}
		}
		setTimeout ( fix, 250 );
		fix ();
	}
}

/**
 * DockTabsBinding factory.
 * @param {DOMDocument} ownerDocument
 * @return {DockTabsBinding}
 */
DockTabsBinding.newInstance = function ( ownerDocument ) {

	var element = DOMUtil.createElementNS ( Constants.NS_UI, "ui:docktabs", ownerDocument );
	return UserInterface.registerBinding ( element, DockTabsBinding );
}