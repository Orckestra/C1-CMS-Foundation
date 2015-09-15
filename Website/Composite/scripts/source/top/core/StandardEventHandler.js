/**
 * Apparently this needs to adjusted on a system scope scale, although it 
 * simply get's switched whenever native keys are toggled for any document.
 */
StandardEventHandler.isBackAllowed = false;

/**
 * @param {DOMDocument} doc
 * @param {boolean} isMouseHandlerOnly
 */
function StandardEventHandler ( doc, isMouseHandlerOnly ) { 

	/**
	 * @type {SystemLogger}
	 */
	this.logger = SystemLogger.getLogger ( "StandardEventHandler [" + doc.title +"]" );
	
	/**
	 * @type {DOMDocument}
	 */
	this._contextDocument = doc;
	
	/**
	 * @type {DOMDocumentView}
	 */
	this._contextWindow = DOMUtil.getParentWindow ( doc );
	
	/**
	 * Don't set this property directly! Please use methods below. 
	 * @see {StandardEventHandler#enableNativeKeys}
	 * @see {StandardEventHandler#disableNativeKeys}
	 * @type {boolean}
	 */
	this.hasNativeKeys = false;
	
	/**
	 * @type {boolean}
	 */
	this._isAllowTabs = false;
	
	/**
	 * @type {boolean}
	 */
	this._isMouseHandlerOnly = isMouseHandlerOnly;
	
	/*
	 * Add listeners.
	 */
	this._addListeners ();
}

/*
 * Add listeners.
 */
StandardEventHandler.prototype._addListeners = function () {
	
	var doc = this._contextDocument;
	
	DOMEvents.addEventListener( doc, DOMEvents.MOUSEDOWN, this);
	DOMEvents.addEventListener ( doc, DOMEvents.MOUSEUP, this );
	DOMEvents.addEventListener ( doc, DOMEvents.MOUSEMOVE, this );
	DOMEvents.addEventListener ( doc, DOMEvents.TOUCHSTART, this);


	/*
	 * Disable F1 to launch OS help in IE.
	 */
	if ( Client.isExplorer || Client.isExplorer11 ) {
		DOMEvents.addEventListener(this._contextDocument, DOMEvents.HELP, {
			handleEvent: function (e) {
				DOMEvents.stopPropagation(e);
				DOMEvents.preventDefault(e);
			}
		})
		DOMEvents.addEventListener(this._contextWindow, DOMEvents.HELP, {
			handleEvent: function (e) {
				DOMEvents.stopPropagation(e);
				DOMEvents.preventDefault(e);
			}
		})
	}
	
	if ( !this._isMouseHandlerOnly ) {
		
		DOMEvents.addEventListener ( doc, DOMEvents.KEYDOWN, this );
		DOMEvents.addEventListener ( doc, DOMEvents.KEYUP, this );
		
		if ( this._contextWindow.WindowManager == null ) {
			if ( Client.isExplorer ) {
				DOMEvents.addEventListener ( doc, DOMEvents.FOCUSIN, this );
				DOMEvents.addEventListener ( doc, DOMEvents.FOCUSOUT, this );
			} else {
				if ( this._contextDocument.designMode != "on" ) {
					DOMEvents.addEventListener ( doc, DOMEvents.FOCUS, this, true );
					DOMEvents.addEventListener ( doc, DOMEvents.BLUR, this, true );
				}
			}
		}
		
		/*
		 * Setup global focus listeners.
		 * TODO: Make reliable for IE!
		 * @see {Application#focused}
		 */
		var handler = {
			handleEvent : function ( e ){
				switch ( e.type ) {
					case DOMEvents.BLUR :
						Application.focused ( false );
						break;
					case DOMEvents.FOCUS :
						Application.focused ( true );
						break;
				}
			}
		}
		
		DOMEvents.addEventListener ( this._contextWindow, DOMEvents.BLUR, handler );
		DOMEvents.addEventListener ( this._contextWindow, DOMEvents.FOCUS, handler );
	}
	
	/*
	 * Supress CTRL+S (TODO: handle this elsewhere!)
	 */
	if ( Client.isMozilla ) {
		doc.addEventListener ( DOMEvents.KEYDOWN, {
			handleEvent : function ( e ) {
				var s = 83;
				if (Client.isMac) {
					if (e.metaKey && e.keyCode == s && !e.altKey) {
						e.preventDefault();
					}
				} else {
					if (e.ctrlKey && e.keyCode == s && !e.altKey) {
						e.preventDefault();
					}
				}
			}
		}, true );
	}
}

/** 
 * @implements {IEventListener}
 * @param {MouseEvent} e
 */
