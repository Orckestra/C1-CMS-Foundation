SystemToolBarBinding.prototype = new ToolBarBinding;
SystemToolBarBinding.prototype.constructor = SystemToolBarBinding;
SystemToolBarBinding.superclass = ToolBarBinding.prototype;

/**
 * @class
 * This would be the giant toolbar at the top of the main window.
 */
function SystemToolBarBinding () {

	/**
	 * @type {SystemLogger}
	 */
	this.logger = SystemLogger.getLogger ( "SystemToolBarBinding" );

	/**
	 * @type {string}
	 */
	this._currentProfileKey = null;

	/**
	 * @type {HashMap<string><ButtonBinding>}
	 */
	this._actionFolderNames = {};

	/**
	 * @type {Map<string><List<SystemAction>>}
	 */
	this._actionProfile = null;

	/**
	 * @type {int}
	 */
	this._moreActionsWidth = 0;

	/**
	 * Actions that wouldn't fit on the toolbar.
	 * @type {List<SystemAction>}
	 */
	this._moreActions = null;

	/**
	 * @type {SystemNode}
	 */
	this._node = null;

	/**
	 * @type {string}
	 */
	this._syncHandle = null;

	/**
	* Tree position
	* @type {int}
	*/
	this._activePosition = SystemAction.activePositions.NavigatorTree;

	/**
	 * @type {boolean}
	 */
	this._keepBundleState = false;

	/*
	 * Returnable.
	 */
	return this;
}

/**
 * Identifies binding.
 */
SystemToolBarBinding.prototype.toString = function () {

	return "[SystemToolBarBinding]";
}

/**
 * Setup toolbar rebuild when an actionProfile is published.
 * @overloads {ToolBarBinding#onBindingAttach}
 */
SystemToolBarBinding.prototype.onBindingAttach = function () {

	SystemToolBarBinding.superclass.onBindingAttach.call ( this );

	if ( System.hasActivePerspectives ) {
		this.subscribe ( BroadcastMessages.SYSTEM_ACTIONPROFILE_PUBLISHED );
		this.subscribe ( this.bindingWindow.WindowManager.WINDOW_RESIZED_BROADCAST );
		this.subscribe ( BroadcastMessages.INVOKE_DEFAULT_ACTION );
		this.addActionListener ( ButtonBinding.ACTION_COMMAND );
	} else {
		this.hide ();
	}

	if (this.getProperty("target") === "perspective") {
		this._syncHandle = StageBinding.perspectiveNode.getHandle();
	}
}

/**
 * Do stuff with dimensions on startup (handles too many actions on toolbar).
 * @overloads {ToolBarBinding#onBindingInitialize}
 */
SystemToolBarBinding.prototype.onBindingInitialize = function () {

	// lookup more-actions toolbarbody width - then hide it
	var moreActionsBody = this.bindingWindow.bindingMap.moreactionstoolbargroup;
	this._moreActionsWidth = moreActionsBody.boxObject.getDimension ().w;
	moreActionsBody.hide ();

	// lock toolbar height to fix overflow issues.
	var height = this.boxObject.getDimension ().h;
	this.bindingElement.style.height = height + "px";

	// rigup more-actions button.
	var self = this;
	var button = this.bindingWindow.bindingMap.moreactionsbutton;
	button.addActionListener ( ButtonBinding.ACTION_COMMAND, {
		handleAction : function ( action ) {
			self._showMoreActions ();
			action.consume ();
		}
	});

	// rigup more-actions popup
	var popup = this.bindingWindow.bindingMap.moreactionspopup;
	popup.addActionListener ( MenuItemBinding.ACTION_COMMAND, {
		handleAction : function ( action ) {
			var item = action.target;
			self._handleSystemAction ( item.associatedSystemAction );
		}
	});

	SystemToolBarBinding.superclass.onBindingInitialize.call ( this );
}

/**
 * Handle EventBroadcaster transmissions. In particular, watch out for actionprofiles.
 * @see {SystemTreeBinding#_publishCompiledActionProfile}
 * @implements {IBroadcastListener}
 * @param {string} broadcast
 * @param {object} arg
 */
