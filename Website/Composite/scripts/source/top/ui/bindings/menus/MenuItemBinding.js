MenuItemBinding.prototype = new MenuContainerBinding;
MenuItemBinding.prototype.constructor = MenuItemBinding;
MenuItemBinding.superclass = MenuContainerBinding.prototype;

MenuItemBinding.ACTION_COMMAND		= "menuitemcommand";
MenuItemBinding.TYPE_CHECKBOX 		= "checkbox";
MenuItemBinding.TYPE_MENUCONTAINER 	= "menucontainer";
MenuItemBinding.CLASSNAME_CHECKBOX 	= "checkboxindicator";
MenuItemBinding.CLASSNAME_HOVER 	= "hover";
MenuItemBinding.CHAR_CHECKBOX 		= "V";
MenuItemBinding.TIMEOUT				= 150;

/**
 * @class
 */
function MenuItemBinding () {

	/**
	 * @type {SystemLogger}
	 */
	this.logger = SystemLogger.getLogger ( "MenuItemBinding" );

	/**
	 * @type {string}
	 */
	this.type = null;

	/**
	 * User can implement this.
	 * @type {function}
	 */
	this.oncommand = null;

	/**
	 * @type {boolean}
	 */
	this.isDisabled = false;

	/**
	 * @type {LabelBinding}
	 */
	this.labelBinding = null;

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

	/**setDisabled
	 */
	this.imageProfile = null;

	/**
	 * @type {boolean}
	 */
	this.isMenuContainer = false;

	/**
	 * @type {boolean}
	 */
	this.hasAction = true;

	/**
	 * @type {boolean}
	 */
	this.isTypeSet = false;

	/**
	 * @type {boolean}
	 */
	this.isChecked = false;

	/**
	 * Flipped by either mouse or keyboard navigation.
	 * @type {boolean}
	 */
	this.isFocused = false;

	/**
	 * The containing menubody handles blur whenever a new item is focused.
	 * This is done by direct method invokation because of maxed performance.
	 * @type {MenuBodyBinding}
	 */
	this._containingMenuBodyBinding = null;
}

/**
 * Identifies binding.
 */
MenuItemBinding.prototype.toString = function () {

	return "[MenuItemBinding]";
}

/**
 * Hookup broadcaster mapping and set type.
 */
MenuItemBinding.prototype.onBindingRegister = function () {

	MenuItemBinding.superclass.onBindingRegister.call ( this );
	this.propertyMethodMap [ "isdisabled" ] = this.setDisabled;
	if ( this.type ) {
		this.setProperty ( "type", this.type );
	}
}

/**
 * @overloads {Binding#onBindingAttach}
 */
MenuItemBinding.prototype.onBindingAttach = function () {

	MenuItemBinding.superclass.onBindingAttach.call ( this );

	/*
	 * Locate menubody and set a dirty flag. This
	 * will force menubody to reindex menuitems.
	 */
	this._containingMenuBodyBinding = this.getAncestorBindingByLocalName ( "menubody" );
	this._containingMenuBodyBinding.isDirty = true;

	/*
	 * Build.
	 */
	this.parseDOMProperties ();
	this.buildDOMContent ();
	this.assignDOMEvents ();

	/**
	 * Intercepted by PopupBinding in order to control overflow.
	 */
	this.dispatchAction ( Binding.ACTION_ATTACHED );

}



/**
 * Parse DOM properties.
 */
MenuItemBinding.prototype.parseDOMProperties = function () {

	var image = this.getProperty ( "image" );
	var imageHover = this.getProperty ( "image-hover" );
	var imageActive = this.getProperty ( "image-active" );
	var imageDisabled = this.getProperty ( "image-disabled" );

	if ( !this.image && image ) {
		this.image = image;
	}
	if ( !this.imageHover && imageHover ) {
		this.imageHover = image;
	}
	if ( !this.imageActive && imageActive ) {
		this.imageActive = imageActive;
	}
	if ( !this.imageDisabled && imageDisabled ) {
		this.imageDisabled = imageDisabled;
	}
}

/**
 * Build DOM content.
 */
