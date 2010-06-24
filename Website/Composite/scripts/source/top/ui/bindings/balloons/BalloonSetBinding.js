BalloonSetBinding.prototype = new Binding;
BalloonSetBinding.prototype.constructor = BalloonSetBinding;
BalloonSetBinding.superclass = Binding.prototype;

/**
 * @class
 */
function BalloonSetBinding () {

	/**
	 * @type {SystemLogger}
	 */
	this.logger = SystemLogger.getLogger ( "BalloonSetBinding" );
}

/**
 * Identifies binding.
 */
BalloonSetBinding.prototype.toString = function () {
	
	return "[BalloonSetBinding]";
}