ButtonBinding.prototype = new Binding;
ButtonBinding.prototype.constructor = ButtonBinding;
ButtonBinding.superclass = Binding.prototype;

ButtonBinding.ACTION_COMMAND = "buttoncommand";
ButtonBinding.ACTION_RADIOBUTTON_ATTACHED = "radiobutton attached";

ButtonBinding.TYPE_CHECKBUTTON = "checkbox"; /* TODO: RENAME THIS TO CHECKBUTTON! */
ButtonBinding.TYPE_RADIOBUTTON = "radio";

ButtonBinding.CLASSNAME_FOCUSABLE = "focusable";
ButtonBinding.CLASSNAME_FOCUSED = "focused";
ButtonBinding.CLASSNAME_DEFAULT = "primary";

/**
 * @class
 */
function ButtonBinding () {

	/**
	 * @type {SystemLogger}
	 */
	this.logger = SystemLogger.getLogger ( "ButtonBinding" );
	
	/**
	 * @type {boolean}
	 */
	this.isCheckButton = false;
	
	/**
	 * @type {boolean}
	 */
	this.isRadioButton = false;

	/**
	* @type {boolean}
	*/
	this.isComboButton = false;
	
	/**
	 * Flip this exotic property to invoke hover state onmouseover even when 
	 * a radiobutton or checkbutton is checked. No effect for normal buttons.
	 * @see {ButtonStateManager#handleEvent}
	 */
	this.isCheckBox = false;
	
	/**
	 * @type {boolean}
	 */
	this.isActive = false;
	
	/**
	 * @type {boolean}
	 */
	this.isChecked = false;
	
	/**
	 * @type {boolean}
	 */
	this.isDisabled = false;
	
	/**
	 * @implements {IFocusable}
	 * @type {boolean}
	 */
	this.isFocusable = false;
	
	/**
	 * When disabled, this will backup the value of isFocusable.
	 * @type {boolean}
	 */
	this._isFocusableButton = false;
	
	/**
	 * @implements {IFocusable}
	 * @type {boolean}
	 */
	this.isFocused = false;
	
	/**
	 * Relevant for focusable dialog buttons...
	 * @type {boolean}
	 */
	this.isDefault = false;
	
	/**
	 * @type {PopupBinding}
	 */
	this.popupBinding = null;
	
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
	
	/**
	 * @type {ImageProfile}
	 */
	this.imageProfile = null;
	
	/**
	 * @type {ButtonStateManager}
	 */
	this._stateManager = null;
	
	/**
	 * Used in dialogs.
	 * @type {object} 
	 */
	this.response = null;
	
	/**
	 * @type {DOMElement}
	 */
	this.popupBindingTargetElement = null;
	
	/**
	 * Subclasses can owerwrite this to 
	 * dispatch an unique Action type.
	 */
	this.commandAction = ButtonBinding.ACTION_COMMAND;
	
	/**
	 * Image and text position reversed?
	 * @type {boolean}
	 */
	this.isFlipped = false;
	
	/**
	 * @implements {IData}
	 * @type {boolean}
	 */
	this.isDirty = false;
	
	/**
	 * Block common crawlers.
	 * @type {Map<string><boolean>}
	 * @overwrites {Binding#crawlerFilters}
	 */
	this.crawlerFilters	= new List ([ DocumentCrawler.ID, FlexBoxCrawler.ID, FocusCrawler.ID, FitnessCrawler.ID ]);
}

/**
 * Identifies binding.
 */
ButtonBinding.prototype.toString = function () {

	return "[ButtonBinding]";
}

/**
 * @overloads {Binding#onBindingRegister} 
 */
ButtonBinding.prototype.onBindingRegister = function () {

	ButtonBinding.superclass.onBindingRegister.call ( this );
	this.propertyMethodMap [ "isdisabled" ] = this.setDisabled;
}

/**
 * @overloads {Binding#onBindingAttach} 
 */
ButtonBinding.prototype.onBindingAttach = function () {

	ButtonBinding.superclass.onBindingAttach.call ( this );
	
	this.parseDOMProperties ();
	this.buildDOMContent ();
	
	if ( this.isRadioButton == true ) {
		this.dispatchAction ( ButtonBinding.ACTION_RADIOBUTTON_ATTACHED );
	}
}

/**
 * Cleanup button.
 * @overloads {Binding#onBindingDispose} 
 */
