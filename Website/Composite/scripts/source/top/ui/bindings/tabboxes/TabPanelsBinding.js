TabPanelsBinding.prototype = new FlexBoxBinding;
TabPanelsBinding.prototype.constructor = TabPanelsBinding;
TabPanelsBinding.superclass = FlexBoxBinding.prototype;

/**
 * @class
 */
function TabPanelsBinding () {
	
	/**
	 * @type {SystemLogger}
	 */
	this.logger = SystemLogger.getLogger ( "TabPanelsBinding" );
	
	/**
	 * @type {TabBoxBinding}
	 */
	this.containingTabBoxBinding = null;
	
	/**
	 * Storing tabpanels dimensions in order to economize flex iterations.
	 * @see {TabPanelBinding#_invokeManagedRecursiveFlex}
	 * @type {Dimension}
	 */
	this._lastKnownDimension = null;

}

/**
 * Identifies binding.
 */
TabPanelsBinding.prototype.toString = function () {

	return "[TabPanelsBinding]";
}

/**
 * @overloads {FlexBoxBinding#onBindingRegister}
 */
TabPanelsBinding.prototype.onBindingRegister = function () {
	
	TabPanelsBinding.superclass.onBindingRegister.call ( this );
	this._lastKnownDimension = new Dimension ( 0, 0 );
}

/**
 * Returns true if dimensions changed since method was lastly invoked.
 * @see {TabPanelBinding#_invokeManagedRecursiveFlex}
 * @return {boolean}
 */
TabPanelsBinding.prototype.hasDimensionsChanged = function () {
	
	var result = false;
	var dim1 = this.boxObject.getDimension ();
	var dim2 = this._lastKnownDimension;
	
	if ( dim2 == null || !Dimension.isEqual ( dim1, dim2 )) {
		result = true;
		this._lastKnownDimension = dim1;
	}
	
	return result;
}

/**
 * @overloads {Binding#onBindingAttach}
 */
TabPanelsBinding.prototype.onBindingAttach = function () {

	TabPanelsBinding.superclass.onBindingAttach.call ( this );
	this.containingTabBoxBinding = this.getAncestorBindingByType ( TabBoxBinding );
	this.setFlexibility ( this.containingTabBoxBinding.isFlexible );
	this.dispatchAction ( Binding.ACTION_ATTACHED );
}
