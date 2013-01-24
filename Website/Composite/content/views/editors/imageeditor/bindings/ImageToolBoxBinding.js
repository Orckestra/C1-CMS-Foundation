ImageToolBoxBinding.prototype = new Binding;
ImageToolBoxBinding.prototype.constructor = ImageToolBoxBinding;
ImageToolBoxBinding.superclass = Binding.prototype;

/**
 * @class
 */
function ImageToolBoxBinding () {

	/**
	 * @type {SystemLogger}
	 */
	this.logger = SystemLogger.getLogger ( "ImageToolBoxBinding" );
	
	/**
	 * @type {Point}
	 */
	this._startPosition = null;
}

/**
 * Identifies binding.
 */
ImageToolBoxBinding.prototype.toString = function () {
	
	return "[ImageToolBoxBinding]";
}

ImageToolBoxBinding.prototype.onBindingAttach = function () {
	
	ImageToolBoxBinding.superclass.onBindingAttach.call ( this );
	EventBroadcaster.subscribe ( this.bindingWindow.WindowManager.WINDOW_RESIZED_BROADCAST, this );
}

/**
 * Implements {@link IBroadcastListener}
 * @param {string} broadcast
 * @param {object} arg
 */
ImageToolBoxBinding.prototype.handleBroadcast = function ( broadcast, arg ) {
	
	ImageToolBoxBinding.superclass.handleBroadcast.call ( this, broadcast, arg );
	
	switch ( broadcast ) {
		case this.bindingWindow.WindowManager.WINDOW_RESIZED_BROADCAST :
			this._startPosition = this.getPosition ();
			this._setComputedPosition ( 
				new Point ( 0, 0 )
			);
			break;
	}
}

/**
 * Implements {@link IDragHandler}
 * @param {Point} point
 */
ImageToolBoxBinding.prototype.onDragStart = function ( point ) {
	
	this._startPosition = this.getPosition ();
}

/**
 * Implements {@link IDragHandler}
 * @param {Point} diff
 */
ImageToolBoxBinding.prototype.onDrag = function ( diff ) {

	this._setComputedPosition ( diff );
}

/**
 * Implements {@link IDragHandler}
 * @param {Point} diff
 */
ImageToolBoxBinding.prototype.onDragStop = function ( diff ) {
	
	this.onDrag ( diff );
	this._startPosition = null;
}

/**
 * Keep toolbox on stage.
 * @param {Point} diff
 */
ImageToolBoxBinding.prototype._setComputedPosition = function ( diff ) {

	var dim1 = this.boxObject.getDimension ();
	var dim2 = bindingMap.imagestage.boxObject.getDimension ();

	var x = this._startPosition.x + diff.x;
	var y = this._startPosition.y + diff.y;
	
	x = x < 0 ? 0 : x + dim1.w > dim2.w ? dim2.w - dim1.w : x;
	y = y < 0 ? 0 : y + dim1.h > dim2.h ? dim2.h - dim1.h : y;
	
	this.setPosition ( 
		new Point ( x, y )
	)
}

/**
 * Set position.
 * @param {Point} point
 */
ImageToolBoxBinding.prototype.setPosition = function ( point ) {
	
	this.bindingElement.style.left = point.x + "px";
	this.bindingElement.style.top = point.y + "px";
}

/**
 * Get position.
 * @return {Point}
 */
ImageToolBoxBinding.prototype.getPosition = function () {
	
	return new Point ( 
		this.bindingElement.offsetLeft,
		this.bindingElement.offsetTop
	);
}

/**
 * Get position.
 * @return {Point}
 */
ImageToolBoxBinding.prototype.getDimension = function () {
	
	return this.boxObject.getDimension ();
}