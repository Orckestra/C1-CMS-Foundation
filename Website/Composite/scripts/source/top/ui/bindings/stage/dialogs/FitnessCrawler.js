FitnessCrawler.prototype = new Crawler;
FitnessCrawler.prototype.constructor = FitnessCrawler;
FitnessCrawler.superclass = Crawler.prototype;

FitnessCrawler.ID = "fitnesscrawler";
FitnessCrawler.MODE_BRUTAL = "brutal fitness";
FitnessCrawler.MODE_TRAINING = "train fitness";

/**
 * This crawler handles focus and blur.
 * @class
 */
function FitnessCrawler () {
	 
	this.id = FitnessCrawler.ID;
	this.mode = FitnessCrawler.MODE_TRAINING; 
	this._construct ();
	return this;
}

/**
 * @overloads {Crawler#_construct} 
 */
FitnessCrawler.prototype._construct = function () {
	
	FitnessCrawler.superclass._construct.call ( this );
	
	this.addFilter ( function ( element, list ) {
		
		var result = null;
		var binding = UserInterface.getBinding ( element );
		
		if ( !binding.isVisible ) {
			result = NodeCrawler.SKIP_NODE + NodeCrawler.SKIP_CHILDREN; 
		}
		
		return result;
	});
	
	/*
	 * Collecting unfit members.
	 */
	this.addFilter ( function ( element, list ) {
		
		var result = null;
		var binding = UserInterface.getBinding ( element );
		
		if ( binding.isAttached ) {
			if ( Interfaces.isImplemented ( IFit, binding )) {
				if ( !binding.isFit || this.mode == FitnessCrawler.MODE_BRUTAL ) {
					list.add ( binding );
				}
			}
		}
		return null;
	});
};