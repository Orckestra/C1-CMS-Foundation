PageBinding.prototype = new FocusBinding;
PageBinding.prototype.constructor = Binding;
PageBinding.superclass = FocusBinding.prototype;

PageBinding.ACTION_ATTACHED 				= "page attached";
PageBinding.ACTION_DETACHED				 	= "page detached";
PageBinding.ACTION_INITIALIZED				= "page initialized";
PageBinding.ACTION_DOPOSTBACK 				= "page do postback";
PageBinding.ACTION_VALIDATE 				= "page validate";
PageBinding.ACTION_DOVALIDATEDPOSTBACK 		= "page do validated postback";
PageBinding.ACTION_BLOCK_INIT				= "page block init";
PageBinding.ACTION_UNBLOCK_INIT				= "page unblock init";
PageBinding.ACTION_UPDATING					= "page updating";
PageBinding.ACTION_UPDATED					= "page updated";
PageBinding.ACTION_GETMESSAGES				= "page poll messagequeue";

/**
 * Classname to be attached when page is framed inside a dialog.
 * @type {String} 
 */
PageBinding.CLASSNAME_SUBPAGE = "dialogsubpage";

/**
 * Timeout in milliseconds before an initialized page is made 
 * interactive. Prevents flex malfunctions and stabilizes layout.
 */
PageBinding.TIMEOUT = 250;

/**
 * Remeber that the page has visibility set to "hidden" while initializing!
 * @see {PageBinding#onPageInitialize}
 * @class
 */
function PageBinding () { // Note to self: This class can safely descend from FlexBoxBinding if required.

	/**
	 * @type {SystemLogger}
	 */
	this.logger = SystemLogger.getLogger ( "PageBinding" );
	
	/**
	 * @type {string}
	 */
	this.label = null;
	
	/**
	 * @type {string}
	 */
	this.image = null;
	
	/**
	 * @type {string}
	 */
	this.toolTip = null;
	
	/**
	 * Flippen on inititalization.
	 * @type {boolean} 
	 */
	this._isPageBindingInitialized = false;
	
	/**
	 * Stuff can set this property so that the  
	 * PageBinding doesn't have to go look for it.
	 * @type {object}
	 */
	this.pageArgument = null;
	
	/**
	 * When loaded inside a dialog, this property will be switched 
	 * by the containing {@link DialogPageBinding} in ancestor frame.
	 * @see {DialogPageBinding#handleAction}
	 * @see {PageBinding#makeDialogSubPage}
	 * @type {boolean}
	 */
	this.isDialogSubPage = false;
	
	/**
	 * This will override the setup mentioned above. 
	 * Please consider how to refactor this stuff!
	 * @type {boolean}
	 */
	this.isFitAsDialogSubPage = true;
	
	/** 
	 * Collecting complex bindings while page initializes. 
	 * Won't show the the page until this map is empty.
	 * @type {Map<Binding><boolean>}
	 */
	this._initBlockers = null;
	
	/**Binding.ACTION_UPDATED
	 * Flipped when the page is ready to initialize.
	 * @type {boolean}
	 */
	this._isReadyForInitialize = false;
	
	/**
	 * The PageBinding WILL be made activation aware,  
	 * but not until all content is loaded.
	 * @see {PageBinding#onAfterPageInitialize}
	 * @implements {IActivationAware}
	 * @overwrites {Binding#isActivationAware}
	 * @type {boolean}
	 */
	this.isActivationAware = false;
	
	/**
	 * @implements {IActivationAware}
	 * @overwrites {Binding#isActivationAware}
	 * @type {boolean}
	 */
	this.isActivated = false;


	/**
	 * @type {boolean}
	 */
	this.isNonAjaxPage = false;
	
	/**
	 * When a server postback is fired, this flag will be reversed to 
	 * prevent further postback. The flag is reversed again as soon as  
	 * the MesssageQueue is updated manually (not on timed interval).
	 */
	this._canPostBack = true;
	
	/**
	 * Dissecting a simulated postback response.
	 * @type {XPathResolver} 
	 */
	this._responseResolver = null;
	
	/**
	 * True while the UpdateManager is busy doing updates.
	 * @type {boolean}
	 */
	this._isUpdating = false;
};

/**
 * Identifies binding.
 */
PageBinding.prototype.toString = function () {

	return "[PageBinding]";
};

/**
 * @overloads {FocusManagerBinding#onBindingRegister}
 */
