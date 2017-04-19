CheckTreeBinding.prototype = new TreeBinding;
CheckTreeBinding.prototype.constructor = CheckTreeBinding;
CheckTreeBinding.superclass = TreeBinding.prototype;


/**
 * @class
 */
function CheckTreeBinding() {

	/**
	 * @type {SystemLogger}
	 */
	this.logger = SystemLogger.getLogger("CheckTreeBinding");

	return this;
}

/**
 * Identifies binding.
 */
CheckTreeBinding.prototype.toString = function () {

	return "[CheckTreeBinding]";
}

/**
 * Grab keyboard.
 */
CheckTreeBinding.prototype._grabKeyboard = function () {

	this.subscribe(BroadcastMessages.KEY_SPACE);

	CheckTreeBinding.superclass._grabKeyboard.call(this);
};

/**
 * Release keyboard.
 */
CheckTreeBinding.prototype._releaseKeyboard = function () {

	this.unsubscribe(BroadcastMessages.KEY_SPACE);

	CheckTreeBinding.superclass._releaseKeyboard.call(this);
};


/**
 * @implements {IBroadcastListener}
 * @param {string} broadcast
 * @param {object} arg
 */
CheckTreeBinding.prototype.handleBroadcast = function (broadcast, arg) {

	CheckTreeBinding.superclass.handleBroadcast.call(this, broadcast, arg);

	switch (broadcast) {

		case BroadcastMessages.KEY_SPACE:
			var focused = this.getFocusedTreeNodeBindings();
			if (focused.hasEntries()) {
				var node = focused.getFirst();
				if (node instanceof CheckTreeNodeBinding) {
					if (!node.isReadOnly) {
						node.invoke();
					}
				}
			}
			break;
	}
}

/**
 * @param {DOMDocument} ownerDocument
 * @return {TreeNodeBinding}
 */
CheckTreeBinding.newInstance = function (ownerDocument) {

	var element = DOMUtil.createElementNS(Constants.NS_UI, "ui:tree", ownerDocument);
	var binding = UserInterface.registerBinding(element, CheckTreeBinding);
	binding.treeBodyBinding = TreeBodyBinding.newInstance(ownerDocument);
	return binding;
}
