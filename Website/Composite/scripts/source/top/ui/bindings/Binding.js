/*
 * Note that all bindings meddle with the constructor property thusly.
 */
Binding.prototype.constructor = Binding;

/*
 * Attribute names reserved for NET server postback.
 */
Binding.CALLBACKID = "callbackid"; // __EVENTTARGET
Binding.CALLBACKARG = "callbackarg"; // __EVENTARGUMENT

/*
 * Special classname to clear the float using CSS hacks.
 * These are added dynamically, although it is not the
 * best way to performance-optimize Internet Explorer.
 * @see "base.css"
 */
Binding.CLASSNAME_CLEARFLOAT = "clearfix";
Binding.CLASSNAME_FOCUSED = "focused";

/*
 * Standard timeout in milliseconds before a lazy binding
 * wakes up properly. This prevents jumping layouts. The
 * binding may define a different timeout if desired.
 * @see {Binding#wakeUp}
 */
Binding.SNOOZE = Client.isMozilla == true ? 125: 250;

/*
 * Actions common to all Bindings.
 */
Binding.ACTION_DRAG = "bindingdrag";
Binding.ACTION_DROP = "bindingdrop";
Binding.ACTION_DIRTY = "bindingdirty";
Binding.ACTION_VALID = "bindingvalid";
Binding.ACTION_UPDATED = "bindingupdated";
Binding.ACTION_INVALID = "bindinginvalid";
Binding.ACTION_RESIZED = "bindingresized";
Binding.ACTION_FOCUSED = "bindingfocused";
Binding.ACTION_BLURRED = "bindingblurred";
Binding.ACTION_ATTACHED = "bindingattached";
Binding.ACTION_DETACHED = "bindingdetached";
Binding.ACTION_DISPOSED = "bindingdisposed";
Binding.ACTION_MOVETOTOP = "bindingmovetotop";
Binding.ACTION_ACTIVATED = "bindingactivated";
Binding.ACTION_REGISTERED = "bindingregistered";
Binding.ACTION_MOVEDONTOP = "bindingmovedontop";
Binding.ACTION_INITIALIZED = "bindinginitialized";
Binding.ACTION_FORCE_REFLEX = "bindingforcereflex";
Binding.ACTION_DIMENSIONCHANGED = "bindingdimensionchanged";
Binding.ACTION_VISIBILITYCHANGED = "bindingvisibilitychanged";

/**
 * Abstract method "placeholder" function. Indicates
 * that subclasses should overwrite the particular method.
 * @type {function}
 */
Binding.ABSTRACT_METHOD = function () {

	SystemDebug.stack ( arguments );
	throw ( this.toString () + " abstract method not implemented" );
}

/**
 * Evaluate inline script (declared in markup) in binding context.
 * @param {String} script
 * @param {Binding} binding
 * @return {object}
 */
Binding.evaluate = function ( script, binding ) {

	var result = null;
	var manager = binding.bindingWindow.WindowManager;
	if ( manager != null ) {
		var statement = Binding.parseScriptStatement ( script, binding.key );
		result = manager.evaluate ( statement );
	}
	return result;
}

/**
 * Due to differences in the implementation of "eval" in different browsers, it may be
 * nescessary to replace the "this" keyword in a script string with a global pointer.
 * This is needed for all versions of IE and for Firefox starting from version 3.7
 * TODO: Doesn't handle string "alert(this)" !!!
 * @see {ButtonBinding}
 * @see {TreeNodeBinding}
 * @param {String} script
 * @param {String} key
 */
Binding.parseScriptStatement = function ( script, key ) {

	if ( script != null && key != null ) {
		var replacement = "UserInterface.getBindingByKey ( \"" + key + "\" )";
		script = script.replace ( /(\W|^)this(,| +|\)|;)/g, replacement );
		script = script.replace ( /(\W|^)this(\.)/g, replacement + "." );
	}
	return script;
}

/**
 * Nowadays, with Dot Net Ajax and what, you can never
 * be sure that your Binding hasn't been spirited away behind
 * your back. This method will verify the integrity of your
 * binding before you attempt to invoke it's methods.
 * @param {Binding} binding
 * @return {boolean}
 */
Binding.exists = function ( binding ) {

	var result = false;
	try {
		if ( binding && binding.bindingElement && binding.bindingElement.nodeType && binding.isDisposed == false ) {
			result = true;
		}
	} catch ( accessDeniedException ) {
		result = false;
	} finally {
		return result;
	}
}

/**
 * Destroy binding. Somewhat overdestructively in order to patch memory leaks.
 * Note that the DOM element is not removed, only the binding gets nuked.
 * @param {Binding} binding
 */
Binding.destroy = function ( binding ) {

	if ( !binding.isDisposed ) {

		if ( binding.acceptor != null ) {
			binding.acceptor.dispose ();
		}
		if ( binding.dragger != null ) {
			binding.disableDragging ();
		}
		if ( binding.boxObject != null ) {
			binding.boxObject.dispose ();
		}
		if (binding._domEventHandlers != null) {
			DOMEvents.cleanupEventListeners(binding);
		}
		for ( var branch in binding.shadowTree ) {
			var entry = binding.shadowTree [ branch ];
			if ( entry instanceof Binding && Binding.exists ( entry )) {
				entry.dispose ( true );
			}
			binding.shadowTree [ branch ] = null;
		}
		binding.isDisposed = true;
		binding = null;
	}
}

/**
 * Inject the binding with a hidden field so that the ASP.NET server may recognize it.
 * The binding may access the field as "this.shadowTree.dotnetinput" to mofify its value.
 * Note this: The ID attribute is for the client while the callbackid is for the server.
 * @param {Binding} binding
 * @param {String} value
 * @returns
 */
Binding.dotnetify = function ( binding, value ) {

	var callbackid = binding.getCallBackID ();

	if ( callbackid != null ) {
		var input = DOMUtil.createElementNS ( Constants.NS_XHTML, "input", binding.bindingDocument );
		input.type = "hidden";
		input.id = callbackid;
		input.name = callbackid;
		input.value = value != null ? value : "";
		binding.bindingElement.appendChild ( input );
		binding.shadowTree.dotnetinput = input;
	} else {
		throw binding.toString () + ": Missing callback ID";
	}
}

/**
 * Build image profile.
 * @param {Binding} binding
 */
