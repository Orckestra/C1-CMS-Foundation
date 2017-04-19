TabBoxBinding.prototype = new FlexBoxBinding;
TabBoxBinding.prototype.constructor = TabBoxBinding;
TabBoxBinding.superclass = FlexBoxBinding.prototype;

TabBoxBinding.ASSOCIATION_KEY 	= "tabboxkey";

TabBoxBinding.ACTION_ATTACHED	= "tabbox attached";
TabBoxBinding.ACTION_SELECTED 	= "tabbox selected";
TabBoxBinding.ACTION_UNSELECTED = "tabbox unselected";
TabBoxBinding.ACTION_UPDATED 	= "tabbox updated";
TabBoxBinding.UPDATE_ORDINAL	= "tabbox ordinalupdate";
TabBoxBinding.UPDATE_ATTACH		= "tabbox attachupdate";
TabBoxBinding.UPDATE_DETACH		= "tabbox detachupdate";

TabBoxBinding.INVALID_TAB_IMAGE = "${icon:error}";
TabBoxBinding.BALLOON_TAB_IMAGE = "${icon:balloon}";

/**
 * Setup keyboard navigation: Advance tab selection on an inferred current  
 * tabbox by pressing CTRL + TAB and hold SHIFT to travel backwards. 
 * Any tabbox will register as current when: 
 *     The onBindingAttach method is invoked
 *     A descendant binding dispatches Binding.ACTION_ACTIVATED
 *     A descendant binding dispatches Binding.ACTION_FOCUSED 
 */
EventBroadcaster.subscribe ( BroadcastMessages.KEY_TAB, {
	handleBroadcast : function () {
		if ( Keyboard.isControlPressed ) {
			var current = TabBoxBinding.currentActiveInstance;
			if ( current != null && Binding.exists ( current )) {
				/*
				 * Disabled because Firefox may sometimes think that 
				 * the CONTROL key is pressed - when it's not. 
				 * Let's wait a few Firefox versions before enabling...
				 * 
				 * current.advanceSelection ( !Keyboard.isShiftPressed );
				 */
			}
		}
	}
});

/**
 * @type {TabBoxBinding}
 */
TabBoxBinding.currentActiveInstance = null;

/**
 * @class
 * Go get'em tabbox.
 * TODO: Rewrite this oldschool stuff entirely! Subclass DecksBinding.
 */
function TabBoxBinding () {

	/**
	 * @type {SystemLogger}
	 */
	this.logger = SystemLogger.getLogger ( "TabBoxBinding" );

	/**
	 * @type {HashMap}
	 * @private
	 */
	this._tabBoxPairs = {};
	
	/**
	 * @type {DOMElement}
	 * @private
	 */
	this._selectedTabElement = null;
	
	/**
	 * @type {TabBinding}
	 * @private
	 */
	this._selectedTabBinding = null;
	
	/**
	 * @type {DOMElement}
	 */
	this._tabsElement = null;
	
	/**
	 * @type {DOMElement}
	 */
	this._tabPanelsElement = null;
	
	/**
	 * By default counting <tabs> and <tabpanels>.
	 * @type {int}
	 *
	this._totalMemberCount = 2;
	*/
	
	/**
	 * @type {int}
	 */
	this._attachedMemberCount = 0;
	
	/**
	 * @type {boolean}
	 */
	this._isMembersAttached = false;
	
	/**
	 * @type {boolean}
	 */
	this.isEqualSize = false;
	
	/*
	 * Prepare for tabboxes with completely different element names.
	 */
	this._nodename_tab = "tab";
	this._nodename_tabs = "tabs";
	this._nodename_tabpanel = "tabpanel";
	this._nodename_tabpanels = "tabpanels";
	
	/*
	 * Prepare for tabboxes with completely different binding constructors.
	 */
	this._impl_tab = TabBinding;
	this._impl_tabs = TabsBinding;
	this._impl_tabpanel = TabPanelBinding;
	this._impl_tabpanels = TabPanelsBinding;
	
	/*
	 * When the ACTION_UPDATE action is dispatched, 
	 * this property reflects the nature of update.
	 * @type {string}
	 */
	this.updateType = null;
	
	/*
	 * True when tabs or tabpanels was appended 
	 * or remove via UpdateManager updates.
	 * @type {boolean}
	 */
	this._hasBastardUpdates = false;
	
	/*
	 * Returnable.
	 */
	return this;
}

