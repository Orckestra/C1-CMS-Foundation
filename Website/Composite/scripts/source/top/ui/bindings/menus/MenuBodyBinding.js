MenuBodyBinding.prototype = new Binding;
MenuBodyBinding.prototype.constructor = MenuBodyBinding;
MenuBodyBinding.superclass = Binding.prototype;

MenuBodyBinding.CLASSNAME_CHECKBOXED = "checkboxed";

/*
 * In case an arrowkeypress could not be handled responsibly, 
 * we can dispatch this and hope that an ancestor binding can.
 */
MenuBodyBinding.ACTION_UNHANDLED_LEFTRIGHTKEY = "menubody unhandled arrowkey";

/**
 * Points to the currently active MenuBodyBinding instance. 
 * Remember to reset this when the menupopup is closed.
 * @type {MenuBodyBinding}
 */
MenuBodyBinding.activeInstance = null;

/**
 * Relay arrowkeypress to the currently active instance.
 * @implements {IBroadcastListener}
 * @param {string} broadcast
 * @param {object} arg
 */
MenuBodyBinding.handleBroadcast = function ( broadcast, arg ) {
	
	var body = MenuBodyBinding.activeInstance;
	var key = arg;
	
	if ( body ) {
		switch ( broadcast ) {
			case BroadcastMessages.KEY_ARROW :
				body.handleArrowKey ( key );
				break;
			case BroadcastMessages.KEY_ENTER :
				body.handleEnterKey ();
				break;
		}
	}
}

/*
 * To avoid filing and unregistering an excessive amount of 
 * EventBroadcaster subscriptions whenever a menu is opened 
 * and closed, all keybaord menu handling is handled thusly.
 */
EventBroadcaster.subscribe ( BroadcastMessages.KEY_ARROW, MenuBodyBinding );
EventBroadcaster.subscribe ( BroadcastMessages.KEY_ENTER, MenuBodyBinding );
EventBroadcaster.subscribe ( BroadcastMessages.KEY_ESCAPE, MenuBodyBinding );

/**
 * @class
 */
function MenuBodyBinding () {

	/**
	 * @type {SystemLogger}
	 */
	this.logger = SystemLogger.getLogger ( "MenuBodyBinding" );
	
	/**
	 * @type {PopupBinding}
	 */
	this._containingPopupBinding = null;
	
	/**
	 * @type {HashMap<string><MenuItemBinding>}
	 */
	this._focused = null;
	
	/**
	 * @type {MenuItemBinding}
	 */
	this._lastFocused = null;
	
	/**
	 * @type {function}
	 */
	this._showSubMenuTimeout = null;
	
	/**
	 * @type {int}
	 */
	this.arrowKey = null;
	
	/*
	 * If set to true, menuitems will be indexed anew.
	 * Use when menuitems are dynamically added or removed.
	 * @see {MenuItemBinding#onBindingAttach}
	 * @type {boolean}
	 */
	this.isDirty = true;
	
	/**
	 * @type {boolean}
	 */
	this._hasImageLayout = false;
	
	/**
	 * @type {boolean}
	 */
	this._hasCheckBoxLayout = false;
}

/**
 * Identifies binding.
 */
MenuBodyBinding.prototype.toString = function () {

	return "[MenuBodyBinding]";
}

/**
 * @overloads {Binding#onBindingAttach}
 */
MenuBodyBinding.prototype.onBindingAttach = function () {

	MenuBodyBinding.superclass.onBindingAttach.call ( this );
	
	/** 
	 * Show no images (until an image shows up).
	 *
	this.attachClassName ( ToolBarBinding.CLASSNAME_TEXTONLY );
	*/
	
	/*
	 * Initialize focused registry.
	 */
	this._focused = {};
	
	this.addEventListener ( DOMEvents.MOUSEDOWN );
	this.addEventListener ( DOMEvents.MOUSEOVER );
	this.addEventListener ( DOMEvents.MOUSEOUT );
	this.addEventListener ( DOMEvents.MOUSEUP );
	this.addEventListener ( DOMEvents.KEYDOWN );
	this.addEventListener ( DOMEvents.TOUCHSTART );
	
	/*
	 * Grab keyboard when left-right arrow key was 
	 * pressed in descendant menubody with no effect.
	 */
	var self = this;
	this.addActionListener ( MenuBodyBinding.ACTION_UNHANDLED_LEFTRIGHTKEY, {
		handleAction : function ( action ) {
			switch ( action.target ) {
				case self :
					self.releaseKeyboard ();
					self._containingPopupBinding.hide ();
					break;
				default :
					var mouseevent = null;
					var isPreventFocus = true;
					self._lastFocused.focus ();
					self.grabKeyboard ();
					action.consume ();
					break;
			}
		}
	});
	
	/*
	 * Reset focus and release keyboard when popup is closed.
	 */
	this._containingPopupBinding = UserInterface.getBinding ( 
		this.bindingElement.parentNode
	);
	this._containingPopupBinding.addActionListener ( 
		PopupBinding.ACTION_HIDE, {
			handleAction : function () {
				self.resetFocusedItems ( true );
				self.releaseKeyboard ();
			}
		}
	)
}

