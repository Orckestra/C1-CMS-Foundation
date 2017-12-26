SelectorBinding.prototype = new DataBinding;
SelectorBinding.prototype.constructor = SelectorBinding;
SelectorBinding.superclass = DataBinding.prototype;

SelectorBinding.ACTION_SELECTIONCHANGED = "selectorselectionchanged";
SelectorBinding.ACTION_COMMAND = "selectorcommand";
SelectorBinding.CLASSNAME_POPUP = "selectorpopup";

/**
 * @class
 * @implements {IData}
 */
function SelectorBinding () {

	/**
	 * @type {SystemLogger}
	 */
	this.logger = SystemLogger.getLogger ( "SelectorBinding" );

	/**
	 * @type {string}
	 */
	this.type = null;

	/**
	 * @type {ToolBarButtonBinding}
	 */
	this._buttonBinding = null;

	/**
	 * @type {PopupBinding}
	 */
	this._popupBinding = null;

	/**
	 * @type {bool}
	 */
	this._isLocal = false;

	/**
	 * @type {MenuBodyBinding}
	 */
	this._menuBodyBinding = null;

	/**
	 * @type {string}
	 */
	this._selectionValue = null;


	/**
	* @type {string}
	*/
	this._selectionLabel = null;

	/**
	* @type {string}
	*/
	this._searchString = "";

	/**
	* @type {boolean}
	*/
	this.isSearchSelectionEnabled = true;


	/**
	 * @type {List<SelectorBindingSelection>}
	 */
	this.selections = null;

	/**
	 * @type {boolean}
	 */
	this.isDisabled = false;

	/**
	 * This will be used as default label.
	 * @type {string}
	 */
	this.label = null;

	/**
	 * This will be used as default value.
	 * @type {string}
	 */
	this.value = null;

	/**
	 * @type {int}
	 */
	this.width = null;

	/**
	 * @type {SelectorBindingSelection}
	 */
	this.defaultSelection = null;

	/**
	 * @type {string}
	 */
	this.image = null;

	/**
	 * @type {string}
	 */
	this.imageHover = null;

	/**
	 * @type {string}
	 */
	this.imageActive = null;

	/**
	 * @type {string}
	 */
	this.imageDisabled = null;

	/**
	 * @type {boolean}
	 */
	this.isDirty = false;

	/**
	 * Flipped when menitems need to be reindexed.
	 * @type {boolean}
	 */
	this._isUpToDate = false;

	/**
	 * @type {boolean}
	 */
	this._hasKeyboard = false;

	/*
	 * Overwritable button implementation.
	 * @see {EditorSelectorBinding}
	 * @type {class}
	 */
	this.BUTTON_IMPLEMENTATION = ClickButtonBinding;

	/*
	 * Overwritable menuitem implementation.
	 * @see {EditorSelectorBinding}
	 * @type {class}
	 */
	this.MENUITEM_IMPLEMENTATION = MenuItemBinding;

	/**
	 * @type {boolean}
	 */
	this._isImageLayout = true;

	/**
	 * @type {boolean}
	 */
	this.isRequired = false;

	/**
	 * @type {boolean}
	 */
	this._isValid = true;

	/**
	 * Block common crawlers.
	 * @type {Map<string><boolean>}
	 * @overwrites {Binding#crawlerFilters}
	 */
	this.crawlerFilters	= new List ([ DocumentCrawler.ID, FocusCrawler.ID ]);
}

/**
 * Identifies binding.
 */
SelectorBinding.prototype.toString = function () {

	return "[SelectorBinding]";
}

/**
 * @overloads {DataBinding#onBindingAttach}
 */
SelectorBinding.prototype.onBindingAttach = function () {

	SelectorBinding.superclass.onBindingAttach.call(this);

	this.selections = new List();

	this.parseDOMProperties();
	this.buildDOMContent();
	this.addEventListener(DOMEvents.FOCUS);
	this.addEventListener(DOMEvents.KEYPRESS);
	this.addEventListener(DOMEvents.KEYDOWN);
	this.addActionListener(ButtonBinding.ACTION_COMMAND);

	var isDisabled = this.getProperty("isdisabled");
	if (this.isDisabled || isDisabled) {
		this.disable();
	}

}