PageBinding.prototype.onBindingRegister = function () {

	PageBinding.superclass.onBindingRegister.call ( this );
	
	var root = UserInterface.getBinding ( this.bindingDocument.body );
	root.addActionListener ( RootBinding.ACTION_PHASE_3, this );
	
	this.addActionListener ( PageBinding.ACTION_DOPOSTBACK );
	this.addActionListener ( PageBinding.ACTION_DOVALIDATEDPOSTBACK );
	this.addActionListener ( BalloonBinding.ACTION_INITIALIZE );
	this.addActionListener ( PageBinding.ACTION_BLOCK_INIT );
	this.addActionListener ( PageBinding.ACTION_UNBLOCK_INIT );
	this.addActionListener ( PageBinding.ACTION_GETMESSAGES );
	this.subscribe ( BroadcastMessages.MESSAGEQUEUE_REQUESTED );
};

/**
 * @overloads {FocusManagerBinding#onBindingAttach}
 */
PageBinding.prototype.onBindingAttach = function () {

	PageBinding.superclass.onBindingAttach.call ( this );
	
	Application.lock ( this ); // unlocked onAfterPageInitialize
	this.parseDOMProperties ();
	this.dispatchAction ( PageBinding.ACTION_ATTACHED ); // for ViewBinding!
};

/**
 * Cleanup on dispose.
 * @overloads {FocusBinding#onBindingDispose}
 */
PageBinding.prototype.onBindingDispose = function () {
	
	var root = UserInterface.getBinding ( this.bindingDocument.body );
	root.removeActionListener ( RootBinding.ACTION_PHASE_3, this );
	
	/*
	 * Unlock GUI before we die!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
	 *
	if ( this._hasLock ) {
		Application.unlock ( this );
	}
	*/
	
	/*
	 * Die.
	 */
	this.dispatchAction ( PageBinding.ACTION_DETACHED );
};

/**
 * Parse DOM properties.
 */
PageBinding.prototype.parseDOMProperties = function () {
	
	/*
	 * These values may have been defined already, 
	 * for example in the setPageArgument method.
	 */
	if (this.getProperty("label"))
		this.label = this.getProperty("label");
	if( this.getProperty("labelfield"))
		this.labelfield =  this.getProperty("labelfield");
	if (this.getProperty("image"))
		this.image = this.getProperty("image");
	this.toolTip = this.getProperty ( "tooltip" );
	
	/*
	 * Hacked setup. Please consider how to refactor this!
	 */
	if ( this.getProperty ( "fitasdialogsubpage" ) == false ) {
		this.isFitAsDialogSubPage = false;
	}
}

/** 
 * Stuff can provide this property so that the PageBinding doesn't have to 
 * go look for it. Note that bindings *may not* have been attached when 
 * this method is invoked.
 * @param {object} arg
 */
PageBinding.prototype.setPageArgument = function ( arg ) {
	
	/*
	 * Note that any associated dock-tab is automatically selected  
	 * by this. This is usually desired, but who knows...
	 */
	if ( Application.isOperational ) {
		this.dispatchAction ( DockPanelBinding.ACTION_FORCE_SELECT );
	}
	this.pageArgument = arg;
};

/** 
 * For subclasses to overload. Primarily with the intention of 
 * prolonging the invocation of <code>onPageInitialize</code> 
 * for some reason (waiting for iframes to load and stuff).
 * Note that all bindings (in this bindingWindow) has been 
 * fully attached when this method is invoked.
 * @param {object} arg
 */
PageBinding.prototype.onBeforePageInitialize = function () {
	
	/*
	 * When overloading, place your code around 
	 * here and invoke the super method lastly.
	 */
	this._isReadyForInitialize = true;
	if ( this._initBlockers == null ) {
		this.onPageInitialize ();
	}
};

/** 
 * Invoked when everything is loaded satisfactorily. 
 * @see {StageDialogBinding#_handleInitializedPageBinding}
 * @see {DockBinding#_setupPageBindingListeners}
 */
