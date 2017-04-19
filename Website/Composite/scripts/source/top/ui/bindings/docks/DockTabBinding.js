DockTabBinding.prototype = new TabBinding;
DockTabBinding.prototype.constructor = DockTabBinding;
DockTabBinding.superclass = TabBinding.prototype;

DockTabBinding.ACTION_FORCE_CLEAN = "docktab force clean";
DockTabBinding.ACTION_UPDATE_VISUAL = "docktab update visual";
DockTabBinding.ACTION_UPDATE_TOKEN = "docktab update token";

DockTabBinding.NODENAME_TABBOX = "dock";

DockTabBinding.LABEL_TABLOADING = "${string:Website.App.LabelLoading}";
DockTabBinding.LABEL_TABDEFAULT = "${string:Website.App.LabelLoaded}";
DockTabBinding.LABEL_TABSAVED = "${string:Website.App.LabelSaved}";
DockTabBinding.LABEL_OVERFLOWED_CLASSNAME = "overflowed";

DockTabBinding.IMG_TABLOADING = "${icon:loading}";
DockTabBinding.IMG_TABDEFAULT = "${icon:default}";

/**
 * @class
 */
function DockTabBinding () {

	/**
	 * @type {SystemLogger}
	 */
	this.logger = SystemLogger.getLogger ( "DockTabBinding" );
	
	/**
	 * Associates the deck to the selected perspective. 
	 * @type {SystemNode}
	 */
	this.perspectiveNode = null;
	
	/**
	 * @type {ControlGroupBinding}
	 */
	this._controlGroupBinding = null;
	
	/**
	 * EXPLAIN!
	 * @type {Binding}
	 */
	this._viewBinding = null;
	
	/**
	 * Relevant for docks containing editors.
	 * @type {boolean}
	 */
	this.isDirty = false;

	/**
	 * @type {boolean}
	 */
	this.isPinned = false;
	
	/**
	 * Flipped when DockTabs have invoked the "manage" routine.
	 * @type {boolean}
	 */
	this.isInitiallyHidden = true;
	
	/**
	 * Associates the tab to a tree item.
	 * @type {string}
	 */
	this._entityToken = null;
	
	/**
	 * When a tree update is triggered by the tab, this flag  
	 * is flipped to lock further updates for a short time. 
	 * @type {boolean}
	 */
	this._canUpdateTree = true;
	
	/*
	 * Returnable.
	 */
	return this;
}

/**
 * Identifies binding.
 */
DockTabBinding.prototype.toString = function () {

	return "[DockTabBinding]";
}

/**
 * Set contextmenu on startup.
 * @overloads {TabBinding#onBindingAttach}
 */
DockTabBinding.prototype.onBindingAttach = function () {
	
	DockTabBinding.superclass.onBindingAttach.call ( this );
	this.subscribe ( BroadcastMessages.BIND_TOKEN_TO_VIEW );
	this.perspectiveNode = this.containingTabBoxBinding.perspectiveNode;
	this.addActionListener ( ControlBinding.ACTION_COMMAND, this );
	if ( this.containingTabBoxBinding.type != DockBinding.EXPLORER ) {
		this.setContextMenu ( 
			top.app.bindingMap.docktabpopup 
		);
	}
}

/**
 * Set associated ViewBinding.
 * @param {Binding} viewBinding
 */
DockTabBinding.prototype.setAssociatedView = function ( viewBinding ) {

	this._viewBinding = viewBinding;
}

/**
 * Get associated ViewBinding.
 * @return {Binding}
 */
DockTabBinding.prototype.getAssociatedView = function () {
	
	return this._viewBinding;
}

/**
 * Serialize binding.
 * @overloads {TabBinding#serialize}
 * @return {HashMap<string><object>}
 */
DockTabBinding.prototype.serialize = function () {
	
	var result = DockTabBinding.superclass.serialize.call ( this );
	if ( result ) {
		result.label = null;
		result.image = null;
		result.handle = this.getHandle ();
	}
	return result;
}

/**
 * Set handle.
 * @param {string} handle
 */
DockTabBinding.prototype.setHandle = function ( handle ) {
	
	this.setProperty ( "handle", handle );
}

/**
 * Get handle.
 * @return {string}
 */
