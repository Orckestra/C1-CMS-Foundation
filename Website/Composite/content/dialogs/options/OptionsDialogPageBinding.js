OptionsDialogPageBinding.prototype = new DialogPageBinding;
OptionsDialogPageBinding.prototype.constructor = OptionsDialogPageBinding;
OptionsDialogPageBinding.superclass = DialogPageBinding.prototype;

/**
 * @class
 */
function OptionsDialogPageBinding () {

	/**
	 * @type {SystemLogger}
	 */
	this.logger = SystemLogger.getLogger ( "OptionsDialogPageBinding" );
}

/**
 * Identifies binding.
 */
OptionsDialogPageBinding.prototype.toString = function () {
	
	return "[OptionsDialogPageBinding]";
}

/**
 * On initialize.
 * @overloading {DialogPageBinding#onBeforePageInitialize}
 */
OptionsDialogPageBinding.prototype.onBeforePageInitialize = function () {
	
	bindingMap.login.setCheckedButtonBinding ( 
		Preferences.getPref ( Preferences.LOGIN ) ? 
			bindingMap.logintrue : 
			bindingMap.loginfalse
	);

	OptionsDialogPageBinding.superclass.onBeforePageInitialize.call ( this );
}

/**
 * On accept.
 * @overloading {DialogPageBinding#onDialogAccept}
 */
OptionsDialogPageBinding.prototype.onDialogAccept = function () {
	
	Preferences.setPref ( Preferences.LOGIN, bindingMap.logintrue.isChecked );

	OptionsDialogPageBinding.superclass.onDialogAccept.call ( this );
}