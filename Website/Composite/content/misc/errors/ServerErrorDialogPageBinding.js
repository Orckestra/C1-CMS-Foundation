ServerErrorDialogPageBinding.prototype = new DialogPageBinding;
ServerErrorDialogPageBinding.prototype.constructor = ServerErrorDialogPageBinding;
ServerErrorDialogPageBinding.superclass = DialogPageBinding.prototype;

/**
 * @class
 */
function ServerErrorDialogPageBinding () {

	/**
	 * @type {SystemLogger}
	 */
	this.logger = SystemLogger.getLogger ( "ServerErrorDialogPageBinding" );
}

/**
 * Identifies binding.
 */
ServerErrorDialogPageBinding.prototype.toString = function () {
	
	return "[ServerErrorDialogPageBinding]";
}

/**
 * Detach the containing ViewBinding from all server control.
 * @overloads {DialogPageBinding#onBindingAttach}
 */
ServerErrorDialogPageBinding.prototype.onBindingAttach = function () {
	
	ServerErrorDialogPageBinding.superclass.onBindingAttach.call ( this );
	this.dispatchAction ( ViewBinding.ACTION_DETACH );
	this.dispatchAction ( DockTabBinding.ACTION_FORCE_CLEAN );
}

/**
 * Force unlock application.
 * @overloads {PageBinding#onAfterPageInitialize}
 */
ServerErrorDialogPageBinding.prototype.onAfterPageInitialize = function () {
	
	ServerErrorDialogPageBinding.superclass.onAfterPageInitialize.call ( this );
	
	/*
	 * Better force-unlock the GUI.
	 */
	Application.unlock ( this, true );
	
	function hideCover () {
		var cover = bindingMap.cover;
		if ( Binding.exists ( cover )) {
			CoverBinding.fadeOut ( cover );
		}
	}
	
	/* 
	 * This fade-in stuff is just for show.
	 */
	setTimeout ( hideCover, 500 );
}