ButtonBinding.prototype.onBindingDispose = function () {
	
	ButtonBinding.superclass.onBindingDispose.call ( this );
	if ( this._stateManager != null ) {
		this._stateManager.dispose ();
		this._stateManager = null;
	}

    var callbackid = this.getProperty("callbackid");
    if (callbackid != null) {
        this.bindingWindow.DataManager.unRegisterDataBinding(callbackid);
    }
}

/**
 * Parse DOM properties.
 */
ButtonBinding.prototype.parseDOMProperties = function () {

	Binding.imageProfile ( this );
	
	/*
	if ( !this.imageProfile ) {

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
		this.imageProfile = new ImageProfile ( this );
	}
	*/
}

/**
 * Building DOM content.
 */
ButtonBinding.prototype.buildDOMContent = function () {

	var tree		= this.shadowTree;
	var width		= this.getProperty ( "width" );
	var label 		= this.getProperty ( "label" );
	var type		= this.getProperty ( "type" );
	var popup		= this.getProperty ( "popup" );
	var tooltip 	= this.getProperty ( "tooltip" );
	var disabled	= this.getProperty ( "isdisabled" );
	var response	= this.getProperty ( "response" );
	var oncommand	= this.getProperty ( "oncommand" );
	var value 		= this.getProperty ( "value" );
	var checked		= this.getProperty ( "ischecked" );
	var callbackid	= this.getProperty ( "callbackid" );
	var isFocusable	= this.getProperty ( "focusable" );
	var isFocused	= this.getProperty ( "focused" );
	var isDefault   = this.getProperty ( "default" );
	var url			= this.getProperty ( "url" );
	var isFlipped	= this.getProperty ( "flip" );

	/*
	 * Build the label.
	 */
	this.labelBinding = LabelBinding.newInstance ( this.bindingDocument );
	this.add ( this.labelBinding );
	this.labelBinding.attach ();
	this.shadowTree.labelBinding = this.labelBinding;
	if ( isFlipped ) {
		this.flip ( true );
	}
	
	/*
	 * Buld the rest.
	 */
	if ( !this._stateManager ) {
		this._stateManager = new ButtonStateManager ( this );
	}
	if ( this.imageProfile != null && this.imageProfile.getDefaultImage () != null ) {
		this.setImage ( this.imageProfile.getDefaultImage ());
	}
	if ( label != null ) {
		this.setLabel ( label );
	}
	if ( type != null ) {
		this.setType ( type );
	}
	if ( tooltip != null ) {
		this.setToolTip ( tooltip );
	}
	if ( width != null ) {
		this.setWidth ( width );
	}
	if ( popup != null ) {
		this.setPopup ( popup );
	} 
	if ( response != null ) {
		this.response = response;
	}
	if ( checked == true ) {
		if ( this.isCheckButton || this.isRadioButton ) {
			this.check ( true );
		}
	}
	if ( oncommand != null && this.oncommand == null ) {
		this.oncommand = function () {
			Binding.evaluate ( oncommand, this );
		};
	}
	if ( isFocusable || this.isFocusable ) {
		this._makeFocusable ();
		if ( isDefault || this.isDefault ) {
			this.isDefault = true;
		}
		if ( isFocused ) {
			this.focus ();
		}
	}
	if ( disabled == true ) {
		this.disable ();
	}
	if ( url != null ) {
		this.setURL ( url );
	}
	
	/*
	 * Setup ASP.NET callback.
	 */
	if ( callbackid != null ) {
		
		/*
		 * Register as DataBinding.
		 */
		this.bindingWindow.DataManager.registerDataBinding ( callbackid, this );
		
		/*
		 * Unless they have a value, buttons should not inject a hidden field.
		 * NOTE: The value must NOT be an empty string, since this is treated 
		 * as null for inscrutable historic reasons.
		 */
		if ( value != null ) {
			Binding.dotnetify ( this, value );
		}
		
		/*
		 * By default, callbackid will instantiate a postback  
		 * on button click while marking the binding dirty. 
		 * Note: It may be quite important for backend buttons 
		 * not to have an oncommand specified.
		 */
		if ( this.oncommand == null ) {
			this.oncommand = function () {
				this.dirty ();
				if ( this.getProperty ( "validate" ) == true ) {
					this.dispatchAction ( PageBinding.ACTION_DOVALIDATEDPOSTBACK );
				} else {
					this.dispatchAction ( PageBinding.ACTION_DOPOSTBACK );
				}
			};
		}
	}
}

/**
 * Make focusable.
 */
ButtonBinding.prototype._makeFocusable = function () {
 
	this.isFocusable = true;
	this.attachClassName ( ButtonBinding.CLASSNAME_FOCUSABLE );
	this._isFocusableButton = true;
}