SystemToolBarBinding.prototype.handleBroadcast = function (broadcast, arg) {

	SystemToolBarBinding.superclass.handleBroadcast.call(this, broadcast, arg);

	switch (broadcast) {
		case BroadcastMessages.SYSTEM_ACTIONPROFILE_PUBLISHED:

			var self = this;
			if (arg != null && arg.syncHandle == this.getSyncHandle()) {
				if (arg.actionProfile != null && arg.actionProfile.hasEntries()) {
					this._actionProfile = arg.actionProfile;
					//TODO: refactor with updating API
					this._node = arg.actionProfile.Node;
					var key = this._getProfileKey();
					if (key != this._currentProfileKey) {

						/*
							* Timeout prevents "freezing" tree selection.
							*/
						setTimeout(function() {
							self.emptyLeft();
							self._actionFolderNames = {};
							self.buildLeft();
							self._currentProfileKey = key;
						}, 0);
					}
				} else {
					setTimeout(function() {
						self.emptyLeft();
						self._actionFolderNames = {};
						self._currentProfileKey = null;
						self._node = null;
						var mores = self.bindingWindow.bindingMap.moreactionstoolbargroup;
						if (mores != null) {
							mores.hide();
						}
					}, 0);
				}

			}
			break;

		case this.bindingWindow.WindowManager.WINDOW_RESIZED_BROADCAST:

			var manager = this.bindingWindow.WindowManager;
			this._toolBarBodyLeft.refreshToolBarGroups();
			this._containAllButtons();
			break;

		case BroadcastMessages.INVOKE_DEFAULT_ACTION:
			if (arg != null && arg.syncHandle == this.getSyncHandle()) {
				this._invokeDefaultAction();
			}
			break;
	}
}

/**
 * @see {SystemTreePopupBinding#_getProfileKey}
 * @return {string}
 */
SystemToolBarBinding.prototype._getProfileKey = function () {

	var result = new String ( "" );
	this._actionProfile.each ( function ( groupid, list ) {
	    list.each( function (systemAction ) {
	        result += systemAction.getHandle() + ";" + systemAction.getKey() + ";";
			//Make different profile key for toolbar with enabled/disabled actions
			if (systemAction.isDisabled())
				result += "isDisabled='true';";
		});
	});

	return result;
}

/**
 * Invoke actions when toolbarbuttons gets clicked.
 * @implements {IActionListener}
 * @overloads {Binding#handleAction}
 * @param {Action} action
 */
SystemToolBarBinding.prototype.handleAction = function ( action ) {

	SystemToolBarBinding.superclass.handleAction.call ( this, action );

	switch ( action.type ) {
		case ButtonBinding.ACTION_COMMAND :
			var button = action.target;
			this._handleSystemAction ( button.associatedSystemAction );
			break;
	}
}

/**
 * Handle system-action.
 * @param (SystemAction} action
 */
SystemToolBarBinding.prototype._handleSystemAction = function ( action ) {

	if ( action != null ) {
		SystemAction.invoke(action, this._node);
	}
}

/**
 * Build left-aligned toolbar content based on last published actionProfile.
 */
SystemToolBarBinding.prototype.buildLeft = function () {

	if (this.isInitialized && this._actionProfile != null && this._actionProfile.hasEntries()) {

		var doc = this.bindingDocument;
		var self = this;

		var popupSetBinding = PopupSetBinding.getPopupSet(doc, "bundlepopup");
		var bundles = new Map();

		this._actionProfile.each ( function ( groupid, list ) {

			var buttons = new List ();

			list.reset ();
			while ( list.hasNext ()) {
				var action = list.getNext ();
				var buttonBinding = null;

				if ( action.isInToolBar ()) {
					var bundleName = action.getBundleName();
					if (bundleName) {

						var popupBinding;

						if (bundles.has(bundleName)) {
							popupBinding = popupSetBinding.getPopupByRel(bundleName);

						} else {
							buttonBinding = ToolBarComboButtonBinding.newInstance(doc);
							buttonBinding.setProperty("bundle", bundleName);
							buttonBinding.setProperty("keepstate", this._keepBundleState);
							bundles.set(bundleName, buttonBinding);
							popupBinding = popupSetBinding.createNewPopupByRel(bundleName);
							popupBinding.showTextOnly();
						}

						var item = SystemTreePopupBinding.prototype.getMenuItemBinding.call(this, action);

						popupBinding.add(
							item
						);
						item.attach();
						item.menuHandle = action.getHandle();

					} else {
						buttonBinding = self.getToolBarButtonBinding(action);
					}
				}
				if ( buttonBinding != null ) {
					buttons.add ( buttonBinding );
				}
			}

			if ( buttons.hasEntries ()) {
				var groupBinding = ToolBarGroupBinding.newInstance ( doc );
				buttons.each ( function ( buttonBinding ) {
					groupBinding.add ( buttonBinding );
				});
				self.addLeft ( groupBinding ); // TODO: BOOLEAN ARGUMENT HERE!
			}
		}, this);

		this.attachRecursive();

		bundles.each(function(bundle, buttonBinding) {
			buttonBinding.setPopup(popupSetBinding.getPopupByRel(bundle));
		});
		this._containAllButtons ();
	}
}

/**
 * Contain all buttons. Overflowing buttons are moved to a popup.
 */
