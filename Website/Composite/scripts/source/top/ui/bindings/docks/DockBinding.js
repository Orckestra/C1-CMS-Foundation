DockBinding.prototype = new TabBoxBinding;
DockBinding.prototype.constructor = DockBinding;
DockBinding.superclass = TabBoxBinding.prototype;

DockBinding.START					= "start";
DockBinding.EXTERNAL                = "external";
DockBinding.EXPLORER				= "explorer";
DockBinding.MAIN					= "main";
DockBinding.BOTTOMLEFT				= "bottomleft";
DockBinding.BOTTOMRIGHT				= "bottomright";
DockBinding.RIGHTTOP				= "righttop";
DockBinding.RIGHTBOTTOM				= "rightbottom";
DockBinding.ABSBOTTOMLEFT			= "absbottomleft";
DockBinding.ABSBOTTOMRIGHT			= "absbottomright";
DockBinding.ABSRIGHTTOP				= "absrighttop";
DockBinding.ABSRIGHTBOTTOM			= "absrightbottom";

DockBinding.TYPE_START				= "start";
DockBinding.TYPE_EXPLORER			= "explorer";
DockBinding.TYPE_EDITORS			= "editors";
DockBinding.TYPE_TOOLS				= "tools";

DockBinding.ACTION_OPENED			= "dockopened";
DockBinding.ACTION_EMPTIED 			= "dockemptied";

DockBinding.CLASSNAME_ACTIVE 		= "active";


/**
 * @class
 * @implements {IActivatable}
 */
function DockBinding () {

	/**
	 * @type {SystemLogger}
	 */
	this.logger = SystemLogger.getLogger ( "DockBinding" );
	
	/**
	 * @type {boolean}
	 */
	this.isActive = false;
	
	/**
	 * @type {boolean}
	 */
	this.isActivatable = true;
	
	/**
	 * @type {string}
	 */
	this.type = null;
	
	/**
	 * @type {string}
	 */
	this.reference = null;
	
	/**
	 * @type {boolean}
	 */
	this.isCollapsed = false;
	
	/**
	 * @type {boolean}
	 */
	this.isEmpty = true;
	
	/**
	 * @type {StageSplitPanelBinding}
	 */
	this._containingSplitPanelBinding = null;
	
	/**
	 * List of all open views associated to this dock. 
	 * Chages must be synched with {@link DialogStageBinding}
	 * @type {List<ViewBinding>}
	 */
	this._viewBindingList = null;
	
	/**
	 * Associates the deck to the selected perspective (area). 
	 * This property is set by the {@link StageDeckBinding}.
	 * @type {SystemNode}
	 */
	this.perspectiveNode = null;
	
	/*
	 * Overwrite TabBoxBinding element names.
	 */
	this._nodename_tab = "docktab";
	this._nodename_tabs = "docktabs";
	this._nodename_tabpanel = "dockpanel";
	this._nodename_tabpanels = "dockpanels";
	
	/*
	 * Overwrite TabBoxBinding binding implementations.
	 */
	this._impl_tab = DockTabBinding;
	this._impl_tabs = DockTabsBinding;
	this._impl_tabpanel = DockPanelBinding;
	this._impl_tabpanels = DockPanelsBinding;
}

/**
 * Identifies binding.
 */
DockBinding.prototype.toString = function () {

	return "[DockBinding]";
}

/**
 * Serialize binding.
 * @return {HashMap<string><object>}
 */
DockBinding.prototype.serialize = function () {
	
	var result = DockBinding.superclass.serialize.call ( this );
	if ( result ) {
		result.active = this.isActive ? true : null;
		result.collapsed = this.isCollapsed ? true : null;
	}
	return result;
}

/**
 * @overloads {TabBoxBinding#onBindingRegsister}
 */
DockBinding.prototype.onBindingRegister = function () {

	DockBinding.superclass.onBindingRegister.call ( this );
	
	this.addActionListener ( Binding.ACTION_ACTIVATED, this );
	this.addActionListener ( TabBoxBinding.ACTION_UPDATED, this );
	this.addActionListener ( ViewBinding.ACTION_LOADED );
	this.addActionListener ( ViewBinding.ACTION_CLOSED )
	

	
	this._viewBindingList = new List ();
	
	this.reference = this.getProperty("reference");

	if (this.reference == DockBinding.MAIN) {
		this.subscribe(BroadcastMessages.SYSTEMTREENODEBINDING_FOCUS);
	}
}

