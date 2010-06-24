/**
 * @class
 * Presents a simpliefied API for dealing with a bindings size and position on stage.
 * @param {Binding} binding 
 */
function BindingBoxObject ( binding ) {
	
	/**
	 * @type {DOMElement} 
	 */
	this._domElement = binding.getBindingElement ();
}

/**
 * Get relative to top window.
 * @return {Point} 
 */
BindingBoxObject.prototype.getUniversalPosition = function () {

	return DOMUtil.getUniversalPosition ( this._domElement );
}

/**
 * Get position relative to containing window.
 * @return {Point} 
 */
BindingBoxObject.prototype.getGlobalPosition = function () {

	return DOMUtil.getGlobalPosition ( this._domElement );
}

/**
 * Get position relative to nearest positioned ancestor.
 * @return {Point} 
 */
BindingBoxObject.prototype.getLocalPosition = function () {

	return DOMUtil.getLocalPosition ( this._domElement );
}

/**
 * @return {Dimension} 
 */
BindingBoxObject.prototype.getDimension = function () {

	/*
	return new Dimension (
		 this._domElement.offsetWidth,
		 this._domElement.offsetHeight
	);
	*/
	
	var rect = this._domElement.getBoundingClientRect ();
	return new Dimension (
		 rect.right - rect.left,
		 rect.bottom - rect.top
	);
}

/**
 * Dispose.
 */
BindingBoxObject.prototype.dispose = function () {
	
	this._domElement = null;
}