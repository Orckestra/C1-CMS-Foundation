RootBinding.prototype = new Binding;
RootBinding.prototype.constructor = RootBinding;
RootBinding.superclass = Binding.prototype;

/*
 * These actions get dispatched simultaneously on document
 * initialization. They have been split into three so that hosted
 * bindings get hook into different "phases" for fine-tuning.
 * They all get consumed by first ancestor {@link ViewBinding}.
 * TODO: Refactor > consume by WindowBinding.
 */
RootBinding.ACTION_PHASE_1 = "root init phase 1";
RootBinding.ACTION_PHASE_2 = "root init phase 2";
RootBinding.ACTION_PHASE_3 = "root init phase 3";

/*
 * Bindings can hook into these to know when the nearest ancestor
 * DockBinding or StageDialogBinding has been changed activation.
 * They both get consumed by first ancestor {@link WindowBinding}.
 * Alternatively, see method {RootBinding#makeActivationAware}.
 */
RootBinding.ACTION_ACTIVATED = "root activated";
RootBinding.ACTION_DEACTIVATED = "root deactivated";


RootBinding.CLASSNAME_WEBKIT_DESKTOP = "webkit-d";

/**
 * @class
 * This binds to the BODY tag!
 */
function RootBinding () {

	/**
	 * @type {SystemLogger}
	 */
	this.logger = SystemLogger.getLogger ( "RootBinding" );

	/**
	 * The root is always activation-aware ANYWAY!
	 * TODO: normalize this scenario!
	 * @implements {IActivationAware}
	 * @type {boolean}
	 */
	this.isActivationAware = false;

	/**
	 * @implements {IActivationAware}
	 * @type {boolean}
	 */
	this.isActivated = false;

	/**
	 * List of activation-aware bindings.
	 * @type {List<IAcivationAware>}
	 */
	this._activationawares = null;

	/*
	 * Returnable
	 */
	return this;
}

/**
 * Identifies binding.
 */
RootBinding.prototype.toString = function () {

	return "[RootBinding]";
}

/**
 * Setup to make sure that any freshly loaded window
 * is always flexed up from the root element.
 * @overloads {Binding#onBindingRegister}.
 */
RootBinding.prototype.onBindingRegister = function() {

	RootBinding.superclass.onBindingRegister.call(this);

	this.logger = SystemLogger.getLogger(this.bindingDocument.title.toString());

	if (this.bindingWindow.WindowManager) {
		this.subscribe(this.bindingWindow.WindowManager.WINDOW_EVALUATED_BROADCAST);
	}

	/*
	 * Make activation aware.
	 */
	this._activationawares = new List();
	this.isActivated = false;
	this._setupActivationAwareness(true);

	if (Localization.isUIRtl) {
		this.setProperty("dir", "rtl");
		this.attachClassName("rtl");
	}

	if (Client.isWebKit && !Client.isPad) {
		this.attachClassName(RootBinding.CLASSNAME_WEBKIT_DESKTOP);
	}
}

/**
 * @overloads {Binding#onBindingDispose}
 */
RootBinding.prototype.onBindingDispose = function () {

	RootBinding.superclass.onBindingDispose.call ( this );
	this._setupActivationAwareness ( false );
	EventBroadcaster.unsubscribe (
		this.bindingWindow.WindowManager.WINDOW_EVALUATED_BROADCAST,
		this
	);
}

/**
 * On window load, dispatch three actions. If one binding is
 * required to do something before another binding, just let
 * them hook into different phases around here.
 * @implements {IBroadcastListener}
 * @param {string} broadcast
 * @param {object} arg
 */
RootBinding.prototype.handleBroadcast = function ( broadcast, arg ) {

	RootBinding.superclass.handleBroadcast.call ( this, broadcast, arg );

	var onloadBroadcast = this.bindingWindow.WindowManager.WINDOW_EVALUATED_BROADCAST;

	switch ( broadcast ) {
		case onloadBroadcast :

			/*
			 * Dispatch phases.
			 */
			this.dispatchAction ( RootBinding.ACTION_PHASE_1 );
			this.dispatchAction ( RootBinding.ACTION_PHASE_2 );
			this.dispatchAction ( RootBinding.ACTION_PHASE_3 );
			this.unsubscribe ( onloadBroadcast );
			break;
	}
}