/**
 * @overloads {TabBoxBinding#onBindingAttach}
 */
DockBinding.prototype.onBindingAttach = function () {

	DockBinding.superclass.onBindingAttach.call ( this );
	
	this._containingSplitPanelBinding = this.getAncestorBindingByLocalName ( "splitpanel" );
	
	if ( this.getTabBindings ().hasEntries ()) {
		this.isEmpty = false;
		this.isActivatable = true;
	} else {
		this.dispatchAction ( DockBinding.ACTION_EMPTIED );
	}
}

/**
 * Hide editorsdock dockcontrols.
 * @overloads {TabBoxBinding#onMembersAttached}
 *
DockBinding.prototype.onMembersAttached = function () {

	DockBinding.superclass.onMembersAttached.call ( this );
	if ( this.type == DockBinding.TYPE_EDITORS ) {
		this.showControls ( false );
	}
}
*/

/**
 * A graphic accessory element is appended to the *parentnode* of the dock element.
 * Notice that this method overwrites the super method (no need for docktabs below).
 * @overwrites {TabBoxBinding#buildDOMContent}
 */
DockBinding.prototype.buildDOMContent = function () {
	
	var type = this.getProperty ( "type" );
	this.type = type ? type : DockBinding.TYPE_TOOLS;;
	this.attachClassName ( this.type );
	if ( this.getProperty ( "active" ) == true ) {
		this.activate ();
	}
}

/**
 * Lots of stuff can affect the apparent visibility of docks. But since 
 * the {@link ViewBinding} is not contained within the dock (it floats in a 
 * separate layber above everything else} you should always call this method 
 * to make sure that it gets properly notified of visibility changes.
 * TODO: Consider deprecating this in favour of traditional action system.
 * @param {boolean} Should be set to true if the dock is now visible.
 */
DockBinding.prototype.interceptDisplayChange = function ( wasDisplayed ) {
	
	var dockPanelBinding = this.getSelectedTabPanelBinding ();
	if ( dockPanelBinding ) {
		dockPanelBinding.isVisible = wasDisplayed;
		dockPanelBinding.dispatchAction ( 
			Binding.ACTION_VISIBILITYCHANGED
		);
		
		//dockPanelBinding.updateVisibility ( wasDisplayed );
	}
}

/**
 * Prepare new view.
 * @param {ViewDefinition} definition
 * @return DockTabBinding
 */
DockBinding.prototype.prepareNewView = function ( definition ) {
	
	// reate and append ViewBinding. 
	var viewBinding = this._getBindingForDefinition ( definition );
	
	// create and append DockTabBinding.
	// notice setup with tab label
	var tabBinding = DockTabBinding.newInstance ( this.bindingDocument );
	tabBinding.setHandle ( definition.handle );
	tabBinding.setLabel( definition.flowHandle ? null : definition.label);
	tabBinding.setImage ( definition.image );
	tabBinding.setToolTip ( definition.toolTip );
	tabBinding.setEntityToken ( definition.entityToken );
	tabBinding.setAssociatedView ( viewBinding );
	if (definition.isPinned) {
		tabBinding.setProperty("pinned", true);
	}
	this.appendTabByBindings ( tabBinding, null );
	
	// listen for dirty events and loaded pages
	this._setupPageBindingListeners ( tabBinding );
	
	// snap view to tabpanel position
	var tabPanelBinding = this.getTabPanelBinding ( tabBinding );
	viewBinding.snapToBinding ( tabPanelBinding, definition.isFloating );
	
	// TODO: construct a viewset binding for hosting this fellow?
	/*
	var bodyBinding = UserInterface.getBinding ( this.bindingDocument.body );
	bodyBinding.add ( viewBinding );
	*/
	var viewset = this.bindingWindow.bindingMap.views;
	viewset.add ( viewBinding );
	
	if ( !this.isActive ) {
		this.activate ();
	}
	
	/*
	 * Odd fact: if this is done on a timeout, mozilla will 
	 * summon a bug that hides the dock after a few seconds.
	 */
	viewBinding.attach();

	return tabBinding;
}

/**
 * Prepare open ViewBinding.
 * TODO: _setupDirtyStuff???? (only if open views contains editors!)
 * @param {ViewDefinition} definition
 * @param {DockTabBinding} tabBinding
 */
