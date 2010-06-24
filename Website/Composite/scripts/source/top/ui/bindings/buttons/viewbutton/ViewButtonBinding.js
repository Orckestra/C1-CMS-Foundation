ViewButtonBinding.prototype = new ButtonBinding;
ViewButtonBinding.prototype.constructor = ViewButtonBinding;
ViewButtonBinding.superclass = ButtonBinding.prototype;

/**
 * @class
 * This buttons has been hardwired to openening a view. There is no 
 * unique tagname involved, you simply specify the "binding" attribute.
 */
function ViewButtonBinding () {
	
	/*
	 * Returnable 
	 */
	return this;
}

/**
 * Identifies binding
 * @return {string}
 */
ViewButtonBinding.prototype.toString = function () {
	
	return "[ViewButtonBinding]";
}

/**
 * Open view when clicked.
 * @overwrites {ButtonBinding#oncommand}
 */
ViewButtonBinding.prototype.oncommand = function () {
	
	alert ( this );
}