/**
 * Set image.
 * @param {string} image
 */
ButtonBinding.prototype.setImage = function ( image ) {

	if ( this.isAttached ) {
		this.labelBinding.setImage ( image );
	}
	this.setProperty ( "image", image );
}

/**
 * Get image.
 * @return {string}
 */
ButtonBinding.prototype.getImage = function () {

	return this.getProperty ( "image" );
}


/**
 * Set label.
 * @param {string} label
 */
ButtonBinding.prototype.setLabel = function ( label ) {
	
	if ( this.isAttached ) {
		this.labelBinding.setLabel ( label );
	}
	this.setProperty ( "label", label );	
}

/** 
 * Get label.
 * @return {string}
 */
ButtonBinding.prototype.getLabel = function () {
	
	return this.getProperty ( "label" );
}


/**
 * This should probably only be set during initialization.
 * @param {string} type
 */
ButtonBinding.prototype.setType = function ( type ) {

	switch ( type ) {
		case ButtonBinding.TYPE_CHECKBUTTON :
			this.isCheckButton = true;
			break;
		case ButtonBinding.TYPE_RADIOBUTTON :
			this.isRadioButton = true;
			break;
	}
	this.setProperty ( "type", type );
}

/**
 * Set tooltip.
 * @param {string} type
 */
ButtonBinding.prototype.setToolTip = function ( tooltip ) {
	
	this.setProperty ( "tooltip", tooltip );
	if ( this.isAttached == true ) {
		this.setProperty ( "title", Resolver.resolve ( tooltip ));
	}
}

/** 
 * Get tooltip.
 * @return {string}
 */
ButtonBinding.prototype.getToolTip = function () {
	
	return this.getProperty ( "tooltip" );
}

/**
 * Set image profile. The button constructs a default imageprofile, 
 * so this should only be used in special cases.
 * @param {Class} imageProfileImplementation
 */
ButtonBinding.prototype.setImageProfile = function ( imageProfileImplementation ) {
	
	this.imageProfile = new imageProfileImplementation ( this );
}

/**
 * Note that this will convert the button to a checkboxbutton.
 * @param {object} arg This can be either a string or a {@link PopupBinding}.
 */
ButtonBinding.prototype.setPopup = function ( arg ) {

	this.popupBinding = this.getBindingForArgument ( arg );

	if ( this.popupBinding ) {
		this.setType ( ButtonBinding.TYPE_CHECKBUTTON );
		if ( !this.popupBindingTargetElement ) {
			this.popupBindingTargetElement = this.bindingElement;
		}
		var self = this;
		this.popupBinding.addActionListener ( PopupBinding.ACTION_HIDE, {
			handleAction : function () {
				if ( self.isChecked == true ) {
					self.uncheck ( true );
				}
			}
		});
	}
}

/**
 * This wil rig up the button to launch an URL in a new browserwindow when clicked.
 * This is *not* done by window.open. Instead, we place a simple link inside the button. 
 * This will trigger Prism to launch the default browser instead of a new Prism window.
 * @param {string} url
 */
ButtonBinding.prototype.setURL = function ( url ) {
	
	if ( this.isAttached == true ) {
		if ( !this.shadowTree.buttonurl ) {
			var a = this.bindingDocument.createElement ( "a" );
			a.className = "buttonurl";
			a.target = "_blank";
			this.shadowTree.buttonurl = a;
			this.bindingElement.appendChild ( a );
		}
		this.shadowTree.buttonurl.href = url;
	}
	this.setProperty ( "url", url );
}

/**
 * Get URL.
 * @return {string}
 */
ButtonBinding.prototype.getURL = function () {
	
	return this.getProperty ( "url" );
}

/**
 * Flip image and text position. This is not supported in IE6.
 * @param @optional {boolean} isFlipped.
 */
ButtonBinding.prototype.flip = function ( isFlipped ) {
	
	isFlipped = isFlipped == null ? true : isFlipped;
	this.isFlipped = isFlipped;
	this.setProperty ( "flip", isFlipped );
	if ( this.isAttached ) {
		this.labelBinding.flip ( isFlipped );
	}
}

/**
 * Fire command.
 */
ButtonBinding.prototype.fireCommand = function () {

	if (!this.isDisabled) {

		if (this.oncommand != null) {
			this.oncommand();
		}
		this.dispatchAction(this.commandAction);

		this.invokePopup();

	}
}

