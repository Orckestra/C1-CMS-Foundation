RadioDataBinding.prototype = new Binding;
RadioDataBinding.prototype.constructor = RadioDataBinding;
RadioDataBinding.superclass = Binding.prototype;

/**
 * @class
 * TODO: note on how RadioGroupBindings handles only buttons
 */
function RadioDataBinding () {

	/**
	 * @type {SystemLogger}
	 */
	this.logger = SystemLogger.getLogger ( "RadioDataBinding" );
	
	/** 
	 * This has something to do with the mechanics of the containing RadioDataGroup.
	 * @type {boolean}
	 */
	this.isRadioButton = false;
	
	/** 
	 * @type {boolean}
	 */
	this.isChecked = false;
	
	/** 
	 * TODO: implement this some day!
	 * @type {object}
	 */
	this._result = null;
	
	/**
	 * @type {string}
	 */
	this.bindingRelate = null;
	
	/*
	 * Returnable. 
	 */
	return this;
}

/**
 * Identifies binding.
 */
RadioDataBinding.prototype.toString = function () {

	return "[RadioDataBinding]";
}

/*
 * Build radiobutton on REGISTER already. This because of radiogroup initialization.
 */
RadioDataBinding.prototype.onBindingRegister = function () {
	
	RadioDataBinding.superclass.onBindingRegister.call ( this );
	
	this._buttonBinding = this.add ( 
		RadioButtonBinding.newInstance ( this.bindingDocument )
	);
	this._hack ();
	
	if ( this.getProperty ( "ischecked" ) == true ) {
		this.check ( true );
	}
	
}

/**
 * @overloads {Binding#onBindingAttach}
 */
RadioDataBinding.prototype.onBindingAttach = function () {

	RadioDataBinding.superclass.onBindingAttach.call ( this );
	
	this.attachClassName ( Binding.CLASSNAME_CLEARFLOAT );
	this._buttonBinding.attach ();
	this._buildDOMContent ();
}

/**
 * Build DOM content.
 */
RadioDataBinding.prototype._buildDOMContent = function () {
	
	var relate = this.getProperty ( "relate" );
	var oncommand = this.getProperty("oncommand");
	var disabled = this.getProperty("isdisabled");
	
	if ( relate ) {
		this.bindingRelate = relate;
		this.relate ();
	}
	if ( oncommand ) {
		this.oncommand = function () {
			Binding.evaluate ( oncommand, this );
		};
	}

	if (disabled == true) {
		this.disable();
	}

	/*
	 * Setup ASP.NET callback.
	 */
	if ( this.hasCallBackID ()) {
		Binding.dotnetify ( this );
	}
	
	this._buildLabelText ();
}

/**
 * Broadcast relation.
 */
RadioDataBinding.prototype.relate = function () {
	
	if ( this.bindingRelate != null ) {
		this.logger.warn ( "Relations not properly implemented!" ); // see method setChecked...
		EventBroadcaster.broadcast ( BroadcastMessages.BINDING_RELATE, {
			relate : this.bindingRelate,
			origin : this.bindingDocument,
			result : this.isChecked
		});
	}
}

/**
 * TODO: note on how RadioGroupBindings handles only buttons
 * {@see RadioGroupBinding#setCheckedButtonBinding}
 * @return {RadioButtonBinding}
 */
RadioDataBinding.prototype.getButton = function () {
	
	return this._buttonBinding;
}

/**
 * Shameful hack, all because of Explorers CSS rendering challanges.
 */
RadioDataBinding.prototype._hack = function () {

	var self = this;
	var callbackid = this.getCallBackID ();
	
	this._buttonBinding.check = function ( isDisableCommand ) {
		RadioButtonBinding.prototype.check.call ( this, isDisableCommand );
		self.setProperty ( "ischecked", true );
		self.isChecked = true;
		self.relate ();
	}
	
	this._buttonBinding.uncheck = function ( isDisableCommand ) {
		RadioButtonBinding.prototype.uncheck.call ( this, isDisableCommand );
		self.deleteProperty ( "ischecked" );
		self.isChecked = false;
		self.relate ();
	}
	
	this._buttonBinding.oncommand = function () {
		self.isChecked = this.isChecked;
		self.setProperty("ischecked", self.isChecked);
		self.relate ();
		if ( Types.isFunction ( self.oncommand )) {
			self.oncommand ();
		}	
	}
}

