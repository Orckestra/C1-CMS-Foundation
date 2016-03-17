PopupBinding.prototype = new Binding;
PopupBinding.prototype.constructor = PopupBinding;
PopupBinding.superclass = Binding.prototype;

PopupBinding.ACTION_SHOW 		= "popupshow";
PopupBinding.ACTION_HIDE 		= "popuphide";

PopupBinding.POSITION_TOP 		= "top";
PopupBinding.POSITION_RIGHT 	= "right";
PopupBinding.POSITION_BOTTOM 	= "bottom";
PopupBinding.POSITION_LEFT 		= "left";

PopupBinding.TYPE_NORMAL		= "normal";
PopupBinding.TYPE_FIXED			= "fixed"; // scrollbars on overflow
PopupBinding.FIXED_MAX			= 12;
PopupBinding.CLASSNAME_OVERFLOW = "overflow";
PopupBinding.CLASSNAME_TEXTONLY = "textonly";

/**
 * Indexing open popups.
 * @type {Map<string><PopupBinding>}
 */
PopupBinding.activeInstances = new Map ();

/**
 * Any popups open? Note that this method is only accurate
 * within an error margin of zero milliseconds.
 * @see {PopupBinding#hide}
 * @return {boolean}
 */
PopupBinding.hasActiveInstances = function () {

	return PopupBinding.activeInstances.hasEntries ();
}

/**
 * Close active popups when a mousedown or mouseup is broadcasted globally. When the
 * popup is associated to a ButtonBinding, an intricate setup prevents the popup
 * from closing as soon as it opens (since the mouse event will both open and
 * close the popup). Not pretty, but timing bugs were encoutered with other
 * methods of handling this.
 * @see {ButtonStateManager#handleEvent}
 * @implements {IBroadcastListener}
 * @param {string} broadcast
 * @param {object} arg This is usually a MouseEvent but it can also be a Binding.
 */
PopupBinding.handleBroadcast = function ( broadcast, arg ) {

	switch ( broadcast ) {
		case BroadcastMessages.MOUSEEVENT_MOUSEDOWN:
		case BroadcastMessages.TOUCHEVENT_TOUCHSTART:
			if ( PopupBinding.activeInstances.hasEntries ()) {
				var list = new List ();
				PopupBinding.activeInstances.each ( function ( key ) {
					var popup = PopupBinding.activeInstances.get ( key );
					var isAbort = ( arg && arg instanceof ButtonBinding && arg.popupBinding == popup );
					if ( !isAbort ) {
						list.add ( popup );
					}
				});
				list.each ( function ( popup ) {
					popup.hide ();
				});
			}
			break;
		case BroadcastMessages.KEY_ESCAPE :
			if ( PopupBinding.activeInstances.hasEntries ()) {
				PopupBinding.activeInstances.each ( function ( key ) {
					var popup = PopupBinding.activeInstances.get ( key );
					popup.hide ();
				});
			}
			break;
	}
}

/*
 * Subscribing straight up.
 */
EventBroadcaster.subscribe ( BroadcastMessages.MOUSEEVENT_MOUSEDOWN, PopupBinding);
EventBroadcaster.subscribe ( BroadcastMessages.TOUCHEVENT_TOUCHSTART, PopupBinding);
EventBroadcaster.subscribe ( BroadcastMessages.KEY_ESCAPE, PopupBinding );

/**
 * @class
 */
function PopupBinding () {

	/**
	 * @type {SystemLogger}
	 */
	this.logger = SystemLogger.getLogger ( "PopupBinding" );

	/**
	 * This should be either a MenuBodyBinding or a PopupBodyBinding.
	 * @type {Binding}
	 */
	this._bodyBinding = null;

	/**
	 * @type {string}
	 */
	this.position = null;

	/**
	 * @type {boolean}
	 * @private
	 */
	this.isVisible = false;

	/**
	 * TODO: parse from markup
	 * @type {function}
	 */
	this.onshow = null;

	/**
	 * TODO: parse from markup
	 * @type {function}
	 */
	this.onhide = null;

	/**
	 * @type {object}
	 */
	this.geometry = null;

	/**
	 * @see {PopupBinding#_indexMenuContent}
	 * @type {HashMap<string><MenuItemBinding>}
	 */
	this._menuItems = null;

	/**
	 * @see {PopupBinding#_indexMenuContent}
	 * @type {HashMap<string><List<MenuGroupBinding>>}
	 */
	this._menuGroups = null;

	/**
	 * @type {int}
	 */
	this._menuItemCount = 0;

	/**
	 * If set to fixed, scrollbars may appear.
	 * @type {string}
	 */
	this.type = PopupBinding.TYPE_NORMAL;

	/**
	 * Scrollbars are go?
	 * @type {boolean}
	 */
	this._isOverflow = false;

	/**
	 * @type {boolean}
	 */
	this.hasImages = true;

	/*
	 * Returnable.
	 */
	return this;
}

