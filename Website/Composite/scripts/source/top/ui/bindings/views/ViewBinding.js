ViewBinding.prototype = new FlexBoxBinding;
ViewBinding.prototype.constructor = ViewBinding;
ViewBinding.superclass = FlexBoxBinding.prototype;

ViewBinding.ACTION_LOADED = "view loaded";
ViewBinding.ACTION_ONCLOSE = "view onclose";
ViewBinding.ACTION_ONCLOSE_FORCE = "view onclose force";
ViewBinding.ACTION_CLOSED = "view closed";
ViewBinding.ACTION_DETACH = "view detach";

ViewBinding.HORIZONTAL_ADJUST = 1;
ViewBinding.VERTICAL_ADJUST = 1;

/*
 * These strings get attached to 
 * respective views as classnames.
 */
ViewBinding.TYPE_EXPLORERVIEW = "explorerview";
ViewBinding.TYPE_DOCKVIEW = "dockview";
ViewBinding.TYPE_DIALOGVIEW = "dialogview";

/*
 * Classname activated.
 */
ViewBinding.CLASSNAME_ACTIVE = "active";

 /** 
  * Timeout in seconds before assuming an ASPX error.
  * @type {int}
  */
ViewBinding.TIMEOUT = 15;

/**
 * Considered private, see below.
 * @type {Map<string><ViewBinding>}
 */
ViewBinding._instances = new Map ();

/**
 * Has Instance?
 * @param {string} handle
 * @return {Boolean};
 */
ViewBinding.hasInstance = function (handle) {

	return ViewBinding._instances.has(handle);
}

/**
 * Get instance by handle.
 * @param {string} handle
 * @return {ViewBinding}
 */
ViewBinding.getInstance = function ( handle ) {
	
	var result = ViewBinding._instances.get ( handle );
	//if ( !result ) {
	//	var cry = "ViewBinding.getInstance: No such instance: " + handle;
	//	SystemLogger.getLogger ( "ViewBinding [static]" ).error ( cry );
	//	SystemDebug.stack ( arguments );
	//	if ( Application.isDeveloperMode ) {
	//		alert ( cry );
	//	}
	//}
	return result;
}

/**
 * @class
 */
function ViewBinding () {

	/**
	 * @type {SystemLogger}
	 */
	this.logger = SystemLogger.getLogger ( "ViewBinding" );
	
	/**
	 * @type {ViewDefinition}
	 */
	this._viewDefinition = null;
	
	/**
	 * @type {boolean}
	 */
	this.isVisible = false;
	
	/**
	 * @type {boolean}
	 */
	this._isViewBindingInitialized = false;
	
	/**
	 * @type {Binding}
	 */ 
	this._snapBinding = null;
	
	/**
	 * @type {boolean}
	 */
	this.isFreeFloating = false;
	
	/**
	 * Remember that the window is hidden while attaching due to CSS.
	 * @type {WindowBinding}
	 */
	this.windowBinding = null;
	
	/**
	 * @type {CoverBinding}
	 */
	this._coverBinding = null;
		
	/**
	 * @type {boolean}
	 */
	this._isLoaded = false;
	
	/**
	 * Patches a strange bug in mozilla.
	 */
	this._isFirstShow = true;
	
	/**
	 * Defaults to dockview.
	 * @type {string);
	 */
	this._type = ViewBinding.TYPE_DOCKVIEW;
	
	/**
	 * Points to the currently hosted PageBinding.
	 * @type {PageBinding);
	 */
	this._pageBinding = null;
	
	/**
	 * Backup position to minimize updates.
	 * @type {Point}
	 */
	this._lastknownposition = null;
	
	/**
	 * Backup dimension to minimize updates.
	 * @type {Dimension}
	 */
	this._lastknowndimension = null;
	
	/**
	 * @type {boolean}
	 */
	this.isActivated = false;
	
	/*
	 * Returnable.
	 */
	return this;
}

/**
 * Identifies binding.
 */
