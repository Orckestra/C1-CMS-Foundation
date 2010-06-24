Crawler.prototype = new BindingCrawler;
Crawler.prototype.constructor = Crawler;
Crawler.superclass = BindingCrawler.prototype;

/**
 * @class
 * The Crawler will climb all binding elements and 
 * invoke a method on the associated Binding.
 */
function Crawler () {
	
	/**
	 * The binding may recognize the intent of 
	 * the crawler by addressing the id property.
	 * @type {string}
	 */ 
	this.id = null;

	/**
	 * The binding may control the bindings behavior - eg skip, 
	 * stop or skip children - by modifying this property. We 
	 * do it like this because a response type on the method 
	 * <code>handleCrawler</code> would surely get lost in 
	 * method overloading...
	 * @type {string}
	 */
	this.response = null;
	
	/*
	 * Construct.
	 */
	this._construct ();
	
	/*
	 * Returnable.
	 */
	return this;
}

/**
 * Fires the method <code>handleCrawler</code> an any waiting binding. 
 * @overloads {BindingCrawler#_construct} 
 */
Crawler.prototype._construct = function () {
	
	Crawler.superclass._construct.call ( this );
	
	this.response = null;

	var self = this;
	this.addFilter ( function ( element, arg ) {
		var result = null;
		var binding = UserInterface.getBinding ( element );
		if ( Interfaces.isImplemented ( ICrawlerHandler, binding ) == true ) {
			self.response = null;
			binding.handleCrawler ( self );
			result = self.response;		
		}
		return result;
	});
}