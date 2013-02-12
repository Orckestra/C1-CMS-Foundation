FocusBinding.prototype = new FlexBoxBinding;
FocusBinding.prototype.constructor = FocusBinding;
FocusBinding.superclass = FlexBoxBinding.prototype;

/**
 * This property is set to true on the currently focused binding. 
 * TODO: Why was this exactly?
 * @type {string}
 */
FocusBinding.MARKER = "focusbindingcurrentfocus";

/**
 * @see {DockBinding}
 * @see {DialogBinding} TODO!
 */
FocusBinding.ACTION_ACTIVATED = "focusmanager activated";
FocusBinding.ACTION_ATTACHED = "focusmanager attached";
FocusBinding.ACTION_UPDATE = "focusmanager update required";
FocusBinding.ACTION_FOCUS = "focusmanager focus";
FocusBinding.ACTION_BLUR = "focusmanager blur";

/**
 * Since explorer doesn't react kindly to invisible or hidden 
 * elements recieving the focus, better relay through here. 
 * This will ensure some public damage control, but still 
 * log an exception.
 * @param {DOMElement} element
 * @return {boolean} True on successful focus
 */
FocusBinding.focusElement = function ( element ) {
	
	var isSuccess = true;
	
	try {
		element.focus ();
		Application.focused ( true );
	} catch ( exception ) {
		var binding = UserInterface.getBinding ( element );
		var logger = SystemLogger.getLogger ( "FocusBinding.focusElement" );
		logger.warn ( "Could not focus " + ( binding ? binding.toString () : String ( element )));
		isSuccess = false;
	}
	return isSuccess;
}

/**
 * @type {IFocus}
 */
FocusBinding.focusedBinding = null;

/**
 * @type {FocusBinding}
 */
FocusBinding.activeInstance = null;

/**
 * Because DOT NET will kill bindings spontaneously, we keep references
 * to focused bindings based on contextwindows and IDs. 
 * @param {IFocusable} binding 
 * @return {object} An object with a single method to extract the binding.
 */
FocusBinding.getCachedFocus = function ( binding ) {
	
	var win = binding.bindingWindow;
	var id = binding.bindingElement.id;
	
	return {
		getBinding : function () {
			var result = null;
			try {
				if ( Binding.exists ( binding )) {
					result = win.bindingMap [ id ]; // TODO: AVOID BINDINGMAP!
				}
			} catch ( exception ) {
				// explorer may still puke on this!
			}
			return result;
		}
	}
}

/**
 * Navigate next.
 * @param {boolean} isReverse
 */
FocusBinding.navigateNext = function ( isReverse ) {
	
	if ( Binding.exists ( FocusBinding.activeInstance )) {
		FocusBinding.activeInstance.focusNext ( isReverse );
	}
}

/**
 * Navigate previous.
 */
FocusBinding.navigatePrevious = function () {
	
	FocusBinding.navigateNext ( true );
}

/**
 * @class
 */
function FocusBinding () {
	
	/**
	 * @type {SystemLogger}
	 */
	this.logger = SystemLogger.getLogger ( "FocusManangerBinding" );
	
	/**
	 * @type {List<IFocusable>}
	 */
	this._focusableList = null;

	/**
	 * @type {boolean}
	 */
	this._isUpToDate = false;
	
	/**
	 * If ancestor FocusBinding claims to be a (strong) focus manager, 
	 * this will be set to false. In that case, you may stop reading here, 
	 * none of the methods below will be invoked.
	 * @type {boolean}
	 */
	this._isFocusManager = true;
	
	/** 
	 * If set to false, descendant FocusBinding instances may construct 
	 * local focus zones. This is exactly the case for the top PageBinding 
	 * and the StageBinding. And that is probably how it should stay.
	 * @type {boolean}
	 */
	this.isStrongFocusManager = true;
	
	/**
	 * @type {object}
	 */
	this._cachedFocus = null;
	 
	/**
	 * Note that flexibility is negated by default. Actually we only 
	 * need to subclass FlexBoxBinding around here because IE6 doesn't 
	 * support CSS min-height; this causes trouble inside dialogs.
	 * @overwrites {FlexBoxBinding#isFlexible}
	 */
	this.isFlexible = false;
	
	/* 
	 * Returnable.
	 */
	return this;
}

