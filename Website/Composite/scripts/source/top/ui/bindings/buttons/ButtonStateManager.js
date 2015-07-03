ButtonStateManager.STATE_NORMAL	= 0;
ButtonStateManager.STATE_HOVER	= 1;
ButtonStateManager.STATE_ACTIVE	= 2;
ButtonStateManager.RIGHT_BUTTON = 2;

/**
 * @class
 * Better externalize this complex stuff from the ButtonBinding.
 * @param {ButtonBinding} binding
 */
function ButtonStateManager ( binding ) {
	
	/**
	 * @type {SystemLogger}
	 */
	this.logger = SystemLogger.getLogger ( "ButtonStateManager" );
	
	/**
	 * @type {ButtonBinding}
	 */
	this.binding = binding;
	
	/**
	 * @type {ImageProfile}
	 */
	this.imageProfile = binding.imageProfile;

	/* 
	 * Assigning event listener.
	 */
	this.assignDOMEvents(true);

	/*
	* Returnable.
	*/
	return this;
}

/**
 * Assigning DOM event listeners.
 */
ButtonStateManager.prototype.assignDOMEvents = function ( isAssign ) {
	
	var action = isAssign ? "addEventListener" : "removeEventListener";
	
	this.binding [ action ] ( DOMEvents.MOUSEENTER, this );
	this.binding [ action ] ( DOMEvents.MOUSELEAVE, this );
	this.binding [ action ] ( DOMEvents.MOUSEDOWN, this );
	this.binding [ action ] ( DOMEvents.MOUSEUP, this );
}

/**
 * Cleanup.
 * @see {ButtonBinding#onBindingDispose}
 */
ButtonStateManager.prototype.dispose = function () {
	
	this.assignDOMEvents ( false );
	this.binding = null;
	this.imageProfile = null;
}

/** 
 * TODO: Split into multiple methods.
 * @mplements {IEventListener}.
 * @param {MouseEvent} e
 */
