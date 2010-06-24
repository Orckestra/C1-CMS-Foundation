DialogTitleBarPopupBinding.prototype = new PopupBinding;
DialogTitleBarPopupBinding.prototype.constructor = DialogTitleBarPopupBinding;
DialogTitleBarPopupBinding.superclass = PopupBinding.prototype;

DialogTitleBarPopupBinding.CMD_RESTORE 			= "restore";
DialogTitleBarPopupBinding.CMD_MINIMIZE 		= "minimize";
DialogTitleBarPopupBinding.CMD_MAXIMIZE 		= "maximize";
DialogTitleBarPopupBinding.CMD_REFRESH 			= "refreshview";
DialogTitleBarPopupBinding.CMD_CLOSE 			= "closedialog";
DialogTitleBarPopupBinding.CMD_VIEWSOURCE 		= "viewsource";
DialogTitleBarPopupBinding.CMD_VIEWGENERATED 	= "viewgenerated";
DialogTitleBarPopupBinding.CMD_VIEWSERIALIZED	= "viewserialized";

function DialogTitleBarPopupBinding () {

	/**
	 * @type {SystemLogger}
	 */
	this.logger = SystemLogger.getLogger ( "DialogTitleBarPopupBinding" );
}

/**
 * Identifies binding.
 */
DialogTitleBarPopupBinding.prototype.toString = function () {

	return "[DialogTitleBarPopupBinding]";
}

/**
 * @overloads {PopupBinding#onBindingAttach}
 */
DialogTitleBarPopupBinding.prototype.onBindingAttach = function () {
	
	DialogTitleBarPopupBinding.superclass.onBindingAttach.call ( this );
	this._indexMenuContent ();
}