Binding.imageProfile = function ( binding ) {

	var image = binding.getProperty ( "image" );
	var imageHover = binding.getProperty ( "image-hover" );
	var imageActive = binding.getProperty ( "image-active" );
	var imageDisabled = binding.getProperty ( "image-disabled" );

	/*
	 * Note that we don't overwrite properties
	 * that were already assigned programatically.
	 */
	if ( binding.imageProfile == null ) {
		if ( binding.image == null && image != null ) {
			binding.image = image;
		}
		if ( binding.imageHover == null && imageHover != null ) {
			binding.imageHover = imageHover;
		}
		if ( binding.imageActive == null && imageActive != null ) {
			binding.imageActive = imageActive;
		}
		if ( binding.imageDisabled == null && imageDisabled != null ) {
			binding.imageDisabled = imageDisabled;
		}
		if ( binding.image || binding.imageHover || binding.imageActive || binding.imageDisabled ) {
			binding.imageProfile = new ImageProfile ( binding );
		}
	}
};

// BINDING CLASS ..................................................................

/**
 * @class
 * The <code>Binding</code> is the base class for all objects
 * that control UI namespaced DOM elements on the rendering canvas.
 * @implements {IEventListener}
 * @implements {IActionListener}
 * @implements {IBroadcastListener}
 */
function Binding () {

	/**
	 * @type {SystemLogger}
	 */
	this.logger = SystemLogger.getLogger ( "binding" );

	/**
	 * This property is set by {@link UserInterface} when the binding
	 * is registered. The bound element is assigned a DOM attribute
	 * "key" with a corresponding value.
	 * @type {string}
	 */
	this.key = null;

	/**
	 * The DOM element wrapped by the Binding.
	 * @type {DOMElement}
	 */
	this.bindingElement	= null;

	/**
	 * The ownerDocument of the bound element.
	 * @type {DOMDocument}
	 */
	this.bindingDocument = null;

	/**
	 * The parent window of the bound element.
	 * @type {DocumentView}
	 */
	this.bindingWindow = null;

	/**
	 * Pointers to DOMElements generated by the Binding.
	 * @type {HashMap<string><DOMElement>}
	 */
	this.shadowTree = null;

	/**
	 * A collection of actionlisteners.
	 * @type {HashMap<string><array>}
	 * @private
	 */
	this.actionListeners = null;

	/**
	 * @type {PopupBinding}
	 * @private
	 */
	this.contextMenuBinding = null;

	/**
	 * Switched to true when the bindings <code>onBindingRegister</code> method executes.
	 * @type {boolean}
	 */
	this.isRegistered = false;

	/**
	 * Switched to true when the bindings <code>onBindingAttach</code> method executes.
	 * @type {boolean}
	 */
	this.isAttached = false;

	/**
	 * Switched to true when the bindings <code>onBindingInitialize</code> method executes.
	 * @type {boolean}
	 */
	this.isInitialized = false;

	/**
	 * Switched to true when the bindings <code>onBindingDispose</code> method executes
	 * (although technically the switch is performed elsewhere).
	 * @see {Binding#dispose}
	 * @type {boolean}
	 */
	this.isDisposed = false;

	/**
	 * If set to true, the binding element will dispatch a special action on drag gesture.
	 * @type {boolean}
	 */
	this.isDraggable = false;

	/**
	 * This one handles dragging action.
	 * @type {Dragger}
	 */
	this.dragger = null;

	/**
	 * This depends on...
	 * @type {HashMap<string><boolean>}
	 */
	this.memberDependencies = null;

	/**
	 * Depends on this...
	 * @type {HashMap<string><Binding>}
	 */
	this.dependentBindings = null;

	/**
	 * This maps binding DOM properties to binding methods. When the property
	 * is modified, the method will be invoked with the property value as an
	 * argument. To avoid an excessive amount of mutation event listeners,
	 * you *must* change the property using the setProperty method. This property
	 * should be specified when you wire the binding to a {@link BroadcasterBinding}
	 * @type {HashMap<string><function>}
	 */
	this.propertyMethodMap = null;

	/**
	 * If set to true, this binding may still dispatch an {@link Action} but
	 * it will not relay events dispatched by any descendant binding.
	 * @type {boolean}
	 */
	this.isBlockingActions = false;

	/**
	 * @type {boolean}
	 */
	this.isVisible = true;

	/**
	 * Presents a simpliefied API for dealing with this bindings size and position on stage.
	 * @type {BindingBoxObject}
	 */
	this.boxObject = null;

	/**
	 * Identifies the type of this binding while dragging.
	 * @see {Binding#dragAccept}
	 * @type {string}
	 */
	this.dragType = null;

	/**
	 * Whitespace-separated list of draggable types to accept.
	 * @see {Binding#dragType}
	 * @type {string}
	 */
	this.dragAccept = null;

	/**
	 * If set to true, this binding will not accept any dragged bindings.
	 * @type {boolean}
	 */
	this.dragReject = false;

	/**
	 * Handles binding acceptance end rejection while dragging.
	 * @type {BindingAcceptor}
	 */
	this.acceptor = null;

	/**
	 * Flags lazy attachment.
	 * @type {boolean}
	 */
	this.isLazy = false;

	/**
	 * The property "persistance" must be markup up as a whitespace
	 * separated list of persisted properties. Internally we use a hashmap.
	 * @type {HashMap<string><string>}
	 */
	this._persist = null;

	/**
	 * True if DOM content was expanded server side.
	 * @type {boolean}
	 */
	this.isBindingBuild = false;

	/**
	 * Used to cleanup activationaware bindings.
	 * @type {boolean}
	 */
	this._hasActivationAwareness = false;

	/**
	 * While flexing, minimize the amount of DOM iterations by flipping this.
	 * @see {FlexBoxCrawler}
	 * @type {boolean}
	 */
	this.isFlexSuspended = false;

	/**
	 * Blocking crawler progression by matching the crawler ID with a list.
	 * This way, bindings may fasttrack simple rejection of common crawlers.
	 * Advanced handling of crawlers should be done with method handleCrawler.
	 * Note that the crawler filter property is null untill subclass constructs it.
	 * @type {List<string>}
	 */
	this.crawlerFilters = null;

	/**
	 * EventBroadcaster subscriptions.
	 * @type {Map<string><boolean>}
	 */
	this._subscriptions = null;
}

/**
 * Identifies binding.
 */
Binding.prototype.toString = function () {

	return "[Binding]";
}

/**
 * Register binding. Must only be invoked by the DocumentManager.
 */
Binding.prototype.onBindingRegister = function () {

	if ( !this.isRegistered ) {

		this.bindingElement			= UserInterface.getElement ( this );
		this.bindingDocument 		= this.bindingElement.ownerDocument;
		this.bindingWindow			= DOMUtil.getParentWindow ( this.bindingDocument );
		this.shadowTree 			= {};
		this.actionListeners		= {};
		this.propertyMethodMap		= {};
		this.isRegistered 			= true;
		this._subscriptions			= new Map ();

		this._updateBindingMap ( true );
		if ( this.getProperty ( "lazy" )) {
			this.isLazy = true;
		}
	}
}

