StageBinding.prototype = new FocusBinding;
StageBinding.prototype.constructor = StageBinding;
StageBinding.superclass = FocusBinding.prototype;

StageBinding.ACTION_DECK_LOADED = "stage deck loaded";
StageBinding.CLASSNAME_EMPTY = "empty";
StageBinding.ACTION_START_LOADED = "stage start loaded";


/**
 * Static reference to the single StageBinding instance. Assigned on startup.
 * @type {StageBinding}
 */
StageBinding.bindingInstance = null;

/**
 * The {@link SystemNode} hat build the currently selected perspective.
 * Updated by method {@link StageDecksBinding#setSelectionByHandle}
 * @type {SystemNode}
 */
StageBinding.perspectiveNode = null;

/**
 * The serializedEntityToken associated to the {@link DockTabBinding}
 * that is selected AND activated on the current perspective. May be null.
 * Updated by method {@link DockTabBinding#_updateGlobalEntityToken}
 * @type {string}
 */
StageBinding.entityToken = null;

/**
* The current tree selector binding
* @type {SystemTreeBinding}
*/
StageBinding.treeSelector = null;


/**
* The current placeholder width
* @type {SystemTreeBinding}
*/
StageBinding.placeholderWidth = null;


/**
 * Hide OR show a ViewDefinition on stage (dependant on its current status).
 * @param {string} handle
 * @param {Binding?} contextSource
 */
StageBinding.handleViewPresentation = function ( handle, contextSource) {

	if ( StageBinding.isViewOpen ( handle )) {
		EventBroadcaster.broadcast ( BroadcastMessages.CLOSE_VIEW, handle );
	} else {
		var definition = ViewDefinitions [ handle ];
		StageBinding.presentViewDefinition(definition, contextSource);
	}
}

/**
 * Is view open?
 * @param {string} handle
 */
StageBinding.isViewOpen = function ( handle ) {

	return StageBinding.bindingInstance._activeViewDefinitions [ handle ] != null;
}

/**
 * @param {string} handle
 */
StageBinding.setSelectionByHandle = function (handle) {
	//TODO refactor this
	StageBinding.bindingInstance._explorerBinding.setSelectionByHandle(handle);
}

/**
 */
StageBinding.getSelectionHandle = function () {
	//TODO refactor this
	return StageBinding.bindingInstance._explorerBinding.getSelectionHandle();
}

StageBinding.selectBrowserTab = function () {

	StageBinding.bindingInstance.selectBrowserTab();
}


/**
 * Present ViewDefinition on stage.
 * @param {ViewDefinition} definition
 * @param {Binding?} contextSource
 */
StageBinding.presentViewDefinition = function (definition, contextSource) {

	if ( definition.label != null ) {
		var string = StringBundle.getString ( "ui", "Website.App.StatusBar.Opening" );
		StatusBar.busy ( string, [ definition.label ]);
	} else {
		StatusBar.busy ();
	}
	StageBinding.bindingInstance._presentViewDefinition(definition, contextSource);
}


/**
 * @param {string} handle
 * @return {Promise}
 */
StageBinding.select = function (perspectiveElementKey) {

	var promise = new Promise(function (resolve, reject) {
		if (perspectiveElementKey && perspectiveElementKey != StageBinding.getSelectionHandle()) {
			var handler = {
				handleBroadcast: function (broadcast, arg) {
					switch (broadcast) {
						case BroadcastMessages.STAGEDECK_CHANGED:
							if (arg == perspectiveElementKey) {
								EventBroadcaster.unsubscribe(BroadcastMessages.STAGEDECK_CHANGED, this);
								StageBinding.selectBrowserTab();
								resolve();
							}
							break;
					}
				}
			}
			EventBroadcaster.subscribe(BroadcastMessages.STAGEDECK_CHANGED, handler);
			StageBinding.setSelectionByHandle(perspectiveElementKey);
		} else {
			resolve();
		}
	});
	
	return promise;
}


/**
 * @class
 */
