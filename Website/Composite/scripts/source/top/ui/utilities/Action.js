/**
 * To avoid spelling mistakes, always use predefined constants  
 * (eg. TreeNodeBinding.ONFOCUS) when specifying the actions
 * "type" parameter. This method doublechecks that the predefined 
 * constant is actually predefined.
 * @param {string} type
 */
Action.isValid = function ( type ) {

	return typeof type != Types.UNDEFINED;
}

/**
 * @class
 * @param {Binding} target
 * @param {string} type
 */
function Action ( target, type ) {
	
	/** 
	 * @type {Binding} 
	 */
	this.target	= target;
	
	/** 
	 * @type {string} 
	 */
	this.type = type;
	
	/** 
	 * @type {Binding} 
	 */
	this.listener = null;
	
	/** 
	 * @type {boolean} 
	 */
	this.isConsumed = false;
	
	/** 
	 * @type {boolean} 
	 */
	this.isCancelled = false;
}

/**
 * A Binding can call this method to prevent ancestor 
 * Bindings from dealing with the Action.
 */
Action.prototype.consume = function () {

	this.isConsumed = true;
}

/**
 * A Binding can call this method to cancel the action associated to 
 * an event dispatch. But only if the dispatcher handles this scenario! 
 * Actually it's just a flag, you decide what for. 
 */
Action.prototype.cancel = function () {

	this.isCancelled = true;
}