ViewBinding.prototype.toString = function () {

	return "[ViewBinding]";
}

/**
 * @overloads {FlexBoxBinding#onBindingRegister}
 */
ViewBinding.prototype.onBindingRegister = function () {

	ViewBinding.superclass.onBindingRegister.call ( this );

	this.addActionListener ( RootBinding.ACTION_PHASE_1 );
	this.addActionListener ( RootBinding.ACTION_PHASE_2 );
	this.addActionListener ( RootBinding.ACTION_PHASE_3 );
	this.addActionListener ( WindowBinding.ACTION_LOADED );
	this.addActionListener ( WindowBinding.ACTION_ONLOAD );
	this.addActionListener ( PageBinding.ACTION_ATTACHED );
	this.addActionListener ( PageBinding.ACTION_INITIALIZED );
	this.addActionListener ( ViewBinding.ACTION_DETACH );
	
	/*
	 * Performance timing related.
	 */
	this.addActionListener ( WizardPageBinding.ACTION_NAVIGATE_NEXT );
	this.addActionListener ( WizardPageBinding.ACTION_NAVIGATE_PREVIOUS );
	this.addActionListener ( WizardPageBinding.ACTION_FINISH );
	
	/*
	 * Tune in on broadcasted closing statements.
	 */
	this.subscribe ( BroadcastMessages.CLOSE_VIEW );
	this.subscribe ( BroadcastMessages.APPLICATION_SHUTDOWN );
}

/**
 * Attach special classname depending on type.
 * @overloads {Binding#onBindingAttach}
 */
ViewBinding.prototype.onBindingAttach = function () {

	ViewBinding.superclass.onBindingAttach.call ( this );
	this.attachClassName ( this._type );
	
	/*
	 * Explorer shows a brief flash of white sometimes. Build cover 
	 * for smoother page transitions when window is loaded and unloaded. 
	 */
	if ( Client.isExplorer == true ) {
		this._coverBinding = this.add (
			CoverBinding.newInstance ( this.bindingDocument ) 
		);
		this._coverBinding.attach ();
	}

	if (this._viewDefinition && this._viewDefinition.position == DockBinding.START)
	{
		this.setProperty("position", DockBinding.START);
	}
	
	/*
	 * Attach window.
	 */
	this.windowBinding.attach ();
}

/**
 * @overwrites {FlexBoxBinding#flex}
 * @return
 */
ViewBinding.prototype.updatePositionDimension = function () {
		
	var snap = this._snapBinding;
	
	/*
	 * For some reason, IE enters here when the user has 
	 * no perspectives. This should be considered a hack. 
	 * TODO: Mozilla is allowed to pass because he doesn't 
	 * fail. IE is blocked. But now the difference is that 
	 * IE is allowed to see the Start-screen. Synch this!
	 */
	var isAbort = !System.hasActivePerspectives && Client.isExplorer;
	
	if ( this.isFreeFloating == true && !isAbort ) {
		if ( snap.isVisible == true ) {
			if ( snap.isAttached == true ) {
			
				var position = snap.boxObject.getGlobalPosition ();
				var dimension = snap.boxObject.getDimension ();
			
				/*
				 * Update position.
				 */
				if ( !Point.isEqual ( position, this._lastknownposition )) {
					
					this.setPosition ( position );
					this._lastknownposition = position;
				}
				
				
				/*
				 * Update dimension.
				 */
				if ( !Dimension.isEqual ( dimension, this._lastknowndimension )) {
					
					this.setDimension ( dimension );
					this._lastknowndimension = dimension;
					
					var result = dimension.h - ViewBinding.VERTICAL_ADJUST;
					result = result < 0 ? 0 : result;
					
					this.windowBinding.getBindingElement ().style.height = new String ( result ) + "px";
					this.windowBinding.reflex ();
					
				} else {
					
					throw "Could not snap to unattached binding!";
				}
			}
		}
	}
}

