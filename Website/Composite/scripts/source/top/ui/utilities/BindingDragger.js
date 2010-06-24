/**
 * True while dragging. Certain GUI components should 
 * modify their behavior dependant on this property.
 * @type {boolean}
 */
BindingDragger.isDragging = false;

/**
 * @type {Binding}
 */
BindingDragger.draggedBinding = null;

/**
 * @type {BindingDragger}
 */
BindingDragger.bindingDragger = null;

/**
 * @class
 * The main point with this class is to not register a 
 * default method "handleEvent" to all Binding instances.
 * @param {Binding} binding
 */
function BindingDragger ( binding ) {

	/** @type {SystemLogger} */
	this.logger = SystemLogger.getLogger ( "BindingDragger" );

	/** @type {Binding} */
	this.binding = binding;
	
	/** @type {boolean} */
	this.isDragReady = false;
	
	/** @type {boolean} */
	this.isDragging = false;
	
	/** @type {Point} */
	this.startPoint = null;
	
	/** @type {MouseEvent} */
	this.currentEvent = null
}

/**
* Implements DOM2 EventListener.
* @param {MouseEvent} e
*/
BindingDragger.prototype.handleEvent = function ( e ) {
	
	if ( e.type == DOMEvents.MOUSEUP ) {
		this.isDragReady = false;
	}
	else if ( !BindingDragger.isDragging ) {
		switch ( e.type ) {
			case DOMEvents.MOUSEDOWN :
				if ( !DOMEvents.isRightButton ( e )) {
					this.isDragReady = true;
					DOMEvents.preventDefault ( e ); // kills FF3 image dragging
				}
				break;
			case DOMEvents.MOUSEMOVE :
				if ( this.isDragReady == true ) {
					this.binding.dispatchAction ( 
						Binding.ACTION_DRAG 
					);
					if ( this.handler ) {
						this.onDragStart ( e );
					}
					this.isDragReady = false;
				}
				break;
		}
	}
}

BindingDragger.prototype.registerHandler = function ( handler ) {
	
	if ( Interfaces.isImplemented ( IDragHandler, handler ) == true ) {
		this.handler = handler;
	} else {
		throw new Error ( 
			"BindingDragger: Interface IDraghandler not implemented." 
		);
	}
}

/**
 * @param {MouseEvent} e
 */
BindingDragger.prototype.onDragStart = function ( e ) {
	
	if ( !this.isDragging ) {
		
		Application.enableMousePositionTracking ( e );
		this.startPoint = Application.getMousePosition ();
		this.isDragging = true;
		BindingDragger.isDragging = true;
		BindingDragger.draggedBinding = this.binding;
		this.handler.onDragStart ( this.startPoint );
		
		EventBroadcaster.subscribe ( BroadcastMessages.MOUSEEVENT_MOUSEMOVE, this );
		EventBroadcaster.subscribe ( BroadcastMessages.MOUSEEVENT_MOUSEUP, this );
	}
}

/**
 * @param {MouseEvent} e
 */
BindingDragger.prototype.onDrag = function ( e ) {

	if ( this.isDragging == true ) {
		var isLeftButtonPressed = e.button == ( e.target ? 0 : 1 );
		if ( isLeftButtonPressed ) {
			this.handler.onDrag ( this.getDiff ());
		} else {
			this.onDragStop ( e );
		}
	}
}

/**
 * @param {MouseEvent} e
 */
BindingDragger.prototype.onDragStop = function ( e ) {

	if ( this.isDragging == true ) {
		
		Application.disableMousePositionTracking ();
		this.handler.onDragStop ( this.getDiff ());
		this.isDragging = false;
		BindingDragger.isDragging = false;
		BindingDragger.draggedBinding = null;
		
		EventBroadcaster.unsubscribe ( BroadcastMessages.MOUSEEVENT_MOUSEMOVE, this );
		EventBroadcaster.unsubscribe ( BroadcastMessages.MOUSEEVENT_MOUSEUP, this );
	}
}

/**
 * @param {MouseEvent} e
 * @return {Point}
 */
BindingDragger.prototype.getDiff = function () {

	var point = Application.getMousePosition ();
	var dx = point.x - this.startPoint.x;
	var dy = point.y - this.startPoint.y;
	return new Point ( dx, dy );
}

/**
 * @implements {IBroadcastListener}
 * @param {string} broadcast
 * @param {object} e In this case, an instance of DOM MouseEvent
 */
BindingDragger.prototype.handleBroadcast = function ( broadcast, e ) {
	
	switch ( broadcast ) {
		case BroadcastMessages.MOUSEEVENT_MOUSEMOVE :
			this.onDrag ( e );
			break;
		case BroadcastMessages.MOUSEEVENT_MOUSEUP :
			this.onDragStop ( e );
			break;
	}
}

/**
 * Dispose.
 */
BindingDragger.prototype.dispose = function () {
	
	this.binding = null;
}