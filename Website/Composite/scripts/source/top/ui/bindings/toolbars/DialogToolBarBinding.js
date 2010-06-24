DialogToolBarBinding.prototype = new ToolBarBinding;
DialogToolBarBinding.prototype.constructor = DialogToolBarBinding;
DialogToolBarBinding.superclass = ToolBarBinding.prototype;

/**
 * @class
 * TODO: move this file somewhere else...
 */
function DialogToolBarBinding () {

	/**
	 * @type {SystemLogger}
	 */
	this.logger = SystemLogger.getLogger ( "DialogToolBarBinding" );
	
	/**
	 * @type {List<ClickButtonBinding>}
	 */
	this._buttons = null;
	
	/**
	 * @type {ClickButtonBinding}
	 */
	this._defaultButton = null;
	
	/**
	 * @type {ClickButtonBinding}
	 */
	this._focusedButton = null;
	
	/** 
	 * Listening for ENTER keypress?
	 * @type {boolean}
	 */
	this._isListening = false;
	
	/**
	 * ALLOW focuscrawler! It was blocked by super class.
	 * @overwrites {ToolBarBinding#crawlerFilters}
	 * @type {List<string>}
	 */
	this.crawlerFilters	= new List ([ FlexBoxCrawler.ID ]);
	
	/*
	 * Returnable.
	 */
	return this;
}

/**
 * Identifies binding.
 */
DialogToolBarBinding.prototype.toString = function () {
	
	return "[DialogToolBarBinding]";
}

/**
 * @overloads {ToolBarBinding#onBindingRegister}
 */
DialogToolBarBinding.prototype.onBindingRegister = function () {
	
	DialogToolBarBinding.superclass.onBindingRegister.call ( this );
	
	this.addActionListener ( Binding.ACTION_FOCUSED );
	this.addActionListener ( Binding.ACTION_BLURRED );
}

/**
 * @overloads {ToolBarBinding#onBindingDispose}
 */
DialogToolBarBinding.prototype.onBindingDispose = function () {

	DialogToolBarBinding.superclass.onBindingDispose.call ( this );
	if ( this._isListening == true ) {
		this.unsubscribe ( BroadcastMessages.KEY_ENTER );
	}
}

/**
 * @overloads {ToolBarBinding#onBindingInitialize}
 */
DialogToolBarBinding.prototype.onBindingInitialize = function () {
	
	this.indexDialogButtons ();
	DialogToolBarBinding.superclass.onBindingInitialize.call ( this );
}

/**
 * Index dialog buttons. Invoke this manually when adding new buttons.
 */
DialogToolBarBinding.prototype.indexDialogButtons = function () {

	var buttons = this.getDescendantBindingsByLocalName ( "clickbutton" );
	
	if ( buttons.hasEntries ()) {
		while ( buttons.hasNext ()) {
			var button = buttons.getNext ();
			if ( button.isDefault ) {
				this._defaultButton = button;
				button.attachClassName ( ButtonBinding.CLASSNAME_DEFAULT );
			}
			if ( !this._isListening && button.isFocusable ) {
				this.subscribe ( BroadcastMessages.KEY_ENTER );
				this._isListening = true;
			}
		}
		this._buttons = buttons;
	}
}

/**
 * @implements {IBroadcastListener}
 * @param {string} broadcast
 * @param {object} arg
 */
DialogToolBarBinding.prototype.handleBroadcast = function ( broadcast, arg ) {
	
	DialogToolBarBinding.superclass.handleBroadcast.call ( this, broadcast, arg );
	
	switch ( broadcast ) {
		case BroadcastMessages.KEY_ENTER :
			
			/*
			 * Don't close the dialog while a popup is handled!
			 */
			if ( !PopupBinding.hasActiveInstances ()) {
				
				/*
				 * Only close active dialogs (don't close a chain of dialogs)!
				 */
				var dialog = this.getAncestorBindingByType ( DialogBinding, true );
				if ( dialog && dialog.isActive ) {
					if ( this._focusedButton ) {
						if ( !this._focusedButton.isDisabled ) {
							this.unsubscribe ( BroadcastMessages.KEY_ENTER );
							this._focusedButton.fireCommand ();
						}
					} else {
						if ( !this._defaultButton.isDisabled ) {
							this.unsubscribe ( BroadcastMessages.KEY_ENTER );
							this._defaultButton.fireCommand ();
						}
					}
				}
			}
			break;
	}
}

/**
 * @implements {IActionListener}
 * @overloads {Binding#handleAction}
 * @param {Action} action
 */
DialogToolBarBinding.prototype.handleAction = function ( action ) {
	
	DialogToolBarBinding.superclass.handleAction.call ( this, action );
	
	var binding = action.target;
	var isFocused = false;
	var buttons = this._buttons.reset ();
	
	if ( binding instanceof ClickButtonBinding ) {
		switch ( action.type ) {
			case Binding.ACTION_FOCUSED :
				binding.attachClassName ( ButtonBinding.CLASSNAME_FOCUSED );
				this._focusedButton = binding;
				if ( this._defaultButton ) {
					this._defaultButton.detachClassName ( ButtonBinding.CLASSNAME_DEFAULT );
				}
				break;
			case Binding.ACTION_BLURRED :
				binding.detachClassName ( ButtonBinding.CLASSNAME_FOCUSED );
				break;
		}
	}
	
	/*
	 * When focus leaves the toolbar, restore default focus.
	 */
	if ( this._defaultButton ) {
		while ( !isFocused && buttons.hasNext ()) {
			var button = buttons.getNext ();
			isFocused = button.isFocused;
		}
		if ( !isFocused ) {
			this._defaultButton.attachClassName ( ButtonBinding.CLASSNAME_DEFAULT );
			this._focusedButton = null;
		}
	}
}