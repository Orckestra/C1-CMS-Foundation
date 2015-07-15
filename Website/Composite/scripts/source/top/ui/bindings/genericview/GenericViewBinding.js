GenericViewBinding.prototype = new TreeBinding;
GenericViewBinding.prototype.constructor = GenericViewBinding;
GenericViewBinding.superclass = TreeBinding.prototype;

GenericViewBinding.CLASSNAME = "generericview";

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
	* Tree position 
	* @type {int}
	*/
	this._activePosition = SystemAction.activePositions.NavigatorTree;

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

	this.attachClassName(GenericViewBinding.CLASSNAME);

	/*
	 * Mark the tree as resident on the currently selected perspective.
	 */
	this.perspectiveNode = StageBinding.perspectiveNode;
}

/**
 * seto shoving children of SystemNode
  * @param {SystemNode} node
 */
GenericViewBinding.prototype.setNode = function (node) {

	this.empty();

	if (node) {
		var children = node.getChildren();

		while (children.hasEntries()) {
			var child = children.extractFirst();
			var treenode = TreeNodeBinding.newInstance(this.bindingDocument
			);
			treenode.node = child;
			var label = treenode.node.getLabel();
			if (label) {
				treenode.setLabel(label);
			}

			var imageProfile = treenode.node.getImageProfile();
			if (imageProfile) {
				treenode.setImage(imageProfile.getDefaultImage());
			}
			this.add(treenode);
			treenode.attach();
		}
	}
}


/**
 * Return perspective handle for tree
 */
GenericViewBinding.prototype.getPerspectiveHandle = function () {

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
					//perspectiveHandle: this.getPerspectiveHandle()
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
 * Compile actionprofile based on the individual actionprofile of all focused treenodes.
 * In case of multiple focused treenodes, only SystemActions relevant for *all* focused 
 * treenodes will be included in the result.
 * @return {Map<string><List<SystemAction>>}
 */
GenericViewBinding.prototype.getCompiledActionProfile = SystemTreeBinding.prototype.getCompiledActionProfile;


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