/**
* Invoke popup.
*/
ButtonBinding.prototype.invokePopup = function () {

	if (!this.isDisabled) {

		if (this.popupBinding) {
			if (!this.isCheckButton || this.isChecked) {
				this.popupBinding.snapTo(this.popupBindingTargetElement);
				this.popupBinding.show();
				this.popupBinding.grabKeyboard();
			} else {
				this.popupBinding.hide();
				this.popupBinding.releaseKeyboard();
			}
		}
	}
}

/**
 * User may define this.
 */
ButtonBinding.prototype.oncommand = null;

/**
 * Invoke button action. Unlike the fireCommand method, this 
 * considers whether or not the button is a checkbox-button.
 */
ButtonBinding.prototype.invoke = function () {

	if ( !this.isCheckButton ) {
		this.fireCommand ();
	} else {
		if ( this.isChecked ) {
			this.uncheck ();
		} else {
			this.check ();
		}
	}
}

/**
 * Check button.
 * @param {boolean} isDisableCommand
 */
ButtonBinding.prototype.check = function ( isDisableCommand ) {
	
	if (( this.isCheckButton || this.isRadioButton ) && !this.isChecked ) {
		if ( this.isAttached == true ) {
			this._check ();
			if ( !isDisableCommand == true ) {
				this.fireCommand ();
			}
		} else {
			this.setProperty("ischecked", true);
		}
		
	}
}

/**
 * Isolated so that ButtonStateManager may control these properties.
 * @param {boolean} isStateManager
 */
ButtonBinding.prototype._check = function ( isStateManager ) {

	this.isActive = true;
	this.isChecked = true;
	if ( !isStateManager ) {
		this._stateManager.invokeActiveState ();
	}
	this.setProperty("ischecked", true);
}

/**
 * Uncheck button.
 * @param {boolean} isDisableCommand
 */
ButtonBinding.prototype.uncheck = function ( isDisableCommand ) {

	if (( this.isCheckButton || this.isRadioButton ) && this.isChecked ) {
		if (this.isAttached == true && !this.isDisposed) {
			this._uncheck();
			if (!isDisableCommand == true) {
				this.fireCommand();
			}
		} else {
			this.setProperty("ischecked", false);
		}

	}
}

/**
 * Isolated so that ButtonStateManager may control these properties.
 * @param {boolean} isStateManager
 */
ButtonBinding.prototype._uncheck = function ( isStateManager ) {

	this.isActive = false;
	this.isChecked = false;
	if ( !isStateManager ) {
		this._stateManager.invokeNormalState ();
	}
	this.setProperty("ischecked", false);
}

/**
 * Check / uncheck button.
 * @param {boolean} isChecked
 * @param {boolean} isDisableCommand
 */
ButtonBinding.prototype.setChecked = function ( isChecked, isDisableCommand ) {
	
	if ( isChecked == null ) {
		isChecked == false;
	}
	
	if ( this.isCheckButton || this.isRadioButton ) {
		switch ( isChecked ) {
			case true :
				this.check ( isDisableCommand );
				break;
			case false :
				this.uncheck ( isDisableCommand );
				break;
		}
	}
}

/**
 * Set button disabled status.
 * @param {boolean} bool
 */
ButtonBinding.prototype.setDisabled = function ( bool ) {
	
	if ( bool == null ) { // for automated propertyMethodMap to function, see DocumentManager#_backupattributes
		bool = false;
	}
	
	this.isDisabled = bool;
	
	switch ( bool ) {
		case true :
			this.bindingElement.setAttribute ( "title", "" );
			this.setProperty ( "isdisabled", true );
			if ( this._stateManager != null ) {
				this._stateManager.invokeDisabledState ();
			}
			break;
		case false :
			this.deleteProperty ( "isdisabled" );
			var tooltip = this.getProperty ( "tooltip" );
			if ( tooltip ) {
				this.setToolTip ( tooltip );
			}
			if ( this._stateManager != null ) {
				this._stateManager.invokeNormalState ();
			}
			break;
	}
	
	if ( this._isFocusableButton == true ) {
		this.isFocusable = !this.isDisabled;
		this.dispatchAction ( FocusBinding.ACTION_UPDATE );
	}
}

/**
 * Disable button.
 */
ButtonBinding.prototype.disable = function () {

	this.setDisabled ( true );
}

/**
 * Enable button.
 */
ButtonBinding.prototype.enable = function () {

	this.setDisabled ( false );
}

/**
 * Focus.
 * @implements {IFocusable}
 */