DockTabBinding.prototype.getHandle = function () {
	
	return this.getProperty ( "handle" );
}

/**
 * Set entityToken, associating the tab to a tree item.
 * @return
 */
DockTabBinding.prototype.setEntityToken = function ( token ) {
	
	if ( this._entityToken == null ) {
		this.subscribe ( BroadcastMessages.SYSTEMTREEBINDING_LOCKTOEDITOR );
	}
	this._entityToken = token;
	
	/*
	 * During initialization, _updateTree is invoked other places. After  
	 * initialization, setting the entityToken will FORCE an _updateTree. 
	 */
	if ( this.isAttached ) {
		if ( this.isSelected ) { // hmm... and activated...
			this._updateTree ( true ); // force by boolean arg
		}
	}
}

/**
 * Get entityToken.
 * @return {string}
 */
DockTabBinding.prototype.getEntityToken = function () {
	
	return this._entityToken;
}

/**
 * @overloads {TabBinding#buildDOMContent}
 */
DockTabBinding.prototype.buildDOMContent = function () {

	DockTabBinding.superclass.buildDOMContent.call ( this );

	if (this.getProperty("pinned") != true) {

		this._controlGroupBinding = this.labelBinding.add(
			ControlGroupBinding.newInstance(this.bindingDocument)
		);
		var controlBinding = DialogControlBinding.newInstance(this.bindingDocument);
		controlBinding.setControlType(ControlBinding.TYPE_CLOSE);
		controlBinding.attachClassName("closecontrol");
		this._controlGroupBinding.add(controlBinding);
		this._controlGroupBinding.attachRecursive();
	} else {
		this.isPinned = true;
	}
}

/**
 * Invoked by actionlisteners setup in DockBinding.
 * @see {DockBinding#_setupPageBindingListeners}
 * @param {boolean} isDirty
 */
DockTabBinding.prototype.setDirty = function ( isDirty ) {
	
	if ( this.containingTabBoxBinding.type == DockBinding.TYPE_EDITORS ) {
		if ( this.isDirty != isDirty ) {
			this.isDirty = isDirty;
			if ( Binding.exists ( this.labelBinding )) { // happens while closing the tab...
				var label = this.labelBinding.getLabel ();
				if ( label != null ) {
					this.labelBinding.setLabel ( 
						isDirty ? "*" + label : label.slice ( 1, label.length )		
					);
				} else {
					this.labelBinding.setLabel ( isDirty ? "*" : "" );
				}
			}
		}
		var broadcaster = top.app.bindingMap.broadcasterCurrentTabDirty;
		if ( this.isDirty == true ) {
			this.subscribe ( BroadcastMessages.SAVE_CURRENT );
			EventBroadcaster.broadcast ( BroadcastMessages.DOCKTAB_DIRTY, this );
			broadcaster.enable ();
		} else {
			this.unsubscribe ( BroadcastMessages.SAVE_CURRENT  );
			EventBroadcaster.broadcast ( BroadcastMessages.DOCKTAB_CLEAN, this );
			broadcaster.disable ();
		}
	} else {
		Dialog.warning ( "Dirty denied", "Only editor docks should invoke the dirty state!" );
	}
}

/**
 * Grab label, image and tooltip from another binding (presumably a loaded PageBinding).
 * @see {DockBinding_setupPageBindingListeners}
 * @param {Binding} binding
 */
DockTabBinding.prototype.updateDisplay = function ( binding ) {
	
	this.setLabel ( binding.getLabel ());
	this.setImage ( binding.getImage ());
	this.setToolTip ( binding.getToolTip ());
}

/**
 * Update entityToken.
 * @see {DockBinding_setupPageBindingListeners}
 */
DockTabBinding.prototype.updateEntityToken = function ( binding ) {
	
	this.setEntityToken ( binding.getEntityToken ());
}

/**
 * @implements {IActionListener}
 * @overloads {Binding#handleAction}
 * @param {Action} action
 */
DockTabBinding.prototype.handleAction = function ( action ) {
	
	DockTabBinding.superclass.handleAction.call ( this, action );
	
	var binding = action.target;
	
	switch ( action.type ) {
		case ControlBinding.ACTION_COMMAND :
			if ( binding.controlType == ControlBinding.TYPE_CLOSE ) {
				this.close ()
			}
			break;
		case MenuItemBinding.ACTION_COMMAND :
		 	if ( action.listener == this.contextMenuBinding ) {
		 		this._handleContextMenuItemBinding ( binding );
		 	}
			break;
	}
}

