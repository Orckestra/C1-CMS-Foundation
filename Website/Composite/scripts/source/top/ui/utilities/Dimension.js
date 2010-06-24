/**
 * Compare two dimensions.
 * @param {Dimension} dim1
 * @param {Dimension} dim2
 * @return {boolean}
 */
Dimension.isEqual = function ( dim1, dim2 ) {
	
	var result = false;
	if ( dim1 && dim2 ) {
		result = ( dim1.w == dim2.w ) && ( dim1.h == dim2.h );
	}
	return result;
}

/**
 * @class
 * @param {int} w
 * @param {int} h
 */
function Dimension ( w, h ) {

	this.w = w;
	this.h = h;
}

Dimension.prototype = {
	
	/**
	 * Width.
	 * @type {int}
	 */
	w : 0,
	
	/**
	 * Height.
	 * @type {int}
	 */
	h : 0
}