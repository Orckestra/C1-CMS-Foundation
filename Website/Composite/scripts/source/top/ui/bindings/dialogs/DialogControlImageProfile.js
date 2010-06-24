DialogControlImageProfile.prototype = new ControlImageProfile;
DialogControlImageProfile.prototype.constructor = DialogControlImageProfile;
DialogControlImageProfile.superclass = ControlImageProfile.prototype;

var os = Client.isVista ? "vista/" : ( !Client.isWindows ? "osx/" : "" ); // HACK!

DialogControlImageProfile.IMAGE_MINIMIZE = "${root}/skins/system/controls/" + os + "control-minimize-${string}.png";
DialogControlImageProfile.IMAGE_MAXIMIZE = "${root}/skins/system/controls/" + os + "control-maximize-${string}.png";
DialogControlImageProfile.IMAGE_RESTORE = "${root}/skins/system/controls/" + os + "control-restore-${string}.png"; 
DialogControlImageProfile.IMAGE_CLOSE = "${root}/skins/system/controls/" + os + "control-close-${string}.png";

/**
 * This functionality can be implemented in pure CSS when we ditch IE6.0!
 * @param {ControlBinding} binding
 */
function DialogControlImageProfile ( binding ) {
	
	this.binding = binding;
}