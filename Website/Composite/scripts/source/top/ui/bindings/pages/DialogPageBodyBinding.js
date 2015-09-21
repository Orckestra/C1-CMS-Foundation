DialogPageBodyBinding.prototype = new FlexBoxBinding;
DialogPageBodyBinding.prototype.constructor = DialogPageBodyBinding;
DialogPageBodyBinding.superclass = FlexBoxBinding.prototype;

/**
 * @class
 */
function DialogPageBodyBinding () {

	/**
	 * @type {SystemLogger}
	 */
	this.logger = SystemLogger.getLogger ( "DialogPageBodyBinding" );
}

/**
 * Identifies binding.
 */
DialogPageBodyBinding.prototype.toString = function () {
	
	return "[DialogPageBodyBinding]";
};

/**
 * Hardwired for method fit.
 * @overwrites {FlexBoxBinding#_setFitnessHeight} 
 * @param {int} height
 */
DialogPageBodyBinding.prototype._setFitnessHeight = function ( height ) {
	
	
	if ( height > this.bindingElement.offsetHeight ) {
		this.bindingElement.style.height = height + "px";
	}
}