/**
 * Identifies binding.
 */
TabBoxBinding.prototype.toString = function () {

	return "[TabBoxBinding]";
}

/**
 * @overloads {FlexBoxBinding#onBindingRegister}
 */
TabBoxBinding.prototype.onBindingRegister = function () {
	
	TabBoxBinding.superclass.onBindingRegister.call ( this );
	
	this.addActionListener ( Binding.ACTION_ATTACHED );
	this.addActionListener ( Binding.ACTION_DETACHED );
	this.addActionListener ( Binding.ACTION_ACTIVATED );
	this.addActionListener ( Binding.ACTION_FOCUSED );
	this.addActionListener ( PageBinding.ACTION_INITIALIZED );
	
	/*
	 * Intercept tabs and tabpanels appended 
	 * via UpdateManager updates.
	 */
	DOMEvents.addEventListener ( this.bindingDocument.documentElement, DOMEvents.AFTERUPDATE, this );
	DOMEvents.addEventListener ( this.bindingElement, DOMEvents.AFTERUPDATE, this );
}

/**
 * @overloads {Binding#onBindingAttach}
 */
TabBoxBinding.prototype.onBindingAttach = function () {

	TabBoxBinding.superclass.onBindingAttach.call ( this );
	TabBoxBinding.currentActiveInstance = this;
	
	/*
	 * Shorthand <tabs> and <tabpanels>.
	 */
	this._tabsElement = this.getTabsElement ();
	this._tabPanelsElement = this.getTabPanelsElement ();
	
	/*
	 * Count tabbox members.
	 */
	var tabCount = this.getTabElements ().getLength ();
	var tabPanelCount = this.getTabPanelElements ().getLength ();
	//this._totalMemberCount = this._totalMemberCount + tabCount + tabPanelCount;
	
	/*
	 * Initialize.
	 */
	if ( !this._tabsElement || !this._tabPanelsElement ) {
		throw new Error ( this.toString () + " DOM subtree invalid." );
	} else if ( tabCount != tabPanelCount ) {
		throw new Error ( this.toString () + " DOM subtree invalid." );
	} else {
		
		if ( this.getProperty ( "type" ) == "boxed" ) {
			this.setFlexibility ( false );
			this.attachClassName ( "boxed" );
		}
		
		this.buildDOMContent ();
		this._TEMPNAME ();
		
		if ( this.getProperty ( "equalsize" ) == true ) {
			this.dispatchAction ( PageBinding.ACTION_BLOCK_INIT );
			this.setFlexibility ( false );
			this.attachClassName ( "equalsize" );
			this.isEqualSize = true;
			this.addMembers ( this.getDescendantBindingsByLocalName ( "*" ));
		} else {
			this.addMember ( this.getTabsBinding ());
			this.addMember ( this.getTabPanelsBinding ());
			this.addMembers ( this.getTabBindings ());
			this.addMembers ( this.getTabPanelBindings ());
		}
	}
}

/**
 * Go get'em tabbox.
 */
TabBoxBinding.prototype.onBindingInitialize = function () {
	
	/*
	 * Hack up warning system.
	 */
	var tabPanelElements = this.getTabPanelElements ();
	while ( tabPanelElements.hasNext ()) {
		this._setupWarningSystem ( 
			UserInterface.getBinding ( 
				tabPanelElements.getNext ()
			)
		);
	}
	
	/*
	 * TODO: consider when to reinforce equalsize!
	 */
	if ( this.isEqualSize ) {
		this.enforceEqualSize ();
		this.dispatchAction ( PageBinding.ACTION_UNBLOCK_INIT );
	}
	
	this.dispatchAction ( TabBoxBinding.ACTION_ATTACHED );
	
	TabBoxBinding.superclass.onBindingInitialize.call ( this );
}


/**
 * IE6 cannot handle the nescessary css selectors to 
 * style tabs below this without a special classname. 
 * This method fixes it.
 */
