SearchPageBinding.prototype = new PageBinding;
SearchPageBinding.prototype.constructor = SearchPageBinding;
SearchPageBinding.superclass = PageBinding.prototype;

/**
 * @class
 */
function SearchPageBinding () {

	/**
	 * @type {SystemLogger}
	 */
	this.logger = SystemLogger.getLogger ( "SearchPageBinding" );
	
	/**
	 * @type {string}
	 */
	this._provoderName = null;
	
	/**
	 * @type {string}
	 */
	this._entityToken = null;
	
	/**
	 * @type {string}
	 */
	this._searchToken = null;
}

/** 
 * Identifies binding.
 */
SearchPageBinding.prototype.toString = function () {
	
	return "[SearchPageBinding]";
}

/**
 * @overloads {PageBinding#setPageArgument}
 * @param {HashMap<string><string>} map
 */
SearchPageBinding.prototype.setPageArgument = function ( map ) {
	
	SearchPageBinding.superclass.setPageArgument.call ( this, map );
	
	if ( map ) {
	
		this._providerName	= map [ "ProviderName" ];
		this._entityToken	= map [ "EntityToken" ];
		this._searchToken	= map [ "SerializedSearchToken" ];
		
		if ( !this._isValidSearch ()) {
			throw "SearchPageBinding argument dysfunction.";
		} else if ( this._isPageBindingInitialized ) {
			bindingMap.tree.clear ();
			this._buildSearchResultTree ();
		}
	}
}

/**
 * @overloads {PageBinding#onBeforePageInitialize}
 */
SearchPageBinding.prototype.onBeforePageInitialize = function () {
	
	if ( this._isValidSearch ()) {
		this._buildSearchResultTree ();
	}
	SearchPageBinding.superclass.onBeforePageInitialize.call ( this );
}

/**
 * Is valid search?
 * @return {boolean}
 */
SearchPageBinding.prototype._isValidSearch = function () {

	return (
		this._providerName != null && 
		this._entityToken != null && 
		this._searchToken != null
	);
}

/**
 * Launch new search dialog, providing existing search token.
 */
SearchPageBinding.prototype.newSearch = function () {
	
	var url = Dialog.URL_TREESEARCH;
	
	if ( this._isValidSearch () ) {
		url += "?SearchToken=" + this._searchToken;
		url += "&EntityToken=" + this._entityToken;
		url += "&ProviderName=" + this._providerName;
		Dialog.invokeModal ( url );
	} else {
		Dialog.error ( "UARGH?", "How to handle fresh search?" );
	}
	
	this._providerName 	= null;
 	this._entityToken 	= null;
	this._searchToken 	= null;
}

/**
 * Build search result tree.
 */
SearchPageBinding.prototype._buildSearchResultTree = function () {
	
	if ( this._isValidSearch ()) {
	
		bindingMap.tree.searchToken = this._searchToken;
		
		alert ( "tree.searchToken REFACTORED!" );
		
		var list = new List ( 
				
			/*
			 * THIS WSMETHOD ALSO REFACTORED!
			 */
				
			TreeService.GetElementsBySearchToken ( 
				this._providerName,
				this._entityToken,
				this._searchToken	
			)
		);
		if ( list.hasEntries ()) {
			while ( list.hasNext ()) {
				var node = SystemTreeNodeBinding.newInstance ( 
					new SystemNode ( 
						list.getNext ()
					), 
					this.bindingDocument 
				)
				bindingMap.tree.add ( node ); 
				node.attach ();
			}
			bindingMap.decks.select ( "resultdeck" );
		} else {
			bindingMap.decks.select ( "noresultdeck" );		
		}
	}
}

/**
 * Executed when the page is shown.
 *
SearchPageBinding.prototype.onAfterPageInitialize = function () {
	
	SystemPageBinding.superclass.onAfterPageInitialize.call ( this );
	
	if ( this._isValidSearch ()) {
		setTimeout ( function () {
			bindingMap.tree.focus ();
			bindingMap.tree.selectDefault ();
		}, 500 );
	}
}
*/