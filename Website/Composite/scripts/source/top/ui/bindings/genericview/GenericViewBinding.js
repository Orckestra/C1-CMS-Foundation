GenericViewBinding.prototype = new TreeBinding;
GenericViewBinding.prototype.constructor = GenericViewBinding;
GenericViewBinding.superclass = TreeBinding.prototype;

GenericViewBinding.CLASSNAME = "genericview";
GenericViewBinding.CLASSNAME_SINGLE = "single";
GenericViewBinding.CLASSNAME_ICONSIZE = "icons-s-170";
GenericViewBinding.CLASSNAME_SINGLE_ICONSIZE = "icons-s-400";
GenericViewBinding.IMAGE_MAXWIDTH = 300;
GenericViewBinding.IMAGE_MAXHEIGHT = 170;
GenericViewBinding.LIST_IMAGE = "listimage";


GenericViewBinding.ACTION_COMMAND = "generic action open";

/**
 * @class
 */
function GenericViewBinding() {

	/**
	 * @type {SystemLogger}
	 */
	this.logger = SystemLogger.getLogger("GenericViewBinding");

	/**
	 * Associates the tree to the selected perspective.
	 * @type {SystemNode}
	 */
	this.perspectiveNode = null;

	/**
	 * Current Node
	 * @type {SystemNode}
	 */
	this.node = null;

	/**
	* Tree position 
	* @type {int}
	*/
	this._activePosition = SystemAction.activePositions.NavigatorTree;

	/**
	 * @type {HashMap<string><boolean>}
	 */
	this._actionGroup = null;

}



/**
 * Identifies binding.
 */
GenericViewBinding.prototype.toString = function () {

	return "[GenericViewBinding]";
}

/**
 * @overloads {TreeBinding#onBindingRegister}
 */
GenericViewBinding.prototype.onBindingRegister = function () {

	GenericViewBinding.superclass.onBindingRegister.call(this);


	this.addActionListener(TreeNodeBinding.ACTION_COMMAND);

	this.attachClassName(GenericViewBinding.CLASSNAME);

	this.setContextMenu(top.app.bindingMap.systemtreepopup);

	/*
	 * Mark the tree as resident on the currently selected perspective.
	 */
	this.perspectiveNode = StageBinding.perspectiveNode;
}


/**
 * @implements {IActionListener}
 * @overloads {TreeBinding#handleAction}
 * @param {Action} action
 */
GenericViewBinding.prototype.handleAction = function (action) {

	var binding = action.target;

	switch (action.type) {
		case TreeNodeBinding.ACTION_COMMAND:
		case TreeNodeBinding.ACTION_OPEN:
			this.dispatchAction(new Action(action.target, GenericViewBinding.ACTION_COMMAND));
			action.consume();
			break;
		case TreeNodeBinding.ACTION_COMMAND:
			action.consume();
			break;
	}

	GenericViewBinding.superclass.handleAction.call(this, action);
}

/**
 * Set showing children of SystemNode
  * @param {SystemNode} node
 */
GenericViewBinding.prototype.setNode = function (node) {

	this.node = node;

	this.empty();
	this.detachClassName(GenericViewBinding.CLASSNAME_SINGLE);
	this.detachClassName(GenericViewBinding.CLASSNAME_SINGLE_ICONSIZE);
	this.detachClassName(GenericViewBinding.CLASSNAME_ICONSIZE);

	if (this.node) {
		if (this.node.hasChildren()) {
			
			var children = this.node.getChildren();

			while (children.hasEntries()) {
				var child = children.extractFirst();
				this.addNode(child);
				this.attachClassName(GenericViewBinding.CLASSNAME_ICONSIZE);
			}
		} else {
			this.attachClassName(GenericViewBinding.CLASSNAME_SINGLE);
			this.attachClassName(GenericViewBinding.CLASSNAME_SINGLE_ICONSIZE);
			this.addNode(this.node);
		}
	}
}

/**
 * Add node to tree
  * @param {SystemNode} node
 */