DockBinding.prototype.prepareOpenView = function ( definition, tabBinding ) {
	
	this.logger.debug ( "DockBinding.prototype.prepareOpenView: _setupDirtyStuff required?" );
	
	// initially, set tab appearance from definition
	tabBinding.setLabel ( definition.label );
	tabBinding.setImage ( definition.image );
	tabBinding.setToolTip ( definition.toolTip );
	
	// secondly, setup tab to grab appearance from loaded page
	this._setupPageBindingListeners ( tabBinding );
	
	var tabPanelBinding = this.getTabPanelBinding ( tabBinding );
	var viewBinding = this._getBindingForDefinition ( definition );
	tabBinding.setAssociatedView ( viewBinding );
	
	//tabPanelBinding.add ( viewBinding ); // this would create a non-floating view

	viewBinding.snapToBinding(tabPanelBinding, definition.isFloating);
	UserInterface.getBinding ( this.bindingDocument.body ).add ( viewBinding );
	viewBinding.attach ();
	
}

/**
 * Create ViewBinding to match ViewDefinition.
 * @param {ViewDefinition} definition
 * @return {ViewBinding}
 */
DockBinding.prototype._getBindingForDefinition = function ( definition ) {
	
	var viewset = this.bindingWindow.bindingMap.views;
	var view = ViewBinding.newInstance ( viewset.bindingDocument ); // this.bindingDocument 
	view.setDefinition ( definition );
	
	return view;	
}

/**
 * Attach actionlisteners to the tabpanel associated to a given tab.
 * @param {DockTabBinding} tabBinding
 */
DockBinding.prototype._setupPageBindingListeners = function ( tabBinding ) {
	
	var tabPanelBinding = this.getTabPanelBinding ( tabBinding );
	
	var self = this;
	
	/*
	 * Declare action handler for tabBinding.
	 */
	var handler = {
		handleAction : function ( action ) {
		
			var binding = action.target;
		
			switch ( action.type ) {
				
				case PageBinding.ACTION_ATTACHED :
					TabBoxBinding.currentActiveInstance = self;
					break;
				
				case PageBinding.ACTION_INITIALIZED :
					
					/*
					 * Page reflex phase starts here!
					 */
					binding.reflex ( true );
					
					/*
					 * Page label and image transferred to docktab. Notice the 
					 * Eventbroadcaster transmission! For dialogs, this gets
					 * broadcasted by this StageDialogBinding.
					 */
					var view = tabBinding.getAssociatedView ();
					if ( binding.bindingWindow == view.getContentWindow ()) {
						tabBinding.updateDisplay ( binding );
						EventBroadcaster.broadcast ( BroadcastMessages.VIEW_COMPLETED, view.getHandle ());
						if ( StatusBar.state == StatusBar.BUSY ) {
							StatusBar.clear ();
						}
					}
					
					/*
					 * Final stuff handled by the docktab.
					 */
					tabBinding.onPageInitialize ( binding );
					action.consume ();
					break;

				case PageBinding.ACTION_UPDATED:
					/*
					* Page label and image transferred to docktab. Notice the 
					* Eventbroadcaster transmission! For dialogs, this gets
					* broadcasted by this StageDialogBinding.
					*/
					var view = tabBinding.getAssociatedView();
					if (binding.bindingWindow == view.getContentWindow()) {
						tabBinding.updateDisplay(binding);
					}
					break;
					
				case DockTabBinding.ACTION_UPDATE_VISUAL :
					tabBinding.updateDisplay ( binding );
					action.consume ();
					break;
					
				case DockTabBinding.ACTION_UPDATE_TOKEN :
					tabBinding.updateEntityToken ( binding );
					action.consume ();
					break;
					
				case EditorPageBinding.ACTION_DIRTY :
					tabBinding.setDirty ( true );
					// TODO: dont consume - top app menu should listen here!
					break;

				case EditorPageBinding.ACTION_SAVE:
				case EditorPageBinding.ACTION_SAVE_AND_PUBLISH:
					tabBinding.onSaveStart ();
					break;
					
				case ViewBinding.ACTION_ONCLOSE :
					self.closeTab ( tabBinding );
					action.consume ();
					break;
					
				case ViewBinding.ACTION_ONCLOSE_FORCE :
					self.closeTab ( tabBinding, true );
					action.consume ();
					break;
					
				case DockPanelBinding.ACTION_FORCE_SELECT :
					self.select ( tabBinding );
					break;
					
				case Binding.ACTION_FORCE_REFLEX :
					tabPanelBinding.reflex ( true );
					action.consume ();
					break;
					
				case DockTabBinding.ACTION_FORCE_CLEAN :
				case EditorPageBinding.ACTION_CLEAN :
					if ( tabBinding.isDirty ) {
						tabBinding.setDirty ( false );
					}
					break;
					
				case WindowBinding.ACTION_ONLOAD :
					alert ( "HWEJ" );
					break;
			}
		}
	};
	
	/*
	 * Attach action listeners to tabBinding.
	 */
	new List ([
	           DockTabBinding.ACTION_UPDATE_VISUAL,
	           DockTabBinding.ACTION_UPDATE_TOKEN,
	           PageBinding.ACTION_ATTACHED,
	           PageBinding.ACTION_INITIALIZED,
	           PageBinding.ACTION_UPDATED,
	           EditorPageBinding.ACTION_DIRTY,
	           EditorPageBinding.ACTION_CLEAN,
	           EditorPageBinding.ACTION_SAVE,
               EditorPageBinding.ACTION_SAVE_AND_PUBLISH,
	           ViewBinding.ACTION_ONCLOSE,
	           ViewBinding.ACTION_ONCLOSE_FORCE,
	           DockPanelBinding.ACTION_FORCE_SELECT,
	           Binding.ACTION_FORCE_REFLEX,
	           DockTabBinding.ACTION_FORCE_CLEAN,
	           WindowBinding.ACTION_ONLOAD
	]).each ( 
		function ( action ) {
			tabPanelBinding.addActionListener ( action, handler );
		}
	);
}

