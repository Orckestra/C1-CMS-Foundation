TreeCrawler.prototype = new BindingCrawler;
TreeCrawler.prototype.constructor = TreeCrawler;
TreeCrawler.superclass = BindingCrawler.prototype;

TreeCrawler.ID = "treecrawler";
TreeCrawler.MODE_GETOPEN = "get open treenodes";

/**
 * @class
 * The TreeCrawler sees only TreeNodeBindings.
 */
function TreeCrawler () {
	
	this.mode = TreeCrawler.MODE_GETOPEN;
	this.id = TreeCrawler.ID;
	this._construct ();
	return this;
}

/**
 * * Filter all but Binding elements.
 * @overloads {ElementCrawler#_construct} 
 */
TreeCrawler.prototype._construct = function () {
	
	TreeCrawler.superclass._construct.call ( this );
	
	var self = this;
	
	/*
	 * See only treenodes.
	 */
	this.addFilter ( function ( element ) {
		
		var binding = UserInterface.getBinding ( element );
		var result = null;var result = null;
		
		if ( !binding instanceof TreeNodeBinding ) {
			result = NodeCrawler.SKIP_NODE;
		}
		
		return result;
	});
	
	/*
	 * Analyze treenode. 
	 */
	this.addFilter ( function ( element, list ) {
		
		var binding = UserInterface.getBinding ( element );
		var result = null;
		
		switch ( self.mode ) {
			case TreeCrawler.MODE_GETOPEN :
				if ( binding.isOpen ) {
					list.add ( binding );
				}
				break;
		}
		return result;
	});
}