/**
 * Identifies binding.
 */
FocusBinding.prototype.toString = function () {
	
	return "[FocusManangerBinding]";
}

/**
 * @overloads {Binding#onBindingAttach}
 */
FocusBinding.prototype.onBindingAttach = function () {
	
	if ( this.getProperty ( "focusmanager" ) == false ) {
		this._isFocusManager = false;
	} else {
		if ( this.getProperty ( "strongfocusmanager" ) == false ) {
			this.isStrongFocusManager = false;
		}
		if ( this._isFocusManager ) {
			var action = this.dispatchAction ( FocusBinding.ACTION_ATTACHED );	
			if ( action && action.isConsumed ) {
				if ( action.listener.isStrongFocusManager ) {
					this._isFocusManager = false;
				}
			}
			if ( this._isFocusManager ) {
				this.addActionListener ( Binding.ACTION_ACTIVATED );
				this.addActionListener ( Binding.ACTION_FOCUSED );
				this.addActionListener ( Binding.ACTION_BLURRED );
				this.addActionListener ( FocusBinding.ACTION_UPDATE );
				this.addActionListener ( FocusBinding.ACTION_FOCUS );
				this.addActionListener ( FocusBinding.ACTION_BLUR );
				//this.addActionListener ( UpdatePanelBinding.ACTION_UPDATED );
				this.addActionListener ( FocusBinding.ACTION_ATTACHED );
			}
		}
	}	
	FocusBinding.superclass.onBindingAttach.call ( this );
}

/**
 * @overloads {Binding#onBindingDispose}
 */
FocusBinding.prototype.onBindingDispose = function () {
	
	FocusBinding.superclass.onBindingDispose.call ( this );
	if ( FocusBinding.activeInstance == this ) {
		FocusBinding.activeInstance = null;
	}
}

/**
 * @implements {IActionListener}
 * @overloads {Binding#handleAction}
 * @param {Action} action
 */
FocusBinding.prototype.handleAction = function ( action ) {

	FocusBinding.superclass.handleAction.call ( this, action );
	
	var binding = action.target;
	var crawler = null;
	
	if ( this._isFocusManager ) {
		
		switch ( action.type ) {
		
			case FocusBinding.ACTION_ATTACHED :
				
				if ( binding != this ) {
					this._isUpToDate = false;
				}
				action.consume (); // by consuming this, we dictate the "strength" of descendant focusbinding. 
				break;
			
			case FocusBinding.ACTION_UPDATE :
				
				if ( binding != this ) {
					this._isUpToDate = false;
					action.consume ();
				}
				break;
				
			case FocusBinding.ACTION_BLUR :
				
				if ( Application.isOperational ) {
					
					crawler = new FocusCrawler ();
					crawler.mode = FocusCrawler.MODE_BLUR;
					crawler.crawl ( binding.bindingElement );
					
					/*
					 * Otherwise a hidden field (in a hidden 
					 * deck) could be refocused onActivate. 
					 * TODO: only if filter actually blurred something (?)
					 */
					if ( this._cachedFocus != null ) {
						this._cachedFocus = null;
					}
				}
				action.consume ();
				break;
				
			case FocusBinding.ACTION_FOCUS :
				
				if ( Application.isOperational && binding != this ) {
					
					crawler = new FocusCrawler ();
					crawler.mode = FocusCrawler.MODE_FOCUS;
					crawler.crawl ( binding.bindingElement );
				}
				action.consume ();
				break;
				
			case Binding.ACTION_FOCUSED :
				
				if ( Interfaces.isImplemented ( IFocusable, binding )) {
					this.claimFocus ();
					this._onFocusableFocused ( binding );
				}
				action.consume ();
				break;
				
			case Binding.ACTION_BLURRED :
				
				if (  Interfaces.isImplemented ( IFocusable, binding )) {
					this._onFocusableBlurred ( binding );
				}
				action.consume ();
				break;
				
			/*
			case UpdatePanelBinding.ACTION_UPDATED :
				
				/* 
				 * TODO: Re-enable this stuff! 
				 * TODO: don't speculate on FocusBinding.focusedBinding
				 * TODO: support descendant WindowBindings
				 *
				if ( !FocusBinding.focusedBinding ) {
					if ( this._cachedFocus ) {
						var binding = this._cachedFocus.getBinding ();
						if ( binding && !binding.isFocused ) {
							binding.focus ();
						}
					}
				}
				action.consume (); // probably no need to propagate this furhter...
				break;
			*/
		}
	}
}