/**
 * Attach binding. Must only be invoked by the DocumentManager or via the attach method.
 */
Binding.prototype.onBindingAttach = function () {

	if ( !this.isAttached ) {
		if ( !this.bindingElement.parentNode ) {
			alert ( this + " onBindingAttach: Binding must be positioned in document structure before attachment can be invoked." );
		} else {
			this.boxObject = new BindingBoxObject(this);
			this._initializeBindingTestFeatures();
			this._initializeBindingPersistanceFeatures ();
			this._initializeBindingGeneralFeatures ();
			this._initializeBindingDragAndDropFeatures ();
			this._updateBindingMap ( true );
			this.isAttached = true;
		}
	}
}

/**
 * Initialize binding. Must only be invoked by the DocumentManager or via the attach method.
 */
Binding.prototype.onBindingInitialize = function () {

	/*
	 * When overloading, place your code here!!!!
	 */

	if ( this.dependentBindings != null ) {
		for ( var key in this.dependentBindings ) {
			var dependentBinding = this.dependentBindings [ key ];
			dependentBinding.onMemberInitialize ( this );
		}
	}

	/*
	 * Flag initialized status.
	 */
	this.isInitialized = true;
}

/**
 * Evaluated when a dependent members onBindingInitialize method is invoked.
 * @param {Binding} binding
 */
Binding.prototype.onMemberInitialize = function ( binding ) {

	/*
	 * When overloading, place your code here!!!!
	 */

	if ( binding ) {
		this.memberDependencies [ binding.key ] = true;
		var isReady = true;
		for ( var key in this.memberDependencies ) {
			if ( this.memberDependencies [ key ] == false ) {
				isReady = false;
				break;
			}
		}
		if ( isReady ) {
			this.onBindingInitialize ();
		}
	} else {
		throw new Error ( this + " onMemberInitialize: Expected argument." );
	}
}

/**
 * Invokes onBindingAttach and onBindingInitialize; then returns the binding.
 * @return {Binding}
 */
Binding.prototype.attach = function () {

	if ( !this.isAttached ) {
		this.onBindingAttach ();
		if ( this.memberDependencies == null ) {
			this.onBindingInitialize ();
		}
	}
	return this;
}

/**
 * Recursivley attach this and any descendant binding not already attached.
 */
Binding.prototype.attachRecursive = function () {

	this.bindingWindow.DocumentManager.attachBindings ( this.bindingElement );
}

/**
 * Recursivley dispose all descendant bindings, possibly even this binding.
 * Please note this will not destroy the associated DOMElements!
 * @param {boolean} isDetachMyself If set to true, dispose this binding.
 */
Binding.prototype.detachRecursive = function ( isDetachMyself ) {

	if ( isDetachMyself == null ) {
		isDetachMyself = false;
	}
	this.bindingWindow.DocumentManager.detachBindings (
		this.bindingElement, !isDetachMyself
	);
}

/**
 * Add single member.
 * @param {Binding} binding
 * @return {Binding}
 */
Binding.prototype.addMember = function ( binding ) {

	if ( !this.isAttached ) {
		throw "Cannot add members to unattached binding";
	} else if ( !binding.isInitialized ){
		if ( !this.memberDependencies ) {
			this.memberDependencies = {};
		}
		this.memberDependencies [ binding.key ] = false;
		binding.registerDependentBinding ( this );
	}
	return binding;
}

/**
 * Add list of members.
 * @param {List} bindings
 * @return {List}
 */
Binding.prototype.addMembers = function ( bindings ) {

	while ( bindings.hasNext ()) {
		var binding = bindings.getNext ();
		if ( !binding.isInitialized ) {
			this.addMember ( binding );
		}
	}
	return bindings;
}

/**
 * Register dependant binding.
 * @param {Binding} binding
 */
Binding.prototype.registerDependentBinding = function ( binding ) {

	if ( !this.dependentBindings ) {
		this.dependentBindings = {};
	}
	this.dependentBindings [ binding.key ] = binding;
}

/**
 * Initialize attributes for test.
 */
Binding.prototype._initializeBindingTestFeatures = function () {

	if (Application.isTestEnvironment) {
		var label = this.getProperty("label");
		if (label && label.indexOf && label.indexOf("${string:") > -1) {
			this.setProperty("data-qa", label);
		}
	}
}

/**
 * Initialize persistance.
 */
Binding.prototype._initializeBindingPersistanceFeatures = function () {

	var persist = this.getProperty ( "persist" );

	if ( persist && Persistance.isEnabled ) {
		var id = this.bindingElement.id;
		if ( !KeyMaster.hasKey ( id )) {
			this._persist = {};
			var props = new List ( persist.split ( " " ));
			while ( props.hasNext ()) {
				var prop = props.getNext ();
				var value = Persistance.getPersistedProperty ( id, prop );
				if ( value != null ) {
					this._persist [ prop ] = value;
					this.setProperty ( prop, value );
				} else {
					value = this.getProperty ( prop );
					// alert ( this.toString() + " " + id + " " + prop +":" + value );
					if ( value != null ) {
						this._persist [ prop ] = value;
					}
				}
			};
		} else {
			throw "Persistable bindings must have a specified ID.";
		}
	}
}

/**
 * Intitialize general features.
 */
Binding.prototype._initializeBindingGeneralFeatures = function () {

	var disabled 			= this.getProperty 	( "disabled" );
	var contextmenu 		= this.getProperty 	( "contextmenu" );
	var observes 			= this.getProperty 	( "observes" );
	var onattach 			= this.getProperty 	( "onattach" );
	var hidden				= this.getProperty 	( "hidden" );
	var isBlocking 			= this.getProperty 	( "blockactionevents" );

	if ( hidden == true && this.isVisible == true ) {
		this.hide ();
	}
	if ( disabled && this.logger != null ) {
		this.logger.error ( "The 'disabled' property has been renamed 'isdisbaled'" );
	}
	if ( contextmenu ) {
		this.setContextMenu ( contextmenu );
	}
	if ( observes ) {
		this.observe (
			this.getBindingForArgument ( observes )
		);
	}
	if ( isBlocking == true ) {
		this.isBlockingActions = true;
	}
	if ( this.isActivationAware == true ) {
		var root = UserInterface.getBinding ( this.bindingDocument.body );
		root.makeActivationAware ( this );
		this._hasActivationAwareness = true;
	}
	if ( onattach != null ) {
		Binding.evaluate ( onattach, this );
	}

	// TODO: investigate why explorer apparently stops evaluating statements at this point!
}

