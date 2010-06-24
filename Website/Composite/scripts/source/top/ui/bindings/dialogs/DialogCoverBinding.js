DialogCoverBinding.prototype = new Binding;
DialogCoverBinding.prototype.constructor = DialogCoverBinding;
DialogCoverBinding.superclass = Binding.prototype;

/**
 * @class
 */
function DialogCoverBinding () {

	/**
	 * @type {SystemLogger}
	 */
	this.logger = SystemLogger.getLogger ( "DialogCoverBinding" );
	
	/**
	 * @type {DialogBinding}
	 */
	this._dialogBinding = null;
}

/**
 * Identifies binding.
 */
DialogCoverBinding.prototype.toString = function () {

	return "[DialogCoverBinding]";
}

/**
 * @param {DialogBinding} panelBinding
 */ 
DialogCoverBinding.prototype.cover = function ( dialogBinding ) {
	
	this._dialogBinding = dialogBinding;
	this._dialogBinding.addActionListener ( DialogBinding.ACTION_OPEN, this );
	this._dialogBinding.addActionListener ( DialogBinding.ACTION_CLOSE, this );
	this._dialogBinding.addActionListener ( Binding.ACTION_MOVEDONTOP, this );
	this.addEventListener ( DOMEvents.MOUSEDOWN );
}

/**
 * @implements {IEventListener}
 * @overloads {Binding#handleEvent}
 * @param {MouseEvent} e
 */
DialogCoverBinding.prototype.handleEvent = function ( e ) {

	DialogCoverBinding.superclass.handleEvent.call ( this, e );
	this._dialogBinding.alert ();
}

/**
 * @implements {IActionListener}
 * @overloads {Binding#handleAction}
 * @param {Action} action
 */
DialogCoverBinding.prototype.handleAction = function ( action ) {
	
	DialogCoverBinding.superclass.handleAction.call ( this, action );
	
	var binding = action.target;
	
	/* 
	 * Don't consume - StageDialogSetBinding is listening!
	 */
	if ( this._dialogBinding.isModal ) {
		switch ( action.type ) {
			case DialogBinding.ACTION_OPEN :
				this.show ();
				break;
			case DialogBinding.ACTION_CLOSE :
				this.hide ();
				break;
			case Binding.ACTION_MOVEDONTOP :
				if ( binding == this._dialogBinding ) {
					this.bindingElement.style.zIndex = new String ( 
						binding.getZIndex () - 1 
					);
				}
				break;
		}
	}
}

/**
 * @implements {IBroadcastListner}
 * @param {string} broadcast
 * @param {object} arg
 */
DialogCoverBinding.prototype.handleBroadcast = function ( broadcast, arg ) {

	DialogCoverBinding.superclass.handleBroadcast.call ( this, broadcast, arg );
	
	switch ( broadcast ) {
		case this.bindingWindow.WindowManager.WINDOW_RESIZED_BROADCAST :
			this._max ()
			break;
	}
}

/**
 * Span entire screen estate.
 */
DialogCoverBinding.prototype._max = function () {
	
	var dim = this.bindingWindow.WindowManager.getWindowDimensions ();
	this.bindingElement.style.width = dim.w + "px";
	this.bindingElement.style.height = dim.h + "px";
}

/**
 * @overloads {Binding#show}
 */
DialogCoverBinding.prototype.show = function () {
	
	this._max ();
	
	var broadcast = this.bindingWindow.WindowManager.WINDOW_RESIZED_BROADCAST;
	this.subscribe ( broadcast );
	DialogCoverBinding.superclass.show.call ( this );
}

/**
 * @overloads {Binding#hide}
 */
DialogCoverBinding.prototype.hide = function () {
	
	var broadcast = this.bindingWindow.WindowManager.WINDOW_RESIZED_BROADCAST;
	this.unsubscribe ( broadcast );
	DialogCoverBinding.superclass.hide.call ( this );
}


/**
 * DialogCoverBinding factory.
 * @param {DOMDocument} ownerDocument
 * @return {DialogCoverBinding}
 */
DialogCoverBinding.newInstance = function ( ownerDocument ) {

	var element = DOMUtil.createElementNS ( Constants.NS_UI, "ui:dialogcover", ownerDocument );
	return UserInterface.registerBinding ( element, DialogCoverBinding );
}