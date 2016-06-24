/**
 * Referencing the window object now loading inside the app frame.
 * This get registered as soon as the file "app.aspx" gets loaded.
 * @type {DOMDocumentView}
 */
top.app = null;

/*
TODO: timeout - scope
TODO: lists -scope
TODO: maps -scope
TODO: window.rootBInding / window.pageBinding
*/

/**
 * @class
 * Don't instantiate this class manually. Access through
 * instance variable "Application" declared below. This
 * instance should be considered a singleton class.
 */
function _Application () {

	this._construct ();
}

_Application.prototype = {

	// PUBLIC ..........................................................

	/**
	 * Identifies this management console instance on the server.
	 * There is a fair chance that no two users get the same ID.
	 * @type {string}
	 */
	CONSOLE_ID : KeyMaster.getUniqueKey (),

	/**
	 * Timeout in milliseconds before we proclaim a global application blur event.
	 * @type {number}
	 */
	_TIMEOUT_LOSTFOCUS : 250,

	/**
	 * @type {SystemLogger}
	 */
	logger : SystemLogger.getLogger ( "Application" ),

	/**
	 * @type {SystemTimer}
	 */
	timer : SystemTimer.getTimer ( "Application" ),

	/**
	 * Set by ScriptLoaderControl.
	 * @type {boolean}
	 */
	isDeveloperMode : false,

	/**
	 * Set by ScriptLoaderControl.
	 * @type {boolean}
	 */
	isLocalHost : false,

	/**
	 * Set by ScriptLoaderControl.
	 * @type {boolean}
	 */
	hasExternalConnection : false,

	/**
	 * Flipped on login and logout.
	 * @type {boolean}
	 */
	isLoggedIn : false,

	/**
	 * Flipped on logout (only).
	 * @type {boolean}
	 */
	isLoggedOut : false,

	/**
	 * @type {boolean}
	 */
	isLocked : false,

	/**
	 * @type {boolean}
	 */
 	hasStartPage : true,

	/**
	 * Flipped when certain critical errors are encountered.
	 * TODO: Is this used?
	 */
	isMalFunctional : false,

	/**
	 * Flipped when the stage is initialized.
	 * @type {boolean}
	 */
 	isOperational : false,

 	/**
	 * Flipped when top window is closed or reloaded.
	 * @type {boolean}
	 */
 	isShuttingDown : false,

 	/**
 	 * Indicates that the server was shut down (add-on upgrade or something).
 	 * @type {boolean}
 	 */
 	isOffLine : false,

 	/**
 	 * True when any window has the focus. To check if NO window has focus,
 	 * ie the C1 Console has lost focus, better use property "isBlurred".
 	 * @type {boolean}
 	 */
 	isFocused : true,

 	/**
 	 * True when NO window has had focus for some milliseconds. This will
 	 * trigger a broadcast of message BroadcastMessages.APPLIATION_BLURRED.
 	 * Be advised, however, that this setup is highly dysfunctional in IE.
 	 * @type {boolean}
 	 */
 	isBlurred: false,

	/**
	 * @type {boolean} 
	 */
 	isTestEnvironment: true,

 	// PRIVATE ..........................................................

	/**
	 * @type {boolean}
	 */
	_isMousePositionTracking : false,

	/**
	 * @type {Point}
	 */
	_mousePosition : null,

	/**
	 * @type {Point}
	 */
	_cursorStartPoint : null,

	/**
	 * @type {boolean}
	 */
	_isDragging : false,

	/**
	 * @type {boolean}
	 */
	_isShutDownAllowed : true,

	/**
	 * Counting lockers.
	 * @type {int}
	 */
	_lockers : 0,

	/**
	 * Used for debug when locking gets stuck.
 	 * @type {HashMap<object><boolean>}
 	 */
 	_lockthings : {},

	/**
	 * @type {boolean}
	 */
	_isRegistered : null,

	/**
	 * The most recently activated binding.
	 * @type {IActivatable}
	 * @see {DockBinding}
	 * @see {DialogBinding}
	 */
	_activeBinding : null,

	/**
	 * Bookkeeping the chronology of activated bindings. Whenever
	 * a binding looses activation status, this will help us select
	 * the most appropriate binding to activate next.
	 * @type {List}
	 */
	_activatedBindings : new List (),

	/**
	 * Bookkeeping list of dirty tabs.
	 * @type {Map<string><DockTabBinding>}
	 */
	_dirtyTabs : new Map (),

	/**
	 * EXPLAIN HERE!
	 */
	_topLevelClasses : typeof topLevelClassNames != "undefined" ?
			new List ( topLevelClassNames ) : null,


	// METHODS ..........................................................

	/**
	 * Construct.
	 */
	_construct : function () {

		/*
		 * Executed first.
		 */
		EventBroadcaster.subscribe ( WindowManager.WINDOW_EVALUATED_BROADCAST, {
			handleBroadcast : function () {
				try {
					Application.initialize ();
				} catch ( exception ) {
					SystemDebug.stack ( arguments );
					throw ( exception );
				}
			}
		});

		/*
		 * Executed on startup if log is open; otherwise called when log opens.
		 * This cannot be placed in the "SystemLogger.js" because of script
		 * loading dependancies in the file.
		 * @see {SystemLogPageBinding#onBindingRegister}
		 */
		EventBroadcaster.subscribe ( BroadcastMessages.SYSTEMLOG_OPENED, {
			handleBroadcast : function ( broadcast, outputwindow ) {
				SystemLogger.unsuspend ( outputwindow );
			}
		});

		/*
		 * Executed when the systemlog wiew closes.
		 * @see {SystemLogPageBinding#onBindingDispose}
		 */
		EventBroadcaster.subscribe ( BroadcastMessages.SYSTEMLOG_CLOSED, {
			handleBroadcast : function () {
				SystemLogger.suspend ();
			}
		});

		/*
		 * Executed last - when the stage is ready and login performed.
		 * A short timeout prevents an occasional layout bug in Explorer.
		 */
		EventBroadcaster.subscribe ( BroadcastMessages.STAGE_INITIALIZED, {
			handleBroadcast : function () {

				///*
				// * Launching system developer panels.
				// */
				//if (Application.isDeveloperMode && !Client.isPad) {
				//	StageBinding.handleViewPresentation ( "Composite.Management.SystemLog" );
				//	StageBinding.handleViewPresentation ( "Composite.Management.Developer" );
				//}

				setTimeout ( function () {
					ProgressBarBinding.notch ( 4 );
					Application.isOperational = true;
					EventBroadcaster.broadcast ( BroadcastMessages.APPLICATION_OPERATIONAL );
				}, PageBinding.TIMEOUT );
			}
		});

		/*
		 * Setup ESCAPE to act as a panic button to close
		 * the mastercover when a server error occurred.
		 */
		EventBroadcaster.subscribe ( BroadcastMessages.KEY_ESCAPE, {
			handleBroadcast : function () {
				if ( Application.isLocked ) {
					Application.unlock ( Application, true );
				}
			}
		});

		/**
		 * Flag server offline status.
		 * Probably broadcasted by a {@link SOAPRequest}.
		 * The "Working" cover screen is handled by {@link MessageQueue}
		 */
		EventBroadcaster.subscribe ( BroadcastMessages.SERVER_OFFLINE, {
			handleBroadcast : function () {
				Application.isOffLine = true;
			}
		});

		/*
		 * Flag server online status.
		 * Probably broadcasted by a {@link SOAPRequest}
		 */
		EventBroadcaster.subscribe ( BroadcastMessages.SERVER_ONLINE, {
			handleBroadcast : function () {
				Application.isOffLine = false;
			}
		});

		/*
		 * Index dirty tab. Enable "save all"
		 * when first tab is registered dirty.
		 */
		EventBroadcaster.subscribe ( BroadcastMessages.DOCKTAB_DIRTY, {
			handleBroadcast : function ( broadcast, arg ) {
				var list = Application._dirtyTabs;
				list.set ( arg.key, arg );
				if ( list.countEntries () == 1 ) {
					var broadcaster = top.app.bindingMap.broadcasterHasDirtyTabs;
					broadcaster.enable ();
				}
			}
		});

		/*
		 * Un-index dirty tab.
		 */
		EventBroadcaster.subscribe ( BroadcastMessages.DOCKTAB_CLEAN, {
			handleBroadcast : function ( broadcast, arg ) {
				var list = Application._dirtyTabs;
				list.del ( arg.key );
				if ( list.countEntries () == 0 ) {
					var broadcaster = top.app.bindingMap.broadcasterHasDirtyTabs;
					broadcaster.disable ();
				}
			}
		});
	},

	/**
	 * Identifies.
	 */
	toString : function  () {

		return "[Application]";
	},

	/**
	 * Login initializes webservices.
	 * @see {KickStart}
	 */
	login : function () {

		this.isLoggedIn = true;

		ConfigurationService		= WebServiceProxy.createProxy ( Constants.URL_WSDL_CONFIGURATION );
		ConsoleMessageQueueService	= WebServiceProxy.createProxy ( Constants.URL_WSDL_MESSAGEQUEUE );
		EditorConfigurationService 	= WebServiceProxy.createProxy ( Constants.URL_WSDL_EDITORCONFIG );
		FlowControllerService 		= WebServiceProxy.createProxy ( Constants.URL_WSDL_FLOWCONTROLLER );
		StringService				= WebServiceProxy.createProxy ( Constants.URL_WSDL_STRINGSERVICE );
		TreeService					= WebServiceProxy.createProxy ( Constants.URL_WSDL_TREESERVICE );
		SecurityService				= WebServiceProxy.createProxy ( Constants.URL_WSDL_SECURITYSERVICE );
		XhtmlTransformationsService = WebServiceProxy.createProxy ( Constants.URL_WSDL_XHTMLTRANSFORM );
		PageTemplateService			= WebServiceProxy.createProxy ( Constants.URL_WSDL_PAGETEMPLATE );
		FunctionService				= WebServiceProxy.createProxy ( Constants.URL_WSDL_FUNCTIONSERVICE );
		LocalizationService			= WebServiceProxy.createProxy ( Constants.URL_WSDL_LOCALIZATION );
		SourceValidationService		= WebServiceProxy.createProxy ( Constants.URL_WSDL_SOURCEVALIDATION );
		MarkupFormatService			= WebServiceProxy.createProxy ( Constants.URL_WSDL_MARKUPFORMAT );
		PageService					= WebServiceProxy.createProxy ( Constants.URL_WSDL_PAGESERVICE );

		ProgressBarBinding.notch ( 4 );

		/*
		 * WebKit needs a short break here...
		 */
		function next () {
			EventBroadcaster.broadcast ( BroadcastMessages.APPLICATION_LOGIN );
		}
		if ( Client.isWebKit ) {
			setTimeout ( function () {
				next ();
			}, 0 );
		} else {
			next ();
		}
	},

	/**
	 * Log out. Notice that LogoutService currently returns true no matter what...
	 * @return {boolean}
	 */
	logout : function () {

		var result = false;
		if ( this.isLoggedIn ) {
			this.isLoggedIn = false;
			this.isLoggedOut = true;
			result = LoginService.Logout ( true );
			if ( !result ) {
				alert ( "Logout failed." );
			}
		}
		return result;
	},

	/**
	 * Blocking all interaction with the application interface.
	 * We count all lockers so that we know when to unlock.
	 * We also require a reference to the entity that caused the
	 * lock. This may help in debugging stuck locks.
	 * @param {object} Whatever invoked the lock.
	 */
	lock : function ( object ) {

		if ( object != null ) {
			this._lockthings [ object ] = true;
			if ( top.bindingMap.mastercover != null ) {
				if ( this._lockers >= 0 ) {
					this._lockers ++;
					if ( this._lockers == 1 ) {
						this.isLocked = true;
						top.bindingMap.mastercover.show ();
						if ( top.app != null && top.app.bindingMap.throbber != null ) {
							top.app.bindingMap.throbber.play ();
						}
					}
				}
			}
		} else {
			throw "Application: No locker specified.";
		}
	},

	/**
	 * Unblocking interaction when all lockers are ready.
	 * @param {object} object Whatever invoked the unlock.
	 * @param @optional {boolean} isForcedUnlock
	 */
	unlock : function ( object, isForcedUnlock ) {

		if ( object != null ) {
			delete this._lockthings [ object ];
			if ( top.bindingMap.mastercover != null ) {
				if ( isForcedUnlock || this._lockers > 0 ) {
					if ( isForcedUnlock ) {
						var out = "Unlocked by " + new String ( object )+ "\n";
						for ( var locker in this._lockthings ) {
							out += "Locked by " + new String ( locker ) + ". ";
						}
						this.logger.debug ( out );
						this._lockers = 0;
					} else {
						this._lockers --;
					}
					if ( this._lockers == 0 ) {
						this.isLocked = false;
						top.bindingMap.mastercover.hide ();
						if ( top.app != null && top.app.bindingMap.throbber != null ) {
							setTimeout ( function () {
								top.app.bindingMap.throbber.stop ();
							}, 250 );
						}
					}
				}
			}
		} else {
			throw "Application: No unlocker specified.";
		}
	},

	hasLock : function ( locker ) {

		return this._lockthings [ locker ] == true;
	},

	/**
	 * Bookkeeping activated bindings so that an active-status
	 * "undo" history can be maintained.
	 * @param {IActivatable} binding
	 */
	activate: function (binding) {

		if (binding !== this._activeBinding) {
			var lastBinding = this._activeBinding;
			this._activeBinding = binding;
			this._activatedBindings.add(binding);
			if (lastBinding && lastBinding.isActive) {
				lastBinding.deActivate();
			}
		}
	},

	/**
	 * If the currently activated binding get's deactivated, select the last
	 * activated binding for activation. This defaults to the explorer dock.
	 * @param {IActivatable} binding
	 */
	deActivate : function ( binding ) {

		var nextBinding = null;
		var bestBinding = null;

		if ( binding == this._activeBinding ) {
			while ( !bestBinding && this._activatedBindings.hasEntries ()) {
				nextBinding = this._activatedBindings.extractLast ();
				if ( nextBinding != binding && nextBinding.isActivatable ) {
					bestBinding = nextBinding;
				}
			}
			if ( bestBinding ) {
				bestBinding.activate();
			}

		}
	},

	/**
	 * Tracking global focused status. NOTE that you cannot trust these things in IE.
	 * Specifically because IE may decide to declare a blur event (one one object)
	 * AFTER the focus event (of another object). You should in fact never trust IE.
	 * @param isFocused
	 */
	focused : function ( isFocused ) {

		this.isFocused = isFocused;

		if ( isFocused ) {
			if ( this.isBlurred ) {
				this.isBlurred = false;
				EventBroadcaster.broadcast ( BroadcastMessages.APPLICATION_FOCUSED );
			}
		} else {
			setTimeout ( function () {
				if ( !Application.isFocused ) {
					Application.isBlurred = true;
					EventBroadcaster.broadcast ( BroadcastMessages.APPLICATION_BLURRED );
				}
			}, Application._TIMEOUT_LOSTFOCUS )
		}
	},

	/**
	 * Initialize.
	 */
	initialize : function () {

		/*
		 * Setup shutdown stuff
		 * TODO: make beforeunloadd stuff work reliably in both engines!
		 */
		DOMEvents.addEventListener ( top, DOMEvents.UNLOAD, {
			handleEvent : function ( e ) {
				EventBroadcaster.broadcast ( BroadcastMessages.APPLICATION_ONSHUTDOWN );
				EventBroadcaster.broadcast ( BroadcastMessages.APPLICATION_SHUTDOWN );
				if ( !Application.isShuttingDown ) { // this may be set by quit method already
					Application.isShuttingDown = true;
					if ( FlowControllerService != null ) {
						FlowControllerService.ReleaseAllConsoleResources ( Application.CONSOLE_ID );
					}
				}
				if ( this.isLoggedIn && !Application.isDeveloperMode ) {
					Application.logout ();
				}

			}
		});

		/*
		DOMEvents.addEventListener ( top, DOMEvents.BLUR, {
			handleEvent : function ( e ) {
				Application.logger.debug ( Math.random ())
			}
		});
		*/

		/*
		top.onblur = function () {
			Application.logger.debug ( Math.random ())
		}
		*/

		// broadcast startup
		EventBroadcaster.broadcast (
			BroadcastMessages.APPLICATION_STARTUP
		);
	},

	/**
	 * Cancel shutdown. Although we can't really
	 * cancel the shutdown, so don't use this.
	 */
	cancelShutDown : function () {

		this._isShutDownAllowed = false;
	},

	/**
	 * Setup standard framework mouseeventlisteners.
	 * Intercepting mousedown, mousemove, mouseup, keydown, keyup.
	 * @param {DOMDocument} doc
	 */
	framework : function ( doc ) {

		var win = DOMUtil.getParentWindow ( doc );
		if ( win != null ) {
			if ( !win.standardEventHandler ) {
				win.standardEventHandler = new StandardEventHandler ( doc );
			} else {
				// throw "StandardEventHandler added twice!";
				// TODO: investigate why editor-documents fall in this trap!
			}
		}
	},

	/**
	 * Normalize input and textarea elements.
	 * @param {DOMDocument} doc
	 */
	normalize : function ( doc ) {

		/*
		if ( !this.heyho ) {

			this.heyho = setInterval ( function () {
				Application.logger.debug ( StandardEventHandler.isBackAllowed );
			}, 3000 );
		}

		var win = DOMUtil.getParentWindow ( doc );
		if ( win != null ) {
			if ( !win.standardEventHandlerFixer ) {
				win.standardEventHandlerFixer = new StandardEventHandlerFixer ( doc );
			}
		}
		*/
	},

	/**
	 * @implements {IActionListener}
	 * @param {Action} action
	 */
	handleAction : function ( action ) {

		switch ( action.type ) {
			case Application.REFRESH :
				this.refresh ();
				break;
		}
	},

	/**
	 * Declare top level application classes as local variables in another window.
	 * This way, authors can address eg. the SystemLogger as such instead of top.SystemLogger
	 * Only the classes from the "top" folder are included (exluding "page" folder classes).
	 * Note that this is only relevant for developermode!
	 * @param {DocumentView} win
	 */
	declareTopLocal : function ( win ) {

		/*
		 * TODO: SCRIPLOADERCONTROL!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
		 */
		var TOP_SCRIPTS = Resolver.resolve ( "/scripts/source/top/" );

		/*
		 * Please observe that we follow the Java convention of naming
		 * any code file according to the single class it contains!
		 */
		if ( this._topLevelClasses == null ) {
			this._topLevelClasses = new List ();
			var self = this;
			new List (
				DOMUtil.getElementsByTagName ( document, "script" )
			).each ( function ( script ) {
				var src = script.src;
				if ( src.indexOf ( TOP_SCRIPTS ) >-1 ) {
					var name = src.substring (
						src.lastIndexOf ( "/" ) + 1,
						src.lastIndexOf ( ".js" )
					);
					self._topLevelClasses.add ( name );
				}
			});
		}
		this._topLevelClasses.each ( function ( name ) {
			if ( window [ name ] != null ) {
				win [ name ] = window [ name ];
			}
		});
	},

	/**
	 * TODO: Explain this method.
	 * @param {MouseEvent} e
	 * @return {boolean}
	 */
	trackMousePosition : function ( e ) {

		var isTracking = false;
		if ( this._isMousePositionTracking ) {
			isTracking = true;
			if ( Client.isExplorer && e.button != 1 ) {
				isTracking = false;
			}
			if ( isTracking ) {
				this._mousePosition = DOMUtil.getUniversalMousePosition ( e );
			}
		}
		return isTracking;
	},


	// MOUSE TRACKING ............................................................

	/**
	 * Enable mouse position tracking.
	 * @param {MouseEvent} e
	 */
	enableMousePositionTracking : function ( e ) {

		if ( e ) {
			this._isMousePositionTracking = true;
			this._mousePosition = DOMUtil.getUniversalMousePosition ( e );
		} else {
			throw new Error (
				"Application: MouseEvent undefined."
			);
		}
	},

	/**
	 * Disable mouse position tracking.
	 */
	disableMousePositionTracking : function () {

		this._isMousePositionTracking = false;
		this._mouseposition = null;
	},

	/**
	 * Get mouse position.
	 * @return {Point}
	 */
	getMousePosition : function () {

		return this._mousePosition;
	},


	// DRAG AND DROP ............................................................

	/**
	 * Drag start.
	 * @implements {IDragHandler}
	 * @param {Point} point
	 */
	onDragStart : function ( point ) {

		var binding = BindingDragger.draggedBinding;


		if ( Interfaces.isImplemented ( IDraggable, binding, true ) == true ) {
			if ( !this._isDragging ) {
				app.bindingMap.dragdropcursor.setImage (
					binding.getImage ()
				);
				this._cursorStartPoint = point;
				app.bindingMap.dragdropcursor.setPosition (
					this._cursorStartPoint
				);
				CursorBinding.fadeIn ( app.bindingMap.dragdropcursor );
				if ( binding.showDrag ) {
					binding.showDrag ();
				}
				EventBroadcaster.broadcast (
					BroadcastMessages.TYPEDRAG_START,
					binding.dragType
				);
				this._isDragging = true;
			}
		}
	},

	/**
	 * Dragging.
	 * @implements {IDragHandler}
	 * @param {Point} diff
	 */
	onDrag : function ( diff ) {

		if ( this._isDragging ) {
			var point = new Point (
				this._cursorStartPoint.x + diff.x,
				this._cursorStartPoint.y + diff.y
			);
			app.bindingMap.dragdropcursor.setPosition (
				point
			);
		}
	},

	/**
	 * Drag stop.
	 * @implements {IDragHandler}
	 * @param {Point} diff
	 */
	onDragStop : function ( diff ) {

		if ( this._isDragging ) {

			var binding = BindingDragger.draggedBinding;

			if ( binding.hideDrag ) {
				binding.hideDrag ();
			}

			EventBroadcaster.broadcast (
				BroadcastMessages.TYPEDRAG_STOP,
				binding.dragType
			)

			this._isDragging = false;

			binding = BindingAcceptor.acceptingBinding;

			/*
			 * Accept dragged binding.
			 */
			if ( binding != null ) {
				if ( Interfaces.isImplemented ( IAcceptable, binding, true ) == true ) {
					binding.accept (
						BindingDragger.draggedBinding
					);
				} else {
					throw new Error ( "Application: IAcceptable not implemented " + binding );
				}
				BindingAcceptor.acceptingBinding = null;
				CursorBinding.fadeOut ( app.bindingMap.dragdropcursor );

			/*
			 * Reject dragged binding.
			 */
			} else {

				app.bindingMap.dragdropcursor.hide ();

				/*
				if ( app.bindingMap.dragdropcursor.getOpacity () == 1 ) {
					var cursorEndPoint = new Point (
						this._cursorStartPoint.x + diff.x,
						this._cursorStartPoint.y + diff.y
					);
					CursorBinding.moveOut (
						app.bindingMap.dragdropcursor,
						this._cursorEndPoint,
						this._cursorStartPoint
					);
				} else {
					app.bindingMap.dragdropcursor.hide ();
				}
				*/
			}
		}
	},


	// SHORTCUTS .................................................................

	/**
	 * Reloading application window [control+R].
	 * See the KeySetBinding in file "index.aspx".
	 * @param {boolean} isForcedReload
	 */
	reload : function ( isForcedReload ) {

		/*
		 * When developermode in Prism, this will clear the file cache.
		 */
		if ( this.isDeveloperMode || isForcedReload ) {
			if ( this.isDeveloperMode && Client.isPrism ) {
				Prism.clearCache ();
			}
			Application.lock ( Application );
			setTimeout ( function () {
				top.window.location.reload ( true );
			}, 0 );
		} else {
			if ( Application.isOperational ) {
				Dialog.question (
					StringBundle.getString ( "ui", "Website.Application.DialogReload.Title" ),
					StringBundle.getString ( "ui", "Website.Application.DialogReload.Text" ),
					Dialog.BUTTONS_ACCEPT_CANCEL,
					{
						handleDialogResponse : function ( response ) {
							if ( response == Dialog.RESPONSE_ACCEPT ) {
								Application.reload ( true );
							}
						}
					}
				);
			} else {
				Application.reload ( true );
			}
		}
	},

	/**
	 * Quit application. This will automatically log off. When
	 * running in developermode, closing or reloading the main
	 * browserwindow will *not* log off unless we call this method!
	 */
	quit : function () {

		/*
		 * Note that Prism cannot actually close the window (because it
		 * is the main browser window), but at least we can hide the interface.
		 */
		Application.isShuttingDown = true;
		if ( FlowControllerService != null ) {
			FlowControllerService.ReleaseAllConsoleResources ( Application.CONSOLE_ID );
		}
		if ( this.logout ()) {
			top.close();
			location.reload();
		}
	},

	/**
	 * Has dirty tabs?
	 * @return {boolean}
	 */
	hasDirtyDockTabs : function () {

		return this._dirtyTabs.countEntries () > 0;
	},

	/**
	 * Get dirty tabs.
	 * @return {List<string><DockTabBinding>}
	 */
	getDirtyDockTabsTabs : function () {

		return this._dirtyTabs;
	}
}

/**
 * The instance that does it.
 * @type {_Application}
 */
var Application = new _Application ();