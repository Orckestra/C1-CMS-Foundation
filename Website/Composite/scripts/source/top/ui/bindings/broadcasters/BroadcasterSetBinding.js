BroadcasterSetBinding.prototype = new Binding;
BroadcasterSetBinding.prototype.constructor = BroadcasterSetBinding;
BroadcasterSetBinding.superclass = Binding.prototype;

/**
 * @class
 * Why not have binding for this?
 */
function BroadcasterSetBinding () {

	/**
	 * @type {SystemLogger}
	 */
	this.logger = SystemLogger.getLogger ( "BroadcasterSetBinding" );
}

/**
 * Identifies binding.
 */
BroadcasterSetBinding.prototype.toString = function () {

	return "[BroadcasterSetBinding]";
}