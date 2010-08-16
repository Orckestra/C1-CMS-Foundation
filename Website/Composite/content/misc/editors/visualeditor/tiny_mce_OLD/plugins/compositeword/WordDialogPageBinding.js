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
 * Enable the OK button when contained iframe is focused.
 */
WordDialogPageBinding.prototype.enableOK = function () {
	
	bindingMap.buttonAccept.enable ();
	bindingMap.buttonAccept.focus ();
}

/**
 * Cleanup editor content and assing to dialogpage as result.
 * @overwrites {DialogPageBinding#onDialogAccept}
 */
WordDialogPageBinding.prototype.onDialogAccept = function () {
	
	this.result = null;
	
	var win = window.bindingMap.wordwindow;
	var html = win.getContentDocument ().body.innerHTML;
	
	/*
	if ( html != null && html != "" ) {
		var response = top.XhtmlTransformationsService.MsWordContentCleanup ( html );
		this.logger.debug ( response );
		alert ( "MsWordContentCleanup:\n\n" + response );
		this.result = response;
	}
	*/
	
	if ( html != null && html != "" ) {
		var response = top.XhtmlTransformationsService.MsWordContentToTinyContent ( html );
		this.logger.debug ( response.XhtmlFragment );
		this.result = response.XhtmlFragment;
	}
	
	this.onDialogResponse ();
}