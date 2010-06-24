/**
 * Compare two points.
 * @param {Point} p1
 * @param {Point} p2
 * @return {boolean}
 */
Point.isEqual = function ( p1, p2 ) {
	
	var result = false;
	if ( p1 && p2 ) {
		result = ( p1.x == p2.x ) && ( p1.y == p2.y );
	}
	return result;
}

/**
 * @class
 * @param {int} x
 * @param {int} y
 */
function Point ( x, y ) {

	this.x = x;
	this.y = y;
}

Point.prototype = {
	
	/**
	 * X position.
	 * @type {int}
	 */
	x : 0,
	
	/**
	 * Y position.
	 * @type {int}
	 */
	y : 0
}