/**
 * @overloads {DataBinding#onBindingDispose}
 */
SelectorBinding.prototype.onBindingDispose = function () {

	SelectorBinding.superclass.onBindingDispose.call ( this );

	if ( this._popupBinding && Binding.exists ( this._popupBinding )) {
		this._popupBinding.dispose ();
	}
	if ( this._hasKeyboard == true ) {
		this._releaseKeyboard ();
	}
}


/**
 * Parse DOM properties.
 */
SelectorBinding.prototype.parseDOMProperties = function () {

	var type			= this.getProperty ( "type" );
	var label 			= this.getProperty ( "label" );
	var value 			= this.getProperty ( "value" );
	var width 			= this.getProperty ( "width" );
	var onchange		= this.getProperty ( "onchange" );
	var isRequired		= this.getProperty ( "required" ) == true;
	var isLocal = this.getProperty("local");

	if ( !this.type && type ) {
		this.type = type;
	}
	if ( !this.label && label != null ) {
		this.label = label;
	}
	if ( !this.value && value != null ) {
		this.value = value;
	}
	if ( !this.width && width ) {
		this.width = width;
	}
	if ( isRequired ) {
		this.isRequired = true;
	}
	if ( isLocal ) {
		this._isLocal = true;
	}
	if ( onchange ) {
		this.onValueChange = function () {
			Binding.evaluate ( onchange, this );
		};
	}
	this._computeImageProfile ();
}

/*
 * Compute image profile.
 * TODO: Please formalize and explain how selector imageprofile relates to selection imageprofile!
 */
SelectorBinding.prototype._computeImageProfile = function () {

	Binding.imageProfile ( this );
}

/**
 * Build button and popup. Finally populate by selection elements.
 */
SelectorBinding.prototype.buildDOMContent = function () {

	this.buildButton ();
	this.buildPopup ();
	this.buildSelections ();

	this.bindingElement.tabIndex = 0;
	if ( Client.isExplorer === true ) {
		this.bindingElement.hideFocus = true;
	}
}

/**
 * Build form field for serverside processing.
 */
SelectorBinding.prototype.buildFormField = function () {

	var input = DOMUtil.createElementNS ( Constants.NS_XHTML, "input", this.bindingDocument );
	input.name = this.getName ();
	input.value	= this.getValue ();
	input.type = "hidden";

	if ( this.hasCallBackID ()) {
		input.id = this.getCallBackID ();
	}

	this.shadowTree.input = input;
	this.bindingElement.appendChild ( input );
}

/**
 * Build button.
 */
SelectorBinding.prototype.buildButton = function () {

	/*
	 * Subclasses can use a different button around here.
	 */
	var buttonImplementation = this.BUTTON_IMPLEMENTATION;

	var button = this.add (
		buttonImplementation.newInstance ( this.bindingDocument )
	);
	if ( this.imageProfile != null ) {
		button.imageProfile = this.imageProfile;
	}
	if ( this.width != null ) {
		button.setWidth ( this.width );
	}
	this._buttonBinding = button;
	this.shadowTree.button = button; /* don't serialize */
	button.attach ();
}

/**
 * Build selections.
 */
