StageSplitterBodyBinding.prototype = new Binding;
StageSplitterBodyBinding.prototype.constructor = StageSplitterBodyBinding;
StageSplitterBodyBinding.superclass = Binding.prototype;

/**
 * When dragging stage splitters, this fellow needs to be rendered  
 * in a top level layer in order to appear above views.
 * @class
 */
function StageSplitterBodyBinding () {

	/**
	 * @type {SystemLogger}
	 */
	this.logger = SystemLogger.getLogger ( "StageSplitterBodyBinding" );
	
	/**
	 * @type {string}
	 */
	this._orient = null;
}

/**
 * Identifies binding.
 */
StageSplitterBodyBinding.prototype.toString = function () {

	return "[StageSplitterBodyBinding]";
}

/**
 * Set orientation. This determines the draggable directions.
 */
StageSplitterBodyBinding.prototype.setOrient = function ( orient ) {
	
	this._orient = orient;
	this.attachClassName ( orient );
}

/**
 * Set position.
 * @param {Position} pos
 */
StageSplitterBodyBinding.prototype.setPosition = function ( pos ) {
	
	var isHorizontal = true;
	var isVertical = true;
	
	switch ( this._orient ) {
		case SplitBoxBinding.ORIENT_HORIZONTAL :
			isVertical = false;
			break;
 		case SplitBoxBinding.ORIENT_VERTICAL :
			isHorizontal = false;
			break;
	}
	if ( isHorizontal ) {
		this.bindingElement.style.left = pos.x + "px";
	}
	if ( isVertical ) {
		this.bindingElement.style.top = pos.y + "px";
	}
}

/**
 * Set dimension.
 * @param {Dimension} dim
 */
StageSplitterBodyBinding.prototype.setDimension = function ( dim ) {
	
	this.bindingElement.style.width = dim.w + "px";
	this.bindingElement.style.height = dim.h + "px";
}

/**
 * Show.
 */
StageSplitterBodyBinding.prototype.show = function () {
	
	this.bindingElement.style.display = "block";
}

/**
 * Hide. This will automatically reset drag session settings.
 * @overwrites {Binding#hide}
 */
StageSplitterBodyBinding.prototype.hide = function () {
	
	this.bindingElement.style.display = "none";
	this.detachClassName ( SplitBoxBinding.ORIENT_HORIZONTAL );
	this.detachClassName ( SplitBoxBinding.ORIENT_VERTICAL );
	this._orient = null;
}
