/**
 * @class
 * Activation-aware binding.
 * @see {DockBinding}
 * @see {DialogBinding}
 */
var IActivationAware = new function () {
	
	/**
	 * @implements {IActivationAware}
	 * @type {boolean}
	 */
	this.isActivationAware = true;
	
	/**
	 * @type {boolean}
	 */
	this.isActivated = false;
	
	/**
	 * Invoked when the nearest containing 
	 * {@link IActivatable} gets activated.
	 */
	this.onActivate = function () {}
	
	/**
	 * Invoked when the nearest containing 
	 * {@link IActivatable} gets activated.
	 */
	this.onDeactivate = function () {}
}