/**
 * @overloads {Binding#onBindingDispose}
 */
ViewBinding.prototype.onBindingDispose = function () {
	
	ViewBinding.superclass.onBindingDispose.call ( this );
	
	/*
	 * Cancel the serverside flow in case dispose 
	 * was instantiated by a clientside action.
	 */
	if ( this._viewDefinition != null ) {
		var flowhandle = this._viewDefinition.flowHandle;
		if ( flowhandle != null ) {
			FlowControllerService.CancelFlow ( flowhandle );
		}
	}
	
	if ( this._viewDefinition != null ) {
		
		var handle = this._viewDefinition.handle;
		EventBroadcaster.broadcast ( BroadcastMessages.VIEW_CLOSED, handle );
		this.logger.fine ( "ViewBinding closed: \"" + handle + "\"" );
		/*
		 * Odd fact: Mozilla will evaluate this twice unless 
		 * wrapped in a timeout. You can also make it evaluate it   
		 * once by alerting just bofore, but that wont help us. 
		 *
		var handle = this._viewDefinition.handle;
		setTimeout ( function () {
			EventBroadcaster.broadcast ( BroadcastMessages.VIEW_CLOSED, handle );
			SystemLogger.getLogger ( "FISSE" ).fatal ( handle );
		}, 0 );
		*/
	}
	
	this.dispatchAction ( ViewBinding.ACTION_CLOSED );
}

/**
 * Set type.
 * @param {string} type
 */
ViewBinding.prototype.setType = function ( type ) {
	
	this._type = type;
}

/**
 * Get type.
 * @return {string}
 */
ViewBinding.prototype.getType = function () {
	
	return this._type;
}

/**
 * Get handle. Technically, handle of the associated ViewDefinition.
 * @return {string} 
 */
ViewBinding.prototype.getHandle = function () {
	
	var result = null;
	if ( this._viewDefinition != null ) {
		result = this._viewDefinition.handle;
	}
	return result;
}

/**
 * TODO: update this method description.
 * Initialize when associated tab is selected. 
 * This method is called by the {@link StageBinding}.
 * SNAPTARGET views initialize when snapToBinding is invoked!!!
 */
ViewBinding.prototype.initialize = function () {

	if ( !this._isViewBindingInitialized ) {
		this._isViewBindingInitialized = true;
		this.windowBinding.setURL ( 
			this._viewDefinition.url 
		);
		EventBroadcaster.broadcast ( BroadcastMessages.VIEW_OPENING, this.getHandle ());
	} else {
		throw ( "Somehow ViewBinding got initialized twice: " + this.getHandle ());
	}
}

/**
 * Set associated ViewDefinition.
 * @param {ViewDefinition} definition
 */
ViewBinding.prototype.setDefinition = function ( definition ) {
	
	this._viewDefinition = definition;
	if (definition.position == DockBinding.MAIN) {
		this.subscribe ( BroadcastMessages.CLOSE_VIEWS );
	}
}

/**
 * Get associated ViewDefinition.
 * @return {ViewDefinition}
 */
ViewBinding.prototype.getDefinition = function () {
	
	return this._viewDefinition;
}

/**
 * Implements (@link IActionListener} 
 * @param {Action} action
 */