/**
 * Identifies binding.
 */
PopupBinding.prototype.toString = function () {

	return "[PopupBinding]";
}

/**
 * Overloads {Binding#onBindingAttach}
 */
PopupBinding.prototype.onBindingAttach = function () {

	PopupBinding.superclass.onBindingAttach.call ( this );
	this.addActionListener ( Binding.ACTION_ATTACHED );

	this.geometry = { // please consider erecting a class for this!
		x : 0,
		y : 0,
		w : 0,
		h : 0
	}

	this.buildDOMContent ();
	this.parseDOMProperties ();
	this.assignDOMEvents ();

}

/**
 * @overloads {Binding#onBindingDispose}
 */
PopupBinding.prototype.onBindingDispose = function () {

	PopupBinding.superclass.onBindingDispose.call ( this );
	if ( PopupBinding.activeInstances.has ( this.key )) {
		PopupBinding.activeInstances.del ( this.key );
	}
}

/**
 * Build DOM content. Verifies body element.
 */
PopupBinding.prototype.buildDOMContent = function () {

	var menubody = DOMUtil.getElementsByTagName ( this.bindingElement, "menubody" ).item ( 0 );
	var popupbody = DOMUtil.getElementsByTagName ( this.bindingElement, "popupbody" ).item ( 0 );

	if ( menubody ) {
		this._bodyBinding = UserInterface.getBinding ( menubody );
	} else if ( popupbody ) {
		this._bodyBinding = UserInterface.getBinding ( popupbody );
	} else {
		if (this.bindingElement.childElementCount > 0) {
			throw new Error ( this + ": DOM structure invalid." );
		} else {
			this._bodyBinding = this.add (
				MenuBodyBinding.newInstance ( this.bindingDocument )
			).attach ();
		}
	}
}

/**
 * Parse DOM properties.
 */
PopupBinding.prototype.parseDOMProperties = function () {

 	if ( !this.position ) {
		var position = this.getProperty ( "position" );
		this.position = position ? position : PopupBinding.POSITION_BOTTOM;
	}
}

/**
 * Assign DOM events.
 */
PopupBinding.prototype.assignDOMEvents = function () {

	this.addEventListener ( DOMEvents.MOUSEDOWN );
	this.addEventListener ( DOMEvents.MOUSEUP );
}

/**
 * When adding bindings, in fact they are added to the bodybinding.
 * @overloads {Binding#add}
 * @param {Binding} binding
 * @returns {Binding}
 */
PopupBinding.prototype.add = function ( binding ) {

	var returnable = null;
	if ( this._bodyBinding ) {
		this._bodyBinding.add ( binding );
		returnable = binding;
	} else {
		returnable = PopupBinding.superclass.add.call ( this, binding );
	}
	return returnable;
}

/**
 * @overloads {Binding#add}
 * @param {Binding} binding
 * @returns {Binding}
 */
PopupBinding.prototype.addFirst = function ( binding ) {

	var returnable = null;
	if ( this._bodyBinding ) {
		this._bodyBinding.addFirst ( binding );
		returnable = binding;
	} else {
		returnable = PopupBinding.superclass.addFirst.call ( this, binding );
	}
	return returnable;
}

/**
 * @implements {IActionListener}
 * @overloads {Binding#handleAction}
 * @param {Action} action
 */
PopupBinding.prototype.handleAction = function ( action ) {

	PopupBinding.superclass.handleAction.call ( this, action );

	var binding = action.target;

	switch ( action.type ) {
		case Binding.ACTION_ATTACHED :
			if ( binding instanceof MenuItemBinding ) {
				this._count ( true );
				action.consume ();
			}
			break;
		case Binding.ACTION_DETACHED :
			if ( binding instanceof MenuItemBinding ) {
				this._count ( false );
				action.consume ();
			}
			break;
	}
}

/**
 * Relevant for fixed popups.
 * @param {boolean} isPlus
 */
