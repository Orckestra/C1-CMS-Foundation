ImageEditorAction.TYPE_CROP 		= "c"; // x,y,w,h
ImageEditorAction.TYPE_SCALE 		= "s"; // 'px'|'%',w,h
ImageEditorAction.TYPE_ROTATE 		= "r"; // d
ImageEditorAction.TYPE_FLIP 		= "f"; // true|false (horizontal)
ImageEditorAction.TYPE_SELECT		= "x"; // x,y,w,h
ImageEditorAction.TYPE_SAVE			= "save";

/**
 * String values to be placed in quotes by this method.
 * @param {object} value
 * @return {string}
 */
ImageEditorAction.compute = function ( value ) {
	
	if ( parseInt ( value ).toString () == value || parseFloat ( value ).toString () == value || value == true || value == false ) {
		value = new String ( encodeURIComponent ( value ));
	} else {
		value = new String ( "\"" + encodeURIComponent ( value ) + "\"" );
	}
	return value;
}

/**
 * @class
 * @param {string} type
 * @param {array} args
 */
function ImageEditorAction ( type, args ) {
	
	this.type = type;
	this.args = args;
}

/**
 * @return {string}
 */ 
ImageEditorAction.prototype.toString = function () {

	var result = this.type;

	if ( this.args ) {
		result += "("
		var args = new List ( this.args );
		while ( args.hasNext ()) {
			result += ImageEditorAction.compute ( args.getNext ());
			if ( args.hasNext ()) {
				result += ",";
			}
		}
		result += ")"
	}
	return result;	
}
