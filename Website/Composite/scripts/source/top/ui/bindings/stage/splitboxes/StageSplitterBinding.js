StageSplitterBinding.prototype = new SplitterBinding;
StageSplitterBinding.prototype.constructor = StageSplitterBinding;
StageSplitterBinding.superclass = SplitterBinding.prototype;

/**
 * @class
 */
function StageSplitterBinding () {

	/**
	 * @type {SystemLogger}
	 */
	this.logger = SystemLogger.getLogger ( "StageSplitterBinding" );
	
	/** 
	 * @type {boolean}
	 */
	this._wasHidden = null;
}

/**
 * Identifies binding.
 */
StageSplitterBinding.prototype.toString = function () {

	return "[StageSplitterBinding]";
}

/**
 * Invoked by the {@link StageDeckBinding} when maximizing occurs.
 * @see {StageDeckBinding#handleControlBoxAction}
 */
StageSplitterBinding.prototype.handleMaximization = function () {
	
	this._wasHidden = !this.isVisible;
	this.bindingElement.style.display = "none"; // why hide-show fail in mozilla?
}

/**
 * Invoked by the {@link StageDeckBinding} when unmaximizing occurs.
 * @see {StageDeckBinding#handleControlBoxAction}
 */
StageSplitterBinding.prototype.handleUnMaximization = function () {
	
	if ( !this._wasHidden ) {
		this.bindingElement.style.display = "block";
		this._wasHidden = null;
	}
}

/**
 * @overloads {SplitterBinding#onDragStart}
 * @param {Point} point
 */
StageSplitterBinding.prototype.onDragStart = function ( point ) {

	var cover = top.app.bindingMap.stagesplittercover;
	var orient = this._containingSplitBoxBinding.getOrient ();
	
	switch ( orient ) {
		case SplitBoxBinding.ORIENT_HORIZONTAL :
			cover.bindingElement.style.cursor = "e-resize";
			break;
		case SplitBoxBinding.ORIENT_VERTICAL :
			cover.bindingElement.style.cursor = "n-resize";
			break;
	}
	cover.show ();
	
	var body = top.app.bindingMap.stagesplitterbody;
	body.setPosition ( this.getPosition ());
	body.setDimension ( this.getDimension ());
	body.setOrient ( orient );
	body.show ();
	
	this.isDragging = true;
}

/**
 * @overloads {SplitterBinding#onDrag}
 * @param {Point} diff
 */
StageSplitterBinding.prototype.onDrag = function ( diff ) {

	this._updateSplitterBodyPosition (
		this.getEvaluatedDiff ( diff )
	);
}

/**
 * @overloads {SplitterBinding#onDragStop}
 * Dispatced action causes containing slitbox to redraw.
 * @see {SplitBoxBinding#handleAction}
 * @param {Point} diff
 */
StageSplitterBinding.prototype.onDragStop = function ( diff ) {

	this._updateSplitterBodyPosition (
		this.getEvaluatedDiff ( diff )
	);
	
	top.app.bindingMap.stagesplitterbody.hide ();
	top.app.bindingMap.stagesplittercover.hide ();
	
	this.isDragging = false;
	this.offset = this._containingSplitBoxBinding.isHorizontalOrient () ? diff.x : diff.y;
	this.dispatchAction ( SplitterBinding.ACTION_DRAGGED );
}

/**
 * @param {Point} diff
 */
StageSplitterBinding.prototype._updateSplitterBodyPosition = function ( diff ) {
	
	var pos = this.getPosition ();
	pos.x += diff.x;
	pos.y += diff.y;
	
	app.bindingMap.stagesplitterbody.setPosition ( pos );
}

/**
 * @return {Position}
 */
StageSplitterBinding.prototype.getPosition = function () {
	
	return DOMUtil.getUniversalPosition ( this.bindingElement );
}

/**
 * @return {Dimension}
 */
StageSplitterBinding.prototype.getDimension = function () {
	
	return new Dimension ( 
		this.bindingElement.offsetWidth, 
		this.bindingElement.offsetHeight 
	);
}