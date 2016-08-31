SystemTreeBinding.prototype = new TreeBinding;
SystemTreeBinding.prototype.constructor = SystemTreeBinding;
SystemTreeBinding.superclass = TreeBinding.prototype;

/**
 * Flag determines whether or not treebranches should always
 * refresh when the parent folder is closed and reopened.
 * @type {boolean}
 */
SystemTreeBinding.HAS_NO_MEMORY = false;

/**
 * @type {SystemTreeNodeBinding}
 */
SystemTreeBinding.clipboard = null;

/**
 * @type {string}
 */
SystemTreeBinding.clipboardOperation = null;

/*
 * Detailed paste dialog.
 */
SystemTreeBinding.URL_DIALOG_DETAILEDPASTE = "${root}/content/dialogs/systemtrees/detailedpaste.aspx";

/**
 * @class
 */
function SystemTreeBinding() {

	/**
	 * @type {SystemLogger}
	 */
	this.logger = SystemLogger.getLogger("SystemTreeBinding");

	/**
	 * Associates the tree to the selected perspective.
	 * @type {SystemNode}
	 */
	this.perspectiveNode = null;

	/**
	 * @type {SystemTreeNodeBinding}
	 */
	this._defaultTreeNode = null;

	/**
	 * Publishing actionprofiles when treenodes get selected?
	 * If set to false, no commands will be relayed to main toolbar.
	 * TODO: Filter commands on server instead!
	 * @type {boolean}
	 */
	this._isActionProfileAware = true;

	/**
	* Tree position
	* @type {int}
	*/
	this._activePosition = SystemAction.activePositions.NavigatorTree;

	/**
	 * @type {HashMap<string><boolean>}
	 */
	this._actionGroup = null;

	/**
	 * This can be deprecated if we implement serverside treenode selection.
	 * @type {string}
	 */
	this._backupfocushandle = null;

	/**
	 * This can be deprecated if we implement serverside treenode selection.
	 * @type {SystemTreeNodeBinding}
	 */
	this._tempSelectedNode = null;

	/**
	 * This can be deprecated if we implement serverside treenode selection.
	 * @type {boolean}
	 */
	this._tempSelectionTimeout = false;

	/**
	 * While this._treeNodeBindings index treenodes by unique handle (ElementKey),
	 * this will index groups of treenodes sharing the same EntityToken.
	 * @type {Map<string><List<SystemTreeNodeBinding>>}
	 */
	this._entityTokenRegistry = null;

	/**
	 * Counting refreshing treenodes so that we may poke the MessageQueue
	 * once all nodes are finished (some timeouts involved here).
	 * @type {Map<string><boolean>}
	 */
	this._refreshingTreeNodes = null;

	/**
	 * When the tree is refreshed by MessageQueue, this stores the refreshtoken.
	 * @type {string}
	 */
	this._refreshToken = null;

	/**
	 * Lock tree to editor?
	 * @type {boolean}
	 */
	this.isLockedToEditor = false;

	/**
	 * Points to the last treenode that was blurred in an
	 * attempt, always to offer a sensible treenode focus.
	 * @type {string}
	 */
	this._restorableFocusHandle = null;
}



/**
 * Identifies binding.
 */
SystemTreeBinding.prototype.toString = function () {

	return "[SystemTreeBinding]";
}

/**
 * @overloads {TreeBinding#onBindingRegister}
 */
SystemTreeBinding.prototype.onBindingRegister = function () {

	SystemTreeBinding.superclass.onBindingRegister.call(this);

	/*
	 * Mark the tree as resident on the currently selected perspective.
	 */
	this.perspectiveNode = StageBinding.perspectiveNode;

	/*
	 * File subscriptions.
	 */
	this.subscribe(BroadcastMessages.SYSTEMTREEBINDING_REFRESH);
	this.subscribe(BroadcastMessages.SYSTEMTREEBINDING_FOCUS);
	this.subscribe(BroadcastMessages.SYSTEMTREEBINDING_CUT);
	this.subscribe(BroadcastMessages.SYSTEMTREEBINDING_COPY);
	this.subscribe(BroadcastMessages.SYSTEMTREEBINDING_PASTE);
	this.subscribe(BroadcastMessages.SYSTEMTREEBINDING_COLLAPSEALL);
	this.subscribe(BroadcastMessages.DOCKTABBINDING_SELECT);
	this.subscribe(BroadcastMessages.STAGEDIALOG_OPENED);

	/*
	 * Init stuff.
	 */
	this.addActionListener(SystemTreeNodeBinding.ACTION_REFRESHED_YEAH);
	this.addActionListener(TreeNodeBinding.ACTION_COMMAND);
	this._entityTokenRegistry = new Map();
	this._refreshingTreeNodes = new Map();

	/*
	 * Should tree selection update top toolbar?
	 */
	if (this.getProperty("actionaware") == false) {
		this._isActionProfileAware = false;
	} else {
		this.setContextMenu(top.app.bindingMap.systemtreepopup);
	}


	if (this.getProperty("treeselector") == true) {
		this._activePosition = SystemAction.activePositions.SelectorTree;
	}


	/*
	 * Setup lock-to-editor.
	 */
	if (this.getProperty("locktoeditor") != null) {
		this.isLockedToEditor = this.getProperty("locktoeditor");
	}
}