PopupBinding.prototype._count = function ( isPlus ) {

	if ( this.type == PopupBinding.TYPE_FIXED ) {
		this._menuItemCount = this._menuItemCount +  ( isPlus ? 1 : -1 );
		if ( !this._isOverflow ) {
			if (this._menuItemCount >= PopupBinding.FIXED_MAX) {
				this.bindingElement.style.height = "";
				this.attachClassName ( PopupBinding.CLASSNAME_OVERFLOW );
				this._isOverflow = true;
			}
		} else {
			if ( this._menuItemCount < PopupBinding.FIXED_MAX ) {
				this.bindingElement.style.height = "auto";
				this.detachClassName ( PopupBinding.CLASSNAME_OVERFLOW );
				this._isOverflow = false;
			}
		}
	}
}

/**
 * Snapt to target element.
 * @param {DOMElement} element
 */
PopupBinding.prototype.snapTo = function ( element ) {

	var point = this._getElementPosition ( element );

	switch ( this.position ) {
		case PopupBinding.POSITION_TOP :
			point.y -= this.bindingElement.offsetHeight;
			break;
		case PopupBinding.POSITION_RIGHT :
			point.x += element.offsetWidth;
			break;
		case PopupBinding.POSITION_BOTTOM :
			point.y += element.offsetHeight;
			break;
		case PopupBinding.POSITION_LEFT :
			point.x -= this.bindingElement.offsetWidth;
			break;
	}

	this.targetElement = element;
	this.bindingElement.style.display = "block";
	this.setPosition ( point.x, point.y );
}

/**
 * Position near mouse event and show.
 * @param {MouseEvent} e
 */
PopupBinding.prototype.snapToMouse = function ( e ) {

	this.snapToPoint ( this._getMousePosition ( e ));
}

/**
 * Position near point and show.
 * @param {Point} point
 */
PopupBinding.prototype.snapToPoint = function ( point ) {

	this.bindingElement.style.display = "block";
	this.setPosition ( point.x, point.y );
	this.show ();
}

/**
 * @param {int} x
 * @param {int} y
 */
PopupBinding.prototype.setPosition = function ( x, y ) {

	this.geometry.x = x;
	this.geometry.y = y;

	this.bindingElement.style.left = this.geometry.x + "px";
	this.bindingElement.style.top = this.geometry.y + "px";
}

/**
 * @return {Point}
 */
PopupBinding.prototype.getPosition = function ( x, y ) {

	return new Point (
		this.geometry.x,
		this.geometry.y
	);
}

/**
 * @returm {Dimension}
 */
PopupBinding.prototype.getDimension = function () {

	return new Dimension (
		this.bindingElement.offsetWidth,
		this.bindingElement.offsetHeight
	);
}


/**
 * Calculate position of target element. Result depends on whether or not
 * the target element is located in the same document as the popup element.
 * If not, we assume that the popup is located in the top frameset and use
 * universal positioning.
 * TODO: MenuPopupBinding overwrites this method - eliminate the _underscore!
 * @param {DOMElement} element
 * @return {object}
 */
PopupBinding.prototype._getElementPosition = function ( element ) {

	return element.ownerDocument == this.bindingDocument ?
		DOMUtil.getGlobalPosition ( element ) :
		DOMUtil.getUniversalPosition ( element );
}

/**
 * Calculate mouse position on click. To save calculations, result depends on whether
 * or not the clicked element is located in the same document as the popup element.
 * @param {MouseEvent} e
 */
PopupBinding.prototype._getMousePosition = function ( e ) {

	var element = DOMEvents.getTarget ( e );
	return element.ownerDocument == this.bindingDocument ?
		DOMUtil.getGlobalMousePosition ( e ) :
		DOMUtil.getUniversalMousePosition ( e );
}

/**
 * Show.
 * @overwrites {Binding#show}
 */
PopupBinding.prototype.show = function () {

	if ( this.isVisible == true) { // don't open an already open popup!

		this.hide (); // why does this make sense?
	}
	if ( !this.isVisible ) {

		PopupBinding.activeInstances.set ( this.key, this );
		this.bindingElement.style.display = "block";

		this.dispatchAction ( PopupBinding.ACTION_SHOW );
		this.fitOnScreen ();
		this._makeVisible ( true );

		if ( this._bodyBinding instanceof MenuBodyBinding ) {
			this._bodyBinding.refreshMenuGroups ();
		}

		/**
		 * Enable keyboard navigation.
		 */
		this._enableTab ( true );

	}
}