/**
 * @param {MenuItemBinding} menuItemBinding
 */
DockTabBinding.prototype._handleContextMenuItemBinding = function ( menuItemBinding ) {
	
	var cmd = menuItemBinding.getProperty ( "cmd" );
	
	switch ( cmd ) {
		case DockTabPopupBinding.CMD_REFRESH :
			if ( this.containingTabBoxBinding.type != DockBinding.TYPE_TOOLS ) {
				this.setLabel ( DockTabBinding.LABEL_TABLOADING );
			}
			this.setImage ( DockTabBinding.IMG_TABLOADING );
			this._viewBinding.reload ( Application.isDeveloperMode );
			this.isDirty = false;
			break;
		case DockTabPopupBinding.CMD_MAKEDIRTY :
			this.setDirty ( true );
			break;
		case DockTabPopupBinding.CMD_VIEWSOURCE :
		case DockTabPopupBinding.CMD_VIEWGENERATED :
		case DockTabPopupBinding.CMD_VIEWSERIALIZED :
			this._viewSource ( cmd );
			break;
		case DockTabPopupBinding.CMD_CLOSETAB :
			this.close ()
			break;
		case DockTabPopupBinding.CMD_CLOSEOTHERS :
			this.containingTabBoxBinding.closeTabsExcept ( this );
			break;
		default :
			alert ( "TODO!" );
			break;
	}
}

/** 
 * Rigged up for default tab labels. Always invoked at least twice: 
 * 1) When the tab is constructed (by DockBinding) 
 * 2) When the PageBinding is inititlized (in associated tab panel).
 * @overloads {TabBinding#setLabel}
 * @param {string} label
 */
DockTabBinding.prototype.setLabel = function ( label ) {

	if ( !label ) {
		if ( !this.getLabel ()) {
			label = DockTabBinding.LABEL_TABLOADING;
		} else if ( this.getLabel () == DockTabBinding.LABEL_TABLOADING ) {
			label = DockTabBinding.LABEL_TABDEFAULT;
		}
	}
	label = this.isDirty ? "*" + label : label;
	DockTabBinding.superclass.setLabel.call ( this, label );
}

/** 
 * Rigged up for default tab images. Always invoked at least twice: 
 * 1) When the tab is constructed (by DockBinding) 
 * 2) When the PageBinding is inititlized (in associated tab panel).
 * @overloads {TabBinding#setImage}
 * @param {string} image
 */
DockTabBinding.prototype.setImage = function ( image ) {

	if ( !image ) {
		if ( !this.getImage ()) {
			image = DockTabBinding.IMG_TABLOADING;
		} else if ( this.getImage () == DockTabBinding.IMG_TABLOADING ) {
			image = DockTabBinding.IMG_TABDEFAULT;
		}
	}
	DockTabBinding.superclass.setImage.call ( this, image );
}

/**
 * View contained source.
 * @param {string} cmd
 */
DockTabBinding.prototype._viewSource = function ( cmd ) {

	var def = ViewDefinitions [ "Composite.Management.SourceCodeViewer" ];
	def.argument = { 
		action: cmd, 
		doc : this._viewBinding.windowBinding.getContentDocument ()
	};
	var label = Resolver.resolve ( this.getLabel ());
	switch ( cmd ) {
		case DockTabPopupBinding.CMD_VIEWSOURCE :
			def.label = "Source: " + label;
			break;
		case DockTabPopupBinding.CMD_VIEWGENERATED :
			def.label = "Generated: "  + label;
			break;
		case DockTabPopupBinding.CMD_VIEWSERIALIZED :
			def.label = "Serialized: " + label;
			break;
	}
	StageBinding.presentViewDefinition ( def );
}

/**
 * Invoked by the DockBinding on activation.
 */
DockTabBinding.prototype.onActivate = function () {
	
	this._updateBroadcasters ();
	if ( this.isSelected ) {
		this._updateTree ();
	}
	if ( this._controlGroupBinding ) {
		this._controlGroupBinding.onActivate ();
	}
	if ( this.isSelected ) {
		this._updateGlobalEntityToken ();
	}
}

