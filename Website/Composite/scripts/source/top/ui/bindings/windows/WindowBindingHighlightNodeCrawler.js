WindowBindingHighlightNodeCrawler.prototype = new NodeCrawler;
WindowBindingHighlightNodeCrawler.prototype.constructor = WindowBindingHighlightNodeCrawler;
WindowBindingHighlightNodeCrawler.superclass = NodeCrawler.prototype;

WindowBindingHighlightNodeCrawler.CLASSNAME_HIGHLIGHT = "compositec1generatedhighlight";

/**
 * @class
 */
function WindowBindingHighlightNodeCrawler () {

	/**
	 * @type {List<string>}
	 */
	this._keywords = null;
	
	/**
	 * @type {Map<string><RegExp>}
	 */
	this._map = new Map ();
	
	/**
	 * @type {List<DOMTextNode}
	 */
	this._textnodes = null;
	
	this._construct ();
	return this;
}

/**
 * Filter all but Element nodes.
 * @overloads {NodeCrawler#_construct} 
 */
WindowBindingHighlightNodeCrawler.prototype._construct = function () {
	
	ElementCrawler.superclass._construct.call ( this );
	
	this.addFilter ( function ( node, arg ) {
		var result = null;
		if ( node.nodeType == Node.ELEMENT_NODE ) {
			var nodename = node.nodeName.toLowerCase ();
			switch ( nodename ) {
				case "script" :
				case "style" :
				case "textarea" :
					result = NodeCrawler.SKIP_NODE + NodeCrawler.SKIP_CHILDREN;
					break;
			}
		}
		return result;
	});
	
	/*
	 * While crawling, simply collect the suspect textnodes in a list 
	 * in order to avoud document updates that might confuse the crawler. 
	 * The textnodes are finally modified by method onCrawlStop below. 
	 */
	var self = this;
	this.addFilter ( function ( node, arg ) {
		if ( node.nodeType == Node.TEXT_NODE ) {
			var text = node.nodeValue.toLowerCase ();
			self._map.each ( function ( key, exp ) {
				var result = true;
				if ( exp.test ( text )) {
					self._textnodes.add ( node );
					result = false;
				}
				return result;
			});
		}
	});
};

/**
 * Start crawling.
 * @overloads {NodeCrawler#crawl}
 * @param {DOMElement} element
 * @param {object} arg
 */
WindowBindingHighlightNodeCrawler.prototype.crawl = function ( element, arg ) {
	
	this._textnodes = new List ();
	WindowBindingHighlightNodeCrawler.superclass.crawl.call ( this, element, arg );
}

/**
 * Set keywords.
 * @param {List<string>} list
 * @@see {SEODOMParser#setKeys}
 */
WindowBindingHighlightNodeCrawler.prototype.setKeys = function ( list ) {
	
	list.reset ();
	this._map.empty ();
	
	while ( list.hasNext ()) {
		var key = list.getNext ();
		var phrase = key.toLowerCase ().replace ( / /g, "\\W" );
		var exp = new RegExp ( "(" + phrase + ")" );
		this._map.set ( key, exp );
	}
};

/**
 * @overwrites {NodeCrawler#onCrawlStop}
 */
WindowBindingHighlightNodeCrawler.prototype.onCrawlStop = function () {
	
	var self = this;
	if ( this._textnodes.hasEntries ()) {
		this._textnodes.each ( function ( node ) {
			
			var div = self.contextDocument.createElement ( "div" );
			var frag = self.contextDocument.createDocumentFragment ();
			
			div.innerHTML = self._getMarkup ( node.nodeValue );
			while ( div.hasChildNodes ()) {
				frag.appendChild ( div.firstChild );
			}
			node.parentNode.replaceChild ( frag, node );
		});
	}
};

/**
 * Get that markup!
 * @param {string} original
 * @return {string}
 */
WindowBindingHighlightNodeCrawler.prototype._getMarkup = function ( original ) {
		
	var markup = "";
	var TAGSTART = "<span class=\"" + WindowBindingHighlightNodeCrawler.CLASSNAME_HIGHLIGHT + "\" style=\"background-color:yellow;color:black;\">";
	var TAGSTOP = "</span>";
	
	/*
	 * This recursive setup ensures that each multiple 
	 * keywords occurances is highlighted properly.
	 */
	var self = this;
	function iterate ( current ) {
		
		var minindex = -1;
		var minkey = null;
		
		/*
		 * Isolate the regexp match with the lowest position index. 
		 */
		self._map.each ( function ( key, exp ) {
			
			var low = current.toLowerCase ();
			var index = low.search ( exp );
			
			if ( index >-1 ) {
				if ( minindex == -1 ) {
					minindex = index;
				}
				if ( index <= minindex ) {
					minindex = index;
					minkey = key;
				}
			}
		});
		
		/*
		 * Markup the match, cut from string and iterate the rest.
		 */
		if ( minindex > -1 && minkey != null ) {
			
			var pre = current.substring ( 0, minindex );
			var hit = current.substring ( minindex, minindex + minkey.length );
			var pst = current.substring ( minindex + minkey.length, current.length );
			
			markup += pre + TAGSTART + hit + TAGSTOP;					
			iterate ( pst );
			
		} else {
			
			markup += current;
		}
	}
	
	iterate ( original );
	return markup;
}

/*
 * Remove traces of earlier highlight.
 * @param {HTMLElement} element
 */
WindowBindingHighlightNodeCrawler.prototype.reset = function ( element ) {
	
	var spans = new List ( element.getElementsByTagName ( "span" ));
	spans.each ( function ( span ) {
		if ( span.className == WindowBindingHighlightNodeCrawler.CLASSNAME_HIGHLIGHT ) {
			var node = element.ownerDocument.createTextNode ( DOMUtil.getTextContent ( span ));
			span.parentNode.replaceChild ( node, span );
		}
	});
}