TabBoxBinding.prototype.buildDOMContent = function () {
	
	var tabsPosition = DOMUtil.getOrdinalPosition ( this._tabsElement );
	var tabPanelsPosition = DOMUtil.getOrdinalPosition ( this._tabPanelsElement );
	
	var classname = tabsPosition > tabPanelsPosition ? "tabsbelow" : "tabsontop";
	this.attachClassName ( classname );
}

TabBoxBinding.prototype._TEMPNAME = function () {
	
	var tabs = this.getTabElements ();
	var tabpanels = this.getTabPanelElements ();
	var selectedTab = null;
	
	var selectedindex = this.getProperty ( "selectedindex" );
	if ( selectedindex != null ) {
		if ( selectedindex > tabs.getLength () - 1 ) {
			throw "Selectedindex out of range";
		}
	}
	if ( tabs.hasEntries ()) {
		var index = 0;
		while ( tabs.hasNext ()) {
			var tab = tabs.getNext ();
			var tabpanel = tabpanels.getNext ();
			this.registerTabBoxPair ( tab, tabpanel );
			if ( selectedindex && index == selectedindex ) {
				tab.setAttribute ( "selected", "true" );
			} else if ( tab.getAttribute ( "selected" ) == "true" ) {
				selectedTab = tab;	
			}
			index ++;
		}
		if ( !selectedTab ) {
			selectedTab = tabs.getFirst ();
			selectedTab.setAttribute ( "selected", "true" );
		}
	}
}

/**
 * Scale tabpanels to fit tallest contained tabpanel.
 * @param {boolean} isMaxingOut If set to true, tabbox can only grow taller.
 */
TabBoxBinding.prototype.enforceEqualSize = function ( isMaxingOut ) {
	
	var oldheight = null;
	var newheight = null;
	
	if ( this.isEqualSize ) {
		
		var padding = CSSComputer.getPadding ( this._tabPanelsElement );
		var max = 0, tabPanels = this.getTabPanelElements ();
		tabPanels.each ( function ( tabPanel ) {
			max = tabPanel.offsetHeight > max ? tabPanel.offsetHeight : max; 
		});
		newheight = max + padding.top + padding.bottom;
		if ( isMaxingOut && this._tabPanelsElement.style.height != null ) {
			oldheight = this._tabPanelsElement.offsetHeight;
		}
		if ( oldheight != null || newheight > oldheight ) {
			this._tabPanelsElement.style.height = newheight + "px";
		}
	}
}

/**
 * A somewhat hacked system for the tabs to display notifications 
 * when errors or balloons explode inside the associated tabpanel.
 * @param {TabPanelBinding} tabpanel
 */
TabBoxBinding.prototype._setupWarningSystem = function ( tabpanel ) {
	
	tabpanel._invalidCount = 0;
	tabpanel.addActionListener ( Binding.ACTION_INVALID, this );
	tabpanel.addActionListener ( Binding.ACTION_VALID, this );
	tabpanel.addActionListener ( BalloonBinding.ACTION_SNAP, this );
}

/**
 * Elaborate setup to make sure that tabbox members are properly initialized 
 * before the tabbox can announce to the outside world that is is ready to go.
 * TODO: DEPRECATE THIS SPECIALIZED SETUP IN FAVOUR OF STANDARD MEMBER DEPENDENCY!!! 
 * @implements {IActionListener}
 * @overloads {FlexBoxBinding#handleAction}
 * @param {Action} action 
 */