MenuItemBinding.prototype.buildDOMContent = function () {

	var label 			= this.getProperty ( "label" );
	var tooltip 		= this.getProperty ( "tooltip" );
	var type 			= this.getProperty ( "type" );
	var disabled 		= this.getProperty ( "isdisabled" );
	var image 			= this.getProperty ( "image" );
	var imageHover 		= this.getProperty ( "image-hover" );
	var imageActive 	= this.getProperty ( "image-active" );
	var imageDisabled = this.getProperty("image-disabled");
	var hasAction = this.getProperty("hasaction");

	this.labelBinding = LabelBinding.newInstance ( this.bindingDocument );
	this.labelBinding.attachClassName ( "menuitemlabel" );
	this.add ( this.labelBinding );

	// assign menupopup
	var menuPopup = this.getMenuPopupBinding ();
	if ( menuPopup ) {
		this.isMenuContainer = true;
		this.setType ( MenuItemBinding.TYPE_MENUCONTAINER );
		this.hasAction = hasAction === true;
	}

	// compute image profile
	if ( !this.imageProfile ) {

		if ( !this.image && image ) {
			this.image = image;
		}
		if ( !this.imageHover && imageHover ) {
			this.imageHover = image;
		}
		if ( !this.imageActive && imageActive ) {
			this.imageActive = imageActive;
		}
		if ( !this.imageDisabled && imageDisabled ) {
			this.imageDisabled = imageDisabled;
		}
		if ( this.image || this.imageHover || this.imageActive || this.imageDisabled ) {
			this.imageProfile = new ImageProfile ( this );
		}
	}

	if ( this.imageProfile ) {
		this.setImage ( this.imageProfile.getDefaultImage ());
		/*this._containingMenuBodyBinding.invokeImageLayout ();*/
	} else {
		this.setImage ( null );
	}

	if ( label != null ) {
		this.setLabel ( label );
	}
	if ( tooltip ) {
		this.setToolTip ( tooltip );
	}
	if ( type ) {
		this.setType ( type );
	}
	if ( this.type == MenuItemBinding.TYPE_CHECKBOX ) {
		if ( this.getProperty ( "ischecked" ) == true ) {
			this.check ( true );
		}
	}
	if ( disabled == true ) {
		this.disable ();
	}

	/*
	 * Setup command
	 */
	var oncommand = this.getProperty ( "oncommand" );
	if ( oncommand ) {
		this.oncommand = function () {
			this.bindingWindow.eval ( oncommand );
		}
	}
}

/**
 * Assign DOM events.
 */
MenuItemBinding.prototype.assignDOMEvents = function () {

	/*
	 * Rebember that menubody handles blur!
	 */
	this.addEventListener ( DOMEvents.MOUSEOVER );
	this.addEventListener ( DOMEvents.MOUSEUP );
}

/**
 * @implements {IEventListener}
 * @overloads {Binding#handleEvent}
 * @param {MouseEvent} e
 */
MenuItemBinding.prototype.handleEvent = function ( e ) {

	MenuItemBinding.superclass.handleEvent.call ( this, e );

	if ( !this.isDisabled && !BindingDragger.isDragging ) {

		switch ( e.type ) {

			case DOMEvents.MOUSEOVER :
				this.focus ( e );
				break;

			case DOMEvents.MOUSEUP :
				DOMEvents.stopPropagation ( e );
				if (this.hasAction) {
					if ( this.type == MenuItemBinding.TYPE_CHECKBOX ) {
						this.setChecked ( !this.isChecked );
					} else {
						this.fireCommand ();
					}
					EventBroadcaster.broadcast(
						BroadcastMessages.MOUSEEVENT_MOUSEDOWN, this
					);
					EventBroadcaster.broadcast (
						BroadcastMessages.MOUSEEVENT_MOUSEUP, this
					);
				}
				break;
		}
	}
}

/**
 * Fire command.
 */
MenuItemBinding.prototype.fireCommand = function () {

	if ( this.hasAction ) {
		if ( this.oncommand ) {
			// TODO: Timeout to close first? Animation.DEFAULT_TIMEOUT?
			this.oncommand ();
		}
		this.dispatchAction ( MenuItemBinding.ACTION_COMMAND );
	}
}

