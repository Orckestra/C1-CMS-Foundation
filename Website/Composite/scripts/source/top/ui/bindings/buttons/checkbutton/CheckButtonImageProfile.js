CheckButtonImageProfile.IMG_DEFAULT 		= "${skin}/buttons/checkbutton-default.png";
CheckButtonImageProfile.IMG_HOVER 			= "${skin}/buttons/checkbutton-hover.png";
CheckButtonImageProfile.IMG_ACTIVE 			= "${skin}/buttons/checkbutton-active.png";
CheckButtonImageProfile.IMG_ACTIVE_HOVER 	= "${skin}/buttons/checkbutton-active-hover.png";
CheckButtonImageProfile.IMG_DISABLED 		= null;
CheckButtonImageProfile.IMG_DISABLED_ON 	= null;

/**
 * Checkbutton image profile.
 * @param {CheckButtonBinding} binding
 * @implements {IImageProfile}
 */
function CheckButtonImageProfile ( binding ) {
	
	this._binding = binding;
}

/**
 * Get default image.
 * @return {string}
 */
CheckButtonImageProfile.prototype.getDefaultImage = function () {

	return CheckButtonImageProfile.IMG_DEFAULT;
}

/**
 * Get hover image.
 * @return {string}
 */
CheckButtonImageProfile.prototype.getHoverImage = function () {

	return this._binding.isChecked ? 
		CheckButtonImageProfile.IMG_ACTIVE_HOVER :
		CheckButtonImageProfile.IMG_HOVER;
}

/**
 * Get active image.
 * @return {string}
 */
CheckButtonImageProfile.prototype.getActiveImage = function () {

	return CheckButtonImageProfile.IMG_ACTIVE;
}

/**
 * Get disabled image.
 * @return {string}
 */
CheckButtonImageProfile.prototype.getDisabledImage = function () {

	return this._binding.isChecked ? 
		CheckButtonImageProfile.IMG_DISABLED :
		CheckButtonImageProfile.IMG_DISABLED_ON;
}