TabBoxBinding.prototype.handleAction = function ( action ) {
	
	TabBoxBinding.superclass.handleAction.call ( this, action );
	
	var binding = action.target;
	var listener = action.listener;
	
	switch ( action.type ) {
	
		case Binding.ACTION_ATTACHED :
			
			/*
			if ( !this._isMembersAttached ) {
				switch ( binding.constructor ) {
					case this._impl_tab :
					case this._impl_tabs :
					case this._impl_tabpanel :
					case this._impl_tabpanels :
						if ( ++ this._attachedMemberCount == this._totalMemberCount ) {
							this._isMembersAttached = true;
							this.onMembersAttached ();
						}
						action.consume ();	
						break;
				}
			}
			*/
			break;
			
		case Binding.ACTION_DETACHED :
			if ( binding.constructor == this._impl_tab ) {
				this.updateType = TabBoxBinding.UPDATE_DETACH;
				this.dispatchAction ( TabBoxBinding.ACTION_UPDATED );
				action.consume ();	
			}
			break;
		
		case PageBinding.ACTION_INITIALIZED :
			if ( binding.isDialogSubPage && this.isEqualSize ) {	
				this.enforceEqualSize ();
			}
			break;
			
		case Binding.ACTION_INVALID :
			listener._invalidCount ++;
			if ( listener._invalidCount == 1 ) {
				var self = this;
				setTimeout ( function () {
					if ( !listener.isSelected ) {
						self._showWarning ( listener, true );
					}
				}, 0 );
			}
			break;
			
		case Binding.ACTION_VALID :
			if ( listener._invalidCount > 0 ) {
				listener._invalidCount --;
				if ( listener._invalidCount == 0 ) {
					if ( listener.isSelected ) {
						this._showWarning ( listener, false ); 
					}
				}
			}
			break;
			
		case BalloonBinding.ACTION_SNAP :
			this._showBalloon ( listener, true );
			break;
			
		case Binding.ACTION_ACTIVATED :
		case Binding.ACTION_FOCUSED :
			if ( action._tabboxstamp == null ) {
				TabBoxBinding.currentActiveInstance = this;
				action._tabboxstamp = "stamped";
			}
			break;
	}
}

/**
 * Register tabs and tabpanels appended via UpdateManager updates.
 * @implements {IEventHandler}
 * @overloads {Binding#handleEvent}
 * @param {Event} e
 */
TabBoxBinding.prototype.handleEvent = function ( e ) {
	
	TabBoxBinding.superclass.handleEvent.call ( this, e );
	
	switch ( e.type ) {
		case DOMEvents.AFTERUPDATE :
			
			var target = DOMEvents.getTarget ( e );
			
			if ( target == this.bindingDocument.documentElement ) {
				
				// TODO: Check for validity of structure
				
				if ( this._hasBastardUpdates ) {
					
					this._hasBastardUpdates = false;
					
					// welcome new tabs
					var tabs = this.getTabElements ();
					var tabpanels = this.getTabPanelElements ();
					tabs.each ( function ( tab, index ) {
						if ( tab.getAttribute ( TabBoxBinding.ASSOCIATION_KEY ) == null ) {
							var tabPanel = tabpanels.get ( index );
							this.registerTabBoxPair ( tab, tabPanel );
						}
					}, this );
					
					// dismiss gone tabs
					var pairs = this._tabBoxPairs;
					for ( var key in pairs ) {
						var tab = pairs [ key ].tab;
						if ( tab.parentNode == null ) {
							this.unRegisterTabBoxPair ( tab )
						}
					}
				}
			} else {
				
				// TODO: Investigate double updates
				
				if ( !this._hasBastardUpdates ) {
					var name = DOMUtil.getLocalName ( target );
					switch ( target.__updateType ) {
						case Update.TYPE_INSERT :
							switch ( name ) {
								case this._nodename_tab :
								case this._nodename_tabpanel :
									var parent = target.parentNode;
									if ( parent == this._tabsElement || parent == this._tabPanelsElement ) {
										this._hasBastardUpdates = true;
									}
									break;
							}
							break;
						case Update.TYPE_REMOVE :
							switch ( name ) {
								case this._nodename_tabs :
								case this._nodename_tabpanels :
									if ( target == this._tabsElement || target == this._tabPanelsElement ) {
										this._hasBastardUpdates = true;
									}
									break;
							}
							break;
					}
				}
			}
			break;
	}
}

/**
 * Select tab by argument.
 * @param {object} arg This should be a string (tab id) or a TabBinding instance.
 * @param {boolean} isManaged If set to true, application focus will not be updated.
 */