/**
 * @overloads {Binding#onBindingDispose}
 */
MenuBodyBinding.prototype.onBindingDispose = function () {

	MenuBodyBinding.superclass.onBindingDispose.call ( this );
	if ( MenuBodyBinding.activeInstance == this ) {
		MenuBodyBinding.activeInstance = null;
	}
}

/**
 * When keyboardgrab is assigned, consuming the mouseover event 
 * will make sure that container binding doesn't grab our keyboard. 
 * The other mouseevents get consumed simply because we can.
 * @implements {IEventListener}
 * @overloads {Binding#handleEvent}
 * @param {MouseEvent} e
 */
MenuBodyBinding.prototype.handleEvent = function ( e ) {
	
	MenuBodyBinding.superclass.handleEvent.call ( this, e );
	
	if ( e.type == DOMEvents.MOUSEOUT ) {
		this.resetFocusedItems ();
	}
	switch ( e.type ) {
		case DOMEvents.MOUSEDOWN :
		case DOMEvents.MOUSEOVER :
		case DOMEvents.MOUSEOUT :
		case DOMEvents.MOUSEUP:
		case DOMEvents.TOUCHSTART:
			DOMEvents.stopPropagation ( e );
			break;
		case DOMEvents.KEYDOWN:
			switch (e.keyCode) {
				case KeyEventCodes.VK_DOWN:
				case KeyEventCodes.VK_UP:
				case KeyEventCodes.VK_LEFT:
				case KeyEventCodes.VK_RIGHT:
					DOMEvents.stopPropagation(e);
					DOMEvents.preventDefault(e);
					this.handleArrowKey(e.keyCode);
					break;
			}
			break;
	}
}

/** 
 * Handle focused item. This would normally be done with 
 * dispatching and catching Actions, but we consider 
 * superfast screen update to be of maximum importance. 
 * @see {MenuItemBinding#focus}
 * @param {MenuItemBinding} binding
 */
MenuBodyBinding.prototype.handleFocusedItem = function ( binding ) {
	
	for ( var key in this._focused ) {
		if ( key != binding.key ) {
			var item = this._focused [ key ];
			item.blur ();
		}
	}
	this._focused [ binding.key ] = binding;
	this._lastFocused = binding;

	/*
	 * Grab that keyboard.
	 */
	if ( MenuBodyBinding.activeInstance != this ) {
		this.grabKeyboard ();
	}
} 

/** 
 * Handle blurred item.
 * @see {MenuItemBinding#blur}
 * @param {MenuItemBinding} binding
 */
MenuBodyBinding.prototype.handleBlurredItem = function ( binding ) {
	
	delete this._focused [ binding.key ];
}

/**
 * Reset focused items.
 * @param {boolean} isTotalReset
 */
MenuBodyBinding.prototype.resetFocusedItems = function ( isTotalReset ) {
	
	for ( var key in this._focused ) {
		var item = this._focused [ key ];
		item.blur ( isTotalReset );
	}
	if ( isTotalReset ) {
		this._lastFocused = null;
	}
}

/** 
 * Refresh the visual appearance of MenuGroupBindings, hiding the separators on 
 * first and last menugroup. This because Explorer won't reckognize first-child 
 * and last-child CSS pseudoselectors in quirksmode.
 */
MenuBodyBinding.prototype.refreshMenuGroups = function () {
	
	if ( !this.isAttached ) { 
	
		throw "refreshMenuGroups: MenuBodyBinding not attached!";
		
	} else {
		
		var groups = this.getChildBindingsByLocalName ( "menugroup" );
		var firstGroup = null;
		var lastGroup = null;
	
		while ( groups.hasNext ()) {
			var group = groups.getNext ();
			if ( !group.isDefaultContent ) {
				group.setLayout ( MenuGroupBinding.LAYOUT_DEFAULT );
				if ( !firstGroup && group.isVisible ) {
					firstGroup = group;
				}
				if ( group.isVisible ) {
					lastGroup = group;
				}
			}
		};
		if ( firstGroup && lastGroup ) {
			firstGroup.setLayout ( MenuGroupBinding.LAYOUT_FIRST );
			lastGroup.setLayout ( MenuGroupBinding.LAYOUT_LAST );
		}
	}
}

/**
 * Grab keyboard control. This method is invoked often, so be careful when editing.
 * @param {boolean} isDefaultAction
 */