SelectorBinding.prototype.buildPopup = function () {

	/*
	 * Build the popup.
	 */
	var popupSetBinding;
	if (this._isLocal) {
		if (!this.bindingWindow.bindingMap.selectorpopupset) {

			var element = DOMUtil.createElementNS(Constants.NS_UI, "ui:popupset", this.bindingDocument);
			element.id = "selectorpopupset";
			popupSetBinding = UserInterface.registerBinding(element, PopupSetBinding);

			this.bindingDocument.body.appendChild(popupSetBinding.bindingElement);
		} else {
			popupSetBinding = this.bindingWindow.bindingMap.selectorpopupset;
		}
	}
	else {
		popupSetBinding = top.app.bindingMap.selectorpopupset
	};
	var doc = popupSetBinding.bindingDocument;
	var popupBinding = popupSetBinding.add (
		PopupBinding.newInstance ( doc )
	);
	var popupclassname = this.getProperty("popupclass");
	if (popupclassname) {
		popupBinding.setProperty("class", popupclassname);
	}
	var bodyBinding = popupBinding.add (
		MenuBodyBinding.newInstance ( doc )
	);
	this._popupBinding = popupBinding;
	this._menuBodyBinding = bodyBinding;
	this._popupBinding.attachClassName ( SelectorBinding.CLASSNAME_POPUP );
	this._popupBinding.attachRecursive(); // TODO: not yet?

	if (this.getProperty("textonly") === true) {
		this._popupBinding.showTextOnly();
	}

	/*
	 * Unhardcode this when we decide to support submenus in popup.
	 */
	this._popupBinding.type = PopupBinding.TYPE_FIXED;

	/*
	 * Assigninging popup to button.
	 */
	popupBinding.attachClassName ( "selectorpopup" );
	popupBinding.addActionListener ( PopupBinding.ACTION_SHOW, this );
	popupBinding.addActionListener ( MenuItemBinding.ACTION_COMMAND, this );
	popupBinding.addActionListener ( PopupBinding.ACTION_HIDE, this );
	this._buttonBinding.setPopup(popupBinding);

	this._popupBinding.isManaged = true;
}

/**
 * Build selections.
 */
SelectorBinding.prototype.buildSelections = function () {

	/*
	 * Compute default selection.
	 */
	if ( this.defaultSelection == null && ( this.label || this.value )) {
		this.defaultSelection = new SelectorBindingSelection (
			this.label,
			this.value,
			true,
			null // this.imageprofile!
		);
	}

	/*
	 * Retrieve selections from markup.
	 */
	var list = this._getSelectionsList ();

	/*
	 * Even if list is empty, this will
	 * still build the default selection.
	 */
	this.populateFromList ( list );
}

/**
 * Parse ui:selection elements into instances of SelectorBindingSelection.
 * This will be used to populate the selector.
 * @return {List<SelectorBindingSelection>}
 */
SelectorBinding.prototype._getSelectionsList = function () {

	var list = new List ();
	var selections = DOMUtil.getElementsByTagName ( this.bindingElement, "selection" );
	new List ( selections ).each ( function ( selection ) {

		var label 			= selection.getAttribute ( "label" );
		var value 			= selection.getAttribute ( "value" );
		var isSelected 		= selection.getAttribute ( "selected" );
		var image			= selection.getAttribute ( "image" );
		var imageHover		= selection.getAttribute ( "image-hover" );
		var imageActive		= selection.getAttribute ( "image-active" );
		var imageDisabled	= selection.getAttribute ( "image-disabled" );

		var imageProfile = null;

		if ( image || imageHover || imageActive || imageDisabled ) {
			imageProfile = new ImageProfile ({
				image : image,
				imageHover : imageHover,
				imageActive : imageActive,
				imageDisabled : imageDisabled
			});
		}

		list.add (
			new SelectorBindingSelection (
				label ? label : null,
				value ? value : null,
				isSelected && isSelected == "true",
				imageProfile
			)
		);
	});

	return list;
}

/**
 * @param {List<SelectorBindingSelection>} list
 */
SelectorBinding.prototype.populateFromList = function ( list ) {

	if ( this.isAttached ) {

		/*
		 * Clear existing content, leaving only the default selection.
		 */
		this.clear ();

		/*
		 * Add new content.
		 */
		if ( list.hasEntries ()) {
			var firstItem = null;
			while ( list.hasNext ()) {
				var selection = list.getNext ();
				var item = this.addSelection(selection);
				if (selection.isSelected) {
					this.select(item, true);
				}
				if ( !firstItem ) {
					firstItem = item;
				}
			}
			if ( !this._selectedItemBinding ) {
				this.select ( firstItem, true );
			}
		} else {

		}
	} else {

		throw "Could not populate unattached selector"; // TODO: Cache the list and wait?
	}
}

