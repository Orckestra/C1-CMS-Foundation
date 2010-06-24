ImageScrollBoxBinding.prototype = new ScrollBoxBinding;
ImageScrollBoxBinding.prototype.constructor = ImageScrollBoxBinding;
ImageScrollBoxBinding.superclass = ScrollBoxBinding.prototype;

/**
 * @class
 */
function ImageScrollBoxBinding () {

	/**
	 * @type {SystemLogger}
	 */
	this.logger = SystemLogger.getLogger ( "ImageScrollBoxBinding" );
}

/**
 * Identifies binding.
 */
ImageScrollBoxBinding.prototype.toString = function () {
	
	return "[ImageScrollBoxBinding]";
}


/**
 * @overloads {Binding#onBindingAttach}
 */
ImageScrollBoxBinding.prototype.onBindingAttach = function () {
	
	ImageScrollBoxBinding.superclass.onBindingAttach.call ( this );
	
	this.buildDOMContent ();
	this.attachDOMEvents ();
}

/**
 * Build DOM content.
 */
ImageScrollBoxBinding.prototype.buildDOMContent = function () {

	this.shadowTree.div = DOMUtil.createElementNS ( 
		Constants.NS_XHTML, "div", this.bindingDocument 
	);
	this.shadowTree.div.id = "imagescrollbox";
	this.bindingElement.appendChild ( 
		this.shadowTree.div
	)
}

/**
 * Attach DOM events.
 */
ImageScrollBoxBinding.prototype.attachDOMEvents = function () {
	
	this.addEventListener ( DOMEvents.SCROLL );
	this.addEventListener ( DOMEvents.MOUSEMOVE );
	this.addEventListener ( DOMEvents.MOUSEOVER );
	this.addEventListener ( DOMEvents.MOUSEOUT );
	this.addEventListener ( DOMEvents.MOUSEDOWN );
}

/**
 * @implements {IEventHandler}
 * @overloads {Binding#handleEvent}
 * @param {MouseEvent} e
 */
ImageScrollBoxBinding.prototype.handleEvent = function ( e ) {
	
	ImageScrollBoxBinding.superclass.handleEvent.call ( this, e );
	
	switch ( e.type ) {
	
		case DOMEvents.SCROLL :
			this._synchronize ();
			break;
	
		case DOMEvents.MOUSEMOVE :	
			try {
				this._onmousemove ( e );
			} catch ( exception ) {
				DOMEvents.removeEventListener ( this.bindingElement, DOMEvents.MOUSEMOVE, this );
			}
			break;
		
		case DOMEvents.MOUSEOVER :
			bindingMap.imagecursor.show ();
			bindingMap.coordstext.show ();
			break;
		
		case DOMEvents.MOUSEOUT :
			bindingMap.imagecursor.hide ();
			bindingMap.coordstext.hide ();
			break;
			
		case DOMEvents.MOUSEDOWN :
			switch ( ImageEditor.mode ) {
				case ImageEditor.MODE_ZOOMIN :
					ImageEditor.zoomIn ();
					break;
				case ImageEditor.MODE_ZOOMOUT :
					ImageEditor.zoomOut ();
					break;
			}
			break;
	}
}

/**
 * @param {MouseEvent} e
 */
ImageScrollBoxBinding.prototype._onmousemove = function ( e ) {
	
	var span 		= Constants.SCROLLBAR_DIMENSION_HARDCODED_VALUE;
	var scale 		= ImageEditor.scale;
	var dim 		= this.boxObject.getDimension ();
	var pos			= this.boxObject.getGlobalPosition ();
	var point 		= DOMUtil.getGlobalMousePosition ( e );
	
	var hitScrollX 	= point.x > dim.w - span;
	var hitScrollY 	= point.y > dim.h + pos.y + this.bindingElement.scrollTop - span;
	
	/*
	 * Set cursor position
	 */
	bindingMap.imagecursor.setPosition ( new Point (
		point.x,
		point.y - pos.y - this.bindingElement.scrollTop // TODO: should scroll compute here?
	));
	
	/*
	 * Update coordinates label
	 */
	if ( !hitScrollX && !hitScrollY ) { // TODO: only check if overflow!!!
		
		var box = bindingMap.imagebox.boxObject.getGlobalPosition ();
		
		var x = point.x - box.x;
		var y = point.y - box.y;
		
		x = ImageEditor.grid ( x, scale ) / scale;
		y = ImageEditor.grid ( y, scale ) / scale;
		
		bindingMap.coordstext.setLabel ( new String ( 
			Math.round ( x ) + " x " + Math.round ( y )
		), true );
		
		if ( !bindingMap.coordstext.isVisible ) {
			bindingMap.coordstext.show ();
		}
		
	} else {
		
		bindingMap.coordstext.hide ();
	}
}

/**
 * Update on flex.
 * @overloads {FlexBoxBinding#flex}
 */
ImageScrollBoxBinding.prototype.flex = function () {
	
	ImageScrollBoxBinding.superclass.flex.call ( this );
	
	/*
	this._synchronize ();
	this.repaint ();
	*/
}

/**
 * Repaint.
 */
ImageScrollBoxBinding.prototype.repaint = function () {
	
	var dim = this.boxObject.getDimension ();
	var box = bindingMap.imagebox.boxObject.getDimension ();
	var geo = bindingMap.imagebox.geometry;
	
	this.sizeY ( box.h );
	this.sizeX ( box.w );
	
	if ( dim.h < box.h ) {
		var dy = dim.h - box.h;
		this.bindingElement.scrollTop = - geo.y - 0.5 * dy;
	} else {
		bindingMap.imagebox.setY ( 0 );
	}
	
	if ( dim.w < box.w ) {
		var dx = dim.w - box.w;
		this.bindingElement.scrollLeft = - geo.x - 0.5 * dx;
	} else {
		bindingMap.imagebox.setX ( 0 );
	}
	
	this._synchronize ();
}

/**
 * Synchronize.
 */
ImageScrollBoxBinding.prototype._synchronize = function () {

	var dim = this.boxObject.getDimension ();
	var box = bindingMap.imagebox.boxObject.getDimension ();
	
	if ( dim.h < box.h ) {
		var dy = dim.h - box.h;
		bindingMap.imagebox.setY ( - this.bindingElement.scrollTop - 0.5 * dy );
	}
	if ( dim.w < box.w ) {
		var dx = dim.w - box.w;
		bindingMap.imagebox.setX ( - this.bindingElement.scrollLeft - 0.5 * dx );
	}
}

/**
 * Set height.
 */
ImageScrollBoxBinding.prototype.sizeY = function ( size ) {
	
	this.shadowTree.div.style.height = size + "px";
}

/**
 * Set width.
 */
ImageScrollBoxBinding.prototype.sizeX = function ( size ) {
	
	this.shadowTree.div.style.width = size + "px";
}