function StageBinding () {

	/**
	 * @type {SystemLogger}
	 */
	this.logger = SystemLogger.getLogger ( "StageBinding" );

	/**
	 * Associating handles to presently active viewDefinitions.
	 * @type {HashMap<string><ViewDefinition>}
	 * @private
	 */
	this._activeViewDefinitions = {};

	/**
	 * @type {StageDecksBinding}
	 * @private
	 */
	this._decksBinding = null;

	/**
	 * @type {ExplorerBinding}
	 * @private
	 */
	this._explorerBinding = null;

	/**
	 * Flipped when both explorer and decks are loaded.
	 * @type {boolean}
	 */
	this._isStageReady = false;

	/**
	 * Flipped when a "page" is loaded in {@link ExplorerBinding}.
	 * @type {boolean}
	 */
	this._isExplorerReady = false;

	/**
	 * Flipped when a deck is loaded in the {@link StageDecksBinding}.
	 * @type {boolean}
	 */
	this._isDecksReady = false;

	/**
	 * Indexing system docks by reference property.
	 * @type {Map<string><DockBinding>}
	 */
	this._dockBindings = new Map ();

	/**
	 * True when Start screen is visible.
	 * @type {boolean}
	 */
	this._isShowingStart = false;

	/**
	 * Makes no sense to handle activation in the app root.
	 * @implements {IActivationAware}
	 * @overwrites {FocusBinding#isActivationAware}
	 * @type {boolean}
	 */
	this.isActivationAware = false;

	/*
	 * Returnable.
	 */
	return this;
}

/**
 * Identifies binding.
 */
StageBinding.prototype.toString = function () {

	return "[StageBinding]";
}



// INITIALIZATION ................................................................

/**
 * Notice that we are simulating a {@link StageBoxHandlerAbstraction} in
 * the inheritance chain. That's because the {@link StageDeckBinding} is
 * interested in some of these functionalities as well.
 * Overloads {FlexBoxBinding#onBindingRegister}
 */
StageBinding.prototype.onBindingRegister = function () {

	StageBinding.superclass.onBindingRegister.call ( this );
	StageBinding.bindingInstance = this;

	/*
	 * This will add action listeners for:
	 * ControlBoxBinding.ACTION_MAXIMIZE
	 * ControlBoxBinding.ACTION_NORMALIZE
	 * StageBoxAbstraction.ACTION_HIDDENSTUFF_UPDATED
	 * StageSplitPanelBinding.ACTION_LAYOUTUPDATE
	 */
	StageBoxHandlerAbstraction.onBindingRegister.call ( this );

	/*
	 * Attach action listeners.
	 */

	this.addActionListener ( StageDecksBinding.ACTION_INITIALIZED );
	this.addActionListener ( TabBoxBinding.ACTION_ATTACHED );
	this.addActionListener ( TabBoxBinding.ACTION_SELECTED );
	this.addActionListener ( WindowBinding.ACTION_LOADED );
	this.addActionListener ( StageBinding.ACTION_DECK_LOADED );
	this.addActionListener ( StageDeckBinding.ACTION_LOADED );
	this.addActionListener ( ErrorBinding.ACTION_INITIALIZE );

	DOMEvents.addEventListener(top, DOMEvents.HASHCHANGE, this);

	/*
	 * File EventBroadcaster subscriptions.
	 */
	this.subscribe ( BroadcastMessages.VIEW_CLOSED );
	this.subscribe ( BroadcastMessages.VIEW_OPENED );
	this.subscribe ( BroadcastMessages.COMPOSITE_START );
	this.subscribe ( BroadcastMessages.COMPOSITE_STOP );
	this.subscribe ( BroadcastMessages.DOCK_MAXIMIZED );
	this.subscribe ( BroadcastMessages.DOCK_NORMALIZED );

	app.bindingMap.explorer.addActionListener(ExplorerBinding.ACTION_INITIALIZED, this);
	app.bindingMap.explorer.addActionListener(ExplorerMenuBinding.ACTION_SELECTIONCHANGED, this);

	app.bindingMap.app.addActionListener(StageBinding.ACTION_START_LOADED, this);

	/*
	 * Initialize root actions.
	 */
	this._initializeUsergroup();
	var root = System.getRootNode ();
	this._initializeRootActions ( root );

	/*
	 * Hookup root refresh. The broadcast is intercepted by StageDeckBinding.
	 * The associated tree is refreshed when deck gets selected.
	 */
	EventBroadcaster.subscribe ( BroadcastMessages.SYSTEMTREEBINDING_REFRESH, {
		handleBroadcast : function ( broadcast, arg ) {
			if ( arg == root.getEntityToken ()) {
				EventBroadcaster.broadcast ( BroadcastMessages.SYSTEMTREEBINDING_REFRESHALL );
			}
		}
	})

	/*
	 * Initialize perspectives (they may not be available for new user with no rights).
	 */
	var perspectives = System.getPerspectiveNodes ();
	if ( perspectives.hasEntries ()) {
		this._initializeSystemViewDefinitions ( perspectives );
	} else {
		top.app.bindingMap.stagecontainer.hide ();
		top.app.bindingMap.app.attachClassName(StageBinding.CLASSNAME_EMPTY);
		this._onStageReady ();
		Dialog.message (
			StringBundle.getString ( "ui", "Website.Dialogs.NoAccessTitle" ),
			StringBundle.getString ( "ui", "Website.Dialogs.NoAccessText" )
		);
	}

	/*
	var self = this;
	setTimeout ( function () {
		var dock = self._toolDockBinding;
		var tab = UserInterface.getBinding ( dock.getTabElements().get ( 0 ));
		//self._editorDockBinding.importTabBinding ( tab );
		//tab  = UserInterface.getBinding ( document.getElementById ( "temp" ));
		//self._editorDockBinding.importTabBinding ( tab );
		//document.getElementById ( "john" ).appendChild ( document.getElementById ( "aage" ));

	}, 3500 );
	*/
}