/**
 * Register the first added treenode so that we can focus it when tree is ready.
 * @overloads {TreeBinding#add}
 * @param {Binding} binding
 * @return {Binding}
 */
SystemTreeBinding.prototype.add = function (binding) {

	var returnable = SystemTreeBinding.superclass.add.call(this, binding);
	if (this._defaultTreeNode === null) {
		if (binding instanceof SystemTreeNodeBinding) {
			this._defaultTreeNode = binding;
		}
	}
	return returnable;
}

/**
 * @implements {IActionListener}
 * @overloads {TreeBinding#handleAction}
 * @param {Action} action
 */
SystemTreeBinding.prototype.handleAction = function (action) {

	SystemTreeBinding.superclass.handleAction.call(this, action);

	var binding = action.target;

	switch (action.type) {

		/*
		* Publish actionprofile when selection changes.
		*/
		case TreeNodeBinding.ACTION_ONFOCUS:
		case TreeNodeBinding.ACTION_ONMULTIFOCUS:
			this._restorableFocusHandle = null;
			//this._handleSystemTreeFocus();  //Dublicate with parent
			break;

			/**
			* Broadcast when treenodes are finished refreshing.
			* This is intercepted by the MessageQueue.
			*/
		case SystemTreeNodeBinding.ACTION_REFRESHED_YEAH:

			this._updateRefreshingTrees(binding.key);
			this._updateFocusedNode();
			action.consume();
			break;

		case TreeNodeBinding.ACTION_DISPOSE:
		case TreeNodeBinding.ACTION_BLUR:

			/*
			* This should probably be refactored along with the whole
			* _focusedTreeNodeBindings setup, but at least we clear
			* the toolbar when tree has no focused nodes...
			*/
			var self = this;
			setTimeout(function () {
				if (!self._focusedTreeNodeBindings.hasEntries()) {
					EventBroadcaster.broadcast(
						BroadcastMessages.SYSTEM_ACTIONPROFILE_PUBLISHED,
						{ position: self._activePosition }
					);
				}
			}, 0);

			/*
			* Backup the node that blurred. This will allow us to
			* focus an appropriate treenode on tree focus, even
			* when some feature destroyed all tree selection.
			* @see {SystemTreeBinding#focus}
			*/
			if (action.type == TreeNodeBinding.ACTION_BLUR) {
				this._restorableFocusHandle = binding.getHandle();
			}
			break;

		case TreeNodeBinding.ACTION_COMMAND:
			EventBroadcaster.broadcast(BroadcastMessages.INVOKE_DEFAULT_ACTION, { syncHandle: this.getSyncHandle()});
			action.consume();
			break;
	}
}

///**
// * @overloads {TreeBinding#focus}
// */
//SystemTreeBinding.prototype.focus = function () {

//	SystemTreeBinding.superclass.focus.call(this);
//	if (this.isFocused) {
//		this._handleSystemTreeFocus();
//	}
//}

/**
 * Default focus action - focus LAST FOCUSED node in tree.
 * @overwrites {TreeBinding#_focusDefault}
 */
SystemTreeBinding.prototype._focusDefault = function () {

	this._attemptRestorableFocus();
	if (!this.getFocusedTreeNodeBindings().hasEntries()) {
		SystemTreeBinding.superclass._focusDefault.call(this);
	}
}


/**
 * Return perspective handle for tree
 */
SystemTreeBinding.prototype.getSyncHandle = function () {

	if (this.getProperty("treeselector") == true) {
		return this.getAncestorBindingByType(PageBinding).getID();
	} else {
		return this.perspectiveNode.getHandle();
	}

}


/**
 * By now, something has probably eliminated all tree focus. But since
 * we back up the last blurred node, we can restore a sensible focus.
 */
SystemTreeBinding.prototype._attemptRestorableFocus = function () {

	if (this._treeNodeBindings.has(this._restorableFocusHandle)) {
		var treenode = this._treeNodeBindings.get(this._restorableFocusHandle);
		this.focusSingleTreeNodeBinding(treenode);
	}
	this._restorableFocusHandle = null;
}

