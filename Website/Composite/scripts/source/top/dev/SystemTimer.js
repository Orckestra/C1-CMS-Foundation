/**
 * Factory method in order to emulate SystemLogger syntax.
 * @param {object} object
 */
SystemTimer.getTimer = function ( object ) {
	
	return new SystemTimer ( object.toString ());
}

/**
 * @class
 * Simple stopwatch utility. Note that timing in 
 * Javascript should never be considered 100% reliable.
 */
function SystemTimer ( id ) {
	
	/**
	 * @type {SystemLogger}
	 */
	this.logger = SystemLogger.getLogger ( "SystemTimer" );
	
	/**
	 * @type {string}
	 */
	this._id = id;
	
	/**
	 * @type {int}
	 */
	this._time = new Date ().getTime ();
}

/**
 * Reset timer.
 */
SystemTimer.prototype.reset = function () {
	
	this._time = new Date ().getTime ();
}

/**
 * Report time to system log.
 * @param {string} message
 */
SystemTimer.prototype.report = function ( message ) {
	
	this.logger.debug ( this._id +": " + this.getTime () + ( message ? ": " + message : "" ));
}

/**
 * Get time in milliseconds.
 * @return {int}
 */
SystemTimer.prototype.getTime = function () {
	
	return new Date ().getTime () - this._time;
}