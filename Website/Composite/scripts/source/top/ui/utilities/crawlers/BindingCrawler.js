BindingCrawler.prototype = new ElementCrawler;
BindingCrawler.prototype.constructor = BindingCrawler;
BindingCrawler.superclass = ElementCrawler.prototype;

/**
 * @class
 * The ElementCrawler sees only elements with Bindings attached.
 */
function BindingCrawler () {
	
	this._construct ();
	return this;
}

/**
 * * Filter all but Binding elements.
 * @overloads {ElementCrawler#_construct} 
 */
BindingCrawler.prototype._construct = function () {
	
	BindingCrawler.superclass._construct.call ( this );
	
	this.addFilter ( function ( element, arg ) {
		var result = null;
		if ( !UserInterface.hasBinding ( element )) {
			result = NodeCrawler.SKIP_NODE;
		}
		return result;
	});
}