/**
 * Invoked when tree focus changes AND when tree itself recieves the focus
 * AND when lock-tree-to-editor feature updates the treenode focus.
 */
SystemTreeBinding.prototype._handleSystemTreeFocus = function () {

	if (this.getFocusedTreeNodeBindings().hasEntries()) {
		this._computeClipboardSetup();
		this._computeRefreshSetup();
		if (this._isActionProfileAware) {
			EventBroadcaster.broadcast(
				BroadcastMessages.SYSTEM_ACTIONPROFILE_PUBLISHED,
				{
					activePosition: this._activePosition,
					actionProfile: this.getCompiledActionProfile(),
					syncHandle: this.getSyncHandle(),
					source: this
				}
			);
		}
	}
}

/**
 * @param {SystemTreeNodeBinding} treenode
 */
SystemTreeBinding.prototype.getTokens = function (treenode) {

	return treenode.node.getEntityTokens();
}

/**
 * Register treenode.
 * @param {SystemTreeNodeBinding} treenode
 */
SystemTreeBinding.prototype.registerTreeNodeBinding = function (treenode) {

	treenode.getHandles().each(function(handle) {
		if (this._treeNodeBindings.has(handle)) {
			throw "Duplicate treenodehandles registered: " + treenode.getLabel();
		} else {
			this._treeNodeBindings.set(handle, treenode);
			var map = this._openTreeNodesBackupMap;
			if (map != null && map.has(handle)) {
				treenode.open();
			}
		}
	}, this);

	/*
	 * Update entityToken registry so that we may quickly
	 * find the treenode(s) based on this property.
	 */
	var reg = this._entityTokenRegistry;
	this.getTokens(treenode).each(function (token) {

		if (reg.has(token)) {
			reg.get(token).add(treenode);
		} else {
			reg.set(token, new List([treenode]));
		}
	}, this);

	var token = treenode.node.getEntityToken();


	/*
	 * This will attempt to restore treenode selection when tree is refreshed.
	 */
	var focusnode = null;
	if (this.isLockedToEditor) {

		/*
		 * Treenode re-focus should be determined by the
		 * entityToken of the selected DockTabBinding.
		 * Note that unlike the handle (the ElementKey), an
		 * entityToken may occur multiple times in the same tree.
		 */
		if (token == StageBinding.entityToken) {
			if (treenode.node.isTreeLockEnabled()) {
				focusnode = treenode;
			}
		}

	} else {

		/*
		 * Treenode gets focused when it matches a previously
		 * unregistered, focused treenode.
		 * @see {SystemTreeBinding#unRegisterTreeNodeBinding}
		 */
		if (this._backupfocushandle != null) {
			if (this._backupfocushandle == treenode.node.getHandle()) {
				focusnode = treenode;
			}
		}
	}

	/*
	 * If found, focus the treenode.
	 */
	if (focusnode != null) {
		this.focusSingleTreeNodeBinding(focusnode);
	}
}

/**
 * Unregister treenode. If no selected treenodes are left after whatever operation
 * occurred, we empty the toolbar and contextmenu. This should be considered a
 * temporary hack until we implement serverside treeselection.
 * @overloads {TreeBinding#unRegisterTreeNodeBinding}
 * @param {SystemTreeNodeBinding} treeNodeBinding
 */
SystemTreeBinding.prototype.unRegisterTreeNodeBinding = function (treenode) {

	treenode.getHandles().each(function(handle) {
		this._treeNodeBindings.del(handle);
	}, this);

	/*
	 * Unregister from entityToken registry.
	 */
	var reg = this._entityTokenRegistry;
	this.getTokens(treenode).each(function (token) {

		if (reg.has(token)) {
			var list = reg.get(token);
			list.del(treenode);
			if (!list.hasEntries()) {
				reg.del(token);
			}
		} else {
			this.logger.fatal("SystemTreeBinding out of synch: unRegisterTreeNodeBinding");
			if (Application.isDeveloperMode) {
				Dialog.error("Attention Developer", "Tree is out of synch. Please reproduce this bug and file a report.");
			}
		}
	}, this);

	/*
	 * This relates to the treenode re-selection hack.
	 * @see {SystemTreeBinding#registerTreeNodeBinding}
	 */
	if (!this.isLockedToEditor) {
		if (treenode.isFocused && this._backupfocushandle == null) {
			this._backupfocushandle = treenode.node.getHandle();
			var self = this;
			setTimeout(function () {
				self._backupfocushandle = null;
			}, 200);
		}
	}
}

