RadioGroupBinding.prototype = new Binding;
RadioGroupBinding.prototype.constructor = RadioGroupBinding;
RadioGroupBinding.superclass = Binding.prototype;
RadioGroupBinding.ACTION_SELECTIONCHANGED = "radiogroupselectionchanged";

/**
 * @class
 * Manages checked radiobuttons within descendant element scope.
 */
function RadioGroupBinding () {

	/**
	 * @type {SystemLogger}
	 */
	this.logger = SystemLogger.getLogger ( "RadioGroupBinding" );
	
	/**
	 * @type {Binding}
	 */
	this._checkedRadioBinding = null;
	
	/**
	 * @type {List<ButtonBinding>}
	 */
	this._radioButtonBindings = null;
	
	/**
	 * Flipped when new radiobutton is added.
	 * @see {ButtonBinding#onBindingAttach}
	 * @type {boolean}
	 */
	this._isUpToDate = false;
	
	/*
	 * Returnable.
	 */
	return this;
}

/**
 * Identifies binding.
 */
RadioGroupBinding.prototype.toString = function () {

	return "[RadioGroupBinding]";
}

/** 
 * @overloads {Binding#onBindingRegister}
 */
RadioGroupBinding.prototype.onBindingRegister = function () {

	RadioGroupBinding.superclass.onBindingRegister.call ( this );
	this.addActionListener ( ButtonBinding.ACTION_RADIOBUTTON_ATTACHED, this );
	this.addActionListener ( ButtonBinding.ACTION_COMMAND, this );
}

/**
 * @overloads {Binding#onBindingInitialize}
 */
RadioGroupBinding.prototype.onBindingInitialize = function () {

	var checkedRadioBinding = null;
	this._getRadioButtonBindings ().each ( function ( binding ) {
		if ( binding.getProperty ( "ischecked" )) {
			checkedRadioBinding = binding;
			return false;
		} else {
			return true;
		}
	});
	if ( checkedRadioBinding ) {
		this._checkedRadioBinding = checkedRadioBinding;
	}
	
	RadioGroupBinding.superclass.onBindingInitialize.call ( this );
}

/** 
 * @implements {IActionListener}
 * @overloads {Binding#handleAction}
 * @param {Action} action
 */
RadioGroupBinding.prototype.handleAction = function ( action ) {

	RadioGroupBinding.superclass.handleAction.call ( this, action );
	
	var binding = action.target;
	
	switch ( action.type ) {
		
		case ButtonBinding.ACTION_RADIOBUTTON_ATTACHED :
			this._isUpToDate = false;
			action.consume ();
			break;
			
		case ButtonBinding.ACTION_COMMAND :
			if ( binding.isRadioButton && !binding.isDisabled ) {
				if ( this._checkedRadioBinding ) {
					this._unCheckRadioBindingsExcept ( binding );
				}
				this._checkedRadioBinding = binding;
				this.dispatchAction ( RadioGroupBinding.ACTION_SELECTIONCHANGED );
				
				/*
				 * Sorry - you have to place your listener on the radiogroup!
				 */
				action.consume ();
			}
			break;
	}
}

/**
 * Set checked button.
 * @param {ButtonBinding} binding
 * @param {boolean} isDisableCommand
 */
RadioGroupBinding.prototype.setCheckedButtonBinding = function ( binding, isDisableCommand ) {
	
	if ( binding instanceof RadioDataBinding ) { // not really supposed to go on here!
		binding = binding.getButton ();
	}
	
	if ( binding.isRadioButton ) {
		switch ( isDisableCommand ) {
			case true :
				this._unCheckRadioBindingsExcept ( binding );
				this._checkedRadioBinding = binding;
				binding.check ( true );
				break;
			default :
				binding.check ();
				break;
		}		
	}
}

/**
 * Get checked button.
 * @return {ButtonBinding}
 */
RadioGroupBinding.prototype.getCheckedButtonBinding = function () {
	
	return this._checkedRadioBinding;
}

/**
 * Uncheck descendant radiobutton execept the one supplied as argument.
 * @param (Binding} selectedBinding
 * @private
 */
RadioGroupBinding.prototype._unCheckRadioBindingsExcept = function ( selectedBinding ) {
	 
	var radioButtons = this._getRadioButtonBindings ();
	radioButtons.each ( function ( binding ) {
		if ( binding.isChecked && binding != selectedBinding ) {
			binding.uncheck ( true );
		}
	});
}

/**
 * @return {List<ButtonBinding>}
 */
RadioGroupBinding.prototype._getRadioButtonBindings = function () {
	
	if ( this._radioButtonBindings === null || !this._isUpToDate ) {
		
		var crawler = new Crawler ();
		var list = new List ();
		
		crawler.addFilter ( function ( element ) {
			
			var result = true;
			var binding = UserInterface.getBinding ( element );
			if ( binding instanceof RadioGroupBinding ) {
				result = NodeCrawler.SKIP_CHILDREN;
			} else {
				if ( binding instanceof ButtonBinding && binding.isRadioButton ) {
					list.add ( binding );
				}
			}
			return result;
		});
		
		crawler.crawl ( this.bindingElement );
		this._radioButtonBindings = list;
		
		/*
		var result = new List ();
		var descendants = this.getDescendantBindingsByLocalName ( "*" );
		descendants.each ( function ( binding ) {
			if ( binding instanceof ButtonBinding && binding.isRadioButton ) {
				result.add ( binding );
			}
		});
		this._radioButtonBindings = result;
		*/
	}
	return this._radioButtonBindings;

}

/**
 * RadioGroupBinding factory.
 * @param {DOMDocument} ownerDocument
 * @return {RadioGroupBinding}
 */
RadioGroupBinding.newInstance = function ( ownerDocument ) {

	var element = DOMUtil.createElementNS ( Constants.NS_UI, "ui:radiogroup", ownerDocument );
	return UserInterface.registerBinding ( element, RadioGroupBinding );
}