ImageCursorBinding.prototype = new CursorBinding;
ImageCursorBinding.prototype.constructor = ImageCursorBinding;
ImageCursorBinding.superclass = CursorBinding.prototype;

ImageCursorBinding.CURSOR_SELECT = "${icon:selection}";;
ImageCursorBinding.CURSOR_ZOOMIN = "${icon:zoomin}";
ImageCursorBinding.CURSOR_ZOOMOUT = "${icon:zoomout}";

/**
 * @class
 */
function ImageCursorBinding () {

	/**
	 * @type {SystemLogger}
	 */
	this.logger = SystemLogger.getLogger ( "ImageCursorBinding" );
}

/**
 * Identifies binding.
 */
ImageCursorBinding.prototype.toString = function () {
	
	return "[ImageCursorBinding]";
}

/** 
 * Set mode.
 * @param {string} mode 
 */
ImageCursorBinding.prototype.setMode = function ( mode ) {
	
	var img = null;
	
	switch ( mode ) {
		case ImageEditor.MODE_SELECT :
			img = ImageCursorBinding.CURSOR_SELECT;
			break;
		case ImageEditor.MODE_ZOOMIN :
			img = ImageCursorBinding.CURSOR_ZOOMIN;
			break;
		case ImageEditor.MODE_ZOOMOUT :
			img = ImageCursorBinding.CURSOR_ZOOMOUT;
			break;
	}
	
	this.setImage ( img );
}