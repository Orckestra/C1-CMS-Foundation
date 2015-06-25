/**
 * Button image handling have been separated out so that we 
 * can hardcode-declare it for certain types of buttons.
 * @param {object} object Any type of object with four special properties.
 */
function ImageProfile ( object ) {
	
	this._default		= object.image;
	this._hover 		= object.imageHover;
	this._active		= object.imageActive;
	this._disabled		= object.imageDisabled;
}

/**
 * Get default image.
 * @return {string}
 */
ImageProfile.prototype.getDefaultImage = function () {

	return this._default;
}

/**
 * Set default image.
 * @param {string} image
 */
ImageProfile.prototype.setDefaultImage = function ( image ) {
	
	this._default = image;
}

/**
 * Get hover image.
 * @return {string}
 */
ImageProfile.prototype.getHoverImage = function () {

	return this._default;
}

/**
 * Set default image.
 * @param {string} image
 */
ImageProfile.prototype.setHoverImage = function ( image ) {
	
	this._hover = image;
}

/**
 * Get active image.
 * @return {string}
 */
ImageProfile.prototype.getActiveImage = function () {

	return this._active;
}

/**
 * Set active image.
 * @param {string} image
 */
ImageProfile.prototype.setActiveImage = function ( image ) {
	
	this._active = image;
}

/**
 * Get disabled image.
 * @return {string}
 */
ImageProfile.prototype.getDisabledImage = function () {

	return this._default;
}

/**
 * Set disabled image.
 * @param {string} image
 */
ImageProfile.prototype.setDisabledImage = function ( image ) {
	
	this._disabled = image;
}