/** 
 * Creates a new DockTabBinding instance.
 * @overwrites {TabBoxBinding#summonTabBinding}
 * @return {DockTabBinding}
 *
DockBinding.prototype.summonTabBinding = function () {
	
	return DockTabBinding.newInstance ( this.bindingDocument );
}
*/

/**
 * Creates a new DockPanelBinding instance.
 * @overwrites {TabBoxBinding#summonTabPanelBinding}
 * @return {DockPanelBinding}
 */
DockBinding.prototype.summonTabPanelBinding = function () {
	
	return DockPanelBinding.newInstance ( this.bindingDocument );
}

/**
 * @overloads {TabBoxBinding#handleAction}
 * @param {Action} action 
 */
DockBinding.prototype.handleAction = function ( action ) {
	
	DockBinding.superclass.handleAction.call ( this, action );

	var binding = action.target;

	switch ( action.type ) {
		
		case Binding.ACTION_ACTIVATED :
			if ( !this.isActive ) {
				this.activate ();
			}
			action.consume ();
			break;
			
		case TabBoxBinding.ACTION_UPDATED :
			if ( binding instanceof DockBinding ) {
				if ( binding.updateType == TabBoxBinding.UPDATE_DETACH ) {
					if ( !this.getTabElements ().hasEntries ()) {
						this.isEmpty = true;
						this.isActivatable = false;
						if ( this.isActive == true ) {
							this.deActivate ();
						}
						this.dispatchAction ( DockBinding.ACTION_EMPTIED );
					}
				}
			}
			// dont consume
			break;
			
		case ViewBinding.ACTION_LOADED :
			this._viewBindingList.add ( binding );
			if ( this.isActive ) {
				binding.onActivate ();
			}
			break;
		
		case ViewBinding.ACTION_CLOSED :
			this._viewBindingList.del ( binding );
			break;
	}
}

/**
 * @implements {IBroadcastListener}
 * @param {string} broadcast
 * @param {object} arg
 */
DockBinding.prototype.handleBroadcast = function ( broadcast, arg ) {
	
	DockBinding.superclass.handleBroadcast.call ( this, broadcast, arg );
	
	switch ( broadcast ) {
		case BroadcastMessages.SYSTEMTREENODEBINDING_FOCUS :
			var treenode = arg;
			if (arg == this.perspectiveNode) {
				this._highlightTabByEntityToken()
			} else if (treenode.perspectiveNode && treenode.perspectiveNode == this.perspectiveNode ) {
				this._highlightTabByEntityToken(treenode.node.getEntityToken());
			}
			break;
	}
}

/**
 * Find a tab with a given entityToken and highlight it.
 * @param {string} entityToken
 */
