/**
 * @class
 * Drag handler.
 */
var IDragHandler = new function () {
	
	/**
	 * @param {Point} point
	 */
	this.onDragStart = function ( point ) {}
	
	/**
	 * @param {Point} diff
	 */
	this.onDrag = function ( diff ) {}
	
	/**
	 * @param {Point} diff
	 */
	this.onDragStop = function ( diff ) {}
}