ButtonStateManager.prototype.handleEvent = function (e) {

	if (Binding.exists(this.binding) && !this.binding.isDisabled && !BindingDragger.isDragging) {

		var isCommand = false, isPopup = false, state = null;

		if (e.button == ButtonStateManager.RIGHT_BUTTON) {
			// do nothing - right clicks are handled by the contextmenu property
		}
		else if (this.binding.isCheckBox) {

			switch (e.type) {
				case DOMEvents.MOUSEENTER:
				case DOMEvents.MOUSEOVER:
					state = ButtonStateManager.STATE_HOVER; // image decision left to imageprofile!
					break;
				case DOMEvents.MOUSELEAVE:
				case DOMEvents.MOUSEOUT:
					state = this.binding.isChecked ? ButtonStateManager.STATE_ACTIVE : ButtonStateManager.STATE_NORMAL;
					break;
				case DOMEvents.MOUSEDOWN:
					state = ButtonStateManager.STATE_HOVER;
					break;
				case DOMEvents.MOUSEUP:
					this.binding.isChecked = !this.binding.isChecked;
					state = this.binding.isChecked ? ButtonStateManager.STATE_ACTIVE : ButtonStateManager.STATE_NORMAL;
					if (state == ButtonStateManager.STATE_ACTIVE) {
						this.binding._check(true);
					} else {
						this.binding._uncheck(true);
					}
					isCommand = true;
					break;
			}
		}
		else if (this.binding.isComboButton) {
			switch (e.type) {
				case DOMEvents.MOUSEENTER:
				case DOMEvents.MOUSEOVER:
					state = ButtonStateManager.STATE_HOVER;
					break;
				case DOMEvents.MOUSELEAVE:
				case DOMEvents.MOUSEOUT:
					state = ButtonStateManager.STATE_NORMAL;
					break;
				case DOMEvents.MOUSEDOWN:
					state = ButtonStateManager.STATE_ACTIVE;
					break;
				case DOMEvents.MOUSEUP:
					state = ButtonStateManager.STATE_NORMAL;
					var targetBinding = UserInterface.getBinding(e.target ? e.target : e.srcElement);
					if (targetBinding instanceof ComboBoxBinding) {
						this.binding.isChecked = !this.binding.isChecked;
						state = this.binding.isChecked ? ButtonStateManager.STATE_ACTIVE : ButtonStateManager.STATE_NORMAL;
						if (state == ButtonStateManager.STATE_ACTIVE) {
							this.binding._check(true);
						} else {
							this.binding._uncheck(true);
						}
						isPopup = true;
					}
					else {
						if (this.binding.isChecked)
							this.binding._uncheck(true);
						state = ButtonStateManager.STATE_NORMAL;
						isCommand = true;
					}
					break;
			}
		}
		else if (this.binding.isCheckButton || this.binding.isRadioButton) {

			switch (e.type) {
				case DOMEvents.MOUSEENTER:
				case DOMEvents.MOUSEOVER:
					if (!this.binding.isChecked) {
						state = ButtonStateManager.STATE_HOVER;
					}
					break;
				case DOMEvents.MOUSELEAVE:
				case DOMEvents.MOUSEOUT:
					if (!this.binding.isChecked) { // TODO: CHECK DESCENDANT TARGET!
						state = ButtonStateManager.STATE_NORMAL;
					}
					break;
				case DOMEvents.MOUSEDOWN:
					state = ButtonStateManager.STATE_ACTIVE;
					break;
				case DOMEvents.MOUSEUP:
					if (this.binding.isCheckButton || !this.binding.isChecked) {
						this.binding.isChecked = !this.binding.isChecked;
						state = this.binding.isChecked ? ButtonStateManager.STATE_ACTIVE : ButtonStateManager.STATE_NORMAL;
						if (state == ButtonStateManager.STATE_ACTIVE) {
							this.binding._check(true);
						} else {
							this.binding._uncheck(true);
						}
						isCommand = true;
					}
					break;
			}
		}
		else {
			switch (e.type) {
				case DOMEvents.MOUSEENTER:
				case DOMEvents.MOUSEOVER:
					state = ButtonStateManager.STATE_HOVER;
					break;
				case DOMEvents.MOUSELEAVE:
				case DOMEvents.MOUSEOUT:
					state = ButtonStateManager.STATE_NORMAL;
					break;
				case DOMEvents.MOUSEDOWN:
					state = ButtonStateManager.STATE_ACTIVE;
					break;
				case DOMEvents.MOUSEUP:
					state = ButtonStateManager.STATE_NORMAL;
					isCommand = true;
					break;
			}
		}
		switch (state) {
			case ButtonStateManager.STATE_NORMAL:
				this.invokeNormalState();
				break;
			case ButtonStateManager.STATE_HOVER:
				this.invokeHoverState();
				break;
			case ButtonStateManager.STATE_ACTIVE:
				this.invokeActiveState();
				break;
		}

		/*
		* Please note that the button command is invoked here!
		*/
		if (isCommand) {
			this.binding.fireCommand();
		}

		if (isPopup) {
			this.binding.invokePopup();
		}

		/*
		* Check patches explorer in case fireCommand 
		* closed the containing window.
		*/
		if (Binding.exists(this.binding) == true) {

			/*
			* Consuming the event!
			*/
			DOMEvents.stopPropagation(e);

			/*
			* Broadcast mousedown and mouseup to close open popups and menupopups. 
			* Notice that our binding is broadcasted as argument. This will prevent 
			* popups associated to *our* binding from closing as soon as it opens. 
			* The broadcast argument should really be a MouseEvent, so this is 
			* really a terrible way to handle the popup display status problem. 
			* UPDATE: we now use Bindings as arguments in other scenarios.
			* @see {PopupBinding#handleBroadcast}
			*/
			switch (e.type) {
				case DOMEvents.MOUSEDOWN:
					this.binding.onMouseDown();
					break;
				case DOMEvents.MOUSEUP:
					this.binding.onMouseUp();
					break;
			}
		}
	}
}

/**
 * Invoke normal state.
 */
ButtonStateManager.prototype.invokeNormalState = function () {

	this.binding.detachClassName ( "hover" );
	this.binding.detachClassName ( "active" );
	this.binding.detachClassName ( "isdisabled" );
}

/**
 * Invoke hover state.
 */
ButtonStateManager.prototype.invokeHoverState = function () {

	this.binding.attachClassName ( "hover" );
	this.binding.detachClassName ( "active" );
}

/**
 * Invoke active state.
 */
ButtonStateManager.prototype.invokeActiveState = function () {

	this.binding.attachClassName ( "active" );
	this.binding.detachClassName ( "hover" );
}

/**
 * Invoke disabled state. This method gets invoked by the button.
 * @see {ButtonBinding#setDisabled}
 */
ButtonStateManager.prototype.invokeDisabledState = function () {

	this.binding.detachClassName ( "hover" );
	this.binding.detachClassName ( "active" );
	this.binding.attachClassName ( "isdisabled" );
}