/**
 * Set image. Defaults to a blank image in order to align menuitems correctly.
 * TODO: modify menu layout if NO menuitems specify images.
 * @param {string} url
 */
MenuItemBinding.prototype.setImage = function ( url ) {

	url = url ? url : LabelBinding.DEFAULT_IMAGE;
	this.setProperty ( "image", url );
	if ( this.isAttached ) {
		this.labelBinding.setImage (
			url
		);
	}
}

/**
 * Set label.
 * @param {string} label
 */
MenuItemBinding.prototype.setLabel = function ( label ) {

	this.setProperty ( "label", label );
	if ( this.isAttached ) {
		this.labelBinding.setLabel (
			Resolver.resolve ( label )
		);
	}
}

/**
 * Set tooltip.
 * @param {string} tooltip
 */
MenuItemBinding.prototype.setToolTip = function ( tooltip ) {

	this.setProperty ( "tooltip", tooltip );
	if ( this.isAttached ) {
		this.labelBinding.setToolTip (
			Resolver.resolve ( tooltip )
		);
	}
}

/**
 * Reset visual appearance when menus are closed.
 */
MenuItemBinding.prototype.reset = function () {

	if ( this.labelBinding.hasClassName ( "hover" )) {
		this.labelBinding.detachClassName ( "hover" );
	}
}

/**
 * Set type.
 * @param {string} type
 */
MenuItemBinding.prototype.setType = function ( type ) {

	if ( this.isAttached ) {
		if ( !this.isTypeSet ) {
			switch ( type ) {
				case MenuItemBinding.TYPE_CHECKBOX :

					if ( this.hasAction ) {

						// update container appearance
						this._containingMenuBodyBinding.invokeCheckBoxLayout ();

						// append checkbox symbol
						var element = this.bindingDocument.createElement ( "div" );
						element.className = MenuItemBinding.CLASSNAME_CHECKBOX;
						element.appendChild ( this.bindingDocument.createTextNode ( MenuItemBinding.CHAR_CHECKBOX ));
						var label = this.labelBinding.bindingElement;
						label.insertBefore ( element, label.firstChild );
						element.style.display = "none";
						this.shadowTree.checkBoxIndicator = element;

					} else {
						throw new Error ( "MenuItemBinding: checkboxes cannot contain menus" );
					}
					break;

				case MenuItemBinding.TYPE_MENUCONTAINER :
					break;
			}

			this.type = type;
			this.isTypeSet = true;

		} else {
			throw new Error ( "MenuItemBinding: Cannot set type twice." );
		}
	}

	this.setProperty ( "type", type );
}

/**
 * Get image.
 * @return {string}
 */
MenuItemBinding.prototype.getImage = function () {

	return this.getProperty ( "image" );
}

/**
 * Get label.
 * @return {string}
 */
MenuItemBinding.prototype.getLabel = function () {

	return this.getProperty ( "label" );
}


/**
 * Get tooltip.
 * @return {string}
 */
MenuItemBinding.prototype.getToolTip = function () {

	return this.getProperty ( "tooltip" );
}

/**
 * Disable menuitem.
 */
MenuItemBinding.prototype.disable = function () {

	this.setDisabled ( true );
}

/**
 * Enable menuitem.
 */
MenuItemBinding.prototype.enable = function () {

	this.setDisabled ( false );
}

/**
 * Set menuitem disabled status.
 * @param {boolean} bool
 */
MenuItemBinding.prototype.setDisabled = function ( bool ) {

	this.isDisabled = bool;

	if ( this.isDisabled ) {
		this.setProperty ( "isdisabled", true );
	} else {
		this.deleteProperty ( "isdisabled" );
	}

	if ( this.isAttached ) {
		if ( this.isDisabled ) {
			this.labelBinding.detachClassName ( "hover" );
			this.attachClassName ( "isdisabled" );
			if ( this.imageProfile ) {
				var image = this.imageProfile.getDisabledImage ();
				if ( image ) {
					this.setImage ( image );
				}
			}
		} else {
			this.detachClassName ( "isdisabled" );
			if ( this.imageProfile ) {
				var image = this.imageProfile.getDefaultImage ();
				if ( image ) {
					this.setImage ( image );
				}
			}
		}
	}
}