TabBoxBinding.prototype.select = function ( arg, isManaged ) {
	
	var tabBinding = this.getBindingForArgument ( arg ); 
	
	if ( tabBinding != null && !tabBinding.isSelected ) {
		
		/*
		 * Deselect old selection.
		 */
		if ( this._selectedTabBinding != null ) {	
			this._selectedTabBinding.unselect ();
			this.getTabPanelBinding ( this._selectedTabBinding ).unselect ();
		}
		
		this.dispatchAction ( TabBoxBinding.ACTION_UNSELECTED );
		
		/*
		 * Show selected tab-tabpanel set.
		 */
		tabBinding.select ( isManaged );
		this.getTabPanelBinding ( tabBinding ).select ( isManaged );
		
		/*
		 * Update selectedIndex property.
		 */
		var selectedindex = this.getProperty ( "selectedindex" );
		if ( selectedindex != null ) {
			this.setProperty ( 
				"selectedindex", 
				DOMUtil.getOrdinalPosition ( tabBinding.bindingElement, true )
			);
		}
		
		this._selectedTabBinding = tabBinding;
		this.dispatchAction ( TabBoxBinding.ACTION_SELECTED );
		this.dispatchAction ( FocusBinding.ACTION_UPDATE );
		 
		/*
		 * Error and balloon stuff.
		 */
		if ( tabBinding.getImage () == TabBoxBinding.BALLOON_TAB_IMAGE ) {
			var panel = this.getTabPanelBinding ( tabBinding );
			this._showBalloon ( panel, false );
		}
	}
}

/**
 * Building unique keys for each TabBinding and corresponding TabPanelBinding.
 * @param {DOMElement} tab
 * @param {DOMElement} tabPanel
 * @private
 */
TabBoxBinding.prototype.registerTabBoxPair = function ( tab, tabPanel ) {
	
	var key = KeyMaster.getUniqueKey ();

	tab.setAttribute ( TabBoxBinding.ASSOCIATION_KEY, key );
	tabPanel.setAttribute ( TabBoxBinding.ASSOCIATION_KEY, key );
	
	this._tabBoxPairs [ key ] = {
		tab : tab,
		tabPanel : tabPanel
	}
}

/**
 * Unregister tab and associated tabpanel.
 * @param {DOMElement} tab
 */
TabBoxBinding.prototype.unRegisterTabBoxPair = function ( tab ) {
	
	var key = tab.getAttribute ( TabBoxBinding.ASSOCIATION_KEY );
	delete this._tabBoxPairs [ key ];
}

/**
 * Get the TabPanelBinding associated to a given TabBinding.
 * @param {TabBinding} tabBinding
 * @return {TabPanelBinding}
 * @private
 */
TabBoxBinding.prototype.getTabPanelBinding = function ( tabBinding ) {
	
	var result = null;
	try {
		var key = tabBinding.getProperty ( TabBoxBinding.ASSOCIATION_KEY );
		var tabPanelElement = this._tabBoxPairs [ key ].tabPanel;
		result = UserInterface.getBinding ( tabPanelElement );
	} catch ( exception ) {
		this.logger.error ( exception );
		SystemDebug.stack ( arguments )
	}
	return result;
}

/**
 * Get the TabBinding associated to a given TabPanelBinding.
 * @param {TabPanelBinding} tabPanelBinding
 * @return {TabBinding}
 * @private
 */
TabBoxBinding.prototype.getTabBinding = function ( tabPanelBinding ) {

	var key = tabPanelBinding.getProperty ( TabBoxBinding.ASSOCIATION_KEY );
	var tabElement = this._tabBoxPairs [ key ].tab;
	return UserInterface.getBinding ( tabElement );
}


/** 
 * Creates a new TabBinding instance. By isolating 
 * the method, subclasses can overwrite it.
 * @return {TabBinding}
 */
TabBoxBinding.prototype.summonTabBinding = function () {
	
	return TabBinding.newInstance ( this.bindingDocument );
}

/**
 * Creates a new TabPanelBinding instance.
 * @return {TabPanelBinding}
 */
TabBoxBinding.prototype.summonTabPanelBinding = function () {
	
	var tabpanel = this._impl_tabpanel.newInstance ( this.bindingDocument );
	this._setupWarningSystem ( tabpanel );
	return tabpanel;
}