StandardEventHandler.prototype.handleEvent = function ( e ) {
		
	switch ( e.type ) {
		case DOMEvents.MOUSEDOWN :
			this._handleMouseDown ( e );
			break;
		case DOMEvents.MOUSEUP :
			this._handleMouseUp ( e );
			break;
		case DOMEvents.MOUSEMOVE :
			this._handleMouseMove ( e );
			break;
		case DOMEvents.TOUCHSTART:
			this._handleTouchStart(e);
			break;
		case DOMEvents.KEYDOWN :
			this._handleKeyDown ( e );
			break;
		case DOMEvents.KEYUP :
			this._handleKeyUp ( e );
			break;
		case DOMEvents.FOCUS :
		case DOMEvents.BLUR :
		case DOMEvents.FOCUSIN :
		case DOMEvents.FOCUSOUT :
			this._handleFocus ( e );
			break;
	}
}

/**
 * Broadcast mousedown globally. For framework pages, locate nearest binding 
 * instance to make it dispatch the "bindingactivated" action. This action is 
 * probably consumed by nearest containing {@link DockBinding}.
 * @param {MouseEvent} e
 */
StandardEventHandler.prototype._handleMouseDown = function ( e ) {
	
	Application.trackMousePosition ( e );
	EventBroadcaster.broadcast ( BroadcastMessages.MOUSEEVENT_MOUSEDOWN, e );
	
	/*
	 * Only left mouse button will activate and migrate.
	 */
	if ( e.button != ButtonStateManager.RIGHT_BUTTON ) {
		
		var node = DOMEvents.getTarget ( e );
		while ( node != null ) {
			switch ( node.nodeType ) {
				case Node.ELEMENT_NODE :
					var binding = UserInterface.getBinding ( node );
					if ( binding != null ) {
						binding.dispatchAction ( 
							Binding.ACTION_ACTIVATED 
						);
					}
					node = binding != null ? null : node.parentNode;
					break;
				case Node.DOCUMENT_NODE :
					node = DOMUtil.getParentWindow ( node ).frameElement;
					break;
				default :
					node = null;
					break;
			}
		}
	}
}
	
/*
 * Broadcast mouseup globally.
 * @param {MouseEvent} e
 */
StandardEventHandler.prototype._handleMouseUp = function ( e ) {
	
	Application.trackMousePosition ( e );
	EventBroadcaster.broadcast ( BroadcastMessages.MOUSEEVENT_MOUSEUP, e );
}
	
/**
 * Broadcast mousemove globally *only* while mousetracking.
 * TODO: Broadcast mouseup if button is not pressed!
 * @param {MouseEvent} e
 */
StandardEventHandler.prototype._handleMouseMove = function ( e ) {
	
	try {
		
		var isTracking = Application.trackMousePosition ( e );
		if ( isTracking ) {
			EventBroadcaster.broadcast ( BroadcastMessages.MOUSEEVENT_MOUSEMOVE, e );
		}
		
		/*
		 * IE may spontaneously believe that no window has focus. If the   
		 * mousemove event is registered, this is not obviously not the case. 
		 * Therefore we can safely FOCUS our window, kicking IE back on track. 
		 * This fixes a bug where the backspace key stopped working.
		 * TODO: Figure out why this was disabled...
		 *
		if ( Client.isExplorer ) {
			
			if ( Application.isBlurred ) {
				
				var doc = this._contextDocument;
				var win = this._contextWindow;
				
				/*
				 * The contentEditable document MUST be activated by a 
				 * mousedown WHEN another window has the focus. That's 
				 * why we focus the parent window in this case.
				 *
				if ( doc.body.contentEditable == "true" ) {
					win = DOMUtil.getParentWindow ( win.frameElement );
				}
				win.focus ();
			}
		}
		*/
		
	} catch ( exception ) { // don't want to throw errors continually onmousemove
		DOMEvents.removeEventListener ( 
			this._contextDocument, 
			DOMEvents.MOUSEMOVE, 
			this
		);
		throw ( exception );
	}
}

/*
 * Broadcast touchstart globally.
 * @param {MouseEvent} e
 */
StandardEventHandler.prototype._handleTouchStart = function (e) {

	EventBroadcaster.broadcast(BroadcastMessages.TOUCHEVENT_TOUCHSTART, e);
}

/**
 * @param {KeyEvent} e
 */
