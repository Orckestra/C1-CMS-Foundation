DialogBodyBinding.prototype = new FlexBoxBinding;
DialogBodyBinding.prototype.constructor = DialogBodyBinding;
DialogBodyBinding.superclass = FlexBoxBinding.prototype;

/**
 * @class
 */
function DialogBodyBinding () {

	/**
	 * @type {SystemLogger}
	 */
	this.logger = SystemLogger.getLogger ( "DialogBodyBinding" );
	
	/**
	 * @type {DialogBinding}
	 */
	this.panelBinding = null;
	
	/**
	 * @type {boolean}
	 */
	this.isVisible = true;
	
	/**
	 * @type {DialogBinding}
	 */
	this._dialogBinding = null;
}

/**
 * Identifies binding.
 */
DialogBodyBinding.prototype.toString = function () {

	return "[DialogBodyBinding]";
}

/**
 * @overloads {Binding#onBindingAttach}
 */
DialogBodyBinding.prototype.onBindingAttach = function () {

	DialogBodyBinding.superclass.onBindingAttach.call ( this );
	this._dialogBinding = UserInterface.getBinding ( this.bindingElement.parentNode );
}

/**
 * Get position as requested by the {@link ViewBinding} 
 * compensating for dialog border dimensions.
 * @return {Dimension}
 */
DialogBodyBinding.prototype.getPosition = function () {
	
	var pos = this._dialogBinding.getPosition ();
	
	return new Position ( 
		pos.x + this.offsetLeft + DialogBorderBinding.DIMENSION,
		pos.y + this.offsetTop
	);
}

/**
 * Get dimension as requested by the {@link ViewBinding} 
 * compensating for dialog border dimensions.
 * @return {Dimension}
 */
DialogBodyBinding.prototype.getDimension = function () {

	var dim = this.boxObject.getDimension ();
	
	return new Dimension (
		dim.w - 2 * DialogBorderBinding.DIMENSION,
		dim.h - DialogBorderBinding.DIMENSION
	);
}

/**
 * DialogBodyBinding factory.
 * @param {DOMDocument} ownerDocument
 * @return {DialogBodyBinding}
 */
DialogBodyBinding.newInstance = function ( ownerDocument ) {

	var element = DOMUtil.createElementNS ( Constants.NS_UI, "ui:dialogbody", ownerDocument );
	return UserInterface.registerBinding ( element, DialogBodyBinding );
}