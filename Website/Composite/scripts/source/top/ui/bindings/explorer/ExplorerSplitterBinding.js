ExplorerSplitterBinding.prototype = new Binding;
ExplorerSplitterBinding.prototype.constructor = ExplorerSplitterBinding;
ExplorerSplitterBinding.superclass = Binding.prototype;

/**
 * @class
 */
function ExplorerSplitterBinding () {

	/**
	 * @type {SystemLogger}
	 */
	this.logger = SystemLogger.getLogger ( "ExplorerSplitterBinding" );
	
	/** 
	 * @overloads {Binding#isDraggable}
	 * @type {boolean}
	 */
	this.isDraggable = true;
	
	/*
	 * Returnable.
	 */
	return this;
}

/**
 * Identifies binding.
 */
ExplorerSplitterBinding.prototype.toString = function () {

	return "[ExplorerSplitterBinding]";
}

/**
 * @overloads {Binding#onBindingAttach}
 *
ExplorerSplitterBinding.prototype.onBindingAttach = function () {
	
	ExplorerSplitterBinding.superclass.onBindingAttach.call ( this );
	this.dispatchAction ( Binding.ACTION_ATTACHED );
}
*/