StandardEventHandler.prototype._handleKeyDown = function ( e, isTabHandled, fromNativeKeys ) {
	
	/*
	 * This should only happen in the currently active window, 
	 * but the keypress should still be propagated for KeyBinding.
	 */
	if ( e.keyCode == KeyEventCodes.VK_TAB ) {
		if ( !this._isAllowTabs ) {
			if ( !isTabHandled ) {
				this._handleTab ( e );
				DOMEvents.preventDefault ( e );
			}
		} else {
			if ( e.shiftKey || e.ctrlKey ) {
				DOMEvents.preventDefault ( e );
			}
		}
		isTabHandled = true;
	}
	
	/*
	 * Prevent standard browser page navigation keys. Theorectically, the check 
	 * for shift and controls keys should *not* be performed. For some unknown 
	 * reason, however, pressing these keys will switch the value of hasNativeKeys...
	 * TODO: Investigate why!
	 */
	if (!this.hasNativeKeys && !e.shiftKey && !e.ctrlKey && !fromNativeKeys) {
		switch ( e.keyCode ) {
			case KeyEventCodes.VK_UP :
			case KeyEventCodes.VK_DOWN :
			case KeyEventCodes.VK_LEFT :
			case KeyEventCodes.VK_RIGHT :
			case KeyEventCodes.VK_SPACE :
			case KeyEventCodes.VK_PAGE_UP :
			case KeyEventCodes.VK_PAGE_DOWN :
					DOMEvents.preventDefault ( e );
			 	break;
		} 
	}

	if ( e.keyCode == KeyEventCodes.VK_BACK ) {
		if (!StandardEventHandler.isBackAllowed || UserInterface.hasBinding(e.target)) {
			DOMEvents.preventDefault ( e );
		}
	}
	
	var isHandled = KeySetBinding.handleKey ( this._contextDocument, e );
	if ( !isHandled ) {
		switch ( e.keyCode ) {
			
			case KeyEventCodes.VK_PAGE_UP :
			case KeyEventCodes.VK_PAGE_DOWN :
				/*
				 * Strangely, these keys may stop working in this._contextWindow, 
				 * even while allowed, when an ANCESTOR frame preventDefaults them.
				 */
				break;
			default :
				var frame = this._contextWindow.frameElement;
				if ( frame != null ) {
					var parent = DOMUtil.getParentWindow ( frame );
					if ( parent.standardEventHandler != null ) {
						parent.standardEventHandler._handleKeyDown(e, isTabHandled, fromNativeKeys ? fromNativeKeys : this.hasNativeKeys);
					}
				}
				break;
		}
	}
}

/**
 * TAB is handled especial.
 * @param {KeyEvent} e
 */
StandardEventHandler.prototype._handleTab = function ( e ) {
	
	if ( !this._isAllowTabs ) {
		if ( !e.ctrlKey ) {
			if ( e.shiftKey ) {
				FocusBinding.navigatePrevious ();
			} else {
				FocusBinding.navigateNext ();
			}
		}
	}
}

/**
 * Handle focus and blur.
 * @param {Event} e
 */
StandardEventHandler.prototype._handleFocus = function ( e ) {
	
	var isFocus = false;
	var target = DOMEvents.getTarget ( e );
	var name = target.nodeName.toLowerCase ();
	
	switch ( name ) {	
		case "input" :
		case "textarea" :
		case "select" :
			isFocus = ( e.type == DOMEvents.FOCUS || e.type == DOMEvents.FOCUSIN );
			if ( name == "input" || name == "textarea" ) {
				StandardEventHandler.isBackAllowed = isFocus;
			}
			if ( isFocus ) {
				if ( !this.hasNativeKeys ) {
					this.enableNativeKeys ();
				}
			} else {
				if ( this.hasNativeKeys ) {
					this.disableNativeKeys ();
				}
			}
			break;
	}
}

/**
 * @param {KeyEvent} e
 */
StandardEventHandler.prototype._handleKeyUp = function ( e ) {
	
	/*
	 * Simply broadcast the keyup event globally 
	 * via the {@link Keyboard} singleton.
	 */
	Keyboard.keyUp ( e );
}

/**
 * Enable native keys. 
 * @param {boolean} isAllowTabs Relevant for editors
 */
StandardEventHandler.prototype.enableNativeKeys = function ( isAllowTabs ) {
	
	this._isAllowTabs = ( isAllowTabs == true ? true : false );
	
	/* Timeout hack prevents open dialogs from closing when  
	 * a SelectBoxBinding changes selection. Also, it allows  
	 * one control to disable keys *before* another enables it.
	 */
	var self = this;
	top.setTimeout ( function () {
		self.hasNativeKeys = true;
		StandardEventHandler.isBackAllowed = true;
	}, 0 );
}
	
/**
 * Disable native keys. This will always dissalow tabs.
 */
StandardEventHandler.prototype.disableNativeKeys = function () {

	this._isAllowTabs = false;
	this.hasNativeKeys = false;
	StandardEventHandler.isBackAllowed = false;
}