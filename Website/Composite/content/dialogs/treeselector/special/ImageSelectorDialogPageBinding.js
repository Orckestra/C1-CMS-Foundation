ImageSelectorDialogPageBinding.prototype = new TreeSelectorDialogPageBinding;
ImageSelectorDialogPageBinding.prototype.constructor = ImageSelectorDialogPageBinding;
ImageSelectorDialogPageBinding.superclass = TreeSelectorDialogPageBinding.prototype;

/**
 * @class
 */
function ImageSelectorDialogPageBinding () {

	/**
	 * @type {SystemLogger}
	 */
	this.logger = SystemLogger.getLogger ( "ImageSelectorDialogPageBinding" );
}

/**
 * Identifies binding.
 */
ImageSelectorDialogPageBinding.prototype.toString = function () {
	
	return "[ImageSelectorDialogPageBinding]";
}

/**
 * Update image preview.
 * @overloads {TreeSelectorDialogPageBinding#_updateDisplayAndResult}
 */
ImageSelectorDialogPageBinding.prototype._updateDisplayAndResult = function () {
	
	ImageSelectorDialogPageBinding.superclass._updateDisplayAndResult.call ( this );
	
	var image 	= document.getElementById ( "previewimage" );
	var info 	= document.getElementById ( "info" );
	var disk 	= bindingMap.sizeondisk;
	var size 	= bindingMap.sizeonscreen;
	
	var url = this.result.getFirst ();
	
	var s = String ( url );
	s = s.split ( "?" )[ 1 ];
	s = Resolver.resolve ( "${root}/services/Media/ImageManipulator.ashx?" ) + s;
	s += "&action=fit&maxwidth=220&maxheight=288";
	
	image.style.backgroundImage = "url('" + s + "')";	
	info.className = "image";
}

/**
 * Reset image preview.
 * @overloads {TreeSelectorDialogPageBinding#_clearDisplayAndResult}
 */
ImageSelectorDialogPageBinding.prototype._clearDisplayAndResult = function () {
	
	ImageSelectorDialogPageBinding.superclass._clearDisplayAndResult.call ( this );
	
	var image = document.getElementById ( "previewimage" );
	var info = document.getElementById ( "info" );
	
	image.style.backgroundImage = 'url("imageselector.png")';
	info.className = "";
}