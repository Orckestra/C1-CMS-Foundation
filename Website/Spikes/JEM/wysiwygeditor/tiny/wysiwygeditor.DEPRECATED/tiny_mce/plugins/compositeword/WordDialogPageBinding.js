WordDialogPageBinding.prototype = new DialogPageBinding;
WordDialogPageBinding.prototype.constructor = WordDialogPageBinding;
WordDialogPageBinding.superclass = DialogPageBinding.prototype;

/**
 * @class
 */
function WordDialogPageBinding () {

	/**
	 * @type {SystemLogger}
	 */
	this.logger = SystemLogger.getLogger ( "WordDialogPageBinding" );
}

/**
 * Identifies binding.
 */
WordDialogPageBinding.prototype.toString = function () {
	
	return "[WordDialogPageBinding]";
}

/**
 * Cleanup editor content and assing to dialogpage as result.
 * @overloads {DialogPageBinding#onDialogAccept}
 */
WordDialogPageBinding.prototype.onDialogAccept = function () {
	
	var win = window.bindingMap.wordwindow;
	var html = win.getContentDocument ().body.innerHTML;
	if ( html && html != "" ) {
		var response = top.XhtmlTransformationsService.MsWordContentToTinyContent ( html );
		this.logger.debug ( response.XhtmlFragment );
		this.result = response.XhtmlFragment;
	} else {
		this.result = null;
	}
	WordDialogPageBinding.superclass.onDialogAccept.call ( this );
}