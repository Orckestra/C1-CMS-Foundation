ElementCrawler.prototype = new NodeCrawler;
ElementCrawler.prototype.constructor = ElementCrawler;
ElementCrawler.superclass = NodeCrawler.prototype;

/**
 * @class
 * The ElementCrawler sees only element nodes.
 */
function ElementCrawler () {

	this._construct ();
	return this;
}

/**
 * Filter all but Element nodes.
 * @overloads {NodeCrawler#_construct} 
 */
ElementCrawler.prototype._construct = function () {
	
	ElementCrawler.superclass._construct.call ( this );
	
	this.addFilter ( function ( node, arg ) {
		var result = null;
		if ( node.nodeType != Node.ELEMENT_NODE ) {
			result = NodeCrawler.SKIP_NODE;
		}
		return result;
	});
}