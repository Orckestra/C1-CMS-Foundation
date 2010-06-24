ServerErrorPageBinding.prototype = new PageBinding;
ServerErrorPageBinding.prototype.constructor = ServerErrorPageBinding;
ServerErrorPageBinding.superclass = PageBinding.prototype;

/**
 * @class
 */
function ServerErrorPageBinding () {

	/**
	 * @type {SystemLogger}
	 */
	this.logger = SystemLogger.getLogger ( "ServerErrorPageBinding" );
}

/**
 * Identifies binding.
 */
ServerErrorPageBinding.prototype.toString = function () {
	
	return "[ServerErrorPageBinding]";
}

/**
 * Detach the containing ViewBinding from all server control.
 * @overloads {PageBinding#onBindingAttach}
 */
ServerErrorPageBinding.prototype.onBindingAttach = function () {
	
	ServerErrorPageBinding.superclass.onBindingAttach.call ( this );
	this.dispatchAction ( ViewBinding.ACTION_DETACH );
	this.dispatchAction ( DockTabBinding.ACTION_FORCE_CLEAN );
}

/**
 * Force unlock application and update message queue.
 * @overloads {PageBinding#onAfterPageInitialize}
 */
ServerErrorPageBinding.prototype.onAfterPageInitialize = function () {
	
	ServerErrorPageBinding.superclass.onAfterPageInitialize.call ( this );
	
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
	 * This stuff is just for show.
	 */
	setTimeout ( hideCover, 500 );
}