PageBinding.prototype.onPageInitialize = function () {
	
	if ( !this._isPageBindingInitialized ) {
	
		/*
		 * Flag initialized.
		 */
		this._isPageBindingInitialized = true;
		
		/*
		 * Modify dot net setup.
		 */
		if ( this._isDotNet ()) {
			this._setupDotNet ();
		}
		
		/*
		 * Populate DataBindings from DataBindingMap.
		 * TODO: move this to separate method?
		 */
		if ( this.pageArgument && this.pageArgument instanceof DataBindingMap ) {
			this.bindingWindow.DataManager.populateDataBindings ( this.pageArgument );
		}
		
		/*
		 * Dispatching an Action to be intercepted by ancestor bindings. 
		 * The ancestor will then invoke the reflex method on the page. 
		 * Timeouts stabilize the layout while page initializes. Be careful 
		 * not to dispose the PageBinding during timeouts!
		 * TODO: move to special method so that DialogPageBinding can handle itself!
		 */
		var self = this;
		setTimeout ( function () {
			try {
				if ( Binding.exists ( self ) == true ) {
					self.bindingElement.style.visibility = "visible";
					self.dispatchAction ( PageBinding.ACTION_INITIALIZED );
					self.onAfterPageInitialize ();
				} else {
					Application.unlock ( Application, true ); // something wrong - force unlock
					SystemLogger.getLogger ( "PageBinding" ).warn ( 
						"Premature PageBinding dispose? Please consult your developer." 
					);
				}
			} catch ( exception ) {
				self.logger.error ( exception );
				SystemDebug.stack ( arguments );
				throw exception;
			}
		}, PageBinding.TIMEOUT );
		
	} else {
		
		if ( Client.isExplorer == true ) {
			this.logger.error ( "PageBinding: Somehow initialized twice" );
			this.logger.error ( arguments.caller.callee.toString ());
		} else {
			throw "PageBinding: Somehow initialized twice";
		}
	}
};

/** 
 * After page initialize. Focus first focusable binding and unlock Application.
 * @see {FocusBinding#_initializeFocus}
 */
PageBinding.prototype.onAfterPageInitialize = function () {
	
	this.removeActionListener ( PageBinding.ACTION_BLOCK_INIT );
	this.removeActionListener ( PageBinding.ACTION_UNBLOCK_INIT );
	
	/*
	 * Must unlock first so that Explorer can handle focus properly.
	 */
	Application.unlock ( this );
	
	/*
	 * Enable activation awareness.
	 */
	this.isActivationAware = true;
	var root = UserInterface.getBinding ( this.bindingDocument.body );
	root.makeActivationAware ( this );
	
	/*
	 * When loaded, this will force any ancestor FocusBinding to move focus 
	 * to us. For this to make sense, this PageBinding should be loaded inside 
	 * a WindowBinding occupying ALL visible space. This may need rethinking.
	 */
	if ( UserInterface.isBindingVisible ( this )) {
		this.dispatchAction ( FocusBinding.ACTION_FOCUS );
	}
};

/**
 * Invoked by the DocumentUpdatePlugin before any updates are applied.
 */
PageBinding.prototype.onBeforeUpdates = function () {
	
	this._isUpdating = true;
	this.dispatchAction ( PageBinding.ACTION_UPDATING );
};

/**
 * Invoked by the DocumentUpdatePlugin after all updates are applied.
 */
PageBinding.prototype.onAfterUpdates = function () {
	
	this.parseDOMProperties();
	this._isUpdating = false;
	this.dispatchAction ( PageBinding.ACTION_UPDATED );
};

/**
 * Invoked when a page gets iframed inside a dialog.
 * Invoked by the {@link DialogPageBinding}.
 */
PageBinding.prototype.makeDialogSubPage = function () {
	
	if ( this.isFitAsDialogSubPage ) {
		if ( Client.isExplorer ) {
			this.setFlexibility ( true ); // since IE has no min-height...
		}
		this.attachClassName ( PageBinding.CLASSNAME_SUBPAGE );
		this.isDialogSubPage = true;
	}
};

/**
 * The global function "doPostBack" is overloaded in order 
 * to manifest databindings reliably on every scripted submit.
 */