/**
 * Intitialize drag and drop features. Notice that a dragtype
 * implies that the binding is draggable unless specifically
 * stated otherwise (draggable property set to false).
 * TODO: This may not be a good idea regarding persistance!
 * TODO: require draggable set to true!
 */
Binding.prototype._initializeBindingDragAndDropFeatures = function () {

	var isDraggable = this.getProperty 	( "draggable" );
	var dragtype	= this.getProperty 	( "dragtype" );
	var dragaccept	= this.getProperty 	( "dragaccept" );
	var dragreject	= this.getProperty 	( "dragreject" );

	if ( isDraggable != null ) {
		this.isDraggable = isDraggable; // but see below...
	}
	if ( dragtype != null ) {
		this.dragType = dragtype;
		if ( isDraggable != false ) {
			this.isDraggable = true; // dragtype enables drag, unless explicitely denied.
		}
	}
	if ( dragaccept != null ){
		this.dragAccept = dragaccept;
	}
	if ( dragreject	!= null ) {
		this.dragReject = dragreject;
	}

	/*
	 * Setup drag type stuff.
	 */
	if ( this.isDraggable ) {
		this.enableDragging ();
	}
	if ( this.dragger != null && this.dragType != null ) {
		this.dragger.registerHandler (
			Application
		);
	}

	/*
	 * Note that we construct a BindingAcceptor even for rejecting bindings!
	 */
	if ( this.dragAccept != null && this.dragReject == true ) {
		throw new Error ( "Binding cannot both accept and reject " + this );
	} else if ( this.dragAccept != null || this.dragReject != null ) {
		this.acceptor = new BindingAcceptor ( this );
	}
}

/**
 * Update bindingMap (see WindowManager). Notice that this method gets invoked
 * from both onBindingRegister, onBindingAttach and onBindingDispose methods.
 * @param {boolean} isRegistration
 */
Binding.prototype._updateBindingMap = function ( isRegistration ) {

	try {
		if ( this.bindingWindow != null ) {

			var id = this.bindingElement.id;
			var map = this.bindingWindow.bindingMap;
			var registered = null;

			if ( isRegistration ) {
				registered = map [ id ];
				if ( registered != null && registered != this ) {
					var cry = this.toString () + " duplicate binding ID: " + id;
					this.logger.error ( cry );
					if ( Application.isDeveloperMode ) {
						throw ( cry );
					}
				} else {
					map [ id ] = this;
				}
			} else {
				registered = map [ id ];
				if ( registered != null && registered == this ) {
					delete map [ id ];
				}
			}
		} else {
			var fault = new String ( "Binding#_updateBindingMap odd dysfunction: " + this.toString () + ": " + isRegistration );
			if ( Application.isDeveloperMode == true ) {
				alert ( fault );
			} else {
				this.logger.error ( fault );
			}
		}
	} catch ( exception ) {
		this.logger.error ( exception );
	}
}

/**
 * Handle DOM event. To eliminate doubts when subclassing,
 * all bindings have been fitted with this method to overload.
 * @implements {IEventListener}
 * @param {Event} e
 */
Binding.prototype.handleEvent = function ( e ) {};

/**
 * Handle Action. To eliminate doubts when subclassing,
 * all bindings have been fitted with this method to overload.
 * @implements {IActionListener}
 * @param {Action} action
 */
Binding.prototype.handleAction = function ( action ) {};

/**
 * Handle broadcast. To eliminate doubts when subclassing,
 * all bindings have been fitted with this method to overload.
 * @see {EventBroadcaster}
 * @implements {IBroadcastListener}
 * @param {string} broadcast
 * @param {object] arg
 */
Binding.prototype.handleBroadcast = function ( broadcast, arg ) {};

/**
 * Handle element update?
 * @implements {IUpdateHandler}
 * @param {Element} element
 * @returns {boolean} Return true to trigger method handleElement.
 */
Binding.prototype.handleElement = function ( element ) {

	return false;
}

/**
 * Update element. And stop crawling DOM subtree?
 * @implements {IUpdateHandler}
 * @param {Element} element
 * @returns {boolean} Return true to stop crawling.
 */
Binding.prototype.updateElement = function ( element ) {

	return false;
}

/**
 * This utility function allows you to address a binding instance using
 * a number of argument types. If you provide an element or a binding
 * there's no trick to it. But if you provide a string it will either resolve
 * to the id of an element in the current document context OR be evaluated
 * as a javascript call which can retrieve a binding from somewhere in the
 * application hierarchy.
 * @param {object} arg
 */
Binding.prototype.getBindingForArgument = function ( arg ) {

	var result = null;

	switch ( typeof arg ) {
		case "object" : // the result was assigned using javascript
			result = arg;
			break;
		case "string" : // the result was declared in inline markup

			// fetch binding by simple id in current document scope
			result = this.bindingDocument.getElementById ( arg );

			// or evaluate the attribute as some kind of javascript
			if ( result == null ) {
				result = Binding.evaluate ( arg, this );
			}
			break;
	}

	// at this point, the result can be either a DOMElement or a Binding.
	if ( result != null && result.nodeType != null ) {
		result = UserInterface.getBinding ( result );
	}
	return result;
}

/**
 * Serialize binding. Returns a hashmap of properties to be included in the
 * serialization result tree. Return false to prevent binding entirely from
 * appearing in the result tree (anonymously generated shadow content).
 * @return {HashMap<string><object>} well - could also return null or false!
 */
Binding.prototype.serialize = function () {

	/*
	 * All properties of this object will be translated
	 * to attributes on the serialized result element.
	 */
	var result = {};

	/**
	 * Always include non-autogenerated id attribute.
	 */
	var id = this.bindingElement.id;
	if ( id && id != this.key ) {
		result.id = id;
	}

	var binding = this.getProperty ( "binding" );
	if ( binding ) {
		result.binding = binding;
	}

	return result;
}

/**
 * @return {string}
 */
Binding.prototype.serializeToString = function () {

	var result = null;
	if ( this.isAttached ) {
		result = new BindingSerializer ().serializeBinding ( this );
	} else {
		throw "cannot serialize unattached binding";
	}
	return result;
}

/**
 * Generate binding subtree from string input.
 * TODO: RUN VIA MASTERFILTER.XSL?
 * @param {string} string
 */
Binding.prototype.subTreeFromString = function ( markup ) {

	this.detachRecursive ();
	this.bindingElement.innerHTML = Client.fixUI(markup);
	this.attachRecursive ();
}

