DeckBinding.prototype = new FlexBoxBinding;
DeckBinding.prototype.constructor = DeckBinding;
DeckBinding.superclass = FlexBoxBinding.prototype;

DeckBinding.ACTION_SELECTED = "deck selected";
DeckBinding.ACTION_UNSELECTED = "deck unselected";
DeckBinding.NODENAME_DECKS = "decks";
DeckBinding.CLASSNAME = "deckelement";

/**
 * @class
 */
function DeckBinding () {

	/**
	 * @type {SystemLogger}
	 */
	this.logger = SystemLogger.getLogger ( "DeckBinding" );
	
	/**
	 * @type {boolean}
	 */
	this.isSelected = false;
	
	/**
	 * @type {boolean}
	 */
	this.isVisible = false;
	
	/**
	 * @type {DecksBinding}
	 */
	this.containingDecksBinding = null;
	
	/*
	 * Returnable.
	 */
	return this;
}

/**
 * Identifies binding.
 */
DeckBinding.prototype.toString = function () {

	return "[DeckBinding]";
}

/**
 * Assign special classname.
 * Overloads {Binding#onBindingRegister}
 */
DeckBinding.prototype.onBindingRegister = function () {

	DeckBinding.superclass.onBindingRegister.call ( this );
	this.addActionListener ( BalloonBinding.ACTION_INITIALIZE );
	this.attachClassName ( DeckBinding.CLASSNAME );
}

/**
 * Overloads {Binding#onBindingAttach}
 */
DeckBinding.prototype.onBindingAttach = function () {

	DeckBinding.superclass.onBindingAttach.call ( this );
	this.containingDecksBinding = this.getAncestorBindingByLocalName ( this.constructor.NODENAME_DECKS );
	if ( this.getProperty ( "selected" ) == true ) {
		this.containingDecksBinding.select ( this );
	}
}

/**
 * @implements {IActionListener}
 * @overloads {FlexBoxBinding#handleAction}
 * @param {Action} action
 */
DeckBinding.prototype.handleAction = function ( action ) {
	
	DeckBinding.superclass.handleAction.call ( this, action );
	
	var binding = action.target;
	switch ( action.type ) {
		case BalloonBinding.ACTION_INITIALIZE :
			action.consume ();
			break;
	}
}

/**
 * Select deck. This method is invoked by the {@link DecksBinding}.
 */
DeckBinding.prototype.select = function () {
	
	if ( !this.isSelected ) {
	
		if ( this.isLazy == true ) {	
			this.wakeUp ( "select" );
		} else {
			
			this.isSelected = true;
			this.isVisible = true;	
			this.setProperty ( "selected", "true" );
			this.bindingElement.style.position = "static";
			
			/*
			 * Start flex iterator?
			 */
			this._invokeManagedRecursiveFlex ();
			
			/*
			 * Proudly announce.
			 */
			this.dispatchAction ( DeckBinding.ACTION_SELECTED );
			
			/*
			 * TODO: Even if seleted, focus shift should only be invoked   
			 * when no VISIBLE binding inside the dock has the current focus. 
			 */
			var root = UserInterface.getBinding ( this.bindingDocument.body );
			if ( root.isActivated ) {
				this.dispatchAction ( FocusBinding.ACTION_FOCUS );
			}
		}
	}
}

/**
 * Unselect deck. This method is invoked by the {@link DecksBinding}.
 */
DeckBinding.prototype.unselect = function () {
	
	if ( this.isSelected ) {
		
		/*
		 * Blur any focused binding within the tabpanel.
		 */
		this.dispatchAction ( FocusBinding.ACTION_BLUR );
		
		this.deleteProperty ( "selected" );
		this.isSelected = false;
		this.isVisible = false;
		this.bindingElement.style.position = "absolute";
		
		this.dispatchAction ( DeckBinding.ACTION_UNSELECTED );
	}
}

/**
 * Invoke recursive flex ONLY IF decks height 
 * has changed since last show (or when first shown).
 * TODO: This doesn't work!
 * TODO: Make this work!
 */
DeckBinding.prototype._invokeManagedRecursiveFlex = function () {
	
	this.reflex ( true ); // why true? Otherwise explorer decks dont work...
	
	/*
	if ( this.isAttached == true ) {
		if ( this.containingDecksBinding.hasDimensionsChanged ()) {
			this.reflex ();
		}
	}
	*/
}

/**
 * DeckBinding factory.
 * @param {DOMDocument} ownerDocument
 * @return {DeckBinding}
 */
DeckBinding.newInstance = function ( ownerDocument ) {

	var element = DOMUtil.createElementNS ( Constants.NS_UI, "ui:deck", ownerDocument );
	return UserInterface.registerBinding ( element, DeckBinding );
}