PageBinding.prototype._setupDotNet = function () {

	var self = this;
	var form = this.bindingDocument.forms [ 0 ];
	var oldPostBack = this.bindingWindow.__doPostBack;
	var isLocked = false;
	
	/*
	 * Unlock UI when page unloads (see below). 
	 * TODO: Remove this when dialogs go AJAX.
	 * form.__isSetup was set by UpdateManager.
	 */
	if (!form.__isSetup && this.isNonAjaxPage) {
		DOMEvents.addEventListener ( this.bindingWindow, DOMEvents.UNLOAD, {
			handleEvent : function () {
				if ( isLocked ) {
					Application.unlock ( self );
				}
			}
		});
	}
	
	/*
	 * Setup postback.
	 * @param {string} eventTarget
	 * @param {string} eventArgument
	 */
	this.bindingWindow.__doPostBack = function ( eventTarget, eventArgument ) {
		
		/*
		 * For non-AJAX pages (dialogs and wizards),  
		 * this stunt will lock the UI on form submit.
		 */
		if ( !form.__isSetup && self.isNonAjaxPage) {
			Application.lock ( self );
			isLocked = true;
		}
		
		self.manifestAllDataBindings ();
		oldPostBack ( eventTarget, eventArgument );
		if ( Application.isDeveloperMode ) {
			self._debugDotNetPostback ();
		}
	}
};

/**
 * Post message in this window.
 * @param {String} message The message to post
 * @param {List<Binding>} list Collected by the EditorPageBinding.
 */
PageBinding.prototype.postMessage = function ( message, list ) {
	
	var postback = this.bindingWindow.bindingMap.__REQUEST;
		
	if ( postback != null && this._isDotNet ()) {
		
		switch ( message ) {
			case EditorPageBinding.MESSAGE_SAVE :
			case EditorPageBinding.MESSAGE_PERSIST :
				if ( this.bindingWindow.DataManager.isDirty ) {
					if ( this.validateAllDataBindings ()) {
						if ( list != null ) {
							/*
							if ( Application.isDeveloperMode ) {
								var action = message == EditorPageBinding.MESSAGE_SAVE ? "SAVING " : "PERSISTING ";  
								alert ( action + this.bindingDocument.title );
							}
							*/
							list.add ( this );
						}
						postback.postback ( message );
					}
				}
				break;
			default :
				postback.postback ( message );
				break;
			
		}
	}
	
	/*
	 * If the List was contained in argument, the post was 
	 * initiated by the EditorPageBinding, in which case 
	 * we must repost the message to descendant windows...
	 */
	if ( list != null ) {
		this._postMessageToDescendants ( message, list );
	}
}

/**
 * Post message in descendant windows recursively ad infinitum and for ever.
 * @param {String} message The message to post
 * @param {List<Binding>} list Collected by the EditorPageBinding.
 */
PageBinding.prototype._postMessageToDescendants = function ( message, list ) {
	
	// TODO: getElementsByTagName ( "iframe" ).parentNode to improve performance?
	var windows = this.getDescendantBindingsByType ( WindowBinding );
	windows.each ( function ( win ) {
		var page = win.getPageBinding (); 
		if ( page != null ) {
			page.postMessage ( message, list );
		}
	});
}


/**
 * Log postback entries.
 */
PageBinding.prototype._debugDotNetPostback = function () {
	
	var list = new List ();
	new List ( this.bindingDocument.forms [ 0 ].elements ).each (
		function (element) {
			if (element.name == null || element.name == "") return;
			list.add ({
				name : element.name,
				value : element.value
			});
		}
	);
	var out = "";
	list.each ( function ( entry ) {
		out += entry.name + ": " + entry.value + "\n";
	});
	this.logger.debug ( out );
};

/**
 * @implements {IActionListener}
 * @overloads {FocusBinding#handleAction}
 * @param {Action} action
 */
