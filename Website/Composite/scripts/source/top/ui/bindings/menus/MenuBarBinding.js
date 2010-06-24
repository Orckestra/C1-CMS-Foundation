MenuBarBinding.prototype = new MenuContainerBinding;
MenuBarBinding.prototype.constructor = MenuBarBinding;
MenuBarBinding.superclass = MenuContainerBinding.prototype;

function MenuBarBinding () {

	/**
	 * @type {SystemLogger}
	 */
	this.logger = SystemLogger.getLogger ( "MenuBarBinding" );
	
	/**
	 * Block common crawlers.
	 * @type {Map<string><boolean>}
	 * @overwrites {Binding#crawlerFilters}
	 */
	this.crawlerFilters	= new List ([ FlexBoxCrawler.ID, FocusCrawler.ID ]);
	
	/*
	 * Returnable.
	 */
	return this;
}

/**
 * Identifies binding.
 */
MenuBarBinding.prototype.toString = function () {
	
	return "[MenuBarBinding]";
}

/**
 * Attach classname to clear stylesheet floats.
 * @overloads {Binding#onBindingRegister}
 */
MenuBarBinding.prototype.onBindingRegister = function () {
	
	MenuBarBinding.superclass.onBindingRegister.call ( this );
	this.addActionListener ( MenuBodyBinding.ACTION_UNHANDLED_LEFTRIGHTKEY );
	this.attachClassName ( Binding.CLASSNAME_CLEARFLOAT );
}

/**
 * @implements {IActionListener}
 * @overloads {Binding#handleAction}
 * @param {Action} action
 */
MenuBarBinding.prototype.handleAction = function ( action ) {
	
	MenuBarBinding.superclass.handleAction.call ( this, action );
	
	switch ( action.type ) {
		case MenuBodyBinding.ACTION_UNHANDLED_LEFTRIGHTKEY :
			
			var menuBody = action.target;
			
			var menus = this.getChildBindingsByLocalName ( "menu" );
			while ( menus.hasNext ()) {
				var menu = menus.getNext ();
			}
			
			switch ( menuBody.arrowKey ) {
				case KeyEventCodes.VK_LEFT :
					this.logger.debug ( "LEFTG" );
					break;
				case KeyEventCodes.VK_RIGHT :
					this.logger.debug ( "RIGHT" );
					break;
			}
			
			break;
	}
}