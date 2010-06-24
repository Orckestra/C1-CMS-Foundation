/**
 * @class
 * Image profile interface.
 */
var IImageProfile = new function () {

	/**
	 * Get default image.
	 * @return {string}
	 */
	this.getDefaultImage = function () {}

	/**
	 * Get hover image.
	 * @return {string}
	 */
	this.getHoverImage = function () {}
	
	/**
	 * Get active image.
	 * @return {string}
	 */
	this.getActiveImage = function () {}
	
	/**
	 * Get disabled image.
	 * @return {string}
	 */
	this.getDisabledImage = function () {}
}