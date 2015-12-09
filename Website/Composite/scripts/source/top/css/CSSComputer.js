/**
 * @class 
 * This class functions primarily as an assistant for {@link FlexBoxBinding}.
 */
function _CSSComputer () {}

_CSSComputer.prototype = {
	
	_margins : {
		top		: Client.isExplorer ? "marginTop" : "margin-top",
		right	: Client.isExplorer ? "marginRight" : "margin-right",
		bottom	: Client.isExplorer ? "marginBottom" : "margin-bottom",
		left	: Client.isExplorer ? "marginLeft" : "margin-left"
	},
	
	_paddings : {
		top		: Client.isExplorer ? "paddingTop" : "padding-top",
		right	: Client.isExplorer ? "paddingRight" : "padding-right",
		bottom	: Client.isExplorer ? "paddingBottom" : "padding-bottom",
		left	: Client.isExplorer ? "paddingLeft" : "padding-left"
	},
	
	_borders : {
		top		: Client.isExplorer ? "borderTopWidth" : "border-top-width",
		right	: Client.isExplorer ? "borderRightWidth" : "border-right-width",
		bottom	: Client.isExplorer ? "borderBottomWidth" : "border-bottom-width",
		left	: Client.isExplorer ? "borderLeftWidth" : "border-left-width"
	},
	
	/** 
	 * @param {object} comples
	 * @param {DOMElement} element
	 * @return {object}
	 */
	_getComplexResult : function ( complex, element ) {
	
		var result = {};
		for ( var entry in complex ) {
			var ent = parseInt ( 
				DOMUtil.getComputedStyle ( element, complex [ entry ])
			);
			result [ entry ] = isNaN ( ent ) ? 0 : ent;
		}
		return result;
	},
	
	/**
	 * This should only be expected to work well for "px" units.
	 * Returns an object with four properties: top, right, bottom, left.
	 * @param {DOMElement} element
	 * @return {object}
	 */
	getMargin : function ( element ) {
		return this._getComplexResult ( this._margins, element );
	},
	
	/**
	 * This should only be expected to work well for "px" units.
	 * Returns an object with four properties: top, right, bottom, left.
	 * @param {DOMElement} element
	 * @return {object}
	 */
	getPadding : function ( element ) {
		return this._getComplexResult ( this._paddings, element );
	},
	
	/**
	 * This should only be expected to work well for "px" units.
	 * Returns an object with four properties: top, right, bottom, left.
	 * @param {DOMElement} element
	 * @return {object}
	 */
	getBorder : function ( element ) {
		return this._getComplexResult ( this._borders, element );
	},
	
	/**
	 * TODO: Rename this.
	 * @param {DOMElement} element
	 * @return {string}
	 */
	getPosition : function ( element ) {
		return DOMUtil.getComputedStyle ( element, "position" );
	},
	
	/**
	 * @param {DOMElement} element
	 * @return {string}
	 */
	getFloat : function ( element ) {
		return DOMUtil.getComputedStyle ( element, Client.isExplorer ? "styleFloat" : "float" );
	},
	
	/**
	 * @param {DOMElement} element
	 * @return {int}
	 */
	getZIndex : function ( element ) {
		return parseInt (
			DOMUtil.getComputedStyle ( element, Client.isExplorer ? "zIndex" : "z-index" )
		);
	},
	
	/**
	 * @param {DOMElement} element
	 * @return {string}
	 */
	getBackgroundColor : function ( element ) {
		return DOMUtil.getComputedStyle ( element, Client.isExplorer ? "backgroundColor" : "background-color" );
	},

	/**
 * @param {DOMElement} element
 * @return {string}
 */
	getWidth : function(element) {
		return DOMUtil.getComputedStyle(element, "width");
	}
}

/**
 * The instance that does it.
 * @type {_CSSComputer}
 */
var CSSComputer = new _CSSComputer ();