ViewBinding.prototype.handleAction = function ( action ) {

	ViewBinding.superclass.handleAction.call ( this, action );
	
	var binding = action.target;

	switch ( action.type ) {
	
		case RootBinding.ACTION_PHASE_1 :
		case RootBinding.ACTION_PHASE_2 :
		case RootBinding.ACTION_PHASE_3 :
			
			/*
			 * Activate the root binding?
			 */
			if ( action.type == RootBinding.ACTION_PHASE_1 ) {
				if ( this.isActivated && !binding.isActivated ) {
					binding.onActivate ();
				}
			}
			
			/*
			 * Consume these events. They are 
			 * intended for ViewBinding content.
			 */
			action.consume ();
			break;
	
		case Binding.ACTION_DIMENSIONCHANGED :
			if ( this.isFreeFloating == true ) {
				if ( binding == this._snapBinding ) {
				 	if ( this.isVisible == true ) {
						this.updatePositionDimension ();
						action.consume ();
					}
				}
			}
			break;
		
		case Binding.ACTION_VISIBILITYCHANGED : // see {DockBinding#interceptDisplayChange}
			if ( this.isFreeFloating == true ) {
				if ( binding == this._snapBinding ) {
					if ( binding.isVisible == true ) {
						this.show ();
					} else {
						this.hide ();
					}
				}
			}
			// can we consume this?
			break;
		
		case WindowBinding.ACTION_LOADED :
		case WindowBinding.ACTION_ONLOAD :
			
			if ( binding.getContentWindow ().isPostBackDocument ) {
				// @see {MessageQueue#openView}
				if ( action.type == WindowBinding.ACTION_ONLOAD ) {
					var arg = this._viewDefinition.argument;
					if ( arg != null && arg.list != null && arg.url != null ) {
						binding.post ( arg.list, arg.url ); 
						arg.list = null;
						arg.url = null;
						// note that this prevents a repeat! Otherwise, 
						// the previewwindow would fire this stuff...
						// TODO: hack this elsehow...
					}
				}
			} else {
				if ( Client.isExplorer == true ) {
					if ( binding == this.windowBinding ) {
						var self = this;
						DOMEvents.addEventListener ( 
							binding.getContentWindow (), 
							DOMEvents.UNLOAD, { // beforeunload invoked at random in exploder!
								handleEvent : function ( e ) {
									if ( Binding.exists ( self._coverBinding ) == true ) {
										self._coverBinding.show ();
									}
								}
							});
					}
					if ( action.type == WindowBinding.ACTION_ONLOAD ) {
						if ( this._coverBinding ) {
							this._coverBinding.hide ();
						}
					}
				}
			}
			
			/*
			 * Show non-framework document now. Otherwise  
			 * we wait for the PageBinding to initialize.
			 */
			if ( action.type == WindowBinding.ACTION_ONLOAD ) {
				var win = binding.getContentWindow ();
				if ( win.WindowManager == null ) {
					if ( !this._isLoaded ) {
						this._onLoadingCompleted ( binding );
					}
				}
			}
			action.consume ();
			break;
		
		case PageBinding.ACTION_ATTACHED :
			
			// reload scenario - PLEASE REFACTOR!
			if ( !binding.label && this._viewDefinition.label ) {
				binding.label = this._viewDefinition.label;
			}
			if ( !binding.image && this._viewDefinition.image ) {
				binding.image = this._viewDefinition.image;
			}
			
			/*
			 * Pin a reference to the currently mounted PageBinding 
			 * and set the page argument. Notice that all loaded pages 
			 * get served the same argument (although not subpages).
			 */
			if ( binding.bindingWindow == this.getContentWindow ()) {
				this._pageBinding = binding;
				this._injectPageArgument ();
			}

		case PageBinding.ACTION_INITIALIZED :
			
			/*
			 * Show myself when the root page initializes.
			 */
			if ( binding.bindingWindow == this.getContentWindow ()) {
				if ( Client.isExplorer && this._coverBinding ) {
					this._coverBinding.hide ();
				}
				if ( !this._isLoaded ) {
					this._onLoadingCompleted ();
				}
			}
			// dont consume - DockBinding and StageDialogBinding are listening!
			break;
		

		case Binding.ACTION_DISPOSED :
			
			if ( this.isFreeFloating && binding == this._snapBinding ) {
				this.removeActionListener ( Binding.ACTION_DISPOSED );
				this.dispose ();
				action.consume ();
			}
			break;
		
		/*
		 * 
		 */
		case WizardPageBinding.ACTION_NAVIGATE_NEXT :
		case WizardPageBinding.ACTION_NAVIGATE_PREVIOUS :
		case WizardPageBinding.ACTION_FINISH :
			EventBroadcaster.broadcast ( BroadcastMessages.VIEW_OPENING, this.getHandle ());
			action.consume ();
			break;
		
		/*
		 * Detach view from server control. This happens when the server error page 
		 * is shown (since workflow termination will automatically close the view). 
		 * Detach is done simply by switching the associated {@link ViewDefinition}.
		 * TODO: Something more elegant?
		 */
		case ViewBinding.ACTION_DETACH :
			this.setDefinition ( ViewDefinitions [ "Composite.Management.Null" ]);
			ViewBinding._instances.set ( this._viewDefinition.handle, this );
			// don't consume - TabPanelBinding is listening (waiting to un-dirty the tab).
			break;
	}
}

