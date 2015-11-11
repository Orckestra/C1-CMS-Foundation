StartPageBinding.prototype = new PageBinding;
StartPageBinding.prototype.constructor = StartPageBinding;
StartPageBinding.superclass = PageBinding.prototype;

/**
 * @class
 */
function StartPageBinding () {

	/**
	 * @type {SystemLogger}
	 */
	this.logger = SystemLogger.getLogger ( "StartPageBinding" );
	
	/**
	 * This object gets loaded in the start page frame.
	 * @type {CompositeStart}
	 */
	this._starter = null;

	/**
	 * True when Start screen is visible.
	 * @type {boolean}
	 */
	this._isShowingStart = false;
}

/**
 * Identifies binding.
 */
StartPageBinding.prototype.toString = function () {
	
	return "[StartPageBinding]";
}

/**
 * @overloads {PageBinding#onBindingRegister}
 */
StartPageBinding.prototype.onBindingRegister = function () {

	StartPageBinding.superclass.onBindingRegister.call ( this );
	this.addActionListener ( WindowBinding.ACTION_ONLOAD );
	this.addActionListener ( ControlBinding.ACTION_COMMAND );
	EventBroadcaster.subscribe ( BroadcastMessages.START_COMPOSITE, this );
	EventBroadcaster.subscribe ( BroadcastMessages.STOP_COMPOSITE , this );
	EventBroadcaster.subscribe ( BroadcastMessages.COMPOSITE_START, this );
	EventBroadcaster.subscribe ( BroadcastMessages.COMPOSITE_STOP, this );
	EventBroadcaster.subscribe(BroadcastMessages.KEY_ESCAPE, this);
	var viewBinding = this.getAncestorBindingByType(ViewBinding, true);
	if (viewBinding) {
		DOMEvents.addEventListener(viewBinding.bindingElement, DOMEvents.CLICK, this);
	}
}

/**
 * Load start page with a random querystring to avoid client cache.
 * @overloads {PageBinding#onBindingAttach}
 */
StartPageBinding.prototype.onBindingAttach = function () {
	
	/*
	 * compositestart/CompositeStart.aspx
	 */
	StartPageBinding.superclass.onBindingAttach.call ( this );
	this.bindingWindow.bindingMap.start.setURL ( 
		"GetStartPage.ashx?random=" + KeyMaster.getUniqueKey ()
	);
}

/**
 * @overloads {PageBinding#handleEvent}
 * @implements {IEventListener}
 * @param {Event} e
 */
StartPageBinding.prototype.handleEvent = function (e) {

	StartPageBinding.superclass.handleEvent.call(this, e);
	var element = DOMEvents.getTarget(e);
	switch (e.type) {
		case DOMEvents.CLICK:
			if (element.tagName == "ui:view") {
				this.stop();
			}
			break;
	}
}

/**
 * @implements {IActionListener}
 * @overloads {PageBinding#handleAction}
 * @param {Action} action
 */
StartPageBinding.prototype.handleAction = function ( action ) {

	StartPageBinding.superclass.handleAction.call ( this, action );
	
	var binding = action.target;
	
	switch ( action.type ) {
	
		case WindowBinding.ACTION_ONLOAD :
			if ( action.target == bindingMap.start ) {
				this._starter = bindingMap.start.getContentWindow ().CompositeStart;
				if (this._starter && this._starter.hasCloseButton)
				{
					bindingMap.controlgroup.hide();
				}
				if (this._isShowingStart) {
					this.start();
				}
			}
			break;
			
		case ControlBinding.ACTION_COMMAND :
			if ( action.target == bindingMap.closecontrol ) {
				if ( bindingMap.cover ) {
					bindingMap.cover.show ();
				}
				this.stop();
			}
			break;
	}
}

/**
 * Open starter page
 */
StartPageBinding.prototype.start = function () {

	//check that starter page have start function, otherwise send direct broadcast
	if (this._starter && this._starter.start) {
		try {
			this._starter.start();
		} catch (exception) {
			SystemDebug.stack(arguments);
		}
	} else {
		EventBroadcaster.broadcast(BroadcastMessages.COMPOSITE_START);
	}
}

/**
 * Close starter page
 */
StartPageBinding.prototype.stop = function () {

	//check that starter page have stop function, otherwise send direct broadcast
	if (this._starter) {
		try {
			this._starter.stop();
		} catch (exception) {
			SystemDebug.stack(arguments);
			EventBroadcaster.broadcast(BroadcastMessages.COMPOSITE_STOP);
		}
	} else {
		EventBroadcaster.broadcast(BroadcastMessages.COMPOSITE_STOP);
	}
}


/**
 * @implements {IBroadcastListener}
 * @overloads {PageBinding#handleBroadcast}
 * @param {string} broadcast
 * @param {object} arg
 */
StartPageBinding.prototype.handleBroadcast = function ( broadcast, arg ) {

	StartPageBinding.superclass.handleBroadcast.call ( this, broadcast, arg );
	
	switch ( broadcast ) {
			
		case BroadcastMessages.START_COMPOSITE:
			this._isShowingStart = true;
			this.start();
			break;
			
		case BroadcastMessages.STOP_COMPOSITE :
			this.stop();
			break;
		case BroadcastMessages.COMPOSITE_START: // broadcated by CompositeStart when ready
			if ( bindingMap.cover ) {
				bindingMap.cover.hide ();
			}
			break;
		case BroadcastMessages.COMPOSITE_STOP:
			this._isShowingStart = false;
			break;
		case BroadcastMessages.KEY_ESCAPE:
			if (this._isShowingStart) {
				this.stop();
			}
			break;
	}
}