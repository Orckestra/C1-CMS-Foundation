ExplorerPopupBinding.prototype = new SystemTreePopupBinding;
ExplorerPopupBinding.prototype.constructor = ExplorerPopupBinding;
ExplorerPopupBinding.superclass = SystemTreePopupBinding.prototype;

/**
 * @class
 */
function ExplorerPopupBinding () {

	/**
	 * @type {SystemLogger}
	 */
	this.logger = SystemLogger.getLogger ( "ExplorerPopupBinding" );
}

/**
 * @overloads {Binding#onBindingRegister}
 */
ExplorerPopupBinding.prototype.onBindingRegister = function () {

	SystemTreePopupBinding.superclass.onBindingRegister.call ( this );
	this.addActionListener ( MenuItemBinding.ACTION_COMMAND, this );
}


/**
 * Setup clipboard operation menuitems.
 */
ExplorerPopupBinding.prototype._setupClipboardItems = function () {

}

/**
 * @implements {IActionListener}
 * @overloads {PopupBinding#handleAction}
 * @param {Action} action
 */
ExplorerPopupBinding.prototype.handleAction = function ( action ) {

	switch ( action.type ) {

		case MenuItemBinding.ACTION_COMMAND :

			var self = this;
			StageBinding.select(this._pespectiveKey)
				.then(
				function () {
					ExplorerPopupBinding.superclass.handleAction.call(self, action);
				}
			)
			break;
	}
}

/**
 * @overwrites {PopupBinding#snapToMouse}
 * @param {MouseEvent} e
 */
ExplorerPopupBinding.prototype.snapToMouse = function ( e ) {

	var node = e.target ? e.target : e.srcElement;
	var name = DOMUtil.getLocalName ( node );
	var binding = null;

	if ( name != "tree" ) {
		switch ( name ) {
			default :

				var target = DOMUtil.getAncestorByLocalName("explorertoolbarbutton", node);
				
				if (target != null) {
					binding = UserInterface.getBinding(target);
					if (binding.isDisabled) { // no contextmenu for disabled treenodes
						binding = null;
					}
				}
				break;
		}
		if ( binding != null && binding.node != null && binding.node.getActionProfile () != null ) {

			this._node = binding.node;
			this._actionProfile = this.getCompiledActionProfile(binding.node);
			this._pespectiveKey = binding.handle;

			SystemTreePopupBinding.superclass.snapToMouse.call(this, e);
		}
	}
}


/**
 * @return {Map<string><List<SystemAction>>}
 */
ExplorerPopupBinding.prototype.getCompiledActionProfile = function (node) {
	var result = new Map();

	var actionProfile = node.getActionProfile();

	if (actionProfile != null) {
		var self = this;
		actionProfile.each(
			function (groupid, list) {
				var newList = new List();
				list.each(function (systemAction) {
					if (systemAction.getActivePositions() & 1) {
						newList.add(systemAction);
					}
				});
				if (newList.hasEntries()) {
					result.set(groupid, newList);
				}
			}
		);
	}

	result.Node = node;

	return result;
}
