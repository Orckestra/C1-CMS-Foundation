StageCrawler.prototype = new BindingCrawler;
StageCrawler.prototype.constructor = StageCrawler;
StageCrawler.superclass = BindingCrawler.prototype;

StageCrawler.ID = "stagecrawler";
StageCrawler.MODE_MAXIMIZE = "maximize";
StageCrawler.MODE_UNMAXIMIZE = "minimize";

/**
 * @class
 * The ElementCrawler sees only elements with Bindings attached.
 */
function StageCrawler () {
	
	this.mode = StageCrawler.MODE_MAXIMIZE;
	this.id = StageCrawler.ID;
	this._construct ();
	return this;
}

/**
 * * Filter all but Binding elements.
 * @overloads {ElementCrawler#_construct} 
 */
StageCrawler.prototype._construct = function () {
	
	StageCrawler.superclass._construct.call ( this );
	
	var self = this;
	this.addFilter ( function ( element ) {
		
		var binding = UserInterface.getBinding ( element );
	 	var result = null;
		
		if ( binding ) {
			switch ( binding.constructor ) {
				case StageSplitBoxBinding :
				case StageSplitPanelBinding :
				case StageSplitterBinding :
					switch ( self.mode ) {
						case StageCrawler.MODE_MAXIMIZE :
							binding.handleMaximization ();
							break;
						case StageCrawler.MODE_UNMAXIMIZE :
							binding.handleUnMaximization ();
							break;
					}
					break;
				case DockBinding :
					result = NodeCrawler.SKIP_NODE;
					break;
			}
		}
		return result;
	});
}