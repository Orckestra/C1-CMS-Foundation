ExplorerToolBarBinding.prototype = new ToolBarBinding;
ExplorerToolBarBinding.prototype.constructor = ExplorerToolBarBinding;
ExplorerToolBarBinding.superclass = ToolBarBinding.prototype;

/**
 * @class
 */
function ExplorerToolBarBinding () {

	/**
	 * @type {SystemLogger}
	 */
	this.logger = SystemLogger.getLogger ( "ExplorerToolBarBinding" );
	
	/**
	 * No default content. Toolbar should be completely collapsible.
	 * @overwrites {ToolBarBinding#_hasDefaultContent}
	 * @type {boolean}
	 */
	this._hasDefaultContent = false;
}

/**
 * Identifies binding.
 */
ExplorerToolBarBinding.prototype.toString = function () {

	return "[ExplorerToolBarBinding]";
}

/**
 * Show large icons.
 */
ExplorerToolBarBinding.prototype.onBindingRegister = function () {
	
	ExplorerToolBarBinding.superclass.onBindingRegister.call ( this );
	this.setImageSize(ToolBarBinding.ICONSIZE_22);
	
}

/**
 * ExplorerToolBarBinding factory.
 * @param {DOMDocument} ownerDocument
 * @return {ExplorerToolBarBinding}
 */
ExplorerToolBarBinding.newInstance = function ( ownerDocument ) {

	var element = DOMUtil.createElementNS ( Constants.NS_UI, "ui:explorertoolbar", ownerDocument );
	return UserInterface.registerBinding ( element, ExplorerToolBarBinding );
}