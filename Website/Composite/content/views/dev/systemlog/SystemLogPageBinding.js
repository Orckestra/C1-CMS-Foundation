SystemLogPageBinding.prototype = new PageBinding;
SystemLogPageBinding.prototype.constructor = SystemLogPageBinding;
SystemLogPageBinding.superclass = PageBinding.prototype;

/**
 * @class
 */
function SystemLogPageBinding () {

	/**
	 * @type {SystemLogger}
	 */
	this.logger = SystemLogger.getLogger ( "SystemLogPageBinding" );
}

/**
 * Identifies binding.
 */
SystemLogPageBinding.prototype.toString = function () {
	
	return "[SystemLogPageBinding]";
}

/**
 * Broadcast log opened.
 * @overloads {PageBinding#onBindingRegister}
 */
SystemLogPageBinding.prototype.onBindingRegister = function () {

	SystemLogPageBinding.superclass.onBindingRegister.call ( this );
	
	this.addActionListener ( WindowBinding.ACTION_LOADED, {
		handleAction : function ( action ) {
			EventBroadcaster.broadcast (
				BroadcastMessages.SYSTEMLOG_OPENED, 
				action.target.getContentWindow ()
			);
		}
	});
}

/**
 * Broadcast log closed.
 * @overloads {PageBinding#onBindingDispose}
 */
SystemLogPageBinding.prototype.onBindingDispose = function () {

	EventBroadcaster.broadcast ( BroadcastMessages.SYSTEMLOG_CLOSED );
	SystemLogPageBinding.superclass.onBindingDispose.call ( this );
}



// BINDING COUNT DEBUGGING .................................................

/**
 * Display binding count.
 *
SystemLogPageBinding.prototype.countBindings = function () {
	
	this.logger.debug ( "Binding instance count: " + UserInterface.getBindingCount ());
}

/**
 * Set point.
 *
SystemLogPageBinding.prototype.setPoint = function () {
	
	UserInterface.setPoint ();
	this.logger.debug ( "Point at " + UserInterface.getBindingCount () + " bindings." );
}

/**
 * Clear point and log new bindings.
 *
SystemLogPageBinding.prototype.clearPoint = function () {
	
	var keys = UserInterface.getPoint ();
	if ( keys ) {
		if ( keys.hasEntries ()) {
			var debug = "";
			while ( keys.hasNext ()) {
				var key = keys.getNext ();
				debug += UserInterface.getBindingByKey ( key ).toString () + ( Client.isExplorer ? "\n\n" : "\n" );
			}
			this.logger.debug ( debug );
		} else {
			this.logger.debug ( "No new bindings!" );
		}
	} else {
		this.logger.error ( "No point set!" );
	}
	UserInterface.clearPoint ();
}

/**
 * @param {boolean} isTrack
 *
SystemLogPageBinding.prototype.autoTrack = function ( isTrack ) {
	
	if ( isTrack ) {
		this.logger.debug ( "Tracking every 10 seconds." );
	} else {
		this.logger.debug ( "Untracking." );
	}
	UserInterface.autoTrackDisposedBindings ( isTrack );
}
*/