/**
 * Fires when both members - ExplorerBinding and StageDecksBinding - are initialized.
 * When no Flash is installed, the workbench is ready to be initialized right now.
 * Otherwise we wait for the {@link LocalStore} to report readystate.
 */
StageBinding.prototype._renameThisMethod = function () {

	if ( LocalStore.isInitialized ) {
		this._initializeWorkbenchLayout ();
	} else {
		var self = this;
		EventBroadcaster.subscribe (
			BroadcastMessages.LOCALSTORE_INITIALIZED, {
				handleBroadcast : function () {
					self._initializeWorkbenchLayout ();
				}
			}
		);
	}
}

/**
 * Initialize workbench layout.
 */
StageBinding.prototype._initializeWorkbenchLayout = function () {

	/**
	 * If LocalStore is operative, attempt to default select last edited perspective.
	 */
	if ( this._explorerBinding ) {
		var persistedHandle = null;
		if ( LocalStore.isEnabled ) {
			persistedHandle = LocalStore.getProperty (
				LocalStore.SELECTED_PERSPECTIVE_HANDLE
			);
		}
		if ( persistedHandle && ViewDefinitions [ persistedHandle ]) { // perspective may be gone since last!
			alert ( "StageBinding#_initializeWorkbenchLayout !!!!" );
			this._explorerBinding.setSelectionByHandle (
				unescape ( persistedHandle )
			);
		} else {
			this._explorerBinding.setSelectionDefault ();
		}
	} else {
		this._onStageReady ();
	}
}

/**
 * Fires when the stage is ready.
 * TODO: The stage may not nescessarily be interactive here!
 */
StageBinding.prototype._onStageReady = function () {

	if ( !this._isStageReady ) {
		if (top.app.bindingMap.maindecks) {
			top.app.bindingMap.maindecks.select("stagedeck");
		}

		EventBroadcaster.broadcast ( BroadcastMessages.STAGE_INITIALIZED );
		this._isStageReady = true;
	}
}

