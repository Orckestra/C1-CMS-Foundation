SystemPageBinding.prototype = new PageBinding;
SystemPageBinding.prototype.constructor = SystemPageBinding;
SystemPageBinding.superclass = PageBinding.prototype;

/**
 * @class
 * This fellow runs a simple view on a system tree.
 */
function SystemPageBinding () {

	/**
	 * @type {SystemLogger}
	 */
	this.logger = SystemLogger.getLogger ( "SystemPageBinding" );

	/**
	 * Supplied as page argument.
	 * @type {SystemNode}
	 */
	this.node = null;

	/**
	 * @type {SystemTree}
	 */
	this._tree = null;
}

/**
 * Identifies binding.
 */
SystemPageBinding.prototype.toString = function () {

	return "[SystemPageBinding]";
}

/**
 * @overloads {PageBinding#onBindingRegister}
 */
SystemPageBinding.prototype.onBindingRegister = function () {

	SystemPageBinding.superclass.onBindingRegister.call ( this );
	this.subscribe ( BroadcastMessages.SYSTEMTREEBINDING_REFRESH );
	this.addActionListener ( ButtonBinding.ACTION_COMMAND );
}

/**
 * @overloads {PageBinding#setPageArgument}
 * @param {SystemNode} systemNode
 */
SystemPageBinding.prototype.setPageArgument = function ( systemNode ) {

	this.node = systemNode;
	SystemPageBinding.superclass.setPageArgument.call ( this, systemNode );
}

/**
 * @overloads {PageBinding#onBeforePageInitialize}
 */
SystemPageBinding.prototype.onBeforePageInitialize = function () {

	if ( this.node ) {
		this._tree = this.bindingWindow.bindingMap.tree;
		if ( this._tree ) {
			this._buildTree ();
		} else {
			throw "SystemPageBinding requires a SystemTreeBinding";
		}
	} else {
		throw "SystemPageBinding requires a SystemNode";
	}

	SystemPageBinding.superclass.onBeforePageInitialize.call ( this );
}

/**
 * Build tree.
 */
SystemPageBinding.prototype._buildTree = function () {

	var children = this.node.getChildren ();
	if ( children.hasEntries ()) {
		while ( children.hasNext ()) {
			var node = SystemTreeNodeBinding.newInstance (
				children.getNext (),
				this.bindingDocument
			)
			this._tree.add ( node );
			node.attach ();
		}
	}
}

/**
 * Refresh tree.
 */
SystemPageBinding.prototype._refreshTree = function () {

	/*
	 * Preopen non-container root nodes. That aint right,
	 * but they will get replaced by fresh nodes anyway.
	 * This will let the user see a newly added treenode
	 * without opening container, at least at root level.
	 */
	var roots = this._tree._treeBodyBinding.getChildBindingsByLocalName ( "treenode" );
	roots.each ( function ( root ) {
		if ( !root.isContainer ) {
			root.isOpen = true;
		}
	});


	// Collect open treenodes.
	var crawler = new TreeCrawler ();
	var opens = new List ();
	crawler.mode = TreeCrawler.MODE_GETOPEN;
	crawler.crawl ( this.bindingElement, opens );
	crawler.dispose ();

	// Extract open SystemNodes.
	var list = new List ([ this.node ]);
	opens.each ( function ( treenode ) {
		list.add ( treenode.node );
	});

	// Empty tree and build new.
	this._tree.empty ();
	var branch = this.node.getDescendantBranch ( list );

	if ( branch.hasEntries ()) {

		var self = this;
		var map = new Map ();

		/*
		 * Note that this is basically a copy-paste
		 * of some stoff going on in SystemTreeNode.
		 */
		branch.each ( function ( key, nodes ) {
			nodes.each ( function ( node ) {

				var treenode = SystemTreeNodeBinding.newInstance ( node, self.bindingDocument );
				map.set ( node.getHandle (), treenode );
				if ( map.has ( key )) {
					var parent = map.get ( key );
					parent.add ( treenode );
					parent.isOpen = true;
				} else if ( key == self.node.getHandle ()) {
					self._tree.add ( treenode );
				}
			});
		});

		this._tree.attachRecursive ();
	}
}

/**
 * Executed when the page is shown. Select first treenode.
 */
SystemPageBinding.prototype.onAfterPageInitialize = function () {

	SystemPageBinding.superclass.onAfterPageInitialize.call ( this );
	this._tree.selectDefault();

	if (Application.isTestEnvironment) {
		try {
			this.setProperty("data-qa", this.node.getTag());
		} catch (exception) { }
	}
}

/**
 * @implements {IActionListener}
 * @overloads {PageBinding#handleAction}
 * @param {Action} action
 */
SystemPageBinding.prototype.handleAction = function ( action ) {

	SystemPageBinding.superclass.handleAction.call ( this, action )

	switch ( action.type ) {
		case ButtonBinding.ACTION_COMMAND :
			var button = action.target;
			switch ( button.getID ()) {
				case "locktreebutton" :
					this._tree.setLockToEditor ( button.isChecked );
					break;
				case "collapsebutton" :
					this._tree.collapse ();
					break;
			}
			break;
	}
}

/**
 * Implements {IBroadcastListener}
 * @param {string} broadcast
 * @param {object} arg
 */
SystemPageBinding.prototype.handleBroadcast = function ( broadcast, arg ) {

	SystemPageBinding.superclass.handleBroadcast.call ( this, broadcast, arg );

	/*
	 * This is basically a copy of the procedure instiaged
	 * at SystemTreeNodeBinding method "refresh".
	 */
	switch ( broadcast ) {
		case BroadcastMessages.SYSTEMTREEBINDING_REFRESH :

			var token = arg;
			if ( this.node && this.node.getEntityToken () == token ) {
				try {
					EventBroadcaster.broadcast ( BroadcastMessages.SYSTEMTREEBINDING_REFRESHING, token );
					var self = this;
					Application.lock ( this );
					setTimeout ( function () {
						self._refreshTree ();
						EventBroadcaster.broadcast ( BroadcastMessages.SYSTEMTREEBINDING_REFRESHED, token );
						Application.unlock ( self );
					}, 0 );
				} catch ( exception ) {
					alert ( exception );
					SystemDebug.stack ( arguments );
				}
			}
			break;
	}
}