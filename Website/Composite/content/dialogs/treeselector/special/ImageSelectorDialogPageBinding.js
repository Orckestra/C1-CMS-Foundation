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
	
	// Page id is in brackets, so getting subscring from opening bracket to closing bracket
	var mediaItemId = new String(String(url).split("(")[1]).split(")")[0];
	s = Resolver.resolve("${root}/../media/") + mediaItemId;
	s += "?&action=fit&mw=220&mh=288";
	
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