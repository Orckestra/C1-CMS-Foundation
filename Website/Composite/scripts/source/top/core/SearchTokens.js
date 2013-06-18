/**
 * @class
 * Search tokens are used to filter the content of a {@link SystemTreeBinding}.
 */
window.SearchTokens = new function () {
	
	/*
	 * Tokens indexed by key. This list should be manually maintained 
	 * to match available search tokens provided by the mighty server. 
	 * This will make sure that we don't misspell these strings.
	 */
	var tokens = {
		
		// searching gif, jpeg and png files.
		"MediaFileElementProvider.WebImages" : null,
		// searching flash, quicktime, director and windows media files.
		"MediaFileElementProvider.EmbeddableMedia": null,
		// searching only writable folders.
		"MediaFileElementProvider.WritableFolders": null,
		// searching functions that return XhtmlDocument (suitable for rendering) 
		"AllFunctionsElementProvider.VisualEditorFunctions": null,
		// searching functions that are sutable for Xslt function's function call section
		"AllFunctionsElementProvider.XsltFunctionCall": null
	}
	
	/**
	 * Get token by key.
	 * @param {string} key 
	 */
	this.getToken = function ( key ) {
		
		var result = null;
		if ( this.hasToken ( key )) {
			result = tokens [ key ];
		} else {
			throw "Unknown search token key: " + key;
		}
		return result;
	}
	
	/**
	 * Has token?
	 * @param {string} key
	 * @return {boolean}
	 */
	this.hasToken = function ( key ) {
		
		return typeof tokens [ key ] != Types.UNDEFINED;
	}
	
	/*
	 * Fetch tokens on login.
	 */
	EventBroadcaster.subscribe ( BroadcastMessages.APPLICATION_LOGIN, {
		handleBroadcast : function () {
			new List ( TreeService.GetSearchTokens ( true )).each ( 
				function ( token ) {
					if ( SearchTokens.hasToken ( token.Key )) {
						tokens [ token.Key ] = token.Value;
					} else {
						alert ( "SearchTokens need updating!" );
					}
				}
			);
		}
	});
}