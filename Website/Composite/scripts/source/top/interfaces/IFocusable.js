/**
 * @class
 * This fellow is supposed to be focused specifically by use of the tab key. 
 */
var IFocusable = new function () {

	/**
	 * @type {boolean}
	 */
	this.isFocusable = true;
	
	/**
	 * @type {boolean}
	 */
	this.isFocused = false;
	
	/**
	 * Focus.
	 */
	this.focus = function () {
	
		this.dispatchAction ( Binding.ACTION_FOCUSED );
	}
	
	/**
	 * Blur.
	 */
	this.blur = function () {
	
		this.dispatchAction ( Binding.ACTION_BLURRED );
	}
}