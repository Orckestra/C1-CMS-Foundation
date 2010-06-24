LocalizationSelectorBinding.prototype = new SelectorBinding;
LocalizationSelectorBinding.prototype.constructor = LocalizationSelectorBinding;
LocalizationSelectorBinding.superclass = SelectorBinding.prototype;

/**
 * @class
 */
function LocalizationSelectorBinding () {
	
	/**
	 * @type {SystemLogger}
	 */
	this.logger = SystemLogger.getLogger ( "LocalizationSelectorBinding" );
	
	/*
	 * Returnable.
	 */
	return this;
}

/**
 * Identifies binding.
 */
LocalizationSelectorBinding.prototype.toString = function () {

	return "[LocalizationSelectorBinding]";
}

/**
 * @overloads {SelectorBinding#onBindingAttach}
 */
LocalizationSelectorBinding.prototype.onBindingAttach = function () {
	
	LocalizationSelectorBinding.superclass.onBindingAttach.call ( this );
	this.subscribe ( BroadcastMessages.UPDATE_LANGUAGES );
	this._populateFromLanguages ( Localization.languages );
}

/**
 * @implements {IBroadcastListener}
 * @param {string} broadcast
 * @param {object} arg
 */
LocalizationSelectorBinding.prototype.handleBroadcast = function ( broadcast, arg ) {
	
	LocalizationSelectorBinding.superclass.handleBroadcast.call ( this, broadcast, arg );
	
	switch ( broadcast ) {
		
		case BroadcastMessages.UPDATE_LANGUAGES :
			this._populateFromLanguages ( arg );
			break;
			
		case BroadcastMessages.SAVE_ALL_DONE :
			this.unsubscribe ( BroadcastMessages.SAVE_ALL_DONE );
			EventBroadcaster.broadcast ( BroadcastMessages.CLOSE_VIEWS );
			this._invokeAction ();
			break;
	}
}

/**
 * Populate selector. If no argument, then hide the selector.
 * @param {List<object>} list A list of objects with the following properties: 
 * Name
 * IsoName
 * UrlMappingName
 * IsCurrent
 * SerializedActionToken         
*/
LocalizationSelectorBinding.prototype._populateFromLanguages = function ( list ) {
	
	if ( list != null && list.hasEntries () && list.getLength () > 1 ) {
		var selections = new List ();
		list.each ( function ( lang ) {
			selections.add ( 
				new SelectorBindingSelection (
					lang.Name,
					lang.SerializedActionToken,
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

/**
 * Backup old value so that we may cancel selector change.
 * @overwrites {SelectorBinding#populateFromList}
 * @param {List<SelectorBindingSelection>} list
 */
LocalizationSelectorBinding.prototype.populateFromList = function ( list ) {
	
	LocalizationSelectorBinding.superclass.populateFromList.call ( this, list );
	this._backupSelectionValue = this._selectionValue;
}

/**
 * @overwrites {SelectorBinding#onValueChange}
 */
LocalizationSelectorBinding.prototype.onValueChange = function () {
	
	var self = this;
	Dialog.warning ( 
		StringBundle.getString ( StringBundle.UI, "UserElementProvider.ChangeOtherActiveLocaleDialogTitle" ), 
		StringBundle.getString ( StringBundle.UI, "UserElementProvider.ChangeOtherActiveLocaleDialogText" ),
		Dialog.BUTTONS_ACCEPT_CANCEL, {
		handleDialogResponse : function ( response ) {
			switch ( response ) {
				case Dialog.RESPONSE_ACCEPT :
					if ( Application.hasDirtyDockTabs ()) {
						self.subscribe ( BroadcastMessages.SAVE_ALL_DONE );
						EventBroadcaster.broadcast ( BroadcastMessages.SAVE_ALL );
					} else {
						EventBroadcaster.broadcast ( BroadcastMessages.CLOSE_VIEWS );
						self._invokeAction ();
					}
					self._backupSelectionValue = self.getValue ();
					break;
				case Dialog.RESPONSE_CANCEL :
					self.selectByValue ( self._backupSelectionValue );
					break;
			}
		}
	})
}

/**
 * Invoke that action!
 */
LocalizationSelectorBinding.prototype._invokeAction = function () {
	
	var token = this.getValue ();
	var root = SystemNode.taggedNodes.get ( "Root" );
	var action = new SystemAction ({
		Label : "Generated Action: Change Locale",
		ActionToken : token
	});
	SystemAction.invoke ( action, root );
}