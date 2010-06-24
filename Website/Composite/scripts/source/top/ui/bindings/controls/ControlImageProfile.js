ControlImageProfile.IMAGE_MINIMIZE = null;
ControlImageProfile.IMAGE_MAXIMIZE = null;
ControlImageProfile.IMAGE_RESTORE = null; 
ControlImageProfile.IMAGE_CLOSE = null;

/**
 * Please subclass this in order to use!
 * @param {ControlBinding} binding
 */
function ControlImageProfile ( binding ) {
	
	this.binding = binding;
}

/**
 * @param {string} string
 * @return {string}
 * @private
 */
ControlImageProfile.prototype._getImage = function ( string ) {
	
	var result = null;

	switch ( this.binding.controlType ) {
		case ControlBinding.TYPE_MINIMIZE :
			result = this.constructor.IMAGE_MINIMIZE;
			break;
		case ControlBinding.TYPE_MAXIMIZE :
			result = this.constructor.IMAGE_MAXIMIZE;
			break;
		case ControlBinding.TYPE_UNMAXIMIZE :
		case ControlBinding.TYPE_UNMINIMIZE :
			result = this.constructor.IMAGE_RESTORE;
			break;
		case ControlBinding.TYPE_CLOSE :
			result = this.constructor.IMAGE_CLOSE;
			break;
	}
	
	return result.replace ( "${string}", string );
}

/**
 * Get default image. Unlike hover and active, this may depend on container state.
 * @return {string}
 */
ControlImageProfile.prototype.getDefaultImage = function () {

	var isActive = true;
	if ( this.binding.isGhostable && this.binding.containingControlBoxBinding ) {
		isActive = this.binding.containingControlBoxBinding.isActive ? true : false;
	}
	return isActive ? this._getImage ( "default" ) : this._getImage ( "ghosted" );
}

/**
 * Get hover image.
 * @return {string}
 */
ControlImageProfile.prototype.getHoverImage = function () {

	return this._getImage ( "hover" );
}

/**
 * Get active image.
 * @return {string}
 */
ControlImageProfile.prototype.getActiveImage = function () {

	return this._getImage ( "active" );
}