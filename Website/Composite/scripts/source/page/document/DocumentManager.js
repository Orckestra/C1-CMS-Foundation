/**
 * Accessed through instance variable "DocumentManager" declared below.
 */
function _DocumentManager () {
	
	this._construct ();
}

_DocumentManager.prototype = {
	
	_logger	: SystemLogger.getLogger ( "DocumentManager [" + document.title + "]" ),
	_maxIndex : -1, // MOVE THIS!
	
	/**
	 * Exposes special binding associations for the {@link UserInterface}.
	 * @type {UserInterfaceMapping} 
	 */
	customUserInterfaceMapping : null,
	
	/**
	 * Determines whether or not document text is selectable.
	 * @type {boolean}
	 */
	isDocumentSelectable : false,
	
	/**
	 * Determines whether or not to display the browsers own contextmenu on rightclick.
	 * Note that the contextmenu will *not* be disabled for textareas and inputfields.
	 * @type {boolean}
	 */
	hasNativeContextMenu : false,
	
	/**
	 * Constructor action.
	 */
	_construct : function () {
	
		/*
		 * Setup standard framework event listeners.
		 * Intercepting mousedown, mousemov, mouseup, keydown, keyup.
		 */
		Application.framework ( document );
		
		/*
		 * Initializing when window is fully loaded.
		 * 1) Setup textcontent selection.
		 * 2) Setup contextmenu handling
		 * 3) Resolve custom bindings
		 * 4) Resolve lazy bindings
		 * 5) Attach bindings.
		 */
		EventBroadcaster.subscribe ( WindowManager.WINDOW_LOADED_BROADCAST, this );
		
		/*
		 * For explorer, disable audible clicks when navigating dummy hypertext links.
		 */
		if ( Client.isExplorer ) {
			DOMEvents.addEventListener ( document, DOMEvents.CLICK, this );
		}
		
	},
	
	/**
	 * @implements {IBroadcastListener}
	 * @param {String} broadcast
	 * @param {Object} arg
	 */
	handleBroadcast : function ( broadcast, arg ) {
		
		if ( !this.isDocumentSelectable ) {
			this._makeDocumentUnselectable ();
		}
		if ( !this.hasNativeContextMenu ) {
			DOMEvents.addEventListener ( document, DOMEvents.CONTEXTMENU, this );
		}
		if ( !Application.isMalFunctional ) {
			this._resolveCustomBindingMappings ();
			this.attachBindings ( document.documentElement);
		}
	},
	
	/**
	 * @implements {IEventListener}
	 * @param {Event} e
	 */
	handleEvent : function ( e ) {
		
		var target = DOMEvents.getTarget ( e );
		
		switch ( e.type ) {
				
			case DOMEvents.SELECTSTART :
			case DOMEvents.CONTEXTMENU :
				if ( !this._isTextInputElement ( target )) {
					DOMEvents.preventDefault ( e );
				}
				break;

			case DOMEvents.CLICK :
				if ( Client.isExplorer ) {
					if ( target != null ) {
						if ( target.href != null && target.href.indexOf ( Constants.DUMMY_LINK ) >-1 ) {
							DOMEvents.preventDefault ( e );
						}
					}
				}
				break;
		}
	},
	
	
	/** 
	 * Resolve custom bindingmappings scoped for this window. 
	 * This is done here, not in a ordinary Binding, because 
	 * we need this stuff to be evaluated max pronto up front.
	 */
	_resolveCustomBindingMappings : function () {
		
		var bindingset = DOMUtil.getElementsByTagName ( document.documentElement, "bindingmappingset" ).item ( 0 );
		if ( bindingset != null ) {
			var map = {};
			var mappings = DOMUtil.getElementsByTagName ( bindingset, "bindingmapping" );
			new List ( mappings ).each (
				function ( mapping ) {
					var element = mapping.getAttribute ( "element" );
					var binding = mapping.getAttribute ( "binding" );
					map [ element ] = eval ( binding );
				}
			);
			this.setCustomUserInterfaceMapping (
				new UserInterfaceMapping ( map )
			);
		}
	},
	
	/**
	 * Register custom bindingmapping. This will merge with any previously registerd mapping.
	 * @param {UserInterfaceMapping} mapping
	 */
	setCustomUserInterfaceMapping : function ( mapping ) {
		
		if ( this.customUserInterfaceMapping == null ) {
			this.customUserInterfaceMapping = mapping;
		} else {
			this.customUserInterfaceMapping.merge ( mapping );
		}
	},
	
	/**
	 * Register bindings on and within a given container.
	 * @param {DOMElement} element
	 */
	_registerBindings : function ( element ) {
		
		var crawler = new DocumentCrawler ();
		crawler.mode = DocumentCrawler.MODE_REGISTER;
		crawler.crawl ( element );
		crawler.dispose ();
	},
	
	/**
	 * Attach bindings on and within a given container.
	 * @param {DOMElement} container
	 */
	_attachBindings : function ( container ) {
		
		var crawler = new DocumentCrawler ();
		crawler.mode = DocumentCrawler.MODE_ATTACH;
		
		var list = new List ();
		crawler.crawl ( container, list );
		
		/*
		 * Because bindings may modify DOM structure upon 
		 * attachment (confusing the crawler), we collect them 
		 * all in a list before we invoke the onBindingAttach.
		 */
		var wasDataBinding = false;
		while ( list.hasNext ()) {
			var binding = list.getNext ();
			if ( !binding.isAttached ) {
				binding.onBindingAttach ();
				if ( !binding.memberDependencies ) {
					binding.onBindingInitialize ();
				}
				if ( Interfaces.isImplemented ( IData, binding )) {
					wasDataBinding = true;
				}
			}
		}
		
		/*
		 * TODO: NOT ON DISPOSE PAGE!
		 * Update the focus list. Technically, the binding itself 
		 * should dispatch this (root may be located to high in the tree), 
		 * but this will stress up on bulk attachment via UpdateManager.  
		 */
		if ( wasDataBinding ) {
			var root = UserInterface.getBinding ( document.body );
			if ( root != null ) {
				setTimeout ( function () {
					if ( Binding.exists ( root )) {
						root.dispatchAction ( FocusBinding.ACTION_UPDATE );
					}
				}, 250 );
			}
		}
		
		crawler.dispose ();
		list.dispose ();
	},

	/** 
	 * Attach bindings on and within a given element.
	 * @param {DOMElement} element
	 * @param {boolean} isTiming
	 */
	attachBindings : function ( element ) {
		
		this._registerBindings ( element );
		this._attachBindings ( element );
	},

	/** 
	 * Detach bindings within and on a given element.
	 * @param {DOMElement} element
	 * @param {boolean} isElemnentSafe If true, only element descendants will detach.
	 */
	detachBindings : function ( element, isElementSafe ) {
	
		var crawler = new DocumentCrawler ();
		crawler.mode = DocumentCrawler.MODE_DETACH;
		
		var list = new List ();
		crawler.crawl ( element, list );
		
		/*
		 * Preserve binding on container element?
		 */
		if ( isElementSafe == true ) {
			list.extractFirst ();
		}
		
		/*
		 * Reverse collection, disposing bindings from deepest position in DOM tree.
		 * This way, bindings will still have access to parent bindings when disposed. 
		 * Please not that we only nuke the Binding objects here, not the DOMElements, 
		 * as designated by the boolean argument passed to Binding#dispose.
		 */
		var wasDataBinding = false;
		list.reverse ().each ( function ( binding ) {
			if ( Interfaces.isImplemented ( IData, binding )) {
				wasDataBinding = true;
			}
			binding.dispose ( true );
		});
		
		/*
		 * TODO: NOT ON DISPOSE PAGE!
		 * Update the focus list. Technically, the binding itself 
		 * should dispatch this (root may be located to high in the tree), 
		 * but this will stress up on bulk detachment via UpdateManager.  
		 */
		if ( wasDataBinding ) {
			var root = UserInterface.getBinding ( document.body );
			if ( root != null ) {
				setTimeout ( function () {
					if ( Binding.exists ( root )) {
						root.dispatchAction ( FocusBinding.ACTION_UPDATE );
					}
				}, 250 );
			}
		}
		
		/*
		 * Cleanup.
		 */
		crawler.dispose ();
		list.dispose ();
	},
	
	/**
	 * Detach all bindings in document. Invoked when disposing the containing WindowBinding. 
	 * Local instances of WindowBinding will detach their bindings recursively, chain reaction.
	 * @see {WindowBinding#onBindingDispose}
	 */
	detachAllBindings : function () {
		
		this.detachBindings ( document.documentElement);
	},
	
	/**
	 * Scann all z-index values and compute a new, highest value. 
	 * Elements are actually only scanned when first called;
	 * henceforth the value is simply incremented.
	 * TODO: deprecate?
	 * @return {int}
	 */
	computeMaxIndex : function () {
		
		if ( this._maxIndex == -1 ) {
			this._maxIndex = DOMUtil.getMaxIndex ( document );
		}
		return this._maxIndex ++;
	},
	
	/**
	 * Test whether or not an element is an interactive text input field.
	 * TODO: optimize
	 * @param {DOMElement} element
	 * @return {boolean}
	 */
	_isTextInputElement : function ( element ) {
	
		return ( /textarea|input/.test ( 
			DOMUtil.getLocalName ( element )
		));
	},
	
	/*
	 * Prevent non-relevant GUI elements from being selected with the mouse.
	 */
	_makeDocumentUnselectable : function () {
	
		if ( Client.isExplorer ) {
			
			DOMEvents.addEventListener ( document, DOMEvents.SELECTSTART, this );
			
		} else {
			// Ideally, we would say: document.body.style.MozUserSelect = "none";
			// But if we disable user-selection on root element, a bug 
			// prevents descendant nodes from being selected (bug 203291).
			// Instead, all ui:label elements have been made unselectable via CSS.
		}
	}
}

/**
 * The instance that does it.
 * @type {_DocumentManager}
 */
var DocumentManager = new _DocumentManager ();