/**
 * Refreshing treenodes count at zero?
 * @param {String} key
 */
SystemTreeBinding.prototype._updateRefreshingTrees = function (key) {

	var trees = this._refreshingTreeNodes;

	if (trees.hasEntries() && trees.has(key)) {
		trees.del(key);
		if (!trees.hasEntries()) {
			EventBroadcaster.broadcast(
				BroadcastMessages.SYSTEMTREEBINDING_REFRESHED, this._refreshToken
			);
			this._refreshToken = null;
			this._attemptRestorableFocus();

			EventBroadcaster.broadcast(
				BroadcastMessages.SYSTEMTREEBINDING_REFRESHED_AFTER, { syncHandle: this.getSyncHandle() }
			);

		}
	}
};

/**
* Update focused node based on selected Tab
* @param {String} key
*/
SystemTreeBinding.prototype._updateFocusedNode = function () {
	if (!this._focusedTreeNodeBindings.hasEntries() && this._activePosition != SystemAction.activePositions.SelectorTree) {
		var token = StageBinding.entityToken;
		if (token != null) {
			this._focusTreeNodeByEntityToken(token);
		}
	}
};

/**
 * Enable contextmenu cut and paste?
 */
SystemTreeBinding.prototype._computeClipboardSetup = function () {

	var isCutAllowed = false;
	var focusedBindings = this.getFocusedTreeNodeBindings();
	if (this._activePosition == SystemAction.activePositions.SelectorTree) {
		isCutAllowed = false;
	}
	else if (focusedBindings.hasEntries()) {
		isCutAllowed = true;
		while (isCutAllowed && focusedBindings.hasNext()) {
			var binding = focusedBindings.getNext();
			if (!binding.isDraggable) {
				isCutAllowed = false;
			}
		}
	}
	SystemTreePopupBinding.isCutAllowed = isCutAllowed;
}

/**
 * Disabling refresh when clipboard is full. Otherwise, a refresh may cause tests
 * for treenode nesting to be corrupted; and parents can be moved to children nodes.
 * TODO: Fix nesting test instead?
 */
SystemTreeBinding.prototype._computeRefreshSetup = function () {

	SystemTreePopupBinding.isRefreshAllowed = SystemTreeBinding.clipboard === null;
}

/**
 * Implements {IBroadcastListener}
 * @param {string} broadcast
 * @param {object} arg
 */
SystemTreeBinding.prototype.handleBroadcast = function (broadcast, arg) {

	SystemTreeBinding.superclass.handleBroadcast.call(this, broadcast, arg);

	/**
	* Doublecheck that this tree is actually focused. Although if
	* the server transmits a refresh signal, this is not required.
	*/
	switch (broadcast) {

		case BroadcastMessages.SYSTEMTREEBINDING_REFRESH:
			if (arg != null || this.isFocused) { // arg is only provided when server is refreshing!
				this._handleCommandBroadcast(broadcast, arg);
			}
			break;

		case BroadcastMessages.SYSTEMTREEBINDING_CUT:
		case BroadcastMessages.SYSTEMTREEBINDING_COPY:
		case BroadcastMessages.SYSTEMTREEBINDING_PASTE:
			if (this.isFocused) {
				this._handleCommandBroadcast(broadcast);
			}
			break;

		case BroadcastMessages.SYSTEMTREEBINDING_COLLAPSEALL:
			this.collapse(true);
			break;

		case BroadcastMessages.DOCKTABBINDING_SELECT:
			if (this.isLockedToEditor) {
				var tab = arg;
				//TODO: check this
				if (tab.getHandle() != "Composite.Management.Explorer") { // the tree dock!
					this._handleDockTabSelect(tab);
				}
				// TODO: Othwise attempt restore focus!!!!!!!!!!!!!!!!!!!!!
			}
			break;

		case BroadcastMessages.STAGEDIALOG_OPENED:
			if (this.isLockedToEditor) {
				this.blurSelectedTreeNodes();
			}
			EventBroadcaster.broadcast(BroadcastMessages.SYSTEM_ACTIONPROFILE_PUBLISHED, { activePosition: this._activePosition });
			break;
		case BroadcastMessages.SYSTEMTREEBINDING_FOCUS:
			if (StageBinding.perspectiveNode === this.perspectiveNode) {
				var self = this, token = arg;
				setTimeout(function() { // timeout to minimize freezing sensation
					if (token != null) {
						self._focusTreeNodeByEntityToken(token);
					}
				}, 250); // zero not always enough...
			}
			break;
	}
}