DockBinding.prototype._highlightTabByEntityToken = function (entityToken) {

	var tabs = this.getTabBindings();
	while (tabs.hasNext()){
		var tab = tabs.getNext();
		var token = tab.getEntityToken();
		if (entityToken && token != null && token == entityToken) {
			tab.highlight(true);
		} else {
			tab.highlight(false);
		}
	}
}

///**
// * Find a (more or less random) tab with a given entityToken and select it.
// * @param {string} entityToken
// */
//DockBinding.prototype._selectTabByEntityToken = function ( entityToken ) {
	
//	var tabs = this.getTabBindings (); 
//	var hasSelected = false;
	
//	while ( tabs.hasNext () && !hasSelected ) {
//		var tab = tabs.getNext ();
//		var token = tab.getEntityToken ();
//		if ( token != null && token == entityToken ) {
//			if ( !tab.isSelected ) {
//				this.select ( tab, true );
//				hasSelected = true;
//			}
//		}
//	}
//}

/**
 * Collapse tabpanels. Invoked by the {@link StageSplitPanelBinding}
 * @param {boolean} isHorizontal
 */
DockBinding.prototype.collapse = function ( isHorizontal ) {
	
	this._handleCollapse ( true, isHorizontal );
}

/**
 * Uncollapse tabpanels. Invoked by the {@link StageSplitPanelBinding}
 */
DockBinding.prototype.unCollapse = function ( isHorizontal ) {
	
	this._handleCollapse ( false, isHorizontal );
}

/**
 * Notice that flex and activation is handled by containing @link StageSplitPanelBinding}
 * @param {boolean} isCollapse
 * @param {boolean} isHorizontal
 */
DockBinding.prototype._handleCollapse = function ( isCollapse, isHorizontal ) {
	
	var dockPanelsBinding = this.getChildBindingByLocalName ( "dockpanels" );
	var containingSplitBoxBinding = this.getAncestorBindingByLocalName ( "splitbox" );
	
	if ( isCollapse ) {
		dockPanelsBinding.hide ();
		this.bindingElement.style.height = "auto";
		this.isFlexible = false;
		this.isActivatable = false;
		this.setProperty ( "collapsed", true );
		if ( isHorizontal && containingSplitBoxBinding.hasBothPanelsVisible ()) { /***/
			this.setWidth ( 200 );
		}
	} else {
		dockPanelsBinding.show ();
		this.isFlexible = true;
		this.isActivatable = true;
		this.deleteProperty ( "collapsed" );
		if ( isHorizontal ) { /***/
			this.setWidth ( false );
		}
	}
	this.interceptDisplayChange ( !isCollapse );
	this.isCollapsed = isCollapse;
}

/**
 * Activate.
 * @implements {IActivatable}
 */
DockBinding.prototype.activate = function () {
	
	if ( !this.isActive ) {
		
		this.isActive = true;
		this.attachClassName ( DockBinding.CLASSNAME_ACTIVE );
		this.setProperty ( "active", true );
		
		if ( this._containingSplitPanelBinding ) {
			this._containingSplitPanelBinding.isActive = true;
		}
		
		this.getTabBindings ().each ( function ( tab ) {
			tab.onActivate ();
		});
		
		this._viewBindingList.each ( function ( view ) {
			view.onActivate ();
		});
	
		Application.activate ( this );
	}
}

/**
 * Deactivate.
 * @implements {IActivatable}
 */
DockBinding.prototype.deActivate = function () {

	if ( this.isActive == true ) {
	
		this.isActive = false;
		this.detachClassName ( DockBinding.CLASSNAME_ACTIVE );
		this.deleteProperty ( "active" );
		
		if ( this._containingSplitPanelBinding ) {
			this._containingSplitPanelBinding.isActive = false;
		}
		
		// this and views activation should be combined!
		this.getTabBindings ().each ( function ( tab ) {
			tab.onDeactivate ();
		});
		
		this._viewBindingList.each ( function ( view ) {
			view.onDeactivate ();
		});
		
		Application.deActivate ( this );
	}
}

/**
 * Close tab.
 * @param {DockTabBinding} tabBinding
 * @param {boolean} isForce
 */
