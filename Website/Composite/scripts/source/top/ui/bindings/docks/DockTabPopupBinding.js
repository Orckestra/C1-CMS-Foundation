DockTabPopupBinding.prototype = new PopupBinding;
DockTabPopupBinding.prototype.constructor = DockTabPopupBinding;
DockTabPopupBinding.superclass = PopupBinding.prototype;

DockTabPopupBinding.CMD_RESTORE 		= "restore";
DockTabPopupBinding.CMD_MINIMIZE 		= "minimize";
DockTabPopupBinding.CMD_MAXIMIZE 		= "maximize";
DockTabPopupBinding.CMD_REFRESH 		= "refreshview";
DockTabPopupBinding.CMD_MAKEDIRTY 		= "makedirty";
DockTabPopupBinding.CMD_CLOSETAB 		= "closetab";
DockTabPopupBinding.CMD_CLOSEOTHERS 	= "closeothers";
DockTabPopupBinding.CMD_CLOSEALL 		= "closeall";
DockTabPopupBinding.CMD_VIEWSOURCE 		= "viewsource";
DockTabPopupBinding.CMD_VIEWGENERATED 	= "viewgenerated";
DockTabPopupBinding.CMD_VIEWSERIALIZED 	= "viewserialized";

function DockTabPopupBinding () {

	/**
	 * @type {SystemLogger}
	 */
	this.logger = SystemLogger.getLogger ( "DockTabPopupBinding" );
}

/**
 * Identifies binding.
 */
DockTabPopupBinding.prototype.toString = function () {

	return "[DockTabPopupBinding]";
}

/**
 * @overloads {PopupBinding#onBindingAttach}
 */
DockTabPopupBinding.prototype.onBindingAttach = function () {
	
	DockTabPopupBinding.superclass.onBindingAttach.call ( this );
	this._indexMenuContent ();
}