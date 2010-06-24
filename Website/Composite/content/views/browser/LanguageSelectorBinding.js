LanguageSelectorBinding.prototype = new SelectorBinding;
LanguageSelectorBinding.prototype.constructor = LanguageSelectorBinding;
LanguageSelectorBinding.superclass = SelectorBinding.prototype;

/**
 * @class
 */
function LanguageSelectorBinding () {
	
	/**
	 * @type {SystemLogger}
	 */
	this.logger = SystemLogger.getLogger ( "LanguageSelectorBinding" );
	
	/*
	 * Returnable.
	 */
	return this;
}

/**
 * Identifies binding.
 */
LanguageSelectorBinding.prototype.toString = function () {

	return "[LanguageSelectorBinding]";
}

/**
 * @overloads {SelectorBinding#onBindingAttach}
 */
LanguageSelectorBinding.prototype.onBindingAttach = function () {
	
	LanguageSelectorBinding.superclass.onBindingAttach.call ( this );
	 
	var browser = bindingMap.browserpage;
	browser.addActionListener ( BrowserPageBinding.ACTION_ONLOAD, this );
	browser.addActionListener ( BrowserPageBinding.ACTION_TABSHIFT, this );
}

/**
 * @overloads {SelectorBinding#handleAction}
 * @implements {IActionListener}
 * @param {Action} action
 */
LanguageSelectorBinding.prototype.handleAction = function ( action ) {
	
	LanguageSelectorBinding.superclass.handleAction.call ( this, action );
	
	switch ( action.type ) {
		case BrowserPageBinding.ACTION_ONLOAD :
		case BrowserPageBinding.ACTION_TABSHIFT :
			this._updateLanguages ();	
			break;
	}
}

/**
 * The server returns an array of objects with props:
 *     Name
 *     IsoName
 *     UrlMappingName
 *     Url
 *     IsCurrent
 */
LanguageSelectorBinding.prototype._updateLanguages = function () {
	
	var doc = bindingMap.browserpage.getContentDocument ();
	
	if ( doc != null ) {
		
		var location = doc.location.toString ();
		
		WebServiceProxy.isFaultHandler = false;
		var response = LocalizationService.GetPageOtherLocales ( location );
		WebServiceProxy.isFaultHandler = true;
		
		if ( !response instanceof SOAPFault ) {
			var list = new List ( response );
			if ( list != null && list.hasEntries ()) {
				var selections = new List ();
				list.each ( function ( lang ) {
					selections.add ( 
						new SelectorBindingSelection (
							lang.Name,
							lang.Url,
							lang.IsCurrent,
							null
						)
					);
				});
				this.populateFromList ( selections );
				this.show ();
			} else {
				this.hide ();
			}
		}
	} else {
		this.hide ();
	}
}

/**
 * Update browser window when selector is handled.
 * @overwrites {Selector#onValueChange}
 */
LanguageSelectorBinding.prototype.onValueChange = function () {
	
	bindingMap.browserpage.setURL ( this.getValue ());
}