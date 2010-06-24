var Crawlers = new function () {
	
	var directives = {
		"stop crawling" : NodeCrawler.STOP_CRAWLING,
		"skip children" : NodeCrawler.SKIP_CHILDREN,
		"skip node"	: NodeCrawler.SKIP_NODE
	}
	
	/**
	 * Test descending crawler.
	 */
	this.testDescending = function ( arg ) {
		
		this._clear ();
		var crawler = this._getCrawler ( arg );
		crawler.crawl ( document.getElementById ( "test1" ));
	}
	
	/**
	 * Test ascending crawler.
	 */
	this.testAscending = function ( arg ) {
		
		this._clear ();
		var crawler = this._getCrawler ( arg );
		crawler.type = NodeCrawler.TYPE_ASCENDING;
		crawler.crawl ( document.getElementById ( "test2" ), true );
	}
	
	/**
	 * Clear previous test.
	 */
	this._clear = function () {
		
		var out = document.getElementById ( "output" );
		while ( out.hasChildNodes () == true ) {
			out.removeChild ( out.lastChild );
		}
	}
	
	/**
	 * Build test result.
	 */
	function out ( string ) {
		
		var ul = document.getElementById ( "output" );
		var li = DOMUtil.createElementNS ( Constants.NS_XHTML, "li", document );
		li.appendChild ( document.createTextNode ( string ));
		ul.appendChild ( li );
	}
	
	/**
	 * Configure test crawler.
	 * @return {NodeCrawler}
	 */
	this._getCrawler = function ( arg ) {
		
		var crawler = null;
		switch ( arg ) {
			case 1 :
				crawler = new NodeCrawler ();
				break;
			case 2 :
				crawler = new ElementCrawler ();
				break;
			case 3 :
				crawler = new BindingCrawler ();
				break;
		}
		
		crawler.addFilter ( function ( node ) {
			if ( node.nodeType == Node.TEXT_NODE ) {
				out ( "#text" );
				return NodeCrawler.SKIP_NODE;
			}
		});
		
		crawler.addFilter ( function ( node ) {
			out ( "<" + node.nodeName.toLowerCase () + " f=\"" + node.getAttribute ( "f" ) + "\">" );
		});
		
		crawler.addFilter ( function ( node ) {
			var directive = node.getAttribute ( "directive" );
			if ( directive ) {
				return directives [ directive ];
			}
		});
		
		crawler.addFilter ( function ( node ) {
			var nextnode = node.getAttribute ( "nextnode" );
			if ( nextnode ) {
				crawler.nextNode = document.getElementById ( nextnode );
			}
		})
		
		return crawler;
	}
}