/**
 * Implements (@link IBroadcastListener}
 * @param {string} broadcast 
 * @param {object} arg
 */
ViewBinding.prototype.handleBroadcast = function ( broadcast, arg ) {
	
	ViewBinding.superclass.handleBroadcast.call ( this, broadcast, arg );
	
	switch ( broadcast ) {
		
		case BroadcastMessages.CLOSE_VIEW :
			if ( arg == this._viewDefinition.handle ) {
				this.dispatchAction ( ViewBinding.ACTION_ONCLOSE );
			}
			break;
			
		case BroadcastMessages.CLOSE_VIEWS :
			if (this._viewDefinition.position == DockBinding.MAIN) {
				this.dispatchAction ( ViewBinding.ACTION_ONCLOSE_FORCE );
			}
			break;
			
		case BroadcastMessages.APPLICATION_SHUTDOWN :
			this.dispose (); // this should happen automatically, but no...
			break;
	}
}

/**
 * On loading completed.
 */
ViewBinding.prototype._onLoadingCompleted = function () {
	
	if ( !this._isLoaded ) {
		this._open ();
		this._isLoaded = true;
	}
}

/**
 * Do stuff when opened.
 * @see {ViewBinding#onBindingDispose}
 */
ViewBinding.prototype._open = function () {
	
	ViewBinding._instances.set ( this._viewDefinition.handle, this );
	this.dispatchAction ( ViewBinding.ACTION_LOADED );
	EventBroadcaster.broadcast ( BroadcastMessages.VIEW_OPENED, this._viewDefinition.handle );
	this.show ();
	
	this.logger.fine ( "ViewBinding opened: \"" + this._viewDefinition.handle + "\"" );
}

/**
 * This method is invoked by the StageBinding when an already open ViewBinding 
 * gets re-opened. The associated ViewDefinition argument is yet again relayed 
 * to the contained PageBinding (if changed since last).
 * @see {StageBinding#_view}
 */
ViewBinding.prototype.update = function () {
	
	this.dispatchAction ( Binding.ACTION_ACTIVATED );
	this._injectPageArgument ();
}

/**
 * Relay ViewDefinition argument to contained PageBinding. 
 */
ViewBinding.prototype._injectPageArgument = function () {
	
	var page = this._pageBinding;
	var def = this._viewDefinition;
	
	if ( page != null ) {
		
		var argument = def.argument;
		if ( argument != null ) {
			page.setPageArgument ( argument );
		}
		var width = def.width;
		if ( width != null ) {
			page.width = width;
		}
		var height = def.height;
		if ( height != null ) {
			page.height = height;
		}
	}
}

/**
 * Handle crawler.
 * @implements {ICrawlerHandler}
 * @param {Crawler} crawler
 */
