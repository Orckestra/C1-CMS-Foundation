LazyBindingSetBinding.prototype = new Binding;
LazyBindingSetBinding.prototype.constructor = LazyBindingSetBinding;
LazyBindingSetBinding.superclass = Binding.prototype;

/**
 * @class
 */
function LazyBindingSetBinding () {

	/**
	 * @type {SystemLogger}
	 */
	this.logger = SystemLogger.getLogger ( "LazyBindingSetBinding" );
}

/**
 * Identifies binding.
 */
LazyBindingSetBinding.prototype.toString = function () {
	
	return "[LazyBindingSetBinding]";
}