/**
 * Invoked by the DockBinding on deactivation.
 */
DockTabBinding.prototype.onDeactivate = function () {
	
	if ( this._controlGroupBinding ) {
		this._controlGroupBinding.onDeactivate ();
	}
}

/**
 * Invoked when associated page initializes.
 * @see {DockBinding#_setupPageBindingListeners}
 */
DockTabBinding.prototype.onPageInitialize = function ( page ) {
	
	this._updateBroadcasters ();
	if ( this._isEditorDockTab ()) {
		if ( !this.hasSubscription ( BroadcastMessages.CLOSE_ALL )) { // reload tab!
			this.subscribe ( BroadcastMessages.CLOSE_CURRENT );
			this.subscribe ( BroadcastMessages.CLOSE_ALL );
		}
	}
}

/**
 * Save contained editor.
 * @see {ViewBinding#handleAction}
 */
DockTabBinding.prototype.saveContainedEditor = function () {
	
	if ( this._isEditorDockTab () && this.isDirty == true ) {
		this._viewBinding.saveContainedEditor ();
	}
}

/**
 * Dock tabs are initially hidden by CSS in order to prevent jumping tabs. It's a 
 * timeout issue (takes browser a millisecond to compute tab width exactly).
 * TODO: This should in theory be backported to super class.
 * @see {TabsBinding#manage}
 * @overloads {TabBinding#show}
 */
DockTabBinding.prototype.show = function () {
	
	DockTabBinding.superclass.show.call ( this );
	
	if ( this.isVisible && this.isInitiallyHidden && Binding.exists ( this )) {
		
		this.isInitiallyHidden = false;
		
		/*
		 * Timeout to completely stabilize.
		 */
		var element = this.bindingElement;
		setTimeout ( function () {
			element.style.bottom = "auto";
		}, 25 );
	}
}

/**
 * @implements {IBroadcastListener}
 * @param {string} broadcast
 * @param {
 */
DockTabBinding.prototype.handleBroadcast = function ( broadcast, arg ) {
	
	DockTabBinding.superclass.handleBroadcast.call(this, broadcast, arg);


	if (this._viewBinding == null)
		return;

	var body = this._viewBinding.getContentDocument ().body;
	var root = UserInterface.getBinding ( body );
	
	switch ( broadcast ) {
		
		case BroadcastMessages.SAVE_CURRENT :
			if ( this.isDirty && this.isSelected && root.isActivated ) {
				this.saveContainedEditor ();
			}
			break;
			
		case BroadcastMessages.CURRENT_SAVED :
			if ( arg.handle == this.getAssociatedView ().getHandle ()) {
				this.unsubscribe ( BroadcastMessages.CURRENT_SAVED );
				if ( arg.isSuccess ) {
					this._onSaveSuccess ();
				} else {
					this._onSaveFailure ();	
				}
			}
			break;
		
		case BroadcastMessages.CLOSE_CURRENT :
			if ( this._isEditorDockTab ()) {
				if ( this.isSelected && root.isActivated ) {
					this.close ();
				}
			}
			break;
		
		case BroadcastMessages.CLOSE_ALL :
			if ( this._isEditorDockTab ()) {
				this.close ();
			}
			break;
			
		case BroadcastMessages.SYSTEMTREEBINDING_LOCKTOEDITOR :
			if ( this.isSelected ) {
				if ( UserInterface.isBindingVisible ( this )) {
					this._updateTree ();
				}
			}
			break;
			
		case BroadcastMessages.BIND_TOKEN_TO_VIEW :
			if ( arg.handle == this._viewBinding.getDefinition ().handle ) {
				this.setEntityToken ( arg.entityToken );
				if ( this.isSelected ) {
					this._updateTree ();
				}
			}
			break;
	}
}

/**
 * Invoked by the TabPanelBinding - but the code for 
 * the actionlistener is found somewhere in DockBinding.
 * @see {DockBinding#_setupPageBindingListeners}
 * @return
 */
DockTabBinding.prototype.onSaveStart = function () {
	
	this.subscribe ( BroadcastMessages.CURRENT_SAVED );
}

