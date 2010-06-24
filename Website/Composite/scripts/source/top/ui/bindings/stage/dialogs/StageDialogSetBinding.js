StageDialogSetBinding.prototype = new DialogSetBinding;
StageDialogSetBinding.prototype.constructor = StageDialogSetBinding;
StageDialogSetBinding.superclass = DialogSetBinding.prototype;

/**
 * @class
 */
function StageDialogSetBinding () {

	/**
	 * @type {SystemLogger}
	 */
	this.logger = SystemLogger.getLogger ( "StageDialogSetBinding" );
	
	/**
	 * @type {List<StageDialogBinding>}
	 */
	this._dialogs = new List ();
}

/**
 * Identifies binding.
 */
StageDialogSetBinding.prototype.toString = function () {
	
	return "[StageDialogSetBinding]";
}

/**
 * Get non-modal dialog.
 * @return {StageDialogBinding}
 */
StageDialogSetBinding.prototype.getInstance = function () {
	
	var dialog = null;
	
	this._dialogs.each ( function ( member ) {
		if ( !member.isVisible ) {
			dialog = member;
		}
		return dialog != null;
	});
	if ( !dialog ) {
		this._newInstance ();
		dialog = this._dialogs.getLast ();
	}
	dialog.setModal ( false );
	return dialog;
}

/**
 * Get modal dialog.
 * @return {StageDialogBinding}
 */
StageDialogSetBinding.prototype.getModalInstance = function () {
	
	var dialog = this.getInstance ();
	dialog.setModal ( true );
	return dialog;
}

/**
 * Construct new dialog (but don't return it!).
 */
StageDialogSetBinding.prototype._newInstance = function () {

	var dialog = this.add ( 
		StageDialogBinding.newInstance ( 
			this.bindingDocument 
		)
	);
	this._dialogs.add ( dialog );
	dialog.attach ();
}