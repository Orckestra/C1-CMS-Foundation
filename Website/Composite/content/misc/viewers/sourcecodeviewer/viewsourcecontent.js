var DOMEvents = top.DOMEvents;
var Node = top.Node;
var CSSUtil = top.CSSUtil;
var Client = top.Client;

/**
 * @class
 */ 
var ViewSourceContent = new function () {
	
	var logger = top.SystemLogger.getLogger ( "ViewSourceContent" );
	var listen = true;
	
	/**
	 * Timeout fixes a strange bug in exploder.
	 * @param {DOMElement} e
	 */ 
	function twist ( element ) {
		if ( listen ) {
			element.className = element.className == "open" ? "closed" : "open";
			listen = false;
			setTimeout ( function () {
				listen = true;
			}, 0 );	
		} 
	}
	
	/**
	 * @implements {IEventListener}
	 * @param {MouseEvent} e
	 */
	this.handleEvent = function ( e ) {
	
		if ( e.button == Client.isExplorer ? 1 : 0 ) {
			var target = DOMEvents.getTarget ( e );
			while ( target.nodeType == Node.ELEMENT_NODE ) {
				if ( CSSUtil.hasClassName ( target, "haschildren" )) {
					DOMEvents.stopPropagation ( e );
					twist ( target.parentNode );
					break;
				} else {
					target = target.parentNode;
				}
			}
		}
	}
	
	DOMEvents.addEventListener ( 
		document, 
		DOMEvents.MOUSEDOWN, 
		this
	);
}