/**
 * Set label for usemenu group..
 */
StageBinding.prototype._initializeUsergroup = function (root) {

	LoginService.GetUserDisplayName(true, function (name) {
		top.app.bindingMap.usermenu.setLabel(name);
	});
}

/**
 * Root actions relayed to Tools menu. At least for now...
 * @param {SystemNode} root
 * @param {List<SystemNode>} perspectives
 */
StageBinding.prototype._initializeRootActions = function ( root ) {

	var actions = root.getActionProfile ();

	if ( actions && actions.hasEntries ()) {

		/*
		 * The default menugroup
		 * for root actions.
		 */
		var menugroup = top.app.bindingMap.toolsmenugroup;

		var bundles = new Map();

		if ( menugroup ) {
			actions.each ( function ( groupid, list ) {
				list.each ( function ( action ) {

					/*
					 * Build menuitem.
					 */
					var item = MenuItemBinding.newInstance ( menugroup.bindingDocument );
					item.setLabel ( action.getLabel ());
					item.setToolTip ( action.getToolTip ());
					item.setImage ( action.getImage ());
					item.setDisabled ( action.isDisabled ());

					/*
					 * Stamp action on menuitem.
					 */
					item.associatedSystemAction = action;

					/*
					 * Brialliant hardcoded setup for dispersing
					 * root actions all over the main menubar.
					 */
					var group = menugroup;
					var tag = action.getTag ();
					if ( tag != null ) {
						switch ( tag ) {
							case SystemAction.TAG_CHANGEFROMLANGUAGE :
								group = top.app.bindingMap.translationsmenugroup;
							case SystemAction.TAG_USER:
								group = top.app.bindingMap.usermenugroup;
								break;
						}
					}

					var bundleName = action.getBundleName();
					if (bundleName) {
						if (!bundles.has(bundleName)) {
							var bundleItem = MenuItemBinding.newInstance(menugroup.bindingDocument);
							bundleItem.setLabel(bundleName);
							bundleItem.setImage(action.getImage());
							group.add(bundleItem);

							var popup = MenuPopupBinding.newInstance(menugroup.bindingDocument);
							var body = popup.add(MenuBodyBinding.newInstance(menugroup.bindingDocument));
							var menuitemgroup = body.add(MenuGroupBinding.newInstance(menugroup.bindingDocument));
							bundleItem.add(popup);

							bundles.set(bundleName, menuitemgroup);
						}
						group = bundles.get(bundleName);;
					}

					group.add ( item );
				});
			});
			menugroup.attachRecursive (); // TODO: lazy the entire menu!!!
		}
	}
}

/**
 * Initialize SystemViewDefinitions (the tree views!).
 * @param {List<SystemNode>} nodes
 */
StageBinding.prototype._initializeSystemViewDefinitions = function ( nodes ) {

	while ( nodes.hasNext ()) {
		var node = nodes.getNext ();
		var handle = node.getHandle ();
		ViewDefinitions [ handle ] = new SystemViewDefinition ( node );
	}
}

// STARTUP ................................................................

/**
 * @implements {IActionListener}
 * @overloads {FocusBinding#handleAction}
 * @param {Action} action
 */