DockBinding.prototype.closeTab = function (tabBinding, isForce) {
	if (tabBinding.isPinned)
		return;
	
	if ( tabBinding.isDirty && !isForce ) { 
		var resourcename = Resolver.resolve ( tabBinding.getLabel ());
		var self = this;
		Dialog.question ( 
			StringBundle.getString ( "ui", "WebSite.Application.DialogSaveResource.Title" ), 
			StringBundle.getString ( "ui", "WebSite.Application.DialogSaveResource.Text" ).replace ( "${resourcename}", resourcename ),
			Dialog.BUTTONS_YES_NO_CANCEL, {
			handleDialogResponse : function ( response ) {
				switch ( response ) {
					case Dialog.RESPONSE_YES :
						setTimeout ( function () {
							self.saveContainedEditor ( tabBinding );
						}, 0 );
						break;
					case Dialog.RESPONSE_NO :
						self.removeTab ( tabBinding );
						break;
				}
			}
		});
	} else {
		this.removeTab ( tabBinding );
	}
}

/**
 * Close tabs except.
 * @param {DockTabBinding} tabBinding
 */
DockBinding.prototype.closeTabsExcept = function ( tabBinding ) {
	
	var tabs = this.getTabBindings ();
	while ( tabs.hasNext ()) {
		var tab = tabs.getNext ();
		if ( tab != tabBinding ) {
			this.closeTab ( tab );
		}
	}
}

/**
 * Save editor associated to a give tab. A success will trigger tab close.
 * @param {DockTabBinding} tabBinding
 */ 
DockBinding.prototype.saveContainedEditor = function ( tabBinding ) {
	
	var viewBinding = tabBinding.getAssociatedView ();
	viewBinding.saveContainedEditor ();
	
	var self = this; 
	var handler = {
		handleBroadcast : function ( broadcast, arg ) {
			switch ( broadcast ) {
				case BroadcastMessages.CURRENT_SAVED :
					if ( arg.handle == viewBinding.getHandle ()) {
						EventBroadcaster.unsubscribe ( BroadcastMessages.CURRENT_SAVED, handler );
						if ( arg.isSuccess ) {
							self.removeTab ( tabBinding );
						}
					}
					break;
			}
		}
	}
	
	EventBroadcaster.subscribe ( BroadcastMessages.CURRENT_SAVED, handler );
}

/**
 * @overloads {TabBoxBinding#appendTabByBindings}
 * @param {TabBinding} tabBinding
 * @param {object} tabPanelContent This can be either a Binding or a DOMElement
 */
DockBinding.prototype.appendTabByBindings = function ( tabBinding, tabPanelContent ) {
	
	if ( this.isEmpty ) {
		
		this.isEmpty = false;
		this.isActivatable = true;
		this.setWidth ( false ); // check for collapsed first?
		this.dispatchAction ( DockBinding.ACTION_OPENED );
	}
	DockBinding.superclass.appendTabByBindings.call ( this, tabBinding, tabPanelContent );
}

/**
 * This is queried by the containing splitpanel when minimized
 * @see {StageSplitPanelBinding#minimize}
 * return {int}
 */
DockBinding.prototype.getHeight = function () {
	
	return this.bindingElement.offsetHeight;
}

/**
 * This is queried by Internet Explorer in the (@link DockTabsBinding} 
 * in order to fix a rendering engine bug.
 * @see {DockTabsBinding#flex}
  * return {int}
 */
DockBinding.prototype.getWidth = function () {
	
	return this.bindingElement.offsetWidth;
}

/**
  * @param {int} width
 */
DockBinding.prototype.setWidth = function ( width ) {
	
	width = width ? width + "px" : "100%";
	this.bindingElement.style.width = width;
}

/**
 * @overloads {Binding#show}
 */
DockBinding.prototype.show = function () {
	
	if ( this.isVisible ) {
		DockBinding.superclass.show.call ( this );
		this.isFlexible = true;
		//this.shadowTree.dockLiner.style.display = "block";
	}
}

/**
 * This is probably only used for the Start Dock...
 * @overloads {Binding#hide}
 */
DockBinding.prototype.hide = function () {
	
	if ( !this.isVisible ) {
		DockBinding.superclass.hide.call ( this );
		//this.shadowTree.dockLiner.style.display = "none";
		this.isFlexible = false;
		if ( this.isActive ) {
			this.deActivate ();
		}
	}
}

/**
 * @overloads {TabBoxBinding#getBestTab}
 */
DockBinding.prototype.getBestTab = function () {

	var bestTabBinding = null;
	var tabBindings = this.getTabBindings();
	var tabsLength = tabBindings.getLength();
	
	if (tabsLength == 1) { // first tab
		bestTabBinding = null;
	} else { 
		bestTabBinding = tabBindings.get(0);
	}
	return bestTabBinding;
}