/**
 * This is the easy way to append a new tab: With a tab label and a nodetree to 
 * be used as tabpanel content. When going from zero to one tab, the first tab is 
 * selected. You can also use the appendTabByBindings method.
 * @see TabBoxBinding#appendTabByBindings
 * @param {string} label
 * @param {DOMElement} tabPanelSubTree
 * @return {TabBinding}
 *
TabBoxBinding.prototype.appendTab = function ( label, tabPanelSubTree ) {
	
	alert ( "TabBoxBinding.appendTab: Refactor!" );
	
	// build tab, autoselecting first tab.
	var tabBinding = this.summonTabBinding ();
	var tabElement = tabBinding.bindingElement;
	tabBinding.setLabel ( label );
	if ( !this.getTabElements ().hasEntries ()) {
		tabBinding.setProperty ( "selected", true );
	}
	
	// build tabpanel.
	var tabPanelBinding = this.summonTabPanelBinding ();
	var tabPanelElement = tabPanelBinding.bindingElement;
	if ( tabPanelSubTree ) { 
		tabPanelElement.appendChild ( tabPanelSubTree );
	}
		
	// register and append.
	this.registerTabBoxPair ( tabElement, tabPanelElement );
	this._tabsElement.appendChild ( tabElement );
	this._tabPanelsElement.appendChild ( tabPanelElement );
	
	// dispatch action and return tab binding.
	this.updateType = TabBoxBinding.UPDATE_ATTACH;
	this.dispatchAction ( TabBoxBinding.ACTION_UPDATED );
	return tabBinding;
}
*/

/**
 * Append new tab with a {@link TabBinding} instance and an object to be used as 
 * tabpanel content. When going from zero to one tab, the first tab is selected. 
 * @param {TabBinding} tabBinding
 * @param {object} tabPanelContent This can be either a Binding or a DOMElement
 */
TabBoxBinding.prototype.appendTabByBindings = function ( tabBinding, tabPanelContent ) {
	
	// prepare tab, autoselecting first tab.
	var tabElement = tabBinding.bindingElement;
	tabBinding.setProperty ( "selected", true );
	
	// build tabpanel.
	var tabPanelBinding = this.summonTabPanelBinding ();
	var tabPanelElement = tabPanelBinding.bindingElement;
	if ( tabPanelContent ) { 
		tabPanelElement.appendChild ( 
			tabPanelContent instanceof Binding ? 
			tabPanelContent.bindingElement : tabPanelContent 
		);
	}

	// register, append and attach
	this.registerTabBoxPair ( tabElement, tabPanelElement );
	
	//this._tabsElement.appendChild ( tabElement );
	UserInterface.getBinding ( this._tabsElement ).add ( tabBinding );
	this._tabPanelsElement.appendChild ( tabPanelElement );
	
	tabBinding.attach ();
	UserInterface.getBinding ( tabPanelElement ).attachRecursive ();
	
	// dispatch action and return tab binding.
	this.updateType = TabBoxBinding.UPDATE_ATTACH;
	this.dispatchAction ( TabBoxBinding.ACTION_UPDATED );
	return tabBinding;
}

/**
 * Import tab.
 * @param {TabBinding} tabBinding
 */
TabBoxBinding.prototype.importTabBinding = function ( tabBinding ) {
	
	var that			= tabBinding.containingTabBoxBinding;
	var tabPanelBinding = that.getTabPanelBinding ( tabBinding );
	var tabPanelElement = tabPanelBinding.getBindingElement ();
	var tabElement 		= tabBinding.getBindingElement ();
	
	that.dismissTabBinding ( tabBinding );
	
	this._tabsElement.appendChild ( tabElement );
	this._tabPanelsElement.appendChild ( tabPanelElement );
	this.registerTabBoxPair ( tabElement, tabPanelElement );
	
	tabBinding.containingTabBoxBinding = this;
	
	this.select ( tabBinding );
	this.dispatchAction ( Binding.ACTION_ACTIVATED );
	this.dispatchAction ( TabBoxBinding.ACTION_UPDATED );
}

/**
 * Remove tab - and the associated tabpanel!
 * @param {TabBinding} tabBinding
 */
TabBoxBinding.prototype.removeTab = function ( tabBinding ) {

	var bestTab = null; 
	if ( tabBinding.isSelected ) {
		bestTab = this.getBestTab ( tabBinding );
		this._selectedTabBinding = null;
	}
	
	var tabPanelBinding = this.getTabPanelBinding ( tabBinding );
	this.unRegisterTabBoxPair ( tabBinding.bindingElement );

	tabBinding.dispose ();
	tabPanelBinding.dispose ();
	
	if ( bestTab != null ){
		this.select ( bestTab, true);
	}
	
	this.updateType = TabBoxBinding.UPDATE_DETACH;
	this.dispatchAction ( TabBoxBinding.ACTION_UPDATED );

	this.deActivate();
}

