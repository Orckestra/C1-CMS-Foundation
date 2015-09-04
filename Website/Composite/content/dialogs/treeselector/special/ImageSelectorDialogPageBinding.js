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
 * @overloads {TreeSelectorDialogPageBinding#onBeforePageInitialize}
 */
ImageSelectorDialogPageBinding.prototype.onBeforePageInitialize = function () {

	var toolbar = this.bindingWindow.bindingMap.toolbar;
	toolbar.setSyncHandle(this.getSyncHandle());
	
	ImageSelectorDialogPageBinding.superclass.onBeforePageInitialize.call(this);
}