/**
 * Add selection, returning the created MenuItemBinding.
 * @param {SelectorBindingSelection} selection
 * @param {boolean} isPositionFirst
 * @return {MenuItemBinding}
 */
SelectorBinding.prototype.addSelection = function ( selection, isPositionFirst ) {

	var menuItemImplementation = this.MENUITEM_IMPLEMENTATION;

	var bodyBinding = this._menuBodyBinding;
	var bodyDocument = bodyBinding.bindingDocument;

	var itemBinding = menuItemImplementation.newInstance ( bodyDocument );
	itemBinding.imageProfile = selection.imageProfile;
	itemBinding.setLabel ( selection.label );
	if ( selection.tooltip != null ) {
		itemBinding.setToolTip ( selection.tooltip )
	}
	itemBinding.selectionValue = selection.value;

	selection.menuItemBinding = itemBinding;
	if ( isPositionFirst ) {
		bodyBinding.addFirst ( itemBinding );
		this.selections.addFirst ( selection );
	} else {
		bodyBinding.add ( itemBinding );
		this.selections.add ( selection );
	}

	this._isUpToDate = false;
	return itemBinding;
}

/**
 * Add selection first.
 * @param {SelectorBindingSelection} selection
 * @return {MenuItemBinding}
 */
SelectorBinding.prototype.addSelectionFirst = function ( selection ) {

	return this.addSelection ( selection, true );
}
/**
 * Dispose existing content. Leave default selection.
 * @param {boolean} isClearAll
 */
SelectorBinding.prototype.clear = function ( isClearAll ) {

	this._selectedItemBinding = null;

	if ( this._popupBinding ) {

		this._popupBinding.clear ();
		this.selections.clear ();

		/*
		 * If not clear all, add default selection.
		 * Checking that multiple calls to clear
		 * will not add multiple default selections.
		 */
		if ( !isClearAll && this.defaultSelection != null ) {
			var menuItemBinding = this.addSelection (
				this.defaultSelection
			);
			this.select ( menuItemBinding, true );
		}
	}
}

/**
 * Clear all.
 */
SelectorBinding.prototype.clearAll = function () {

	this.clear ( true );
}

/**
 * Disable.
 */
SelectorBinding.prototype.disable = function () {

	this.setDisabled ( true );
}

/**
 * Enable.
 */
SelectorBinding.prototype.enable = function () {

	this.setDisabled ( false );
}

/**
 * Focus.
 * @implements {IData}
 */
SelectorBinding.prototype.focus = function () {

	if ( !this.isFocused ) {
		DataBinding.prototype.focus.call ( this );
		if ( this.isFocused == true ) {
			FocusBinding.focusElement ( this.bindingElement );
			this._grabKeyboard ();
		}
	}
}

/**
 * Blur.
 * @implements {IData}
 */
SelectorBinding.prototype.blur = function () {

	if ( this.isFocused == true ) {
		DataBinding.prototype.blur.call ( this );
		this._releaseKeyboard ();
		if ( this._popupBinding.isVisible ) {
			this._popupBinding.hide ();
		}
	}
}

/**
 * Grab keyboard.
 */
SelectorBinding.prototype._grabKeyboard = function () {

	if ( !this._hasKeyboard ) {
		this.subscribe ( BroadcastMessages.KEY_ARROW );
		this._hasKeyboard = true;
	}
}

/**
 * Release keyboard.
 */
SelectorBinding.prototype._releaseKeyboard = function () {

	if ( this._hasKeyboard == true ) {
		this.unsubscribe ( BroadcastMessages.KEY_ARROW );
		this._hasKeyboard = false;
	}
}

/**
 * Set disabled status.
 * @param {boolean} isDisabled
 */
SelectorBinding.prototype.setDisabled = function ( isDisabled ) {

	if ( this.isAttached == true ) {
		var button = this._buttonBinding;
		button.setDisabled ( isDisabled );
	}
	if ( isDisabled ) {
		this.setProperty ( "isdisabled", true );
	} else {
		this.deleteProperty ( "isdisabled" );
	}
}

