ImageStageBinding.prototype = new FlexBoxBinding;
ImageStageBinding.prototype.constructor = ImageStageBinding;
ImageStageBinding.superclass = FlexBoxBinding.prototype;

/**
 * @class
 */
function ImageStageBinding () {

	/**
	 * @type {SystemLogger}
	 */
	this.logger = SystemLogger.getLogger ( "ImageStageBinding" );
	
	/** 
	 * @type {boolean} 
	 */
	this.isDraggable = true;
	
	/** 
	 * @type {boolean} 
	 */
	this.isDragging = false;
	
	/**
	 * @type {object}
	 */
	this._snapshot = null;
}

/**
 * Identifies binding.
 */
ImageStageBinding.prototype.toString = function () {
	
	return "[ImageStageBinding]";
}

/**
 *
 */
ImageStageBinding.prototype.onBindingRegister = function () {
	
	ImageStageBinding.superclass.onBindingRegister.call ( this );
	this.addActionListener ( Binding.ACTION_DRAG, this );
}

/**
 * @implements {@link IActionListener}
 * @overloads {Binding#handleAction}
 * @param {Action} action
 */
ImageStageBinding.prototype.handleAction = function ( action ) {
	
	ImageStageBinding.superclass.handleAction.call ( this, action );
	
	switch ( action.type ) {
		case Binding.ACTION_DRAG :
			this.dragger.registerHandler ( this );
			action.consume ();
			break;
	}
}

/**
 * @param {Point} point
 */
ImageStageBinding.prototype.onDragStart = function ( point ) {
	
	var scale = ImageEditor.scale;
	
	switch ( ImageEditor.mode ) {
	
		case ImageEditor.MODE_SELECT :
		
			if ( !this._isHittingScroolBars ( point )) {
				
				var pos = bindingMap.imagebox.boxObject.getUniversalPosition ();
				
				this.startx = point.x - pos.x;
				this.starty = point.y - pos.y;
				
				bindingMap.imageselection.setX ( ImageEditor.grid ( this.startx, scale ) / scale );
				bindingMap.imageselection.setY ( ImageEditor.grid ( this.starty, scale ) / scale );
				bindingMap.imageselection.show ();
				
				bindingMap.broadcasterHasSelection.disable ();
				ImageEditor.isSelecting = true;
				
				this._snapshot = {
					xmod			: 0,
					ymod			: 0,
					mousePosition 	: point,
					stagePosition 	: bindingMap.imagestage.boxObject.getUniversalPosition (),
					stageDimension 	: bindingMap.imagestage.boxObject.getDimension ()
				}
			}
			break;
	}
}

/**
 * Implements {@link IDragHandler}
 * @param {Point} diff
 */
ImageStageBinding.prototype.onDrag = function ( diff ) {

	
	if ( ImageEditor.isSelecting ) {
		
		diff = this._scrollDiff ( diff );
		this._updateSelection ( diff );
		this._updateSelectionText ();
	}
}

/**
 * Implements {@link IDragHandler}
 * @param {Point} diff
 */
ImageStageBinding.prototype.onDragStop = function ( diff ) {
	
	if ( ImageEditor.isSelecting ) {
		var geo = bindingMap.imageselection.geometry;
		if ( geo.w > 1 && geo.h > 1 ) {
			bindingMap.broadcasterHasSelection.enable ();
		}
		ImageEditorActions.select ();
		ImageEditor.isSelecting = false;
	}
}

/*
 * Update scroling while user drags *outside* screen area. 
 * This will only have effect if the image is scaled larger 
 * than the available screen estate (where scrolling occurs).
 * @param {Point} diff
 * @return {Point}
 */
ImageStageBinding.prototype._scrollDiff = function ( diff ) {
	
	if ( ImageEditor.isSelecting ) {
	
		var scrollBinding = bindingMap.imagescrollbox;
		var scrollElement = scrollBinding.bindingElement;
		var mod = 3 * ImageEditor.scale;
		var x = this._snapshot.mousePosition.x + diff.x;
		var y = this._snapshot.mousePosition.y + diff.y;
		
		/*
		 * horizontal action.
		 */	
		if ( x < this._snapshot.stagePosition.x ) {
			if ( scrollElement.scrollLeft > 0 ) {
				scrollElement.scrollLeft -= mod;
				this._snapshot.xmod -= mod;
			}
		} else if ( x > this._snapshot.stagePosition.x + this._snapshot.stageDimension.w ) {
			var curLeft = scrollElement.scrollLeft;
			scrollElement.scrollLeft += mod;
			if ( scrollElement.scrollLeft != curLeft ) {
				this._snapshot.xmod += mod;
			}
		}
		
		/*
		 * vertical action.
		 */	
		if ( y < this._snapshot.stagePosition.y ) {
			if ( scrollElement.scrollTop > 0 ) {
				scrollElement.scrollTop -= mod;
				this._snapshot.ymod -= mod;
			}
		} else if ( y > this._snapshot.stagePosition.y + this._snapshot.stageDimension.h ) {
			var curTop = scrollElement.scrollTop;
			scrollElement.scrollTop += mod;
			if ( scrollElement.scrollTop != curTop ) {
				this._snapshot.ymod += mod;
			}
		}
		
		diff.x += this._snapshot.xmod;
		diff.y += this._snapshot.ymod;
	}
	
	return diff;
}

/*
 * Update selection.
 * TODO: shaky selection when dragging anything but topleft to bottomright!
 * @param {Point} diff
 */
ImageStageBinding.prototype._updateSelection = function ( diff ) {
		
	var selector = bindingMap.imageselection;
	var scale = ImageEditor.scale;
	
	selector.setH ( ImageEditor.grid (  Math.abs ( diff.y ), scale ) / scale );
	selector.setW ( ImageEditor.grid (  Math.abs ( diff.x ), scale ) / scale );
	
	if ( diff.y < 0 ) {
		selector.setY (
			ImageEditor.grid ( this.starty + diff.y, scale ) / scale
		);
	}
	if ( diff.x < 0 ) {
		selector.setX (
			ImageEditor.grid ( this.startx + diff.x, scale ) / scale
		);
	}
}

/*
 * Update statustext (displaying selection dimensions).
 */
ImageStageBinding.prototype._updateSelectionText = function () {

	var geometry = bindingMap.imageselection.geometry;
	var statustext = new String ( "Selection: " + geometry.w + " x " + geometry.h );
	bindingMap.statustext.setLabel ( statustext, true );
}


/**
 * Detect whether or not a point intersects with the scrollbars.
 * Implements {@link IDragHandler}
 * @param {Point} point
 */
ImageStageBinding.prototype._isHittingScroolBars = function ( point ) {
	
	var span = Constants.SCROLLBAR_DIMENSION_HARDCODED_VALUE;
	
	var pos = this.boxObject.getUniversalPosition ();
	var dim = this.boxObject.getDimension ();
	var hitScroolBarX = point.x > pos.x + dim.w - span;
	var hitScroolBarY = point.y > pos.y + dim.h - span;
	
	return hitScroolBarX || hitScroolBarY;
}