/**
 * Get bound element attribute. The attribute value (in DOM always a string) is
 * analyzed  and converted to an appropriate js primitive of type number,
 * string or boolean, making it simpler to work with in a scripting environment.
 * @param {string} attname
 */
Binding.prototype.getProperty = function ( attname ) {

	var value = this.bindingElement.getAttribute ( attname.toLowerCase() );

	if ( value ) {
		value = Types.castFromString ( value );
	}
	return value;
}

/**
 * Set bound element attribute. The value is converted to a string.
 * If set to a null value, the property will be removed. By specifying
 * the propertyMethodMap, this method can automatically invoke a specified
 * method on the binding using the formatted value as an argument. This setup
 * was engineered specifically to support the {@link BroadcasterBinding}.
 * @param {string} attname The name of the attribute
 * @param {object} value The attribute value.
 */
Binding.prototype.setProperty = function (attname, value ) {

	if ( value != null ) {

		// DOM attributes are always stored as strings
		value = value.toString ();

		/*
		 * Dont't do anything unless the property is actually changed.
		 * This will prevent recursive calls to methods which in turn
		 * modifies the properties of the binding.
		 */
		if ( String ( this.bindingElement.getAttribute ( attname.toLowerCase() )) != value ) {

			this.bindingElement.setAttribute ( attname.toLowerCase(), value );
			if ( this.isAttached == true ) {

				/*
				 * Handle persistance.
				 */
				if ( Persistance.isEnabled && value != null ) {
					if ( this._persist != null && this._persist [ attname ]) {
						this._persist [ attname ] = value;
						Persistance.setPersistedProperty (
							this.bindingElement.id,
							attname,
							value
						);
					}
				}

				/*
				 * Handle "setters" (methods invoked when setting the property).
				 */
				var method = this.propertyMethodMap [ attname ];
				if ( method ) {
					method.call ( this, this.getProperty ( attname ));
				}
			}
		}
	} else {
		this.deleteProperty ( attname );
	}
}

/**
 * Remove bound element attribute.
 * @param {string} prop The name of the attribute
 */
Binding.prototype.deleteProperty = function ( attname ) {

	this.bindingElement.removeAttribute ( attname.toLowerCase() );
}

/**
 * Get the ID of the associated element.
 * @return {string}
 */
Binding.prototype.getID = function () {

	var result = null;
	if ( Binding.exists ( this )) {
		result = this.bindingElement.id;
	} else {
		SystemDebug.stack ( arguments );
	}
	return result;
}

/**
 * Attach CSS classname to bound element.
 * @param {string} classname
 */
Binding.prototype.attachClassName = function ( classname ) {

	CSSUtil.attachClassName ( this.bindingElement, classname );
}

/**
 * Detach CSS classname from bound element.
 * @param {string} classname
 */
Binding.prototype.detachClassName = function ( classname ) {

	CSSUtil.detachClassName ( this.bindingElement, classname );
}

/**
 * Check bound element classname.
 * @param {string} classname
 * @return {boolean}
 */
Binding.prototype.hasClassName = function ( classname ) {

	return CSSUtil.hasClassName ( this.bindingElement, classname );
}

/**
 * Add Action listener, not to be confused with real DOM events.
 * @param {string} type The event type should match (TODO: setup certain event types to match?)
 * @param {IActionListener} listener An object implementing {IActionListener} - optional.
 */
Binding.prototype.addActionListener = function ( type, listener ) {

	listener = listener != null ? listener : this;

	if ( Action.isValid ( type )) {
		if ( Interfaces.isImplemented ( IActionListener, listener )) {
			if ( !this.actionListeners [ type ]) {
				this.actionListeners [ type ] = [];
			}
			this.actionListeners [ type ].push ( listener );
		} else throw new Error (
			"Could not add action-event listener. Method handleAction not implemented."
		);
	} else {
		alert ( this + "\nCould not add undefined Action (" + listener + ")" );
	}
}

/**
 * Remove action listener
 * @param {string} type
 * @param {IActionListener} unListener
 */
Binding.prototype.removeActionListener = function ( type, unListener ) {

	unListener = unListener ? unListener : this;

	if ( Action.isValid ( type )) {
		var listeners = this.actionListeners [ type ];
		if ( listeners ) {
			var i = 0, listener;
			while (( listener = listeners [ i ]) != null ) {
				if ( listener == unListener ) {
					listeners.splice ( i, 1 );
					break;
				}
				i++;
			}
		}
	}
}

/**
 * Add DOM event listener, not to be confused with Action listeners,
 * to this bindingElement. If handler argument is omitted, the handler
 * defaults to the binding itself.
 * @param {string} type
 * @param {IEventListener} handler Optional.
 */
Binding.prototype.addEventListener = function ( type, handler ) {

	handler = handler ? handler : this;
	DOMEvents.addEventListener ( this.bindingElement, type, handler );

}

/**
 * Remove DOM event listener from this bindingElement.
 * @param {string} type
 * @param {IEventListener} handler Optional.
 */
Binding.prototype.removeEventListener = function ( type, handler ) {

	handler = handler ? handler : this;
	DOMEvents.removeEventListener ( this.bindingElement, type, handler );

}

/**
 * Subscribe EventBroadcaster transmission.
 * @param {string} broadcast
 */
Binding.prototype.subscribe = function ( broadcast ) {

	if ( !this.hasSubscription ( broadcast )) {
		this._subscriptions.set ( broadcast, true );
		EventBroadcaster.subscribe ( broadcast, this );
	} else {
		this.logger.error ( "Dubplicate subscription aborted:" + broadcast );
	}
}

/**
 * Unsubscribe EventBroadcaster transmission.
 * @param {string} broadcast
 */
Binding.prototype.unsubscribe = function ( broadcast ) {

	if ( this.hasSubscription ( broadcast )) {
		this._subscriptions.del ( broadcast );
		EventBroadcaster.unsubscribe ( broadcast, this );
	}
}

/**
 * Has EventBroadcaster subscription?
 * @return {boolean}
 */
Binding.prototype.hasSubscription = function ( broadcast ) {

	return this._subscriptions.has ( broadcast );
}

/**
 * Observe broadcaster.
 * @param {BroadcasterBinding} broadcaster
 * @param {string} properties
 */
Binding.prototype.observe = function ( broadcaster, properties ) {

	broadcaster.addObserver ( this, properties );
}

/**
 * Unobserve broadcaster.
 * @param {BroadcasterBinding} broadcaster
 * @param {string} properties
 */
Binding.prototype.unObserve = function ( broadcaster, properties ) {

	broadcaster.removeObserver ( this, properties );
}