/**
 * Reset.
 * @param {boolean} isActionBlocked
 */
SelectorBinding.prototype.reset = function ( isActionBlocked ) {

	if ( this.defaultSelection != null ) {
		this.selectByValue (
			this.defaultSelection.value,
			isActionBlocked
		);
	}
}

/**
 * @implements {IActionListener}
 * @overloads {Binding#handleAction}
 * @param {Action} action
 */
SelectorBinding.prototype.handleAction = function (action) {

	SelectorBinding.superclass.handleAction.call(this, action);

	switch (action.type) {

		case ButtonBinding.ACTION_COMMAND:
			this._onButtonCommand();
			action.consume();
			break;
		case PopupBinding.ACTION_SHOW:
			this._onPopupShowing();
			action.consume();
			break;
		case MenuItemBinding.ACTION_COMMAND:
			this._onMenuItemCommand(action.target);
			action.consume();
			break;
		case PopupBinding.ACTION_HIDE:
			/*
			* If TAB key was pressed, closing the popup, we no
			* longer have focus and should not grab the keyboard.
			*/
			var self = this;
			setTimeout(function () {
				if (self.isFocused) {
					self._grabKeyboard();
				}
			}, 0);
			if(this._clearSearchSelection) this._clearSearchSelection();
			action.consume();
			break;
	}
}

/**
 * On button command.
 */
SelectorBinding.prototype._onButtonCommand = function () {

	this.focus();
	this._attachSelections();
	this._restoreSelection ();
	this.dispatchAction ( SelectorBinding.ACTION_COMMAND );
}

/**
 * On popup showing.
 */
SelectorBinding.prototype._onPopupShowing = function () {

	this._fitMenuToSelector();
	this._releaseKeyboard();
}

/**
 * On menuitem command.
 * @param {MenuItemBinding} binding
 */
SelectorBinding.prototype._onMenuItemCommand = function ( binding ) {

	this.select ( binding );
	FocusBinding.focusElement ( this.bindingElement );
	this._grabKeyboard ();
}

/**
 * Restore selection.
 */
SelectorBinding.prototype._restoreSelection = function () {

	if ( this._selectedItemBinding ) {
		this._selectedItemBinding.focus ();
	}
}

/**
 * For cosmetic reasons, attempting to make
 * the opening menu as wide as the selector.
 */
SelectorBinding.prototype._fitMenuToSelector = function () {

	var selectorWidth = this._buttonBinding.bindingElement.offsetWidth + "px";
	var popupElement = this._popupBinding.bindingElement;

	popupElement.style.minWidth = selectorWidth;
}

/**
 *
 * @param {Event} e
 */
SelectorBinding.prototype.handleEvent = function (e) {

	SelectorBinding.superclass.handleEvent.call(this, e);

	switch (e.type) {
		case DOMEvents.FOCUS:
			this.focus();
			break;
		case DOMEvents.KEYDOWN:
			var charCode = Client.isExplorer ? e.keyCode : e.which;
			if (charCode == 8) {
				this._popSearchSelection();
			}
			break;
		case DOMEvents.KEYPRESS:
			var charCode = Client.isExplorer ? e.keyCode : e.which;
			if (charCode >= 32) {
				this._buttonBinding.check();
				var letter = String.fromCharCode(charCode);
				this._pushSearchSelection(letter);
			}
			break;

	}
}

/**
  * @param {char} letter
 */
SelectorBinding.prototype._pushSearchSelection = function (letter) {

	this._searchString += letter.toLowerCase();
	this._applySearchSelection();
}

/**
* @param {char} letter
*/
SelectorBinding.prototype._popSearchSelection = function (letter) {

	this._searchString = this._searchString.substring(0, this._searchString.length - 1);
	this._applySearchSelection();
}

/**
* Clear search string
*/
SelectorBinding.prototype._clearSearchSelection = function () {
	if (this._searchString != null && this._searchString != "") {
		this._searchString = "";
		this._applySearchSelection();
	}
}

