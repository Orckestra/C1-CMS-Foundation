TreeSelectorToolBarBinding.prototype = new SystemToolBarBinding;
TreeSelectorToolBarBinding.prototype.constructor = TreeSelectorToolBarBinding;
TreeSelectorToolBarBinding.superclass = SystemToolBarBinding.prototype;


/**
 * @class
 * This would be the giant toolbar at the top of the main window.
 */
function TreeSelectorToolBarBinding () {

	/**
	 * @type {SystemLogger}
	 */
	this.logger = SystemLogger.getLogger ( "TreeSelectorToolBarBinding" );

	/**
	* Tree position 
	* @type {int}
	*/
	this._activePosition = SystemAction.activePositions.SelectorTree;

	/*
	 * Returnable.
	 */
	return this;
}

/**
 * Identifies binding.
 */
TreeSelectorToolBarBinding.prototype.toString = function () {

	return "[TreeSelectorToolBarBinding]";
}

/**
 * Contain all buttons. Overflowing buttons are moved to a popup. 
 * The margin between buttons and groups are not accounted for...
 */
TreeSelectorToolBarBinding.prototype._containAllButtons = function () {
	
	var mores = this.bindingWindow.bindingMap.moreactionstoolbargroup;
	var avail = this.bindingWindow.bindingMap.toolbar.boxObject.getDimension().w - this._moreActionsWidth - 6;
	var total = 0;
	var hides = new List ();
	
	var button, buttons = this._toolBarBodyLeft.getDescendantBindingsByLocalName ( "toolbarbutton" );
	while (( button = buttons.getNext ()) != null ) {
		if ( !button.isVisible ) {
			button.show ();
		}
		total += button.boxObject.getDimension ().w;
		if ( total >= avail ) {
			hides.add ( button );
			button.hide ();
		}
	}
	
	if ( hides.hasEntries ()) {
		
		var group = hides.getFirst ().bindingElement.parentNode;
		UserInterface.getBinding ( group ).setLayout ( ToolBarGroupBinding.LAYOUT_LAST );
		
		this._moreActions = new List ();
		while (( button = hides.getNext ()) != null ) {
			this._moreActions.add ( button.associatedSystemAction );
		}
		mores.show ();
		
	} else {
		this._moreActions = null;
		mores.hide ();
	}
}

/**
 * TreeSelectorToolBarBinding factory.
 * @param {DOMDocument} ownerDocument
 * @return {TreeSelectorToolBarBinding}
 */
TreeSelectorToolBarBinding.newInstance = function ( ownerDocument ) {

	var element = DOMUtil.createElementNS ( Constants.NS_UI, "ui:toolbar", ownerDocument );
	return UserInterface.registerBinding ( element, TreeSelectorToolBarBinding );
}