/**
 * A tab was activated somewhere on screen. This should
 * update tree selection and thus toolbar actions.
 * @param {DockTabBinding} tab
 */
SystemTreeBinding.prototype._handleDockTabSelect = function (tab) {

	/*
	 * Is the activated tab visible on screen?
	 */
	var isVisible = tab.perspectiveNode == null;
	if (!isVisible) {
		isVisible = tab.perspectiveNode == this.perspectiveNode;
	}

	/*
	 * If the tab was launched by the server, there is a chance we might
	 * find a matching treenode.
	 */
	if (isVisible) {

		if (tab.isExplorerTab) {
			var token = this.getHandleToken();
			var self = this;
			this.setHandleToken(null);
			var selectedTreeNode = this.getFocusedTreeNodeBindings().getFirst();
			if (selectedTreeNode && selectedTreeNode.node.getEntityToken() === token) {
				EventBroadcaster.broadcast(
					BroadcastMessages.SYSTEMTREENODEBINDING_FOCUS,
					selectedTreeNode
				);
			} else {
				setTimeout(function () { // timeout to minimize freezing sensation
					if (token != null) {
						self._focusTreeNodeByEntityToken(token);
					}
				}, 250); // zero not always enough...
			}
		}
		else {
			this.setHandleToken(tab.getEntityToken());
		}

	}
}

SystemTreeBinding.prototype.setHandleToken = function (token) {

	this._handleToken = token;
}

SystemTreeBinding.prototype.getHandleToken = function () {

	return this._handleToken;
}


/**
 * Focus the first encountered treenode with a given entityToken
 * in support of the lock-tree-to-editor feature.
 * @param {string} entityToken
 * @param {boolean} isSecondAttempt Discourage endless looping
 * @return
 */
SystemTreeBinding.prototype._focusTreeNodeByEntityToken = function (entityToken, isSecondAttempt) {

	/*
	 * Let's find the treenode to focues...
	 */
	var treenode = null;

	/*
	 * Note that we simply select the first available treenode with the given
	 * entityToken MARKED AS FOCUSABLE. This may not be the best, though...
	 */
	if (this._entityTokenRegistry.has(entityToken)) {
		var list = this._entityTokenRegistry.get(entityToken);
		list.each(function (tn) {
			var result = true;
			if (tn.node.isTreeLockEnabled()) {
				treenode = tn;
				result = false;
			}
			return result;
		});
		if (treenode != null) {

			if (!treenode.isFocused || treenode.node.getEntityToken() !== entityToken) {
				treenode.selectToken(entityToken);
				this.focusSingleTreeNodeBinding(treenode, true);
			} else {
				treenode.dispatchAction(TreeNodeBinding.ACTION_FOCUSED); // to reveal it!
			}
		}
	}

	/*
	 * But if no focusable treenode was found, we ask the server for more treenodes.
	 */
	if (treenode == null && isSecondAttempt != true) {

		Application.lock(this);
		StatusBar.busy();

		/*
		 * We timeout to lock the GUI while tree is refreshed; this can take some time.
		 */
		var self = this;
		setTimeout(function() {
			if (Binding.exists(self)) {
				self._fetchTreeForEntityToken(entityToken);
				self._focusTreeNodeByEntityToken(entityToken, true); // do it again!
			}
			Application.unlock(self);
			StatusBar.clear();
		}, 0);
	} else if (treenode == null) {
		this.getFocusedTreeNodeBindings().each(function(binding) {
			binding.blur();
		});
		EventBroadcaster.broadcast(BroadcastMessages.SYSTEM_ACTIONPROFILE_PUBLISHED, { activePosition: this._activePosition, syncHandle: this.getSyncHandle() });
	}
}

/**
 * Query the TreeService for a structure that exposes a given entityToken.
 * @param {string} entityToken
 */
