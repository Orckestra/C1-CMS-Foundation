BrowserToolBarBinding.prototype = new ToolBarBinding;
BrowserToolBarBinding.prototype.constructor = BrowserToolBarBinding;
BrowserToolBarBinding.superclass = ToolBarBinding.prototype;

/**
 * @class
 */
function BrowserToolBarBinding () {

	/**
	 * @type {SystemLogger}
	 */
	this.logger = SystemLogger.getLogger ( "BrowserToolBarBinding" );
	
	/*
	 * Returnable.
	 */
	return this;
}

/**
 * Identifies binding.
 */
BrowserToolBarBinding.prototype.toString = function () {

	return "[BrowserToolBarBinding]";
}

/**
 * @overloads {ToolBarBinding#flex}
 * @return
 */
BrowserToolBarBinding.prototype.flex = function () {
	
	BrowserToolBarBinding.superclass.flex.call ( this );
	
	var right = this._toolBarBodyRight;
	if ( right != null && right.isAttached ) {
		this.bindingWindow.bindingMap.addressbar.maximize ( 
				right.boxObject.getDimension ().w 
		);
	}
}