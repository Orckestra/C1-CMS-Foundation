/**
 * @class
 * This fellow handles localisation of the public
 * website (and not the admininstration module).
 */
function _Localization () {
	
	EventBroadcaster.subscribe ( BroadcastMessages.APPLICATION_LOGIN, this );
	EventBroadcaster.subscribe ( BroadcastMessages.LANGUAGES_UPDATED, this );
	EventBroadcaster.subscribe ( BroadcastMessages.FROMLANGUAGE_UPDATED, this );
	EventBroadcaster.subscribe ( BroadcastMessages.TOLANGUAGE_UPDATED, this );
}

_Localization.prototype = {
	
	/**
	 * Available languages. Each entry in the list has the following properties: 
	 * Name
     * IsoName
     * UrlMappingName
     * IsCurrent
     * SerializedActionToken         
	 * @type {List<object>}
	 */
	languages : null,
		
	/**
	 * The source language.
	 * @type {string}
	 */
	source : null,
	
	/**
	 * The target language.
	 * @type {string}
	 */
	target : null,

	/**
	 * Is RTL UI Direction.
	 * @type {Boolean}
	 */
	isUIRtl: false,

	/**
	 * Is RTL tDirection.
	 * @type {Boolean}
	 */
	isRtl: false,
	
	/**
	 * @implements {IBroadcastListener}
	 * @param {string} broadcast
	 * @param {object} arg
	 */
	handleBroadcast : function ( broadcast, arg ) {
		
		/*
		 * Get list of languages.
		 */
		switch ( broadcast ) {
			case BroadcastMessages.APPLICATION_LOGIN :
			case BroadcastMessages.LANGUAGES_UPDATED:
			case BroadcastMessages.TOLANGUAGE_UPDATED:
				this.isUIRtl = LocalizationService.GetUITextDirection(true) == "rtl";
				this.isRtl = LocalizationService.GetTextDirection(true) == "rtl";
				var languages = LocalizationService.GetActiveLocales ( true );
				if ( languages.length >= 1 ) {
					this.languages = new List ( languages );
				} else {
					this.languages = null;
				}
				EventBroadcaster.broadcast ( BroadcastMessages.UPDATE_LANGUAGES, this.languages );
				break;
		}
		
		/*
		 * Get current languages.
		 */
		switch ( broadcast ) {
			case BroadcastMessages.APPLICATION_LOGIN :
			case BroadcastMessages.FROMLANGUAGE_UPDATED :
				var locales = LocalizationService.GetLocales ( true );
				this.source = locales.ForeignLocaleName;
				this.target = locales.ActiveLocaleName;
				
				/*
				 * Who needs this? Delete?
				 */
				EventBroadcaster.broadcast ( BroadcastMessages.LOCALIZATION_CHANGED, {
					source : locales.ForeignLocaleName,
					target : locales.ActiveLocaleName
				});
				break;
		}
	},

	/**
	 * Return current lang in short format
	 */
	currentLang : function()
	{
		if (this.languages != null) {
			var languages = this.languages.copy();
			while (languages.hasNext()) {
				var lang = languages.getNext();
				if (lang.IsCurrent) {
					return lang.IsoName;
				}
			}
		}
		return null;
	}
}

/**
 * The instance that does it!
 * @type {_Localization}
 */
var Localization = new _Localization ();