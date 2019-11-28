SystemTreeNodeBinding.prototype = new TreeNodeBinding;
SystemTreeNodeBinding.prototype.constructor = SystemTreeNodeBinding;
SystemTreeNodeBinding.superclass = TreeNodeBinding.prototype;

SystemTreeNodeBinding.ACTION_REFRESHED = "systemtreenoderefreshed";
SystemTreeNodeBinding.ACTION_REFRESHED_YEAH = "systemtreenoderefreshedyeah!";

/**
 * Max imported treenodes per request.
 * TODO: Implement this for real.
 * @type {int}
 */
SystemTreeNodeBinding.MAX_CHILD_IMPORT = 10000; /* because not implemented! */

/**
 * @extends {TreeNodeBinding}
 */
function SystemTreeNodeBinding () {

	/**
	 * @type {SystemLogger}
	 */
	this.logger = SystemLogger.getLogger ( "SystemTreeNodeBinding" );

	/**
	 * Associates the treenode to the selected perspective.
	 * @type {SystemNode}
	 */
	this.perspectiveNode = null;

	/**
	 * Flipped when the server opens the treenode.
	 * @type {boolean}
	 */
	this._isForcedOpen = false;

	/**
	 * @type {SystemNode}
	 */
	this.node = null;

	/**
	* @type {boolean}
	*/
	this.autoExpand = false;
}

/**
 * @overloads {TreeNodeBinding#onBindingAttach}
 */
SystemTreeNodeBinding.prototype.onBindingAttach = function () {

	this.addActionListener ( SystemTreeNodeBinding.ACTION_REFRESHED );
	this.subscribe ( BroadcastMessages.SYSTEMTREENODEBINDING_FORCE_OPEN );

	/*
	 * Is container?
	 *
	this.isContainer = this.node.hasChildren ();
	*/

	/*
	 * Is disabled?
	 */
	this.isDisabled = this.node.isDisabled ();

	/*
	 * Label.
	 */
	var label = this.node.getLabel ();
	if ( label ) {
		this.setLabel ( label );
	}

	/*
	 * Tooltip.
	 */
	var toolTip = this.node.getToolTip ();
	if ( toolTip ) {
		this.setToolTip ( toolTip );
	}

	/*
	 * Handle.
	 */
	var handle = this.node.getHandle ();
	if ( handle ) {
		this.setHandle ( handle );
	}

	/*
	 * Drag type and other stuff. All key-value pairs in the
	 * propertybag object is assigned to element as attributes.
	 */
	var bag = this.node.getPropertyBag ();
	if ( bag ) {
		for ( var key in bag ) {
			switch ( key.toLowerCase ()) {
				case "id" :
				case "key" :
					throw new Error ( "Illegal propertybag key: " + key );
					break;
				default :
					this.setProperty ( key, bag [ key ]);
					break;
			}
		}
	}

	/*
	 * Invoke super method.
	 */
	SystemTreeNodeBinding.superclass.onBindingAttach.call ( this );

	/*
	 * A sudden perspective awareness.
	 */
	this.perspectiveNode = this.containingTreeBinding.perspectiveNode;
}

/**
 * Initialize drag and drop.
 * @overloads {Binding#_initializeBindingDragAndDropFeatures}
 */
SystemTreeNodeBinding.prototype._initializeBindingDragAndDropFeatures = function () {

	// Drag type.
	if ( this.node.hasDragType ()) {
		this.setProperty (
			"dragtype",
			this.node.getDragType ()
		);
	}

	// Drag accept.
	if ( this.node.hasDragAccept ()) {
		var dragaccept = "";
		var list = this.node.getDragAccept ();
		while ( list.hasNext ()) {
			dragaccept += list.getNext ();
			if ( list.hasNext ()) {
				dragaccept += " ";
			}
		}
		this.setProperty (
			"dragaccept",
			dragaccept
		);
	}

	SystemTreeNodeBinding.superclass._initializeBindingDragAndDropFeatures.call ( this );
}

/**
 * @implements {IActionListener}
 * @overloads {TreeNodeBinding#handleAction}
 * @param {Action} action
 */
SystemTreeNodeBinding.prototype.handleAction = function ( action ) {

	SystemTreeNodeBinding.superclass.handleAction.call ( this, action );

	switch ( action.type ) {

		/*
		 * TODO: consider this!..............................................
		 */
		case SystemTreeNodeBinding.ACTION_REFRESHED :
			if ( action.target == this ) { // TODO: specifically this .......
				if ( !this.isOpen ) {
					this.hasBeenOpened = false;
					action.consume ();
				}
			}
			break;
	}
}

