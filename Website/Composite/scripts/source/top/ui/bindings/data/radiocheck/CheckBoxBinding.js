CheckBoxBinding.prototype = new Binding;
CheckBoxBinding.prototype.constructor = CheckBoxBinding;
CheckBoxBinding.superclass = Binding.prototype;

CheckBoxBinding.ACTION_COMMAND = "checkbox command";

/**
 * @class
 * @implements {IData}
 */
function CheckBoxBinding () {

	/**
	 * @type {SystemLogger}
	 */
	this.logger = SystemLogger.getLogger ( "CheckBoxBinding" );
	
	/**
	 * @type {CheckButtonBinding}
	 */
	this._buttonBinding = null;
	
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
	this.isChecked = false;
	
	/**
	 * @type {object}
	 */
	this._result = null;
	
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
CheckBoxBinding.prototype.toString = function () {
	
	return "[CheckBoxBinding]";
}

/**
 * Register databinding.
 * @overloads {Binding#onBindingRegister}.
 */
CheckBoxBinding.prototype.onBindingRegister = function () {
	
	/*
	 * The button must be buld now so that we can check it before attachment...
	 */
	CheckBoxBinding.superclass.onBindingRegister.call ( this );
	DataBinding.prototype.onBindingRegister.call ( this );
	this._buildButtonBinding ();

};

/**
 * @overloads {Binding#onBindingAttach}
 */
CheckBoxBinding.prototype.onBindingAttach = function () {
	
	CheckBoxBinding.superclass.onBindingAttach.call ( this );
	this.attachClassName ( Binding.CLASSNAME_CLEARFLOAT );
	
	this.bindingElement.tabIndex = 0;
	if ( Client.isExplorer ) {
		this.bindingElement.hideFocus = true;
	}
	
	this._buildDOMContent ();
}

/**
 * Unregister binding with the window-scope {@link DataManager}.
 * @overloads {Binding#onBindingDispose}
 */
CheckBoxBinding.prototype.onBindingDispose = function () {
	
	CheckBoxBinding.superclass.onBindingRegister.call ( this );
	DataBinding.prototype.onBindingDispose.call ( this );
}


/**
 * Build DOM content.
 */
CheckBoxBinding.prototype._buildDOMContent = RadioDataBinding.prototype._buildDOMContent;

/**
 * Makes the label active.
 * @implements {IEventListener}
 * @param {Event} e
 */
CheckBoxBinding.prototype.handleEvent = function ( e ) {

	CheckBoxBinding.superclass.handleEvent.call ( this, e );
	
	if ( e.type == DOMEvents.CLICK ) {
		var target = DOMEvents.getTarget ( e );
		switch( target ) {
			case this.shadowTree.labelText :
				this.setChecked ( !this.isChecked );
				break;
		}
	}
}

/**
 * Relate binding.
 */
CheckBoxBinding.prototype.relate = RadioDataBinding.prototype.relate;

/**
 * Listens for [space] keypress.
 * @implements {IBroadcastListener}
 * @param {string} broadcast
 * @param {object} arg
 */
CheckBoxBinding.prototype.handleBroadcast = function ( broadcast, arg ) {
	
	CheckBoxBinding.superclass.handleBroadcast.call ( this, broadcast, arg );
	
	switch ( broadcast ) {
		case BroadcastMessages.KEY_SPACE :
			this.setChecked ( !this.isChecked );
			break;
	}
}

/**
 * Build button.
 */
CheckBoxBinding.prototype._buildButtonBinding = function () {

	this._buttonBinding = this.add ( 
		CheckButtonBinding.newInstance ( this.bindingDocument )
	);
	
	/*
	 * Consume the button action. 
	 * Dispatch more specific action.
	 */
	var self = this;
	this._buttonBinding.addActionListener ( 
		ButtonBinding.ACTION_COMMAND, {
			handleAction : function ( action ) {
				action.consume ();
				self.dispatchAction ( 
					CheckBoxBinding.ACTION_COMMAND 
				);
			}
		}
	);
	
	this._hack ();
	this._buttonBinding.attach ();
	
	if ( this.getProperty ( "ischecked" )) {
		this.check ( true );
	}
}

/**
 * Shameful hack, all because of Explorers CSS rendering challanges.
 */
CheckBoxBinding.prototype._hack = function () {

	var self = this;
	var callbackid = this.getCallBackID ();
	
	this._buttonBinding.check = function ( isDisableCommand ) {
		ButtonBinding.prototype.check.call ( this, isDisableCommand );
		self.setProperty ( "ischecked", true );
		self.isChecked = true;
		self.relate ();
		if ( !isDisableCommand ) {
			self.focus ();
		}
	};
	
	this._buttonBinding.uncheck = function ( isDisableCommand ) {
		ButtonBinding.prototype.uncheck.call ( this, isDisableCommand );
		self.setProperty ( "ischecked", false );
		self.isChecked = false;
		self.relate ();
	};

	this._buttonBinding.oncommand = function () {
		self.isChecked = this.isChecked;
		self.setProperty("ischecked", self.isChecked);
		self.focus ();
		self.relate ();
		if ( self.oncommand ) {
			self.oncommand ();
		}
		self.dirty ();
		if ( callbackid != null ) {
			self.dispatchAction ( PageBinding.ACTION_DOPOSTBACK );
		}
	};
}

/**
 * @param {boolean} isChecked
 * @param {boolean} isDisableCommand Optional.
 */
CheckBoxBinding.prototype.setChecked = RadioDataBinding.prototype.setChecked;

/**
 * @param {boolean} isDisableCommand Optional.
 */
CheckBoxBinding.prototype.check = RadioDataBinding.prototype.check

/**
 * @param {boolean} isDisableCommand Optional.
 */
CheckBoxBinding.prototype.uncheck = RadioDataBinding.prototype.uncheck

/**
 * Build label.
 */
CheckBoxBinding.prototype._buildLabelText = RadioDataBinding.prototype._buildLabelText;

/**
 * Set label. 
 * @param {string} label
 */
CheckBoxBinding.prototype.setLabel = RadioDataBinding.prototype.setLabel;

/**
 * @implements {IEventListener}
 * @param {MouseEvent} e
 *
CheckBoxBinding.prototype.handleEvent = RadioDataBinding.prototype.handleEvent;
*/


// IMPLEMENT IDATA ...................................................................

/**
 * Set name. The name property is registered with the window-scope  
 * {@link DocumentManager} for easy retrieval in other contexts.
 * @param {string} name
 */
CheckBoxBinding.prototype.setName = DataBinding.prototype.setName;

/**
 * Get name.
 * @implements {IData}
 * @return {string}
 */
CheckBoxBinding.prototype.getName = DataBinding.prototype.getName;

/**
 * Set dirty flag.
 * @implements {IData}
 */
CheckBoxBinding.prototype.dirty = DataBinding.prototype.dirty;

/**
 * Reset dirty flag.
 * @implements {IData}
 */
CheckBoxBinding.prototype.clean = DataBinding.prototype.clean;

/**
 * Focus.
 * @implements {IData}
 */
CheckBoxBinding.prototype.focus = function () {
	
	if ( !this.isFocused ) {
		DataBinding.prototype.focus.call ( this );
		if ( this.isFocused ) {
			FocusBinding.focusElement ( this.bindingElement );
			this.subscribe ( BroadcastMessages.KEY_SPACE );
		}
	}
}

/**
 * Blur.
 * @implements {IData}
 */
CheckBoxBinding.prototype.blur = function () {
	
	if ( this.isFocused ) {
		DataBinding.prototype.blur.call ( this );
		this.unsubscribe ( BroadcastMessages.KEY_SPACE );
	}
}

/**
 * Validate.
 * @implements {IData}
 * @return {boolean}
 */
CheckBoxBinding.prototype.validate = function () {
	
	var result = true;
	var parent = this.bindingElement.parentNode;

	if ( parent ) {
		var binding = UserInterface.getBinding ( parent );
		if ( binding && binding instanceof CheckBoxGroupBinding ) {
			if ( binding.isRequired ) {
				if ( binding.isValid ) {
					result = binding.validate ();
				} else {
					result = false;
				}
			}
		}
	}
	return result
}


/**
 * Handle element update.
 * @implements {IUpdateHandler}
 * @overwrites {Binding#handleElement}
 * @param {Element} element
 * @return {boolean}
 */
CheckBoxBinding.prototype.handleElement = RadioDataBinding.prototype.handleElement;


/** 
 * Update element.
 * @implements {IUpdateHandler}
 * @overwrites {Binding#updateElement}
 * @param {Element} element
 * @return {boolean}
 */
CheckBoxBinding.prototype.updateElement = RadioDataBinding.prototype.updateElement;

/**
 * Manifest. This will write form elements into page DOM 
 * so that the server recieves something on form submit.
 * @implements {IData}
 */
CheckBoxBinding.prototype.manifest = function () {
	
	if ( this.isAttached ) {
		switch ( this.isChecked ) {
			case true :
				if ( !this.shadowTree.input ) {
					var input = DOMUtil.createElementNS ( 
						Constants.NS_XHTML, "input", this.bindingDocument
					);
					input.type = "hidden";
					input.name = this._name;
					input.style.display = "none";
					this.bindingElement.appendChild ( input );
					this.shadowTree.input = input;
				}
				this.shadowTree.input.value = this.getValue ();
				break;
			case false :
				if ( this.shadowTree.input ) {
					this.bindingElement.removeChild ( this.shadowTree.input );
					this.shadowTree.input = null;
				}
				break;
		}
	}
}

/**
 * Get value. This is intended for serverside processing.
 * @implements {IData}
 * @return {string}
 */
CheckBoxBinding.prototype.getValue = function () {
	
	var result = null;
	var value = this.getProperty ( "value" );
	if ( this.isChecked ) {
		result = value ? value : "on";
	}
	return result;
}

/**
 * Set value.
 * @implements {IData}
 * @param {string} value
 */
CheckBoxBinding.prototype.setValue = function ( value ) {
	
	if ( value == this.getValue () || value == "on" ) {
		this.check ( true );
	} else if ( value != "on" ) {
		this.setPropety ( "value", value );
	}
}

/**
 * Get result. This is intended for clientside processing. 
 * If a result is set, it will return false or result. 
 * If not, it will return false or true.
 * @implements {IData}
 * @return {object}
 */
CheckBoxBinding.prototype.getResult = function () {
	
	var result = false;
	if ( this.isChecked ) {
		result = this._result != null ? this._result : true;
	}
	return result;
}

/**
 * Set result.
 * @implements {IData}
 * @param {object} object
 */
CheckBoxBinding.prototype.setResult = function ( object ) {
	
	if ( typeof object == "boolean" ) {
		this.setChecked ( object, true );
	} else {
		this._result = object;
	}
}

/**
 * CheckBoxBinding factory.
 * @param {DOMDocument} ownerDocument
 * @return {CheckBoxBinding}
 */
CheckBoxBinding.newInstance = function ( ownerDocument ) {

	var element = DOMUtil.createElementNS ( Constants.NS_UI, "ui:checkbox", ownerDocument );
	return UserInterface.registerBinding ( element, CheckBoxBinding );
}