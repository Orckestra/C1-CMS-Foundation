ControlGroupBinding.prototype = new Binding;
ControlGroupBinding.prototype.constructor = ControlGroupBinding;
ControlGroupBinding.superclass = Binding.prototype;

/**
 * @class
 */
function ControlGroupBinding () {

	/**
	 * @type {SystemLogger}
	 */
	this.logger = SystemLogger.getLogger ( "ControlGroupBinding" );
	
	/**
	 * Block common crawlers.
	 * @type {Map<string><boolean>}
	 * @overwrites {Binding#crawlerFilters}
	 */
	this.crawlerFilters	= new List ([ FlexBoxCrawler.ID, FocusCrawler.ID ]);
	
	/*
	 * Returnable.
	 */
	return this;
}

/**
 * Identifies binding.
 */
ControlGroupBinding.prototype.toString = function () {

	return "[ControlGroupBinding]";
}

/**
 * Setup event listeners.
 */
ControlGroupBinding.prototype.onBindingAttach = function () {

	ControlGroupBinding.superclass.onBindingAttach.call ( this );
	this.assignDOMEvents ();
}

/**
 * Mouseevents should not be propagated to the titlebar when handling controls.
 * These listeners will take care of it.
 */
ControlGroupBinding.prototype.assignDOMEvents = function () {

	this.addEventListener ( DOMEvents.MOUSEDOWN );
	this.addEventListener ( DOMEvents.MOUSEUP );
}

/**
 * Activate. Forces a refresh on contained controls. This may 
 * update control image if containing ControlBoxBinding changed 
 * active state AND control isGhostable.
 */
ControlGroupBinding.prototype.onActivate = function () {
	
	var controls = this.getDescendantBindingsByLocalName ( "control" );
	controls.each ( function ( control ) {
		//if ( control.isGhostable ) {
			control.setControlType ( control.controlType );
		//}
	});
}

/**
 * Deactivate.
 */
ControlGroupBinding.prototype.onDeactivate = ControlGroupBinding.prototype.onActivate;

/**
 * Blocks event propagation.
 * @implements {IEventListener}
 * @overloads {Binding#handleEvent}
 * @param {MouseEvent} e
 */
ControlGroupBinding.prototype.handleEvent = function ( e ) {

	ControlGroupBinding.superclass.handleEvent.call ( this, e );
	
	DOMEvents.stopPropagation ( e );

	switch ( e.type ) {
		case DOMEvents.MOUSEDOWN :
			EventBroadcaster.broadcast ( BroadcastMessages.MOUSEEVENT_MOUSEDOWN, e );
			this.dispatchAction ( Binding.ACTION_ACTIVATED );
			break;
		case DOMEvents.MOUSEUP :
			EventBroadcaster.broadcast ( BroadcastMessages.MOUSEEVENT_MOUSEUP, e );
			break;
	}
}

/**
 * ControlGroupBinding factory.
 * @param {DOMDocument} ownerDocument
 * @return {ControlGroupBinding}
 */
ControlGroupBinding.newInstance = function ( ownerDocument ) {
	var element = DOMUtil.createElementNS ( Constants.NS_UI, "ui:controlgroup", ownerDocument );
	return UserInterface.registerBinding ( element, ControlGroupBinding );
}