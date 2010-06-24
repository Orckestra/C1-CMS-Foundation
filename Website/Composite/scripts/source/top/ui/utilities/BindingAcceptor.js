/**
 * @type {Binding}
 */
BindingAcceptor.acceptingBinding = null;

/** 
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
	
	/**
	 * @type {boolean}
	 */
	this._isAccepting = false;
	
	/**
	 * @type {CursorBinding}
	 */
	this._corsor = null;
	
	/* 
	 * Initialize.
	 */
	this._initialize ();
	
	/*
	 * Returnable.
	 */
	return this;
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
	
	try {
	
	switch ( broadcast ) {
	
		case BroadcastMessages.TYPEDRAG_START :
			if ( this._cursor == null ) {
				this._cursor = app.bindingMap.dragdropcursor;
			}
			this._binding.addEventListener ( DOMEvents.MOUSEENTER, this );
			this._binding.addEventListener ( DOMEvents.MOUSELEAVE, this );
			if ( this.isAccepting ( type )) {
				this._isAccepting = true;
				this._startAccepting ();
			}
			break;
			
		case BroadcastMessages.TYPEDRAG_STOP :
			this._binding.removeEventListener ( DOMEvents.MOUSEENTER, this );
			this._binding.removeEventListener ( DOMEvents.MOUSELEAVE, this );
			if ( this.isAccepting ( type )) {
				this._isAccepting = false;
				this._stopAccepting ();
			}
			break;
			
		case BroadcastMessages.TYPEDRAG_PAUSE :	
			if ( this.isAccepting ( type )) {
				this._pauseAccepting ();
			}
			break;
	}
	
	} catch ( exception ) {
		this.logger.debug ( exception );
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
	
	if ( Types.isFunction ( this._binding.showGeneralAcceptance )) {
		this._binding.showGeneralAcceptance ();
	}
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
	
	this._cursor.hideAcceptance ();
	BindingAcceptor.acceptingBinding = null;
}
 
/**
 * Stop accepting binding.
 */
BindingAcceptor.prototype._stopAccepting = function () { 
	
	if ( this._binding.hideGeneralAcceptance ) {
 		this._binding.hideGeneralAcceptance ();
 	}
 	if ( this._binding.hideAcceptance ) {
		this._binding.hideAcceptance ();
	}
}

/**
 * Implements DOM2 EventListener.
 * @param {MouseEvent} e 
 */
BindingAcceptor.prototype.handleEvent = function ( e ) {

	switch ( e.type ) {
	
		case DOMEvents.MOUSEENTER :
		case DOMEvents.MOUSEOVER :
			if ( this._isAccepting ) {
				if ( BindingAcceptor.acceptingBinding != this._binding ) {
					BindingAcceptor.acceptingBinding = this._binding;
					this._cursor.showAcceptance ();
					if ( Types.isFunction ( this._binding.showAcceptance )) {
						this._binding.showAcceptance ();
					}
				}
			} else {
				EventBroadcaster.broadcast ( BroadcastMessages.TYPEDRAG_PAUSE );
				DOMEvents.stopPropagation ( e );
			}
			break;
			
		case DOMEvents.MOUSELEAVE :
		case DOMEvents.MOUSEOUT :
			if ( this._isAccepting ) {
				BindingAcceptor.acceptingBinding = null;
				this._cursor.hideAcceptance ();
				if ( Types.isFunction ( this._binding.hideAcceptance )) {
					this._binding.hideAcceptance ();
				}
			} else {
				DOMEvents.stopPropagation ( e );
			}
			break;
	}
	
	DOMEvents.stopPropagation ( e );
}

/**
 * Dispose (on binding dispose).
 */
BindingAcceptor.prototype.dispose = function () {
	
	EventBroadcaster.unsubscribe ( BroadcastMessages.TYPEDRAG_START, this );
	EventBroadcaster.unsubscribe ( BroadcastMessages.TYPEDRAG_STOP, this );
}