/**
 * Move focus to next {@link IFocusable} binding. If the last focused 
 * binding has lost it's focus for some reason, focus this instead.
 * @param {boolean} isReverse
 */
FocusBinding.prototype.focusNext = function ( isReverse ) {
	
	var focused = null;
	var list = this._getFocusableList ();
	
	if ( list.reset ().hasEntries ()) {
	
		while ( focused == null && list.hasNext ()) {
			var binding = list.getNext ();
			if ( this._cachedFocus && binding == this._cachedFocus.getBinding ()) {
				focused = binding;
			}
		}
		if ( focused != null ) {
			if ( binding.isFocused ) {
				var next = isReverse ? 
					list.getPreceding ( focused ) :
					list.getFollowing ( focused );
				if ( !next ) {
					next = isReverse ?
						list.getLast () :
						list.getFirst ();
				}
				next.focus ();
			} else {
				focused.focus ();
			}
		} else {
			list.getFirst ().focus ();
		}
	}
}

/**
 * Claim focus!
 */
FocusBinding.prototype.claimFocus = function () {
	
	FocusBinding.activeInstance = this;
}

/**
 * Build list and return it.
 * @return {List<IFocusable>}
 */
FocusBinding.prototype._getFocusableList = function () {
	
	// TODO: overwrite StageBinding!
	
	if ( !this._isUpToDate ) {
		
		var crawler = new FocusCrawler ();
		var list = new List ();
		
		crawler.mode = FocusCrawler.MODE_INDEX;
		crawler.crawl ( this.bindingElement, list );
		
		this._focusableList = list;
		this._isUpToDate = true;
	}
	
	return this._focusableList;
}

/**
 * Focus first focusable *if* our activatable is active!
 * TODO: move this check somewhere else?
 */
FocusBinding.prototype._focusFirstFocusable = function () {
	
	if ( this._isFocusManager && this.isActivated ) {
		
		var list = this._getFocusableList ();
		
		if ( list != null ) {
			if ( list.hasEntries ()) {
				list.getFirst ().focus ();
			}
		} else {
			this.logger.warn ( "Could not compute focusable list." );
		}
	}
}

/**
 * Focus previously focused focusable binding. 
 * Now say it three times really fast.
 */
FocusBinding.prototype._focusPreviouslyFocused = function () {
	
	/*
	 * Locate last focused binding.
	 */
	if ( this._cachedFocus ) {
		var binding = this._cachedFocus.getBinding ();
		if ( binding && !binding.isFocused ) {
			binding.focus ();
		}
	}
}

/**
 * On focusable focused.
 * @param {IFocusable} binding
 */
FocusBinding.prototype._onFocusableFocused = function ( binding ) {

	if ( binding != FocusBinding.focusedBinding ) {
		if ( FocusBinding.focusedBinding != null ) {
			if ( Binding.exists ( FocusBinding.focusedBinding )) {
				FocusBinding.focusedBinding.blur ();
			}
		}
		FocusBinding.focusedBinding = binding;
		binding.setProperty ( FocusBinding.MARKER, true );
		
		this._cachedFocus = FocusBinding.getCachedFocus ( binding );
	}
}

/**
 * On focusable blurred.
 * @param {IFocusable} binding
 */
FocusBinding.prototype._onFocusableBlurred = function ( binding ) {
	
	binding.deleteProperty ( FocusBinding.MARKER );
	if ( binding == FocusBinding.focusedBinding ) {
		FocusBinding.focusedBinding = null;
	}
}