/**
 * Invoked when the nearest containing
 * {@link IActivatable} gets activated.
 * TODO: Disable during startup?
 * @implements {IActivationAware}
 */
RootBinding.prototype.onActivate = function () {

	this._onActivationChanged ( true );
}

/**
 * Invoked when the nearest containing
 * {@link IActivatable} gets deactivated.
 * TODO: Disable during startup?
 * @implements {IActivationAware}
 */
RootBinding.prototype.onDeactivate = function () {

	this._onActivationChanged ( false );
}

/**
 * Handle activation change.
 * @param {boolean} isActivated
 * @return
 */
RootBinding.prototype._onActivationChanged = function ( isActivated ) {

	var action = isActivated ? RootBinding.ACTION_ACTIVATED : RootBinding.ACTION_DEACTIVATED;

	if ( isActivated != this.isActivated ) {

		this.isActivated = isActivated;
		this.dispatchAction ( action );
		var waste = new List ();
		var self = this;

		/*
		 * Bindings will cleanup themselves on disposal,
		 * but other objects may forget to unregister
		 * from the awareness list. We do a basic cleanup.
		 */
		this._activationawares.each ( function ( aware ) {
			if ( aware.isActivationAware ) {
				try {
					if ( isActivated ) {
						if ( !aware.isActivated ) {
							aware.onActivate ();
						}
					} else {
						if ( aware.isActivated ) {
							aware.onDeactivate ();
						}
					}
				} catch ( exception ) {
					self.logger.error ( exception );
					waste.add ( aware );
				}
			}
		});

		/*
		 * Cleanup waste from awareness list.
		 */
		waste.each ( function ( aware ) {
			this._activationawares.del ( aware );
		});
		waste.dispose ();

	} else {
		var error = "Activation dysfunction: " + this.bindingDocument.title;
		if ( Application.isDeveloperMode == true ) {
			// alert ( error );
			this.logger.error ( error );
		} else {
			this.logger.error ( error );
		}
	}
}

/**
 * Add or remove binding to be poked when activation changes.
 * @param {IActivationAware} binding
 * @param @optional {boolean} isAware
 */
RootBinding.prototype.makeActivationAware = function ( binding, isAware ) {

	if ( Interfaces.isImplemented ( IActivationAware, binding, true ) == true ) {
		if ( isAware == false ) {
			this._activationawares.del ( binding );
		} else {
			this._activationawares.add ( binding );
			if ( this.isActivated == true ) {
				binding.onActivate ();
			}
		}
	} else {
		if ( Application.isDeveloperMode == true ) {
			alert ( "RootBinding: IActivationAware not implemented (" + binding + ")");
		}
	}
}

/**
 * Add and remove activation awareness (on register and dispose).
 * @param {boolean} isSetup
 */
RootBinding.prototype._setupActivationAwareness = function ( isSetup ) {

	var frame = this.getMigrationParent ();
	if ( frame != null ) {
		var root = frame.ownerDocument.body;
		var binding = UserInterface.getBinding ( root );
		if ( binding != null ) {
			binding.makeActivationAware ( this, isSetup );
		}
	}
}

/**
 * Relay ascending crawle to containing document.
 * @implements {ICrawlerHandler}
 * @param {Crawler} crawler
 */
RootBinding.prototype.handleCrawler = function ( crawler ) {

	RootBinding.superclass.handleCrawler.call ( this, crawler );

	if ( crawler.type == NodeCrawler.TYPE_ASCENDING ) {
		crawler.nextNode = this.bindingWindow.frameElement;
	}
}

/**
 * Migrate the action to "nearest" binding in ancestor document.
 * @overwrites {Binding#getMigrationParent}.
 */
RootBinding.prototype.getMigrationParent = function () {

	var result = null;
	try {
		if (this.bindingWindow.parent) {
			result = this.bindingWindow.frameElement;
		}
	} catch (exception) {
		// MS EDGE throw 'Object expected' for some 'empty' Window properties
	}
	return result;
}