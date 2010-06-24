/**
 * @type {Binding}
 */
BindingAcceptor.acceptingBinding = null;

/**
 * THIS NEEDS REVISION!
 * @param {Binding} binding
 */
function BindingAcceptor ( binding ) {

	/** 
	 * @type {SystemLogger} 
	 */
	this.logger = SystemLogger.getLogger ( "BindingDragger" );

	/** 
	 * @type {Binding} 
	 */
	this._binding = binding;	
	
	/**
	 * @type {HashMap<string><boolean>}
	 */
	this._acceptedList = {};
	
	/* 
	 * Initialize.
	 */
	this._initialize ();
}

/**
 * Initialize.
 */
BindingAcceptor.prototype._initialize = function () {
	
	EventBroadcaster.subscribe ( BroadcastMessages.TYPEDRAG_START, this );
	EventBroadcaster.subscribe ( BroadcastMessages.TYPEDRAG_STOP, this );
		
	if ( this._binding.dragAccept ) {
	
		EventBroadcaster.subscribe ( BroadcastMessages.TYPEDRAG_PAUSE, this );
	
		var types = new List ( 
			this._binding.dragAccept.split ( " " )
		);
		while ( types.hasNext ()) {
			var type = types.getNext ();
			this._acceptedList [ type ] = true;
		}
	}
}

/**
 * @implements {IBroadcastListener}
 * @param {string} broadcast
 * @param {object} arg
 */
BindingAcceptor.prototype.handleBroadcast = function ( broadcast, arg ) {
	
	var type = arg;
	
	switch ( broadcast ) {
	
		case BroadcastMessages.TYPEDRAG_START :
			if ( this.isAccepting ( type )) {
				this._startAccepting ();
			} else {
				this._startRejecting ();
			}
			break;
			
		case BroadcastMessages.TYPEDRAG_STOP :
			if ( this.isAccepting ( type )) {
				this._stopAccepting ();
			} else {
				this._stopRejecting ();
			}
			break;
			
		case BroadcastMessages.TYPEDRAG_PAUSE :	
			if ( this.isAccepting ( type )) {
				this._pauseAccepting ();
			}
			break;
	}
}

/**
 * Is accepting type?
 * @param {string} type
 * @return {boolean}
 */
BindingAcceptor.prototype.isAccepting = function ( type ) {
	
	return Types.isDefined ( this._acceptedList [ type ]);
}

/**
 * Start accepting binding.
 */
BindingAcceptor.prototype._startAccepting = function () {
	
	this._binding.addEventListener ( DOMEvents.MOUSEOVER, this );
	this._binding.addEventListener ( DOMEvents.MOUSEOUT, this );
		
	if ( Types.isFunction ( this._binding.showGeneralAcceptance )) {
		this._binding.showGeneralAcceptance ();
	}
}

/**
 * Implements DOM2 EventListener.
 * @param {MouseEvent} e 
 */
BindingAcceptor.prototype.handleEvent = function ( e ) {

	switch ( e.type ) {
	
		case DOMEvents.MOUSEOVER :
			if ( BindingAcceptor.acceptingBinding != this._binding ) {
				BindingAcceptor.acceptingBinding = this._binding;
				app.bindingMap.dragdropcursor.showAcceptance ();
				if ( Types.isFunction ( this._binding.showAcceptance )) {
					this._binding.showAcceptance ();
				}
			}
			break;
			
		case DOMEvents.MOUSEOUT :
			var elm = e.relatedTarget ? e.relatedTarget : e.toElement;
			while ( elm ) {
				if ( elm == this._binding.bindingElement ) {
					return;
				}
				elm = elm.parentNode;
			}
			BindingAcceptor.acceptingBinding = null;
			app.bindingMap.dragdropcursor.hideAcceptance ();
			if ( Types.isFunction ( this._binding.hideAcceptance )) {
				this._binding.hideAcceptance ();
			}
			break;
	}
	
	DOMEvents.stopPropagation ( e );
}

/**
 * Pause accepting binding.
 */
BindingAcceptor.prototype._pauseAccepting = function () { 
	
	/*
	if ( this._binding.hideGeneralAcceptance ) {
 		this._binding.hideGeneralAcceptance ();
 	}
 	*/
 	if ( this._binding.hideAcceptance ) {
		this._binding.hideAcceptance ();
	}
	
	app.bindingMap.dragdropcursor.hideAcceptance ();
	BindingAcceptor.acceptingBinding = null;
}
 
/**
 * Stop accepting binding.
 */
BindingAcceptor.prototype._stopAccepting = function () { 

	this._binding.removeEventListener ( DOMEvents.MOUSEOVER, this );
	this._binding.removeEventListener ( DOMEvents.MOUSEOUT, this );
	
	if ( this._binding.hideGeneralAcceptance ) {
 		this._binding.hideGeneralAcceptance ();
 	}
 	if ( this._binding.hideAcceptance ) {
		this._binding.hideAcceptance ();
	}
}

/**
 * Start rejecting binding.
 * TODO: move to DOMEvents.
 */
BindingAcceptor.prototype._startRejecting = function () {
	
	/*
	
	var self = this;
	
	this._binding.bindingElement.onmouseover = function ( e )  {
		EventBroadcaster.broadcast ( BroadcastMessages.TYPEDRAG_PAUSE );
		e = e ? e : self._binding.bindingWindow.event;
		DOMEvents.stopPropagation ( e );
	}
	
	this._binding.bindingElement.onmouseout = function ( e )  {
		e = e ? e : self._binding.bindingWindow.event;
		DOMEvents.stopPropagation ( e );
	}
	*/
	
}

/**
 * Stop rejecting binding.
 * TODO: move to DOMEvents.
 */
BindingAcceptor.prototype._stopRejecting = function () {
	
	this._binding.bindingElement.onmouseover = null;
	this._binding.bindingElement.onmouseout = null;
}
	 

/**
 * Dispose (on binding dispose).
 */
BindingAcceptor.prototype.dispose = function () {
	
	EventBroadcaster.unsubscribe ( BroadcastMessages.TYPEDRAG_START, this );
	EventBroadcaster.unsubscribe ( BroadcastMessages.TYPEDRAG_STOP, this );
}