/**
 * Focus.
 * @param {MouseEvent} e
 */
MenuItemBinding.prototype.focus = function ( e ) {

	/*
	 * Notice that only the label gets a classname assigned here!
	 */
	this.labelBinding.attachClassName ( MenuItemBinding.CLASSNAME_HOVER );

	var container = this.getMenuContainerBinding ();
	if ( container.isOpen () && !container.isOpen ( this )) {
		container._openElement.hide ();
		container.setOpenElement ( false );
	}

	/*
	 * Open submenu after short timeout (when mouse-navigating).
	 */
	if ( this.isMenuContainer && e && e.type == DOMEvents.MOUSEOVER ) {
		var container = this.getMenuContainerBinding ();
		if ( !container.isOpen ( this )) {
			var self = this;
			this._showSubMenuTimeout = window.setTimeout ( function () {
				self.show ();
				self._showSubMenuTimeout = null;
			}, MenuItemBinding.TIMEOUT );
		};
	}

	/**
	 * When keyboard navigating, this will adjust any visible scrollbar.
	 */
	if ( !e || e.type != DOMEvents.MOUSEOVER ) {
		if ( this.bindingElement.tabIndex != -1 ) {
			if ( Client.isMozilla ) {
				FocusBinding.focusElement ( this.bindingElement );
			} else {
				var self = this;
				setTimeout ( function () {
					FocusBinding.focusElement ( self.bindingElement );
				}, 0 );
			}
		}
	}

	this.isFocused = true;
	this._containingMenuBodyBinding.handleFocusedItem ( this );
}

/**
 * Blur.
 * @param {boolean} isForceBlur
 */
MenuItemBinding.prototype.blur = function ( isForceBlur ) {

	/*
	 * Clear submenu timeout.
	 */
	if ( this._showSubMenuTimeout ) {
		window.clearTimeout ( this._showSubMenuTimeout );
		this._showSubMenuTimeout = null;
	}

	if ( this.isFocused ) {
		var container = this.getMenuContainerBinding ();
		if ( !container || !container.isOpen ( this ) || isForceBlur ) {
			this.labelBinding.detachClassName ( MenuItemBinding.CLASSNAME_HOVER );
			this.isFocused = false;
			this._containingMenuBodyBinding.handleBlurredItem ( this );
		}
	}
}

/**
 * Check.
 * @param {boolean} isPreventCommand
 */
MenuItemBinding.prototype.check = function ( isPreventCommand ) {

	this.setChecked ( true, isPreventCommand );
}

/**
 * Uncheck.
 * @param {boolean} isPreventCommand
 */
MenuItemBinding.prototype.uncheck = function ( isPreventCommand ) {

	this.setChecked ( false, isPreventCommand );
}

/**
 * Always attempt right side positioning of the submenu.
 * @overloads {MenuContainerBinding#show}
 */
MenuItemBinding.prototype.show = function () {

	this.menuPopupBinding.position = PopupBinding.POSITION_RIGHT;
	MenuItemBinding.superclass.show.call ( this );
}

/**
 * Set menuitem checked status.
 * @param {boolean} isChecked
 * @param {boolean} isPreventCommand
 */
MenuItemBinding.prototype.setChecked = function ( isChecked, isPreventCommand ) {

	this.setProperty ( "ischecked", isChecked );
	if ( this.isAttached ) {
		if ( this.type == MenuItemBinding.TYPE_CHECKBOX ) {
			if ( this.isChecked != isChecked ) {
				this.isChecked = isChecked;
				this.shadowTree.checkBoxIndicator.style.display =
					isChecked ? "block" : "none";
				if ( !isPreventCommand ) {
					this.fireCommand ();
				}
			}
		}
	}
}

/**
 * MenuItemBinding factory.
 * @param {DOMDocument} ownerDocument
 */
MenuItemBinding.newInstance = function ( ownerDocument ) {

	var menuitem = DOMUtil.createElementNS ( Constants.NS_UI, "ui:menuitem", ownerDocument );
	UserInterface.registerBinding ( menuitem, MenuItemBinding );
	return UserInterface.getBinding ( menuitem );
}