SystemTreeBinding.prototype._fetchTreeForEntityToken = function (entityToken) {

	/*
	* Summon fresh nodes from server.
	*/
	var perspectiveEntityTokens = new List();
	if (this._activePosition == SystemAction.activePositions.SelectorTree) {
		var rootTreeNodeBindings = this.getRootTreeNodeBindings();
		while (rootTreeNodeBindings.hasNext()) {
			var rootTreeNodeBinding = rootTreeNodeBindings.getNext();
			perspectiveEntityTokens.add(rootTreeNodeBinding.node.getEntityToken());
		}
	}
	else {
		perspectiveEntityTokens.add(StageBinding.perspectiveNode.getEntityToken());
	}

	while (perspectiveEntityTokens.hasNext()) {
		var perspectiveEntityToken = perspectiveEntityTokens.getNext();
		var openSystemNodes = this.getOpenSystemNodes();
		var map = System.getInvisibleBranch(
			perspectiveEntityToken,
			entityToken,
			openSystemNodes
		);

		/*
		* If server goofed up, we quickly disable the lock-tree-to-editor feature.
		*/
		if (map == null) {
			this.isLockedToEditor = false;
			if (Application.isDeveloperMode) {
				Dialog.warning("Ouch!",
					"Because the web service failed, tree has disabled the lock-tree-to-editor " +
					"feature. Otherwise, re-focus would fire the error indefinitely. Please try again."
				);
			}
		}

			/*
			* Controversially, the TreeService exposes no nested tree
			* structure, so the parsing code can get a little complicated.
			*/
		else if (map.hasEntries()) {

			var self = this;
			var oldnodes = this._treeNodeBindings;
			var newnodes = new Map();

			/*
			* Handy treenodebuilder function.
			* @param {TreeNodeBinding} treenode
			* @param {List<SystemNode>} list
			*/
			function fix(treenode, list) {

				if (!treenode.hasBeenOpened) { // true when a refresh is needed, even for old nodes...
					if (list.hasEntries()) {

						/*
						* TODO: Since the oldnodes check is needed here,
						* do we risk fogging up the display order of nodes?
						*/
						list.each(function (node) {
							if (!oldnodes.has(node.getHandle())) {
								var newnode = SystemTreeNodeBinding.newInstance(node, self.bindingDocument);
								newnodes.set(node.getHandle(), newnode);
								treenode.add(newnode);
							}
						});
						treenode.attachRecursive();
					}
				}
				treenode.open(true); // open node (without causing a new refresh!)
			}

			/*
			* Iterate map, building treenodes. Fortunately,
			* each sequential entry in the map lists nodes that
			* must be appended to a *previously* build node...
			*/
			map.each(function (handle, list) {
				if (oldnodes.has(handle)) {
					var oldnode = oldnodes.get(handle);
					fix(oldnode, list);
				} else {
					if (newnodes.has(handle)) {
						var newnode = newnodes.get(handle);
						fix(newnode, list);
					} else {
						// we seem to have encountered a strange hole in the structure
					}
				}
			});
		}
	}
}

/**
 * Handle tree command.
 * @param {string} broadcast
 * @param {object} arg
 */
SystemTreeBinding.prototype._handleCommandBroadcast = function (broadcast, arg) {

	switch (broadcast) {

		/*
		 * Note that this broadcast can also be intercepted by the
		 * {@link SystemPageBinding} in order to refresh the tree root.
		 */
		case BroadcastMessages.SYSTEMTREEBINDING_REFRESH:

			/*
			 * If arg is present, it implies that MessageQueue invoked the refresh.
			 * Otherwise the action was instantiated by the user (eg contextmenu).
			 */
			var token = arg;
			if (token != null) {
				this._invokeServerRefresh(token);
			} else {
				this._invokeManualRefresh();
			}
			break;

			/*
			 * TODO: support multiple selections!
			 */
		case BroadcastMessages.SYSTEMTREEBINDING_CUT:
			if (SystemTreeBinding.clipboard != null) {
				SystemTreeBinding.clipboard.hideDrag();
			}
			var treenode = this.getFocusedTreeNodeBindings().getFirst();
			SystemTreeBinding.clipboardOperation = SystemTreePopupBinding.CMD_CUT;
			SystemTreeBinding.clipboard = treenode;
			treenode.showDrag();
			break;

			/*
			 * TODO: support multiple selections!
			 */
		case BroadcastMessages.SYSTEMTREEBINDING_COPY:
			var treenode = this.getFocusedTreeNodeBindings().getFirst();
			SystemTreeBinding.clipboardOperation = SystemTreePopupBinding.CMD_COPY;
			SystemTreeBinding.clipboard = treenode;
			break;

		case BroadcastMessages.SYSTEMTREEBINDING_PASTE:
			this._handlePaste();
			break;
	}
}

/**
 * Invoke server refresh. This was probably caused by the MessageQueue.
 * @param {string} token
 */
SystemTreeBinding.prototype._invokeServerRefresh = function (token) {

	if (token != null && token == "null") {
		if (Application.isDeveloperMode) {
			alert("Saa har vi balladen.");
		}
	}

	if (this._entityTokenRegistry.has(token)) {

		var list = this._entityTokenRegistry.get(token).reset();

		/*
		 * Broadcast instructs the MessageQueue to delay
	 	 * action execution until tree is refreshed.
	 	 */
		this._refreshToken = token;
		EventBroadcaster.broadcast(BroadcastMessages.SYSTEMTREEBINDING_REFRESHING, this._refreshToken);

		while (list.hasNext()) {
			var treenode = list.getNext();
			this._refreshingTreeNodes.set(treenode.key, true);

			/*
			 * Push to next thread in order to give MessageQueue a chance
			 * to detect whether or not any trees are actually refreshing
			 * (because if not, it needs to execute the next action now).
			 */
			setTimeout(function () {
				treenode.refresh(true);
			}, 0);
		}
	}
}