/**
 * Setup the contextmenu. For binding to handle contextmenu
 * selection, it should implement the handleAction method.
 * @param {object} arg
 */
Binding.prototype.handleContextEvent = function (e) {
	var self = this;
	var menu = this.contextMenuBinding;
	if (Interfaces.isImplemented(IActionListener, self) == true) {
		var actionHandler = {
			handleAction: function () {
				menu.removeActionListener(MenuItemBinding.ACTION_COMMAND, self);
				menu.removeActionListener(PopupBinding.ACTION_HIDE, actionHandler);
			}
		}
		menu.addActionListener(MenuItemBinding.ACTION_COMMAND, self);
		menu.addActionListener(PopupBinding.ACTION_HIDE, actionHandler);
	}
	menu.snapToMouse(e);
}

/**
 * Setup the contextmenu. For binding to handle contextmenu
 * selection, it should implement the handleAction method.
 * @param {object} arg
 */
Binding.prototype.setContextMenu = function ( arg ) {

	this.contextMenuBinding = this.getBindingForArgument ( arg );

	if ( this.contextMenuBinding ) {

		var self = this;

		if (Client.isPad) {
			var touchStart = false;
			var touchTimeout = false;
			this.addEventListener(DOMEvents.TOUCHSTART, {
				handleEvent: function (e) {
					touchTimeout = setTimeout(function () {
						self.handleContextEvent(e);
					}, 800);
					touchStart = true;
				}
			});
			this.addEventListener(DOMEvents.TOUCHMOVE, {
				handleEvent: function (e) {
					if (touchStart) {
						clearTimeout(touchTimeout);
						touchStart = false;
					}

				}
			});
			this.addEventListener(DOMEvents.TOUCHEND, {
				handleEvent: function (e) {
					if (touchStart) {
						clearTimeout(touchTimeout);
						touchStart = false;
					}
				}
			});
		}
		else {
			this.addEventListener(DOMEvents.CONTEXTMENU, {
				handleEvent: function (e) {
					self.handleContextEvent(e);
				}
			});
		}

	} else {
		throw "No such contextmenu: " + arg;
	}

}

/**
 * @return {PopupBinding}
 */
Binding.prototype.getContextMenu = function () {

	return this.contextMenuBinding;
}

/**
 * Dispatch event, triggering actionlisteners associated to event type.
 * The event "bubbles up" to parent Bindings in a DOM-like way.
 * @param {object} arg This can be either a string or an {@link Action}.
 * @return {Action}
 */
Binding.prototype.dispatchAction = function (arg) {

	//console.log(arg);

	var action = null;
	var result = null;
	var isMyAction = false;

	/*
	 * Are we dispatching a new event or relaying a descendant event?
	 */
	if ( arg instanceof Action ) {
		action = arg;
	} else if ( Action.isValid ( arg )) {
		action = new Action ( this, arg );
		isMyAction = true;
	}

	/*
	 * Pass event to relevant listeners; then migrate the event to containing binding.
	 */
	if ( action != null && Action.isValid ( action.type ) == true ) {
		if ( action.isConsumed == true ) {
			result = action;
		} else {
			var listeners = this.actionListeners [ action.type ];
			if ( listeners != null ) {
				action.listener = this;
				var i = 0, listener;
				while (( listener = listeners [ i++ ]) != null ) {
					if ( listener && listener.handleAction ) {
						listener.handleAction ( action );
					}
				}
			}

			/*
			 * Migrate action?
			 */
			var isMigrate = true;

			/*
			 * Note that selected actions are allowed to bypass the
			 * action block system, notably the "activated" action.
			 * The postback action was added to please the
			 * wysiwygeditor (template update selector).
			 */
			if ( this.isBlockingActions == true ) {
				switch ( action.type ) {
					case Binding.ACTION_FOCUSED : // EXPERIMENTAL!
					case Binding.ACTION_BLURRED : // EXPERIMENTAL!
					case Binding.ACTION_ACTIVATED :
					case Binding.ACTION_FORCE_REFLEX :
					case DockTabBinding.ACTION_UPDATE_VISUAL :
					case PageBinding.ACTION_DOPOSTBACK :
						break;
					default :
						if ( !isMyAction ) {
							isMigrate = false;
						}
						break;
				}
			}

			if ( isMigrate ) {
				result = this.migrateAction ( action );
			} else {
				result = action;
			}
		}
	}
	return result;
}

/**
 * Migrate action to ancestor binding.
 * @param {Action} action
 * @return {Action}
 */
Binding.prototype.migrateAction = function ( action ) {

	var binding	= null;
	var result 	= null;
	var node 	= this.getMigrationParent ();

	if ( node ) {
		while ( node && !binding && node.nodeType != Node.DOCUMENT_NODE ) {
			binding = UserInterface.getBinding ( node );
			node = node.parentNode;
		}
		if ( binding ) {
			result = binding.dispatchAction ( action );
		} else {
			result = action;
		}
	}
	return result;
}

/**
 * Invoke the flex method (if specified) on this binding and all descendant bindings.
 * @param @optional {boolean} isForce
 */
Binding.prototype.reflex = function ( isForce ) {

	if ( Application.isOperational == true ) {
		FlexBoxBinding.reflex ( this, isForce );
	}
}

/**
 * Note that the {@link RootBinding} overwrites this method
 * in order to migrate the event across iframe boundaries.
 * @return {DOMElement}
 */
Binding.prototype.getMigrationParent = function () {

	var result = null;
	if ( true ) { // Binding.exists ( this )
		try {
			var parent = this.bindingElement.parentNode;
			if ( parent != null ) {
				result = parent;
			}
		} catch ( wtfException ) { // Explorer may collapse any day now - especially around here
			this.logger.error ( "Binding#getMigrationParent exception" );
			SystemDebug.stack ( arguments );
			result = null;
		}
	}
	return result;
}

/**
 * @param {Binding} binding
 * @return {Binding}
 */
Binding.prototype.add = function ( binding ) {

	if ( binding.bindingDocument == this.bindingDocument ) {
		this.bindingElement.appendChild (
			binding.bindingElement
		);
	} else {
		throw "Could not add " + binding.toString () + " of different document origin.";
	}
	return binding;
}

/**
 * @param {Binding} binding
 * @return {Binding}
 */
Binding.prototype.addFirst = function ( binding ) {

	if ( binding.bindingDocument == this.bindingDocument ) {
		this.bindingElement.insertBefore (
			binding.bindingElement,
			this.bindingElement.firstChild
		);
	} else {
		throw "Could not add " + binding.toString () + " of different document origin.";
	}
	return binding;
}

