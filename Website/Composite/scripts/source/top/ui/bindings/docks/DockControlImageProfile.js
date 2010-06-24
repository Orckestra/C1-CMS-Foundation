DockControlImageProfile.prototype = new ControlImageProfile;
DockControlImageProfile.prototype.constructor = DockControlImageProfile;
DockControlImageProfile.superclass = ControlImageProfile.prototype;

DockControlImageProfile.IMAGE_MINIMIZE = Resolver.resolve ( "${skin}/docks/control-minimize-${string}.png" );
DockControlImageProfile.IMAGE_MAXIMIZE = Resolver.resolve ( "${skin}/docks/control-maximize-${string}.png" );
DockControlImageProfile.IMAGE_RESTORE = Resolver.resolve ( "${skin}/docks/control-restore-${string}.png" ); 
DockControlImageProfile.IMAGE_CLOSE = null;

/**
 * This functionality can be implemented in pure CSS when we ditch IE6.0!
 * @param {ControlBinding} binding
 */
function DockControlImageProfile ( binding ) {
	
	this.binding = binding;
}

/**
 * @overwrites {ControlImageProfile#getHoverImage}
 * @return {string}
 */
DockControlImageProfile.prototype.getHoverImage = function () {

	return null;
}

/**
 * @overwrites {ControlImageProfile#getActiveImage}
 * @return {string}
 */
DockControlImageProfile.prototype.getActiveImage = function () {

	return null;
}