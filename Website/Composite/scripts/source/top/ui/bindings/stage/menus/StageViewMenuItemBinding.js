StageViewMenuItemBinding.prototype = new MenuItemBinding;
StageViewMenuItemBinding.prototype.constructor = StageViewMenuItemBinding;
StageViewMenuItemBinding.superclass = MenuItemBinding.prototype;

/**
 * @class
 */
function StageViewMenuItemBinding () {

	/**
	 * @type {SystemLogger}
	 */
	this.logger = SystemLogger.getLogger ( "StageViewMenuItemBinding" );
	
	/**
	 * @type {string}
	 */
	this._handle = null;
}

/**
 * Identifies binding.
 */
StageViewMenuItemBinding.prototype.toString = function () {

	return "[StageViewMenuItemBinding]";
}

/**
 * @overloads {MenuItemBinding.#onBindingAttach}
 */
StageViewMenuItemBinding.prototype.onBindingAttach = function () {

	StageViewMenuItemBinding.superclass.onBindingAttach.call ( this );
	
	if ( this.type == MenuItemBinding.TYPE_CHECKBOX ) {
		this.subscribe ( BroadcastMessages.VIEW_OPENED );
		this.subscribe ( BroadcastMessages.VIEW_CLOSED );
		this.subscribe ( BroadcastMessages.STAGE_INITIALIZED );
	}
}

/**
 * @overloads {MenuItemBinding#buildDOMContent}
 */
StageViewMenuItemBinding.prototype.buildDOMContent = function () {
 	
	StageViewMenuItemBinding.superclass.buildDOMContent.call ( this );
	
	var handle = this.getProperty ( "handle" );
	if ( handle ) {
		
		this._handle = handle;
		
		if ( StageBinding.isViewOpen ( handle )) {
			if ( this.type == MenuItemBinding.TYPE_CHECKBOX ) {
				this.check ( true );
			}
		}
		this.oncommand = function () {
			var self = this;
			Application.lock ( self );
			setTimeout ( function () {
				StageBinding.handleViewPresentation ( handle );
				Application.unlock ( self );
			}, Client.hasTransitions ? Animation.DEFAULT_TIME : 0 );
		}
		
	} else {
		throw new Error ( "StageViewMenuItemBinding: missing handle" );
	}
}

/**
 * Set handle.
 * @param {string} handle
 */
StageViewMenuItemBinding.prototype.setHandle = function ( handle ) {
	
	this.setProperty ( "handle", handle );
}

/*
 * @implements {IBroadcastListener}
 * @param {string} message
 * @param {object} arg
 */
StageViewMenuItemBinding.prototype.handleBroadcast = function ( broadcast, arg ) {
	
	StageViewMenuItemBinding.superclass.handleBroadcast.call ( this, broadcast, arg );
	
	if ( this.type == MenuItemBinding.TYPE_CHECKBOX ) {
		switch ( broadcast ) {
			case BroadcastMessages.STAGE_INITIALIZED :
				if ( this.isChecked ) {
					this.fireCommand ();
				}
				break;
			case BroadcastMessages.VIEW_OPENED :
				if ( arg == this._handle ){
					this.check ( true );
				}
				break;
			case BroadcastMessages.VIEW_CLOSED :
				if ( arg == this._handle ){
					this.uncheck ( true );
				}
				break;
		}
	}
}

/**
 * StageViewMenuItemBinding factory.
 * @param {DOMDocument} ownerDocument
 * @return {StageViewMenuItemBinding}
 */
StageViewMenuItemBinding.newInstance = function ( ownerDocument ) {

	var element = DOMUtil.createElementNS ( Constants.NS_UI, "ui:menuitem", ownerDocument );
	UserInterface.registerBinding ( element, StageViewMenuItemBinding );
	return UserInterface.getBinding ( element );
}