/**
 * Get ancestor binding by nodename.
 * @param {boolean} isTraverse If set to true, crossing iframe boundaries.
 * @return {Binding}
 */
Binding.prototype.getAncestorBindingByLocalName = function ( nodeName, isTraverse ) {

	return BindingFinder.getAncestorBindingByLocalName ( this, nodeName, isTraverse );
}

/**
 * Get ancestor binding by implementation type.
 * @param {Class} impl
 * @param {boolean} isTraverse If set to true, crossing iframe boundaries.
 * @return {Binding}
 */
Binding.prototype.getAncestorBindingByType = function ( impl, isTraverse ) {

	return BindingFinder.getAncestorBindingByType ( this, impl, isTraverse );
}

/**
 * Get first child binding of a specified type.
 * @param {Class} impl
 * @return {Binding}
 */
Binding.prototype.getChildBindingByType = function ( impl ) {

	return BindingFinder.getChildBindingByType ( this, impl );
}

/**
 * Get child elements by localname.
 * @param {string} nodeName
 * @return {List<DOMElement>}
 */
Binding.prototype.getChildElementsByLocalName = function ( nodeName ) {

	return BindingFinder.getChildElementsByLocalName ( this, nodeName );
}
/**
 * Get first child element by localname.
 * @param {string} nodeName
 * @return {DOMElement}
 */
Binding.prototype.getChildElementByLocalName = function ( nodeName ) {

	return this.getChildElementsByLocalName ( nodeName ).getFirst ();
}

/**
 * Get descendant elements by localname.
 * @param {string} nodeName
 * @return {List<Binding>}
 */
Binding.prototype.getDescendantElementsByLocalName = function ( nodeName ) {

	return new List (
		DOMUtil.getElementsByTagName ( this.bindingElement, nodeName )
	);
}

/**
 * Get multiple child bindings by localname.
 * @param {string} nodeName
 * @return {List<Binding>}
 */
Binding.prototype.getChildBindingsByLocalName = function ( nodeName ) {

	return this.getDescendantBindingsByLocalName ( nodeName, true );
}

/**
 * Get first child binding by localname.
 * @param {string} nodeName
 * @return {Binding}
 */
Binding.prototype.getChildBindingByLocalName = function ( nodeName ) {

	return this.getChildBindingsByLocalName ( nodeName ).getFirst ();
}

/**
 * Get descendant bindings by localname.
 * @param {string} nodeName
 * @param {boolean} isChildrenOnly If set to true, return only direct children bindings.
 * @return {List<Binding>}
 */
Binding.prototype.getDescendantBindingsByLocalName = function ( nodeName, isChildrenOnly ) {

	return BindingFinder.getDescendantBindingsByLocalName ( this, nodeName, isChildrenOnly );
}

/**
 * Get first descendant binding by localname.
 * TODO: optimize for speed by not collecting all first?
 * @param {string} nodeName
 * @return {Binding}
 */
Binding.prototype.getDescendantBindingByLocalName = function ( nodeName ) {

	return this.getDescendantBindingsByLocalName ( nodeName, false ).getFirst ();
}

/**
 * Get ALL descendant binding of a specified type.
 * @param {Class} impl
 * @return {List<Binding>}
 */
Binding.prototype.getDescendantBindingsByType = function ( impl, isTraverse ) {

	return BindingFinder.getDescendantBindingsByType ( this, impl, isTraverse );
}

/**
 * Get FIRST descendant binding of a specified type.
 * @param {Class} impl
 * @return {Binding}
 */
Binding.prototype.getDescendantBindingByType = function ( impl ) {

	return BindingFinder.getDescendantBindingByType ( this, impl );
}

/**
 * Get next binding by localname.
 * @param {string} nodeName
 * @return {Binding}
 */
Binding.prototype.getNextBindingByLocalName = function ( nodeName ) {

	return BindingFinder.getNextBindingByLocalName ( this, nodeName );
};

/**
 * Get next binding by localname.
 * @param {string} nodeName
 * @return {Binding}
 */
Binding.prototype.getPreviousBindingByLocalName = function ( nodeName ) {

	return BindingFinder.getPreviousBindingByLocalName ( this, nodeName );
};

/**
 * Because of a seriously weird bug in Explorer, this may be
 * the preferred way to obtain a handle on the bound element.
 * @return {DOMElement}
 */
Binding.prototype.getBindingElement = function () {

	return this.bindingDocument.getElementById ( this.bindingElement.id );
}

/**
 * Get the ordinal position of a Binding within it's container (skipping textnodes).
 * @param {DOMElement} element
 * @param {boolean} isSimilar If set to true, count only similar bindings.
 * @return {int}
 */
Binding.prototype.getOrdinalPosition = function ( isSimilar ) {

	return DOMUtil.getOrdinalPosition ( this.bindingElement, isSimilar );
}

/**
 * Is first child of container?
 * @param {boolean} isSimilar If set to true, count only similar bindings.
 * @return {boolean}
 */
Binding.prototype.isFirstBinding = function ( isSimilar ) {

	return ( this.getOrdinalPosition ( isSimilar ) == 0 );
}

/**
 * Is last child of container?
 * @param {boolean} isSimilar If set to true, count only similar bindings.
 * @return {boolean}
 */
Binding.prototype.isLastBinding = function ( isSimilar ) {

	return DOMUtil.isLastElement ( this.bindingElement, isSimilar );
}

/**
 * Has callback ID? If true, the server is probably watching this Binding.
 * @return {boolean}
 */
Binding.prototype.hasCallBackID = function () {

	return this.getProperty ( Binding.CALLBACKID ) != null;
}

/**
 * Get callback ID. On server postback, this will be transmitted as parameter __EVENTTARGET.
 * @return {String}
 */
Binding.prototype.getCallBackID = function () {

	return this.getProperty ( Binding.CALLBACKID );
}

/**
 * Set callback ID.
 * @param {String} id
 */
Binding.prototype.setCallBackID = function ( id ) {

	this.setProperty ( Binding.CALLBACKID, id );
}

/**
 * Has callback argument?
 * @return {boolean}
 */
Binding.prototype.hasCallBackArg = function () {

	return this.getCallBackArg () != null;
}

/**
 * Get callback argument. On server postback, this will be transmitted as parameter __EVENTARGUMENT.
 * @return {String}
 */
Binding.prototype.getCallBackArg = function () {

	return this.getProperty ( Binding.CALLBACKARG );
}

/**
 * Set callback argument.
 * @param {String} argument
 */
Binding.prototype.setCallBackArg = function ( string ) {

	this.setProperty ( Binding.CALLBACKARG, string );
}

