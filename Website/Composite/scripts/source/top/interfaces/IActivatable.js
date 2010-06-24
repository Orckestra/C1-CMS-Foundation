/**
 * @class
 * Activatable binding.
 * @see {DockBinding}
 * @see {DialogBinding}
 */
var IActivatable = new function () {
	
	/**
	 * @type {boolean}
	 */
	this.isActivatable = true;
	
	/**
	 * Activate.
	 */
	this.activate = function () {}
	
	/**
	 * Deactivate
	 */
	this.deActivate = function () {}
}