/**
 * Make visible!
 * @param {boolean} isVisible
 */
PopupBinding.prototype._makeVisible = function ( isVisible ) {

	var element = this.bindingElement;

	if ( isVisible ) {
		element.style.visibility = "visible";

	} else {
		element.style.visibility = "hidden";
		element.style.display = "none";
	}

	this.isVisible = isVisible;
}

/**
 * Enable tabbing. The timeout prevents current selection from blurring when the menu opens.
 * TODO: Move this method to MenuBodyBinding if and when popups are used for non-menu purposes.
 * TODO: Kill this method now that it turns out that none of the above fixes our problem.
 * @param {boolean} isEnable
 */
PopupBinding.prototype._enableTab = function ( isEnable ) {

	var self = this;
	var menuItems = this.getDescendantBindingsByLocalName ( "menuitem" );

	setTimeout ( function () {
		if ( Binding.exists ( self ) == true ) {
			menuItems.each ( function ( menuItem ) {
				menuItem.bindingElement.tabIndex = isEnable ? 0 : -1;
			});
		}
	}, 0 );
}

/**
 * Hide.
 * @overwrites {Binding#hide}

 */
PopupBinding.prototype.hide = function () {

	this.releaseKeyboard ();

	if ( this.isVisible ) {

		/*
		this.bindingElement.style.visibility = "hidden";
		this.bindingElement.style.display = "none";
		*/
		this._makeVisible ( false );
		this.targetElement = null;

		this.dispatchAction ( Binding.ACTION_VISIBILITYCHANGED );
		this.dispatchAction ( PopupBinding.ACTION_HIDE );

		/**
		 * Disable keyboard navigation.
		 */
		this._enableTab ( false );

		/*
		 * This hacky timeout prevents a dialog from closing on return keypress
		 * while a selector or a dialog is being handled inside the dialog.
		 * @see {DialogToolBarBinding#handleBroadcast}
		 */
		var self = this;
		setTimeout ( function () {
			if ( !self.isVisible ) { // could have been reopened meanwhile!
				PopupBinding.activeInstances.del ( self.key );
			}
		}, 0 );

	}
}

/**
 * Dont open popups outside screen. Remember that MenuPopupBinding owerwrites this.
 * TODO: this adjusts position at odd times in Explorer!
 */
PopupBinding.prototype.fitOnScreen = function () {

	var x = this.bindingElement.offsetLeft;
	var y = this.bindingElement.offsetTop;
	var w = this.bindingElement.offsetWidth;
	var h = this.bindingElement.offsetHeight;

	var dim	= this.bindingWindow.WindowManager.getWindowDimensions ();
	var pos = this.boxObject.getGlobalPosition();



	/*
	 * Snap to element.
	 */
	if ( this.targetElement != null ) {

		if ( pos.y + h >= dim.h ) {
			/*
			 * This is somewhat hacky - but the "relative" switch
			 * is effective (for now) in order to hack menupopups
			 */
			switch ( CSSComputer.getPosition ( this.bindingElement.offsetParent )) {
				case "absolute" :
					y = y - h - this.targetElement.offsetHeight;
					if ( y < 0 ) {
						y = 0;
					}
					break;
				case "relative" : // this *really* expects a menugroup...
					y = y - h + this.targetElement.offsetHeight + 9;

					//if no space in top set to the top
					var targetPosition = DOMUtil.getGlobalPosition(this.targetElement);
					if (y + targetPosition.y < 0) {
						y = - targetPosition.y;
					}
					break;
			}
		}
		if ( pos.x + w >= dim.w ) {
			x -= w;
			switch ( this.position ) {
				case PopupBinding.POSITION_RIGHT :
					x -= this.targetElement.offsetWidth;
					break;
				case PopupBinding.POSITION_BOTTOM :
					x += this.targetElement.offsetWidth;
					break;
			}
		}
	}
	/*
	 * Snap to mouse.
	 */
	else {
		if ( pos.y + h >= dim.h ) {
			y -= h;
			if ( y < 0 ) {
				y = 0;
			}
		}
		if ( pos.x + w >= dim.w ) {
			x -= w;
			if ( x < 0 ) {
				x = 0;
			}
		}
	}
	this.setPosition ( x, y );
}

/**
 * Mousevents will be consumed in order not to close
 * the popup while handling menuitems. When clicking
 * a MenuItem, the mouseup event is broadcasted via
 * the EventBroadcaster, effectively closing the Popup.
 * @implements {IEventListener}
 * @overloads {Binding#handleEvent}
 * @param {MouseEvent} e
 */