PageBinding.prototype.handleAction = function ( action ) {
	
	PageBinding.superclass.handleAction.call ( this, action );
	
	var binding = action.target;
	switch ( action.type ) {
	
		case RootBinding.ACTION_PHASE_3 :
			if ( binding == UserInterface.getBinding ( this.bindingDocument.body )) {
				binding.removeActionListener ( RootBinding.ACTION_PHASE_3, this );
				if ( !this._isPageBindingInitialized ) {
					try {
						this.onBeforePageInitialize ();
					} catch ( exception ) {
						alert ( exception );
						SystemDebug.stack ( arguments );
						throw exception;
					}
				}
			}
			break;
			
		case PageBinding.ACTION_DOPOSTBACK :
			
		 	if ( this._isDotNet ()) {
				this.doPostBack ( binding );
			}
			action.consume ();
			break;
			
		case PageBinding.ACTION_DOVALIDATEDPOSTBACK :
			
			if ( this._isDotNet ()) {
				var isValid = this.validateAllDataBindings ();
				if ( isValid ) {
					this.doPostBack ( binding );
				}
			}
			action.consume ();
			break;
			
		case BalloonBinding.ACTION_INITIALIZE :
			
			// TODO: note here...
			action.consume ();
			break;
		
		case PageBinding.ACTION_BLOCK_INIT :
			if ( this._initBlockers == null ) {
				this._initBlockers = new Map ();
			}
			this._initBlockers.set ( binding.key, true );
			break;
			
		case PageBinding.ACTION_UNBLOCK_INIT :
			
			if ( this._initBlockers != null ) {
				if ( this._initBlockers.has ( binding.key )) {
					this._initBlockers.del ( binding.key );
					if ( !this._initBlockers.hasEntries ()) {
						this._initBlockers = null;
						if ( this._isReadyForInitialize == true ) {
							var self = this;
							setTimeout ( function () {
								self.onBeforePageInitialize (); // push thread to completely stabilize
							}, 0 );
						}
					}
				}
			}
			
			/*
			 * WAS THIS
			 * 
			if ( this._initBlockers.has ( binding.key )) {
				this._initBlockers.del ( binding.key );
			}
			if ( !this._initBlockers.hasEntries ()) {
				this._initBlockers = null;
				if ( this._isReadyForInitialize == true ) {
					var self = this;
					setTimeout ( function () {
						self.onBeforePageInitialize (); // push thread to completely stabilize
					}, 0 );
				}
			}
			*/
			break;
		
		/*
		 * TODO: move this stuff into proper methods.
		 */
		case PageBinding.ACTION_GETMESSAGES :
			if ( UpdateMananger.isUpdating ) {
				var self = this;
				var handler = {
					handleAction : function ( action ) {
						if ( action.target == self ) {
							self.removeActionListener ( PageBinding.ACTION_UPDATED, handler );
							MessageQueue.udpdate ();
						}
					}
				}
				this.addActionListener ( PageBinding.ACTION_UPDATED, handler );
			} else {
				MessageQueue.udpdate ();
			}
			action.consume ();
			break;
	}
};

/**
 * @implements {IBroadcastListener}
 * @param {string} broadcast
 * @param {object} arg
 */
PageBinding.prototype.handleBroadcast = function ( broadcast, arg ) {
	
	PageBinding.superclass.handleBroadcast.call ( this, broadcast, arg );
	
	switch ( broadcast ) {
		
		/*
		 * This broadcast means that we can unlock a  
		 * page that was performing a postback.
		 */
		case BroadcastMessages.MESSAGEQUEUE_REQUESTED :
			var isAutoUpdate = arg;
			if ( !this._canPostBack && !isAutoUpdate ) {
				this._canPostBack = true;
				Application.unlock ( this );
			}
			break;
	}
};

/** 
 * To dot or not dot net.
 * @return {boolean}
 */
PageBinding.prototype._isDotNet = function () {
	
	var form = this.bindingDocument.forms [ 0 ];
	
	return ( 
		form != null && 
		typeof this.bindingWindow.__doPostBack != "undefined"
	);
};

/**
 * Do postback.
 * @param {binding} binding This lucky bindings callbackid will be transmitted to server.
 */
PageBinding.prototype.doPostBack = function ( binding ) {
	
	if ( this._canPostBack ) {
		if ( binding != null && this._isDotNet ()) {
			
			var callbackid = binding.getCallBackID ();
			var callbackarg = binding.getCallBackArg ();
			
			/*
			 * Did some guy use ClientID instead of UniqueID?
			 */
			if ( callbackid != null ) {
				callbackid = callbackid.replace ( /_/g, "$" );
			} else {
				callbackid = "";
			}
			
			if ( callbackarg == null ) {
				callbackarg = "";
			}
			
			this.bindingWindow.__doPostBack ( callbackid, callbackarg );
		}
	}
};

/**
 * Validate all attached DataBindings. Discontinue validation 
 * as soon as the first invalid binding is encountered.
 * @return {boolean}
 */
PageBinding.prototype.validateAllDataBindings = function (activateTabWidthError) {

	var isValid = true;
	var dataBindings = this.bindingWindow.DataManager.getAllDataBindings();

	while (dataBindings.hasNext() && isValid) {
		var dataBinding = dataBindings.getNext();
		if (dataBinding.isAttached) { // could be nested in lazy binding
			var isBindingValid = dataBinding.validate();
			if (isValid && !isBindingValid) {
				isValid = false;
				this.logger.debug("Invalid DataBinding: " + dataBinding.toString() + " (" + dataBinding.getName() + ")");
				if (activateTabWidthError) {
					var tabPanelBinding = dataBinding.getAncestorBindingByType(TabPanelBinding);
					if (tabPanelBinding != null && !tabPanelBinding.isVisible) {
						var tabBoxBinding = tabPanelBinding.getAncestorBindingByType(TabBoxBinding);
						var tabBinding = tabBoxBinding.getTabBinding(tabPanelBinding);
						tabBoxBinding.select(tabBinding);
					}
				}

				break;
			}
		}

	}
	return isValid;
};