/**
 * @param {TabBinding} tabBinding
 */ 
TabBoxBinding.prototype.dismissTabBinding = function ( tabBinding ) {

	if ( tabBinding.isSelected ) {
		this.selectBestTab ( tabBinding );
	}
}

/**
 * @param {TabBinding} missingTabBinding This binding IS ABOUT to be disposed...
 */
TabBoxBinding.prototype.selectBestTab = function ( missingTabBinding ) {
	
	var bestTab = this.getBestTab ( missingTabBinding );
	
	if ( bestTab ) {
	 	this.select ( bestTab );
	} else {
		this._selectedTabBinding = null;
	}
}

/**
 * @param {TabBinding} missingTabBinding This binding IS ABOUT to be disposed...
 */
TabBoxBinding.prototype.getBestTab = function ( missingTabBinding ) {

	var bestTabBinding 	= null;
	var tabPosition 	= missingTabBinding.getOrdinalPosition ( true );
	var tabBindings 	= this.getTabBindings ();
	var tabsLength 		= tabBindings.getLength ();
	var lastPosition 	= tabsLength - 1;

	if ( tabsLength == 1 ) { // first tab
	 	bestTabBinding 	= null;
	} else if ( tabPosition == lastPosition ) { // last tab
		bestTabBinding = tabBindings.get ( tabPosition - 1 );
	} else {
		bestTabBinding = tabBindings.get ( tabPosition + 1 );
	}
	return bestTabBinding;
}

/**
 * Move tab and corresponding tabpanel to specified position.
 * @param {TabBinding}
 * @param {int} index
 */
TabBoxBinding.prototype.moveToOrdinalPosition = function ( tabBinding, index ) {
	
	var target = this.bindingDocument.getElementById ( tabBinding.bindingElement.id ); // ie!
	var tab = this.getTabElements().get(index);
	while (tab && tab.getAttribute("pinned") === "true") {
		tab = this.getTabElements().get(++index);
	}
	if (tab) {
		this._tabsElement.insertBefore(target, tab);
	}
	this.updateType = TabBoxBinding.UPDATE_ORDINAL;
	this.dispatchAction ( TabBoxBinding.ACTION_UPDATED );
}

/**
 * Get tabs element.
 * @return {DOMElement}
 */
TabBoxBinding.prototype.getTabsElement = function () {

	return DOMUtil.getElementsByTagName ( 
		this.bindingElement, 
		this._nodename_tabs 
	).item ( 0 );
}

/**
 * Get tabpanels element.
 * @return {DOMElement}
 */
TabBoxBinding.prototype.getTabPanelsElement = function () {

	return DOMUtil.getElementsByTagName ( 
		this.bindingElement,
		this._nodename_tabpanels 
	).item ( 0 );
}

/**
 * Get tab elements. Taking care not to include tabs from descendant tabboxes in result.
 * @return {List<Element>}
 */
TabBoxBinding.prototype.getTabElements = function () {
	
	var nodename = this._nodename_tab;
	var children = new List ( this._tabsElement.childNodes );
	var result = new List ();

	while ( children.hasNext ()) {
		var child = children.getNext ();
		if ( child.nodeType == Node.ELEMENT_NODE && DOMUtil.getLocalName ( child ) == nodename ) {
			result.add ( child );
		}
	}
	return result;
}

/**
 * Get tabpanel elements.
 * @return {List<Element>}
 */
TabBoxBinding.prototype.getTabPanelElements = function () {
	
	var nodename = this._nodename_tabpanel;
	var children = new List ( this._tabPanelsElement.childNodes );
	var result = new List ();
	
	children.each ( function ( child ) {
		if ( child.nodeType == Node.ELEMENT_NODE && DOMUtil.getLocalName ( child ) == nodename ) {
			result.add ( child );
		}
	});
	return result;
}

/**
 * Get tabs binding.
 * @return {TabsBinding}
 */
TabBoxBinding.prototype.getTabsBinding = function () {
	
	return this.getChildBindingByLocalName ( this._nodename_tabs ); 
}

/**
 * Get tabpanels binding.
 * @return {TabPanelsBinding}
 */
