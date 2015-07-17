ScrollBoxBinding.prototype = new FlexBoxBinding;
ScrollBoxBinding.prototype.constructor = ScrollBoxBinding;
ScrollBoxBinding.superclass = FlexBoxBinding.prototype;

function ScrollBoxBinding () {

	/**
	 * @type {SystemLogger}
	 */
	this.logger = SystemLogger.getLogger ( "ScrollBoxBinding" );
}

/**
 * Identifies binding.
 */
ScrollBoxBinding.prototype.toString = function () {

	return "[ScrollBoxBinding]";
}

/**
 * @overloads {Binding#onBindintRegister}
 */
ScrollBoxBinding.prototype.onBindingRegister = function () {
	
	ScrollBoxBinding.superclass.onBindingRegister.call ( this );
	this.addActionListener ( BalloonBinding.ACTION_INITIALIZE );
	// this._isFit = this.getProperty ( "fit" ) == true;
}

/**
 * Register as environment for balloons.
 * @implements {IActionListener}
 * @overloads {FlexBoxBinding#handleAction}
 * @param {Action} action
 */
ScrollBoxBinding.prototype.handleAction = function ( action ) {
	
	ScrollBoxBinding.superclass.handleAction.call ( this, action );
	
	/*
	 * Balloon tricks a go go.
	 */
	switch ( action.type ) {
		case BalloonBinding.ACTION_INITIALIZE :
			action.consume ();
			break;
	}
}

/**
 * Pathces a glitch where scrollboxes would otherwise resort to visible scrollbars. 
 * @param {int} height
 *
ScrollBoxBinding.prototype._setFitnessHeight = function ( height ) {
	
	/*
	 * TODO: Figure out where these extra pixels are coming from!
	 *
	ScrollBoxBinding.superclass._setFitnessHeight.call ( this, height + 5 );
}
*/

/**
 * Set scrollbox position.
 * @param {Point} point
 */
ScrollBoxBinding.prototype.setPosition = function ( point ) {
	
	this.bindingElement.scrollLeft = point.x;
	this.bindingElement.scrollTop = point.y;
}

/**
 * Get scrollbox position.
 * @return {Point}
 */
ScrollBoxBinding.prototype.getPosition = function () {
	
	return new Point (
		this.bindingElement.scrollLeft,
		this.bindingElement.scrollTop
	);	
}