StageBinding.prototype.handleAction = function ( action ) {

	StageBinding.superclass.handleAction.call ( this, action );

	var binding = action.target;

	switch ( action.type ) {

		/*
		 * See also next case.
		 */
		case StageDecksBinding.ACTION_INITIALIZED :
			if ( !Application.isOperational ) {
				ProgressBarBinding.notch ( 4 );
			}
			this._decksBinding = binding;
			this._inflateBinding ( binding );
			action.consume ();
			break;

		/*
		 * See also previous case.
		 */
		case ExplorerBinding.ACTION_INITIALIZED :
			if ( !Application.isOperational ) {
				ProgressBarBinding.notch ( 4 );
			}
			this._explorerBinding = binding;
			this._inflateBinding ( binding );
			action.consume ();
			break;

		case ExplorerMenuBinding.ACTION_SELECTIONCHANGED :
			if ( !Application.isOperational ) {
				ProgressBarBinding.notch ( 5 );
			}
			this.handlePerspectiveChange(app.bindingMap.explorermenu);
			var tag = app.bindingMap.explorermenu.getSelectionTag();
			EventBroadcaster.broadcast(BroadcastMessages.PERSPECTIVE_CHANGED, tag);

			action.consume ();
			break;

		case TabBoxBinding.ACTION_ATTACHED :
			if ( binding instanceof DockBinding ) {
				switch ( binding.reference ) {
					case DockBinding.START :
					case DockBinding.ABSBOTTOMLEFT :
					case DockBinding.ABSBOTTOMRIGHT :
					case DockBinding.ABSRIGHTTOP :
					case DockBinding.ABSRIGHTBOTTOM :
						this._dockBindings.set ( binding.reference, binding );
						break;
				}
				this.handleAttachedDock ( binding );
				action.consume ();
			}
			break;

		case TabBoxBinding.ACTION_SELECTED :
			if ( binding instanceof DockBinding ) {
				this.handleSelectedDockTab (
					binding.getSelectedTabBinding ()
				);
				action.consume ();
			}
			break;

		case WindowBinding.ACTION_LOADED :

			// this should really be handled on a lower level, but in case we forget...
			// this.logger.warn ( "window load intercepted by stage: " + binding.getURL ());
			break;

		case StageBinding.ACTION_DECK_LOADED :
			this._isExplorerReady = true;
			if ( this._isDecksReady == true ) {
				if ( !this._isStageReady ) {
					ProgressBarBinding.notch ( 3 );
					this._onStageReady ();
				}
			}
			break;

		case StageBinding.ACTION_START_LOADED:
			if (Application.hasStartPage && KickStart.justLogged && !Client.isPad) {
				EventBroadcaster.broadcast(BroadcastMessages.START_COMPOSITE);
			} else {
				if (ViewBinding.hasInstance("Composite.Management.Start")) {
					ViewBinding.getInstance("Composite.Management.Start").hide();
				}
			}
			break;
		/**
		 * @see {StageBoxHandlerAbstraction#handleAction}
		 */
		case StageSplitPanelBinding.ACTION_LAYOUTUPDATE :

			/*
		 	 * Theoretically, this could be done at a much lower level.
		 	 * This should be considered if panel handling gets too slow.
		 	 * Explorer has some rendering update disabilities, though.
		 	 */
		 	if ( !this._isFlexAbort && Application.isOperational ) {

		 		this._isFlexAbort = true;
		 		this.reflex ( true );
		 		var self = this;
		 		setTimeout ( function () {
		 			if ( Client.isMozilla == true ) {
		 				self.reflex ( true ); // why?
		 			}
		 			self._isFlexAbort = false;
			 	}, 0 );
			}
			action.consume ();
			break;

		case StageDeckBinding.ACTION_LOADED :
			this._isDecksReady = true;
			if ( this._isExplorerReady == true ) {
				if ( !this._isStageReady ) {
					this._onStageReady ();
				}
			}

			if (binding.isDefaultStageDeck) {

				//NEW UI: LOAD Browser to first tab
				var deck = action.target;

				this._activeViewDefinitions["Composite.Management.Browser"] = deck.definition;

				var browserViewDefinition = ViewDefinitions["Composite.Management.Browser"];
				browserViewDefinition.image = deck.definition.image;
				browserViewDefinition.label = deck.definition.label;
				browserViewDefinition.toolTip = deck.definition.toolTip;

				browserViewDefinition.argument["SystemViewDefinition"] = deck.definition;
				browserViewDefinition.argument["URL"] = null;
				browserViewDefinition.argument.image = deck.definition.image;
				browserViewDefinition.argument.label = deck.definition.label;
				browserViewDefinition.argument.toolTip = deck.definition.toolTip;
				deck._browserTab = deck._dockBindings.get("main").prepareNewView(browserViewDefinition);
				deck._browserTab.isExplorerTab = true;
			}
			break;

		/*
		 * The ErrorBinding needs a consumer.
		 */
		case ErrorBinding.ACTION_INITIALIZE :
			action.consume ();
			break;
	}

	/*
	 * Notice this hack!
	 */
	StageBoxHandlerAbstraction.handleAction.call ( this, action );
}