SystemToolBarBinding.prototype._containAllButtons = function () {

    var mores = this.bindingWindow.bindingMap.moreactionstoolbargroup;
    var paddings = CSSComputer.getPadding(this.bindingElement);
    var avail = this.bindingElement.offsetWidth - paddings.left - paddings.right;
 	if (Localization.isUIRtl) {
 		avail = this.bindingElement.offsetWidth - paddings.left - paddings.right;
	}

	if (avail <= 0)
		return;

	var total = 0;
	var hides = new List ();

	var button, buttons = this._toolBarBodyLeft.getDescendantBindingsByLocalName ( "toolbarbutton" );
	while (( button = buttons.getNext ()) != null ) {
		if ( !button.isVisible ) {
			button.show ();
		}
		var margin = CSSComputer.getMargin(button.bindingElement);
		total += button.boxObject.getDimension().w + margin.left + margin.right;
		if (total >= avail || (total + this._moreActionsWidth >= avail && buttons.hasNext())) {
			hides.add ( button );
			button.hide ();
		}
	}

	if ( hides.hasEntries ()) {

		var group = hides.getFirst ().bindingElement.parentNode;
		UserInterface.getBinding ( group ).setLayout ( ToolBarGroupBinding.LAYOUT_LAST );

		this._moreActions = new List ();
		while (( button = hides.getNext ()) != null ) {
			if (button instanceof ToolBarComboButtonBinding) {
				button.getAssociatedSystemActions().each(function(associatedSystemAction) {
					this._moreActions.add(associatedSystemAction);
				}, this);
			} else {
				this._moreActions.add(button.associatedSystemAction);
			}
		}
		mores.show ();

	} else {
		this._moreActions = null;
		mores.hide ();
	}
}

/**
 * Show more actions.
 */
SystemToolBarBinding.prototype._showMoreActions = function () {

	if ( this._moreActions != null ) {
		var popup = this.bindingWindow.bindingMap.moreactionspopup;
		popup.empty ();
		while (( action = this._moreActions.getNext ()) != null ) {
			var item = MenuItemBinding.newInstance(popup.bindingDocument);

			SystemTreePopupBinding.prototype.setSystemAction.call(this, item, action);
			popup.add ( item );
		}
		popup.attachRecursive ();
		this._moreActions = null;
	}
}

/**
 * This method is mirrored by the explorer popupmenu - please coordinate changes.
 * @see {SystemPopupBinding#getMenuItemBinding}
 * @param {SystemAction} action
 * @return {ToolBarButtonBinding}
 */
SystemToolBarBinding.prototype.getToolBarButtonBinding = function ( action) {

	var binding		= ToolBarButtonBinding.newInstance ( this.bindingDocument );
	var label 		= action.getLabel ();
	var tooltip		= action.getToolTip ();
	var image 		= action.getImage ();
	var isDisabled	= action.isDisabled ();

	if (image) {
		binding.setImage(image);
	}
	if ( label ) {
		binding.setLabel ( label );
	}
	if ( tooltip ) {
		binding.setToolTip ( tooltip );
	}
	if ( action.isDisabled ()) {
		binding.disable ();
	}

	/*
	 * Stamp the action as a property on the buttonbinding
	 * so that we can retrieve it when the button is clicked.
	 */
	binding.associatedSystemAction = action;

	return binding;
};


/**
 * Invoke default action. Currently, this is the action
 * associated to the first toolbarbutton on display.
 * @return
 */
SystemToolBarBinding.prototype._invokeDefaultAction = function () {

	var button = this.getDescendantBindingByLocalName ( "toolbarbutton" );
	if ( button != null ) {
		button.fireCommand ();
	}
};


/**
* get activePosition.
* @return {int}
*/
SystemToolBarBinding.prototype.getActivePosition = function () {
	return this._activePosition;
};

/**
 * SystemToolBarBinding factory.
 * @param {DOMDocument} ownerDocument
 * @return {SystemToolBarBinding}
 */
SystemToolBarBinding.newInstance = function ( ownerDocument ) {

	var element = DOMUtil.createElementNS ( Constants.NS_UI, "ui:toolbar", ownerDocument );
	return UserInterface.registerBinding ( element, SystemToolBarBinding );
}


/**
 * @param {Point} point
 */
SystemToolBarBinding.prototype.setPosition = function (point) {

	this.bindingElement.style.left = point.x + "px";
	this.bindingElement.style.top = point.y + "px";
}

/**
 * @param {Dimension} dimension
 */
SystemToolBarBinding.prototype.setDimension = function (dimension) {

	dimension.h -= ViewBinding.VERTICAL_ADJUST;
	dimension.w -= ViewBinding.HORIZONTAL_ADJUST;

	/*
	 * Something hardcoded here...
	 */
	dimension.w -= 1;

	if (dimension.h < 0) { // not sure why this happens...
		dimension.h = 0;
	}
	if (dimension.w < 0) {
		dimension.w = 0;
	}
	this.bindingElement.style.width = String(dimension.w) + "px";
	this.bindingElement.style.height = String(dimension.h) + "px";
}

/**
 * set SyncHandle
 * @param {string} dimensionsyncHandle
 */
SystemToolBarBinding.prototype.setSyncHandle = function (syncHandle) {
	this._syncHandle = syncHandle;

}

/**
 * get SyncHandle
 */
SystemToolBarBinding.prototype.getSyncHandle = function () {
	return this._syncHandle;

}