/**
 * @implements {IBroadcastListener}
 * @param {string} broadcast
 * @param {object} arg
 */
SystemTreeNodeBinding.prototype.handleBroadcast = function ( broadcast, arg ) {

	SystemTreeNodeBinding.superclass.handleBroadcast.call ( this, broadcast, arg );

	switch ( broadcast ) {
		case BroadcastMessages.SYSTEMTREENODEBINDING_FORCE_OPEN :
			if ( arg == this.node.getEntityToken ()) {
				if ( this.isContainer && !this.isOpen ) {

					/*
					 * Mark as forced opening.
					 */
					this._isForcedOpen = true;
					EventBroadcaster.broadcast ( BroadcastMessages.SYSTEMTREENODEBINDING_FORCING_OPEN, this );

					/*
					 * Push to next thread in order to give MessageQueue a chance
					 * to detect whether or not any nodes are actually opening
					 * (because if not, it needs to execute the next action now).
					 */
					var self = this;
					setTimeout ( function () {
						self.open ();
					}, 0 );
				}
			}
			break;
	}
}

/**
 * The imageprofile is provided by the SystemNode assigned to this treenode.
 * @overwrites {TreeNodeBinding#_computeImageProfile}
 */
SystemTreeNodeBinding.prototype._computeImageProfile = function () {}

/**
 * Overloading {@link TreeNodeBinding#computeImage}
 * @return {string}
 */
SystemTreeNodeBinding.prototype.computeImage = function () {

	var result = null;
	var profile = this.node.getImageProfile ();
	if ( profile ) {
		if ( this.isOpen ) {
			result = profile.getActiveImage ();
		} else {
			result = profile.getDefaultImage ();
		}
	}
	if ( !result ) {
		result = SystemTreeNodeBinding.superclass.computeImage.call ( this );
	}
	return result;
}

/**
 * Refresh when opened.
 * @overloads {TreeNodeBinding#open}
 * @param {boolean} isManaged If set to true, the tree will not refresh!
 */
SystemTreeNodeBinding.prototype.open = function ( isManaged ) {

	var wasOpened = this.isContainer && !this.isOpen;
	var wasFresh = !this.hasBeenOpened;

	SystemTreeNodeBinding.superclass.open.call ( this );

	if ( wasOpened && ( wasFresh || SystemTreeBinding.HAS_NO_MEMORY ) && isManaged != true ) {

		/*
		 * Fetch subtree from server.
		 */
		this.refresh ();

		/*
		 * If forced open by server, notify the waiting MessageQueue.
		 */
		if ( this._isForcedOpen ) {
			EventBroadcaster.broadcast ( BroadcastMessages.SYSTEMTREENODEBINDING_FORCED_OPEN, this );
			this._isForcedOpen = false;
		}
	}
}

/**
 * Refreshing treenode content. This method is never executed for nodes
 * with !HasChildren. Method can be invoked as part of treenode opening
 * act, or when the server places a refresh signal on the MessageQueue.
 */
SystemTreeNodeBinding.prototype.refresh = function () {

	// descendant treenodes already opened?
	var branch = null;
	if (this.isContainer) {
		branch = this.getOpenSystemNodes();
	}

	/*
	* Begin refresh...
	*/
	this.isRefreshing = true;
	Application.lock(this);
	StatusBar.busy();

	/*
	* We timeout to lock the GUI while tree
	* is refreshed; this can take some time.
	*/
	var self = this;
	setTimeout ( function () {
		if (Binding.exists(self)) {
			self._performRefresh(branch);
			Application.unlock(self);
		} else {
			Application.unlock(Application, true);
		}
		StatusBar.clear();
	}, 0);

}

/**
 * Perform refresh (isolated so that we can invoke on a timeout).
 * @param {List<SystemNode>} branch
 */
SystemTreeNodeBinding.prototype._performRefresh = function (branch) {

	//TODO: Refactor this
	this.activeBundles = new List();
	this.getDescendantBindingsByType(SystemTreeNodeBinding).each(function (treenode) {
		//TODO refactor
		if (treenode.node.isMultiple()) {
			this.activeBundles.add(treenode.node.getHandle());
		}
	},this);

	//this.empty ();
	if ( branch != null ) {
		this._refreshBranch ( branch );
	} else {
		this._refreshChildren ();
	}

	this.isRefreshing = false;

	this.activeBundles = null;

	/*
	 * TODO: this is hacked! The ISCONTAINER state should be determined by the server!
	 */
	this.isContainer = DOMUtil.getElementsByTagName ( this.bindingElement, "treenode" ).item ( 0 ) != null;
	this.updateClassNames ();

	/*
	 * This will force any closed ancestor treenode to refresh when opened.
	 * The action will be consumed by ancestor, so we need to dispatch yet
	 * another action.
	 */
	this.dispatchAction ( SystemTreeNodeBinding.ACTION_REFRESHED );

	/*
	 * This will inform the tree the we are finished,
	 * which in turn will inform the MessageQueue.
	 * TODO: Only on a MessageQueue-refresh?
	 */
	this.dispatchAction ( SystemTreeNodeBinding.ACTION_REFRESHED_YEAH );
}

