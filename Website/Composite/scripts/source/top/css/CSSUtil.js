/**
 * Handy interface for messing what an elements classname. 
 */ 
function _CSSUtil () {}

_CSSUtil.prototype = {
	
	/**
	 * Get the current CSS classname of a DOM element.
	 * @param {DOMElement} element
	 * @return {string}
	 */
	_getCurrent : function ( element ) {
		var current = element.style ? element.className : element.getAttribute ( "class" );
		current = current ? current : "";
		return current;
	},
	
	/**
	 * Check for occurance of substring.
	 * @param {string} current
	 * @param {string} sub
	 * @return boolean
	 */
	_contains : function ( current, sub ) {
		return current.indexOf ( sub ) >-1;
	},
	
	/**
	 * Cumulative builder for whitespace-separated strings
	 * @param {string} current
	 * @param {string} sub
	 * @return {string}
	 */
	_attach : function ( current, sub ) {
		return current + ( current == "" ? "" : " " ) + sub;
	},
	
	/**
	 * Cumulative destroyer of whitespace-separated strings. 
	 * @param {string} current
	 * @param {string} sub
	 * @return {string}
	 */
	_detach : function ( current, sub ) {
		if ( this._contains ( current, " " + sub )) {
			sub = " " + sub;
		}
		return current.replace ( sub, "" );
	},
	
	/**
	 * Attach CSS classname to a DOM element.
	 * @param {DOMElement} element
	 * @param {string} classname
	 */
	attachClassName : function ( element, classname ) {
	
		if ( element.classList != null ) {
			if ( !element.classList.contains ( classname )) {
				element.classList.add ( classname );
			}
		} else {
			var current = this._getCurrent ( element );
			if ( !this._contains ( current, classname )) {
				current = this._attach ( current, classname );
			}
			if ( element.style != null ) {
				element.className = current;
			} else {
				element.setAttribute ( "class", current );
			}
		}
	},

	/**
	 * Detach CSS classname from a DOM element.
	 * @param {DOMElement} element
	 * @param {string} classname
	 */
	detachClassName : function ( element, classname ) {
		
		if ( element.classList != null ) {
			if ( element.classList.contains ( classname )) {
				element.classList.remove ( classname );
			}
		} else {
			var current = this._getCurrent ( element );
			if ( this._contains ( current, classname )) {
				current = this._detach ( current, classname );
			}
			if ( element.style != null ) {
				element.className = current;
			} else {
				if ( current == "" ) {
					element.removeAttribute ( "class" );
				} else {
					element.setAttribute ( "class", current );
				}
			}
		}
	},
	
	/**
	 * @param {DOMElement} element
	 * @param {string} classname
	 */
	hasClassName : function ( element, classname ) {
		
		var result = false;
		if ( element.classList != null ) {
			result = element.classList.contains ( classname );
		} else {
			result = this._contains ( this._getCurrent ( element ), classname );
		}
		return result;
	}
}

/**
 * The instance that does it.
 * @type {_CSSUtil}
 */
var CSSUtil = new _CSSUtil ();