ButtonBinding.prototype.focus = function () {
	
	if ( this.isFocusable && !this.isFocused ) {
		this.isFocused = true;
		FocusBinding.focusElement ( this.bindingElement );
		this.dispatchAction ( Binding.ACTION_FOCUSED );
	}
}

/**
 * Blur.
 * @implements {IFocusable}
 */
ButtonBinding.prototype.blur = function () {
	
	if ( this.isFocusable && this.isFocused ) {
		this.isFocused = false;
		this.dispatchAction ( Binding.ACTION_BLURRED );
	}
}

/**
 * Action on mouse down. Invoked by the ButtonStageManager.
 * @see {ButtonStateManager#handleEvent}
 */
ButtonBinding.prototype.onMouseDown = function () {

	EventBroadcaster.broadcast ( BroadcastMessages.MOUSEEVENT_MOUSEDOWN, this );
	this.dispatchAction ( Binding.ACTION_ACTIVATED );
}

/**
 * Action on mouse up.
 * @see {ButtonStateManager#handleEvent}
 */
ButtonBinding.prototype.onMouseUp = function () {

	EventBroadcaster.broadcast ( BroadcastMessages.MOUSEEVENT_MOUSEUP, this );
}

/**
 * Get width. Actually, get width of the labelbinding. Used for equalsizing buttons. 
 * Notice that this getter changes the layout, so we should ONLY use it for equalsizing!
 * @see {ToolBarBodyBinding#_enforceEqualSize}
 * @return {int}
 */
ButtonBinding.prototype.getEqualSizeWidth = function () {

	var result = null;
	if ( this.isAttached == true ) {
		this.labelBinding.shadowTree.labelBody.style.marginLeft = "0";
		this.labelBinding.shadowTree.labelBody.style.marginRight = "0";
		result = this.labelBinding.bindingElement.offsetWidth;
	} else {
		throw "ButtonBinding: getEqualSizeWidth failed for non-attached button.";
	}
	return result;
}

/**
 * Set width. Actually; in order to center labelbinding, this will 
 * be computed around and applied as margins on the label. This method 
 * should only be invoked while equalsizing buttons.
 * @see {ToolBarBodyBinding#_enforceEqualSize} 
 * @param {int} goal
 */
ButtonBinding.prototype.setEqualSizeWidth = function ( goal ) {
	
	if ( this.isAttached == true ) {
		var width = this.getEqualSizeWidth ();
		if ( goal > width ) {
			var diff = goal - width;
			var marg = Math.floor ( diff * 0.5 );
			this.labelBinding.shadowTree.labelBody.style.setProperty("margin-left", marg + "px", "important");
			this.labelBinding.shadowTree.labelBody.style.setProperty("margin-right", marg + "px", "important");
		}
	}
}

/**
 * Get width.
 * @return {int} width
 */
ButtonBinding.prototype.getWidth = function () {
	
	var result = null;
	return this.bindingElement.offsetWidth;
}

/**
 * Set width (technically by adjusting the width of the center tablecell).
 * @param {int} width
 */
ButtonBinding.prototype.setWidth = function ( width ) {
	

	if (width >= 0) {
		this.bindingElement.style.width = new String(width + "px");
	}

	this.setProperty ( "width", width );
}

//IMPLEMENT IDATA..........................................

/**
 * Validate.
 * @return {boolean}
 */
ButtonBinding.prototype.validate = function () {
	
	return true; // hardcoded!
}

/**
 * Manifest. This will write form elements into page DOM 
 * so that the server recieves something on form submit.
 */
ButtonBinding.prototype.manifest = function () {}

/**
 * Pollute dirty flag.
 */
ButtonBinding.prototype.dirty = DataBinding.prototype.dirty;

/**
 * Clean dirty flag.
 */
ButtonBinding.prototype.clean = DataBinding.prototype.clean;

/**
 * Get name.
 * @return {string}
 */
ButtonBinding.prototype.getName = function () {}

/**
 * Get value. This is intended for serverside processing.
 * @return {string}
 */
ButtonBinding.prototype.getValue = function () {
	
	return this.shadowTree.dotnetinput.value;
}

/**
 * Set value.
 * @param {string} value
 */
ButtonBinding.prototype.setValue = function ( value ) {
	
	this.shadowTree.dotnetinput.value = value;
}

/**
 * Get result. This is intended for clientside processing.
 * @return {object}
 */
ButtonBinding.prototype.getResult = function () {
	
	return this.getValue ();
}

/**
 * Set result.
 * @see {DataManager#populateDataBindings}
 * @param {object} result
 */
ButtonBinding.prototype.setResult = function ( result ) {
	
	this.setValue ( result );
}