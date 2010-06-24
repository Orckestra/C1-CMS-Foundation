DocumentCrawler.prototype = new ElementCrawler;
DocumentCrawler.prototype.constructor = DocumentCrawler;
DocumentCrawler.superclass = ElementCrawler.prototype;

DocumentCrawler.ID = "documentcrawler";
DocumentCrawler.MODE_REGISTER = "register";
DocumentCrawler.MODE_ATTACH = "attach";
DocumentCrawler.MODE_DETACH = "detach";

/**
 * @class
 * This be the crawler that attaches and detaches bindings. When a binding has 
 * the DocumentCrawler.ID included in it's "crawlerFilters" property, it means 
 * that the binding is not supposed to have descendant bindings (or that the  
 * binding will handle descendant bindings registration and attachment itself).
 */
function DocumentCrawler () {
	
	this.mode = DocumentCrawler.MODE_REGISTER;
	this.id = DocumentCrawler.ID;
	this._construct ();
	return this;
}

/**
 * @overloads {Crawler#_construct} 
 */
DocumentCrawler.prototype._construct = function () {
	
	DocumentCrawler.superclass._construct.call ( this );
	
	var self = this;
	this.addFilter ( function ( element, list ) {
		
		var binding = UserInterface.getBinding ( element );
		var result = null;
		
		switch ( self.mode ) {
			
			case DocumentCrawler.MODE_REGISTER :
				if ( binding == null ) {
					UserInterface.registerBinding ( element );
				}
				break;
				
			case DocumentCrawler.MODE_ATTACH :
				if ( binding != null ) {
					if ( !binding.isAttached ) {
						list.add ( binding );
					}
					if ( binding.isLazy == true ) {
						result = NodeCrawler.SKIP_CHILDREN;
					}
				}
				break;
				
			case DocumentCrawler.MODE_DETACH :
				if ( binding != null ) {
					list.add ( binding );
				}
				break;
		}
		return result;
	});
}