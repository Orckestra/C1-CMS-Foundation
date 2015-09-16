LocalizationSelectorBinding.prototype = new MenuBinding;
LocalizationSelectorBinding.prototype.constructor = LocalizationSelectorBinding;
LocalizationSelectorBinding.superclass = MenuBinding.prototype;

/**
 * @class
 */
function LocalizationSelectorBinding () {
	
	/**
	 * @type {SystemLogger}
	 */
	this.logger = SystemLogger.getLogger("LocalizationSelectorBinding");

	/**
	 * @type {EntityToken}
	 */
	this._token = null;
	
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
	this.subscribe ( BroadcastMessages.TOLANGUAGE_UPDATED );
	this._populateFromLanguages(Localization.languages);


	this.addActionListener(MenuItemBinding.ACTION_COMMAND);
}

/**
 * @implements {IBroadcastListener}
 * @param {string} broadcast
 * @param {object} arg
 */
LocalizationSelectorBinding.prototype.handleBroadcast = function ( broadcast, arg ) {
	
	LocalizationSelectorBinding.superclass.handleBroadcast.call ( this, broadcast, arg );
	
	switch ( broadcast ) {
		
		case BroadcastMessages.TOLANGUAGE_UPDATED:
			ExplorerBinding.restoreFocuseNodes();
			break;
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
 * @implements {IActionListener}
 * @overloads {Binding#handleAction}
 * @param {Action} action
 */
LocalizationSelectorBinding.prototype.handleAction = function (action) {

	LocalizationSelectorBinding.superclass.handleAction.call(this, action);

	switch (action.type) {
		case MenuItemBinding.ACTION_COMMAND:
			this.onValueChange(action.target.selectionValue);
			//action.consume();
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
		//this.show ();
		this.bindingElement.style.display = "block";
	} else {
		//this.hide ();
		this.bindingElement.style.display = "none";
	}
}

/**
 * Backup old value so that we may cancel selector change.
 * @overwrites {SelectorBinding#populateFromList}
 * @param {List<SelectorBindingSelection>} list
 */
LocalizationSelectorBinding.prototype.populateFromList = function ( list ) {
	
	if (this.isAttached) {

		/*
		 * Clear existing content, leaving only the default selection.
		 */
		//this.clear();

		var self = this;
		var menugroup = this.getDescendantBindingByLocalName("menugroup");
		
		menugroup.detachRecursive();
		menugroup.bindingElement.innerHTML = "";

		/*
		 * Add new content.
		 */
		if (list.hasEntries()) {
			while (list.hasNext()) {
				var selection = list.getNext();
				if (selection.isSelected) {
					this.setLabel(selection.label);
				}
				var itemBinding = MenuItemBinding.newInstance(this.bindingDocument);
				itemBinding.imageProfile = selection.imageProfile;
				itemBinding.setLabel(selection.label);
				if (selection.tooltip != null) {
					itemBinding.setToolTip(selection.tooltip);
				}
				itemBinding.selectionValue = selection.value;

				menugroup.add(itemBinding);
				itemBinding.attach();

			}
		} else {

		}
	} else {

		throw "Could not populate unattached selector"; // TODO: Cache the list and wait?
	}
}

/**
 * @overwrites {SelectorBinding#onValueChange}
 */
LocalizationSelectorBinding.prototype.onValueChange = function (token) {
	ExplorerBinding.saveFocusedNodes();
	var self = this;
	Dialog.warning ( 
		StringBundle.getString ( StringBundle.UI, "UserElementProvider.ChangeOtherActiveLocaleDialogTitle" ), 
		StringBundle.getString ( StringBundle.UI, "UserElementProvider.ChangeOtherActiveLocaleDialogText" ),
		Dialog.BUTTONS_ACCEPT_CANCEL, {
		handleDialogResponse : function ( response ) {
			switch ( response ) {
				case Dialog.RESPONSE_ACCEPT:
					self._token = token;
					if ( Application.hasDirtyDockTabs ()) {
						self.subscribe ( BroadcastMessages.SAVE_ALL_DONE );
						EventBroadcaster.broadcast ( BroadcastMessages.SAVE_ALL );
					} else {
						EventBroadcaster.broadcast ( BroadcastMessages.CLOSE_VIEWS );
						self._invokeAction ();
					}
					break;
				case Dialog.RESPONSE_CANCEL :
					break;
			}
		}
	})
}

/**
 * Invoke that action!
 */
LocalizationSelectorBinding.prototype._invokeAction = function () {
	
	var root = SystemNode.taggedNodes.get ( "Root" );
	var action = new SystemAction ({
		Label : "Generated Action: Change Locale",
		ActionToken : this._token
	});
	
	SystemAction.invoke ( action, root );
}