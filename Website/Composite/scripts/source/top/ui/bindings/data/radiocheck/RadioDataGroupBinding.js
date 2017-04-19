RadioDataGroupBinding.prototype = new RadioGroupBinding;
RadioDataGroupBinding.prototype.constructor = RadioDataGroupBinding;
RadioDataGroupBinding.superclass = RadioGroupBinding.prototype;

/**
 * @class
 * @implements {IData}
 */
function RadioDataGroupBinding () {

	/**
	 * @type {SystemLogger}
	 */
	this.logger = SystemLogger.getLogger ( "RadioDataGroupBinding" );
	
	/**
	 * @type {string}
	 */
	this._name = null;
	
	/**
	 * @type {boolean}
	 */
	this.isDirty = false;
	
	/**
	 * @type {boolean}
	 */
	this._hasFocus = false;
	
	/**
	 * @implements {IData}
	 * @type {boolean}
	 */
	this.isFocusable = true;
	
	/**
	 * @implements {IData}
	 * @type {boolean}
	 */
	this.isFocused = false;
}

/**
 * Identifies binding.
 */
RadioDataGroupBinding.prototype.toString = function () {

	return "[RadioDataGroupBinding]";
}

/**
 * @overloads {RadioGroupBinding#onBindingRegister}
 */
RadioDataGroupBinding.prototype.onBindingRegister = function () {
	
	RadioDataGroupBinding.superclass.onBindingRegister.call ( this );
	DataBinding.prototype.onBindingRegister.call ( this );
	this.addActionListener ( RadioGroupBinding.ACTION_SELECTIONCHANGED, this );
}

/**
 * @overloads {RadioGroupBinding#onBindingAttach}
 */
RadioDataGroupBinding.prototype.onBindingAttach = function () {
	
	RadioDataGroupBinding.superclass.onBindingAttach.call ( this );
	
	this.bindingElement.tabIndex = 0;
	if ( Client.isExplorer ) {
		this.bindingElement.hideFocus = true;
	}
	
	var self = this;
	DOMEvents.addEventListener ( this.bindingElement, DOMEvents.FOCUS, {
		handleEvent : function () {
			self.focus ( true );
		}
	});

	var onchange = this.getProperty("onchange");
	if (onchange) {
		this.onValueChange = function () {
			Binding.evaluate(onchange, this);
		};
	}
}

/**
 * @overloads {Binding#onBindingDispose}
 */
RadioDataGroupBinding.prototype.onBindingDispose = function () {
	
	RadioDataGroupBinding.superclass.onBindingDispose.call ( this );
	DataBinding.prototype.onBindingDispose.call ( this );
}

/**
 * Dispatching dirty events.
 * @implements {IActionListener}
 * @overloads {RadioGroupBinding#handleAction}
 * @param {Action} action
 */
RadioDataGroupBinding.prototype.handleAction = function ( action ) {
	
	RadioDataGroupBinding.superclass.handleAction.call ( this, action );
	
	switch ( action.type ) {
		case RadioGroupBinding.ACTION_SELECTIONCHANGED :
			this.dirty();
			this.onValueChange();
			break;
	}
}

/**
 * We need to trap the arrowkey events in order to stop the page from scrolling 
 * when radiobuttons are keyboardnavigated. Notice that keyboardhandling by itself 
 * is handled similarly to other DataBindings (using the EventBroadcaster).
 * @implements {IEventListener}
 * @overloads {Binding#handleEvent}
 * @param {KeyEvent} e
 */
RadioDataGroupBinding.prototype.handleEvent = function ( e ) {
	
	RadioDataGroupBinding.superclass.handleEvent.call ( this, e );
	
	if ( e.type == DOMEvents.KEYDOWN ) {
		switch ( e.keyCode ) {
			case KeyEventCodes.VK_DOWN :
			case KeyEventCodes.VK_UP :
				DOMEvents.stopPropagation ( e );
				DOMEvents.preventDefault ( e );
				Keyboard.keyArrow ( e.keyCode ); // will trigger EventBroadcaster
				break;
		}
	}
}

/**
 * @implements {IBroadcastListener}
 * @param {string} broadcast
 * @param {object} arg
 */