/**
 * Invoke manual refresh. This was probably caused
 * by user clicking the contextmenu refresh item.
 * Note that we actually refresh the PARENT treenode.
 * @param {string} token
 */
SystemTreeBinding.prototype._invokeManualRefresh = function () {

	var treenode = this.getFocusedTreeNodeBindings().getFirst();
	if (treenode) {
		var label = treenode.getLabel();
		var parent = treenode.getAncestorBindingByLocalName("treenode");
		if (parent) {
			treenode = parent; // because the treenode itself may have changed!
		}
		this._refreshToken = null;
		this._refreshingTreeNodes.set(treenode.key, true);
		EventBroadcaster.broadcast(BroadcastMessages.SYSTEMTREEBINDING_REFRESHING, null);
		if (!StatusBar.state) {
			var message = StringBundle.getString("ui", "Website.App.StatusBar.Refreshing");
			StatusBar.busy(message, [label]);
		}
		treenode.refresh();
	}
}

/**
 * Handle paste.
 */
SystemTreeBinding.prototype._handlePaste = function () {

	var treenode = SystemTreeBinding.clipboard;

	if (treenode) {

		/*
		 * TODO: ALLOW MULTIPLE!!!!
		 */
		var type = treenode.dragType;
		var focused = this.getFocusedTreeNodeBindings().getFirst();
		if (focused.dragAccept) {
			if (focused.acceptor.isAccepting(type)) {
				this._performPaste(focused);
			} else {
				Dialog.message(
					StringBundle.getString("ui", "Website.Misc.Trees.DialogTitle.PasteTypeNotAllowed"),
					StringBundle.getString("ui", "Website.Misc.Trees.DialogText.PasteTypeNotAllowed")
				);
			}
		} else {
			Dialog.message(
				StringBundle.getString("ui", "Website.Misc.Trees.DialogTitle.PasteNotAllowed"),
				StringBundle.getString("ui", "Website.Misc.Trees.DialogText.PasteNotAllowed")
			);
		}
	}
}

/**
 * Perform paste (then refresh the MessageQueue).
 * @param {SystemTreeNodeBinding} treenode
 */
SystemTreeBinding.prototype._performPaste = function (treenode) {

	var self = this;

	function update() {
		MessageQueue.update();
		Application.unlock(self);
	}

	if (treenode.node.hasDetailedDropSupport()) {
		if (treenode.node.hasChildren()) {
			var argument = treenode.node.getChildren();
			Dialog.invokeModal(SystemTreeBinding.URL_DIALOG_DETAILEDPASTE, {
				handleDialogResponse: function (response, result) {
					if (response == Dialog.RESPONSE_ACCEPT) {
						Application.lock(self);
						var position = result.get("switch");
						var index = result.get("sibling");
						if (position == "after") {
							index++;
						}
						var isAccept = treenode.accept(SystemTreeBinding.clipboard, index);
						if (isAccept) {
							SystemTreeBinding.clipboard = null;
							SystemTreeBinding.clipboardOperation = null;
							setTimeout(update, 0);
						} else {
							update();
						}
					}
				}
			}, argument);
		} else {
			Application.lock(self);
			var isAccept = treenode.accept(SystemTreeBinding.clipboard, 0);
			if (isAccept) {
				SystemTreeBinding.clipboard = null;
				SystemTreeBinding.clipboardOperation = null;
				setTimeout(update, 0);
			} else {
				update();
			}
		}
	} else {
		Application.lock(self);
		var isAccept = treenode.accept(SystemTreeBinding.clipboard, 0);
		if (isAccept) {
			SystemTreeBinding.clipboard = null;
			SystemTreeBinding.clipboardOperation = null;
		}
		update();
	}
}

/**
 * Focus the first treenode. This should only be called once.
 */
SystemTreeBinding.prototype.selectDefault = function () {
	if (this._defaultTreeNode !== false) {
		var defaultEntityToken = System.getDefaultEntityToken(this.perspectiveNode.getEntityToken());
		if (defaultEntityToken != null) {
			this._focusTreeNodeByEntityToken(defaultEntityToken);
		} else if (this._defaultTreeNode) {
			this._defaultTreeNode.focus();
			if (this._defaultTreeNode.isContainer && !this._defaultTreeNode.isOpen) {
				this._defaultTreeNode.open();
			}
			this._defaultTreeNode = null;
		} else {
			var node = this.getDescendantBindingByType(TreeNodeBinding);
			if (node) {
				node.focus();
			}
		}
	}
}