ViewBinding.prototype.handleCrawler = function ( crawler ) {
	
	ViewBinding.superclass.handleCrawler.call ( this, crawler );
	
	switch ( crawler.type ) {
		
		/*
		 * Redirect descending crawlers back to DockPanelBinding. 
		 * Otherwise the crawler would continue straight to the 
		 * next view (because it is now crawling the viewset).  
		 */
		case NodeCrawler.TYPE_DESCENDING :
			if ( this.isFreeFloating == true ) {
				if ( crawler.id == FocusCrawler.ID ) {
					if ( crawler.previousNode != this._snapBinding.bindingElement ) {
						crawler.response = NodeCrawler.SKIP_NODE;
					}
				}
			}
			break;
		
		/*
		 * Relay ascending crawlers to DockPanelBinding.
		 */
		case NodeCrawler.TYPE_ASCENDING :
			
			if ( this.isFreeFloating == true ) {
				crawler.nextNode = this._snapBinding.bindingElement;
			}
			break;
	}
}

/**
 * Show. Specialized setup for free-floating views.
 * @overwrites {Binding#show}
 */
ViewBinding.prototype.show = function () {
	
	if ( !this.isVisible ) {
		if (this.isFreeFloating == true) {
			
			//Workaround for #4508
			if (Client.isWebKit)
				this.bindingElement.style.display = "";

			if (this._type == ViewBinding.TYPE_DOCKVIEW && this.windowBinding != null) {
				this.windowBinding.getBindingElement ().style.position = "static";
			}
			this.updatePositionDimension ();
			this.isVisible = true;
		} else {
			ViewBinding.superclass.show.call ( this );
		}
	}
}

/**
 * Hide. Specialized setup for free-floating views.
 * @overwrites {Binding#hide}
 */
ViewBinding.prototype.hide = function () {
	
	if ( this.isVisible == true ) {
		if ( this.isFreeFloating == true ) {
			if ( this.windowBinding ) {
				this.windowBinding.getBindingElement ().style.position = "absolute";
			}
			this.bindingElement.style.top = "-10000px";
			
			//Workaround for #4508
			if (Client.isWebKit)
				this.bindingElement.style.display = "none";
			
			this.isVisible = false;
		} else {
			ViewBinding.superclass.hide.call ( this );
		}
	}
}

/**
 * @param {Point} point
 */  
ViewBinding.prototype.setPosition = function ( point ) {

	point.x += ViewBinding.HORIZONTAL_ADJUST;
	
	this.bindingElement.style.left = point.x + "px";
	this.bindingElement.style.top = point.y + "px";
}

/**
 * @param {Dimension} dimension
 */  
ViewBinding.prototype.setDimension = function ( dimension ) {

	dimension.h -= ViewBinding.VERTICAL_ADJUST;
	dimension.w -= ViewBinding.HORIZONTAL_ADJUST;
	
	/*
	 * Something hardcoded here...
	 */
	dimension.w -= 1;
	
	if ( dimension.h < 0 ) { // not sure why this happens...
		dimension.h = 0;
	}
	if ( dimension.w < 0 ) {
		dimension.w = 0;
	}
	this.bindingElement.style.width = String ( dimension.w ) + "px";
	this.bindingElement.style.height = String ( dimension.h ) + "px";
}

/**
 * TODO: create an interface to check for.
 * @param {Binding} binding
 */
ViewBinding.prototype.snapToBinding = function (binding, floating) {
	
	// Disable standard flexbox behavior. 
	// TODO: enable for floating docks????????????????????????????????????????????
	this.isFlexBoxBehavior = false;

	// Listen for these events instead... 
	binding.addActionListener ( Binding.ACTION_DIMENSIONCHANGED, this );
	binding.addActionListener ( Binding.ACTION_VISIBILITYCHANGED, this );
	binding.addActionListener ( Binding.ACTION_DISPOSED, this );
	
	// Unregister any previous snap target.
	if ( this._snapBinding ) {
		this._snapBinding.removeActionListener ( Binding.ACTION_DIMENSIONCHANGED, this );
		this._snapBinding.removeActionListener ( Binding.ACTION_VISIBILITYCHANGED, this );
		this._snapBinding.removeActionListener ( Binding.ACTION_DISPOSED, this );
		this._snapBinding.viewBinding = null;
	}
	this._snapBinding = binding;
	this._snapBinding.viewBinding = this;
	this.isFreeFloating = floating !== false; // dafault is true
	
	// Initialize when first shown, creating and loading the WindowBinding
	if ( !this._isViewBindingInitialized ) {
		this.initialize ();
	}
}