/**
 * Removes the bindingElement from stage and nulls all Binding properties,
 * freeing delicious memory. Recursively destroys bindings withind DOM subtree.
 * @param {boolean} isDerivedDisposal
 */
Binding.prototype.dispose = function ( isDerivedDisposal ) {

	if ( !this.isDisposed ) {

		if ( !isDerivedDisposal ) {

			/*
			 * Destroy Binding objects recursively, starting from
			 * the deepest position in descendant DOM structure.
			 * The DocumentManager will invoke this method again,
			 * this time with the method argument set to true.
			 */
			this.bindingWindow.DocumentManager.detachBindings ( this.bindingElement );

			/*
			 * If this is the first Binding being disposed, remove bindingElement from DOM.
			 * We need to use getElementById here because explorer gets it fugged.
			 */
			var bindingElement = this.bindingDocument.getElementById ( this.bindingElement.id );
			if ( bindingElement ) {
				if ( Client.isExplorer ) {
					bindingElement.outerHTML = ""; // removeChild will memoryleak explorer (!)
				} else {
					bindingElement.parentNode.removeChild ( bindingElement );
				}
			}

		} else {

			/*
			 * Unregister EventBroadcaster subscriptions.
			 */
			if ( this._subscriptions.hasEntries ()) {
				var self = this;
				var list = new List ();
				this._subscriptions.each ( function ( broadcast ) {
					list.add ( broadcast );
				});
				list.each ( function ( broadcast ) {
					self.unsubscribe ( broadcast );
				});
			}

			/*
			 * Note that even on the first disposed binding, the DocumentManager re-invokes
			 * this method with an argument value of true, triggering the onBindingDispose.
			 */
			this.onBindingDispose ();

			/*
			 * This will attempt to kill the binding for good.
			 * Currently, though, it doesn't release memory!
			 */
			UserInterface.unRegisterBinding ( this );
		}
	}

	// Note that the property "isDisposed" is finally set
	// to true around the static method Binding.destroy...
}

/**
 * Place your cleanup code around here.
 */
Binding.prototype.onBindingDispose = function () {

	/**
	 * Cleanup activation awareness.
	 */
	if ( this._hasActivationAwareness ) {
		var root = UserInterface.getBinding ( this.bindingDocument.body );
		root.makeActivationAware ( this, false );
		this._hasActivationAwareness = false;
	}

	/**
	 * Delete from window scope bindingMap.
	 */
	this._updateBindingMap ( false );
}

/**
 * Enable dragging.
 */
Binding.prototype.enableDragging = function () {

	if ( this.dragger == null ) {
		this.dragger = new BindingDragger ( this );
		this.addEventListener ( DOMEvents.MOUSEDOWN, this.dragger );
		this.addEventListener ( DOMEvents.MOUSEMOVE, this.dragger );
		this.addEventListener ( DOMEvents.MOUSEUP, this.dragger );
	}
	this.isDraggable = true;
}

/**
 * Disable dragging.
 */
Binding.prototype.disableDragging = function () {

	if ( this.dragger != null ) {
		this.removeEventListener ( DOMEvents.MOUSEDOWN, this.dragger );
		this.removeEventListener ( DOMEvents.MOUSEMOVE, this.dragger );
		this.removeEventListener ( DOMEvents.MOUSEUP, this.dragger );
		this.dragger.dispose ();
		this.dragger = null;
	}
	this.isDraggable = false;
}

/**
 * Show.
 */
Binding.prototype.show = function () {

	if ( !this.isVisible ) {
		this.bindingElement.style.display = "block";
		this.setProperty ( "hidden", true );
		this.isVisible = true;
	}
}

/**
 * Hide.
 */
Binding.prototype.hide = function () {

	if ( this.isVisible == true ) {
		this.bindingElement.style.display = "none";
		this.deleteProperty ( "hidden" );
		this.isVisible = false;
	}
}

/**
 * Wake up lazy binding (and perform the action provided as argument).
 * @param @optional {string|function} action The action to take when awoke.
 */
Binding.prototype.wakeUp = function ( action, timeout ) {

	timeout = timeout ? timeout : Binding.SNOOZE;

	if ( this.isLazy == true ) {

		this.deleteProperty ( "lazy" );
		this.isLazy = false;
		Application.lock ( this );

		/*
		 * Force new indexation of focusable elements.
		 */
		this.dispatchAction ( FocusBinding.ACTION_UPDATE );

		/*
		 * Timeout fixes freezing sensation.
		 */
		var self = this;
		setTimeout ( function () {
			self.attachRecursive ();
			setTimeout ( function () {
				if ( typeof action === 'string' ) {
					self [ action ] ();
				} else if (typeof action === 'function') {
					action();
				}
				// Update any related LazyBindingDataBinding so that the server knows we are awake.
				LazyBindingBinding.wakeUp ( self );
				Application.unlock ( self );
				/*
				setTimeout ( function () {
					Application.focused ( true );
				},  Application._TIMEOUT_LOSTFOCUS * 2 );
				*/
			}, timeout ); // explorer cannot flex unless we timeout here - look into this!
		}, 0 );
	}
}

/**
 * Handle crawler.
 * @implements {ICrawlerHandler}
 * @param {Crawler} crawler
 */
Binding.prototype.handleCrawler = function ( crawler ) {

	/*
	 * Lazy bindings will accept the DocumentCrawler
	 * for purposes of binding registration only.
	 */
	if ( crawler.response == null && this.isLazy == true ) {
		if ( crawler.id == DocumentCrawler.ID && crawler.mode == DocumentCrawler.MODE_REGISTER ) {
			crawler.response = NodeCrawler.NORMAL;
		} else {
			crawler.response = NodeCrawler.SKIP_CHILDREN;
		}
	}

	/*
	 * Search binding crawler filters.
	 */
	if ( crawler.response == null && this.crawlerFilters != null ) {
		if ( this.crawlerFilters.has ( crawler.id )) {
			crawler.response = NodeCrawler.SKIP_CHILDREN;
		}
	}

	/*
	 * These common crawlers should no iterate into hidden bindings.
	 */
	if ( crawler.response == null ) {
		switch ( crawler.id ) {
			case FlexBoxCrawler.ID :
			case FocusCrawler.ID :
				if ( !this.isVisible ) {
					crawler.response = NodeCrawler.SKIP_CHILDREN;
				}
				break;
		}
	}
}

/**
 * Binding factory.
 * @param {DOMDocument} ownerDocument
 * @return {Binding}
 */
Binding.newInstance = function ( ownerDocument ) {

	var element = DOMUtil.createElementNS ( Constants.NS_UI, "ui:binding", ownerDocument );
	return UserInterface.registerBinding ( element, Binding );
}