/**
 * Close tree (close root nodes and wipe their memory).
 * @overloads {TreeNodeBinding#collapse}
 * @param {boolean} isDestructive
 */
SystemTreeBinding.prototype.collapse = function (isDestructive) {

	EventBroadcaster.broadcast(BroadcastMessages.SYSTEM_ACTIONPROFILE_PUBLISHED, { activePosition: this._activePosition });

	if (isDestructive) {
		this.blurSelectedTreeNodes();
		var treenodes = this.getRootTreeNodeBindings();
		treenodes.each(function (treenode) {
			if (treenode.isContainer && treenode.isOpen) {
				treenode.close();
				treenode.hasBeenOpened = false;
				treenode.empty();
			}
		});
	} else {
		SystemTreeBinding.superclass.collapse.call(this);
	}
}

/**
 * Lock tree to editor?
 * @param {boolean} isLocked
 */
SystemTreeBinding.prototype.setLockToEditor = function (isLocked) {

	if (isLocked != this.isLockedToEditor) {
		this.isLockedToEditor = isLocked;
		if (isLocked) {
			EventBroadcaster.broadcast(BroadcastMessages.SYSTEMTREEBINDING_LOCKTOEDITOR);
		}
	}
}

/**
 * Get the list of all open nodes in this tree PLUS this tree node itself.
 * @list {List<SystemNode>}
 */
SystemTreeBinding.prototype.getOpenSystemNodes = function () {

	/*
	* Add perspective node, ie. this tree (since the
	* perspective corresponds to this tree in the hierarchy).
	*/
	var list = new List([StageBinding.perspectiveNode]);

	if (this._activePosition == SystemAction.activePositions.SelectorTree) {
		list = new List();
	}

	/*
	* Add open treenodes.
	*/
	var treenodes = this.getRootTreeNodeBindings();
	treenodes.each(function (treenode) {
		var opennodes = treenode.getOpenSystemNodes();
		if (opennodes != null && opennodes.hasEntries()) {
			list.merge(opennodes);
		}
		else if (treenode.isOpen) {
			list.add(treenode.node);
		}

	});

	return list;
};

/**
 * @overloads {TreeBinding#focusSingleTreeNodeBinding}
 * @param {TreeNodeBinding} binding;
 */
SystemTreeBinding.prototype.focusSingleTreeNodeBinding = function (binding) {

	SystemTreeBinding.superclass.focusSingleTreeNodeBinding.call(this, binding);
	if (binding != null) {
		this._handleSystemTreeFocus();
	}
};

/**
 * Set Action Profile Group
 * @param {function}
 */
SystemTreeBinding.prototype.setActionGroup = function (value) {


	if (value) {
		var list = new List(value.split(" "));
		this._actionGroup = {};
		while (list.hasNext()) {
			this._actionGroup[list.getNext()] = true;
		}
	}

}


/**
 * Compile actionprofile based on the individual actionprofile of all focused treenodes.
 * In case of multiple focused treenodes, only SystemActions relevant for *all* focused
 * treenodes will be included in the result.
 * @return {Map<string><List<SystemAction>>}
 */
SystemTreeBinding.prototype.getCompiledActionProfile = function () {

	var result = new Map();

	var focusedBinding = this.getFocusedTreeNodeBindings().getFirst();

	var actionProfile = focusedBinding.node.getActionProfile();

	if (actionProfile != null) {
		var self = this;
		actionProfile.each(
			function (groupid, list) {
				var newList = new List();
				list.each(function (systemAction) {
					if (systemAction.getActivePositions() & self._activePosition) {
						if (!self._actionGroup || self._actionGroup[systemAction.getGroupName()]) {
							newList.add(systemAction);
						}
					}
				});
				if (newList.hasEntries()) {
					result.set(groupid, newList);
				}
			}
		);
	}

	result.activePosition = this._activePosition;

	//TODO: remove using URI - obsolute
	var propertyBag = focusedBinding.node.getPropertyBag();
	if (propertyBag && propertyBag.Uri && propertyBag.ElementType === "application/x-composite-page") {
		result.Uri = propertyBag.Uri;
	}
	//TODO: remove using EnitityToken - node used
	result.EnitityToken = focusedBinding.node.getEntityToken();
	result.Node = focusedBinding.node;

	return result;
}