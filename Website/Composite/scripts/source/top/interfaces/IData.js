/**
 * @class
 * @implements {IFocusable}
 */
var IData = new function () {
	
	/**
	 * @implements {IFocusable}
	 * @type {boolean}
	 */
	this.isFocusable = true;
	
	/**
	 * Validate.
	 * @return {boolean}
	 */
	this.validate = function () {};
	
	/**
	 * Manifest. This will write form elements into page DOM 
	 * so that the server recieves something on form submit.
	 * @return {Binding} Although we probably return null...
	 */
	this.manifest = function () {};
	
	/**
	 * Mark binding dirty and set a flag in the local DataManager. 
	 */
	this.dirty = function () {};
	
	/**
	 * Remove the dirty mark.
	 */
	this.clean = function () {};
	
	/**
	 * Focus.
	 * @implements {IFocusable}
	 */
	this.focus = function () {};
	
	/**
	 * Blur.
	 * @implements {IFocusable}
	 */
	this.blur = function () {};
	
	/**
	 * Get name.
	 * @return {string}
	 */
	this.getName = function () {};
	
	/**
	 * Get value. This is intended for serverside processing.
	 * @return {string}
	 */
	this.getValue = function () {};
	
	/**
	 * Set value.
	 * @param {string} value
	 */
	this.setValue = function ( value ) {};
	
	/**
	 * Get result. This is intended for clientside processing.
	 * @return {object}
	 */
	this.getResult = function () {};
	
	/**
	 * Set result.
	 * @see {DataManager#populateDataBindings}
	 * @param {object} result
	 */
	this.setResult = function ( result ) {};
}