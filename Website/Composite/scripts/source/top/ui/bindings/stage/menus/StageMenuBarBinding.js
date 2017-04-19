StageMenuBarBinding.prototype = new MenuBarBinding;
StageMenuBarBinding.prototype.constructor = StageMenuBarBinding;
StageMenuBarBinding.superclass = MenuBarBinding.prototype;

/**
 * @class
 */
function StageMenuBarBinding () {

	/**
	 * @type {SystemLogger}
	 */
	this.logger = SystemLogger.getLogger ( "StageMenuBarBinding" );
	
	/**
	 * @type {SystemNode}
	 */
	this._rootNode = null;
}

/**
 * Identifies binding.
 */
StageMenuBarBinding.prototype.toString = function () {
	
	return "[StageMenuBarBinding]";
}

/**
 * Intercept for system-hooked menuitem commands.
 * @overloads {Binding#onBindingAttach}
 */
StageMenuBarBinding.prototype.onBindingAttach = function () {
	
	StageMenuBarBinding.superclass.onBindingAttach.call ( this );
	if ( System.hasActivePerspectives ) {
		this.addActionListener ( MenuItemBinding.ACTION_COMMAND );
	} else {
		var self = this;
		setTimeout(function () {
			var menus = self.getChildBindingsByLocalName("menu");
			while (menus.hasNext()) {
				var menu = menus.getNext();
				if (menu.bindingElement.id != "usermenu") {
					Binding.prototype.hide.call(menu); // this.hide () burned by MenuContainerBinding#hide
				}
			}
		}, 0);
	}
}

/** 
 * Invoke system actions. These are hardwired to act on the root SystemNode.
 * @implements {IActionListener}
 * @overloads {MenuBarBinding#handleAction}
 * @param {Action} action
 */
StageMenuBarBinding.prototype.handleAction = function ( action ) {
	
	StageMenuBarBinding.superclass.handleAction.call ( this, action );
	
	switch ( action.type ) {
		case MenuItemBinding.ACTION_COMMAND :
			var systemAction = action.target.associatedSystemAction;
			if ( Application.isLoggedIn ) { // otherwise this will trigger when "Exit" is pressed.
				if ( !this._rootNode ) {
					this._rootNode = System.getRootNode ();
				}
				if ( systemAction ) {
					SystemAction.invoke ( systemAction, this._rootNode );
				}
			}
			action.consume ();
			break;
	}
}