/**
 * @implements {IBroadcastListener}
 * @param {string} message
 * @param {object} arg
 */
StageBinding.prototype.handleBroadcast = function ( broadcast, arg ) {

	StageBinding.superclass.handleBroadcast.call ( this, broadcast, arg );

	switch ( broadcast ) {

		case BroadcastMessages.VIEW_OPENED :
			Application.unlock ( this );
			break;

		case BroadcastMessages.VIEW_CLOSED :
		 	var handle = arg;
			this._dontView ( handle );
			break;

		case BroadcastMessages.COMPOSITE_START :
			this._showStart ( true );
			break;

		case BroadcastMessages.COMPOSITE_STOP :
			this._showStart ( false );
			break;

		case BroadcastMessages.DOCK_MAXIMIZED :
			this._stabilizeExplorer ();
			if ( this._isShowingStart ) {
				EventBroadcaster.broadcast ( BroadcastMessages.STOP_COMPOSITE );
			}
			break;

		case BroadcastMessages.DOCK_NORMALIZED :
			this._stabilizeExplorer ();
			break;
	}
}

/**
 * @implements {IEventListener}
 * @overloads {Binding#handleEvent}
 * @param {Event} e
 */
StageBinding.prototype.handleEvent = function (e) {

	StageBinding.superclass.handleEvent.call(this, e);

	switch (e.type) {
		case DOMEvents.HASHCHANGE:
			this.handleHash(e.target);
			e.preventDefault();
			break;
	}
}