GenericViewBinding.prototype.addNode = function (child) {
	var treenode = TreeNodeBinding.newInstance(this.bindingDocument
				);
	treenode.node = child;
	var label = treenode.node.getLabel();
	if (label) {
		treenode.setLabel(label);
	}

	var bag = treenode.node.getPropertyBag();
	var imageProfile = treenode.node.getImageProfile();

	if (bag && bag.ListViewImage) {
		

	    if (this.hasClassName(GenericViewBinding.CLASSNAME_SINGLE)) {
	        treenode.setImage(bag.ListViewImage.replace("{width}", this.bindingElement.offsetWidth - 60).replace("{height}", this.bindingElement.offsetHeight - 130));
		} else {
		    treenode.setImage(bag.ListViewImage.replace("{width}", GenericViewBinding.IMAGE_MAXWIDTH).replace("{height}", GenericViewBinding.IMAGE_MAXHEIGHT));
			treenode.attachClassName(GenericViewBinding.LIST_IMAGE);
		}
		
	}else if (imageProfile) {
		treenode.setImage(imageProfile.getDefaultImage());
	}


	/*
	 * Drag type and other stuff. All key-value pairs in the
	 * propertybag object is assigned to element as attributes.
	 */
	if (bag) {
		for (var key in bag) {
			switch (key.toLowerCase()) {
				case "id":
				case "key":
					break;
				default:
					treenode.setProperty(key, bag[key]);
					break;
			}
		}
	}

	treenode.isContainer = treenode.node.hasChildren();
	this.add(treenode);
	treenode.attach();
}


/**
 * Return perspective handle for tree
 */
GenericViewBinding.prototype.getSyncHandle = function () {

	return this.perspectiveNode.getHandle();
}

/**
 * Invoked when tree focus changes AND when tree itself recieves the focus  
 * AND when lock-tree-to-editor feature updates the treenode focus.
 */
GenericViewBinding.prototype._handleSystemTreeFocus = function () {

	if (this.getFocusedTreeNodeBindings().hasEntries()) {
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

/**
 * @overloads {TreeBinding#focusSingleTreeNodeBinding}
 * @param {TreeNodeBinding} binding;
 */
GenericViewBinding.prototype.focusSingleTreeNodeBinding = function (binding) {

	GenericViewBinding.superclass.focusSingleTreeNodeBinding.call(this, binding);
	if (binding != null) {
		this._handleSystemTreeFocus();
	}
};

/**
 * @overloads {TreeBinding#_navigateByKey}  
 * @param {int} key
 */
GenericViewBinding.prototype._navigateByKey = function (key) {

	var focused = this.getFocusedTreeNodeBindings()

	if (focused.hasEntries()) {

		var node = focused.getFirst();
		var next = null;

		switch (key) {
			case KeyEventCodes.VK_LEFT:
				next = node.getPreviousBindingByLocalName("treenode");
				break;
			case KeyEventCodes.VK_RIGHT:
				next = node.getNextBindingByLocalName("treenode");
				break;
			case KeyEventCodes.VK_DOWN:
				next = node.getNextBindingByLocalName("treenode");
				while (next && next.bindingElement.offsetTop == node.bindingElement.offsetTop) {
					next = next.getNextBindingByLocalName("treenode");
				}
				while (next && next.bindingElement.offsetLeft < node.bindingElement.offsetLeft) {
					next = next.getNextBindingByLocalName("treenode");
				}
				break;

			case KeyEventCodes.VK_UP:
				next = node.getPreviousBindingByLocalName("treenode");
				while (next && next.bindingElement.offsetTop == node.bindingElement.offsetTop) {
					next = next.getPreviousBindingByLocalName("treenode");
				}
				while (next && next.bindingElement.offsetLeft > node.bindingElement.offsetLeft) {
					next = next.getPreviousBindingByLocalName("treenode");
				}
				break;
				break;
		}

		if (next != null) {
			this.focusSingleTreeNodeBinding(next);
		}
	}
}

/**
 * Compile actionprofile based on the individual actionprofile of all focused treenodes.
 * In case of multiple focused treenodes, only SystemActions relevant for *all* focused 
 * treenodes will be included in the result.
 * @return {Map<string><List<SystemAction>>}
 */
GenericViewBinding.prototype.getCompiledActionProfile = SystemTreeBinding.prototype.getCompiledActionProfile;

/**
 * Set Action Profile Group
 * @param {function}
 */
GenericViewBinding.prototype.setActionGroup = SystemTreeBinding.prototype.setActionGroup;

/**
 * TreeBinding factory.
 * @param {DOMDocument} ownerDocument
 * @return {TreeBinding}
 */
GenericViewBinding.newInstance = function (ownerDocument) {

	var element = DOMUtil.createElementNS(Constants.NS_UI, "ui:tree", ownerDocument);
	var binding = UserInterface.registerBinding(element, GenericViewBinding);
	binding.treeBodyBinding = TreeBodyBinding.newInstance(ownerDocument);
	return binding;
}

/**
 * Return perspective handle for tree
 */
GenericViewBinding.prototype.getSyncHandle = function () {

	if (this.getProperty("treeselector") == true) {
		return this.getAncestorBindingByType(PageBinding).getID();
	} else {
		return this.perspectiveNode.getHandle();
	}
}