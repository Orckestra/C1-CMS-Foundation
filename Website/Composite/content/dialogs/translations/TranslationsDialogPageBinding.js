TranslationsDialogPageBinding.prototype = new DialogPageBinding;
TranslationsDialogPageBinding.prototype.constructor = TranslationsDialogPageBinding;
TranslationsDialogPageBinding.superclass = DialogPageBinding.prototype;


/**
 * @class
 */
function TranslationsDialogPageBinding () {

	/**
	 * @type {SystemLogger}
	 */
	this.logger = SystemLogger.getLogger ( "TranslationsDialogPageBinding" );
	
	/*
	 * Returnable.
	 */
	return this;
}

/**
 * Identifies binding.
 */
TranslationsDialogPageBinding.prototype.toString = function () {

	return "[TranslationsDialogPageBinding]";
}

/**
 * @overloads {DialogPageBindong#onBeforePageInitialize}
 */
TranslationsDialogPageBinding.prototype.onBeforePageInitialize = function () {

	TranslationsDialogPageBinding.superclass.onBeforePageInitialize.call ( this );
	
	var list = new List ();
	Localization.locales.each ( function ( locale ) {
		list.add ( 
			new SelectorBindingSelection ( locale, locale, false, null )
		);
	});
	
	DataManager.getDataBinding ( "sourcelanguage" ).populateFromList ( list );
	DataManager.getDataBinding ( "targetlanguage" ).populateFromList ( list );
}

/**
 * @overloads {DialogPageBindong#onDialogAccept}
 */
TranslationsDialogPageBinding.prototype.onDialogAccept = function () {
	
	var isContinue = true;
	
	var source = DataManager.getDataBinding ( "sourcelanguage" );
	var target = DataManager.getDataBinding ( "targetlanguage" );
	var deck = window.bindingMap.decks.getSelectedDeckBinding ();
	
	if ( deck.getID () == "fieldsdeck" ) {
		if ( target.isDirty ) {
			window.bindingMap.decks.select ( "warningdeck" );
			isContinue = false;
		}
	}
	if ( isContinue == true ) {
		if ( source.isDirty == true ) {
			Localization.setSourceLanguage ( source.getValue ());
		}
		if ( target.isDirty == true ) {
			Localization.setTargetLanguage ( source.getValue ());
		}
		TranslationsDialogPageBinding.superclass.onDialogAccept.call ( this );
	}
}