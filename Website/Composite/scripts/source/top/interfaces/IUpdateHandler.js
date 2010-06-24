/**
 * Update handler interface.
 */
var IUpdateHandler = new function () {

	/**
	 * Handle element update?
	 * @param {Element} newelement
	 * @param {Element} oldelement
	 * @returns {boolean} 
	 */
	this.handleElement = function ( newelement, oldelement ) {};
	
	/**
	 * Update element.
	 * @implements {IUpdateHandler}
	 * @param {Element} newelement
	 * @param {Element} oldelement
	 * @returns {boolean} 
	 */
	this.updateElement = function ( newelement, oldelement ) {};
}