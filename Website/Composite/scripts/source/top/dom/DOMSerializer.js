/**
 * @class
 * DOMSerialzier.
 */
function _DOMSerializer () {}

_DOMSerializer.prototype = {

	_serializer: (window.XMLSerializer ? new XMLSerializer() : null),

	/**
	 * @param {DOMNode} node This should be an element or a document node.
	 * @param {boolean} isPrettyPrint Works in Mozilla only!
	 * @return {string}
	 */
	serialize : function ( node, isPrettyPrint ) {
		
		var result = null;
		var element = node;
		
		if ( node.nodeType == Node.DOCUMENT_NODE ) {
			element = node.documentElement;
		}

		if (element.xml != null)
		{
			return element.xml;
		}
		else if ( this._serializer != null) {
			if ( isPrettyPrint == true ) {
				element = element.cloneNode ( true );
				element = DOMFormatter.format ( element, DOMFormatter.INDENTED_TYPE_RESULT );
			}
			result = this._serializer.serializeToString ( element );
		}
		return result;
	}
}

/**
 * The instance that does it.
 * @type {_DOMSerializer}
 */
var DOMSerializer = new _DOMSerializer ();