/**
 * Invoked on successful save.
 */
DockTabBinding.prototype._onSaveSuccess = function () {
	
	/*
	 * If you are here looking for a resetting of property 
	 * this.isDirty, note that it will be flipped by 
	 * interception of EditorPageBinding.ACTION_CLEAN ...
	 */
	
	/*
	 * Update associated page.
	 */
	var page = this._viewBinding.getPageBinding ();
	if ( page != null && page instanceof EditorPageBinding ) {
		page.onSaveSuccess ();
	}
}

/**
 * Invoked on failed save.
 */
DockTabBinding.prototype._onSaveFailure = function () {
	
	// TODO!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
}

/**
 * @overwrites {TabBinding#select}
 */
DockTabBinding.prototype.select = function ( isManaged ) {
	
	DockTabBinding.superclass.select.call ( this, isManaged );
	
	/* 
	 * Update top level broadcaster to enable the main menu "save" command.
	 */
	this._updateBroadcasters ();
	
	/*
	 * Update tree focus.
	 */
	//if ( isManaged != true ) {
		this._updateTree ();
	//}
	
	/*
	 * TODO: Technically this should only be done when the dock is activated...
	 */
	this._updateGlobalEntityToken ();
}


/**
 * Close the tab. Does not check for dirty content - use with caution!
 */
DockTabBinding.prototype.close = function () {
	
	if (!this.isPinned) {
		this.containingTabBoxBinding.closeTab(this);
	}
}

/**
 * Update broadcasters.
 */
DockTabBinding.prototype._updateBroadcasters = function () {
	
	if ( this.isSelected ) {
		
		var dirtyBroadcaster = top.app.bindingMap.broadcasterCurrentTabDirty;
		var editorBroadcaster = top.app.bindingMap.broadcasterCurrentIsEditor;
		
		if ( this._isEditorDockTab ()) {	
			editorBroadcaster.enable ();
			if ( this.isDirty ) {
				dirtyBroadcaster.enable ();
			} else {
				dirtyBroadcaster.disable ();
			}
		} else {
			editorBroadcaster.disable ();
			dirtyBroadcaster.disable ();
		}
	}
}

/**
 * Update tree (if locked to editor). Note that this is done at three distinct 
 * points in a DockTabBinding lifecycle: When entityToken is updated, when 
 * the tab is selected and when the tab is activated (and selected). This may 
 * happen all at once, for example during tab creation, so the operation has 
 * been fitted with a short timeout to prevent multiple webservice invokations.
 * @param {boolean} isForce 
 */
DockTabBinding.prototype._updateTree = function ( isForce ) {
	
	if ( this._canUpdateTree || isForce ) {
		
		EventBroadcaster.broadcast ( 
			BroadcastMessages.DOCKTABBINDING_SELECT, 
			this
		);
		
		/*
		 * Eh. This seems to habe been disabled for some reason... 
		 *
		//this._canUpdateTree = false;
		
		// ... so we disabled this also!
		var self = this;
		setTimeout ( function () {
			self._canUpdateTree = true;
		}, 250 );
		*/
	}
}

/**
 * Hacked method to determine if we are an editor tab: 
 * Simply look for a save-button inside the document.
 * @return {boolean}
 */
DockTabBinding.prototype._isEditorDockTab = function () {
	
	var result = false;
	if ( this._viewBinding != null ) {
		var win = this._viewBinding.getContentWindow ();
		if ( win != null && win.bindingMap != null ) {
			var button = win.bindingMap.savebutton;
			if ( button != null ) {
				result = true;
			}
		}
	}
	return result;
}

/**
 * Update a global reference to the currently selected tabs associated 
 * serializedEntityToken. This is used to restore focus in trees when refreshed. 
 * @return
 */
DockTabBinding.prototype._updateGlobalEntityToken = function () {
	
	StageBinding.entityToken = this._entityToken;
}

/**
 * DockTabBinding factory.
 * @param {DOMDocument} ownerDocument
 * @return {DockTabBinding}
 */
DockTabBinding.newInstance = function ( ownerDocument ) {

	var element = DOMUtil.createElementNS ( Constants.NS_UI, "ui:docktab", ownerDocument );
	return UserInterface.registerBinding ( element, DockTabBinding );
}