PopupBinding.prototype.handleEvent = function ( e ) {

	PopupBinding.superclass.handleEvent.call ( this, e );
	DOMEvents.stopPropagation ( e );
}

/**
 * Empty content (of body).
 */
PopupBinding.prototype.empty = function () {

	this._bodyBinding.detachRecursive ();
	this._bodyBinding.bindingElement.innerHTML = "";
}

/**
 * Grab keyboard control. This could theoretically be done automatically when
 * popup is opened, but this would conflict with keyboard navigation in menus
 * supposing it should work like os native menus.
 * @see {MenuBodyBinding#grabKeyboard}
 * @param {boolean} isDefaultAction
 */
PopupBinding.prototype.grabKeyboard = function ( isDefaultAction ) {

	// EHM - WHO IS SUPPOSED TO CALL THIS METHOD?

	/*
	 * Simpley relay keyboard control to the contained MenuBodyBinding.
	 *
	if ( this._bodyBinding instanceof MenuBodyBinding ) {
		this._bodyBinding.grabKeyboard ( isDefaultAction );
	}
	*/
}

/**
 * Release keyboard control.
 */
PopupBinding.prototype.releaseKeyboard = function () {

	// alert ( "PopupBinding.prototype.releaseKeyboard was deprecated - it seems we still use it!" );

	if ( this._bodyBinding != null && this._bodyBinding instanceof MenuBodyBinding ) {
		this._bodyBinding.releaseKeyboard ();
	}
}

/**
 * You should invoke this method manually in order to index menu content!
 */
PopupBinding.prototype._indexMenuContent = function () {

	this._menuItems = {};
	this._menuGroups = {};

	// indexing menugroups
	var list = this.getDescendantBindingsByLocalName ( "menugroup" );
	while ( list.hasNext ()) {
		var item = list.getNext ();
		var rel = item.getProperty ( "rel" );
		if ( rel ) {
			if ( !this._menuGroups [ rel ]) {
				this._menuGroups [ rel ] = new List ();
			}
			this._menuGroups [ rel ].add ( item );
		}
	}

	// indexing menuitems
	list = this.getDescendantBindingsByLocalName ( "menuitem" );
	while ( list.hasNext ()) {
		var item = list.getNext ();
		var cmd = item.getProperty ( "cmd" );
		this._menuItems [ cmd ] = item;
	}
}

/**
 * @see {PopupBinding#_indexMenuContent}
 * @return {MenuItemBinding}
 */
PopupBinding.prototype.getMenuItemForCommand = function ( cmd ) {

	var result = null;

	if ( this._menuItems ) {
		if ( this._menuItems [ cmd ]) {
			result = this._menuItems [ cmd ];
		} else {
			throw "PopupBinding.getMenuItemForCommand: No binding for command " + cmd;
		}
	} else {
		throw "Must invoke _indexMenuContent method first!";
	}
	return result;
}

/**
 * Show text only.
 */
PopupBinding.prototype.showTextOnly = function () {

	if (this._bodyBinding) {
		this._bodyBinding.attachClassName(PopupBinding.CLASSNAME_TEXTONLY);
		this.hasImages = false;
	}
}

/**
 * Show both images and text.
 */
PopupBinding.prototype.showBoth = function () {

	if (this._bodyBinding) {
		this._bodyBinding.detachClassName(PopupBinding.CLASSNAME_TEXTONLY);
		this.hasImages = true;
	}
}

/*
 * Remembering that bindings may not be
 * attached we carefully avoid using the
 * getChildBindingsByLocalName method.
 */
PopupBinding.prototype.clear = function () {

	var bodyBinding = this._bodyBinding;
	if ( bodyBinding ) {
		bodyBinding.detachRecursive ();
		bodyBinding.bindingElement.innerHTML = "";
	}

	this.bindingElement.style.height = "auto";
	this.detachClassName(PopupBinding.CLASSNAME_OVERFLOW);
	this._isOverflow = false;
	this._menuItemCount = 0;
}

/**
 * MYBinding factory.
 * @param {DOMDocument} ownerDocument
 * @return {MYBinding}
 */
PopupBinding.newInstance = function ( ownerDocument ) {

	var element = DOMUtil.createElementNS ( Constants.NS_UI, "ui:popup", ownerDocument );
	return UserInterface.registerBinding ( element, PopupBinding );
}