/**
* Filter selection list by filteringString
*/
SelectorBinding.prototype._applySearchSelection = function () {

	if (this.isSearchSelectionEnabled) {

		var bodyBinding = this._menuBodyBinding;
		if (bodyBinding != null) {

			var menuItemImplementation = this.MENUITEM_IMPLEMENTATION;
			var bodyDocument = bodyBinding.bindingDocument;



			var list = this._getSelectionsList();

			if (this._searchString != null && this._searchString != "") {

				this._popupBinding.clear();

				this._buttonBinding.setLabel(this._searchString);

				if (list.hasEntries()) {
					while (list.hasNext()) {
						var selection = list.getNext();
						if (selection.label.toLowerCase().indexOf(this._searchString) > -1)
							this.addSelection(selection);
					}
				}

				this._attachSelections();

				// Hightlight search text
				var pattern = new RegExp(this._searchString.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&"), "gi");
				var menuitems = bodyBinding.getDescendantBindingsByType(menuItemImplementation);
				if (menuitems.hasEntries()) {

					while (menuitems.hasNext()) {
						var menuitem = menuitems.getNext();
						var labelBinding = menuitem.labelBinding;
						if (labelBinding != null && labelBinding.shadowTree != null && labelBinding.shadowTree.labelText != null) {
							labelBinding.shadowTree.labelText.innerHTML = labelBinding.shadowTree.labelText.innerHTML.replace(pattern, "<b>$&</b>");
						}
					}
					menuitems.getFirst().focus();

					this.attachClassName(DataBinding.CLASSNAME_INFOBOX);
					this.detachClassName(DataBinding.CLASSNAME_INVALID);

				}
				else {

					labelBinding = LabelBinding.newInstance(bodyDocument);
					labelBinding.setLabel(StringBundle.getString("ui", "AspNetUiControl.Selector.NoMatchesFor").replace("{0}", this._searchString));
					bodyBinding.add(labelBinding);
					this._attachSelections();

					this.detachClassName(DataBinding.CLASSNAME_INFOBOX);
					this.attachClassName(DataBinding.CLASSNAME_INVALID);

				}
			}
			else {

				this._popupBinding.clear();

				this._buttonBinding.setLabel(this._selectionLabel);

				if (list.hasEntries()) {
					while (list.hasNext()) {
						var selection = list.getNext();
						var item = this.addSelection(selection);
						if (this._selectionValue == selection.value) {
							this._selectedItemBinding = item;
						}

					}
				}
				this._attachSelections();
				this._restoreSelection();

				this.detachClassName(DataBinding.CLASSNAME_INFOBOX);
				this.detachClassName(DataBinding.CLASSNAME_INVALID);

			}

			if (this._bodyBinding instanceof MenuBodyBinding) {
				this._bodyBinding.refreshMenuGroups();
			}

			/**
			* Enable keyboard navigation.
			*/
			this._popupBinding._enableTab(true);

			this._popupBinding.snapTo(this._buttonBinding.bindingElement);
			this._popupBinding.fitOnScreen();
		}
	}
}

/**
 * @implements {IBroadcastListener}
 * @param {string} broadcast
 * @param {object} arg
 */
SelectorBinding.prototype.handleBroadcast = function ( broadcast, arg ) {

	SelectorBinding.superclass.handleBroadcast.call ( this, broadcast, arg );

	switch ( broadcast ) {
		case BroadcastMessages.KEY_ARROW :
			this.logger.debug ( this._buttonBinding.getLabel ());
			this._handleArrowKey ( arg );
			break;
	}
}

/**
 * Keyboard navigation stuff.
 * @param {int} key
 */
SelectorBinding.prototype._handleArrowKey = function ( key ) {

	if ( !this._popupBinding.isVisible ) {
		switch ( key ) {
			case KeyEventCodes.VK_DOWN :
			case KeyEventCodes.VK_UP :
				this._buttonBinding.check ();
				break;
		}
	}
}

/**
 * Select by MenuItemBinding.
 * @param {MenuItemBinding} itemBinding
 * @param {boolean} isActionBlocked True while initializing to block action.
 * @return {boolean} True if something (new) was selected
 */
SelectorBinding.prototype.select = function ( itemBinding, isActionBlocked ) {

	var isSuccess = false;

	if ( itemBinding != this._selectedItemBinding ) {

		this._selectedItemBinding = itemBinding;
		isSuccess = true;

		var button = this._buttonBinding;
		this._selectionValue = itemBinding.selectionValue;
		this._selectionLabel = itemBinding.getLabel();
		button.setLabel ( itemBinding.getLabel ());

		if ( itemBinding.imageProfile != null ) {
			button.imageProfile = itemBinding.imageProfile;
		}
		if ( button.imageProfile != null ) {
			button.setImage (
				this.isDisabled == true ?
					button.imageProfile.getDisabledImage () :
					button.imageProfile.getDefaultImage ()
			);
		}

		this._updateImageLayout ();

		if ( !isActionBlocked ) {
			this.onValueChange ();
			this.dispatchAction (
				SelectorBinding.ACTION_SELECTIONCHANGED
			);

			/*
			 * TODO: Enable this when dialogs and wizards go AJAX!
			 *
			if ( this.getProperty ( "callbackid" ) != null ) {
				var self = this;
				setTimeout ( function () { // allow selector to close...
					self.dispatchAction ( PageBinding.ACTION_DOPOSTBACK );
				}, 0 );
			}
			*/

			this.dirty ();
		}
		if ( !this._isValid || ( this.isRequired && !isActionBlocked )) {
			this.validate ();
		}
	}

	return isSuccess;
}

/**
 * Hide or show related binding.
 */
SelectorBinding.prototype._relate = function () {

	var relate = this.getProperty ( "relate" );

	if ( relate ) {
		var element = this.bindingDocument.getElementById ( relate );
		if ( element ) {
			var binding = UserInterface.getBinding ( element );
			if ( binding ) {
				if ( this.isChecked ) {
					binding.show ();
				} else {
					binding.hide ();
				}
			}
		}
	}
}

/**
 * Update image layput.
 */
SelectorBinding.prototype._updateImageLayout = function () {

	if ( this._buttonBinding.getImage () == null ) {
		if ( this._isImageLayout == true ) {
			this._buttonBinding.attachClassName ( ToolBarBinding.CLASSNAME_TEXTONLY );
			this._isImageLayout = false;
		}
	} else {
		if ( !this._isImageLayout ) {
			this._buttonBinding.detachClassName ( ToolBarBinding.CLASSNAME_TEXTONLY );
			this._isImageLayout = true;
		}
	}
}

/**
 * Fires when selection changes. Does nothing by default. Feel free
 * to overwrite. And maybe refactor this methods name some day...
 */
SelectorBinding.prototype.onValueChange = function () {}

/**
 * This will select the *first* selection with a given value.
 * @param {object} value
 * @param {boolean} isActionBlocked
 * @return {boolean} True if something (new) was selected
 */
SelectorBinding.prototype.selectByValue = function ( value, isActionBlocked ) {

	var isSuccess = false;
	var bodyBinding = this._menuBodyBinding;

	/*
	 * Remember that bindings may not have been attached.
	 */
	var itemElementList = bodyBinding.getDescendantElementsByLocalName ( "menuitem" );
	while ( itemElementList.hasNext ()) {
		var itemBinding = UserInterface.getBinding (
			itemElementList.getNext ()
		);
		if ( itemBinding.selectionValue == value ) {
			isSuccess = this.select ( itemBinding, isActionBlocked );
			break;
		}
	}

	return isSuccess;
}

/**
 * Remember that the value is hidden around here. The button label is not the value!
 * @return {string}
 */
SelectorBinding.prototype.getValue = function () {

	var result = this._selectionValue;
	if ( result != null ) {
		result = String ( result );
	}
	return result;
}

/**
 * Set value. This will change the selectbox selection.
 * @implements {IData}
 * @param {object} value
 */
SelectorBinding.prototype.setValue = function ( value ) {

	this.selectByValue ( String ( value ), true );
}


/**
 * Get result. Unlike getValue, the result may be any object (though only numbers for now).
 * @implements {IData}
 * @return {object}
 */
SelectorBinding.prototype.getResult = function () {

	var result = this._selectionValue;

	if ( result == "null" ) { // javascript apocalypse!
		result = null;
	}
	if ( result ) {
		switch ( this.type ) {
			case DataBinding.TYPE_NUMBER :
			case DataBinding.TYPE_INTEGER :
				result = Number ( result );
				break;
		}
	}
	return result;
}

/**
 * Set result. This will change the selectbox selection.
 * @implements {IData}
 * @param {object} result
 */
SelectorBinding.prototype.setResult = function ( result ) {

	this.selectByValue ( result, true );
}

/**
 * Validate.
 * @implements {IData}
 * @return {boolean}
 */
SelectorBinding.prototype.validate = function () {

	var isValid = true;
	if ( this.isRequired == true && this.defaultSelection != null ) {
		var value = this.getValue ();
		if ( value == this.defaultSelection.value ) {
			isValid = false;
		}
		if ( isValid != this._isValid ) {
			if ( isValid ) {
				this.dispatchAction ( Binding.ACTION_VALID );
				this.detachClassName ( DataBinding.CLASSNAME_INVALID );
			} else {
				this.dispatchAction ( Binding.ACTION_INVALID );
				this.attachClassName ( DataBinding.CLASSNAME_INVALID );
				this._buttonBinding.setLabel ( DataBinding.warnings [ "required" ]);
			}
		}
		this._isValid = isValid;
	}
	return isValid;
}

/**
 * Manifest. If no value, remove element from post result.
 * @implements {IData}
 */
SelectorBinding.prototype.manifest = function () {

	if ( this.isAttached == true ) {
		if ( this.getResult ()) {
			if ( !this.shadowTree.input ) {
				this.buildFormField ();
			}
			this.shadowTree.input.value = this.getValue ();
		} else if ( this.shadowTree.input ) {
			this.shadowTree.input.parentNode.removeChild ( this.shadowTree.input );
			this.shadowTree.input = null;
		}
	}
}

/**
 * Build selections. For faster page load time, the popup bindings
 * get attached only when user handles the selector button or presses
 * the enter key.
 */
SelectorBinding.prototype._attachSelections = function () {

	var popup = this._popupBinding;
	if ( !this._isUpToDate ) {
		popup.attachRecursive ();
		this._isUpToDate = true;
	}
}

/**
 * Always update selector!
 * TODO: Not a good idea, since this control is pretty render-heavy...
 * @overwrites {Binding#handleElement}
 * @implements {IUpdateHandler}
 * @param {Element} element
 * @returns {boolean} Return true to trigger method handleElement.
 */
SelectorBinding.prototype.handleElement = function () {

	return true;
}

/**
 * Always update selector!
 * TODO: Check for changes by comparing curent CLIENTSIDE value (selection) with server response!!!
 * TODO: See Bug 3115.
 * @implements {IUpdateHandler}
 * @overwrites {Binding#updateElement}
 * @param {Element} element
 * @param {Element} oldelement
 * @returns {boolean} Return true to stop crawling.
 */
SelectorBinding.prototype.updateElement = function ( element, oldelement ) {

	/*
	 * ALWAYS update selector (full replace)
	 */
	this.bindingWindow.UpdateManager.addUpdate (
		new this.bindingWindow.ReplaceUpdate ( this.getID (), element )
	);
	return true;
}

/**
 * SelectorBinding factory.
 * @param {DOMDocument} ownerDocument
 * @return {SelectorBinding}
 */
SelectorBinding.newInstance = function ( ownerDocument ) {

	var element = DOMUtil.createElementNS ( Constants.NS_UI, "ui:selector", ownerDocument );
	return UserInterface.registerBinding ( element, SelectorBinding );
}