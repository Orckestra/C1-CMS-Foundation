TabPanelBinding.prototype = new Binding;
TabPanelBinding.prototype.constructor = TabPanelBinding;
TabPanelBinding.superclass = Binding.prototype;

function TabPanelBinding () {

	/**
	 * @type {SystemLogger}
	 */
	this.logger = SystemLogger.getLogger ( "TabPanelBinding" );
	
	/**
	 * This property is set by the TabBoxBinding
	 * @type {string}
	 */
	this.tabboxkey = null;
	
	/**
	 * @type {boolean}
	 */
	this.isVisible = false;
	
	/**
	 * @type {IFocusable}
	 */
	this._focusedBinding = null;

	/*
	 * Returnable.
	 */
	return this;
}

/**
 * Identifies binding.
 */
TabPanelBinding.prototype.toString = function () {

	return "[TabPanelBinding]";
}

/**
 * Dispatching action to initialize containing tabboxbinding.
 * Overloads {Binding#onBindingAttach}
 */
TabPanelBinding.prototype.onBindingAttach = function () {

	TabPanelBinding.superclass.onBindingAttach.call ( this );
	this.dispatchAction ( Binding.ACTION_ATTACHED );
	this.addActionListener ( BalloonBinding.ACTION_INITIALIZE );
}

/**
 * Select tabpanel.
 * @param {boolean} isManaged If set to true, application focus will not be updated.
 */
TabPanelBinding.prototype.select = function ( isManaged ) {
	
	if ( !this.isSelected ) {
		
		if ( this.isLazy ) {
			
			this.wakeUp ( "select" );
			
		} else {
		
			this.isSelected = true;
			this.isVisible = true;
			this.bindingElement.style.position = "static";
			
			/*
			 * Start flex iterator?
			 */
			this._invokeManagedRecursiveFlex ();
			
			/*
			 * TODO: Even if seleted, focus shift should only be invoked   
			 * when no VISIBLE binding inside the dock has the current focus. 
			 */
			if ( isManaged != true ) {
				this.dispatchAction ( FocusBinding.ACTION_FOCUS );
			}
		}
	
	}
}

/**
 * Unselect tabpanel.
 */
TabPanelBinding.prototype.unselect = function () {
	
	if ( this.isSelected ) {
		
		/*
		 * Blur any focused binding within the tabpanel.
		 */
		this.dispatchAction ( FocusBinding.ACTION_BLUR );
		
		this.isSelected = false;
		this.isVisible = false;
		
		this.bindingElement.style.position = "absolute";
	}
}

/**
 * Invoke recursive flex ONLY IF tabpanels height 
 * has changed since last show (or when first shown).
 * UPDATE: THIS HAS BEEN DISABLED
 */
TabPanelBinding.prototype._invokeManagedRecursiveFlex = function () {
	
	if (this.isAttached == true) {
		this.reflex(true);
	} else {
		var tabpanels = UserInterface.getBinding(this.bindingElement.parentNode);
		tabpanels.reflex();
	}
	
	/*
	 * There's an issue here with lazy panels waking up. 
	 * It may be nescessary simply to reflex!
	 *
	if ( this.isAttached == true ) {
		
		var tabpanels = UserInterface.getBinding ( this.bindingElement.parentNode );
		if ( tabpanels.hasDimensionsChanged ()) {
			this.reflex ();
		}
	}
	*/
}

/**
 * @implements {IActionListener}
 * @overloads {Binding#handleAction}
 * @param {Action} action
 */
TabPanelBinding.prototype.handleAction = function ( action ) {
	
	TabPanelBinding.superclass.handleAction.call ( this, action );
	
	var binding = action.target;
	
	switch ( action.type ) {
		case BalloonBinding.ACTION_INITIALIZE :
			action.consume ();
			break;
	}
}

/**
 * TabPanelBinding factory.
 * @param {DOMDocument} ownerDocument
 * @return {TabPanelBinding}
 */
TabPanelBinding.newInstance = function ( ownerDocument ) {
	
	var tabpanel = DOMUtil.createElementNS ( Constants.NS_UI, "ui:tabpanel", ownerDocument );
	UserInterface.registerBinding ( tabpanel, TabPanelBinding );
	return UserInterface.getBinding ( tabpanel );
}