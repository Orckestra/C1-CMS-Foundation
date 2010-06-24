StartMenuItemBinding.prototype = new MenuItemBinding;
StartMenuItemBinding.prototype.constructor = StartMenuItemBinding;
StartMenuItemBinding.superclass = MenuItemBinding.prototype;

/**
 * @class
 */
function StartMenuItemBinding () {

	/**
	 * @type {SystemLogger}
	 */
	this.logger = SystemLogger.getLogger ( "StartMenuItemBinding" );
	
	/**
	 * @overwrites {MenuItemBinding#type}
	 * @type {string}
	 */
	this.type = MenuItemBinding.TYPE_CHECKBOX;
}

/**
 * Identifies binding.
 */
StartMenuItemBinding.prototype.toString = function () {
	
	return "[StartMenuItemBinding]";
}

/**
 * @overloads {MenuItemBinding#onBindingRegister}
 */
StartMenuItemBinding.prototype.onBindingRegister = function () {
	
	StartMenuItemBinding.superclass.onBindingRegister.call ( this );
	this.subscribe ( BroadcastMessages.COMPOSITE_START );
	this.subscribe ( BroadcastMessages.COMPOSITE_STOP );
}

/**
 * @implements {IBroadcastListener}
 * @param {string} broadcast
 * @param {object} arg
 */
StartMenuItemBinding.prototype.handleBroadcast = function ( broadcast, arg ) {
	
	StartMenuItemBinding.superclass.handleBroadcast.call ( this, broadcast, arg );
	
	switch ( broadcast ) {
		case BroadcastMessages.COMPOSITE_START :
			if ( !this.isChecked ) {
				this.check ( true );
			}
		 	break;
		case BroadcastMessages.COMPOSITE_STOP :
			if ( this.isChecked ) {
				this.uncheck ( true );
			}
			break;
	}
}

/**
 * @overloads {MenuItemBinding#setChecked}
 * @param {boolean} isChecked
 * @param {boolean} isPreventCommand
 */
StartMenuItemBinding.prototype.setChecked = function ( isChecked, isPreventCommand ) {
	
	StartMenuItemBinding.superclass.setChecked.call ( 
		this, 
		isChecked, 
		isPreventCommand 
	);
	
	if ( !isPreventCommand ) {
		if ( this.isChecked ) {
			EventBroadcaster.broadcast ( BroadcastMessages.START_COMPOSITE );
		} else {
			EventBroadcaster.broadcast ( BroadcastMessages.STOP_COMPOSITE );
		}
	}
}