MenuBodyBinding.prototype.grabKeyboard = function ( isDefaultAction ) {
	
	MenuBodyBinding.activeInstance = this;
	
	if ( isDefaultAction ) {
		var first = this._getMenuItems ().getFirst ();
		if ( first ) {
			first.focus ();
		}
	}
}

/**
 * Release keyboard control.  This method is invoked 
 * by the containing {@link PopupBinding}.
 */
MenuBodyBinding.prototype.releaseKeyboard = function () {
	
	if ( MenuBodyBinding.activeInstance == this ) {
		MenuBodyBinding.activeInstance = null;	
	}
}

/**
 * Handle enter key pressed. This will fire the command 
 * associated to any focused MenuItemBinding.
 */
MenuBodyBinding.prototype.handleEnterKey = function () {

	var focused = this._lastFocused;

	if (( focused != null ) && (!focused.isMenuContainer )) {
	
		focused.fireCommand ();
		
		/*
		 * Technically not a mouse event, but  
		 * we do wan't to close all open popups.
		 */
		EventBroadcaster.broadcast ( 
			BroadcastMessages.MOUSEEVENT_MOUSEDOWN 
		);
	}
}

/**
 * Handle escape key. This should close all open popups.
 *
MenuBodyBinding.prototype.handleEscapeKey = function () {
	
	alert ( "ESCAPE NOW!" );
}
*/

/*
 * Compute next focus when the arrowkey is pressed.
 * TODO: handle menupopups that opened on the 
 * wrong side because of missing screen estate!
 * @param {int} key
 */
MenuBodyBinding.prototype.handleArrowKey = function ( key ) {

	/*
	 * Store key so that others can know what was pressed.
	 * @see {MenuBarBinding#handleAction}
	 */
	this.arrowKey = key;

	var items 	= this._getMenuItems ();
	var current	= null;
	var next 	= null;
	
	if ( this._lastFocused ) {
	
		current = this._lastFocused
		
		switch ( key ) {
			case KeyEventCodes.VK_UP :
				next = items.getPreceding ( current );
				break;
			case KeyEventCodes.VK_DOWN :
				next = items.getFollowing ( current );
				break;
			case KeyEventCodes.VK_LEFT :
				this.dispatchAction ( MenuBodyBinding.ACTION_UNHANDLED_LEFTRIGHTKEY );
				break;
			case KeyEventCodes.VK_RIGHT :
				if ( this._lastFocused.isMenuContainer ) {
					this.releaseKeyboard ();
					this._lastFocused.show ();
					this._lastFocused.menuPopupBinding.grabKeyboard ( true );
				} else {
					this.dispatchAction ( MenuBodyBinding.ACTION_UNHANDLED_LEFTRIGHTKEY );
				}
				break;
		}
	} else {
		next = items.getFirst ();
	}
	if ( next ) {
		next.focus ();
	}
}

/**
 * Carefully locate menuitems relevant for this menubody only.
 * A dirtyflag system compensates for added and removed items.
 * @return {List<MenuItemBinding>}
 */
MenuBodyBinding.prototype._getMenuItems = function () {
	
	if ( !this._menuItemsList || this.isDirty ) {
		var list = new List ();
		var items = null;
		this.getChildBindingsByLocalName ( "menugroup" ).each ( function ( group ) {
			items = group.getChildBindingsByLocalName ( "menuitem" );
			items.each ( function ( item ) {
				list.add ( item );
			});
		});
		items = this.getChildBindingsByLocalName ( "menuitem" );
		items.each ( function ( item ) {
			list.add ( item );
		});
		this._menuItemsList = list;
		this.isDirty = false;
	}
	return this._menuItemsList;
}

/**
 * Make room for checkbox column. Called by descendant {@link MenuItemBinding}.
 */
MenuBodyBinding.prototype.invokeCheckBoxLayout = function () {
	
	if ( !this.hasClassName ( MenuBodyBinding.CLASSNAME_CHECKBOXED )) {
		this.attachClassName ( MenuBodyBinding.CLASSNAME_CHECKBOXED );
	}
}

/**
 * Make room for checkbox column. Called by descendant {@link MenuItemBinding}.
 * TODO: disable again at some point?
 */
MenuBodyBinding.prototype.invokeImageLayout = function () {
	
	if ( !this._hasImageLayout ) {
		this.detachClassName ( ToolBarBinding.CLASSNAME_TEXTONLY ); 
		this._hasImageLayout = true;
	}
}

/**
 * MenuBodyBinding factory.
 * @param {DOMDocument} ownerDocument
 * @return {MenuBodyBinding}
 */
MenuBodyBinding.newInstance = function ( ownerDocument ) {

	var element = DOMUtil.createElementNS ( Constants.NS_UI, "ui:menubody", ownerDocument );
	return UserInterface.registerBinding ( element, MenuBodyBinding );
}