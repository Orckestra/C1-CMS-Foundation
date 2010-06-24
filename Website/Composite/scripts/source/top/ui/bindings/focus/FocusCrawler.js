FocusCrawler.prototype = new Crawler;
FocusCrawler.prototype.constructor = FocusCrawler;
FocusCrawler.superclass = Crawler.prototype;

FocusCrawler.ID = "focuscrawler";

FocusCrawler.MODE_INDEX = "index";
FocusCrawler.MODE_FOCUS = "focus";
FocusCrawler.MODE_BLUR = "blur";

/**
 * This crawler handles focus and blur.
 * @class
 */
function FocusCrawler () {
	 
	this.id = FocusCrawler.ID;
	this._construct ();
	return this;
}

/**
 * @overloads {Crawler#_construct} 
 */
FocusCrawler.prototype._construct = function () {
	
	FocusCrawler.superclass._construct.call ( this );
	
	this.addFilter ( function ( element, list ) {
		
		var result = null;
		var binding = UserInterface.getBinding ( element );
		
		if ( binding.isAttached == true ) {
			if ( Interfaces.isImplemented ( IFocusable, binding ) == true ) {
				if ( binding.isFocusable && binding.isVisible ) {
					switch ( this.mode ) {
						
						case FocusCrawler.MODE_INDEX :	
							list.add ( binding );
							break;
							
						case FocusCrawler.MODE_FOCUS :
							if ( !binding.isFocused ) {
								binding.focus ();
							}
							result = NodeCrawler.STOP_CRAWLING;
							break;
	
						case FocusCrawler.MODE_BLUR :
							if ( binding.isFocused == true ) {
								binding.blur ();
								result = NodeCrawler.STOP_CRAWLING;
							}
							break;
					}
				}
			}
		}
		//self._string += binding.toString () + ": " + result + "\n";
		
		return result;
	});
}

/*
FocusCrawler.prototype.onCrawlStart = function (){
	
	this._string = this.mode + "\n\n";
}

FocusCrawler.prototype.onCrawlStop = function (){
	
	this.logger.debug ( this._string );
}
*/