StageBinding.prototype.handleHash = function (target) {

	if (target && target.location && target.location.hash) {
		var serializedMessage = target.location.hash.replace(/^#/, '');
		if (serializedMessage) {
			if (target.history && target.history.replaceState) {
				target.history.replaceState({}, target.document.title, target.location.href.split('#')[0]);
			} else {
				target.location.hash = "";
			}

			MessageQueue.placeConsoleCommand(decodeURIComponent(serializedMessage));
			MessageQueue.update();
			EventBroadcaster.broadcast(BroadcastMessages.COMPOSITE_STOP);
		}
	}
}

/**
 * Explorer may have difficulties computing stage layout
 * when docks are maximized and normalized. Let's hack it.
 */
StageBinding.prototype._stabilizeExplorer = function () {

	if ( Client.isExplorer == true ) {
		var self = this;
		if  ( Client.isExplorer == true ) {
			setTimeout ( function () {
				self.reflex ( true );
			}, 0 )
		}
	}
}

/**
 * Show start?
 * @param {boolean} isShow
 */
StageBinding.prototype._showStart = function ( isShow ) {

	if ( isShow != this._isShowingStart ) {

		var view = ViewBinding.getInstance ( "Composite.Management.Start" );
		var dock = this._dockBindings.get ( DockBinding.START );
		if ( isShow ) {
			view.show ();
		} else {
			view.hide ();
			if ( dock != null && dock.isActive ) {
				dock.deActivate ();
			}
		}
		this._isShowingStart = isShow;
	}
}

/**
 * This will inflate either the {@link ExplorerBinding} or the {@link StageDecksBinding}
 * @param {Binding} binding
 */
StageBinding.prototype._inflateBinding = function ( binding ) {

	for ( var handle in ViewDefinitions ) {
		var definition = ViewDefinitions [ handle ];
		if ( definition instanceof SystemViewDefinition ) {
			binding.mountDefinition ( definition );
		}
	}
	var isReady = ( this._decksBinding != null && this._explorerBinding != null );
	if ( isReady ) {
		var self = this;
		setTimeout ( function () {
			self._renameThisMethod ();
		}, 0 );
	}
}

/**
 * Iterate stagebox bindings. This method is required by the StageBoxAbstractionHandler.
 * @see {StageBoxHandlerAbstraction#handleControlBoxAction}
 * @param {string} mode
 */
StageBinding.prototype.iterateContainedStageBoxBindings = function ( mode ) {

	var crawler = new StageCrawler ();
	crawler.mode = mode;
	crawler.crawl ( this.bindingElement );
	crawler.dispose ();
}

/**
 * Fires when the ExplorerBinding selection changes, selecting associated StageDeckBinding.
 * @see {ExplorerBinding#handleSelectionChange}
 * @param {ExplorerMenuBinding} explorerMenuBinding
 */
StageBinding.prototype.handlePerspectiveChange = function ( explorerMenuBinding ) {

	var handle = explorerMenuBinding.getSelectionHandle ();
	this._decksBinding.setSelectionByHandle ( handle );
	if ( LocalStore.isEnabled ) {
		LocalStore.setProperty (
			LocalStore.SELECTED_PERSPECTIVE_HANDLE,
			escape ( handle )
		);
	}
}

/**
 * Fires when a DockBinding gets attached during startup.
 * @param {DockBinding} dockBinding
 */
StageBinding.prototype.handleAttachedDock = function ( dockBinding ) {

	/*
	 * Initialize open views. Initialization of the
	 * Start view is dependant on application settings.
	 */
	var tabBindings = dockBinding.getTabBindings ();
	if ( tabBindings.hasEntries ()) {
		while ( tabBindings.hasNext ()) {
			var tabBinding = tabBindings.getNext ();
			var handle = tabBinding.getHandle ();
			if ( handle ) {
					var viewDefinition = ViewDefinitions [ handle ];
					if ( viewDefinition ) {
						this._view ( dockBinding, tabBinding, viewDefinition, false );
					} else {
						alert ( "StageBinding: no such predefined viewdefinition (" + handle + ")" );
					}
			}
		};
	}
}

/**
 * Please use the static method StageBinding.presentViewDefinition
 * Presenting the ViewDefinition on stage.
 * @param {ViewDefinition} viewDefinition
 */
StageBinding.prototype._presentViewDefinition = function (viewDefinition, contextSource) {

	var target = null;
	var isAbort = false;

	switch ( viewDefinition.position ) {

		case Dialog.MODAL :
			target = app.bindingMap.masterdialogset.getModalInstance ();
			break;
		case Dialog.NON_MODAL :
			target = app.bindingMap.masterdialogset.getInstance ();
			break;

		default :
			if ( this._dockBindings.hasEntries ()) { // somehow no docks when user has no perspectives mounted...
				switch ( viewDefinition.position ) {

					case DockBinding.ABSBOTTOMLEFT :
					case DockBinding.ABSBOTTOMRIGHT :
					case DockBinding.ABSRIGHTTOP :
					case DockBinding.ABSRIGHTBOTTOM :

						// targetting the developer docks.
						target = this._dockBindings.get ( viewDefinition.position );
						break;

					case DockBinding.EXTERNAL:

						// Open a new window/tab with the provided url
						window.open(viewDefinition.url);
						isAbort = true;
						break;

					case DockBinding.SLIDE:
						var selectedDeck = this._decksBinding.getSelectedDeckBinding();

						var dock = selectedDeck.getDockBindingByReference(DockBinding.MAIN);
						var panel = dock.getSelectedTabPanelBinding();

						var viewBinding = SlideInViewBinding.newInstance(panel.viewBinding.getContentDocument());
						viewBinding.setDefinition(viewDefinition);
						viewBinding.attach();
						viewBinding.snapToBinding(panel.viewBinding.getRootBinding());

						isAbort = true;
						break;
					default :

						// targetting the main stage.
						var selectedDeck = this._decksBinding.getSelectedDeckBinding();
						if (selectedDeck.isPlaceholder()) {
							target = this._dockBindings.get(DockBinding.ABSRIGHTTOP);
						} else {
							target = selectedDeck.getDockBindingByReference(
								viewDefinition.position
							);
						}

						// hide start stuff if present.
						if ( this._isShowingStart ) {
							EventBroadcaster.broadcast ( BroadcastMessages.STOP_COMPOSITE );
						}
						break;
				}
			} else {
				isAbort = true;
			}
			break;
	}

	if ( !isAbort ) {
		if (target != null) {
			if (contextSource != undefined && Interfaces.isImplemented(IContextContainerBinding, target)) {
				var contextContainer = ContextContainer.getContextContainer(contextSource);
				if (contextContainer != null) {
					target.setContextContainer(contextContainer);

					//TODO: Move resolving URL
					if (viewDefinition && viewDefinition.argument && viewDefinition.argument.url) {
						viewDefinition.argument.url = ContextContainer.resolve(viewDefinition.argument.url, contextContainer);
					}
				};
			}
			this._view(target, null, viewDefinition, true);
		} else {
			throw "StageBinding: Could not position view: " + viewDefinition.handle;
		}
	}
}

/**
 * Launches the view on stage while indexing view as an active view.
 * @param {Binding} target
 * @param {DockTabBinding} dockTabBinding Required when launching open views.
 * @param {ViewDefinition} viewDefinition
 * @param {boolean} isNewView True for newly launched views, false for views opened at startup.
 */
StageBinding.prototype._view = function ( target, dockTabBinding, viewDefinition, isNewView ) {

	var handle = viewDefinition.handle;
	if ( viewDefinition.isMutable ) {
		handle += KeyMaster.getUniqueKey ();
	}

	if ( this._activeViewDefinitions [ handle ] ) {

		/*
		 * Update already open view.
		 */
		var viewBinding = ViewBinding.getInstance ( handle );
		if (viewBinding != null) {
			target._selectTabByView(viewBinding);
			viewBinding.update ();
		} else {
			this.logger.error ( "Could not update ViewBinding (declared open): \n" + handle );
		}

	} else {

		/*
		 * Initialize new view.
		 */
		this._activeViewDefinitions [ handle ] = viewDefinition;

		/*
		 * Lock interface. Unlocked around method handleBroadcast.
		 */
		Application.lock ( this );

		switch ( target.constructor ) {
			case DockBinding :
				if ( isNewView ) {
					target.prepareNewView ( viewDefinition );
				} else {
					target.prepareOpenView ( viewDefinition, dockTabBinding );
				}
				break;
			case StageDialogBinding :
				if ( isNewView ) {
					target.prepareNewView ( viewDefinition );
				}
				break;
		}
	}
}

/**
 * Called whenever a view is disposed from stage, unregistering view as an active view.
 * @param {string} handle
 */
StageBinding.prototype._dontView = function ( handle ) {

	if ( this._activeViewDefinitions [ handle ] != null ) {
		delete this._activeViewDefinitions [ handle ];
	} else {
		this.logger.debug ( "Could not unregister active view: " + handle );
	}
}

/**
 * Select Browser tab
 */
StageBinding.prototype.selectBrowserTab = function () {

	var deck = this._decksBinding.getSelectedDeckBinding();
	var browserTab = deck.getBrowserTab();
	if (browserTab && !browserTab.isSelected) {
		var tree = deck.getSystemTree();
		if (tree != null) {
			tree.setHandleToken(null);
		}
		browserTab.containingTabBoxBinding.select(browserTab, true);
	}
}

/**
 * Fires when a DockTabBinding get's selected. During
 * startup, the visible tab get's selected by default.
 * @param {DockTabBinding} tabBinding
 */
StageBinding.prototype.handleSelectedDockTab = function ( tabBinding ) {

	// this.logger.warn ( "TODO: StageBinding#handleSelectedDockTab" );
	/*
	var viewBinding = tabBinding.getAssociatedView ();
	if ( viewBinding && !viewBinding._isViewBindingInitialized ) {
		viewBinding.initialize ();
	}
	*/
}