/**
 * Import children only.
 */
SystemTreeNodeBinding.prototype._refreshChildren = function () {

	var buffer = new List ();
	var children = this.node.getChildren();

	this.empty ();
	if ( children.hasEntries ()) {
		this._insertTreeNodesRegulated ( children );
	}
}

/**
 * Insert treenodes from a list of SystemNodes.
 * @param {List<SystemNode>} children
 */
SystemTreeNodeBinding.prototype._insertTreeNodesRegulated = function ( children ) {

	var count = 0;
	var expandNodes = new List([]);

	/*
	 * Constantly shortening the children list while
	 * inserting treenodes. This will let us store
	 * the remaining list in a buffer when max count
	 * is reached.
	 */
	while ( children.hasEntries () && count <= SystemTreeNodeBinding.MAX_CHILD_IMPORT ) {
		var treenode = SystemTreeNodeBinding.newInstance(
			children.extractFirst(),
			this.bindingDocument
		);
		if (treenode.node.isMultiple()) {
			treenode.node.getDatas().each(function (data) {
				if (this.activeBundles.has(data.ElementKey)) {
					treenode.node.select(data.ElementKey);
					return false;
				}
				return true;
			}, this);

		}

		treenode.autoExpand = this.autoExpand;
		this.add(treenode);
		treenode.attach();
		count++;

		// Auto expand tree folders in selection dialogs, when only one folder can be expanded.
		// Expand last opened nodes
		if (this.autoExpand) {
			if (count == 1 && !children.hasEntries() || LocalStore.openedNodes.has(treenode.node)) {
				expandNodes.add(treenode);
			}
		}
	}

	if ( children.hasEntries ()) {
		this._insertBufferTreeNode ( children );
	}



	expandNodes.each(function (node) {
		if (node.isContainer && !node.isOpen) {
			var self = node;
			setTimeout(function () {
				self.open();
			}, 0);
		}
	});
}



/**
 * Insert buffer node. This will expand to a number of treenodes when navigated.
 * @param {List<SystemNode>} children
 */
SystemTreeNodeBinding.prototype._insertBufferTreeNode = function ( children ) {

	alert ( "Max treenode count reached. This is not handled!" );
	alert ( "TODO: SystemTreeNodeBinding#._insertBufferTreeNode" );
}

/**
 * Import descendants with open parents. This is not regulated!
 * @param {List<SystemNode>} list A list of open SystemNodes...
 */
SystemTreeNodeBinding.prototype._refreshBranch = function ( list ) {

	var branch = this.node.getDescendantBranch ( list );
	if ( branch.hasEntries ()) {
		this.XXX ( branch );
	}
}

/**
 * TODO: Rename this!
 * @param {List<SystemNode>} branch
 */
SystemTreeNodeBinding.prototype.XXX = function ( branch ) {

	var self = this;
	var map = new Map ();

	/*
	 * Note that the parsed branch may have "holes" in the structure. This implies
	 * that not all may be positioned in the tree. Also note that this is NOT
	 * regulated according to max child import restrictions!
	 */
	this.empty ();
	branch.each(function (key, nodes) {

		var bundles = new Map();

		if (nodes.hasEntries()) {

			nodes.each(function (node) {

				var treenode = SystemTreeNodeBinding.newInstance(node, self.bindingDocument);

				if (treenode.node.isMultiple()) {
					treenode.node.getDatas().each(function (data) {
						if (this.activeBundles.has(data.ElementKey)) {
							treenode.node.select(data.ElementKey);
							return false;
						}
						return true;
					}, this);
				}

				map.set ( node.getHandle (), treenode );
				if ( map.has ( key )) {
					var parent = map.get ( key );
					parent.add ( treenode );
					parent.isOpen = true;
					parent.hasBeenOpened = true;
					node.searchToken = parent.node.searchToken;
				} else if ( key == self.node.getHandle ()) {
					self.add ( treenode );
					node.searchToken = self.node.searchToken;
				} else {
					/*
					 * Now there is a hole in the structure and the
					 * SystemNode has no relevance in this context.
					 * Maybe it was moved somewhere (cut paste scenario).
					 */
				}
			}, this);
		}
	}, this);

	this.attachRecursive ();
	branch.dispose ();
	map.dispose ();
}