RadioDataGroupBinding.prototype.handleBroadcast = function ( broadcast, arg ) {
	
	RadioDataGroupBinding.superclass.handleBroadcast.call ( this, broadcast, arg );
	
	switch ( broadcast ) {
		case BroadcastMessages.KEY_ARROW :
		
			var current = null;
			var next = null;
			var radios = null;
			
			switch ( arg ) {
				case KeyEventCodes.VK_DOWN :
				case KeyEventCodes.VK_UP :
					radios = this.getChildBindingsByLocalName ( "radio" );
					while ( !current && radios.hasNext ()) { 
						var radio = radios.getNext ();
						if ( radio.getProperty ( "ischecked" )) {
							current = radio;
						}
					};
					break;
			}
			if ( current ) {
				switch ( arg ) {
					case KeyEventCodes.VK_DOWN :
						next = radios.getFollowing ( current );
						while ( next != null && next.isDisabled ) {
							next = radios.getFollowing ( next );
						}
						break;
					case KeyEventCodes.VK_UP :
						next = radios.getPreceding ( current );
						while ( next != null && next.isDisabled ) {
							next = radios.getPreceding ( next );
						}
						break;
				}
			}
			if ( next != null ) {
				this.setCheckedButtonBinding ( next );
			}
			break;
	}
}

/**
 * Set name. The name property is registered with the window-scope  
 * {@link DocumentManager} for easy retrieval in other contexts.
 * @param {string} name
 */
RadioDataGroupBinding.prototype.setName = DataBinding.prototype.setName;

/**
 * Get name.
 * @implements {IData}
 * @return {string}
 */
RadioDataGroupBinding.prototype.getName = DataBinding.prototype.getName;

/**
 * Set dirty flag.
 * @implements {IData}
 */
RadioDataGroupBinding.prototype.dirty = DataBinding.prototype.dirty;

/**
 * Reset dirty flag.
 * @implements {IData}
 */
RadioDataGroupBinding.prototype.clean = DataBinding.prototype.clean;

/**
 * Focus.
 * @param {boolean} isDOMEvent
 * @implements {IData}
 */
RadioDataGroupBinding.prototype.focus = function ( isDOMEvent ) {
	
	if ( !this.isFocused ) {
		DataBinding.prototype.focus.call ( this );
		if ( this.isFocused ) {
			if ( !isDOMEvent ) {
				FocusBinding.focusElement ( this.bindingElement );
			}
			this.addEventListener ( DOMEvents.KEYDOWN );
			this.subscribe ( BroadcastMessages.KEY_ARROW );
		}
	}
}

/**
 * Blur.
 * @implements {IData}
 */
RadioDataGroupBinding.prototype.blur = function () {
	
	if ( this.isFocused ) {
		DataBinding.prototype.blur.call ( this );
		this.removeEventListener ( DOMEvents.KEYDOWN );
		this.unsubscribe ( BroadcastMessages.KEY_ARROW );	
	}
}

/**
 * Validate.
 * @implements {IData}
 * @return {boolean}
 */
RadioDataGroupBinding.prototype.validate = function () {
	
	return true; // TODO: validate "required"! Do we even wan't to support this?
}

/**
 * Manifest. This will write form elements into page DOM 
 * so that the server recieves something on form submit.
 * @implements {IData}
 */
RadioDataGroupBinding.prototype.manifest = function () {
	
	if ( this.isAttached ) {
		if ( !this.shadowTree.input ) {
			var input = DOMUtil.createElementNS ( 
				Constants.NS_XHTML, "input", this.bindingDocument
			);
			input.type = "hidden";
			input.name = this._name;
			this.bindingElement.appendChild ( input );
			this.shadowTree.input = input;
		}
		this.shadowTree.input.value = this.getValue ();
	}
}

/**
 * Get value. This is intended for serversice processing.
 * @implements {IData}
 * @return {string}
 */
RadioDataGroupBinding.prototype.getValue = function () {
	
	var result = null;
	var radios = this.getChildBindingsByLocalName ( "radio" );
	while ( !result && radios.hasNext ()) { 
		var radio = radios.getNext ();
		if ( radio.isChecked ) {
			result = radio.getProperty ( "value" );
		}
	};
	return result;
}

/**
 * Get result. This is intended for clientside processing.
 * @implements {IData}
 * @return {object}
 */
RadioDataGroupBinding.prototype.getResult = RadioDataGroupBinding.prototype.getValue;

/**
 * Set value.
 * TODO!
 * @implements {IData}
 * @param {string} value
 */
RadioDataGroupBinding.prototype.setValue = function ( value ) {}

/**
 * Set result.
 * TODO!
 * @implements {IData}
 * @param {object} result
 */
RadioDataGroupBinding.prototype.setResult = function (result) { }

RadioDataGroupBinding.prototype.onValueChange = function () { }