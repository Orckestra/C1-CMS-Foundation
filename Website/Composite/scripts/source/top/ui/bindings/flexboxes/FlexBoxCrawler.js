FlexBoxCrawler.prototype = new Crawler;
FlexBoxCrawler.prototype.constructor = FlexBoxCrawler;
FlexBoxCrawler.superclass = Crawler.prototype;

FlexBoxCrawler.ID = "flexboxcrawler";
FlexBoxCrawler.MODE_FORCE = "force";
FlexBoxCrawler.MODE_NORMAL = "normal";

/**
 * @class
 * Crawler handles recursive flex.
 * @see {Binding#reflex}
 * @see {FlexBoxBinding.reflex}
 */
function FlexBoxCrawler () {
	
	/**
	 * Identifies the crawler.
	 * @type {string}
	 */
	this.id = FlexBoxCrawler.ID;
	
	/**
	 * Switching Crawler agressiveness.
	 * @type {string}
	 */
	this.mode = FlexBoxCrawler.MODE_NORMAL;
	
	/**
	 * This binding who instantiated the reflex action.
	 * @type {Binding}
	 */
	this.startBinding = null;
	
	/*
	 * Construction time again.
	 */
	this._construct ();
	
	/*
	 * Returnable.
	 */
	return this;
}

/**
 * @overloads {Crawler#_construct} 
 */
FlexBoxCrawler.prototype._construct = function () {
	
	FlexBoxCrawler.superclass._construct.call ( this );

	var self = this;
	
	this.addFilter ( function ( element, list ) {
		
		var result = null;
		var binding = UserInterface.getBinding ( element );
		
		if ( Interfaces.isImplemented ( IFlexible, binding ) == true ) {
			
			/*
			 * Note that we don't check the value of property 
			 * isFlexible. That's because the flex method 
			 * may be used for other purposes than flexboxing.
			 */
			switch ( self.mode ) {		
				case FlexBoxCrawler.MODE_FORCE :
					list.add ( binding );
					break;
					
				case FlexBoxCrawler.MODE_NORMAL :
					if ( binding.isFlexSuspended == true ) {
						result = NodeCrawler.SKIP_CHILDREN;
					} else {
						list.add ( binding );
					}
					break;
			}
		}
		
		return result;
	});
}