/**
 * Very special setup: Migrate all Actions to the snaptarget 
 * binding! Please note that this breaks the convention of 
 * Actions travelling upwards in the structural hierarchy.
 * @overwrites {Binding#getMigrationParent}.
 */
ViewBinding.prototype.getMigrationParent = function () {

	var result = null;
	if ( this.isFreeFloating == true ) {
		result = this._snapBinding.getBindingElement ();
	} else {
		result = ViewBinding.superclass.getMigrationParent.call ( this );
	}
	return result;
}

/**
 * Get the window object hosted by this ViewBinding. 
 * During startup, this may be undefined. 
 * @return {DOMDocumentView}
 */
ViewBinding.prototype.getContentWindow = function () {
	
	return this.windowBinding.getContentWindow ();
}

/**
 * Get the document object hosted by this ViewBinding. 
 * During startup, this may be undefined. 
 * @return {DOMDocument}
 */
ViewBinding.prototype.getContentDocument = function () {
	
	return this.windowBinding.getContentDocument ();
}

/**
 * Get the {@link RootBinding} hosted by this ViewBinding. 
 * During startup, this may be undefined. 
 * @return {RootBinding}
 */
ViewBinding.prototype.getRootBinding = function () {
	
	return this.windowBinding.getRootBinding ();
}

/**
 * Get the {@link RootBinding} hosted by this ViewBinding. 
 * During startup, this may be undefined. 
 * @return {PageBinding}
 */
ViewBinding.prototype.getPageBinding = function () {
	
	return this._pageBinding;
}

/**
 * Reload view. For now, this is only a developer feature.
 * @param {boolean} isClearCache Clear the cache in Prism.
 */
ViewBinding.prototype.reload = function ( isClearCache ) {
	
	this._isLoaded = false;
	this.windowBinding.reload ( isClearCache );
	EventBroadcaster.broadcast ( BroadcastMessages.VIEW_OPENING, this.getHandle ());
}

/**
 * Save contained editor. Probably invoked by DockBinding.
 * @see {DockBinding#saveContainedEditor}
 */
ViewBinding.prototype.saveContainedEditor = function () {
	
	var isSuccess = false;
	var page = this._pageBinding;
	if ( page != null && page instanceof EditorPageBinding ) {
		if ( page.canSave ()) {
			page.doSave ();
			isSuccess = true;
		}
	}
	if ( !isSuccess ) {
		this.logger.error ( "saveContainedEditor failed" );
	}
}

/**
 * Invoked be ancestor {IActivatable} when activated. 
 * Invokes similar method on root binding, igniting a 
 * chain reaction on all descendant root bindings.
 */
ViewBinding.prototype.onActivate = function () {
	
	if ( !this.isActivated ) {
		this.isActivated = true;
		var root = this.getRootBinding ();
		if ( root != null ) {
			root.onActivate ();
		}
	}
}

/**
 * Invoked be ancestor {IActivatable} when deactivated. 
 * See comment above.
 */
ViewBinding.prototype.onDeactivate = function () {
	
	if ( this.isActivated == true ) {
		this.isActivated = false;
		var root = this.getRootBinding ();
		if ( root != null ) {
			this.getRootBinding ().onDeactivate ();
		}
	}
}

/**
 * ViewBinding factory.
 * @param {DOMDocument} ownerDocument
 * @return {ViewBinding}
 */
ViewBinding.newInstance = function ( ownerDocument ) {

	var element = DOMUtil.createElementNS ( Constants.NS_UI, "ui:view", ownerDocument );
	var binding = UserInterface.registerBinding ( element, ViewBinding );
	binding.windowBinding = binding.add ( WindowBinding.newInstance ( ownerDocument ));
	return binding;
}