TabBoxBinding.prototype.getTabPanelsBinding = function () {
	
	return this.getChildBindingByLocalName ( this._nodename_tabpanels );
}

/**
 * Get tab bindings.
 * @return {List<TabBinding>}
 */
TabBoxBinding.prototype.getTabBindings = function () {

	var result = new List ();
	var elements = this.getTabElements ();
	
	elements.each ( function ( element ) {
		result.add ( 
			UserInterface.getBinding ( element )
		);
	});
	
	return result;
}

/**
 * Get tabpanel bindings.
 * @return {List<TabPanelBinding>
 */
TabBoxBinding.prototype.getTabPanelBindings = function () {
	
	var result = new List ();
	this.getTabPanelElements ().each ( function ( element ) {
		result.add ( UserInterface.getBinding ( element ));
	});
	return result;
}

/**
 * Get the selected TabBinding.
 * @return {TabBinding}
 */
TabBoxBinding.prototype.getSelectedTabBinding = function () {

	return this._selectedTabBinding;
}

/**
 * Get the selected TabPanelBinding.
 * @return {TabPanelBinding}
 */
TabBoxBinding.prototype.getSelectedTabPanelBinding = function () {
	
	var result = null;
	if ( this._selectedTabBinding ) {
		result = this.getTabPanelBinding (
			this._selectedTabBinding 
		);
	}
	return result;
}

/**
 * @param {TabPanelBinding} tabPanelBinding
 * @param {boolean} isShowWarning
 */
TabBoxBinding.prototype._showWarning = function ( tabPanelBinding, isShowWarning ) {
	
	var tabBinding = this.getTabBinding ( tabPanelBinding );
	
	if ( isShowWarning ) {
		if ( tabBinding.labelBinding.hasImage ) {
			tabBinding._backupImage = tabBinding.getImage ();
		}
		tabBinding.setImage ( TabBoxBinding.INVALID_TAB_IMAGE );
	} else {
		if ( tabBinding._backupImage ) {
			tabBinding.setImage ( tabBinding._backupImage );
		} else {
			tabBinding.setImage ( false );
		}
	}
}

/** 
 * TODO: Are we sure that errors get evaluated first?
 * @param {TabPanelBinding} tabPanelBinding
 * @param {boolean} isShowWarning
 */
TabBoxBinding.prototype._showBalloon = function ( tabPanelBinding, isShow ) {
	
	var tabBinding = this.getTabBinding ( tabPanelBinding );
	
	if (( isShow && !tabBinding.isSelected ) || !isShow ) { // don't put image on selected tab
		
		/*
		 * Don't mess with error indicators...
		 */
		if ( tabBinding.getImage () != TabBoxBinding.INVALID_TAB_IMAGE ) {
			if ( isShow ) {
				if ( tabBinding.labelBinding.hasImage ) {
					tabBinding._backupImage = tabBinding.getImage ();
				}
				tabBinding.setImage ( TabBoxBinding.BALLOON_TAB_IMAGE );
			} else {
				if ( tabBinding._backupImage != null ) {
					tabBinding.setImage ( tabBinding._backupImage );
				} else {
					tabBinding.setImage ( false );
				}
			}
		}
	}
}

/**
 * Advance tab selection.
 * @param {boolean} isForward
 */
TabBoxBinding.prototype.advanceSelection = function ( isForward ) {
	
	var tab = this.getSelectedTabBinding ();
	var tabs = this.getTabBindings ();
	var index = tab.getOrdinalPosition ( true );
	var next = null;
	
	var visible = new List ();
	tabs.each ( function ( t ) { // exclude hidden tabs
		if ( t.isVisible ) {
			visible.add ( t );
		}
	});
	 
	if ( visible.getLength () > 1 ) {
		if ( index == 0 && !isForward ) {
			next = visible.getLast ();
		} else if ( index == visible.getLength () - 1 && isForward ) {
			next = visible.getFirst ();
		} else {
			if ( isForward ) {
				next = tab.getNextBindingByLocalName ( this._nodename_tab );
			} else {
				next = tab.getPreviousBindingByLocalName ( this._nodename_tab );
			} 
		}
		if ( next != null ) {
			this.select ( next );
		}
	}
}