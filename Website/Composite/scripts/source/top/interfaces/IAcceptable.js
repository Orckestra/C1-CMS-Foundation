/**
 * @class
 * Acceptable.
 */
var IAcceptable = new function () {
	
	/** 
	 * Whitespace separated.
	 * @type {string}
	 */
	this.dragAccept = "type1 type2 type3";
	
	/**
	 * @param {IDraggable} binding
	 */
	this.accept = function ( binding ) {}
	
	/**
	 * Indicate acceptance when drag starts (whereever drag starts). OPTIONAL!
	 *
	this.showGeneralAcceptance = function () {}
	*/
	
	/**
	 * Don't indicate acceptance (whereever drag started). OPTIONAL!
	 *
	this.hideGeneralAcceptance = function () {}
	*/
	
	/**
	 * Indicate acceptance (onmouseover). OPTIONAL!
	 *
	this.showAcceptance = function () {}
	*/
	
	/**
	 * Don't indicate acceptance (onmouseout). OPTIONAL!
	 *
	this.hideAcceptance = function () {}
	*/
}