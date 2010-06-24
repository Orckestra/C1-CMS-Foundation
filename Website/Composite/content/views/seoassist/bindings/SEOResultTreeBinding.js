SEOResultTreeBinding.prototype = new TreeBinding;
SEOResultTreeBinding.prototype.constructor = SEOResultTreeBinding;
SEOResultTreeBinding.superclass = TreeBinding.prototype;

/**
 * @class
 */
function SEOResultTreeBinding () {
	
	/**
	 * @type {SystemLogger}
	 */
	this.logger = SystemLogger.getLogger ( "SEOResultTreeBinding" );
	
	/**
	 * @type {string}
	 */
	this.keyword = null;
	
	/*
	 * Returnable.
	 */
	return this;
}

/**
 * Identifies binding.
 */
SEOResultTreeBinding.prototype.toString = function () {

	return "[SEOResultTreeBinding]";
};

/**
 * @overloads {TreeBinding#focusSingleTreeNodeBinding}
 * @param {TreeNodeBinding} binding
 */
SEOResultTreeBinding.prototype.focusSingleTreeNodeBinding = function ( binding ) {
	
	SEOResultTreeBinding.superclass.focusSingleTreeNodeBinding.call ( this, binding );
	
	var key = null;
	if ( binding instanceof SEOResultTreeNodeBinding ) {
		key = binding.getLabel ();
	} else {
		key = binding.getAncestorBindingByLocalName ( "treenode" ).getLabel ();
	}
	if ( key != this.keyword ) {
		this.keyword = key;
		EventBroadcaster.broadcast ( BroadcastMessages.HIGHLIGHT_KEYWORDS, 
			new List ([ key ])
		);
	}
};