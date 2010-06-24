ImageSelectionBinding.prototype = new Binding;
ImageSelectionBinding.prototype.constructor = ImageSelectionBinding;
ImageSelectionBinding.superclass = Binding.prototype;

/**
 * @class
 * Largely controlled by the {@link ImageStageBinding}.
 */
function ImageSelectionBinding () {

	/**
	 * @type {SystemLogger}
	 */
	this.logger = SystemLogger.getLogger ( "ImageSelectionBinding" );
	
	/**
	 * @type {boolean}
	 */
	this._state = true;
	
	/**
	 * @type {object}
	 */
	this.geometry = {
		w : 0,
		h : 0,
		x : 0,
		y : 0
	}
}

/**
 * Identifies binding.
 */
ImageSelectionBinding.prototype.toString = function () {
	
	return "[ImageSelectionBinding]";
}

/**
 * Hide on startup.
 */
ImageSelectionBinding.prototype.onBindingAttach = function () {
	
	ImageSelectionBinding.superclass.onBindingAttach.call ( this );
	this.hide ();
}

/**
 * Repaint.
 */
ImageSelectionBinding.prototype.repaint = function () {
	
	this.setW ( this.geometry.w );
	this.setH ( this.geometry.h );
	this.setX ( this.geometry.x );
	this.setY ( this.geometry.y );
	
	// TODO: squares!
}

/**
 * Update statustext when hiding.
 * TODO: put this elsewhere?
 * @overloads {Binding#hide}
 */
ImageSelectionBinding.prototype.hide = function () {
	
	ImageSelectionBinding.superclass.hide.call ( this );
	if ( bindingMap.statustext ) {
		bindingMap.statustext.setLabel ( "", true );
	}
}

/**
 * Set width.
 * @param {int} w
 */
ImageSelectionBinding.prototype.setW = function ( w ) {
	
	this.bindingElement.style.width = new String ( w * ImageEditor.scale ) + "px";
	this.geometry.w = w;
}

/**
 * Set height.
 * @param {int} h
 */
ImageSelectionBinding.prototype.setH = function ( h ) {
	
	this.bindingElement.style.height = new String ( h * ImageEditor.scale ) + "px";
	this.geometry.h = h;
}

/**
 * Set x.
 * @param {int} x
 */
ImageSelectionBinding.prototype.setX = function ( x ) {
	
	this.bindingElement.style.left = new String ( x * ImageEditor.scale ) + "px";
	this.geometry.x = x;
}

/**
 * Set y.
 * @param {int} y
 */
ImageSelectionBinding.prototype.setY = function ( y ) {
	
	this.bindingElement.style.top = new String ( y * ImageEditor.scale ) + "px";
	this.geometry.y = y;
}