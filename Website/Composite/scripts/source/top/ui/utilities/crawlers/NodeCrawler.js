NodeCrawler.NORMAL = 1;
NodeCrawler.SKIP_NODE = 2;
NodeCrawler.SKIP_CHILDREN = 4;
NodeCrawler.STOP_CRAWLING = 8;

NodeCrawler.TYPE_DESCENDING = "descending";
NodeCrawler.TYPE_ASCENDING = "ascending";

/**
 * @class
 * The NodeCrawler will climb up and down the DOM tree.
 */
function NodeCrawler () {
	
	this._construct ();
	return this;
}

NodeCrawler.prototype = {
	
	/**
	 * @type {SystemLogger}
	 */
	logger: SystemLogger.getLogger ( "NodeCrawler" ),
		
	/**
	 * Type (defaults to descending).
	 * @type {string}
	 */
	type : NodeCrawler.TYPE_DESCENDING,
	
	/**
	 * The current node.
	 * @type {DOMElement}
	 */
	currentNode : null,
	
	/**
	 * The previous node.
	 * @type {DOMElement}
	 */
	previousNode : null,
	
	/**
	 * @type {DOMDocument}
	 */
	contextDocument : null,
	
	/**
	 * Filter list. Note that the filter list is not inherited to 
	 * subclasses, ie. all NodeCrawlers start with an empty list.
	 * @type {List<function>
	 */
	_filters : null,
	
	/**
	 * This will allow us to subclass safely. 
	 */
	_construct : function () {
		
		this.currentNode = null,
		this.previousNode = null;
		this.nextNode = null;
		this._filters = new List ();
		this.type = NodeCrawler.TYPE_DESCENDING;
	},
	
	/**
	 * Add node filter.
	 * @param {function} filter
	 */
	addFilter : function ( filter ) {
	
		this._filters.add ( filter );
	},
	
	/**
	 * Remove node filter.
	 * TODO: Test this method.
	 * @param {function} filter
	 */
	removeFilter : function ( filter ) {
		
		var index = -1;
		this._filters.each ( function ( fil ) {
			index ++;
			var result = true;
			if ( fil == filter ) {
				result = false;
			}
			return result;
		});
		if ( index >-1 ) {
			this._filters.del ( index );
		}
	},
	
	/**
	 * Apply functions to a given node. Return type info:
	 * 
	 * SKIP_NODE and STOP_CRAWLING will discontinue both 
	 * filter execution and DOM traversal immediately.
	 * 
	 * SKIP_CHILDREN will not stop the filter execution  
	 * chain, it only affects the DOM traversal on next 
	 * iteration of the _crawl method. Note that this  
	 * may itself be modified by a later function in the 
	 * filter chaing (by setting the response to NORMAL).
	 * 
	 * @param {DOMNode} node
	 * @return
	 */
	_applyFilters : function ( node, arg ) {
		
		var returnable = null;
		var stop = NodeCrawler.STOP_CRAWLING;
		var skip = NodeCrawler.SKIP_NODE;
		var block = NodeCrawler.SKIP_CHILDREN;
		
		this._filters.reset ();
		var isContinue = true;
		
		while ( this._filters.hasNext () && isContinue == true ) {
			var filter = this._filters.getNext ();
			//var res = filter ( node, arg );
			var res = filter.call ( this, node, arg );
			if ( res != null ) {
				returnable = res;
				switch ( res ) {
					case stop :
					case skip :
					case skip + block :
						isContinue = false;
						break;
				}
			}
		}
		return returnable;
	},
	
	/**
	 * Start crawling.
	 * @param {DOMElement} element
	 * @param {object} arg
	 */
	crawl : function ( element, arg ) {
		
		this.contextDocument = element.ownerDocument;
		this.onCrawlStart ();
		
		/*
		 * TODO: Does ascending crawler evaluates first node twice?
		 */
		var isAscending = this.type == NodeCrawler.TYPE_ASCENDING;
		var returnable = this._applyFilters ( element, arg );
		
		/*
		 * Where to crawl next? Special setup when start crawling.
		 */
		if ( returnable != NodeCrawler.STOP_CRAWLING ) {
			if ( isAscending && returnable == NodeCrawler.SKIP_CHILDREN ) {
				// stop here!
			} else {
				var next = null;
				if ( this.nextNode != null ) {
					next = this.nextNode;
					this.nextNode = null;
				} else {
					next = isAscending ? element.parentNode : element;
				}
				this._crawl ( next, arg );
			}
		}
		
		this.onCrawlStop ();
	},
	
	/**
	 * Invoked when crawl is instantiated. Doing nothing  
	 * by default, this is for subclasses to overwrite.
	 */
	onCrawlStart : function () {},
	
	/**
	 * Invoked when crawl is terminated. Doing nothing  
	 * by default, this is for subclasses to overwrite.
	 */
	onCrawlStop : function () {},
	
	/**
	 * @param {DOMElement} element
	 * @param {object} arg
	 * @return {String}
	 */
	_crawl : function ( element, arg ) {
		
		var returnable = null;
		switch ( this.type ) {
			case NodeCrawler.TYPE_DESCENDING :
				returnable = this._crawlDescending ( element, arg );
				break;
			case NodeCrawler.TYPE_ASCENDING :
				returnable = this._crawlAscending ( element, arg );
				break;
		}
		return returnable;
	},
	
	/**
	 * Crawl descending.
	 * @param {DOMElement} element
	 * @param {object} arg
	 * @param {boolean} isInternal
	 * @return {String}
	 */
	_crawlDescending : function ( element, arg ) {
		
		var skip = NodeCrawler.SKIP_NODE;
		var block = NodeCrawler.SKIP_CHILDREN;
		var stop = NodeCrawler.STOP_CRAWLING;
		
		var returnable = null;
		
		if ( element.hasChildNodes ()) {
			
			var node = element.firstChild;
			while ( node != null && returnable != stop ) {
				
				this.currentNode = node;
				returnable = this._applyFilters ( node, arg );
				
				switch ( returnable ) {
					case stop :
					case block :
					case skip + block :
						break;
					default :
						if ( node.nodeType == Node.ELEMENT_NODE ) {
							if ( this.nextNode == null ) {
								var res = this._crawl ( node, arg ); 
								if ( res == stop ) {
									returnable = stop;
									break;
								}
							}
						}
						if ( returnable != stop && returnable != skip ) {
							this.previousNode = node; // .... move this up? Think about it...
						}
						break;
				}
				if ( returnable != stop ) {
					node = this.nextNode ? this.nextNode : node.nextSibling;
					this.nextNode = null;
				}
			}
		}
		
		return returnable;
	},
	
	/**
	 * Crawl ascending.
	 * @param {DOMElement} element.
	 * @param {object} arg
	 * @return {String}
	 */
	_crawlAscending : function ( element, arg ) {
		
		var returnable = null;
		var skip = NodeCrawler.SKIP_CHILDREN;
		var stop = NodeCrawler.STOP_CRAWLING;
		
		if ( element != null ) {
			this.currentNode = element;
			returnable = this._applyFilters ( element, arg );
			if ( returnable != stop ) {
				var next = this.nextNode ? this.nextNode : element.parentNode;
				this.nextNode = null;
				if ( next && next.nodeType != Node.DOCUMENT_NODE ) {
					this.previousNode = element;
					returnable = this._crawl ( next, arg );
				}
			}
		} else {
			returnable = stop;
		}
		return returnable;
	}
}

/**
 * Dispose crawler. The benefit of this has not been documented, 
 * but leaking closures may be hiding in the filters...
 */
NodeCrawler.prototype.dispose = function () {
	
	this._filters.dispose ();
	for ( var property in this ) {
		this [ property ] = null;
	}
}