/**
 * @param {boolean} isChecked
 * @param {boolean} isDisableCommand Optional.
 */
RadioDataBinding.prototype.setChecked = function ( isChecked, isDisableCommand ) {
	
	//if ( this.isAttched == true ) {
	this._buttonBinding.setChecked ( isChecked, isDisableCommand );
	if ( this.bindingRelate != null ) {
		this.relate (); // TOOOOOOOOOOOOOOO EARLY ON REGISTER!!!!!!!!!!!!!!!!!!!!!!!!!!!
	}
	//}
	this.setProperty ( "ischecked", isChecked );
}

/**
 * @param {boolean} isDisableCommand Optional.
 */
RadioDataBinding.prototype.check = function ( isDisableCommand ) {
	
	this.setChecked ( true, isDisableCommand );	
}

/**
 * @param {boolean} isDisableCommand Optional.
 */
RadioDataBinding.prototype.uncheck = function ( isDisableCommand ) {
	
	this.setChecked ( false, isDisableCommand );	
}

/**
 * Flip disabled.
 * @param {boolean} isDisabled
 */
RadioDataBinding.prototype.setDisabled = function ( isDisabled ) {
	
	if ( isDisabled != this.isDisabled ) {
		this.isDisabled = isDisabled;
		this._buttonBinding.setDisabled ( isDisabled );
		if ( isDisabled ) {
			this.attachClassName ( DataBinding.CLASSNAME_DISABLED );
		} else {
			this.detachClassName ( DataBinding.CLASSNAME_DISABLED );
		}
	}
}

/**
 * Disable.
 */
RadioDataBinding.prototype.disable = function () {

	if ( !this.isDisabled ) {
		this.setDisabled ( true );
	}
}

/**
 * Enable.
 */
RadioDataBinding.prototype.enable = function () {
	
	if ( this.isDisabled ) {
		this.setDisabled ( false );
	}
}

/**
 * @implements {IEventListener}
 * @overloads {Binding#handleEvent}
 * @param {MouseEvent} e
 */
RadioDataBinding.prototype.handleEvent = function ( e ) {
	
	RadioDataBinding.superclass.handleEvent.call ( this, e );
	
	if ( e.type == DOMEvents.CLICK ) {
		var target = DOMEvents.getTarget ( e );
		switch( target ) {
			case this.shadowTree.labelText :
				if ( !this.isChecked && !this.isDisabled ) {
					this.check ();
				}
				break;
		}
	}
}

/**
 * Explorer cannot overwrite inherited "white-space: nowrap" 
 * in a regular button, so we need to build a special label.
 */
RadioDataBinding.prototype._buildLabelText = function () {
	
	var label = this.getProperty ( "label" );
	if ( label ) {
		this.shadowTree.labelText = DOMUtil.createElementNS ( 
			Constants.NS_UI, 
			"ui:datalabeltext", 
			this.bindingDocument 
		);
		this.shadowTree.labelText.appendChild ( 
			this.bindingDocument.createTextNode ( 
				Resolver.resolve ( label )
			)
		);
		DOMEvents.addEventListener ( 
			this.shadowTree.labelText, 
			DOMEvents.CLICK, 
			this 
		);
		this.bindingElement.appendChild ( 
			this.shadowTree.labelText 
		);
	}
}

/**
 * Set label.
 * @param {string} label
 */
RadioDataBinding.prototype.setLabel = function ( label ) {
	
	if ( this.shadowTree.labelText != null ) {
		this.shadowTree.labelText.firstChild.data = label;
	}
	this.setProperty ( "label", label );
}


/**
 * Handle element update.
 * @implements {IUpdateHandler}
 * @overwrites {Binding#handleElement}
 * @param {Element} element
 * @return {boolean}
 */
RadioDataBinding.prototype.handleElement = function (element) {

	return true;
};

/** 
 * Update element.
 * @implements {IUpdateHandler}
 * @overwrites {Binding#updateElement}
 * @param {Element} element
 * @return {boolean}
 */
RadioDataBinding.prototype.updateElement = function (element) {

	var ischecked = element.getAttribute("ischecked") === "true";
	if (this.isChecked != ischecked) {
		this.setChecked(ischecked, true);
	}
	return true;
};