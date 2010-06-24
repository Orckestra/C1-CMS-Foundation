GenericPageBinding.prototype = new PageBinding;
GenericPageBinding.prototype.constructor = GenericPageBinding;
GenericPageBinding.superclass = PageBinding.prototype;

/**
 * @class
 */
function GenericPageBinding () {

	/**
	 * @type {SystemLogger}
	 */
	this.logger = SystemLogger.getLogger ( "GenericPageBinding" );
	
	/**
	 * URL to either 1) load directly or 2) set as action on the form. 
	 * @type {string}
	 */
	this._url = null;
	
	/**
	 * Postback arguments.
	 * @type {Map<String><String>}
	 */
	this._map = null;
	
	/*
	 * Returnable.
	 */
	return this;
}

/**
 * Identifies binding.
 */
GenericPageBinding.prototype.toString = function () {

	return "[GenericPageBinding]";
}

/**
 * @overloads {PageBinding#setPageArgument}
 * @param {object} arg
 */
GenericPageBinding.prototype.setPageArgument = function ( arg ) {
	
	GenericPageBinding.superclass.setPageArgument.call ( this, arg );
	
	this._url = arg.url;
	this._map = arg.map;
	
	var win = this.bindingWindow.bindingMap.window;
	if ( this._list.hasEntries ()) {
		win.setURL ( WindowBinding.POSTBACK_URL );
		this.addActionListener ( WindowBinding.ACTION_LOADED );
	} else {
		win.setURL ( this._url );
	}
}

/**
 * @overloads {PageBinding#handleAction}
 * @implements {IActionListener}
 * @param {Action} action 
 */
GenericPageBinding.prototype.handleAction = function ( action ) {
	
	GenericPageBinding.superclass.handleAction.call ( this, action );
	
	switch ( action.type ) {
		case WindowBinding.ACTION_LOADED :
			var win = action.target.getContentWindow ();
			if ( win.isPostBackDocument ) {
				action.target.post ( this._list, this._url );
			}
			action.consume ();
			break;
	}
}

/**
 * @overloads {PageBinding#onBeforePageInitialize}
 */
GenericPageBinding.prototype.onBeforePageInitialize = function () {
	
	GenericPageBinding.superclass.onBeforePageInitialize.call ( this );
}