/**
 * Manifest all attached DataBindings. 
 * This should always be invoked preceding server postback.
 * @return {List}
 */
PageBinding.prototype.manifestAllDataBindings = function () {

	var list = new List ();
	var dataBindings = this.bindingWindow.DataManager.getAllDataBindings ();
	
	while ( dataBindings.hasNext ()) {
		var dataBinding = dataBindings.getNext ();
		if ( dataBinding.isAttached ) { // could be nested in lazy binding
			var result = dataBinding.manifest ();
			if ( result != null ) {
				list.add ( result );
			}
		}
	}
	return list;
};

/**
 * Clean all DataBindings.
 */
PageBinding.prototype.cleanAllDataBindings = function () {
	
	// this.bindingWindow.DataManager.isDirty = false;
	
	var dataBindings = this.bindingWindow.DataManager.getAllDataBindings ();
	while ( dataBindings.hasNext ()) {
		var dataBinding = dataBindings.getNext ();
		if ( dataBinding.isAttached ) { // otherwise still clean
			dataBinding.clean ();
		}
	}
};

/**
 * Implements {ILabel}
 * @return {string}
 */
PageBinding.prototype.getLabel = function () {

	var label = "";
	if (!label && this.labelfield){
		var binding = this.bindingWindow.DataManager.getDataBinding(this.labelfield);
		if (binding != null && binding.getLabel) {
			label = binding.getLabel();
		} else if (binding != null && binding.getValue) {
			label = binding.getValue();
		} 
	}
	if (!label && this.label) {
		label = this.label;
	}

	return label;
};

/**
 * Implements {ILabel}
 * @return {string}
 */
PageBinding.prototype.getImage = function () {
	
	return this.image;
};

/**
 * Implements {ILabel}
 * @return {string}
 */
PageBinding.prototype.getToolTip = function () {
	
	return this.toolTip;
};

/**
 * Relevant for dialog sub pages??????????????????????
 * @return {int}
 */
PageBinding.prototype.getHeight = function () {

	return this.bindingElement.offsetHeight;
};

/**
 * Focus last focused binding when the containing {@link IActivatable} gets activated.
 * @see {DockBinding#activate}
 * @see {DialogBinding#activate}
 * @see {FocusBinding#setActiveInstance}
 */
PageBinding.prototype.onActivate = function () {
	
	if ( Binding.exists ( this )) { // the devils!
		if ( !this.isActivated ) {
			this.isActivated = true;
			if ( this._isFocusManager ) {
				if ( UserInterface.isBindingVisible ( this )) {
				    /*
				    * For some strange reason, Explorer has lost 
				    * the ability to focus inputs reliably unless 
				    * focus was moved to something else first...
				    */
				    try {
				        var win = this.bindingWindow;
				        win.focus(); // this seems to fix it!
				    } catch (exception) {
				        // Explorer can always find an exception for the focus event...
				    }
					if ( this._cachedFocus != null ) {
						/*
						 * Timeout allows any mouse-targetted 
						 * focusable to focus first.
						 */
						var self = this;
						setTimeout ( function () {
							if ( FocusBinding.focusedBinding == null ) {
								self._focusPreviouslyFocused ();
							}
						}, 0 );
					} else {
						this._focusFirstFocusable ();
					}
				}
			}
		}
	}
};

/**
 * Blur last focused binding when the containing {@link IActivatable} gets deactivated.
 * @see {DockBinding#deactivate}
 * @see {DialogBinding#deactivate}
 * @see {FocusBinding#setActiveInstance}
 */
PageBinding.prototype.onDeactivate = function () {
	
	if ( this.isActivated == true ) {
		this.isActivated = false;
		if ( this._cachedFocus != null ) {
			var binding = this._cachedFocus.getBinding ();
			if ( binding ) {
				binding.blur ();
			}
		}
		if ( FocusBinding.activeInstance == this ) {
			FocusBinding.activeInstance = null;
		}
	}
};