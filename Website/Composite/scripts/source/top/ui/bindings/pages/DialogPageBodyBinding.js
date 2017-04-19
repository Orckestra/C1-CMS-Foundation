DialogPageBodyBinding.prototype = new FlexBoxBinding;
DialogPageBodyBinding.prototype.constructor = DialogPageBodyBinding;
DialogPageBodyBinding.superclass = FlexBoxBinding.prototype;

DialogPageBodyBinding.FILLED_CLASSNAME = "filled";

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
DialogPageBodyBinding.prototype._setFitnessHeight = function (height) {

	var padding = CSSComputer.getPadding(this.bindingElement);
	var border = CSSComputer.getBorder(this.bindingElement);

	height += padding.top + padding.bottom;
	height += border.top + border.bottom;

	if ( height > this.bindingElement.offsetHeight ) {
		this.bindingElement.style.height = height + "px";
	}
}