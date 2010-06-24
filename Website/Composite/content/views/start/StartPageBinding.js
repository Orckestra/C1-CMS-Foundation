StartPageBinding.prototype = new PageBinding;
StartPageBinding.prototype.constructor = StartPageBinding;
StartPageBinding.superclass = PageBinding.prototype;

/**
 * @class
 */
function StartPageBinding () {

	/**
	 * @type {SystemLogger}
	 */
	this.logger = SystemLogger.getLogger ( "StartPageBinding" );
	
	/**
	 * This object gets loaded in the start page frame.
	 * @type {CompositeStart}
	 */
	this._starter = null;
}

/**
 * Identifies binding.
 */
StartPageBinding.prototype.toString = function () {
	
	return "[StartPageBinding]";
}

/**
 * @overloads {PageBinding#onBindingRegister}
 */
StartPageBinding.prototype.onBindingRegister = function () {
	
	StartPageBinding.superclass.onBindingRegister.call ( this );
	this.addActionListener ( WindowBinding.ACTION_ONLOAD );
	this.addActionListener ( ControlBinding.ACTION_COMMAND );
	EventBroadcaster.subscribe ( BroadcastMessages.START_COMPOSITE, this );
	EventBroadcaster.subscribe ( BroadcastMessages.STOP_COMPOSITE , this );
	EventBroadcaster.subscribe ( BroadcastMessages.COMPOSITE_START, this );
}

/**
 * Load start page with a random querystring to avoid client cache.
 * @overloads {PageBinding#onBindingAttach}
 */
StartPageBinding.prototype.onBindingAttach = function () {
	
	/*
	 * compositestart/CompositeStart.aspx
	 */
	StartPageBinding.superclass.onBindingAttach.call ( this );
	this.bindingWindow.bindingMap.start.setURL ( 
		"GetStartPage.ashx?random=" + KeyMaster.getUniqueKey ()
	);
}

/**
 * @implements {IActionListener}
 * @overloads {PageBinding#handleAction}
 * @param {Action} action
 */
StartPageBinding.prototype.handleAction = function ( action ) {

	StartPageBinding.superclass.handleAction.call ( this, action );
	
	var binding = action.target;
	
	switch ( action.type ) {
	
		case WindowBinding.ACTION_ONLOAD :
		
			if ( action.target == bindingMap.start ) {
				this._starter = bindingMap.start.getContentWindow ().CompositeStart;
				if ( this._starter ) {
					this._starter.start ();
				}
			}
			break;
			
		case ControlBinding.ACTION_COMMAND :
		
			if ( action.target == bindingMap.closecontrol ) {
				if ( bindingMap.cover ) {
					bindingMap.cover.show ();
				}
				if ( this._starter ) {
					this._starter.stop ();
				}
			}
			break;
	}
}

/**
 * @implements {IBroadcastListener}
 * @overloads {PageBinding#handleBroadcast}
 * @param {string} broadcast
 * @param {object} arg
 */
StartPageBinding.prototype.handleBroadcast = function ( broadcast, arg ) {

	StartPageBinding.superclass.handleBroadcast.call ( this, broadcast, arg );
	
	switch ( broadcast ) {
			
		case BroadcastMessages.START_COMPOSITE :
			if ( this._starter ) {
				this._starter.start ();
			}
			break;
			
		case BroadcastMessages.STOP_COMPOSITE :
			if ( this._starter ) {
				this._starter.stop ();
			}
			break;
			
		case BroadcastMessages.COMPOSITE_START : // broadcated by CompositeStart when ready
			if ( bindingMap.cover ) {
				bindingMap.cover.hide ();
			}
			break;
	}
}