/**
 * Get open descendants.
 * @list {List<SystemTreeNode>}
 */
SystemTreeNodeBinding.prototype.getOpenDescendants = function () {

	var crawler = new TreeCrawler ();
	var result = new List ();
	crawler.mode = TreeCrawler.MODE_GETOPEN;
	crawler.crawl ( this.bindingElement, result );
	if ( result.hasEntries ()) { // exclude myself!
		result.extractFirst ();
	}
	crawler.dispose ();
	return result;
}

/**
 * Get the list of SystemNodes from all descandants. Including
 * myself in the result because the server needs to know me.
 * @list {List<SystemNode>}
 */
SystemTreeNodeBinding.prototype.getOpenSystemNodes = function () {

	var result = null;
	var list = this.getOpenDescendants ();

	if ( list.hasEntries ()) {
		result = new List ([ this.node ]); // include myself!
		list.each ( function ( treenode ) {
			result.add ( treenode.node );
		});
	}

	return result;
}

/**
 * Small trick to ensure that the treenode twisty will not
 */
SystemTreeNodeBinding.prototype.updateClassNames = function () {

	if ( !this.isRefreshing ) {
		SystemTreeNodeBinding.superclass.updateClassNames.call ( this );
	}
}

/**
 * Accept dragged treenode.
 * @overwrites {TreeNodeBinding#acceptTreeNodeBinding}
 * @param {SystemTreeNodeBinding} binding
 * @param {int} index Optional (omit for drag and drop setup)
 */
SystemTreeNodeBinding.prototype.acceptTreeNodeBinding = function ( binding, index ) {

	var isCopy = ( SystemTreeBinding.clipboardOperation == SystemTreePopupBinding.CMD_COPY );

	if ( binding instanceof SystemTreeNodeBinding ) {
		if ( TreeService.ExecuteDropElementAction ) {
			TreeService.ExecuteDropElementAction (
				binding.node.getData (),
				this.node.getData (),
				index ? index : this.containingTreeBinding.getDropIndex (),
				Application.CONSOLE_ID,
				isCopy
			);
		}
	}
}

/**
 * Broadcast entityToken on focus to support the "lock tree to editor" feature.
 * @overloads {TreeNodeBinding#invokeManagedFocus}
 */
SystemTreeNodeBinding.prototype.invokeManagedFocus = function ( e ) {

	if ( !this.isFocused ) {
		SystemTreeNodeBinding.superclass.invokeManagedFocus.call ( this );

		/*
		 * This broadcast is intercepted by the DockBinding
		 * who then decides which corresponding tab to highlight.
		 * @see {DockBinding#handleBroadcast}
		 */
		var tree = this.containingTreeBinding;
		if ( tree.isLockedToEditor ) {
			EventBroadcaster.broadcast (
				BroadcastMessages.SYSTEMTREENODEBINDING_FOCUS,
				this
			);
		}
	}
}

/**
 * Has children?
 * @overwrites {TreeNodeBinding#hasChildren}
 * @return {boolean}
 */
SystemTreeNodeBinding.prototype.hasChildren = function () {

	return this.node.hasChildren ();
};

SystemTreeNodeBinding.prototype.getHandles = function () {

	return this.node.getHandles();
}

/**
  * @param {string} entityToken
 */
SystemTreeNodeBinding.prototype.selectToken = function (entityToken) {

	this.node.selectByToken(entityToken);
	this.isDisabled = this.node.isDisabled();
	this.setLabel(this.node.getLabel());
	this.setToolTip(this.node.getToolTip());
	this.setImage(this.computeImage());
	this.setHandle(this.node.getHandle());
}

/**
 * Get bound element attribute or EnityToken.
 * @overloads {Binding#getProperty}
 */
SystemTreeNodeBinding.prototype.getProperty = function ( attname ) {

	if(attname == 'EntityToken' && this.node && this.node.getEntityToken()) {
		return this.node.getEntityToken();
	}

	return SystemTreeNodeBinding.superclass.getProperty.call ( this, attname );
}

/**
 * SystemTreeNodeBinding factory. Notice that we supply a {@link SystemNode} as argument here!
 * @param {SystemNode} node
 * @param {DOMDocument} ownerDocument
 * @return {SystemTreeNodeBinding}
 */
SystemTreeNodeBinding.newInstance = function ( node, ownerDocument ) {

	var treenode = DOMUtil.createElementNS ( Constants.NS_UI, "ui:treenode", ownerDocument );
	var binding = UserInterface.registerBinding ( treenode, SystemTreeNodeBinding );
	binding.node = node;
	return binding;
}