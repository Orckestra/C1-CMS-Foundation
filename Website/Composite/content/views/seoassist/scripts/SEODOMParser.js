/**
 * @class
 */
function SEODOMParser () {
	
	this._init ();
}

SEODOMParser.prototype = {
	
	/**
	 * @type {SystemLogger}
	 */
	_logger : SystemLogger.getLogger ( "SEODOMParser" ),
	
	/**
	 * @type {NodeCrawler}
	 */
	_crawler : null,
	
	/**
	 * @type {Map<string><RegExp>}
	 */
	_map : new Map (),
	
	/**
	 * @type {Map<string><SEOResult>}
	 */
	_results : null,
	
	/**
	 * @type {boolean}
	 */
	_isDebugging : false,
	
	/**
	 * Init.
	 */
	_init : function () {
		
		this._crawler = new NodeCrawler ();
		var WHITESPACE = /[^\t\n\r ]/;
		var self = this;
		
		/*
		 * Filter empty text nodes, scripts and styles. 
		 */
		this._crawler.addFilter ( function ( node ) {
			var result = null;
			switch ( node.nodeType ) {
				case Node.TEXT_NODE :
					if ( !WHITESPACE.test ( node.nodeValue )) {
						result = NodeCrawler.SKIP_NODE;
					}
				 	break;
				case Node.ELEMENT_NODE :
					switch ( node.nodeName.toLowerCase ()) {
						case "script" :
						case "style" :
						case "textarea" :
							result = NodeCrawler.SKIP_NODE + NodeCrawler.SKIP_CHILDREN;
							break;
					}
					break;
			}
			return result;
		});
		
		/*
		 * Analayze remaining nodes.
		 */
		this._crawler.addFilter ( function ( node ) {
			if ( node.nodeType == Node.TEXT_NODE ) {
				self._analyzeTextNode ( node );
			} else {
				switch ( node.nodeName.toLowerCase ()) {
					case "meta" :
						self._analyzeMetaTag ( node );
						break;
				}
			}
		});
	},
	
	/**
	 * Set keywords. 
	 * @param {List<string>} list
	 * @see {SEODOMParser#setKeys}
	 */
	setKeys : function ( list ) {
		
		/* (\Wkeyword\Wkeyword2\W)|(keyword\Wkeyword2\W)|(\Wkeyword\Wkeyword2)|(keyword\Wkeyword2) */
		
		list.reset ();
		this._map.empty ();
		
		while ( list.hasNext ()) {
			var key = list.getNext ()
			var phrase = key.toLowerCase ().replace ( / /g, "\\W" );
			var exp = new RegExp ( "(\\W" + phrase + "\\W)|(" + phrase + "\\W)|(\\W" + phrase + ")|(" + phrase + ")" );
			this._map.set ( key, exp );
		}
	},
	
	/**
	 * @param {DOMDocument} dom
	 * @return {List<SEOResult>}
	 */
	parse : function ( dom ) {
		
		if ( this._isDebugging == true ) {
			this._logger.debug ( DOMSerializer.serialize ( dom ));
		}
		this._results = new Map();

		//add all keys to result
		var self = this;
		this._map.each(function(key) {
			self._getResult(key);
		});
		


		this._crawler.crawl ( dom );
		
		/*
		 * Collect results in array.
		 */
		var array = [];
		this._results.each ( function ( key, result ) {
			array.push ( result );
		});
		
		/*
		 * Sort array by score.
		 */
		array.sort ( function ( a, b ) {
			var result = 0;
			var ascore = a.getScore ();
			var bscore = b.getScore ();
			if ( ascore < bscore ) {
				result = 1;
			}
			if ( ascore > bscore ) {
				result = -1;
			}
			return result;
		});
		
		return new List ( array );
	},
	
	/**
	 * Cache results.
	 * @return {SEOResult}
	 */
	_getResult : function ( key ) {
		
		if ( !this._results.has ( key )) {
			this._results.set ( key, new SEOResult ( key ));
		}
		return this._results.get ( key );
	},
	
	/**
	 * Analyze text node.
	 * @param {DOMTextNode} node
	 */
	_analyzeTextNode : function ( node ) {
		
		var self= this;
		var string = node.nodeValue.toLowerCase ();
		self._map.each ( function ( key, exp ) {
			if ( exp.test ( string )) {
				self._analyze ( key, node );
			}
		});
	},
	
	/**
	 * Analyze meta tag content.
	 * @param {HTMLMetaElement} element
	 */
	_analyzeMetaTag : function ( element ) {
		
		var name = element.getAttribute ( "name" );
		if ( name ) {
			name = name.toLowerCase ();
			switch ( name ) {
				case "c1.menutitle" :
				case "c1.urltitle" :
				case "description" :
					var text = element.getAttribute ( "content" );
					if ( text ) {
						var self = this, string = text.toLowerCase ();
						this._map.each ( function ( key, exp ) {
							if ( exp.test ( string )) {
								var result = self._getResult ( key );
								switch ( name ) {
									case "c1.menutitle" :
										result.isInMenuTitle = true;
										break;
									case "c1.urltitle" :
										result.isInURL = true;
										break;
									case "description" :
										result.isInDescription = true;
										break;
								}
							}
						});
					}
					break;
			}
		}
	},
	
	/**
	 * @param {DOMTextNode} node
	 */
	_analyze : function ( key, node ) {
		
		var next = node.parentNode;
		var isContinue = true;
		
		while ( next != null && isContinue == true ) {
			switch ( next.nodeName.toLowerCase ()) {
				case "h1" :
				case "h2" :
				case "h3" :
				case "h4" :
				case "h5" :
				case "h6" :
					this._getResult ( key ).isInHeading = true;
					isContinue = false;
					break;
				case "title" :
					this._getResult ( key ).isInTitle = true;
					isContinue = false;
					break;
				case "p" :
				case "li" :
				case "td" :
				case "div" :
					this._getResult ( key ).isInContent = true;
					isContinue = false;
					break;
			}
			next = next.parentNode;
		}
		/*
		if ( isContinue == true ) {
			// indicates keyword occurance in menus etc.
		}
		*/
	}
};